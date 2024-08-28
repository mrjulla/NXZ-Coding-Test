import dotenv from 'dotenv';
import functions from 'firebase-functions';
import axios from 'axios';
import { middleware, messagingApi } from '@line/bot-sdk';

dotenv.config();

const LINE_CONFIG = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET,
};

const { MessagingApiClient } = messagingApi;
const lineClient = new MessagingApiClient(LINE_CONFIG);

export const lineWebhook = functions.https.onRequest((req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
    }

    return middleware(LINE_CONFIG)(req, res, async () => {
        const events = req.body.events;

        const promises = events.map(event => handleEvent(event));

        return Promise.all(promises)
            .then(() => res.status(200).end())
            .catch(err => {
                console.error(err);
                res.status(500).end();
            });
    });
});

const handleEvent = async (event) => {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return null;
    }

    const userMessage = event.message.text.toLowerCase();
    const replyMessage = await getDefinition(userMessage);

    try {
        await lineClient.replyMessage({
            replyToken: event.replyToken,
            messages: [{ type: 'text', text: replyMessage }]
        });
    } catch (error) {
        const errorMessage = error.response ? error.response.data : error.message;
        await lineClient.replyMessage({
            replyToken: event.replyToken,
            messages: [{ type: 'text', text: 'Error sending message: ' + errorMessage }]
        });
    }
};

const getDefinition = async (word) => {
    const header = `Word: ${word}.\n\n`;
    try {
        const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const meanings = response.data[0].meanings;
        const noun = meanings.find(e => e.partOfSpeech === 'noun');
        const verb = meanings.find(e => e.partOfSpeech === 'verb');

        return `${header}${noun ? '▪️ Noun: ' + noun.definitions[0].definition : ''}${verb ? '\n\n▪️ Verb: ' + verb.definitions[0].definition : ''}`;
    } catch (error) {
        return `${header}❌ Sorry, I couldn\'t find the definition for that word.`;
    }
};

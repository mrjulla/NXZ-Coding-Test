# NXZ-Coding-Test

> [!NOTE]
> NXZ-Coding-Test is a serverless LINE Bot that acts as a dictionary. Users can input words they want to look up, and the bot will respond with the word's definition. The bot is built using Firebase Functions, making it scalable and easy to deploy.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or above)
- **Firebase CLI** (`npm install -g firebase-tools`)
- **ngrok** (Download from [ngrok.com](https://ngrok.com/download))
- A **LINE Developer account** with a Messaging API channel

## Setup Instructions

### 1. Clone the Repository

First, clone this repository to your local machine:

```bash
git clone https://github.com/yourusername/NXZ-Coding-Test.git
cd NXZ-Coding-Test
```

### 2. Install Dependencies

Navigate to the functions directory and install the necessary dependencies:

```bash
cd functions
npm install
```

### 3. Configure Environment Variables

Create a .env file in the functions directory to store your LINE Messaging API credentials:

```bash
touch .env
```

Add the following content to the .env file:

```plaintext
CHANNEL_ACCESS_TOKEN=your_line_channel_access_token
CHANNEL_SECRET=your_line_channel_secret
```
Replace your_line_channel_access_token and your_line_channel_secret with the actual values from your LINE Developer Console.

### 4. Initialize Firebase Emulator

If you haven't initialized Firebase in your project, run:

```bash
firebase init
```

When prompted, select the following:

- Functions: To set up Firebase Functions
- Emulators: To set up local emulators for Firebase

Once Firebase is initialized, start the Firebase Emulator:

```bash
firebase emulators:start
```

This command will start the local server at http://localhost:5001/YOUR_PROJECT_ID/us-central1/lineWebhook.

### 5. Expose Local Server Using ngrok

To make your local server accessible from the internet (so LINE can send webhook events to it), use ngrok to create a tunnel:

```bash
ngrok http 5001
```

ngrok will generate a public URL that tunnels to your local server, such as https://randomsubdomain.ngrok.io.

### 6. Set Up Webhook URL in LINE Developer Console

1. Go to the LINE Developer Console.
2. Select your provider and Messaging API channel.
3. In the Messaging API tab, find the Webhook settings section.
4. Set the Webhook URL to the ngrok URL you obtained, followed by your Firebase function's path:

```bash
https://randomsubdomain.ngrok.io/YOUR_PROJECT_ID/us-central1/lineWebhook
```

5. Enable the webhook by toggling the switch to Enabled.

### 7. Test Your Bot

1. Open the LINE app on your phone.
2. Add your bot as a friend by scanning the QR code from the LINE Developer Console.
3. Send a word to your bot. The bot should respond with the word's definition.

### 8. Logs and Debugging

To view logs from your Firebase Function, you can either:

- Check the console output in the terminal where Firebase Emulator is running.
- Visit the Firebase Console and navigate to the Functions > Logs section.

### 9. Deploying to Production

Once you are satisfied with your bot's functionality, you can deploy it to Firebase:

```bash
firebase deploy --only functions
```

After deployment, update the Webhook URL in the LINE Developer Console to point to your live Firebase function:

```bash
https://your-region-your-project-id.cloudfunctions.net/lineWebhook
```

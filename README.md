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

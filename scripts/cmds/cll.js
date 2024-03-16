module.exports = {
  config: {
    name: "cll",
    version: "1.0",
    author: "SKY",
    countDown: 5,
    role: 0,
    shortDescription: "Automatically unsends the last 45 bot messages after typing '45' or containing '😆', or unsends the latest bot message after typing 'unsend'.",
    longDescription: "Automatically unsends the last 45 bot messages after typing '45' or containing '😆', or unsends the latest bot message after typing 'unsend'.",
    category: "fun",
  },
  onStart: async function () {},
  onChat: async function ({ event, api, getLang }) {
    // Check if the message body is "10" or contains "cl"
    if (event.body && (event.body.trim() === "unsend" || event.body.includes("cl"))) {
      // Get the thread ID
      const threadID = event.threadID;
      
      // Fetch the last 45 messages sent by the bot
      const numMessages = 75;
      try {
        const botMessages = await api.getThreadHistory(threadID, numMessages);
        const botSentMessages = botMessages.filter(message => message.senderID === api.getCurrentUserID());

        // Unsend the bot messages
        for (const message of botSentMessages) {
          await api.unsendMessage(message.messageID);
        }
      } catch (error) {
        console.error("Error occurred while unsending messages:", error);
      }
    }

    // Check if the message body is "unsend"
    if (event.body && event.body.trim().toLowerCase() === "muji") {
      // Get the thread ID
      const threadID = event.threadID;
      
      // Fetch the latest message sent by the bot
      try {
        const botMessages = await api.getThreadHistory(threadID, 1);
        const latestBotMessage = botMessages.find(message => message.senderID === api.getCurrentUserID());

        // Unsend the latest bot message
        if (latestBotMessage) {
          await api.unsendMessage(latestBotMessage.messageID);
        }
      } catch (error) {
        console.error("Error occurred while unsending message:", error);
      }
    }
  },
};

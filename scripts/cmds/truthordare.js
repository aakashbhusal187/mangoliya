const axios = require('axios');

module.exports = {
  config: {
    name: "truthordare",
    aliases: ["tod"],
    version: "1.0",
    author: "SKY",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Play truth or dare."
    },
    longDescription: {
      en: "Challenge yourself with random truth and dares."
    },
    category: "game",
    guide: {
      en: "{pn} [truth/t] or {pn} [dare/d]"
    }
  },

  onStart: async function ({ api, event, args }) {
    const { threadID, messageID } = event;

    if (args.length < 1) {
      return api.sendMessage("Incorrect syntax!", threadID, messageID);
    }

    const type = args[0].toLowerCase();
    const allTypes = ["truth", "t", "dare", "d"];

    if (!allTypes.includes(type)) {
      return api.sendMessage("Incorrect syntax!", threadID, messageID);
    }

    const apiUrl = type === "truth" || type === "t"
      ? "https://api.truthordarebot.xyz/v1/truth"
      : "https://api.truthordarebot.xyz/api/dare";

    try {
      const question = await fetchDataFromAPI(apiUrl);

      if (question) {
        return api.sendMessage(question, threadID, messageID);
      } else {
        return api.sendMessage(
          "Failed to fetch truth or dare question from API.",
          threadID,
          messageID
        );
      }
    } catch (error) {
      console.error("Error:", error.message);
      return api.sendMessage(
        "Failed to fetch truth or dare question from API.",
        threadID,
        messageID
      );
    }
  },
};

async function fetchDataFromAPI(url) {
  try {
    const response = await axios.get(url);
    return response.data.question;
  } catch (error) {
    console.error('Error fetching data from API:', error.message);
    throw new Error("Failed to fetch data from API.");
  }
}

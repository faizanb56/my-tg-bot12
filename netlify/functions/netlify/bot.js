const TelegramBot = require('node-telegram-bot-api');

exports.handler = async (event, context) => {
  // Check if request is POST
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const token = process.env.BOT_TOKEN;
    if (!token) return { statusCode: 500, body: "Token Missing" };

    const bot = new TelegramBot(token);
    const body = JSON.parse(event.body);

    if (body.message) {
      const chatId = body.message.chat.id;
      const text = body.message.text;

      // Simple Reply Logic
      await bot.sendMessage(chatId, "Mobile se deployed bot ka reply: " + text);
    }

    return { statusCode: 200, body: "OK" };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

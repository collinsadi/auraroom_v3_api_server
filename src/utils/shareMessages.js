const generateRandomMessage = (id, key, name) => {
    const messages = [
      `Hey there! 👋 Jump into the ${name} Room on AuraRoom anonymously and see what everyone is typing before they send it. Just click here to join: https://auraroom.xyz/r/${id}. Use Room Key ${key}. Looking forward to seeing you there! 🚀`,
      `Hello! 🌟 Want to join the conversation in the ${name} Room on AuraRoom without revealing your identity? You can even see what others are typing before they send it! Click this link to join: https://auraroom.xyz/r/${id}. The Room key is ${key}. Come on in! 💬`,
      `Hi! 😊 Join us in the ${name} Room on AuraRoom anonymously and check out what everyone is saying before they send it. Just click here: https://auraroom.xyz/r/${id} and use Room Key ${key}. Can't wait to chat with you! 🤗`,
      `Hey! 👋 Want to join the ${name} Room on AuraRoom without anyone knowing who you are? You can even see messages before they’re sent! Just follow this link: https://auraroom.xyz/r/${id}. Room Key: ${key}. See you there! 🔥`,
      `Hi there! 👋 Join the ${name} Room on AuraRoom anonymously and see what people are typing before they hit send. Click here to get started: https://auraroom.xyz/r/${id}. Use Room Key ${key}. Hope to see you soon! 💻`,
    ];
  
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
  
    return randomMessage;
  };
  
  module.exports = generateRandomMessage;
  
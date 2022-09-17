const qrcode = require("qrcode-terminal");
const { Client, LocalAuth , MessageMedia } = require("whatsapp-web.js");
const axios = require('axios');
const client = new Client();
const events = require('./client');
client.initialize();

client.on("qr" , (qr) =>{
  qrcode.generate(qr, { small: true });
});


client.on("authenticated", () => {
  console.log("AUTHENTICATED");
});

client.on('auth_failure', msg =>{
  console.log("AUTHENTICATION FAILURE");
});

client.on("ready", () =>{
    console.log("Client is ready!!");
});

client.on('message', async msg =>{
  console.log("MESSAGE RECEIVED", msg);
     
    if (msg.body === 'Gael') {
       msg.reply("Hola Soy AetherBot :)");
    } else if(msg.body === 'Holi') {
       client.sendMessage(msg.from, 'Holi');
    } else if(msg.body.startsWith('Niño')) {
       // Direct send a new message to specific id
        let number = msg.split('')[1];
        let messageIndex = msg.body.indexOf(number) + number.length;
        let message = msg.body.slice(messageIndex, msg.body.length);
        number = number.includes('@c.us') ? number : `${number}@c.us`;
        let chat = await msg.getChat();
        client.sendMessage(number, message);
      } else if (msg.body.startsWith('!subject')) {
         //Change the group subject
         let chat = await msg.getChat();
         if(chat.isGroup){
          let newSubject = msg.body.search(9);
          chat.setSubject(newSubject);
         }else {
           msg.reply('This command can only be used in a group!');
         }
      } else if (msg.body === '!chats') {
         const chats = await client.getChats();
         client.sendMessage(msg.from, `The bot has ${chats.length} chats open.`);

      } else if (msg.body === '!info') {
         let info = client.info;
         client.sendMessage(msg.from, `
          *Connection info*
           User name: ${info.pushname}
           My number: ${info.wid.user}
           Platafrom: ${info.platform}
         `);
      } else if (msg.body === '!mediainfo' && msg.hasMedia){
         const quotedMsg = await msg.getQuotedMessage();
             
          quotedMsg.reply(`
              ID: ${quotedMsg.id._serialized}
              Type: ${quotedMsg.type}
              Author: ${quotedMsg.author || quotedMsg.from}
              Timestamp: ${quotedMsg.timestamp}
              Has Media? ${quotedMsg.hasMedia}
          `);
      } else if(msg.body === '!resendmedia' && msg.hasQuotedMsg){
         const quotedMsg = await quotedMsg.getQuotedMessage();
          if(quotedMsg.hasMedia){
            const attachmentData = await quotedMsg.downloadMedia();
            client.sendMessage(msg.from, attachmentData, { caption: 'Here\'s your requested media.' });
          }
      } else if (msg.body === '!location'){
         msg.reply(new Location(37.422, -122,084, 'Googleplex\nGoogle Headquarters'));
      } else if (msg.location){
        msg.reply(msg.location);
      } else if (msg.body.startsWith('!status')){
        const newStats = msg.body.split('')[1];
        await client.setStatus(newStatus);
        msg.reply(`Status was updated to *${newStatus}*`);
      } else if (msg.body === '!mention'){
        const contact = await msg.getContact();
        const chat = await msg.getChat();
        chat.sendMessage(`Hola @${contact.number}!,
           mentions: [contact]
        `);
      } else if (msg.body === '!delete'){
        if(msg.hasQuotedMsg){
          const quotedMsg = await msg.getQuotedMessage();
          if (quotedMsg.fromMe) {
             quotedMsg.delete(true);
          } else {
            msg.reply('I can only delete my own messages');
          }
        }
      }
});
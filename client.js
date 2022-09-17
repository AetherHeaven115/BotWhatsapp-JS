const { Client, LocalAuth , MessageMedia } = require('whatsapp-web.js');
const client = new Client();
const axios = require('axios');
const { Events } = require('whatsapp-web.js');
const memeRandom = "https://youtu.be/is4RZQLodKU";
const isAMeme = "https://www.elsoldemexico.com.mx/doble-via/virales/qkh5uk-meme-iphone-14.jpg/ALTERNATES/LANDSCAPE_768/Meme%20iPhone%2014.jpg";

//Contestando mensajes 
client.on("message" , (message) => {
  
    if(message.body === "Hola") {
        message.reply("Hola soy AetherBot :3 Gael está firmando unos papeles en bañorte no puede contestar por ahora ");
    } else if (message.body === "hola") {
        message.reply("Hola soy AetherBot :3 Gael está firmando unos paples en bañorte no puede contestar por ahora ");   
    } else if(message.body === 'Holi') {
       message.reply("Hola soy AetherBot :3 Gael está firmando unos papeles en el bañorte no puede contestar por ahora ")
    }
});


client.on("message", (message)=>{
   if(message.body === "meme") {
     message.reply(`Tome su meme ${isAMeme}`);
    
   }
})


client.on("message", (message)=>{
  
    if(message.body === "Video") {
        message.reply(`Toma es un video especial para ti :3  ${memeRandom}`);
    }
})



// 
client.on("message" , (message)=> {
    if(message.body === "Oye"){
        message.reply("Soy AetherBot y mi deber es informarte que Gael esta ocupado");
    } else if (message.body === "Gael") {
        message.reply("Gael Esta ocupado ,AetherBot Te atendera :)")
    }
});



//Replying Messages with image from url
client.on("message", async (message) => {
  if (message.body === "meme") {
    //get media from url
    const media = await MessageMedia.fromUrl(
      "https://user-images.githubusercontent.com/41937681/162612030-11575069-33c2-4df2-ab1b-3fb3cb06f4cf.png"
    );

    //replying with media
    client.sendMessage(message.from, media, {
      caption: "meme",
    });
  }
});


client.on('message', async msg =>{
   if(msg.hasMedia){
    const media = await msg.downloadMedia();

   }
});


client.on("message", async (msg) => {
  if (msg.body) {
    axios
      .get(
        `https://db.ygoprodeck.com/api/v7/cardinfo.php?name=${encodeURIComponent(
          msg.body
        )}`
      )
      .then(async (res) => {
        if (res.data.error) {
          msg.reply("No card matching your query was found in the database.");
        } else {
          const media = await MessageMedia.fromUrl(
            res.data.data[0].card_images[0].image_url
          );
          client.sendMessage(msg.from, media, {
            caption: `Name : ${res.data.data[0].name}\nType : ${res.data.data[0].type}\nDesc : ${res.data.data[0].desc}
            `,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
});



client.on('message', async (msg)=>{
  const mentions = await msg.getMentions();

  for(let conctact of mentions) {
     console.log(`${contanc.pushname} was mentioned!`);
  }
});


client.on("message", async (message) => {
  if (message.body === "meme") {
    //get media from url
    const media = await MessageMedia.fromUrl(
      "https://user-images.githubusercontent.com/41937681/162612030-11575069-33c2-4df2-ab1b-3fb3cb06f4cf.png"
    );

    //replying with media
    client.sendMessage(message.from, media, {
      caption: "meme",
    });
  }
});

module.exports = client;

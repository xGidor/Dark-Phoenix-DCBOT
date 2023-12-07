const Discord = require("discord.js");
const YTDL = require("ytdl-core");

const client = new Discord.Client();

var servers = {};

const config = require("./config.json");

client.on("ready", () => {

  console.log(`Bot ready.`);

  client.user.setActivity(`dp.help | DarkPhoenix`)
  client.user.setStatus(`idle`);
});

client.on("message", function (message) {
  
  console.log(message.author.username + `===>` + message.content)
  
});

client.on("message", function (message) {
  if (message.author.equals(client.user)) return;

  if (message.content === "Kappa")
    message.channel.sendMessage("Kappa...")

  if (message.content === "kappa")
    message.channel.sendMessage("Kappa...")


});




client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`dp.help | DarkPhoenix`);
  client.user.setStatus(`idle`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`dp.help | DarkPhoenix`);
  client.user.setStatus(`idle`);
});



client.on("message", async message => {

  if (message.author.bot) return;

  

  if (message.content.indexOf(config.prefix) !== 0) return;


  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  function play(connection, message) {
    var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], { filter: "audioonly" }));

    server.queue.shift();

    server.dispatcher.on("end", function () {
      if (server.queue[0]) play(connection, message);
      else connection.disconnect();
    })
  }


  var words = [
    "Igen",
    "Nem",
    "Talán",
    "Lehetséges",
    "Kérdezz meg később",
  ]

  let member = message.mentions.members.first() || message.guild.members.get(args[0]);

  var apple = [
    `${message.author} Megprobáltál lelőni ${member} fejéről egy almát de sajnos mellélöttél, és halálos sebet ejtettél ${member} -nak.`,
    `${message.author} Sikeresen lelöttél ${member} fejéről egy almát.`,
    `${message.author} Megprobáltál lelőni 360 noscopeban ${member} fejéről egy almát de sajnos fejen lötted.`,
    `${message.author} Sikeresen lelöttél ${member} fejéről egy almát 360 noscope -al..`,
    `${message.author} Megprobáltál lelőni ${member} fejéről egy körtét de sajnos sziven lötted, és meghalt... `,
    `${message.author} Sikeresen lelöttél ${member} fejéről egy körtét de ${member} mögött ált egy kislány és szemen lötted, és az egyik szemére megvakult.`,
    `${message.author} Azt hitted, hogy jó ötlet ak-47 -el lövöldözni ${member} fejéről almákat. Szegény ${member} most korházban fekszik.`,
    `${message.author}, sajna a revolver nem egy pontos fegyver, ${member} örülhet hogy csak a fülét találtad el.`,
    `${message.author}, Revolverrel le lőtted ${member} fejéről az almát.`,
  ]

  var slap = [
    `${message.author} pofán vágta ${member} -t egy lapáttal. <:DPESban:478896797314449408>`,
    `${message.author} kiütötte ${member} -t egy fém rúddal. <:DPESban:478896797314449408>`,
    `${message.author} megpofozta ${member} -t. <:DPESban:478896797314449408>`,
    `${message.author} rádobott egy talicskát ${member} fejére, 200 méter magasról. <:DPESban:478896797314449408>`,
    `${message.author} Nerf gépfegyverrel szét lőtte ${member} pofályát. <:DPESban:478896797314449408>`,
    `${message.author} Kungfu rúgással fejen rúgta ${member} -t. <:DPESban:478896797314449408>`,
    `${message.author} Kellet a pénz és arcon csaptad ${member} -t egy forró cső -vel. <:DPESban:478896797314449408>`,
    `${message.author} hozzá vágtad a macskádat ${member} -hez, és szét karmolta az arcát. <:DPESban:478896797314449408>`,
  ]


  var spinner = [
    "20 mp.",
    "21 mp.",
    "22 mp.",
    "23 mp.",
    "24 mp.",
    "25 mp.",
    "26 mp.",
    "27 mp.",
    "29 mp.",
    "35 mp.",
    "38 mp.",
    "40 mp.",
    "43 mp.",
    "44 mp.",
    "47 mp.",
    "50 mp.",
    "54 mp.",
    "58 mp.",
    "59 mp.",
    "1 perc.",
    "1 perc 2 mp.",
    "1 perc 8 mp.",
    "1 perc 12 mp.",
    "1 perc 14 mp.",
    "A spinnered eltört...",
  ]

  if (command === "avatar") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    let membera = member.user.avatarURL;

    let avatare = new Discord.RichEmbed()
    .addField(member.user.username + ' avatar', ':wink:')
    .setImage(membera)
    .setColor('00ff01')
    message.channel.send(avatare)
  }



  if (command === "slap") {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if (!member)
      return message.reply("Felhasználó nem található! Err: 404 Nincs ilyen ember!");
    if (args[0] == message.author) {
      message.reply("Magadat nem pofozhatod meg.");
      return;
    }
    message.channel.send((slap[Math.floor(Math.random() * slap.length)]))
  }

  if (command === "spinner") {
  
    message.channel.send("A fidget spinnered pörög...")
    message.channel.send(`${message.author} A fidget spinnered pörgési idelye: ${(spinner[Math.floor(Math.random() * spinner.length)])}`)
  
  }

  if (command === "nyjatek") {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.reply("Error 2045, Nem vagy admin.");
    message.channel.send("Nyereményjáték van Nézzétek meg! :wink:")
  }

  if (command === "8ball") {
    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .addField(':x: ERROR :x:', 'Kérlek Kérdezz valamit!')
        .setColor('ff0000')
      message.channel.send(embed)
      return;
    }
    let embed = new Discord.RichEmbed()
      .addField(":8ball: 8Ball :8ball:", "A Labda döntött!")
      .addField("válasz", (words[Math.floor(Math.random() * words.length)]))
      .setColor('00ff01')
    message.channel.send(embed)

  }


  if (command === "setplay") {
    if (!message.member.roles.some(r => ["🤖Tesztelő Phoenix", "Alpha Phoenix"].includes(r.name)))
      return message.reply("Error 001, Nem vagy tesztelő.");
    const sayMessage = args.join(" ");
    if (!args[0]) {
      message.channel.sendMessage("```Státusz visszaállítva.```");
      client.user.setActivity("dp.help | DarkPhoenix");
      return;
    }
    client.user.setActivity(sayMessage);
    message.channel.send("A bot játék státusza beállítva erre" + ` **${sayMessage}**`);

  };

  if (command === "play") {

    if (!args[0]) {
      message.channel.sendMessage("Kérlek írj be egy linket.");
      return;
    }

    if (!message.member.voiceChannel) {
      message.channel.sendMessage("Nem vagy voice szobában!");
      return;
    }

    if (!servers[message.guild.id]) servers[message.guild.id] = {
      queue: []
    };

    var server = servers[message.guild.id];

    server.queue.push(args[0]);

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function (connection) {
      play(connection, message);
    });
  };

  if (command === "skip") {

    message.channel.send("Zene átugorva! :smile:")

    var server = servers[message.guild.id];

    if (server.dispatcher) server.dispatcher.end();
  }


  if (command === "stop") {

    message.channel.send("Zene leállítva! Szobából kilépve. :wink:")

    var server = servers[message.guild.id];

    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
  }

  if (command === "pause") {
    if (!message.member.roles.some(r => ["🤖Tesztelő Phoenix"].includes(r.name)))
      return message.reply("Error 001, Nem vagy tesztelő.");

    message.channel.send("Zene Megálítva. :wink:")

    var server = servers[message.guild.id];

    if (server.dispatcher) server.dispatcher.stop();
  }

  if (command === "resume") {
    if (!message.member.roles.some(r => ["🤖Tesztelő Phoenix"].includes(r.name)))
      return message.reply("Error 001, Nem vagy tesztelő.");

    message.channel.send("Folytatás... :wink:")

    var server = servers[message.guild.id];

    if (server.dispatcher) server.dispatcher.restart();
  }


  if (command === "help") {

    let embed = new Discord.RichEmbed()
      .addField("Normál Parancsok", "dp.say, dp.ping, dp.serverinfo, dp.userinfo, dp.channelinfo dp.help, dp.info, dp.bugreport")
      .addField("Admin parancsok", "dp.kick, dp.ban, dp.warn, dp.purge, dp.warn, dp.tempmute, dp.mute, dp.unmute")
      .addField("Fun parancsok", "dp.8ball, dp.avatar, dp.respect, dp.appleshooter, dp.respects, dp.spinner, dp.slap")
      .addField("Zene parancsok", "dp.play (link), dp.skip, dp.stop")
      .addField("BrainFuck parancsok", "dp.lenny, dp.asd, dp.k")
      .setColor('#e4b400')
    message.channel.send(embed)
      .then(function (message) {
        message.react("✍")
      }).catch(function () {
        // e
      });
  };



  if (command === "purge") {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("Nincs jogod..");
    if (!args[0]) return message.channel.send("Nincs Jogod.");
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`${args[0]} Darab üzenet  törölve!`).then(msg => msg.delete(2000));
    });

  }


  if (command === "serverinfo") {

    let sicon = message.guild.iconURL;
    let embed = new Discord.RichEmbed()
      .setTitle("Szerver Információk")
      .setColor("#e4b400")
      .setThumbnail(sicon)
      .addField(":scroll: Szerver neve:", message.guild.name)
      .addField(":crown: Szerver Tulaja:", message.guild.owner)
      .addField(":calendar: Szerver elkészítve:", message.guild.createdAt)
      .addField(":calendar: Ekkor léptél be:", message.member.joinedAt)
      .addField(":1234: Összes ember:", message.guild.memberCount)
      .addField(":baby: Neved:", message.author.username);

    message.channel.send(embed);
  }
  if (command === "channelinfo") {

    let embed = new Discord.RichEmbed()
      .setTitle("Szoba Információk")
      .setColor("#e4b400")
      .addField("<:DPEShammer2:478896798715609088> Szoba neve:", message.channel.name)
      .addField("<:DPEShammer2:478896798715609088> Szoba elkészítve:", message.channel.createdAt)
      .addField("<:DPEShammer2:478896798715609088> Szoba ID:", message.channel.id)
      .addField(":scroll: Szoba topic:", message.channel.topic || "Nincs");

    message.channel.send(embed);
  }

  if (command === "userinfo") { 
    const fs = require("fs");

    let micon = message.author.avatarURL;
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));
    let resp = JSON.parse(fs.readFileSync("./respects.json", "utf8"));
    let wUser = message.guild.member(message.author)
    let member = message.guild.member(message.author)
    if (!wUser) return message.reply("Nem találom!");

    if (!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };
    if (!resp[member.id]) resp[member.id] = {
      resp: 0
    };

    warns[wUser.id].warns;
    resp[member.id].resp;

    let embed = new Discord.RichEmbed()
      .setThumbnail(micon)
      .setTitle("Ember Információk")
      .setColor("#e4b400")
      .addField(":baby: Ember neve:", `<@${wUser.id}>`)
      .addField(":scroll: Account elkészítve:", message.author.createdAt)
      .addField(":1234: ID:", message.author.id)
      .addField("<:DPESban:478896797314449408> Warnok:", warns[wUser.id].warns)
      .addField("<:DPESrespect:478896795230142466> Respectek:", resp[wUser.id].resp);

    message.channel.send(embed);
  }

  if (command === "bugreport") {
    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .addField(':x: ERROR :x:', 'Kérlek írd be hogy mit küldjek')
        .setColor('ff0000')
      message.channel.send(embed)
      return;
    }


    const sayMessage = args.join(" ");

    let embed = new Discord.RichEmbed()
      .addField(":pushpin: Bugreport elküldve :pushpin:", `Ezt küldted:  **${sayMessage}**`)
      .setColor('ff0000')
      .setTitle(":pushpin: REPORT :pushpin: ")
    message.channel.send(embed)

    let embed1 = new Discord.RichEmbed()
      .addField(":pushpin: Bugreport érkezett. :pushpin:", `Report tartalma: **${sayMessage}.** Küldte: **${message.author.username}.**`)
      .setColor('ff0000')
      .setTitle(":pushpin: BugReport :pushpin: ")
    message.guild.channels.get('469545376009945089').send(embed1);
  }



  if (command === "k") {
    let embed = new Discord.RichEmbed()
      .addField("Nice!", ":ok_hand: <:DPEShammer2:478896798715609088>")
      .setColor('#e4b400')
    message.channel.send(embed)


  };


  if (command === "asd") {
    let embed = new Discord.RichEmbed()
      .addField("Írj már értelmesen!", "Köszike :joy:")
      .setColor('#e4b400')
    message.channel.send(embed)


  };

  if (command === "lenny") {
    let embed = new Discord.RichEmbed()
      .addField("LENNY FÉSZ!!!!!!", "( ͡° ͜ʖ ͡°)")
      .setColor('#e4b400')
    message.channel.send(embed)

  };
  if (command === "respect") {

    let member = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (args[0] == message.author) {
      message.reply("Magadnak nem küldhetsz tiszteletet.");
      return;
    }
    if (!member)
      return message.reply("Használat dp.respect @ember#0000");
    message.delete().catch(() => { });
    message.channel.send(`<:DPESrespect:478896795230142466> **${member.user}** Respectet kaptál tőle: **${message.author}**. <:DPESrespect:478896795230142466>`)

    const fs = require("fs");

    let resp = JSON.parse(fs.readFileSync("./respects.json", "utf8"));


    if (!member) return message.reply("Nem találom!");



    if (!resp[member.id]) resp[member.id] = {
      resp: 0
    };

    resp[member.id].resp++;

    fs.writeFile("./respects.json", JSON.stringify(resp), (err) => {
      if (err) console.log(err)
    });
    let hundredrespect2 = message.guild.roles.find(`name`, "50respect");
  
    if (!hundredrespect2) {
      try {
        hundredrespect2 = await message.guild.createRole({
          name: "50respect",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(hundredrespect2, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let hundredrespect3 = message.guild.roles.find(`name`, "200respect");
  
    if (!hundredrespect3) {
      try {
        hundredrespect3 = await message.guild.createRole({
          name: "200respect",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(hundredrespect3, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let hundredrespect4 = message.guild.roles.find(`name`, "300respect");

    if (!hundredrespect4) {
      try {
        hundredrespect4 = await message.guild.createRole({
          name: "300respect",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(hundredrespect4, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let thousandrespect = message.guild.roles.find(`name`, "1000respect");

    if (!thousandrespect) {
      try {
        thousandrespect = await message.guild.createRole({
          name: "1000respect",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(thousandrespect, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let hundredrespect5 = message.guild.roles.find(`name`, "400respect");
  
    if (!hundredrespect5) {
      try {
        hundredrespect5 = await message.guild.createRole({
          name: "400respect",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(hundredrespect5, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let hundredrespect6 = message.guild.roles.find(`name`, "500respect");

    if (!hundredrespect6) {
      try {
        hundredrespect6 = await message.guild.createRole({
          name: "500respect",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(hundredrespect6, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    let hundredrespect = message.guild.roles.find(`name`, "100respect");

    if (!hundredrespect) {
      try {
        hundredrespect = await message.guild.createRole({
          name: "100respect",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(hundredrespect, {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }
    if (resp[member.id].resp == 1) {
      message.channel.send(`<@${member.id}> Megkaptad az első respected. Gratulálok.`);
    }
    if (resp[member.id].resp == 50) {
      await (member.addRole(hundredrespect2.id));
      message.channel.send(`<@${member.id}> Grat a 50 respecthez.`);
    }
    if (resp[member.id].resp == 100) {
      await (member.addRole(hundredrespect.id));
      message.reply(`<@${member.id}> Grat a 100 respecthez!`)
    };
    if (resp[member.id].resp == 200) {
      await (member.addRole(hundredrespect3.id));
      message.reply(`<@${member.id}> Grat a 200 respecthez!`)
    };
    if (resp[member.id].resp == 300) {
      await (member.addRole(hundredrespect4.id));
      message.reply(`<@${member.id}> Grat a 300 respecthez!`)
    };
    if (resp[member.id].resp == 400) {
      await (member.addRole(hundredrespect5.id));
      message.reply(`<@${member.id}> Grat a 400 respecthez!`)
    };
    if (resp[member.id].resp == 500) {
      await (member.addRole(hundredrespect6.id));
      message.reply(`<@${member.id}> Grat a 500 respecthez!`)
    };
    if (resp[member.id].resp == 1000) {
      await (member.addRole(thousandrespect.id));
      message.reply(`<@${member.id}> Grat a 1000 respecthez! GG @here`)
    };

  };

  if (command === "appleshooter") {

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

    if (!member)
      return message.reply("Felhasználó nem található! Err: 404 Nincs ilyen ember!");

    if (args[0] == message.author) {
      message.reply("A saját fejedről nem bírsz lelőni egy almát.");
      return;
    }
    message.channel.send((apple[Math.floor(Math.random() * apple.length)]));

  }
  if (command === "respects") {

    const fs = require("fs");
    const ms = require("ms");
    let resp = JSON.parse(fs.readFileSync("./respects.json", "utf8"));

    const member = message.author;

    let resps = new Discord.RichEmbed()
      .setColor("#e4b400")
      .addField("Respectek:", resp[member.id].resp)
      .addField("Ember:", message.author.username);

    message.channel.send(resps);
  }


  /*
    client.on("message", function (message) {
  
      let xp = JSON.parse(fs.readFileSync("./xp.json", "utf8"));
  
  
      let curxp = xp[member.id].xp;
      let curlvl = xp[member.id].level;
      let nxtLvl = xp[member.id].level * 150;
      xp[member.id].xp =  curxp + xpAdd;
      if(nxtLvl <= xp[member.id].xp){
        xp[member.id].level = curlvl + 1;
        let lvlup = new Discord.RichEmbed()
        .setTitle("Level Up!")
        .setColor('#e4b400')
        .addField("New Level", curlvl + 1);
  
  
        fs.writeFile("./xp.json", JSON.stringify(resp), (err) => {
          if (err) console.log(err)
        });
    }})
  
  
  
  
    if (command === "level") {
  
      let member = message.author;
      const fs = require("fs");
  
      let xp = JSON.parse(fs.readFileSync("./xp.json", "utf8"));
  
      if (!xp[member.id]) xp[member.id] = {
        xp: 0,
        level: 1
      };
  
      xp[member.id].xp++;
  
      fs.writeFile("./xp.json", JSON.stringify(resp), (err) => {
        if (err) console.log(err)
      });
  
  
    };
  */
  if (command === "info") {
    let embed = new Discord.RichEmbed()
      .addField(":hammer_pick: Botot készítette:", "@>○爪尺 ムIᗪㄖ尺○<#1609")
      .addField(":hammer_pick: Tesztelők", "Mátesz Mátesz, Porba, Rampii., Panda, Geri96, WildOcelot")
      .addField(":hammer_pick: Bot verzió: ", "1.2.7")
      .addField(":hammer_pick: Jelentkezz tesztelőnek:", "https://docs.google.com/forms/d/1C37D_4qCGDMadroOjvMTerYEzMFFUerU_FsBwv6Mgq4")
      .setColor('#e4b400')
      .setTitle(":point_right: Információk :point_left:")
    message.channel.send(embed)

  };




  if (command === "debughelp") {
    if (!message.member.roles.some(r => ["🤖Tesztelő Phoenix"].includes(r.name)))
      return message.reply("Error 001, Nem vagy tesztelő!");

    let embed = new Discord.RichEmbed()
      .addField(":hammer_pick: Debug parancsok", "dp.tempmute, dp.setplay, dp.resume, dp.pause")
      .addField(":hammer_pick: Hamarosan", "cleverbot")
      .addField(":hammer_pick: Több tesztelésre szorul", "Zene rendszer")
      .setColor('#e4b400')
      .setTitle("Debug")
    message.channel.send(embed)

  };

  if (command === "tempmute") {
    const ms = require("ms");

    if (!message.member.hasPermission("MUTE_MEMBERS", "MANAGE_WEBHOOKS")) return message.reply("Error 701, Nincs Jogod.");
    if (args[0] == "help") {
      message.reply("Használat: !tempmute <Ember> </m/h/d>");
      return;
    }
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Error 404, Nincs ilyen ember.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Error 702, Nem tudom némítani!");
    let reason = args.slice(2).join(" ");
    if (!reason) return message.reply("Error 699, Kérlek írd be az indokot!.");

    let muterole = message.guild.roles.find(`name`, "Némított");
  
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: "Némított",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

    let mutetime = args[1];
    if (!mutetime) return message.reply("Error 699, Írd be az időt!!!");

    message.delete().catch(() => { });

    try {
      await tomute.send(`Szia Le lettél némítva enny időre: ${mutetime} a **${message.guild.name}** szerveren!`)
    } catch (e) {
      message.channel.send(`A játékos le lett némítva, de nem tudtam privátot írni! ${mutetime}`)
    }

    let muteembed = new Discord.RichEmbed()
      .setDescription(`Aki lenémította: ${message.author}`)
      .setColor('#e4b400')
      .addField("Némított ember.", tomute)
      .addField("Ekkor:", message.createdAt)
      .addField("Meddig:", mutetime)
      .addField("Indok:", reason);
    message.channel.send(muteembed)

    await (tomute.addRole(muterole.id));

    setTimeout(function () {
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> Feloldva!!`);
      tomute.send(`Fel lettél oldva a **${message.guild.name}** szerveren.`);
    }, ms(mutetime));


  }

  if (command === "mute") {


    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Error 701, Nincs Jogod.");
    if (args[0] == "help") {
      message.reply("Használat: !mute <Ember> <indok>");
      return;
    }
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Nincs ilyen ember.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Error 702, Nem tudom némítani!");
    let reason = args.slice(1).join(" ");
    if (!reason) return message.reply("Kérlek írd be az indokot!.");

    let muterole = message.guild.roles.find(`name`, "Némított");

    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: "Némított",
          color: "#e4b400",
          permissions: []
        })
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }



    try {
      await tomute.send(`Szia le lettél némítva a **${message.guild.name}** szerveren!`)
    } catch (e) {
      message.channel.send(`A játékos le lett némítva, de nem tudtam privátot írni! ${mutetime}`)
    }

    let muteembed = new Discord.RichEmbed()
      .setDescription(`Aki lenémította: ${message.author}`)
      .setColor('#e4b400')
      .addField("Némított ember.", tomute)
      .addField("Ekkor:", message.createdAt)
      .addField("Indok:", reason);
    message.channel.send(muteembed)

    await (tomute.addRole(muterole.id));

  }

  if (command === "unmute") {


    if (!message.member.hasPermission("MUTE_MEMBERS")) return message.reply("Error 701, Nincs Jogod.");
    if (args[0] == "help") {
      message.reply("Használat: !unmute <Ember>");
      return;
    }
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!tomute) return message.reply("Nincs ilyen ember.");
    if (tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Nem tudom feloldani!");



    let muterole = message.guild.roles.find(`name`, "Némított");



    try {
      await tomute.send(`Szia fel lettél oldva a némításból a **${message.guild.name}** szerveren!`)
    } catch (e) {
      message.channel.send(`A játékos fel lett oldva, de nem tudtam privátot írni mert kikapcsolta az üzzenetekt olyanoktól akik nem a barátai! ${mutetime}`)
    }



    await (tomute.removeRole(muterole.id));
    message.channel.send(`<@${tomute.id}> Feloldva!!!`);



  }



  if (command === "ping") {



    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Válaszidő **${Math.round(client.ping)} ms.**`)

  }

  if (command === "hirek") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Error 701, Nincs jogod...");
    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .addField(':x: ERROR :x:', 'Kérlek írd be hogy mit mondjak')
        .setColor('ff0000')
      message.channel.send(embed)
      return;
    }
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Error 701, Nincs jogod...");
    if (!args[0]) return message.channel.send("Error 701, Nincs Jogod...");
    const sayMessage = args.join(" ");

    message.delete().catch(() => { });
    let embed = new Discord.RichEmbed()
      .addField('Hírek Röviden.', sayMessage)
      .setColor('#e4b400')
    message.channel.send(embed)

  }

  if (command === "bothirek") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Error 701, Nincs jogod...");
    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .addField(':x: ERROR :x:', 'Kérlek írd be hogy mit mondjak')
        .setColor('ff0000')
      message.channel.send(embed)
      return;
    }
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Error 701, Nincs jogod...");
    if (!args[0]) return message.channel.send("Error 701, Nincs Jogod...");
    const sayMessage = args.join(" ");

    message.delete().catch(() => { });
    let embed = new Discord.RichEmbed()
      .addField('Bot Hírek Röviden.', sayMessage)
      .setColor('#e4b400')
    message.channel.send(embed)

  }

  if (command === "szavazas") {
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Error 701, Nincs jogod...");
    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .addField(':x: ERROR :x:', 'Kérlek írd be hogy mi legyen a szavazás adata.')
        .setColor('ff0000')
      message.channel.send(embed)
      return;
    }
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Nincs jogod...");
    if (!args[0]) return message.channel.send("Nincs Jogod...");
    const sayMessage = args.join(" ");

    message.delete().catch(() => { });
    let embed = new Discord.RichEmbed()
      .addField('Szavazás', sayMessage)
      .addField('Szavazz most.', '\
    :x: Ne legyen.\
    :white_check_mark: Legyen.\
    :thinking: Nekem Mindegy.')
      .setColor('#e4b400')
    message.channel.send(embed)
      .then(function (message) {
        message.react("✅")
        message.react("❌")
        message.react("🤔")
      }).catch(function () {
  
      });

  }

  if (command === "say") {

    if (!args[0]) {
      let embed = new Discord.RichEmbed()
        .addField(':x: ERROR :x:', 'Kérlek írd be hogy mit mondjak')
        .setColor('ff0000')
      message.channel.send(embed)
      return;
    }

    const sayMessage = args.join(" ");

    message.delete().catch(() => { });

    message.channel.send(sayMessage)


  }



  if (command === "warn") {

    const fs = require("fs");
    const ms = require("ms");
    let warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));


    if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply("Nincs jogod...");
    if (!args[0]) return message.channel.send("Error 701, Nincs Jogod...");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if (!wUser) return message.reply("Nem találom!");
    let reason = args.join(" ").slice(22);

    if (!warns[wUser.id]) warns[wUser.id] = {
      warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
      if (err) console.log(err)
    });


    let embed = new Discord.RichEmbed()
      .setTitle(":x: Figyelmeztetések :x:")
      .setColor("#e4b400")
      .addField("Figyelmeztetett játékos:", `<@${wUser.id}>`)
      .addField("Figyelmeztetések:", warns[wUser.id].warns)
      .addField("Figyelmeztető:", message.author.username)
      .addField("Indok:", reason || "nincs");

    message.channel.send(embed);


    if (warns[wUser.id].warns == 3) {
      let muterole = message.guildage.reply("Csináld meg a rangot elösször, hogy bírjam némítani.");

      let mutetime = "6h";
      await (wUser.addRole(muterole.id));
      message.channel.send(`<@${wUser.id}> 6 órára némítva`);

      setTimeout(function () {
        wUser.removeRole(muterole.id)
        message.reply(`<@${wUser.id}> Feloldva...`)
      }, ms(mutetime))
    }
    if (warns[wUser.id].warns == 5) {
      message.guild.member(wUser).ban(reason);
      message.reply(`<@${wUser.id}> Bannolva!.`)
    };

  }

    if (command === "kick") {

      if (!message.member.roles.some(r => ["Alpha Phoenix", "Omega Phoenix", "Staff Phoenix", "Striker Phoenix"].includes(r.name)))
        return message.reply("Error 701, Nincs jogod ezt használni!");


      let member = message.mentions.members.first() || message.guild.members.get(args[0]);
      if (!member)
        return message.reply("Felhasználó nem található! Err: 404 Nincs ilyen ember!");
      if (!member.kickable)
        return message.reply("Nagyobb rangja lehet nálam? Csak mert nem tudom kidobni!");


      let reason = args.slice(1).join(' ');
      if (!reason) reason = "Nincs indok";


      await member.kick(reason)
        .catch(error => message.reply(`Bocsi ${message.author} Nem dobhatom ki mert. : ${error}`));
      message.channel.send(`**${member.user.tag}**ú Felhasználó Kidobva ő által: ${message.author}  Indok: ${reason}`);

    }

    if (command === "ban") {

      if (!message.member.roles.some(r => ["Alpha Phoenix", "Omega Phoenix", "Mod Phoenix", "Striker Phoenix"].includes(r.name)))
        return message.reply("Error 701, Nincs jogod ezt használni!");

      let member = message.mentions.members.first();
      if (!member)
        return message.reply("Felhasználó nem található! Err: 404 Nincs ilyen ember!");
      if (!member.bannable)
        return message.reply("Nagyobb rangja lehet nálam? Csak mert nem tudom bannolni!");

      let reason = args.slice(1).join(' ');
      if (!reason) reason = "Nincs indok";

      await member.ban(reason)
        .catch(error => message.reply(`Bocsi ${message.author} Nem bannolhatom ezért: ${error}`));
      message.channel.send(`**${member.user.tag}** Felhasználó Kibanolva ő által: ${message.author} Indok:: ${reason}`);
    }


});


client.on('guildMemberAdd', member => {
  member.guild.channels.get('469579024721772546').sendMessage('**' + member.user + '**, Üdv a Főnixek között.');
  member.addRole(member.guild.roles.find("name", "Fióka"));

});

client.on('guildMemberRemove', member => {
  member.guild.channels.get('469579024721772546').sendMessage('**' + member.user.username + '**, Már nem főnix... Szia...');

});


client.login(config.token);




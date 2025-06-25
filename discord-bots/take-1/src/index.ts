import { Client } from "discord.js-selfbot-v13";

const client = new Client();

client.on("ready", async () => {
  console.log(`Logged in as ${client.user?.tag}!`);
});

client.on("guildMemberAdd", async (member) => {
  console.log(member);
});

client.login(process.env.DISCORD_SELF_BOT_TOKEN ?? "");

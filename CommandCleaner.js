const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
	// Setting bot activity
	client.user.setActivity("you fap onto the freshly washed blanket from 12pm to 4am", 
	{type:"STREAMING", url:process.env.STREAMING_URL});
});

// Token from https://discord.com/developers/applications
client.login(process.env.BOT_TOKEN);

client.on('message', function(message,user){
	var msg = message.content.toLowerCase();
	// Ignore bot messages
	if(message.author.bot)return;
	
	// Clean Groovy play and queue command
	//else if((message.content.substring(0,5).toLowerCase() == '-play') || (message.content.substring(0,3).toLowerCase() == '-p ') || (message.content.substring(0,2).toLowerCase() == '-q')){
	
	// Clean all command starting with '-'
	else if((message.content.substring(0,1).toLowerCase() == '-')){
		setTimeout(()=>{
			message.delete();
			//message.reply("Cleaned").then( botReply => {botReply.delete({ timeout: 2000 })}).catch();
		},3000);
	}
});
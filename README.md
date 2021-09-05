# DiscordCommandCleaner
<h1>Cleans up user command when calling Rythm or Groovy bot.</h1>
The bot will clean up any user messages starting with '-' during active. Useful for cleaning up Rythm '!" and Groovy '-'. May unintentionally cleans up non-command message starting with '!' or '-' too.

Host the bot on your machine manually, or deploy the bot to cloud platform Heroku (Note: Heroku non-creditcard registered version will only allow up to 550 dyno hours/uptime in total. 
To keep the bot running at all time, do register your account with credit card information to extend the free dyno hours limit to 1100.). 

Bot deployed on Heroku will run using 'worker' dyno, it will stay active until an error occur or insufficient resources.

<h2>Pre-requisites</h2>

1. Have NodeJS installed in your machine. Install NodeJS from https://nodejs.org/en/download/.

	Install Discord's JavaScript library globally by `npm install -g discord.js`

2. For Heroku deployment, register a Heroku account. Visit Heroku at https://dashboard.heroku.com/

3. For scheduling Heroku bot uptime, create a new project for Google Apps Script. Visit apps script console at https://script.google.com/u/0/home/.

4. **IMPORTANT: Make modification to the files** by replacing the relevant fields with your token.

5. Set up discord bot at https://discord.com/developers/applications. Retrieve bot token from bot tab. Invite bot to server at OAuth2 tab by defining the scope and permissions, followed with visiting the link generated at the scope division.

<h2>Manual hosting</h2>

1. Open command line by ctrl + R and search for cmd.

2. CD to the bot files directory. eg. `CD 'C:\Users\Users\Desktop\discord bot\'`.

3. Run the JavaScript file by `node CommandCleaner_Manual.js`.


<h2>Cloud hosting using Heroku</h2>

1. Register a Heroku account. 

2. Create a new application.

3. Add nodejs buildpack during application creation, or add it manually in application setting tab.

4. Follow the deployment instructions in Deploy tab, according to your deployment method. Deploy the .js, Procfile and package.json.

5. Enter the resource tab, click on the edit buttons, disable 'web' dyno and enable the 'worker' dyno. Or run `heroku ps:scale web=0` and `heroku ps:scale worker=1'`.

6. Enter setting tab, under Config Vars section: Add 'BOT_TOKEN' as key, and the discord bot token as value. Add 'STREAMING_URL' as key, and the link to display as value.

7. Save changes.

<h2>Google Apps Script Scheduler</h2>

Incase where you want to run the bot for selected time **without using Heroku's scheduler**, you can opt for scaling the worker dyno allocated for the bot's application using Google Apps Script trigger/scheduler.

1. Create new project in Google Apps Script. Visit apps script console at https://script.google.com/u/0/home/.

2. Replace the code with the code found within `scheduler.gs`. Modify the offTimeStart, offTimeEnd, your tokens and application name.

3. Add trigger for the project, specify the time and choose to run `scheduledAlteration()` function. 



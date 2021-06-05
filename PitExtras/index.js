let config = null;
let closed = false
let MAJOR_EVENT_NAMES = ['Robbery','Spire','Squads','Beast','Blockhead','Rage Pit','Raffle','Pizza','Team Deathmatch'];
let EVENT_COLORS = [
    {
      name: "Dragon Egg",
      color: "§5"
    },
    {
      name: "Robbery",
      color: "§6"
    },
    {
      name: "Auction",
      color: "§e"
    },
    {
      name: "Quick Maths",
      color: "§5"
    },
    {
      name: "KOTH",
      color: "§b"
    },
    {
      name: "Care Package",
      color: "§6"
    },
    {
      name: "Squads",
      color: "§b"
    },
    {
      name: "2x Rewards",
      color: "§2"
    },
    {
      name: "KOTL",
      color: "§a"
    },
    {
      name: "Spire",
      color: "§5"
    },
    {
      name: "Beast",
      color: "§a"
    },
    {
      name: "Giant Cake",
      color: "§d"
    },
    {
      name: "All bounty",
      color: "§6"
    },
    {
      name: "Blockhead",
      color: "§9"
    },
    {
      name: "Rage Pit",
      color: "§c"
    },
    {
      name: "Raffle",
      color: "§6"
    },
    {
      name: "Pizza",
      color: "§c"
    },
    {
      name: "Team Deathmatch",
      color: "§5"
    }
  ]

import { promptKey } from 'PitPandaApiKeyManager';
import { request } from "requestV2";


function getEvents() {
  if (config == null){
    readConfig();
  }
  config.eventsList = [];
  try {
    promptKey('BetterEventInfo').then(key => {
        fetchEventFromPitPanda(key);
    })
  } catch (e){
    ChatLib.chat(e);
  }
};

const fetchEventFromPitPanda = (key) => {
  request({
    url: `https://events.mcpqndq.dev?key=${key}`,
    json: true,
    headers: {
      "User-Agent": "BetterEvents",
    }
  }).then(function(response) {
    try {
      //ChatLib.chat(response);
      //ChatLib.chat(JSON.stringify(response));
      config.eventsList = response;
      saveConfig();
    } catch (e) {
      ChatLib.chat("&c&lPitPanda API Request Failed");
      ChatLib.chat(e);
      return ({success: false})
    }
  })
};

function upcomingEvents(){
  let NUM_EVENTS_TO_SHOW = 6;
  for(let i = 0; i < NUM_EVENTS_TO_SHOW; i++){
    let currentEvent = config.eventsList[i];
    ChatLib.chat(JSON.stringify(currentEvent));
    let timeNow = Date.now();
    ChatLib.chat(currentEvent.timestamp - timeNow);
    let timeUntilEvent = convertMiliseconds((currentEvent.timestamp - timeNow), '');
    let eventString = ""
    if (MAJOR_EVENT_NAMES.includes(currentEvent.event)){
      eventString = eventString + "&eMajor &f-"
    } else {
      eventString = eventString + "&6Minor &f-"
    }
    let timeString = ""
    if (timeUntilEvent.d > 0){
      timeString = timeString + ` ${timeUntilEvent.d}d `;
    }
    if (timeUntilEvent.h > 0){
      timeString = timeString + ` ${timeUntilEvent.h}h `;
    }
    if (timeUntilEvent.m > 0){
      timeString = timeString + ` ${timeUntilEvent.m}m`;
    }
    ChatLib.chat(`&f[${eventString} ${currentEvent.event} ${timeString}&f]`)
  }
}

register("renderOverlay", myRenderOverlay);
let xPos = 100;
let yPos = 100;
let gettingEvents = false;
var myTextObject = new Text(`Testing §11 §22 §33`, 10, 30).setColor(Renderer.RED).setShadow(false).setScale(1);
function myRenderOverlay() {
  try {
    if (config == null) return;
    let NUM_EVENTS_TO_SHOW = 6;
    if (config.eventsList.length <= NUM_EVENTS_TO_SHOW){
      if ((gettingEvents == false) && (ChatLib.removeFormatting(Scoreboard.getTitle()) == "THE HYPIXEL PIT")){
          getEvents();
          gettingEvents = true;
      }
    }
    let x = config.x;
    let y = config.y;
    let timeNow = Date.now();
    config.eventsList.forEach((item, i) => {
      if(item.timestamp < timeNow){
        config.eventsList.splice(i, 1);
      }
    });
    for(let i = 0; i < NUM_EVENTS_TO_SHOW; i++){
      if (i < (config.eventsList.length - 1)){
        let currentEvent = config.eventsList[i];
        let timeUntilEvent = convertMiliseconds((currentEvent.timestamp - timeNow), '');
        let eventString = ""
        if (MAJOR_EVENT_NAMES.includes(currentEvent.event)){
          eventString = eventString + "§eMajor §f-"
        } else {
          eventString = eventString + "§6Minor §f-"
        }
        let timeString = ""
        if (timeUntilEvent.d > 0){
          timeString = timeString + `§f ${timeUntilEvent.d}§ed `;
        }
        if (timeUntilEvent.h > 0){
          timeString = timeString + `§f ${timeUntilEvent.h}§eh `;
        }
        if (timeUntilEvent.m > 0){
          timeString = timeString + `§f ${timeUntilEvent.m}§em`;
        } else {
          timeString = timeString + `§f Now`;
        }
        let eventColor = "§e"
        const index = EVENT_COLORS.findIndex(e => e.name === currentEvent.event);
        if (index > -1) {
            eventColor = EVENT_COLORS[index].color;
        }
        myTextObject.setX(x).setY(y).setString(`§f[${eventString} ${eventColor}${currentEvent.event} ${timeString}§f]`)
        drawBold(myTextObject);
        y += 10;
      } else {
        myTextObject.setX(x).setY(y).setString(`§c[OUT OF EVENTS]`)
        drawBold(myTextObject);
        y += 10;
      }
    }
  } catch (e) {
    ChatLib.chat(e)
  }
};

function convertMiliseconds(miliseconds, format) {
  var days;
  var hours;
  var minutes;
  var seconds;
  var total_hours;
  var total_minutes;
  var total_seconds;

  total_seconds = parseInt(Math.floor(miliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));
  total_hours = parseInt(Math.floor(total_minutes / 60));
  days = parseInt(Math.floor(total_hours / 24));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  hours = parseInt(total_hours % 24);

  switch(format) {
	case 's':
		return total_seconds;
	case 'm':
		return total_minutes;
	case 'h':
		return total_hours;
	case 'd':
		return days;
	default:
		return { d: days, h: hours, m: minutes, s: seconds };
  }
};

register('command', () => {
  upcomingEvents();
}).setName(`upcomingevents`);

register('command', (command) => {
  if (command == "get"){
    getEvents();
  } else if (command == "show"){
    upcomingEvents();
  } else {
    eventsGui.open();
  }
}).setName(`betterevents`);

function drawBold(text) {
  let borderSize = text.getScale();
  if (ChatLib.removeFormatting(Scoreboard.getTitle()) !== "THE HYPIXEL PIT") return;
  let x = text.getX();
  let y = text.getY();
  let darkText = new Text(text.getString().replace(/(§[a-z0-9])+/g,""), x, y).setColor(Renderer.BLACK).setScale(text.getScale());
  darkText.setColor(Renderer.BLACK);
  darkText.setX(x+borderSize).setY(y).draw();
  darkText.setX(x-borderSize).setY(y).draw();
  darkText.setX(x).setY(y+borderSize).draw();
  darkText.setX(x).setY(y-borderSize).draw();
  darkText.setX(x).setY(y);
  text.draw();
}

//Defining a bunch of global variables
var globalMouseX = 0;
var globalMouseY = 0;
var offsetX = 0;
var offsetY = 0;

//Creating GUI to allow user to move cursor
var eventsGui = new Gui()

eventsGui.registerMouseDragged(eventsDragFunction);
function eventsDragFunction(mouseX, mouseY) {
    readConfig();
    //Saves mouse coordinates into persistent data to store location of UI
    config.x = mouseX
    config.y = mouseY

    //Saves mouse coordinates into global variable
    globalMouseX = mouseX;
    globalMouseY = mouseY;



    //Complicated algorithm to save screen position even when screen size changes
    if (mouseX < Renderer.screen.getWidth() / 2 ) {
        offsetX = mouseX;
    }
    else {
        offsetX = Renderer.screen.getWidth() - mouseX
    }

    if (mouseY < Renderer.screen.getHeight() / 2) {
        offsetY = mouseY
    }
    else {
        offsetY = Renderer.screen.getHeight() - mouseY
    }
    saveConfig();
}

const readConfig = () => {
        try {
            config = JSON.parse(FileLib.read('./config/ChatTriggers/modules/BetterEventInfo/config.json'));
            if (!config) {
              config = {
                  x: 100,
                  y: 100,
                  eventsList: []
                };
            }
        } catch (e) {
            config = {
              x: 100,
              y: 100,
              eventsList: []
            };
        }
};

readConfig();

const saveConfig = () => {
    FileLib.write('./config/ChatTriggers/modules/BetterEventInfo/config.json', JSON.stringify(config, null, 2));
}

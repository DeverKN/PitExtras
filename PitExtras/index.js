let auraOfProtectionLength = 15;
let eggCooldown = 10;
let aaaSteakLength = 10;
let eggTime = null;
let auraTime = null;
let steakTime = null;
let timeNow = null;
let gladiator = 0;
let shark = 0;
let solitude = 0;
let gladTier = 0;
let sharkTier = 0;
let soliTier = 0;
var config = null;
let lowLifeItems = [];
let spawnTime = null;
let lastMessage = null;
let wearingBadArmor = false;
let newLife = true;
let warningMessage = false;
let onGenesis = false;
let genesisSymbol = ""
let apiKeyWarningSent = false
var streakInfo = {endTime: null,
  startTime: null,
  kills: 0,
  assists: 0,
  gold: 0,
  xp: 0,
  goldPerKill: 0,
  xpPerKill: 0,
  topGoldPerKill: 0,
  topXpPerKill: 0}
  let oldGoldLine = null;
  let goldLine = 0;
  var playerStats = {
    pres: null,
    goldGrinded: null,
    factionPoints: null,
    currentGold: null,
    xp: null,
    lastUpdated: 0
  }
  let currentPlayerGold = 0;
  let prestigeInfo = [
    {Multiplier: 1, TotalXp: 65950, SumXp: 65950, GoldReq: 10000, Renown: 0, Color: "GRAY", ColorCode:"§7"},
    {Multiplier: 1.1, TotalXp: 72560, SumXp: 138510, GoldReq: 22000, Renown: 10, Color: "BLUE", ColorCode:"§9"},
    {Multiplier: 1.2, TotalXp: 79170, SumXp: 217680, GoldReq: 24000, Renown: 10, Color: "BLUE", ColorCode:"§9"},
    {Multiplier: 1.3, TotalXp: 85750, SumXp: 303430, GoldReq: 26000, Renown: 10, Color: "BLUE", ColorCode:"§9"},
    {Multiplier: 1.4, TotalXp: 92330, SumXp: 395760, GoldReq: 28000, Renown: 10, Color: "BLUE", ColorCode:"§9"},
    {Multiplier: 1.5, TotalXp: 98940, SumXp: 494700, GoldReq: 30000, Renown: 10, Color: "YELLOW", ColorCode:"§e"},
    {Multiplier: 1.75, TotalXp: 115440, SumXp: 610140, GoldReq: 70000, Renown: 20, Color: "YELLOW", ColorCode:"§e"},
    {Multiplier: 2, TotalXp: 131900, SumXp: 742040, GoldReq: 80000, Renown: 20, Color: "YELLOW", ColorCode:"§e"},
    {Multiplier: 2.5, TotalXp: 164890, SumXp: 906930, GoldReq: 100000, Renown: 20, Color: "YELLOW", ColorCode:"§e"},
    {Multiplier: 3, TotalXp: 197850, SumXp: 1104780, GoldReq: 120000, Renown: 20, Color: "YELLOW", ColorCode:"§e"},
    {Multiplier: 4, TotalXp: 263800, SumXp: 1368580, GoldReq: 160000, Renown: 20, Color: "GOLD", ColorCode:"§6"},
    {Multiplier: 5, TotalXp: 329750, SumXp: 1698330, GoldReq: 200000, Renown: 30, Color: "GOLD", ColorCode:"§6"},
    {Multiplier: 6, TotalXp: 395700, SumXp: 2094030, GoldReq: 240000, Renown: 30, Color: "GOLD", ColorCode:"§6"},
    {Multiplier: 7, TotalXp: 461650, SumXp: 2555680, GoldReq: 280000, Renown: 30, Color: "GOLD", ColorCode:"§6"},
    {Multiplier: 8, TotalXp: 527600, SumXp: 3083280, GoldReq: 320000, Renown: 30, Color: "GOLD", ColorCode:"§6"},
    {Multiplier: 9, TotalXp: 593550, SumXp: 3676830, GoldReq: 360000, Renown: 30, Color: "RED", ColorCode:"§c"},
    {Multiplier: 10, TotalXp: 659500, SumXp: 4336330, GoldReq: 400000, Renown: 40, Color: "RED", ColorCode:"§c"},
    {Multiplier: 12, TotalXp: 791400, SumXp: 5127730, GoldReq: 480000, Renown: 40, Color: "RED", ColorCode:"§c"},
    {Multiplier: 14, TotalXp: 923300, SumXp: 6051030, GoldReq: 560000, Renown: 40, Color: "RED", ColorCode:"§c"},
    {Multiplier: 16, TotalXp: 1055200, SumXp: 7106230, GoldReq: 800000, Renown: 40, Color: "RED", ColorCode:"§c"},
    {Multiplier: 18, TotalXp: 1187100, SumXp: 8293330, GoldReq: 900000, Renown: 40, Color: "DARK_PURPLE", ColorCode:"§5"},
    {Multiplier: 20, TotalXp: 1319000, SumXp: 9612330, GoldReq: 1000000, Renown: 50, Color: "DARK_PURPLE", ColorCode:"§5"},
    {Multiplier: 24, TotalXp: 1582800, SumXp: 11195130, GoldReq: 1200000, Renown: 50, Color: "DARK_PURPLE", ColorCode:"§5"},
    {Multiplier: 28, TotalXp: 1846600, SumXp: 13041730, GoldReq: 1400000, Renown: 50, Color: "DARK_PURPLE", ColorCode:"§5"},
    {Multiplier: 32, TotalXp: 2110400, SumXp: 15152130, GoldReq: 1600000, Renown: 50, Color: "DARK_PURPLE", ColorCode:"§5"},
    {Multiplier: 36, TotalXp: 2374200, SumXp: 17526330, GoldReq: 1800000, Renown: 50, Color: "LIGHT_PURPLE", ColorCode:"§d"},
    {Multiplier: 40, TotalXp: 2638000, SumXp: 20164330, GoldReq: 2400000, Renown: 75, Color: "LIGHT_PURPLE", ColorCode:"§d"},
    {Multiplier: 45, TotalXp: 2967750, SumXp: 23132080, GoldReq: 2700000, Renown: 75, Color: "LIGHT_PURPLE", ColorCode:"§d"},
    {Multiplier: 50, TotalXp: 3297500, SumXp: 26429580, GoldReq: 3000000, Renown: 75, Color: "LIGHT_PURPLE", ColorCode:"§d"},
    {Multiplier: 75, TotalXp: 4946250, SumXp: 31375830, GoldReq: 6000000, Renown: 75, Color: "LIGHT_PURPLE", ColorCode:"§d"},
    {Multiplier: 100, TotalXp: 6595000, SumXp: 37970830, GoldReq: 10000000, Renown: 250, Color: "WHITE", ColorCode:"§f"},
    {Multiplier: 101, TotalXp: 6660950, SumXp: 44631780, GoldReq: 12120000, Renown: 100, Color: "WHITE", ColorCode:"§f"},
    {Multiplier: 101, TotalXp: 6660950, SumXp: 51292730, GoldReq: 14140000, Renown: 100, Color: "WHITE", ColorCode:"§f"},
    {Multiplier: 101, TotalXp: 6660950, SumXp: 57953680, GoldReq: 16160000, Renown: 100, Color: "WHITE", ColorCode:"§f"},
    {Multiplier: 101, TotalXp: 6660950, SumXp: 64614630, GoldReq: 18180000, Renown: 100, Color: "WHITE", ColorCode:"§f"},
    {Multiplier: 101, TotalXp: 6660950, SumXp: 71275580, GoldReq: 0, Renown: 100, Color: "AQUA", ColorCode:"§b"}
  ];

  var openGUI = null;
  var cooldowns = {telebow:{cooldownInSec:null, lastused:null}};
  let currentFactionPoints = 0;
  let MILLISEC_TO_SEC = 1000
  //import { promptKey, getKeyInfo, hasKey, validify } from '../HypixelApiKeyManager';

  import { Promise } from "PromiseV2";
  import { request } from "requestV2";
  import { Setting, SettingsObject } from "../SettingsManager/SettingsManager";

  const NBTTagList = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.nbt.NBTTagList")
  const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString")
  const ItemStack = Java.type("net.minecraft.item.ItemStack");
  const NBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
  const NBTTagInt = Java.type('net.minecraft.nbt.NBTTagInt');
  let scoreBoardAlign = "center";
  //pitExtrasSettings.getSetting("LifeSaver", "Enabled")

  let spawnY = getSpawnY();
  function getSpawnY(){
    let lowestY = 0;
    World.getAllEntitiesOfType(Java.type("net.minecraft.entity.passive.EntityVillager").class).forEach((item, i) => {
      //ChatLib.chat(item.getY());
      lowestY = Math.max(lowestY, item.getY())
    });
    return(lowestY);
  }


  register("chat", (msg, event) => {
    msg = msg.toString().trim()
    let assist = msg.includes(`§a§lASSIST!`);
    let kill = ((msg.includes(`KILL!`) && msg.includes(`§a`) && msg.includes(`§l`)) ? true : false)
    if (msg.includes(`§c§lDEATH!`)){
      streakInfo.endTime = Date.now();
      if ((streakInfo.startTime == null) || (pitExtrasSettings.getSetting("GUI", "Show Streak Info") == false)) return;
      let time = ((streakInfo.endTime - streakInfo.startTime)/MILLISEC_TO_SEC).toFixed(2)
      if (time > 60){
        if (pitExtrasSettings.getSetting("GUI", "Show Streak Info")){
          try {
            let goldPerMinute = (((streakInfo.gold*60)/time)).toFixed(2);
            let xpPerMinute =(((streakInfo.xp*60)/time)).toFixed(2);
            let goldReqEstimate = 0;
            let goldReqRemaining = 0;
            if (playerStats.goldGrinded != null){
              goldReqEstimate = playerStats.goldGrinded;
              if (currentPlayerGold > playerStats.currentGold){
                if (pitExtrasSettings.getSetting("Custom Scoreboard", "Estimate Gold Req")){
                  goldReqEstimate = (parseFloat(goldReqEstimate) + (parseFloat(currentPlayerGold) - parseFloat(playerStats.currentGold))).toFixed(2);
                }
              }
              goldReqRemaining = prestigeInfo[playerStats.pres].GoldReq - goldReqEstimate;
            }
            let goldReqMinutes = (goldReqRemaining / goldPerMinute);
            let xpReqRemaining = ((prestigeInfo[playerStats.pres].SumXp - prestigeInfo[playerStats.pres - 1].SumXp) - (playerStats.xp - prestigeInfo[playerStats.pres - 1].SumXp))
            let xpReqMinutes = (xpReqRemaining / xpPerMinute);
            ChatLib.chat(`§eYou Streaked for §f${Math.floor(time/60)}m ${Math.floor(time%60)}s`)
            ChatLib.chat(`§eYou earned §6${streakInfo.gold.toFixed(2)}g Gold and §b${streakInfo.xp} XP`)
            ChatLib.chat(`§eYou got §c${streakInfo.kills} Kills §eand §c${streakInfo.assists} Assists`)
            ChatLib.chat(`§eYou earned §6${goldPerMinute}g, §b${xpPerMinute} XP, and §c${((streakInfo.kills*60)/time).toFixed(2)} Kills §eper minute`)
            ChatLib.chat(`§eYou earned §6${streakInfo.goldPerKill.toFixed(2)}g §eand §b${streakInfo.xpPerKill} XP§e per kill`)
            ChatLib.chat(`§eAt this rate it would take §f${minToTimeString(goldReqMinutes)}§eto complete your §6Gold §eReq and §f${minToTimeString(xpReqMinutes)}§eto complete your §bXP §eReq`)
            ChatLib.chat(`§eYour best kill earned you §6${streakInfo.topGoldPerKill.toFixed(2)}g §eand §b${streakInfo.topXpPerKill} XP§e`)
          } catch (e) {
            ChatLib.chat(e)
          }
        }
      }
      return;
    }
    if (kill || assist) {
      let xp = msg.split("+")[1]
      let gold = msg.split("+")[2].replace(/§6/g, "").replace(`,`,"")
      if (kill){
        if (onGenesis){
          let genesisPointsGained = msg.split("+")[3].substring(0,1);
          playerStats.factionPoints += Number.parseFloat(genesisPointsGained);
        }
      }
      if (pitExtrasSettings.getSetting("Custom Scoreboard", "Estimate Pres XP %")){
        playerStats.xp += Number.parseInt(xp);
      }
      if ((streakInfo.startTime != null) && (streakInfo.endTime == null)){
        streakInfo.kills += Number.parseInt(kill ? 1 : 0);
        streakInfo.assists += Number.parseInt(assist ? 1 : 0);
        streakInfo.gold += parseFloat(gold)
        streakInfo.xp += Number.parseInt(xp);
        if (kill){
          streakInfo.goldPerKill = parseFloat(gold);
          streakInfo.topGoldPerKill = (parseFloat(gold) > streakInfo.topGoldPerKill ? parseFloat(gold) : streakInfo.topGoldPerKill)
          streakInfo.xpPerKill = Number.parseInt(xp);
          streakInfo.topXpPerKill = (Number.parseInt(xp) > streakInfo.topXpPerKill ? Number.parseInt(xp) : streakInfo.topXpPerKill)
        }
      } else {
        streakInfo.startTime = Date.now();
        streakInfo.endTime = null;
        streakInfo.kills = Number.parseInt(kill ? 1 : 0);
        streakInfo.assists = Number.parseInt(assist ? 1 : 0);
        streakInfo.gold = parseFloat(gold)
        streakInfo.xp = Number.parseInt(xp);
        if (kill){
          streakInfo.goldPerKill = parseFloat(gold);
          streakInfo.topGoldPerKill = parseFloat(gold);
          streakInfo.xpPerKill = Number.parseInt(xp);
          streakInfo.topXpPerKill = Number.parseInt(xp);
        }
      }

      if (kill){
        try {
          let item = Player.getHeldItem();
          let pants = World.getPlayerByName(Player.getName()).getItemInSlot(2);
          trackItemStats(item, "kills", 1)
          trackItemStats(item, "xp", Number.parseInt(xp))
          trackItemStats(item, "gold", parseFloat(gold))

          trackItemStats(pants, "kills", 1)
          trackItemStats(pants, "xp", Number.parseInt(xp))
          trackItemStats(pants, "gold", parseFloat(gold))
        } catch (e) {
          ChatLib.chat(e)
        }
      } else {
        try {
          let item = Player.getHeldItem();
          let pants = World.getPlayerByName(Player.getName()).getItemInSlot(2);
          trackItemStats(item, "assists", 1)
          trackItemStats(item, "xp", Number.parseInt(xp))
          trackItemStats(item, "gold", parseFloat(gold))

          trackItemStats(pants, "assists", 1)
          trackItemStats(pants, "xp", Number.parseInt(xp))
          trackItemStats(pants, "gold", parseFloat(gold))
        } catch (e) {
          ChatLib.chat(e)
        }
      }
    }
  }).setCriteria("${msg}").setContains();

  function minToTimeString(timeInMinutes){
    let HR_TO_MIN_TO_SEC = 60
    let timeString = ""
    if (timeInMinutes >= 60){
      timeString = timeString + `${Math.floor(timeInMinutes / HR_TO_MIN_TO_SEC)}hr `
      timeInMinutes = timeInMinutes - Math.floor(timeInMinutes % HR_TO_MIN_TO_SEC);
    }
    timeString = timeString + `${Math.floor(timeInMinutes)}min `
    timeInMinutes = timeInMinutes - Math.floor(timeInMinutes);
    if (timeInMinutes > 0){
      timeString = timeString + `${Math.floor(timeInMinutes * HR_TO_MIN_TO_SEC)}s `
    }
    return timeString;
  }

  function trackItemStats(item, stat, increaseAmount){
    try {
      //ChatLib.chat("read config")
      const tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
      let nonce = tags.getTag("Nonce");
      if (nonce === null){
        return;
      }
      let itemIndex = -1
      config.itemStats.forEach((item, i) => {
        if (item.nonce.toString() == nonce.toString()){
          itemIndex = i;
        }
      });
      if (itemIndex > -1) {
        config.itemStats[itemIndex][stat] = config.itemStats[itemIndex][stat] + increaseAmount;
      } else {
        config.itemStats.push({
          nonce: nonce.toString(),
          kills: 0,
          assists: 0,
          xp: 0,
          gold: 0}
        )
        config.itemStats[config.itemStats.length - 1][stat] = config.itemStats[config.itemStats.length - 1][stat] + increaseAmount;
      }
      try {
        saveConfig();
      } catch (r) {
        ChatLib.chat(r);
      }
    } catch (e) {
      ChatLib.chat(e)
    }
  }

  //Commands to edit config
  const setKey = register("command", (command, value) => {
    if (command == "set"){
      if (value.length > 0){
        saveConfig()
        readConfig();
        config.key = value
        saveConfig();
      }
    } else {
      ChatLib.chat("&aCommand not recognized - valid commands:");
      ChatLib.chat("&b/apikey set (key)");
    }
  }).setName("apikey")

  //Check Nearby players
  const getNearby = register(`step`, (steps) =>{
    getHiddenJewelProgress();
    //Get the player's mystic enchants
    let player = World.getPlayerByName(Player.getName());
    let sword = player.getItemInSlot(0);
    let pants = player.getItemInSlot(2);
    if (pants.getName() != "tile.air.name"){
      //Get Gladiator Tier (If any)
      if (pants.getLore().join().includes('"Not" Gladiator III')){
        gladTier = 3;
      } else if (pants.getLore().join().includes('"Not" Gladiator II')){
        gladTier = 2;
      } else if (pants.getLore().join().includes('"Not" Gladiator')){
        gladTier = 1;
      } else {
        gladTier = 0;
      }
      //Get Solitude Tier (If any)
      if (pants.getLore().join().includes('Solitude III')){
        soliTier = 3;
      } else if (pants.getLore().join().includes('Solitude II')){
        soliTier = 2;
      } else if (pants.getLore().join().includes('Solitude')){
        soliTier = 1;
      } else {
        soliTier = 0;
      }
    } else {
      soliTier = 0;
      gladTier = 0;
    }
    if (sword.getName() != "tile.air.name"){
      //Get Shark Tier (If any)
      if (sword.getLore().join().includes('Shark III')){
        sharkTier = 3;
      } else if (sword.getLore().join().includes('Shark II')){
        sharkTier = 2;
      } else if (sword.getLore().join().includes('Shark')){
        sharkTier = 1;
      } else {
        sharkTier = 0;
      }
    } else {
      sharkTier = 0;
    }
    //If the player is in spawn then set all values to 0
    if (World.getPlayerByName(Player.getName()).getY() >= (spawnY - 7)){
      gladiator = 0;
      shark = 0;
      solitude = 0;
      return;
    };
    let players = TabList.getNames()
    .map(name => name.replace(/§/g, "&"))
    .map(name => name.replace(/&[abcdef0-9klm](HERMIT|HIGH|UBER\d+|OVERDRIVE|BEAST|MOON) /, ""))
    .map(name => ChatLib.removeFormatting(name))
    .map(name => name.split(" ")[1])
    .map(player => World.getPlayerByName(player))
    .filter(player => player !== null && player.getName() !== Player.getName());
    players.forEach(player => {
    });
    gladiator = players.filter(player => playerDistance(World.getPlayerByName(Player.getName()), player) <= 12).length;
    //Gladiator maxes at 10 players
    gladiator = (gladiator <= 10 ? gladiator : 10)
    solitude = players.filter(player => playerDistance(World.getPlayerByName(Player.getName()), player) <= 7).length;
    shark = players.filter(player => playerDistance(World.getPlayerByName(Player.getName()), player) <= 12)
    .filter(player => player.getHP() <= 12)
    .length;

  }).setDelay(1);


  //Get the distance between two players
  function playerDistance(player1, player2){
    var a = player1.getX() - player2.getX();
    var b = player1.getY() - player2.getY();
    var c = Math.sqrt( a*a + b*b );
    return c;
  };

  //Defining a bunch of global variables
  var globalMouseX = 0;
  var globalMouseY = 0;
  var offsetX = 0;
  var offsetY = 0;

  //Creating GUI to allow user to move cursor
  var myGui = new Gui()

  //Creating Trigger that tracks when you drag your mouse in GUI
  myGui.registerMouseDragged(dragFunction)

  //Two important parameters: mouseX, mouseY
  function dragFunction(mouseX, mouseY) {
    readConfig();
    //Saves mouse coordinates into persistent data to store location of UI
    if (openGUI == "main"){
      config.position.x = mouseX
      config.position.y = mouseY
    } else if (openGUI == "streak"){
      config.streakGUI.x = mouseX
      config.streakGUI.y = mouseY
    } else if (openGUI == "scoreboard"){
      config.scoreboard.x = mouseX
      config.scoreboard.y = mouseY
    } else if (openGUI == "jewel"){
      config.jewelGUI.x = mouseX
      config.jewelGUI.y = mouseY
    }

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

  let SCREEN_WIDTH_TO_SB_X_RATIO = 1/1.2
  let SCREEN_HEIGHT_TO_SB_Y_RATIO = 1/3
  // Read Config
  const readConfig = () => {
    try {
      config = JSON.parse(FileLib.read('./config/ChatTriggers/modules/PitExtras/config.json'));
      if (!config) {
        config = {
          enabled: true,
          auraWindow: 0,
          steakWindow: 0,
          forceShiftEnabled: false,
          lifeSaver: true,
          lifeLimit: 3,
          streakCutoff: 20,
          streakerHUD: true,
          scoreboard: {
            x: Renderer.screen.getWidth() * SCREEN_WIDTH_TO_SB_X_RATIO,
            y: Renderer.screen.getHeight() * SCREEN_HEIGHT_TO_SB_Y_RATIO},
            streakGUI: {
              x: 10,
              y: 30},
              jewelGUI: {
                x: 10,
                y: 30},
                position: {
                  x: 10,
                  y: 30,
                  scale: 1},
                  key: null,
                  itemStats: []
                };
              }
            } catch (e) {
              config = {
                enabled: true,
                auraWindow: 0,
                steakWindow: 0,
                forceShiftEnabled: false,
                lifeSaver: true,
                lifeLimit: 3,
                streakCutoff: 20,
                streakerHUD: true,
                scoreboard: {
                  x: 570,
                  y: Renderer.screen.getHeight() * SCREEN_HEIGHT_TO_SB_Y_RATIO},
                  streakGUI: {
                    x: 10,
                    y: 30},
                    position: {
                      x: 10,
                      y: 30,
                      scale: 1},
                      key: null,
                      itemStats: []
                    };
                  }
                };

                //Save Config to File
                const saveConfig = () => {
                  FileLib.write('./config/ChatTriggers/modules/PitExtras/config.json', JSON.stringify(config, null, 2));
                }

                //Left Click Handler
                const clicked = register("clicked", (x, y, button, state) => {
                  //This function only handles left clicks
                  //If the click is not a left click terminate
                  if (button != 0) return;
                  //If the click is releasing the button rather then pressing it down, ignore it
                  if (state != true) return;
                  //If the player is in a GUI ignore the click
                  if (Client.isInGui() == true) return;
                  itemName = Player.getHeldItem().getName();
                  itemUse(itemName, null);
                });

                //Right click handler
                register("playerInteract", clickFunction);
                function clickFunction(arg1, arg2, event) {
                  if (arg1.toString() != 'RIGHT_CLICK_EMPTY') return;
                  itemName = Player.getHeldItem().getName();
                  itemUse(itemName, event);
                }

                //item = name of held item, event = (optional) cancelable event
                function itemUse(item, event) {
                  //If the config hasn't been loaded, load it
                  if (config === null) readConfig();
                  timeNow = Date.now();
                  if (item === "§cFirst-Aid Egg"){
                    //Handle first aid egg off cooldown
                    eggTime = timeNow;
                  } else if (item === "§7First-Aid Egg"){
                    //Handle first aid egg on cooldown
                    if (eggTime == null) return;
                    let remainingCooldown = eggCooldown - ((timeNow - eggTime)/MILLISEC_TO_SEC);
                    remainingCooldown = ((remainingCooldown > 0) ? remainingCooldown.toFixed(2) : 0)
                    ChatLib.clearChat(110)
                    ChatLib.chat(new Message(`§cFirst-Aid Egg §fon cooldown for §6${remainingCooldown} seconds`).setChatLineId(110))
                  } else if (item === "§aAura of Protection"){
                    //Handle aura of protection
                    if (auraTime == null){
                      auraTime = timeNow;
                      return;
                    } else {
                      let auraRemaining = ((auraOfProtectionLength*MILLISEC_TO_SEC) - (timeNow - auraTime))/MILLISEC_TO_SEC;
                      auraRemaining = ((auraRemaining > 0) ? auraRemaining.toFixed(2) : 0)
                      if (auraRemaining <= (auraOfProtectionLength - pitExtrasSettings.getSetting("GUI", "Cooldown between Aura Uses"))) {
                        auraTime = timeNow;
                        ChatLib.chat(`§eUsed §aAura of Protection`);
                        return
                      } else {
                        // If there is an event cancel it
                        ChatLib.clearChat(010,111,222)
                        ChatLib.chat(new Message(`§6Aura true damage prot still in effect for §c${auraRemaining} seconds`).setChatLineId(111))
                        if (event != null) {
                          ChatLib.chat(new Message(`§aUse canceled`).setChatLineId(010))
                          ChatLib.chat(new Message(`§6You can use another §aAura §6in §c${auraRemaining - (auraOfProtectionLength - pitExtrasSettings.getSetting("GUI", "Cooldown between Aura Uses")).toFixed(2)} seconds`).setChatLineId(222))
                          cancel(event);
                        } else {
                          auraTime = timeNow;
                          ChatLib.chat(new Message(`§cUse not canceled because you left clicked`).setChatLineId(010))
                        }
                      }
                    }
                  } else if (item === "§6AAA-Rated Steak"){
                    //Handle AAA Steak
                    if (steakTime == null){
                      steakTime = timeNow;
                      ChatLib.chat(`§eUsed §6AAA-Rated Steak`);
                      return;
                    } else {
                      let steakRemaining = ((aaaSteakLength*MILLISEC_TO_SEC) - (timeNow - steakTime))/MILLISEC_TO_SEC;
                      steakRemaining = ((steakRemaining > 0) ? steakRemaining.toFixed(2) : 0);
                      if (steakRemaining <= (aaaSteakLength - pitExtrasSettings.getSetting("GUI", "Cooldown between AAA Steak Uses"))) {
                        steakTime = timeNow;
                        ChatLib.chat(`Used §6Steak`);
                        return;
                      } else {
                        // If there is an event cancel it
                        ChatLib.clearChat(010,234,567)
                        ChatLib.chat(new Message(`§6Steak buff still in effect for §c${steakRemaining} seconds`).setChatLineId(234))
                        if (event != null) {
                          ChatLib.chat(new Message(`§aUse canceled`).setChatLineId(010))
                          ChatLib.chat(new Message(`§aYou can use another §6Steak §ain §c${(steakRemaining - (aaaSteakLength - pitExtrasSettings.getSetting("GUI", "Cooldown between AAA Steak Uses"))).toFixed(2)} seconds`).setChatLineId(567))
                          cancel(event);
                        } else {
                          steakTime = timeNow;
                          ChatLib.chat(new Message(`§cUse not canceled because you left clicked`).setChatLineId(010))
                        }
                      }
                    }
                  } else {
                    return;
                  }
                };

                function romanToInt(romanNumerals){
                  let numeralValue = 0;
                  let largestNumeral = 0;
                  for(i = 0; i < romanNumerals.length; i++){
                    let curNumeral = romanCharToInt(romanNumerals.charAt(i));
                    if (curNumeral > largestNumeral){
                      largestNumeral = curNumeral;
                      numeralValue = curNumeral - numeralValue;
                    } else {
                      numeralValue += curNumeral;
                    }
                  }
                  return numeralValue;
                };

                function romanCharToInt(romanNumeral){
                  if (romanNumeral == 'I'){
                    return 1;
                  } else if (romanNumeral == 'V'){
                    return 5;
                  } else if (romanNumeral == 'X'){
                    return 10;
                  } else if (romanNumeral == 'L'){
                    return 50;
                  } else if (romanNumeral == 'C'){
                    return 100;
                  } else if (romanNumeral == 'D'){
                    return 500;
                  } else if (romanNumeral == 'M'){
                    return 1000;
                  }
                };

                function getScoreBoardToArray(maxScore) {
                  var customScoreboard = {
                    startScore: 0,
                    xpToNxtLvl: 0,
                    xpIndex: null,
                    currentGold: 0,
                    goldIndex: null,
                    lvl: 0,
                    lvlIndex: null,
                    pres: 0,
                    presIndex: null,
                    status: 0,
                    statusIndex: null,
                    streak: 0,
                    streakIndex: null,
                    urlIndex: null,
                    scoreboardArray : []
                  };

                  let index = 0;

                  Scoreboard.getLines(false).forEach((item) => {
                    if (item.getPoints() <= maxScore) {
                      if ((index == 0) && (item.getPoints() < maxScore)) {
                        customScoreboard.startScore = item.getPoints();
                      }
                      customScoreboard.scoreboardArray.push({text : item.getName(), index : index});
                      if (item.toString().includes("XP")){
                        if (item.toString().includes("MAXED") == false){
                          customScoreboard.xpToNxtLvl = Number.parseInt(item.toString().split(" ")[2].replace(/[^0-9]/g,""));
                        }
                        customScoreboard.xpIndex = index;
                      } else if (item.toString().includes("Gold")){
                        customScoreboard.currentGold = Number.parseFloat(item.toString().split(" ")[1].replace(/(§[a-z0-9])+/g,"").replace(/[^0-9]/g,""));
                        currentPlayerGold = customScoreboard.currentGold / 100;
                        customScoreboard.goldIndex = index;
                      } else if (item.toString().includes("Level")){
                        if (item.toString().split(" ")[2] != undefined){
                          onGenesis = true;
                          genesisSymbol = item.toString().split(" ")[2].substring(0,3);
                        } else {
                          onGenesis = false;
                        }
                        customScoreboard.lvl = Number.parseInt(item.toString().split(" ")[1].replace(/(§[a-z0-9])+/g,"").replace(/[^0-9]/g,""));
                        customScoreboard.lvlIndex = index;
                      } else if (item.toString().includes("Prestige")){
                        customScoreboard.pres = romanToInt(item.toString().split(" ")[1].replace(/([^IVX])+/g,""));
                        customScoreboard.presIndex = index;
                      } else if (item.toString().includes("Status")){
                        customScoreboard.status = item.toString().split(" ")[1].replace(/(§[a-z0-9])+/g,"");
                        customScoreboard.statusIndex = index;
                      } else if (item.toString().includes("Streak")){
                        customScoreboard.streak = Number.parseFloat(item.toString().split(" ")[1].replace(/(§[a-z0-9])/g,"").replace(/[^0-9]/g,""));
                        customScoreboard.streakIndex = index;
                      } else if ((item.toString().includes("hypixel")) || (item.toString().includes("§6§l"))){
                        customScoreboard.urlIndex = index;
                      }
                      index++;
                    }
                  })
                  return customScoreboard;
                };

                function addToCustomScoreboard(customScoreboardArray, text, index, deleteCurrent){
                  deleteCurrent = (typeof deleteCurrent !== 'undefined') ?  deleteCurrent : false;
                  customScoreboardArray.forEach((item) => {
                    if (item.index == index) {
                      if (deleteCurrent == false){
                        customScoreboardArray.push({text: text,
                          index: index})
                          item.index = item.index + 1;
                        } else {
                          item.text = text;
                        }
                      } else if (item.index > index) {
                        if (deleteCurrent == false){
                          item.index = item.index + 1;
                        }
                      }
                    });
                    return customScoreboardArray;
                  }

                  function rainbowString(string, tick){
                    //let colorCodeList = ["§4", "§c", "§e", "§a", "§2", "§9", "§b", "§5", "§d"];
                    let colorCodeList = ["§e", "§6§l", "§r§e", "§f", "", "", "", "", ""];
                    let result = ""
                    let i = tick;
                    string.split("").forEach(letter => {
                      if (i > 8){
                        i = 0;
                      }
                      result = result + colorCodeList[i] + letter;
                      i++;
                    });
                    return result;
                  }

                  let scoreBoardDisplay = new Display()
                  .setBackground(DisplayHandler.Background.FULL)
                  .setBackgroundColor(0x20000000)
                  .setRenderLoc(
                    Renderer.screen.getWidth() * SCREEN_WIDTH_TO_SB_X_RATIO,
                    Renderer.screen.getHeight() * SCREEN_HEIGHT_TO_SB_Y_RATIO)
                    let scoreBoardDisplayShadow = new Display()
                    .setBackground(DisplayHandler.Background.FULL)
                    .setBackgroundColor(0x20000000)
                    .setRenderLoc(
                      Renderer.screen.getWidth() * SCREEN_WIDTH_TO_SB_X_RATIO,
                      Renderer.screen.getHeight() * SCREEN_HEIGHT_TO_SB_Y_RATIO)
                      scoreBoardDisplay.addLine(
                        new DisplayLine("Test Line")
                        .setAlign("center")
                      )

                      function createCustomScoreBoard (){
                        if (ChatLib.removeFormatting(Scoreboard.getTitle()) !== "THE HYPIXEL PIT") return;
                        let scoreBoardLength = null;
                        let line = 40;
                        let startingLine = 0;
                        let extraLines = 0;
                        //Draw Custom Scoreboard
                        let TOP_SCORE = 40;
                        var sortedScoreBoardArray = getScoreBoardToArray(26).scoreboardArray;
                        let rainbow = rainbowString("Pit Extras", rainbowTickColor);
                        try {
                          let timeNow = Date.now();
                          let API_UPDATE_TIME_SECONDS = 10
                          readConfig();
                          let key = null;
                          if (config.key != null){
                            let key = config.key;
                            if ((timeNow - playerStats.lastUpdated) > API_UPDATE_TIME_SECONDS * MILLISEC_TO_SEC){
                              fetchHypixelStats(key, Player.getName());
                              playerStats.lastUpdated = timeNow;
                            }
                          } else if (apiKeyWarningSent == false) {
                            apiKeyWarningSent = true;
                            ChatLib.chat(`&bPit Extras &arequires a Hypixel API Key in order to function properly`);
                            ChatLib.chat(`&aPlease add and API Key be doing &b/apikey set (key)`);
                            ChatLib.chat(`&aIf you don't have an API Key you can generate a new one by doing &b/api new`);
                          }
                          //sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `${getScoreBoardToArray(26).scoreboardArray[getScoreBoardToArray(26).goldIndex].text} %69`, getScoreBoardToArray(26).goldIndex, true);
                          //sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `Status: SWAG`, getScoreBoardToArray(26).statusIndex, true);
                          let goldReqEstimate = 0;
                          if (playerStats.goldGrinded != null){
                            goldReqEstimate = playerStats.goldGrinded;
                            if (currentPlayerGold > playerStats.currentGold){
                              if (pitExtrasSettings.getSetting("Custom Scoreboard", "Estimate Gold Req")){
                                goldReqEstimate = (parseFloat(goldReqEstimate) + (parseFloat(currentPlayerGold) - parseFloat(playerStats.currentGold))).toFixed(2);
                              }
                            }
                            goldReqEstimate = prestigeInfo[playerStats.pres].GoldReq - goldReqEstimate;
                          }
                          let xpIndex = getScoreBoardToArray(26).xpIndex;
                          let goldIndex = getScoreBoardToArray(26).goldIndex;
                          goldReqEstimate = ((goldReqEstimate > 0) ? goldReqEstimate : 0);
                          if (pitExtrasSettings.getSetting("Custom Scoreboard", "Show Pres XP %")){
                            sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `§b${Math.min(((((playerStats.xp - prestigeInfo[playerStats.pres - 1].SumXp) / (prestigeInfo[playerStats.pres].SumXp - prestigeInfo[playerStats.pres - 1].SumXp))).toFixed(4) * 100).toFixed(2), 100)}%`, xpIndex + 1, false);
                            goldIndex++;
                          }
                          if (pitExtrasSettings.getSetting("Custom Scoreboard", "Show Gold Req % Grinded")){
                            sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `§6${((1 - (goldReqEstimate.toFixed(2) / prestigeInfo[playerStats.pres].GoldReq)).toFixed(4) * 100).toFixed(2)}%`, goldIndex + 1, false);
                          }
                          if (pitExtrasSettings.getSetting("Custom Scoreboard", "Show Remaining Gold Req")){
                            sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `Gold Req: §6${goldReqEstimate.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}g`, goldIndex + 1, false);
                          }
                          if (pitExtrasSettings.getSetting("Custom Scoreboard", "Pres Number")){
                            sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `Prestige: §e§l${getScoreBoardToArray(26).pres}`, getScoreBoardToArray(26).presIndex, true);
                          }
                          if (onGenesis){
                            if (pitExtrasSettings.getSetting("Custom Scoreboard", "Show Faction Points")){
                              sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `Faction Points: ${genesisSymbol.substring(0,2)}${playerStats.factionPoints} ${genesisSymbol}`, getScoreBoardToArray(26).lvlIndex+1, false);
                              sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, ` `, getScoreBoardToArray(26).lvlIndex+2, false);
                            } else {
                              sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, ` `, getScoreBoardToArray(26).lvlIndex+1, false);
                            }
                          }
                        } catch (e) {
                          //ChatLib.chat(e)
                        }
                        sortedScoreBoardArray = sortedScoreBoardArray.sort((a, b) => parseFloat(a.index) - parseFloat(b.index));
                        return sortedScoreBoardArray;
                      }

                      //Rendering Stuff
                      let customScoreBoardArray = null;
                      let lastScoreBoardUpdateTime = 0;
                      register("renderOverlay", myRenderOverlay);
                      var myTextObject = new Text(`Testing §11 §22 §33`, 10, 30).setColor(Renderer.RED).setShadow(false).setScale(1.5);
                      let rainbowTick = 0;
                      let rainbowTickColor = 0;
                      function myRenderOverlay() {
                        if (config === null){
                          readConfig();
                        };
                        if (ChatLib.removeFormatting(Scoreboard.getTitle()) !== "THE HYPIXEL PIT"){
                          Scoreboard.setShouldRender(true);
                          scoreBoardDisplay.shouldRender = false;
                          scoreBoardDisplayShadow.shouldRender = false;
                          return;
                        }
                        if (pitExtrasSettings.getSetting("Custom Scoreboard", "Enabled")){
                          Scoreboard.setShouldRender(false)
                          scoreBoardDisplay.shouldRender = true;
                          scoreBoardDisplay.setRenderLoc(
                            config.scoreboard.x,
                            config.scoreboard.y);
                            /*try {
                            scoreBoardDisplayShadow.clearLines();
                            scoreBoardDisplay.getLines().forEach((item, i) => {
                            //scoreBoardDisplayShadow.addLine(item.setText(`§8` + item.toString());
                          });
                        } catch (e) {
                        ChatLib.chat(e);
                      }
                      scoreBoardDisplayShadow.shouldRender = true;
                      scoreBoardDisplayShadow.setRenderLoc(
                      (config.scoreboard.x - 2),
                      (config.scoreboard.y - 1));
                      scoreBoardDisplayShadow.render();*/
                      scoreBoardDisplay.render();
                    } else {
                      Scoreboard.setShouldRender(true);
                      scoreBoardDisplay.shouldRender = false;
                      scoreBoardDisplayShadow.shouldRender = false;
                    }
                    try {
                      let RAINBOW_TICK_SPEED = 15
                      if (rainbowTick == 11){
                        rainbowTickColor++;
                        rainbowTick = 0
                        if (rainbowTickColor > 8){
                          rainbowTickColor = 0;
                        }
                      }
                      rainbowTick++;
                      let rainbow = rainbowString("Pit Extras", rainbowTickColor);
                      Scoreboard.setLine(1, rainbow, true);
                      let timeNow = Date.now();
                      let TIME_BETWEEN_SCOREBOARD_UPDATES = 1;
                      if ((timeNow - lastScoreBoardUpdateTime) >= (TIME_BETWEEN_SCOREBOARD_UPDATES * MILLISEC_TO_SEC)){
                        lastScoreBoardUpdateTime = timeNow;
                        customScoreBoardArray = createCustomScoreBoard();
                      } else {
                        customScoreBoardArray = addToCustomScoreboard(customScoreBoardArray, rainbow, customScoreBoardArray.length - 1, true);
                      }
                    } catch (e) {
                      ChatLib.chat(e)
                    }
                    //getScoreBoardToArray(26).urlIndex
                    //customScoreBoardArray = addToCustomScoreboard(customScoreBoardArray, rainbow, customScoreBoardArray.length, true);
                    scoreBoardDisplay.clearLines()
                    try {
                      customScoreboardTitle = pitExtrasSettings.getSetting("Custom Scoreboard", "Title");
                      //customScoreboardTitle = "§c§lBhopper Simulator 2021"
                      scoreBoardTitle = ((customScoreboardTitle.length > 0) ? customScoreboardTitle : Scoreboard.getTitle())
                      scoreBoardDisplay.addLine(
                        new DisplayLine("  " + "  " + scoreBoardTitle + "  " + "  " + "  ")
                        .setAlign("center")
                        //.setBackgroundColor(color)
                        //.setScale(tempScale / 100)
                      )
                      customScoreBoardArray.forEach((item) => {
                        //Scoreboard.setLine(TOP_SCORE - item.index, item.text, true);
                        if ((item.text.toString().length > 6) || (item.index > 1)){
                          let alignments = ["left", "center", "right"]
                          scoreBoardAlign = alignments[pitExtrasSettings.getSetting("Custom Scoreboard", "Align") - 1];
                          scoreBoardDisplay.addLine(
                            new DisplayLine(`${item.text}`)
                            .setAlign(scoreBoardAlign)
                          )
                        }
                      });
                      if (myGui.isOpen() && openGUI == "scoreboard"){
                        scoreBoardDisplay.addLine(
                          new DisplayLine(` `)
                          .setAlign("center")
                        )
                        scoreBoardDisplay.addLine(
                          new DisplayLine(`§fDrag and Drop`)
                          .setAlign("center")
                        )
                        scoreBoardDisplay.addLine(
                          new DisplayLine(`§fto Move`)
                          .setAlign("center")
                        )
                        scoreBoardDisplay.addLine(
                          new DisplayLine(`§fPress §6ESC §fto Save`)
                          .setAlign("center")
                        )
                      }
                      /*let maxScoreBoardLength = 15;
                      if ((customScoreBoardArray.length) + 1 < maxScoreBoardLength){
                      for (i = 0; i < maxScoreBoardLength - (customScoreBoardArray.length + 1); i++){
                      //Scoreboard.setLine(TOP_SCORE - sortedScoreBoardArray.length - i, "  ".repeat(i), true);
                    }
                  }*/
                } catch (e) {
                  //ChatLib.chat(e);
                }
                myTextObject.setScale(config.position.scale);
                let x = config.position.x;
                let y = config.position.y;
                if (globalMouseX < Renderer.screen.getWidth() / 2) {
                  newOffsetX = globalMouseX;
                }
                else {
                  newOffsetX = Renderer.screen.getWidth() - globalMouseX
                }

                if (globalMouseY < Renderer.screen.getHeight() /2 ) {
                  newOffsetY = globalMouseY;
                }
                else {
                  newOffsetY = Renderer.screen.getHeight() - globalMouseY
                }

                if(newOffsetX != offsetX) {
                  x = (Renderer.screen.getWidth() - offsetX)
                }

                if(newOffsetY != offsetY) {
                  y = (Renderer.screen.getHeight() - offsetY)
                }
                if (myGui.isOpen() && openGUI == "main"){
                  y -= (config.position.scale*10);
                  myTextObject.setX(x).setY(y).setString(`§fDrag and Drop to Move - Press §6ESC §fto Save`)
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                }
                timeNow = Date.now();
                let remainingCooldown = null
                if (eggTime != null){
                  remainingCooldown = eggCooldown - ((timeNow - eggTime)/MILLISEC_TO_SEC);
                  remainingCooldown = ((remainingCooldown > 0) ? `${remainingCooldown.toFixed(2)}s` : `§aAvailable`)
                } else {
                  remainingCooldown = `§aAvailable`
                }
                if (pitExtrasSettings.getSetting("GUI", "Show Egg Timer")){
                  myTextObject.setX(x).setY(y).setString(`§cEgg Cooldown: §6${remainingCooldown}`)
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                }
                if (steakTime != null){
                  remainingCooldown = aaaSteakLength - ((timeNow - steakTime)/MILLISEC_TO_SEC);
                  remainingCooldown = ((remainingCooldown > 0) ? `${remainingCooldown.toFixed(2)}s` : `§cNone`)
                } else {
                  remainingCooldown = `§cNone`
                }
                if (pitExtrasSettings.getSetting("GUI", "Show Steak Timer")){
                  myTextObject.setX(x).setY(y).setString(`§eAAA-Steak Buff: §6${remainingCooldown}`);
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                }
                if (auraTime != null){
                  remainingCooldown = auraOfProtectionLength - ((timeNow - auraTime)/MILLISEC_TO_SEC);
                  remainingCooldown = ((remainingCooldown > 0) ? `${remainingCooldown.toFixed(2)}s` : `§cNone`);
                } else {
                  remainingCooldown = `§cNone`;
                }
                if (pitExtrasSettings.getSetting("GUI", "Show Aura Timer")){
                  myTextObject.setX(x).setY(y).setString(`§aAura True Prot: §6${remainingCooldown}`);
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                }
                if (pitExtrasSettings.getSetting("GUI", "Show Telebow Timer")){
                  if (cooldowns.telebow.cooldownInSec != null){
                    myTextObject.setX(x).setY(y).setString(`§bTelebow Cooldown: §6${((cooldowns.telebow.cooldownInSec - ((Date.now() - cooldowns.telebow.lastUsed) / MILLISEC_TO_SEC)).toFixed(2))}`);
                    drawBold(myTextObject);
                    y += (config.position.scale*10);
                  }
                }
                if (((streakInfo.startTime != null) && (pitExtrasSettings.getSetting("GUI", "Show Streak Info") === true)) || ((myGui.isOpen() == true) && openGUI == "streak")){
                  let savedX = x;
                  let savedY = y;
                  if ((!(pitExtrasSettings.getSetting("GUI", "Pin Streaker GUI"))) || ((myGui.isOpen() == true) && openGUI == "streak")){
                    x = config.streakGUI.x;
                    y = config.streakGUI.y;
                  }
                  let currentlyStreaking = (streakInfo.endTime == null ? `§fCurrent Streak Info` : `§fLast Streak Info`)
                  myTextObject.setX(x).setY(y).setString(currentlyStreaking);
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                  myTextObject.setX(x).setY(y).setString(`§cKills: ${streakInfo.kills}`);
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                  myTextObject.setX(x).setY(y).setString(`§eAssists: ${streakInfo.assists}`);
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                  myTextObject.setX(x).setY(y).setString(`§6Gold: ${(streakInfo.gold).toFixed(2)}g`);
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                  myTextObject.setX(x).setY(y).setString(`§6Gold per Kill: ${streakInfo.goldPerKill.toFixed(2)}g`);
                  drawBold(myTextObject);
                  y += (config.position.scale*10);
                  let time = (streakInfo.endTime == null ? ((timeNow - streakInfo.startTime)/MILLISEC_TO_SEC).toFixed(2) : ((streakInfo.endTime - streakInfo.startTime)/MILLISEC_TO_SEC).toFixed(2))
                myTextObject.setX(x).setY(y).setString(`§bXP: ${streakInfo.xp}`);
                drawBold(myTextObject);
                y += (config.position.scale*10);
                myTextObject.setX(x).setY(y).setString(`§bXP per Kill: ${streakInfo.xpPerKill}`);
                drawBold(myTextObject);
                y += (config.position.scale*10);
              time = (time == 60 ? 59 : time);
              time = (((myGui.isOpen() == true) && openGUI == "streak") ? 0 : time);
              myTextObject.setX(x).setY(y).setString(`§bTime: ${Math.floor(time/60)}m ${Math.floor(time%60)}s`);
              drawBold(myTextObject);
              y += (config.position.scale*10);
              if (!(pitExtrasSettings.getSetting("GUI", "Pin Streaker GUI"))){
                x = savedX;
                y = savedY;
              }
            }
            if (soliTier > 0){
              let solitudeNum = (1 + Math.floor(soliTier / 2));
              myTextObject.setX(x).setY(y).setString(`§fSolitude ${("I".repeat(soliTier))}: §6${((solitude <= solitudeNum) ? "§aYes" : "§cNo")}`);
              drawBold(myTextObject);
              y += (config.position.scale*10);
            }
            if (gladTier > 0){
              let gladiatorPercent = (.01 + ((gladTier-1)*.005));
              myTextObject.setX(x).setY(y).setString(`§fNot Glad ${("I".repeat(gladTier))}: §6${((gladiator*gladiatorPercent*100).toFixed(0))}%`);
              drawBold(myTextObject);
              y += (config.position.scale*10);
            }
            if (sharkTier > 0){
              let sharkPercent = (Math.floor((.0235*sharkTier)*100))/100;
              myTextObject.setX(x).setY(y).setString(`§fShark ${("I".repeat(sharkTier))}: §6${((shark*sharkPercent*100).toFixed(0))}%`);
              drawBold(myTextObject);
              y += (config.position.scale*10);
            }
            if (wearingBadArmor && lowLifeItems.length > 0){
              myTextObject.setX(x).setY(y).setString(`§cWARNING You Are Not Wearing Full Diamond or an Iron Helm`);
              drawBold(myTextObject);
              y += (config.position.scale*10);
              myTextObject.setX(x).setY(y).setString(`§cThe following mystics are in your inventory`);
              drawBold(myTextObject);
              y += (config.position.scale*10);
            }
            if (lowLifeItems.length > 0){
              lowLifeItems.forEach((item) => {
                myTextObject.setX(x).setY(y).setString(`§cWARNING §r${item.name} §cwith ${item.enchants} §chas ${item.lives} §clives`);
                drawBold(myTextObject);
                y += (config.position.scale*10);
              });
            }
            if ((jewels.length > 0) || (myGui.isOpen() && (openGUI == "jewel"))){
              let savedX = x;
              let savedY = y;
              x = config.jewelGUI.x;
              y = config.jewelGUI.y;
              myTextObject.setX(x).setY(y).setString(`§3Hidden Jewel List`);
              drawBold(myTextObject);
              y += (config.position.scale*10);
              jewels.forEach((item) => {
                myTextObject.setX(x).setY(y).setString(`${item.name} §fKills: §e${item.kills}`);
                drawBold(myTextObject);
                y += (config.position.scale*10);
              });
              x = savedX;
              y = savedY;
            }
          }

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

          register('guiMouseClick', (x, y, button, gui, event) => {
            if (config === null){
              readConfig();
            }
            let guiname = gui.class.getSimpleName();
            let guicheck = (guiname == `GuiInventory`)
            if ((pitExtrasSettings.getSetting("GUI", "Force Shift") === false) || Client.isShiftDown() || (guiname != `GuiInventory`)) return;
            cancel(event);
          });

          register("itemTooltip", (lore, item, event) => {
            try {
              const tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
              let tier = tags.getTag("UpgradeTier");
              let nonce = tags.getTag("Nonce");
              let name = item.getRegistryName();
              if (name == "minecraft:bow" || name == "minecraft:golden_sword" || name == "minecraft:leather_leggings"){
              } else{
                return;
              }
              if (nonce === null) return;
              try {
                updateItemStats(item);
              } catch (e) {
                ChatLib.chat(e)
              }
              let tier3Text = null;
              if ((nonce == 5) || (nonce == 8)){
                return;
              }
              if (nonce == 6){
                if (tier >= 0 && tier <= 1){
                  tier3Text = `§r§7Requires §0Dark Pants§7 to Tier 2`
                } else {
                  return;
                }
              }
              if (nonce == 9){
                if (tier >= 0 && tier <= 2){
                  tier3Text = `§r§7Requires §4Rage Pants§7 to Tier 3`
                } else {
                  return;
                }
              }
              if (nonce != 6 && nonce != 9){
                let colorInt = (nonce%5)
                let colors = [`§cRed`,`§eYellow`,`§9Blue`,`§6Orange`,`§aGreen`];
                if (tier >= 0 && tier <= 2){
                  tier3Text = `§r§7Requires ${colors[colorInt]} Pants§7 to Tier 3`
                } else {
                  return;
                }
              }
              const list = new NBTTagList(item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Lore"))
              let modified = false
              for (let i = 0; i < list.getTagCount(); i++) {
                if (list.getStringTagAt(i) !== tier3Text) continue
                modified = true
              }
              if (modified) return
              list.appendTag(new NBTTagString(tier3Text))
            } catch (e){
              ChatLib.chat(e)
            }
          })

          function updateItemStats(item){
            const tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
            let nonce = tags.getTag("Nonce");
            let itemIndex = -1;
            config.itemStats.forEach((item, i) => {
              if (item.nonce.toString() == nonce.toString()){
                itemIndex = i;
              }
            });
            if (itemIndex > -1) {
              updateLoreCounter(item, "§eKills: §f", config.itemStats[itemIndex].kills)
              updateLoreCounter(item, "§eAssists: §f", config.itemStats[itemIndex].assists)
              if (item.getLore().join().trim().includes(" XP ")){
                updateLoreCounter(item, "§eXP Earned: §b", config.itemStats[itemIndex].xp.toFixed(0))
              }
              try {
                if (item.getLore().join().trim().includes("Gold Bump") || item.getLore().join().trim().includes("Gold Boost") || item.getLore().join().trim().includes("Moctezuma")){
                  updateLoreCounter(item, "§eGold Earned: §6", config.itemStats[itemIndex].gold.toFixed(2))
                }
              } catch (e) {
                ChatLib.chat(e)
              }
            }
          }

          function updateLoreCounter(item, loreTemplate, counterValue){
            const list = new NBTTagList(item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Lore"))
            let modified = false
            for (let i = 0; i < list.getTagCount(); i++) {
              if (list.getStringTagAt(i).includes(`${loreTemplate}`) == false) continue
              list.removeTag(i);
            }
            list.appendTag(new NBTTagString(`${loreTemplate}${counterValue}`));
          }

          //Scan Inventory
          const scanInventory = register(`step`, (steps) =>{
            let inventory = Player.getInventory();
            let items = inventory.getItems();
            lowLifeItems = [];
            //Check if the Player is wearing bad armor
            let player = World.getPlayerByName(Player.getName());
            let playerHelm = player.getItemInSlot(4).getName();
            let playerChest = player.getItemInSlot(3).getName();
            let playerLegs = player.getItemInSlot(2).getName();
            let playerBoots = player.getItemInSlot(1).getName();
            var badArmor = {
              helm: ((playerHelm == "tile.air.name" ||  playerHelm == "Chain Helmet" || playerHelm == "Leather Cap") ? true : false),
              chest: ((playerChest == "tile.air.name" ||  playerChest == "Chain Chestplate" || playerChest == "Iron Chestplate") ? true : false),
              legs: ((playerLegs == "tile.air.name" ||  playerLegs == "Chain Leggings") ? true : false),
              boots: ((playerBoots == "tile.air.name" ||  playerBoots == "Chain Boots" || playerBoots == "Iron Boots") ? true : false),
            };
            if ((badArmor.helm || badArmor.chest || badArmor.legs || badArmor.boots) && pitExtrasSettings.getSetting("LifeSaver", "Bad Armor Warning")){
              wearingBadArmor = true;
            } else {
              wearingBadArmor = false;
            }
            items.forEach((item) => {
              let tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
              let lives = tags.getTag("Lives");
              let nonce = tags.getTag("Nonce");
              if (lives != null){
                let tier = tags.getTag("UpgradeTier");
                if (tier != 0){
                  //Get Enchants
                  let name = item.getRegistryName();
                  if (name != "minecraft:bow" && name != "minecraft:golden_sword" && name != "minecraft:leather_leggings" && wearingBadArmor == false){
                    return;
                  }
                  if (nonce == 8){
                    if (item.getLore().join().trim().includes("Right-click to open menus!")){
                      return;
                    }
                  }
                  const lore = item.getLore()
                  name = lore.shift().replace(/( \(#[0-9][0-9][0-9][0-9]\))/g,"").replace(/(§[k-o])/g,"")
                  let enchants = null;
                  lore.forEach((loreString) => {
                    if (loreString.trim().replace(/§5/g,"").substring(2,4) == "§9" || loreString.trim().replace(/§5/g,"").substring(2,4) == "§d"){
                      if (loreString.trim().replace(/§5/g,"").substring(4) == "+6.5 Attack Damage" || loreString.trim().replace(/§5/g,"").substring(4) == "As strong as iron") return;
                      if (enchants === null){
                        enchants = loreString.trim()
                      } else {
                        enchants = `${enchants} §cand ${loreString.trim()}`
                      }
                    } else {
                    }
                  });
                  if (lives <= (Number.parseInt(pitExtrasSettings.getSetting("LifeSaver", "Life Limit"))) || wearingBadArmor == true){
                    lowLifeItems.push({name: name,
                      lives: lives,
                      enchants: enchants});
                    }
                  }
                }
              });

            }).setDelay(1);

            //Auto Spawn if You Drop with Low Life Mystics
            const lifeSaver = register(`step`, (steps) =>{
              //if ((ChatLib.removeFormatting(Scoreboard.getTitle()) !== "THE HYPIXEL PIT")) return;
              //get the players streak
              let streak = 0;
              Scoreboard.getLines(false).forEach((item) => {
                if(item.toString().includes("Streak")){
                  streak = Number.parseInt(item.toString().split(" ")[1].replace(/(§[a-z0-9])/g,""))
                }
              });
              //Check if the player has a feather in their hotbar
              let player = World.getPlayerByName(Player.getName());
              let hotbarFeather = false;
              if (Player.getInventory().indexOf(288) >= 0 && Player.getInventory().indexOf(288) <= 8){
                hotbarFeather = true;
              }
              let mega = false;
              mega = Player.getName().replace(/§[abcdef0-9klm](HERMIT|HIGH|UBER400|OVERDRIVE|BEAST|MOON) /, "@MEGA@").includes("@MEGA@");
              if (mega && hotbarFeather){
                ChatLib.clearChat(666)
                ChatLib.chat(new Message(`You hit §cMega §fremove the §3Funky Feather §ffrom your hotbar`).setChatLineId(666))
              }
              let timeNow = Date.now();
              if (config === null){
                readConfig();
              }
              if ((lowLifeItems.length) > 0 && (Player.getY() < (spawnY - 7))){
                if (spawnTime === null || ((timeNow - spawnTime) > MILLISEC_TO_SEC)){
                  if (newLife === true){
                    if (wearingBadArmor){
                      ChatLib.chat("§fYou dropped with §cbad armor§f!")
                    } else {
                      ChatLib.chat("§fYou dropped with §clow life §fmystics!")
                      if (hotbarFeather == true){
                        newLife = false
                        ChatLib.chat("§fYou were §cnot §fRespawned because you have a §3Funky Feather §fin your hotbar")
                        return;
                      }
                    }
                    if (streak >= config.streakCutoff){
                      newLife = false
                      ChatLib.chat("§fYou were §cnot §fRespawned because you are streaking")
                      return;
                    }
                    if (pitExtrasSettings.getSetting("LifeSaver", "Enabled") != true){
                      newLife = false
                      ChatLib.chat("§fYou were §cnot §fRespawned because §6Life Saver is §cdisabled")
                      return;
                    } else {
                      ChatLib.command("spawn")
                      spawnTime = timeNow;
                      newLife = false
                      ChatLib.chat("§fYou were §arespawned")
                    }
                  }
                } else {
                  if (warningMessage === false){
                    if ((timeNow - spawnTime) < 300) return;
                    if (wearingBadArmor){
                      ChatLib.chat("§fYou dropped with §cbad armor§f!")
                    } else {
                      ChatLib.chat("§fYou dropped with §clow life §fmystics!")
                    }
                    warningMessage = true;
                    ChatLib.chat("§fYou were §cnot §fRespawned because §e/spawn §fis on §ccooldown §fdo §e/play pit")
                  }
                }
              } else {
                if (Player.getY() > (spawnY - 7)){
                  newLife = true;
                  warningMessage = false;
                }
              }
            }).setFps(20);

            const pitExtrasSettings = new SettingsObject("PitExtras", [
              {
                name: "GUI",
                settings: [
                  new Setting.Toggle("Enabled", true),
                  new Setting.Toggle("Show Streak Info", true),
                  new Setting.Toggle("Show Egg Timer", true),
                  new Setting.Toggle("Show Aura Timer", true),
                  new Setting.Slider("Cooldown between Aura Uses", 10, 0, auraOfProtectionLength),
                  new Setting.Toggle("Show Steak Timer", true),
                  new Setting.Slider("Cooldown between AAA Steak Uses", 7, 0, aaaSteakLength),
                  new Setting.Toggle("Show Telebow Timer", true),
                  new Setting.Toggle("Force Shift", false),
                  new Setting.Button("Move GUI", "Move", () => {
                    ChatLib.command("pitextrasgui main", true);
                  }),
                  new Setting.Toggle("Pin Streaker GUI", true),
                  new Setting.Button("Move Streaker GUI", "Move", () => {
                    ChatLib.command("pitextrasgui streak", true);
                  }),
                  new Setting.Button("Move Jewel GUI", "Move", () => {
                    ChatLib.command("pitextrasgui jewel", true);
                  })
                ]
              },
              {
                name: "LifeSaver",
                settings: [
                  new Setting.Toggle("Enabled", true),
                  new Setting.Toggle("Bad Armor Warning", true),
                  new Setting.TextInput("Life Limit", "3")
                ]
              },
              {
                name: "Custom Scoreboard",
                settings: [
                  new Setting.Toggle("Enabled", true),
                  new Setting.TextInput("Title", "§6§lPit Extras"),
                  new Setting.Toggle("Pres Number", false),
                  new Setting.Toggle("Show Faction Points", true),
                  new Setting.Toggle("Show Pres XP %", true),
                  new Setting.Toggle("Estimate Pres XP %", true),
                  new Setting.Toggle("Show Remaining Gold Req", true),
                  new Setting.Toggle("Show Gold Req % Grinded", true),
                  new Setting.Toggle("Estimate Gold Req", true),
                  new Setting.Slider("Align", 2, 1, 3),
                  new Setting.Button("Move Scoreboard", "Move", () => {
                    ChatLib.command("pitextrasgui scoreboard", true);
                  })
                ]
              }
            ]).setCommand("pitextras").setSize(400, 150);

            Setting.register(pitExtrasSettings);


            const guiHandler = register("command", (command, value) => {
              if (command == "main"){
                myGui.open();
                openGUI = "main"
              } else if (command == "streak"){
                myGui.open();
                openGUI = "streak"
              } else if (command == "scoreboard"){
                myGui.open();
                pitExtrasSettings.getSettingObject("GUI", "Pin Streaker GUI").value = false;
                openGUI = "scoreboard"
              } else if (command == "jewel"){
                myGui.open();
                openGUI = "jewel"
              }
            }).setName("pitextrasgui")

            const fetchHypixelStats = (key, name) => {
              request({
                url: `https://api.hypixel.net/player?key=${key}&name=${name}`,
                json: true,
                headers: {
                  "User-Agent": "CTJS32A",
                }
              }).then(function(response) {
                try {
                  let playerInfo = response;
                  var prestiges = (playerInfo.player.stats.Pit.profile.prestiges ? playerInfo.player.stats.Pit.profile.prestiges : []);
                  playerStats.pres = prestiges.length;
                  if (playerInfo.player.stats.Pit.profile.genesis_points >= playerStats.factionPoints){
                    playerStats.factionPoints = playerInfo.player.stats.Pit.profile.genesis_points;
                  }
                  if (playerInfo.player.stats.Pit.profile.xp >= playerStats.xp){
                    playerStats.xp = playerInfo.player.stats.Pit.profile.xp
                  }
                  playerStats.currentGold = playerInfo.player.stats.Pit.profile.cash.toFixed(2);
                  playerStats.goldGrinded = playerInfo.player.stats.Pit.profile[`cash_during_prestige_${playerStats.pres}`].toFixed(2);
                } catch (e) {
                  ChatLib.chat(e);
                  return ({success: false})
                }
              })
            };

            register("actionBar", event => {
              let actionBarText = ChatLib.getChatMessage(event);
              if (actionBarText.includes("Telebow") && actionBarText.includes("Cooldown")){
                cooldowns.telebow.cooldownInSec = parseInt(actionBarText.split(": ")[1])
                cooldowns.telebow.lastUsed = Date.now();
              }
            })

            const jewelcheck = register("command", () => {
              getHiddenJewelProgress();
            }).setName("jewelcheck")

            var jewels = [];
            function getHiddenJewelProgress(){
              jewels = [];
              Player.getOpenedInventory().getItems().forEach((item, i) => {
                try {
                  if (item.getName() != "tile.air.name"){
                    if ((item.getRegistryName() == "minecraft:leather_leggings") || (item.getRegistryName() == "minecraft:golden_sword")){
                      if (item.getLore().join().trim().includes("Hidden Jewel")){
                        let name = ((item.getRegistryName() == "minecraft:leather_leggings") ? "§3Jewel Pants" : "§6Jewel Sword")
                        let kills = parseInt(item.getLore().join().split("Kills: ")[1].replace(/(§[a-z0-9])+/g,"")).toFixed(0);
                        jewels.push({name: name,
                          kills: kills})
                        }
                      }
                    }
                  } catch (e) {
                    ChatLib.chat(e);
                  }
                })
              }

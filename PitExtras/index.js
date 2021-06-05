var timers = {
              egg:{timername: "§cEgg Cooldown:",
                   setting: () => pitExtrasSettings.getSetting("GUI", "Show Egg Timer"),
                   cooldownLength: 10,
                   lastUsed: 0,
                   colorCode: "§6",
                   zeroValue: "§aAvailable",
                   cooldownMessage: "§cFirst-Aid Egg §fon cooldown for §6",
                   itemRender: {
                     itemID:383,
                     enchantRequired:false,
                     defaultName:"§cFirst-Aid Egg",
                     defaultLore:["§eSpecial Item","§7Heals §c2.5❤","§710 seconds cooldown."],
                     defaultDamage:96,
                     cooldownLore: `§6Cooldown Remaining: `
                   }},
              aura:{timername: "§aAura True Prot:",
                   setting: () => pitExtrasSettings.getSetting("GUI", "Show Aura Timer"),
                   cooldownLength: 15,
                   lastUsed: 0,
                   colorCode: "§6",
                   zeroValue: "§cNone",
                   cooldownMessage: "§6Aura true damage prot still in effect for §c",
                   itemRender: {
                     itemID:341,
                     enchantRequired:false,
                     defaultName:"§aAura of Protection",
                     defaultLore: ["§eSpecial Item","§7Heals §c2.5❤","§710 seconds cooldown.","§6Aura Remaining: 0"],
                     defaultDamage:0,
                     cooldownLore: '§6Aura Remaining: '
                   }},
              steak:{timername: "§eAAA-Steak Buff:",
                    setting: () => pitExtrasSettings.getSetting("GUI", "Show Steak Timer"),
                    cooldownLength: 10,
                    lastUsed: 0,
                    colorCode: "§6",
                    zeroValue: "§cNone",
                    cooldownMessage: "§6Steak buff still in effect for §c",
                    itemRender: {
                      itemID:423,
                      enchantRequired:false,
                      defaultName:"§6AAA-Rated Steak",
                      defaultLore: ["§eSpecial Item","§7Heals §c2.5❤","§710 seconds cooldown."],
                      defaultDamage: 0,
                      cooldownLore: '§6AAA-Steak Remaining: '
                    }},
              tele:{timername: "§bTelebow Cooldown:",
                    setting: () => pitExtrasSettings.getSetting("GUI", "Show Telebow Timer"),
                    cooldownLength: 10,
                    lastUsed: 0,
                    colorCode: "§6",
                    zeroValue: "§aREADY",
                    itemRender: {
                      itemID:261,
                      enchantRequired:true,
                      defaultName:"§cTier III Bow",
                      defaultLore: ["§dRARE! §9Telebow "],
                      defaultDamage:0,
                      cooldownLore: '§6Cooldown Remaining: '
                    }}
              };
let PANTS_SLOT = 2;
let HAND_SLOT = 0;
var enchantPower = {
    soli:{enchantName:"Solitude",
          displayName:"§fSolitude",
          slot: PANTS_SLOT,
          tier: null,
          criteriaFunction: (player) => playerDistance(World.getPlayerByName(Player.getName()), player) <= 7,
          playersNearby: null,
          valueFunction: () => {
            if ((enchantPower.soli.playersNearby != null) && (enchantPower.soli.tier != null) && (enchantPower.soli.tier > 0)){
              if (enchantPower.soli.playersNearby <= (enchantPower.soli.tier == 1 ? 1 : 2)){
                return "§aYes"
              }
            }
            return "§cNo";
          }
    },
    glad:{enchantName:'"Not" Gladiator',
          displayName:"§fNot Glad",
          slot: PANTS_SLOT,
          tier: null,
          criteriaFunction: (player) => playerDistance(World.getPlayerByName(Player.getName()), player) <= 12,
          playersNearby: null,
          valueFunction: () => {
            if ((enchantPower.glad.playersNearby != null) && (enchantPower.glad.tier != null) && (enchantPower.glad.tier > 0)){
                return ((Math.min(enchantPower.glad.playersNearby, 10) * (.01 + ((enchantPower.glad.tier - 1) * .005))) * 100).toFixed(0).toString() + "%";
            }
            return "0%";
          }
    },
    shark:{enchantName:'Shark',
          displayName:"§fShark",
          slot: HAND_SLOT,
          tier: null,
          criteriaFunction: (player) => {
            if (playerDistance(World.getPlayerByName(Player.getName()), player) <= 12) {
              if (player.getHP() <= 12) {
                return true;
              }
            }
            return false;
          },
          playersNearby: null,
          valueFunction: () => {
            if ((enchantPower.shark.playersNearby != null) && (enchantPower.shark.tier != null) && (enchantPower.shark.tier > 0)){
                return ((enchantPower.shark.playersNearby * (Math.floor((.0235 * enchantPower.shark.tier) * 100)) / 100) * 100).toFixed(0).toString() + "%";
            }
            return "0%";
          }
    }
}
var itemCounters = [{
                    currentInvAmount: 0,
                    registryName: "minecraft:obsidian",
                    colors: [{minAmount:64,
                              colorCode:"§a"},
                             {minAmount:32,
                              colorCode:"§f"},
                             {minAmount:0,
                              colorCode:"§c"}]
                    },
                    {
                    currentInvAmount: 0,
                    registryName: "minecraft:arrow",
                    displayName: "Arrows",
                    colors: [{minAmount:32,
                              colorCode:"§a"},
                             {minAmount:16,
                              colorCode:"§f"},
                             {minAmount:0,
                              colorCode:"§c"}]
                            }];
var ITEM_ICON_BUFFER = 4;
var ITEM_ICON_SIZE = 16;
let PIT_EXTRAS_MESSAGE_TAG = "§7[§fPit§6Extras§7]"
/*let auraOfProtectionLength = 15;
let eggCooldown = 10;
let aaaSteakLength = 10;
let eggTime = null;
let auraTime = null;
let steakTime = null;
let gladiator = 0;
let shark = 0;
let solitude = 0;
let gladTier = 0;
let sharkTier = 0;
let soliTier = 0;*/
var config = null;
var lowLifeItems = [];
//let spawnTime = null;
let wearingBadArmor = false;
//let newLife = true;
var warnings = {
    fiveThousandBounty: false,
    badArmor: false
}
let onGenesis = false;
let genesisSymbol = ""
var streakInfo = {
    endTime: null,
    startTime: null,
    kills: 0,
    assists: 0,
    gold: 0,
    xp: 0,
    goldPerKill: 0,
    xpPerKill: 0,
    topGoldPerKill: 0,
    topXpPerKill: 0
}
var playerStats = {
    pres: null,
    goldGrinded: null,
    factionPoints: null,
    currentGold: null,
    xp: null,
    lastUpdated: 0
};

var itemStatusTrackers = {
  sharkTracker:{enchant:"Shark",
                power:0,
                template: "§6Low HP Players Nearby: "},
  painFocusTracker:{enchant:"Pain Focus",
                    power:0,
                    template:"§6Missing Hearts: "},
  gambleTracker:{enchant:"Gamble I",
                power:0,
                template:"§6Aura Remaining: "}
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
//var openGUI = null;
let MILLISEC_TO_SEC = 1000;
let color = (Renderer.RED);
let rainbowSteps = 0;
let guiClosed = false;

import { getKey, promptKey, hasKey } from '../HypixelApiKeyManager';

import { Promise } from "PromiseV2";
import { request } from "requestV2";
import { Setting, SettingsObject } from "../SettingsManager/SettingsManager";

const NBTTagList = Java.type("com.chattriggers.ctjs.minecraft.wrappers.objects.inventory.nbt.NBTTagList")
const MCNBTTagList = Java.type("net.minecraft.nbt.NBTTagList")
const NBTTagString = Java.type("net.minecraft.nbt.NBTTagString")
const ItemStack = Java.type("net.minecraft.item.ItemStack");
const NBTTagCompound = Java.type("net.minecraft.nbt.NBTTagCompound");
const NBTTagInt = Java.type('net.minecraft.nbt.NBTTagInt');
let scoreBoardAlign = "center";

let spawnY = getSpawnY();

function getSpawnY() {
    let lowestY = 0;
    World.getAllEntitiesOfType(Java.type("net.minecraft.entity.passive.EntityVillager").class).forEach((item, i) => {
        lowestY = Math.max(lowestY, item.getY())
    });
    return (lowestY);
}

const pitExtrasSettings = new SettingsObject("PitExtras", [{
        name: "GUI",
        settings: [
            new Setting.Toggle("5K Bounty Warning", true),
            new Setting.Toggle("Force Shift", false),
            new Setting.Toggle("Show Streak Info", true),
            new Setting.Button("Move GUI", "Move", () => {
                ChatLib.command("pitextrasgui", true);
            }),
            new Setting.Toggle("Rainbow", false),
            new Setting.Slider("Text Mode (None, Shadowed, Bold)", 2, 1, 3),
            new Setting.Toggle("Show Timer Item Icons", true),
            new Setting.Toggle("Show Egg Timer", true),
            new Setting.Toggle("Show Aura Timer", true),
            new Setting.Toggle("Show Steak Timer", true),
            new Setting.Toggle("Show Telebow Timer", true),
        ]
    },
    {
        name: "LifeSaver",
        settings: [
            new Setting.Toggle("Enabled", true),
            new Setting.Toggle("Bad Armor Warning", true),
            new Setting.TextInput("Life Limit", "3"),
        ]
    },
    {
        name: "Custom Scoreboard",
        settings: [
            new Setting.Toggle("Rainbow", false),
            new Setting.TextInput("Title", "§6§lPit Extras"),
            new Setting.Toggle("Pres Number", false),
            new Setting.Toggle("Show Faction Points", true),
            new Setting.Toggle("Show Pres XP %", true),
            new Setting.Toggle("Estimate Pres XP %", true),
            new Setting.Toggle("Show Remaining Gold Req", true),
            new Setting.Toggle("Show Gold Req % Grinded", true),
            new Setting.Toggle("Estimate Gold Req", true),
            new Setting.Slider("Align (Left, Center, Right)", 2, 1, 3)
        ]
    }
]).setCommand("pitextras").setSize(400, 150);

Setting.register(pitExtrasSettings);

register('step', (step) => {
  updateItemData();
  let rainbowText = true;
  if (rainbowText){
    rainbowSteps = step
  }
  if ((!myGui.isOpen()) && (guiClosed == false)){
    if (uiLoaded == true) {
      saveUILocations()
      guiClosed = true;
    }
  }
}).setFps(20);

register('step', (step) => {
  getPainFocusPower();
  getSharkPower();
  getGamblePower();
  updateEnchantPower();
}).setDelay(1);

function getPainFocusPower(){
  try {
    let maxHP = (parseInt(Player.getPlayer().func_110138_aP().toString()) / 2);
    itemStatusTrackers.painFocusTracker.power = Math.floor(maxHP - (Player.getHP() / 2));
  } catch (e) {
    ChatLib.chat(e);
  }
}

function getSharkPower(){
  try {
    let sharkRange = 12
    let sharkHP = (6 * 2);
    let sharkPower = getPlayers().filter(player => playerDistance(World.getPlayerByName(Player.getName()), player) <= sharkRange)
                   .filter(player => player.getHP() <= sharkHP)
                   .length;
    itemStatusTrackers.sharkTracker.power = sharkPower;
  } catch (e) {
    ChatLib.chat(e);
  }
}

function getGamblePower(){
  try {
    itemStatusTrackers.gambleTracker.power = Math.max(timers.aura.cooldownLength - ((Date.now() - timers.aura.lastUsed) / MILLISEC_TO_SEC), 0);
  } catch (e) {
    ChatLib.chat(e);
  }
}

register("chat", (msg, event) => {
    msg = msg.toString().trim()
    let assist = msg.includes(`§a§lASSIST!`);
    let kill = ((msg.includes(`KILL!`) && msg.includes(`§a`) && msg.includes(`§l`)) ? true : false)
    if (msg.includes(`§c§lDEATH!`)) {
        endStreak();
        return;
    }
    if (kill || assist) {
        let xp = msg.split("+")[1]
        let gold = msg.split("+")[2].replace(/§6/g, "").replace(`,`, "")
        if (kill) {
            if (onGenesis) {
                let genesisPointsGained = msg.split("+")[3].substring(0, 1);
                playerStats.factionPoints += Number.parseFloat(genesisPointsGained);
            }
        }
        if (pitExtrasSettings.getSetting("Custom Scoreboard", "Estimate Pres XP %")) {
            playerStats.xp += Number.parseInt(xp);
        }
        if ((streakInfo.startTime != null) && (streakInfo.endTime == null)) {
            streakInfo.kills += Number.parseInt(kill ? 1 : 0);
            streakInfo.assists += Number.parseInt(assist ? 1 : 0);
            streakInfo.gold += parseFloat(gold)
            streakInfo.xp += Number.parseInt(xp);
            if (kill) {
                streakInfo.goldPerKill = parseFloat(gold);
                streakInfo.topGoldPerKill = (parseFloat(gold) > streakInfo.topGoldPerKill ? parseFloat(gold) : streakInfo.topGoldPerKill)
                streakInfo.xpPerKill = Number.parseInt(xp);
                streakInfo.topXpPerKill = (Number.parseInt(xp) > streakInfo.topXpPerKill ? Number.parseInt(xp) : streakInfo.topXpPerKill)
            }
        } else {
          startStreak(kill, assist, xp, gold)
        }
        try {
            let item = Player.getHeldItem();
            updateItemStats(item, kill, xp, gold);
            let pants = World.getPlayerByName(Player.getName()).getItemInSlot(PANTS_SLOT);
            updateItemStats(pants, kill, xp, gold);
        } catch (e) {
            ChatLib.chat(`Kill Tracker Error: ${e}`);
        }
    }
}).setCriteria("${msg}").setContains();

//Handle Punching
register("chat", (msg, event) => {
    msg = msg.toString().trim()
    if (msg.includes("PUNCH!")){
      let splitMsg = msg.split("by");
      let puncher = splitMsg[1];
      let punchee = splitMsg[0];
      if (puncher.includes(Player.getName())){

      }
    }
}).setCriteria("${msg}").setContains();

function loadItemCounters(){
  ChatLib.chat("Loading Item Counters");
  let itemsToCount = JSON.parse(FileLib.read('./config/ChatTriggers/modules/PitExtras/itemsToCount.json'));
  if (itemsToCount){
    itemCounters = itemsToCount;
  } else {
    FileLib.write('./config/ChatTriggers/modules/PitExtras/itemsToCount.json', JSON.stringify(itemCounters, null, 2));
  }
    ChatLib.chat("Loaded Item Counters");
}

let itemCountersLoaded = false;
function updateItemCounters(){
  if (itemCountersLoaded == false){
    loadItemCounters();
    itemCountersLoaded = true;
  }
  itemCounters.forEach((currentCounter) => {
    try {
      currentCounter.currentInvAmount = countItemInInvByName(Player.getInventory(), currentCounter.registryName);
    } catch (e) {
      ChatLib.chat(`Update Item Counters Error: ${e}`);
    }
  });
}

function countItemInInvByName(inventory, itemRegistryName){
  try {
    let count = 0
    inventory.getItems().forEach((item) => {
      if (item.getUnlocalizedName() != "tile.air"){
        if (item.getRegistryName() == itemRegistryName) {
          count += item.getStackSize();
        }
      }
    });
    return count;
  } catch (e) {
    ChatLib.chat(`Count ERROR: ${e}`)
  }
}

function updateItemStats(item, kill, xp, gold){
  if (kill) {
      trackItemStats(item, "kills", 1)
  } else {
      trackItemStats(item, "assists", 1)
  }
  trackItemStats(item, "xp", Number.parseInt(xp))
  trackItemStats(item, "gold", parseFloat(gold))
}

function startStreak(kill, assist, xp, gold){
  streakInfo.startTime = Date.now();
  streakInfo.endTime = null;
  streakInfo.kills = Number.parseInt(kill ? 1 : 0);
  streakInfo.assists = Number.parseInt(assist ? 1 : 0);
  streakInfo.gold = parseFloat(gold)
  streakInfo.xp = Number.parseInt(xp);
  if (kill) {
      streakInfo.goldPerKill = parseFloat(gold);
      streakInfo.topGoldPerKill = parseFloat(gold);
      streakInfo.xpPerKill = Number.parseInt(xp);
      streakInfo.topXpPerKill = Number.parseInt(xp);
  }
}

function endStreak() {
    streakInfo.endTime = Date.now();
    if ((streakInfo.startTime == null) || (pitExtrasSettings.getSetting("GUI", "Show Streak Info") == false)) return;
    let time = ((streakInfo.endTime - streakInfo.startTime) / MILLISEC_TO_SEC).toFixed(2)
    if (time > 60) {
        if (pitExtrasSettings.getSetting("GUI", "Show Streak Info")) {
            try {
                let goldPerMinute = (((streakInfo.gold * 60) / time)).toFixed(2);
                let xpPerMinute = (((streakInfo.xp * 60) / time)).toFixed(2);
                let goldReqEstimate = 0;
                let goldReqRemaining = 0;
                if (playerStats.goldGrinded != null) {
                    goldReqEstimate = playerStats.goldGrinded;
                    if (currentPlayerGold > playerStats.currentGold) {
                        if (pitExtrasSettings.getSetting("Custom Scoreboard", "Estimate Gold Req")) {
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
                let goldReqString = (goldReqMinutes > 0 ? `§eAt this rate it would take §f${minToTimeString(goldReqMinutes)}§eto complete your §6Gold §eReq` : `§eYou've completed your §6Gold Req§e!`);
                let reqConjunctionString = (goldReqMinutes > 0 ?  ` and ` : (xpReqMinutes > 0 ?  ` §eAt this rate it would take ` : ` and `));
                let xpReqString = (xpReqMinutes > 0 ? `§f${minToTimeString(xpReqMinutes)}§eto complete your §bXP §eReq` : `§eYou've completed your §bXP §eReq§e!`);
                ChatLib.chat(`${goldReqString}${reqConjunctionString}${xpReqString}`)
                ChatLib.chat(`§eYour best kill earned you §6${streakInfo.topGoldPerKill.toFixed(2)}g §eand §b${streakInfo.topXpPerKill} XP§e`)
            } catch (e) {
                ChatLib.chat(`End Streak Error: ${e}`);
            }
        }
    }
    return;
}


//Detect /spawn
register("messageSent", (msg, event) => {
    if (msg == "/spawn") {
      ChatLib.chat(`${PIT_EXTRAS_MESSAGE_TAG} Streak reset because you spawned`)
        //Detect major
        //if (!majorEvent) {
            endStreak()
        //}
    }
});

function minToTimeString(inputTime) {
    let HR_TO_MIN_TO_SEC = 60
    let timeInMinutes = inputTime
    let timeString = ""
    if (timeInMinutes >= 60) {
        timeString = timeString + `${Math.floor(timeInMinutes / HR_TO_MIN_TO_SEC)}hr `
        timeInMinutes = timeInMinutes - Math.floor((timeInMinutes % HR_TO_MIN_TO_SEC));
    }
    timeString = timeString + `${Math.floor(timeInMinutes)}min `
    timeInMinutes = timeInMinutes - Math.floor(timeInMinutes);
    if (timeInMinutes > 0) {
        timeString = timeString + `${Math.floor(timeInMinutes * HR_TO_MIN_TO_SEC)}s `
    }
    return timeString;
}

function trackItemStats(item, stat, increaseAmount) {
    try {
        const tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
        let nonce = tags.getTag("Nonce");
        if (nonce === null) {
            return;
        }
        let itemIndex = -1
        config.itemStats.forEach((item, i) => {
            if (item.nonce.toString() == nonce.toString()) {
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
                gold: 0
            })
            config.itemStats[config.itemStats.length - 1][stat] = config.itemStats[config.itemStats.length - 1][stat] + increaseAmount;
        }
        try {
            saveConfig();
        } catch (r) {
            ChatLib.chat("Save Item Stats Error" + r);
        }
    } catch (e) {
        ChatLib.chat(`TrackItemStats Error: ${e}`)
    }
}



//Check Nearby players
const getNearby = register(`step`, (steps) => {
    getHiddenJewelProgress();
    updateItemCounters();
    //Get the player's mystic enchants
    //Get Enchant Tiers
    /*let player = World.getPlayerByName(Player.getName());
    let sword = player.getItemInSlot(HAND_SLOT);
    let pants = player.getItemInSlot(PANTS_SLOT);
    Object.key(enchantPower)
    gladiator = getPlayers().filter(player => playerDistance(World.getPlayerByName(Player.getName()), player) <= 12).length;
    //Gladiator maxes at 10 players
    gladiator = (gladiator <= 10 ? gladiator : 10)
    solitude = players.filter(player => playerDistance(World.getPlayerByName(Player.getName()), player) <= 7).length;
    shark = players.filter(player => playerDistance(World.getPlayerByName(Player.getName()), player) <= 12)
        .filter(player => player.getHP() <= 12)
        .length;*/

}).setDelay(1);

function getPlayers() {
   return TabList.getNames()
      .map(name => name.replace(/§/g, "&"))
      .map(name => name.replace(/&[abcdef0-9klm](HERMIT|HIGH|UBER\d+|OVERDRIVE|BEAST|MOON) /, ""))
      .map(name => ChatLib.removeFormatting(name))
      .map(name => name.split(" ")[1])
      .map(player => World.getPlayerByName(player))
      .filter(player => player !== null && player.getName() !== Player.getName());
}

var uiArray = [{name: "timerUI",
                renderFunction: renderTimers,
                x: 20,
                y: 100,
                enabled: true},
                {name: "enchantPowerUI",
                renderFunction: renderEnchantPowerHUD,
                x: 40,
                y: 100,
                enabled: true},
                {name: "lifeSaverUI",
                renderFunction: renderLifeSaverWarnings,
                x: 60,
                y: 100,
                enabled: true},
                {name: "itemCountUI",
                renderFunction: renderItemCounts,
                x: 80,
                y: 100,
                enabled: true},
                {name: "jewelUI",
                renderFunction: renderJewelList,
                x: 100,
                y: 100,
                enabled: true},
                {name: "streakUI",
                renderFunction: renderStreakHUD,
                x: 120,
                y: 100,
                enabled: true},
                {name: "scoreboardUI",
                renderFunction: (x, y, enabled) => {
                        Scoreboard.setShouldRender(!(enabled));
                        scoreBoardDisplay.shouldRender = enabled;
                        if ((!(enabled)) && myGui.isOpen()){
                          drawBold(myTextObject.setY(y).setString("§6Custom Scoreboard (Hidden)").setX(x - 10 - myTextObject.getMaxWidth()));
                        }
                        scoreBoardDisplay.setRenderLoc(
                            x - scoreBoardDisplay.getWidth(),
                            y);
                        scoreBoardDisplay.render()},
                x: 400,
                y: 100,
                enabled: true}
              ];

function convertUIArrayToJSON(){
  var jsonVersion = [];
  uiArray.forEach((uiElement) => {
    jsonVersion.push({name:uiElement.name,
                      x:uiElement.x,
                      y:uiElement.y,
                      enabled:uiElement.enabled});
  });
  return jsonVersion;
}

function buildUIArrayFromJSON(jsonVersion){
  jsonVersion.forEach((jsonElement, i) => {
    uiArray.forEach((uiElement, i) => {
        if (uiElement.name == jsonElement.name) {
            uiElement.x = jsonElement.x;
            uiElement.y = jsonElement.y;
            uiElement.enabled = jsonElement.enabled;
        }
    });
  });
}

function saveUILocations(){
  FileLib.write('./config/ChatTriggers/modules/PitExtras/uilocations.json', JSON.stringify(convertUIArrayToJSON(), null, 2));
}

function loadUILocations(){
  ChatLib.chat("Loading UI Locations");
  let uiLocations = JSON.parse(FileLib.read('./config/ChatTriggers/modules/PitExtras/uilocations.json'));
  if (uiLocations){
    buildUIArrayFromJSON(uiLocations);
  }
  ChatLib.chat("Loaded UI Locations");
}

//Get the distance between two players
function playerDistance(player1, player2) {
    var a = player1.getX() - player2.getX();
    var b = player1.getZ() - player2.getZ();
    var c = Math.sqrt(a * a + b * b);
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
try {
  myGui.registerMouseDragged(dragFunction);
  myGui.registerClicked((mouseX, mouseY, button, state) => {
    guiClosed = false;
    uiArray.forEach((uiElement) => {
      let X_BUFFER = 10;
      let Y_BUFFER = 10;
      if ((Math.abs(uiElement.x - mouseX) <= X_BUFFER) && (Math.abs(uiElement.y - mouseY) <= Y_BUFFER)){
        if (button == 0){
          selectedUIElement = uiElement;
          initialMouseX = mouseX;
          initialMouseY = mouseY;
        } else if (button == 1) {
          uiElement.enabled = !(uiElement.enabled);
        }
      }
    })});
  myGui.registerMouseReleased(releaseFunction);
} catch (error){
  ChatLib.chat(error)
}
let initialMouseX = 0;
let initialMouseY = 0;
let selectedUIElement = null;

function releaseFunction(mouseX, mouseY) {
  guiClosed = false;
  selectedUIElement = null;
  initialMouseX = 0;
  initialMouseY = 0;
}

//Two important parameters: mouseX, mouseY
function dragFunction(mouseX, mouseY) {
    guiClosed = false;
    if (selectedUIElement != null){
      selectedUIElement.x += mouseX - initialMouseX;
      selectedUIElement.y += mouseY - initialMouseY;
      initialMouseX = mouseX;
      initialMouseY = mouseY;
    }
    //Saves mouse coordinates into persistent data to store location of UI

    //Saves mouse coordinates into global variable
    globalMouseX = mouseX;
    globalMouseY = mouseY;



    //Complicated algorithm to save screen position even when screen size changes
    if (mouseX < Renderer.screen.getWidth() / 2) {
        offsetX = mouseX;
    } else {
        offsetX = Renderer.screen.getWidth() - mouseX
    }

    if (mouseY < Renderer.screen.getHeight() / 2) {
        offsetY = mouseY
    } else {
        offsetY = Renderer.screen.getHeight() - mouseY
    }
    saveConfig();
}

let SCREEN_WIDTH_TO_SB_X_RATIO = 1 / 1.2
let SCREEN_HEIGHT_TO_SB_Y_RATIO = 1 / 3
// Read Config
const readConfig = () => {
    try {
        config = JSON.parse(FileLib.read('./config/ChatTriggers/modules/PitExtras/config.json'));
        if (!config) {
            config = {
                streakCutoff: 20,
                scoreboard: {
                    x: Renderer.screen.getWidth() * SCREEN_WIDTH_TO_SB_X_RATIO,
                    y: Renderer.screen.getHeight() * SCREEN_HEIGHT_TO_SB_Y_RATIO
                },
                streakGUI: {
                    x: 10,
                    y: 30
                },
                jewelGUI: {
                    x: 10,
                    y: 30
                },
                position: {
                    x: 10,
                    y: 30,
                    scale: 1
                },
                itemStats: []
            };
        }
    } catch (e) {
        config = {
            streakCutoff: 20,
            scoreboard: {
                x: 570,
                y: Renderer.screen.getHeight() * SCREEN_HEIGHT_TO_SB_Y_RATIO
            },
            streakGUI: {
                x: 10,
                y: 30
            },
            position: {
                x: 10,
                y: 30,
                scale: 1
            },
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

var timerItemNames = [{itemName:"§aAura of Protection",
                       timerName:"aura"},
                      {itemName:"§6AAA-Rated Steak",
                       timerName:"steak"}]
//item = name of held item, event = (optional) cancelable event
function itemUse(item, event) {
    //If the config hasn't been loaded, load it
    let index = timerItemNames.findIndex(e => e.itemName === item);
    if (index <= -1) return;

    try {
      let currentTimer = timers[timerItemNames[index].timerName];
      currentTimer.lastUsed = Date.now();
    } catch (err){
      ChatLib.chat(`ITEMUSE ERROR: ${err}`)
    }
};

function romanToInt(romanNumerals) {
    let numeralValue = 0;
    let largestNumeral = 0;
    for (i = 0; i < romanNumerals.length; i++) {
        let curNumeral = romanCharToInt(romanNumerals.charAt(i));
        if (curNumeral > largestNumeral) {
            largestNumeral = curNumeral;
            numeralValue = curNumeral - numeralValue;
        } else {
            numeralValue += curNumeral;
        }
    }
    return numeralValue;
};

function romanCharToInt(romanNumeral) {
    if (romanNumeral == 'I') {
        return 1;
    } else if (romanNumeral == 'V') {
        return 5;
    } else if (romanNumeral == 'X') {
        return 10;
    } else if (romanNumeral == 'L') {
        return 50;
    } else if (romanNumeral == 'C') {
        return 100;
    } else if (romanNumeral == 'D') {
        return 500;
    } else if (romanNumeral == 'M') {
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
        bounty: 0,
        streakIndex: null,
        urlIndex: null,
        scoreboardArray: []
    };

    let index = 0;

    Scoreboard.getLines(false).forEach((item) => {
        if (item.getPoints() <= maxScore) {
            if ((index == 0) && (item.getPoints() < maxScore)) {
                customScoreboard.startScore = item.getPoints();
            }
            customScoreboard.scoreboardArray.push({
                text: item.getName(),
                index: index
            });
            if (item.toString().includes("XP")) {
                if (item.toString().includes("MAXED") == false) {
                    customScoreboard.xpToNxtLvl = Number.parseInt(item.toString().split(" ")[2].replace(/[^0-9]/g, ""));
                }
                customScoreboard.xpIndex = index;
            } else if (item.toString().includes("Gold")) {
                customScoreboard.currentGold = Number.parseFloat(item.toString().split(" ")[1].replace(/(§[a-z0-9])+/g, "").replace(/[^0-9]/g, ""));
                currentPlayerGold = customScoreboard.currentGold / 100;
                customScoreboard.goldIndex = index;
            } else if (item.toString().includes("Level")) {
                if (item.toString().split(" ")[2] != undefined) {
                    onGenesis = true;
                    genesisSymbol = item.toString().split(" ")[2].substring(0, 3);
                } else {
                    onGenesis = false;
                }
                customScoreboard.lvl = Number.parseInt(item.toString().split(" ")[1].replace(/(§[a-z0-9])+/g, "").replace(/[^0-9]/g, ""));
                customScoreboard.lvlIndex = index;
            } else if (item.toString().includes("Prestige")) {
                customScoreboard.pres = romanToInt(item.toString().split(" ")[1].replace(/([^IVX])+/g, ""));
                customScoreboard.presIndex = index;
            } else if (item.toString().includes("Status")) {
                customScoreboard.status = item.toString().split(" ")[1].replace(/(§[a-z0-9])+/g, "");
                customScoreboard.statusIndex = index;
            } else if (item.toString().includes("Streak")) {
                customScoreboard.streak = Number.parseFloat(item.toString().split(" ")[1].replace(/(§[a-z0-9])/g, "").replace(/[^0-9]/g, ""));
                customScoreboard.streakIndex = index;
            } else if (item.toString().includes("Bounty")) {
                customScoreboard.bounty = Number.parseFloat(item.toString().split(" ")[1].replace(/(§[a-z0-9])/g, "").replace(/[^0-9]/g, ""));
            } else if ((item.toString().includes("hypixel")) || (item.toString().includes("§6§l"))) {
                customScoreboard.urlIndex = index;
            }
            index++;
        }
    })
    return customScoreboard;
};

function addToCustomScoreboard(customScoreboardArray, text, index, deleteCurrent) {
    deleteCurrent = (typeof deleteCurrent !== 'undefined') ? deleteCurrent : false;
    customScoreboardArray.forEach((item) => {
        if (item.index == index) {
            if (deleteCurrent == false) {
                customScoreboardArray.push({
                    text: text,
                    index: index
                })
                item.index = item.index + 1;
            } else {
                item.text = text;
            }
        } else if (item.index > index) {
            if (deleteCurrent == false) {
                item.index = item.index + 1;
            }
        }
    });
    return customScoreboardArray;
}

function rainbowString(string, tick) {
    //let colorCodeList = ["§4", "§c", "§e", "§a", "§2", "§9", "§b", "§5", "§d"];
    let colorCodeList = ["§e", "§6§l", "§r§e", "§f", "", "", "", "", ""];
    let result = ""
    let i = tick;
    string.split("").forEach(letter => {
        if (i > 8) {
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

const getAPI = register(`step`, (steps) => {
      try {
          promptKey("PitExtras").then(key => {
            fetchHypixelStats(key, Player.getUUID().toString());
          });
      } catch (e) {
          ChatLib.chat(`GetAPI Error: ${e}`)
      }
}).setDelay(10);

function createCustomScoreBoard() {
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
        let goldReqEstimate = 0;
        if (playerStats.goldGrinded != null) {
            goldReqEstimate = playerStats.goldGrinded;
            if (currentPlayerGold > playerStats.currentGold) {
                if (pitExtrasSettings.getSetting("Custom Scoreboard", "Estimate Gold Req")) {
                    goldReqEstimate = (parseFloat(goldReqEstimate) + (parseFloat(currentPlayerGold) - parseFloat(playerStats.currentGold))).toFixed(2);
                }
            }
            goldReqEstimate = prestigeInfo[playerStats.pres].GoldReq - goldReqEstimate;
        }
        let xpIndex = getScoreBoardToArray(26).xpIndex;
        let goldIndex = getScoreBoardToArray(26).goldIndex;
        try {
            let bounty = (getScoreBoardToArray(26).bounty);
            if ((bounty >= 5000) && (pitExtrasSettings.getSetting("GUI", "5K Bounty Warning"))) {
                if (warnings.fiveThousandBounty == false) {
                    let MESSAGE_FADE_IN_TIME = 10;
                    let MESSAGE_STAY_TIME = 10;
                    let MESSAGE_FADE_OUT_TIME = 10;
                    Client.showTitle(`&6&l5K Bounty Reached`, "", MESSAGE_FADE_IN_TIME, MESSAGE_STAY_TIME, MESSAGE_FADE_OUT_TIME);
                    warnings.fiveThousandBounty = true;
                }
            } else {
                warnings.fiveThousandBounty = false;
            };
        } catch (e) {
            ChatLib.chat(`5kWarning Error: ${e}`)
        }
        goldReqEstimate = ((goldReqEstimate > 0) ? goldReqEstimate : 0);
        try {
          if (pitExtrasSettings.getSetting("Custom Scoreboard", "Show Pres XP %")) {
            if (typeof prestigeInfo[playerStats.pres - 1] !== 'undefined'){
              sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `§b${Math.min(((((playerStats.xp - prestigeInfo[playerStats.pres - 1].SumXp) / (prestigeInfo[playerStats.pres].SumXp - prestigeInfo[playerStats.pres - 1].SumXp))).toFixed(4) * 100).toFixed(2), 100)}%`, xpIndex + 1, false);
              goldIndex++;
            }
          }
        } catch (e) {
          ChatLib.chat(`Pres XP % Error: ${e}`)
        }
        if (pitExtrasSettings.getSetting("Custom Scoreboard", "Show Gold Req % Grinded")) {
            sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `§6${((1 - (goldReqEstimate.toFixed(2) / prestigeInfo[playerStats.pres].GoldReq)).toFixed(4) * 100).toFixed(2)}%`, goldIndex + 1, false);
        }
        if (pitExtrasSettings.getSetting("Custom Scoreboard", "Show Remaining Gold Req")) {
            sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `Gold Req: §6${goldReqEstimate.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}g`, goldIndex + 1, false);
        }
        if (pitExtrasSettings.getSetting("Custom Scoreboard", "Pres Number")) {
            sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `Prestige: §e§l${getScoreBoardToArray(26).pres}`, getScoreBoardToArray(26).presIndex, true);
        }
        if (onGenesis) {
            if (pitExtrasSettings.getSetting("Custom Scoreboard", "Show Faction Points")) {
                sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, `Faction Points: ${genesisSymbol.substring(0,2)}${playerStats.factionPoints} ${genesisSymbol}`, getScoreBoardToArray(26).lvlIndex + 1, false);
                sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, ` `, getScoreBoardToArray(26).lvlIndex + 2, false);
            } else {
                sortedScoreBoardArray = addToCustomScoreboard(sortedScoreBoardArray, ` `, getScoreBoardToArray(26).lvlIndex + 1, false);
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

let rainbowOffset = 0;
function myRenderOverlay() {
    rainbowOffset = 0;
    if (config === null) {
        readConfig();
    };
    if (ChatLib.removeFormatting(Scoreboard.getTitle()) !== "THE HYPIXEL PIT") {
        Scoreboard.setShouldRender(true);
        scoreBoardDisplay.shouldRender = false;
        scoreBoardDisplayShadow.shouldRender = false;
        return;
    }
    try {
      renderScoreBoard();
    } catch (e) {
      ChatLib.chat(`SB Render Error: ${e}`);
    }
    myTextObject.setScale(config.position.scale);
    let renderPosition = {x:config.position.x,
                          y:config.position.y};
    if (globalMouseX < Renderer.screen.getWidth() / 2) {
        newOffsetX = globalMouseX;
    } else {
        newOffsetX = Renderer.screen.getWidth() - globalMouseX
    }

    if (globalMouseY < Renderer.screen.getHeight() / 2) {
        newOffsetY = globalMouseY;
    } else {
        newOffsetY = Renderer.screen.getHeight() - globalMouseY
    }

    if (newOffsetX != offsetX) {
        renderPosition.x = (Renderer.screen.getWidth() - offsetX)
    }

    if (newOffsetY != offsetY) {
        renderPosition.y = (Renderer.screen.getHeight() - offsetY)
    }
    try {
      renderHUD();
    } catch (e) {
      ChatLib.chat(`UI Elements Render Error: ${e}`);
    }
}

let uiLoaded = false;
function renderHUD(){
  if (uiLoaded == false){
    if (ChatLib.removeFormatting(Scoreboard.getTitle()) !== "THE HYPIXEL PIT") return;
    loadUILocations();
    uiLoaded = true;
  }
  uiArray.forEach((item, i) => {
    if ((item.enabled == true) || myGui.isOpen()){
      item.renderFunction(item.x, item.y, item.enabled);
      if (myGui.isOpen()){
        Renderer.drawRect(Renderer.color(0, 0, 0, 100), item.x - 6, item.y - 6, 12, 12);
        if (item.enabled == false){
          Renderer.drawRect(Renderer.color(255, 0, 0, 100), item.x - 5, item.y - 5, 10, 10);
        } else {
          Renderer.drawRect(Renderer.color(220, 220, 220, 100), item.x - 5, item.y - 5, 10, 10);
        }
      }
    }
  });

}

function renderScoreBoard(){
  try {
      let RAINBOW_TICK_SPEED = 15
      if (rainbowTick == 11) {
          rainbowTickColor++;
          rainbowTick = 0
          if (rainbowTickColor > 8) {
              rainbowTickColor = 0;
          }
      }
      rainbowTick++;
      let rainbow = rainbowString("Pit Extras", rainbowTickColor);
      Scoreboard.setLine(1, rainbow, true);
      let timeNow = Date.now();
      let TIME_BETWEEN_SCOREBOARD_UPDATES = 1;
      if ((timeNow - lastScoreBoardUpdateTime) >= (TIME_BETWEEN_SCOREBOARD_UPDATES * MILLISEC_TO_SEC)) {
          lastScoreBoardUpdateTime = timeNow;
          customScoreBoardArray = createCustomScoreBoard();
      } else {
          customScoreBoardArray = addToCustomScoreboard(customScoreBoardArray, rainbow, customScoreBoardArray.length - 1, true);
      }
  } catch (e) {
      ChatLib.chat(`Rainbow Error: ${e}`);
  }
  scoreBoardDisplay.clearLines()
  try {
      let chromaScoreBoard = pitExtrasSettings.getSetting("Custom Scoreboard", "Rainbow");
      customScoreboardTitle = pitExtrasSettings.getSetting("Custom Scoreboard", "Title");
      scoreBoardTitle = ((customScoreboardTitle.length > 0) ? customScoreboardTitle : Scoreboard.getTitle())
      let title = ""
      if (chromaScoreBoard == true){
        title = scoreBoardTitle.replace(/(§[a-f0-9])+/g, "");
      } else {
        title = scoreBoardTitle;
      }
      if (chromaScoreBoard) {
        scoreBoardDisplay.addLine(
            new DisplayLine("  " + "  " + title + "  " + "  " + "  ")
            .setAlign("center")
            .setTextColor(getRainbow())
        )
      } else {
        scoreBoardDisplay.addLine(
            new DisplayLine("  " + "  " + title + "  " + "  " + "  ")
            .setAlign("center")
        )
      }
      customScoreBoardArray.forEach((item) => {
          if ((item.text.toString().length > 6) || (item.index > 1)) {
              let alignments = ["left", "center", "right"]
              scoreBoardAlign = alignments[pitExtrasSettings.getSetting("Custom Scoreboard", "Align (Left, Center, Right)") - 1];
              let text = ""
              if (chromaScoreBoard == true){
                text = item.text.replace(/(§[a-f0-9])+/g, "");
              } else {
                text = item.text;
              }
              if (chromaScoreBoard) {
                scoreBoardDisplay.addLine(
                    new DisplayLine(`${text}`)
                    .setAlign(scoreBoardAlign)
                    .setTextColor(getRainbow())
                )
              } else {
                scoreBoardDisplay.addLine(
                    new DisplayLine(`${text}`)
                    .setAlign(scoreBoardAlign)
                )
              }
          }
      });
      /*if (myGui.isOpen() && openGUI == "scoreboard") {
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
      }*/
  } catch (e) {
      ChatLib.chat(e);
  }
}

function getItemNumberColor(itemCounter){
  for (currentColor of itemCounter.colors){
    if (itemCounter.currentInvAmount >= currentColor.minAmount){
      return (currentColor.colorCode);
    }
  }
}

function renderItemCounts(startX, startY){
  try {
    let x = startX;
    let y = startY;
    let renderIcons = true;
    let renderNames = true;
    itemCounters.forEach((currentItemCounter, i) => {
      let counterName = '§e' + (("displayName" in currentItemCounter) ? currentItemCounter.displayName : new Item(currentItemCounter.registryName).getName());
      let colorCode = getItemNumberColor(currentItemCounter);

      let renderString = `: ${colorCode}${currentItemCounter.currentInvAmount}`;
      if (renderNames) renderString = `${counterName}${renderString}`;

      let counterItemImage = new Item(currentItemCounter.registryName);
      if (renderIcons) counterItemImage.draw(x, y - (ITEM_ICON_SIZE / 4));

      drawBold(myTextObject.setX((renderIcons ? x + ITEM_ICON_SIZE + ITEM_ICON_BUFFER : x)).setY(y).setString(renderString));
      y += (config.position.scale * (renderIcons ? ITEM_ICON_SIZE : 10));
    });
    return {x:x, y:y};
  } catch (e) {
    ChatLib.chat(`Render Item Counts Error: ${e}`);
  }
}

function getSlotOfEnchant(inventory, enchantName, itemID){
  let slot = -1;
  inventory.getItems().forEach((item, i) => {
    if (item.getID() == itemID){
      if (item.getLore().join().includes(enchantName)){
        slot = i;
      }
    }
  });
  return slot;
}

function renderTimers(startX, startY){
  let x = startX;
  let y = startY;
  Object.keys(timers).forEach((item, i) => {
    try {
      item = timers[item];
      if (item.setting() == false) return;
      let cooldownTime = ((Date.now() - item.lastUsed) / MILLISEC_TO_SEC);
      if (pitExtrasSettings.getSetting("GUI","Show Timer Item Icons")) {
        if (Player.getInventory().contains(item.itemRender.itemID)) {
          if (item.itemRender.enchantRequired){
            let enchantSlot = getSlotOfEnchant(Player.getInventory(), item.itemRender.defaultLore[0], item.itemRender.itemID)
            if (enchantSlot > -1){
              Player.getInventory().getStackInSlot(enchantSlot).draw(x, y - (ITEM_ICON_SIZE / 4))
            } else {
              let damage = item.itemRender.defaultDamage;
              let name = item.itemRender.defaultName;
              if (item.itemRender.itemID == 383){
                damage = ((item.cooldownLength - cooldownTime) > 0 ? 51 : 96)
                name = ((item.cooldownLength - cooldownTime) > 0 ? `§7${name}` : name);
              }
              createStack(item.itemRender.itemID, name, item.itemRender.defaultLore.concat([`§f${item.itemRender.cooldownLore}${Math.max((item.cooldownLength - cooldownTime).toFixed(2), 0)}`]), damage, false).draw(x, y - (ITEM_ICON_SIZE / 4));
            }
          } else {
            Player.getInventory().getStackInSlot(Player.getInventory().indexOf(item.itemRender.itemID)).draw(x, y - (ITEM_ICON_SIZE / 4))
          }
        } else {
          let damage = item.itemRender.defaultDamage;
          let name = item.timername;
          if (item.itemRender.itemID == 383){
            damage = ((item.cooldownLength - cooldownTime) > 0 ? 51 : 96)
            name = ((item.cooldownLength - cooldownTime) > 0 ? `§7${name.substring(2)}` : name);
          }
          createStack(item.itemRender.itemID, item.itemRender.defaultName, item.itemRender.defaultLore.concat([`§f${item.itemRender.cooldownLore}${Math.max((item.cooldownLength - cooldownTime).toFixed(2), 0)}`]), damage, false).draw(x, y - (ITEM_ICON_SIZE / 4));
        }
      }
      myTextObject.setX(x + 20).setY(y).setString(`${item.timername} ${item.colorCode}${(cooldownTime < item.cooldownLength ? (item.cooldownLength - cooldownTime).toFixed(2) : item.zeroValue)}`);
      drawBold(myTextObject);
      y += (config.position.scale * ITEM_ICON_SIZE);
    } catch (e){
      ChatLib.chat(`TIMER RENDER ISSUE: ${e}`);
    }
  });
  return {x:x, y:y};
}

function renderStringArray(stringArray, x, y){
  stringArray.forEach((item) => {
    myTextObject.setX(x).setY(y).setString(item);
    drawBold(myTextObject);
    y += (config.position.scale * 10);
  });
  return {x:x, y:y};
}

function renderStreakHUD(x, y){
  if ((streakInfo.startTime != null) || ((myGui.isOpen() == true))) {
      let timeNow = Date.now();
      let time = (streakInfo.endTime == null ? ((timeNow - streakInfo.startTime) / MILLISEC_TO_SEC).toFixed(2) : ((streakInfo.endTime - streakInfo.startTime) / MILLISEC_TO_SEC).toFixed(2))
      time = ((myGui.isOpen() == true) ? 0 : time);
      let streakInfoArray = [
        (streakInfo.endTime == null ? `§fCurrent Streak Info` : `§fLast Streak Info`),
        `§cKills: ${streakInfo.kills}`,
        `§eAssists: ${streakInfo.assists}`,
        `§6Gold: ${(streakInfo.gold).toFixed(2)}g`,
        `§6Gold per Kill: ${streakInfo.goldPerKill.toFixed(2)}g`,
        `§bXP: ${streakInfo.xp}`,
        `§bXP per Kill: ${streakInfo.xpPerKill}`,
        `§bTime: ${Math.floor(time/60)}m ${Math.floor(time%60)}s`]
      renderStringArray(streakInfoArray, x, y);
  }
}

function renderLifeSaverWarnings(x, y){
  if ((lowLifeItems.length > 0) || (myGui.isOpen())) {
    if ((wearingBadArmor) || (myGui.isOpen())) {
      myTextObject.setX(x).setY(y).setString(`§cWARNING You Are Not Wearing Full Diamond or an Iron Helm`);
      drawBold(myTextObject);
      y += (config.position.scale * 10);
      myTextObject.setX(x).setY(y).setString(`§cThe following mystics are in your inventory`);
      drawBold(myTextObject);
      y += (config.position.scale * 10);
    }
    lowLifeItems.forEach((item) => {
        myTextObject.setX(x).setY(y).setString(`§cWARNING ${item.name} §ewith ${item.enchants.replace("§o","")} §ehas ${item.lives} §elives`);
        drawBold(myTextObject);
        y += (config.position.scale * 10);
    });
  }
  return {x:x, y:y};
}

function getEnchantTier(item, enchant) {
  let lore = ""
  try {
    lore = item.getLore().join();
  } catch (e) {
    return 0;
  }
  if (lore.includes(enchant + " III")){
    return 3;
  } else if (lore.includes(enchant + " II")){
    return 2;
  } else if (lore.includes(enchant)) {
    return 1;
  } else {
    return 0;
  }
}

function updateEnchantPower() {
  try {
    Object.keys(enchantPower).forEach((key) => {
      currEnchantPower = enchantPower[key];
      currEnchantPower.tier = getEnchantTier(new PlayerMP(Player.getPlayer()).getItemInSlot(currEnchantPower.slot), currEnchantPower.enchantName);
      let filteredPlayers = getPlayers().filter((player) => currEnchantPower.criteriaFunction(player));
      currEnchantPower.playersNearby = filteredPlayers.length;
    });
  } catch (e) {
    ChatLib.chat(e);
  }
}

function renderEnchantPowerHUD(x, y){
 try {
   Object.keys(enchantPower).forEach((key) => {
     currEnchantPower = enchantPower[key];
     if ((currEnchantPower.tier > 0) || (myGui.isOpen())){
       myTextObject.setX(x).setY(y).setString(currEnchantPower.displayName + " " + "I".repeat(Math.max(1, currEnchantPower.tier)) + " §6" + currEnchantPower.valueFunction());
       drawBold(myTextObject);
       y += 10;
     }
   });
 } catch (e) {
   ChatLib.chat("Render Enchant Power Error: " + e);
 }
  return {x:x, y:y};
}

function renderJewelList(x, y){
  if ((jewels.length > 0) || (myGui.isOpen())) {
      myTextObject.setX(x).setY(y).setString(`§3Hidden Jewel List`);
      drawBold(myTextObject);
      y += (config.position.scale * 10);
      y += (config.position.scale * (ITEM_ICON_SIZE / 4))
      jewels.forEach((currentJewel) => {
          currentJewel.item.draw(x, y - (ITEM_ICON_SIZE / 4))
          myTextObject.setX(x + 20).setY(y).setString(`${currentJewel.name} §fKills: §e${currentJewel.kills}`);
          drawBold(myTextObject);
          y += (config.position.scale * ITEM_ICON_SIZE);
      });
  }
  return {x:x, y:y};
}

function getRainbow(){
  let rainbowOffsetDelta = 3;
  let fluidRainbow = true;
  if (fluidRainbow){
    rainbowOffset += rainbowOffsetDelta;
  }
  return Renderer.getRainbow(rainbowSteps + rainbowOffset, 10);
}

function drawBold(text) {
  let modes = ["None", "Shadow", "Bold"]
  let mode = modes[pitExtrasSettings.getSetting("GUI", "Text Mode (None, Shadowed, Bold)") - 1];
  if (pitExtrasSettings.getSetting("GUI", "Rainbow")){
    color = getRainbow();
    text.setString(text.getString().replace(/(§[a-z0-9])+/g, "")).setColor(color);
  }
    let borderSize = text.getScale();
    if (ChatLib.removeFormatting(Scoreboard.getTitle()) !== "THE HYPIXEL PIT") return;
    if (mode == "Bold"){
      let x = text.getX();
      let y = text.getY();
      let darkText = new Text(text.getString().replace(/(§[a-z0-9])+/g, ""), x, y).setColor(Renderer.BLACK).setScale(text.getScale());
      darkText.setColor(Renderer.BLACK);
      darkText.setX(x + borderSize).setY(y).draw();
      darkText.setX(x - borderSize).setY(y).draw();
      darkText.setX(x).setY(y + borderSize).draw();
      darkText.setX(x).setY(y - borderSize).draw();
      darkText.setX(x).setY(y);
    } else if (mode == "Shadow"){
      text.setShadow(true);
    } else {
      text.setShadow(false);
    }
    text.draw();
}

register('guiMouseClick', (x, y, button, gui, event) => {
    if (config === null) {
        readConfig();
    }
    let guiname = gui.class.getSimpleName();
    let guicheck = (guiname == `GuiInventory`)
    if ((pitExtrasSettings.getSetting("GUI", "Force Shift") === false) || Client.isShiftDown() || (guiname != `GuiInventory`)) return;
    cancel(event);
});

function setDurabilityPercent(item, percentAsDecimal){
  percentAsDecimal = (percentAsDecimal > 1 ? 1 : percentAsDecimal)
  //func_77972_a = damageItem(int amount, EntityLivingBase entityIn)
  //func_77964_b = setItemDamage(int meta)
  item.getItemStack().func_77972_a(3/*Math.max(Math.ceil(item.getMaxDamage() * percentAsDecimal))*/, Player.getPlayer());
  ChatLib.chat("Max Dmg: " + item.getMaxDamage());
  //item.setDamage(Math.max(Math.ceil(item.getMaxDamage() * percentAsDecimal), 0));
}

function createStack(id, name, lore, damage, glint) {
    let item = new Item(id).getItemStack(); // Creates an item from the 'type' variable
    let tag = new NBTTagCompound(); // Creates a new NBTTagCompound

    var new_nbt = new MCNBTTagList(); // Creates a new NBTTagList
    lore.forEach(line => {
        if(line.length > 0) {
            new_nbt.func_74742_a(new NBTTagString(line)); // Adds a line to the NBTTagList
        } else {
            new_nbt.func_74742_a(new NBTTagString("§0")); // If it's an empty line it will just put §0 since minecraft deletes empty lore lines
        }
    });

    tag.func_74782_a(
        "display",
        new NBTTagCompound() // Creates the display NBTTagCompound where we put the lore and the display name
    ); // tag.setTag()
    tag.func_74775_l("display").func_74778_a(
        "Name",
        name // Applies the 'name' variable as the item's display name
    ); // tag.getCompoundTag().setString()
    tag.func_74775_l("display").func_74782_a(
        "Lore",
        new_nbt // Applies the NBTTagList as the item's lore
    ); // tag.getCompoundTag().setTag()

    if(glint) {
            tag.func_74782_a(
                "ench",
                new MCNBTTagList()
            )
    }

    item.func_77964_b(damage);
    item.func_77982_d(tag); // item.setTagCompound()
    item = new Item(item); // Creates a new item with our new modified NBT data

    return item;
}

register("itemTooltip", (lore, item, event) => {
    try {
        const tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
        let tier = tags.getTag("UpgradeTier");
        let nonce = tags.getTag("Nonce");
        let name = item.getRegistryName();
        if (!(name == "minecraft:bow" || name == "minecraft:golden_sword" || name == "minecraft:leather_leggings")) {
            return;
        }
        if (nonce === null) return;
        let tier3Text = null;
        if ((nonce == 5) || (nonce == 8)) {
            return;
        }
        if (nonce == 6) {
            if (tier >= 0 && tier <= 1) {
                tier3Text = `§r§7Requires §0Dark Pants§7 to Tier 2`
            } else {
                return;
            }
        }
        if (nonce == 9) {
            if (tier >= 0 && tier <= 2) {
                tier3Text = `§r§7Requires §4Rage Pants§7 to Tier 3`
            } else {
                return;
            }
        }
        if (nonce != 6 && nonce != 9) {
            let colorInt = (nonce % 5)
            let colors = [`§cRed`, `§eYellow`, `§9Blue`, `§6Orange`, `§aGreen`];
            if (tier >= 0 && tier <= 2) {
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
    } catch (e) {
        ChatLib.chat(`Item Tooltip Error: ${e}`);
    }
})

function updateItemStatsLore(item) {
    const tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
    let nonce = tags.getTag("Nonce");
    let itemIndex = -1;
    config.itemStats.forEach((item, i) => {
        if (item.nonce.toString() == nonce.toString()) {
            itemIndex = i;
        }
    });
    if (itemIndex > -1) {
        updateLoreCounter(item, "§eKills: §f", config.itemStats[itemIndex].kills)
        updateLoreCounter(item, "§eAssists: §f", config.itemStats[itemIndex].assists)
        if (item.getLore().join().trim().includes(" XP ")) {
            updateLoreCounter(item, "§eXP Earned: §b", config.itemStats[itemIndex].xp.toFixed(0))
        }
        try {
            if (item.getLore().join().trim().includes("Gold Bump") || item.getLore().join().trim().includes("Gold Boost") || item.getLore().join().trim().includes("Moctezuma")) {
                updateLoreCounter(item, "§eGold Earned: §6", config.itemStats[itemIndex].gold.toFixed(2))
            }
        } catch (e) {
            ChatLib.chat(`Update Item Stats Error: ${e}`);
        }
    }
}

const GuiInventory = Java.type("net.minecraft.client.gui.inventory.GuiInventory");
const GuiChest = Java.type("net.minecraft.client.gui.inventory.GuiChest");
function updateItemData(){
  try {
    Player.getInventory().getItems().forEach((item) => {
      const tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
      let tier = tags.getTag("UpgradeTier");
      let nonce = tags.getTag("Nonce");
      if (nonce != null) {
        try {
            updateItemStatsLore(item);
        } catch (e) {
            ChatLib.chat(`ExtraAttributes Error: ${e}`);
        }
      }
      Object.keys(timers).forEach((key) => {
        let currTimer = timers[key];
        if(currTimer.itemRender.itemID == item.getID()){
          if (currTimer.itemRender.enchantRequired == true){
            if (!(item.getLore().join().includes(currTimer.itemRender.defaultLore[0]))){
              return;
            } else {
              //ChatLib.chat(item.getLore().join());
              //setDurabilityPercent(item, .5/*Math.max((currTimer.cooldownLength - cooldownTime).toFixed(2), 0) / currTimer.cooldownLength*/);
            }
          }
          let cooldownTime = ((Date.now() - currTimer.lastUsed) / MILLISEC_TO_SEC);
          updateLoreCounter(item, currTimer.itemRender.cooldownLore, Math.max((currTimer.cooldownLength - cooldownTime).toFixed(2), 0));
        }
      });
      Object.keys(itemStatusTrackers).forEach((key) => {
        let currItemPower = itemStatusTrackers[key];
        if(item.getID() == 283){
            if (!(item.getLore().join().includes(currItemPower.enchant))){
              return;
            }
          updateLoreCounter(item, currItemPower.template, currItemPower.power.toFixed(2), 0);
        }
      });
    });
  } catch (e) {
    ChatLib.chat(`Update Item Data Error: ${e}`);
  }
}

function updateLoreCounter(item, loreTemplate, counterValue) {
    const list = new NBTTagList(item.getNBT().getCompoundTag("tag").getCompoundTag("display").getTagMap().get("Lore"))
    let modified = false
    for (let i = 0; i < list.getTagCount(); i++) {
        if (list.getStringTagAt(i).includes(`${loreTemplate}`) == false) continue
        list.removeTag(i);
    }
    list.appendTag(new NBTTagString(`${loreTemplate}${counterValue}`));
}

//Scan Inventory
const scanInventory = register(`step`, (steps) => {
    let inventory = Player.getInventory();
    let items = inventory.getItems();
    lowLifeItems = [];
    if (!pitExtrasSettings.getSetting("LifeSaver", "Enabled")) return;
    //Check if the Player is wearing bad armor
    let player = World.getPlayerByName(Player.getName());
    let playerHelm = player.getItemInSlot(4).getName();
    let playerChest = player.getItemInSlot(3).getName();
    let playerLegs = player.getItemInSlot(PANTS_SLOT).getName();
    let playerBoots = player.getItemInSlot(1).getName();
    var badArmor = {
        helm: ((playerHelm == "tile.air.name" || playerHelm == "Chain Helmet" || playerHelm == "Leather Cap") ? true : false),
        chest: ((playerChest == "tile.air.name" || playerChest == "Chain Chestplate" || playerChest == "Iron Chestplate") ? true : false),
        legs: ((playerLegs == "tile.air.name" || playerLegs == "Chain Leggings") ? true : false),
        boots: ((playerBoots == "tile.air.name" || playerBoots == "Chain Boots" || playerBoots == "Iron Boots") ? true : false),
    };
    if ((badArmor.helm || badArmor.chest || badArmor.legs || badArmor.boots) && pitExtrasSettings.getSetting("LifeSaver", "Bad Armor Warning")) {
        wearingBadArmor = true;
    } else {
        wearingBadArmor = false;
    }
    items.forEach((item) => {
        let tags = item.getNBT().getCompoundTag("tag").getCompoundTag("ExtraAttributes")
        let lives = tags.getTag("Lives");
        let nonce = tags.getTag("Nonce");
        if (lives != null) {
            let tier = tags.getTag("UpgradeTier");
            if (tier != 0) {
                //Get Enchants
                let name = item.getRegistryName();
                if (name != "minecraft:bow" && name != "minecraft:golden_sword" && name != "minecraft:leather_leggings" && wearingBadArmor == false) {
                    return;
                }
                if (nonce == 8) {
                    if (item.getLore().join().trim().includes("Right-click to open menus!")) {
                        return;
                    }
                }
                const lore = item.getLore()
                name = lore.shift().replace(/( \(#[0-9][0-9][0-9][0-9]\))/g, "").replace(/(§[k-o])/g, "")
                let enchants = null;
                lore.forEach((loreString) => {
                    if (loreString.trim().replace(/§5/g, "").substring(2, 4) == "§9" || loreString.trim().replace(/§5/g, "").substring(2, 4) == "§d") {
                        if (loreString.trim().replace(/§5/g, "").substring(4) == "+6.5 Attack Damage" || loreString.trim().replace(/§5/g, "").substring(4) == "As strong as iron") return;
                        if (enchants === null) {
                            enchants = loreString.trim()
                        } else {
                            enchants = `${enchants} §cand ${loreString.trim()}`
                        }
                    }
                });
                if (lives <= (Number.parseInt(pitExtrasSettings.getSetting("LifeSaver", "Life Limit"))) || wearingBadArmor == true) {
                    lowLifeItems.push({
                        name: name,
                        lives: lives,
                        enchants: enchants
                    });
                }
            }
        }
    });

}).setDelay(1);

const guiHandler = register("command", () => {
        myGui.open();
}).setName("pitextrasgui");

const fetchHypixelStats = (key, uuid) => {
    request({
        url: `https://api.hypixel.net/player?key=${key}&uuid=${uuid}`,
        json: true,
        headers: {
            "User-Agent": "CTJSPITEXTRAS",
        }
    }).then(function(response) {
        try {
            let playerInfo = response;
            var prestiges = (playerInfo.player.stats.Pit.profile.prestiges ? playerInfo.player.stats.Pit.profile.prestiges : []);
            playerStats.pres = prestiges.length;
            if (playerInfo.player.stats.Pit.profile.genesis_points >= playerStats.factionPoints) {
                playerStats.factionPoints = playerInfo.player.stats.Pit.profile.genesis_points;
            }
            if (playerInfo.player.stats.Pit.profile.xp >= playerStats.xp) {
                playerStats.xp = playerInfo.player.stats.Pit.profile.xp
            }
            playerStats.currentGold = playerInfo.player.stats.Pit.profile.cash.toFixed(2);
            playerStats.goldGrinded = playerInfo.player.stats.Pit.profile[`cash_during_prestige_${playerStats.pres}`].toFixed(2);
        } catch (e) {
            ChatLib.chat(`Fetch Hypixel Stats Error: ${e}`);
            return ({
                success: false
            })
        }
    })
};

register("actionBar", event => {
    let actionBarText = ChatLib.getChatMessage(event);
    if (actionBarText.includes("Telebow") && actionBarText.includes("cooldown")) {
        timers.tele.cooldownLength = parseInt(actionBarText.split(": ")[1].replace(/([^0-9])+/g, ""));
        timers.tele.lastUsed = Date.now();
    }
})

const jewelcheck = register("command", () => {
    getHiddenJewelProgress();
}).setName("jewelcheck");

var jewels = [];

function getHiddenJewelProgress() {
    jewels = [];
    Player.getOpenedInventory().getItems().forEach((item, i) => {
        try {
            if (item.getName() != "tile.air.name") {
                if ((item.getRegistryName() == "minecraft:leather_leggings") || (item.getRegistryName() == "minecraft:golden_sword")) {
                    if (item.getLore().join().trim().includes("Hidden Jewel")) {
                        let name = ((item.getRegistryName() == "minecraft:leather_leggings") ? "§3Jewel Pants" : "§6Jewel Sword")
                        let kills = parseInt(item.getLore().join().split("Kills: ")[1].replace(/(§[a-z0-9])+/g, "")).toFixed(0);
                        jewels.push({
                            item: item,
                            name: name,
                            kills: kills
                        })
                    }
                }
            }
        } catch (e) {
            ChatLib.chat(`Get Hidden Jewel Progress Error: ${e}`);
        }
    })
}

function cooldownMessage(timerName){
  let currentTimer = timers[timerName];
  try {
    if ((currentTimer.cooldownLength - ((Date.now() - currentTimer.lastUsed) / MILLISEC_TO_SEC)).toFixed(2) < 0) return;
    ChatLib.clearChat(Object.keys(timers).indexOf(timerName));
    ChatLib.chat(new Message (`${PIT_EXTRAS_MESSAGE_TAG} ${currentTimer.cooldownMessage}${(currentTimer.cooldownLength - ((Date.now() - currentTimer.lastUsed) / MILLISEC_TO_SEC)).toFixed(2)} seconds`).setChatLineId(Object.keys(timers).indexOf(timerName)));
  } catch (e) {
    ChatLib.chat(`Cooldown Message Error: ${e}`);
  }
}

var FIRST_AID_EGG_USE_SOUND = "mob.cat.hiss";
var FIRST_AID_EGG_COOLDOWN_SOUND = "mob.villager.no";
//Detect First Aid Egg Usage
register('soundPlay', (pos, name, vol, pitch, cat, event) => {
    if (name == FIRST_AID_EGG_USE_SOUND){
      timers.egg.lastUsed = Date.now();
    } else if (name == FIRST_AID_EGG_COOLDOWN_SOUND){
      cooldownMessage("egg");
    }
});

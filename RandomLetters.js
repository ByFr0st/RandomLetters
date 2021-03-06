module.exports = {
    // Set this to the name of the mod. This is what will be shown inside of Discord Bot Studio.
    // THIS FILE NAME MUST BE THIS VALUE WITH SPACES REMOVED
    name: "Random Letters",

    // Place the author of the mod here. This is an array so you can add other authors by writing ["Great Plains Modding", "New User"]
    author: ["ByFr0st#0001"],

    // Place the version of the mod here.
    version: "1.0.0",

    // Whenever you make a change, please place the changelog here with your name. Created Send Message ~ Great Plains Modding\n
    changelog: "",

    // Set this to true if this will be an event.
    isEvent: false,
    
    isResponse: true,

    // Set this to true if this will be a response mod.
    isMod: true,

    // If you want to modify a core feature, set this to true.
    isAddon: false,

    // Here you can define where you want your mod to show up inside of Discord Bot Studio
    section: "Variable",

    // Place your html to show inside of Discord Bot Studio when they select your mod.
    html: function(data) {
        return `
            <div class="col">
                    <label>Variable Name *</label>
                    <input class="form-control" name="storeresult"></input><br>
                </div>
            <div class="col">
                    <label>Variable Type *</label>
                    <select name="vartype" class="form-control">
                        <option value="temp">Temp Variable</option>
                        <option value="server">Server Variable</option>
                        <option value="global">Global Variable</option>
                    </select><br>
                    <label>Data Type *</label>
                    <select name="fetchtype" class="form-control">
                        <option value="symbols">Only generates symbols and letters</option>
                        <option value="numbers">Only generates numbers</option>
                        <option value="all">Generates a password with letters and symbols</option>
                    </select><br>
            </div>
        `;
    },

    // When the bot is first started, this code will be ran.
    init: function(DBS) {
        DBS.BetterMods.requireModule('generate-password');
        console.log("Random Letters loaded");
    },

    // Place your mod here.
    mod: async function(DBS, message, action, args, command, index) {
        const generator = require('generate-password'); 
        const password = generator.generate({
            length: 10,
            numbers: false,
            symbols: true
        });
        const password_2 = generator.generate({
            length: 10,
            numbers: true,
            symbols: false
        });
        const password_3 = generator.generate({
            length: 10,
            numbers: true,
            symbols: true
        });
        switch(action.fetchtype) {
            case "symbols":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, password, message.guild);
            break
            case "numbers":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, password_2, message.guild);
            break
            case "all":
                DBS.BetterMods.saveVar(action.vartype, action.storeresult, password_3, message.guild);
            break
        }
        DBS.callNextAction(command, message, args, index + 1);
    }
};

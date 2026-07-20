// SAVE KEY
// LEAVE AT TOP
const SAVE_KEY = "FactoryGlamourSave_v1";
// Game State
const game = {
    money: 0,
    rawBatches: 0,
  inventory: {
    iron: 0,
    copper: 0,
    gold: 0,
    diamond: 0
  },
    molten: {
    iron: 0,
    copper: 0,
    gold: 0
 },
 ingots: {
  iron: 0,
  copper: 0,
  gold: 0
 },
 crafts: {
    iron: 0,
    copper:0,
    gold: 0,
 },
  processing: false,
  pendingBatch: null,
  mining: false,
};
// Save Load
function autoSave() {
  localStorage.setItem(SAVE_KEY, JSON.stringify(game));
}
function loadGame() {
  const data = JSON.parse(localStorage.getItem(SAVE_KEY));
  if (!data) return;
  Object.assign(game, data);
  game.mining = false;
  game.processing = false;
}
// DOM
const el = (id) => document.getElementById(id);
const mine = el("mine");
const process = el("process");
const iron = el("iron");
const copper = el("copper");
const gold = el("gold");
const diamond = el("diamond");
const batch = el("batch");
const mining = el("mining");
const processingStatus = el("processingStatus");
const miron = el("miron");
const mcopper = el("mcopper");
const mgold = el("mgold");
const smeltIron = el("smeltIron");
const smeltCopper = el("smeltCopper");
const smeltGold = el("smeltGold");
const moIron = el("moIron");
const moCopper = el("moCopper");
const moGold = el("moGold");
const iiron = el("iiron");
const icopper = el("icopper");
const igold = el("igold");
const cIron = el("cIron");
const cCopper = el("cCopper");
const cGold = el("cGold");
const money = el("money");

// Update UI
function updateInventoryUI() {
    iron.textContent = game.inventory.iron;
    copper.textContent = game.inventory.copper;
    gold.textContent = game.inventory.gold;
    diamond.textContent = game.inventory.diamond;
    console.log("UI updating...");
    miron.textContent = game.molten.iron;
    mcopper.textContent = game.molten.copper;
    mgold.textContent = game.molten.gold;
    iiron.textContent = game.ingots.iron;
    icopper.textContent = game.ingots.copper;
    igold.textContent = game.ingots.gold;
    money.textContent = game.money;
    cIron.textContent = game.crafts.iron;
    cCopper.textContent = game.crafts.copper;
    cGold.textContent = game.crafts.gold;
}
// Mine
mine.addEventListener("click", () => {

   if (game.mining || game.pendingBatch) return;

    game.mining = true;

    console.log("Mining started...");

    mining.textContent = "Mining...";
    batch.textContent = "No Batch Ready";
    setTimeout(() => {
        game.pendingBatch = { size: 10 };
        game.mining = false;
        mining.textContent = "Idle";
        batch.textContent = "Batch Ready";
        console.log("Batch created:", game.pendingBatch);
        autoSave();
    }, 10000);

});
process.addEventListener("click", () => {
    if (game.processing || !game.pendingBatch) return;

    console.log(game.inventory);
    updateInventoryUI();
    game.processing = true;
    console.log("Processing started...");

   processingStatus.textContent = "Processing...";
   batch.textContent = "No Batch Ready";
    setTimeout(() => {

        for (let i = 0; i < game.pendingBatch.size; i++) {

            const roll = Math.floor(Math.random() * 100) + 1;

            if (roll <= 60) {
                game.inventory.iron += 1;
                console.log("+1 Iron");
            } 
            else if (roll <= 85) {
                game.inventory.copper += 1;
                console.log("+1 Copper");
            } 
            else if (roll <= 95) {
                game.inventory.gold += 1;
                console.log("+1 Gold");
            } 
            else {
                game.inventory.diamond += 1;
                console.log("+1 Diamond");
            }
        }

        game.pendingBatch = null;
        game.processing = false;
        updateInventoryUI();

        console.log("Processing complete!");

        processingStatus.textContent = "Not Processing"
        autoSave();
    }, 10000);
    console.log(game.inventory);
});
smeltIron.addEventListener("click", () => {
    if (game.inventory.iron < 10) return;

    game.inventory.iron -= 10;
    game.molten.iron += 1;

    updateInventoryUI();
    autoSave();
});
smeltCopper.addEventListener("click", () => {
    if (game.inventory.copper < 10) return;

    game.inventory.copper -= 10;
    game.molten.copper += 1;

    updateInventoryUI();
    autoSave();
});
smeltGold.addEventListener("click", () => {
    if (game.inventory.gold < 10) return;

    game.inventory.gold -= 10;
    game.molten.gold += 1;

    updateInventoryUI();
    autoSave();
});
moIron.addEventListener("click", () => {
    if (game.molten.iron < 2) return;

    game.molten.iron -= 2;
    game.ingots.iron += 1;

    updateInventoryUI();
    autoSave();
});
moCopper.addEventListener("click", () => {
    if (game.molten.copper < 2) return;

    game.molten.copper -= 2;
    game.ingots.copper += 1;

    updateInventoryUI();
    autoSave();
});
moGold.addEventListener("click", () => {
    if (game.molten.gold < 2) return;

    game.molten.gold -= 2;
    game.ingots.gold += 1;

    updateInventoryUI();
    autoSave();
});
craftIron.addEventListener("click", () => {
    if (game.ingots.iron < 1) return;

    game.ingots.iron -= 1;
    game.crafts.iron += 2;

    updateInventoryUI();
    autoSave();
});

craftCopper.addEventListener("click", () => {
    if (game.ingots.copper < 1) return;

    game.ingots.copper -= 1;
    game.crafts.copper += 3;

    updateInventoryUI();
    autoSave();
});

craftGold.addEventListener("click", () => {
    if (game.ingots.gold < 1) return;

    game.ingots.gold -= 1;
    game.crafts.gold += 4;

    updateInventoryUI();
    autoSave();
});
// INIT
// LEAVE AT BOTTOM
loadGame();
updateInventoryUI();
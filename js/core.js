"use strict";

// Store active player action
let actionTitle;
let actionTimer;

// Display player's skills details
renderSkillList();

// Display player's available actions
renderActionList();

// Display player's inventory items
refreshInventoryList();

// Display available crafting list
refreshCraftingList();

refreshLocationList();

// Set up clicks listeners for whole containers
setClickListeners();

// Generate pseudo-random number
function getRandomNumber(min, max) {
	const engine = Random.engines.browserCrypto;
	let distribution = Random.integer(min, max);

	return distribution(engine);
}

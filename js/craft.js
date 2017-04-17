"use strict";

var craftingList = [
	{
		id: 0,
		item: 9,
		amount: 1,
		level: 1,
		experience: 5,
		requiredItems: [
			[5, 10],
			[6, 5]
		]
	},
	{
		id: 0,
		item: 10,
		amount: 1,
		level: 2,
		experience: 15,
		requiredItems: [
			[0, 10],
			[5, 25],
			[6, 10]
		]
	}
];

// Get available crafting options based on player's crafting level
function getAvailableCrafting() {
	return craftingList;
}

// Craft an item and subtract used items amount
function doCraftItem(id) {
	let recipe = craftingList[id];

	// Verify if player's crafting level if enough
	if (getSkillLevel(3) < recipe.level) {
		return false;
	}

	// Take required items from player
	for (let i = 0; i < recipe.requiredItems.length; i++) {
		let requiredItemId = recipe.requiredItems[i][0];
		let requiredAmount = recipe.requiredItems[i][1];
		let existingAmount = playerInventory.get(requiredItemId);

		playerInventory.set(requiredItemId, existingAmount - requiredAmount);
	}

	let existingAmount = playerInventory.get(recipe.item);
	playerInventory.set(recipe.item, (existingAmount || 0) + recipe.amount);

	// Add experience to player's statistics
	addSkillExperience(3, recipe.experience);

	return true;
}

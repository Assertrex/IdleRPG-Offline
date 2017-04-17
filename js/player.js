"use strict";

// Store player's levels and experience
let playerSkills = [
	{
		id: 0,
		level: 1,
		experience: 0
	},
	{
		id: 1,
		level: 1,
		experience: 0
	},
	{
		id: 2,
		level: 1,
		experience: 0
	},
	{
		id: 3,
		level: 1,
		experience: 0
	}
]

// Store player's inventory as map and give coins, pickaxe and axe on start
let playerInventory = new Map([
    [0, 25], [1, 1], [2, 1]
]);

// Store actions list
let actionsList = [
	{
		id: 1,
		title: 'Fight a chicken',
		time: 2.5,
		experienceRewards: [
			{ id: 0, amount: 2 }
		],
		itemsRewards: [
			{ id: 3, amountMin: 1, amountMax: 1, chance: 100 },
			{ id: 4, amountMin: 5, amountMax: 15, chance: 100 }
		]
	},
	{
		id: 2,
		title: 'Mine small rock',
		time: 3,
		experienceRewards: [
			{ id: 1, amount: 3 }
		],
		itemsRewards: [
			{ id: 5, amountMin: 1, amountMax: 3, chance: 100 }
		]
	},
	{
		id: 3,
		title: 'Cut small tree',
		time: 2,
		experienceRewards: [
			{ id: 2, amount: 1 }
		],
		itemsRewards: [
			{ id: 6, amountMin: 1, amountMax: 2, chance: 100 },
			{ id: 7, amountMin: 1, amountMax: 3, chance: 10 }
		]
	},
];

// Get player's level of selected skill
function getSkillLevel(id) {
	return playerSkills[id].level;
}

// Get player's experience of selected skill
function getSkillExperience(id) {
	return playerSkills[id].experience;
}

// Add experience to selected player's skill
function addSkillExperience(id, amount) {
	let requiredExperience = getRequiredExperience(getSkillLevel(id) + 1);

    playerSkills[id].experience += amount;

	if (playerSkills[id].experience >= requiredExperience) {
		playerSkills[id].level++;
	}

    return true;
}

// Get player's inventory items map
function getPlayerInventory() {
	return playerInventory;
}

// Add item to player's inventory
function addInventoryItem(id, amountMin, amountMax, chance) {
	const itemAmount = playerInventory.get(id);
	const chanceNumber = getRandomNumber(0, 100);

	// Check if player got enough chance to get item
	if (chanceNumber < chance) {
		const dropAmount = getRandomNumber(amountMin, amountMax);

		// Create new map element if not existing yet
		if (typeof itemAmount === 'undefined') {
			playerInventory.set(id, dropAmount);
		} else {
			playerInventory.set(id, itemAmount + dropAmount);
		}
	}

	return true;
}

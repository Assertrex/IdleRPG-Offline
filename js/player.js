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
	}
]

// Store actions list
let actionsList = [
	{
		id: 1,
		title: 'Fight a chicken',
		time: 2.5,
		experienceRewards: [
			{
				id: 0,
				amount: 2
			}
		]
	},
	{
		id: 2,
		title: 'Mine small rock',
		time: 3,
		experienceRewards: [
			{
				id: 1,
				amount: 3
			}
		]
	},
	{
		id: 3,
		title: 'Cut small tree',
		time: 2,
		experienceRewards: [
			{
				id: 2,
				amount: 1
			}
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

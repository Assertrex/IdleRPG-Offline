"use strict";

// Store available skills list
let skillsList = [
	{
		id: 0,
		title: 'Combat',
		icon: 'skills/combat.png'
	},
	{
		id: 1,
		title: 'Mining',
		icon: 'skills/mining.png'
	},
	{
		id: 2,
		title: 'Woodcutting',
		icon: 'skills/woodcutting.png'
	},
	{
		id: 3,
		title: 'Crafting',
		icon: 'skills/crafting.png'
	},
];

// Store experience list needed for level up
let experienceList = [
	0, 0, 75, 159, 250, 351, 462, 583, 717, 863, 1024,
	1201, 1395, 1608, 1841, 2097, 2378, 2687, 3025, 3396, 3804,
	4250, 4740, 5278, 5868, 6515, 7224, 8003, 8857, 9794, 10822,
	11950, 13187, 14545, 16034, 17668, 19462, 21429, 23588, 25957, 28556,
	31408, 34538, 37973, 41741, 45877, 50415, 55395, 60861, 66858, 73440,
	80664, 88591, 97290, 106837, 117315, 128814, 141434, 155284, 170484, 187166,
	205475, 225569, 247622, 271826, 298390, 327545, 359543, 394662, 433206, 475509,
	521939, 572898, 628827, 690211, 757584, 831529, 912687, 1001762, 1099527, 1206830,
	1324600, 1453860, 1595730, 1751442, 1922344, 2109920, 2315796, 2541759, 2789767, 3061971,
	3360734, 3688645, 4048550, 4443569, 4877129, 5352991, 5875281, 6448530, 7077711, 7768279,
	8526226, 9358126, 10271193, 11273348, 12373283, 13580539, 14905588, 16359922, 17956156, 19708136,
	21631058, 23741602, 26058074, 28600566, 31391133, 34453979, 37815671, 41505368, 45555075, 49999918
];

// Get player's required experience to level up any skill
function getRequiredExperience(requiredLevel) {
	return experienceList[requiredLevel];
}

// Get player's required experience percentage progress to level up any skill
function getRequiredExperiencePercentage(currentLevel, currentXP, requiredLevel) {
	return ((currentXP - getRequiredExperience(currentLevel)) / (getRequiredExperience(requiredLevel) - getRequiredExperience(currentLevel))) * 100;
}

"use strict";

let itemsList = [
	{ id: 0, name: 'Coins' },
	{ id: 1, name: 'Stone pickaxe' },
	{ id: 2, name: 'Stone axe' },
	{ id: 3, name: 'Raw chicken' },
	{ id: 4, name: 'Feathers' },
	{ id: 5, name: 'Stone' },
	{ id: 6, name: 'Logs' },
	{ id: 7, name: 'Tree seeds' },
	{ id: 8, name: 'Copper dagger' }
];

function getItemName(id) {
	return itemsList[id].name;
}

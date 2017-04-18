"use strict";

let locationList = [
	{
		id: 1,
		title: 'Village',
		coordinates: [127, 127]
	},
	{
		id: 2,
		title: 'Forest',
		coordinates: [125, 127]
	},
	{
		id: 3,
		title: 'Mine',
		coordinates: [128, 123]
	}
];

function getLocationList() {
	return locationList;
}

function getTravelTime(id) {
	const currentLocationCoords = locationList[playerCurrentLocation - 1].coordinates;
	const newLocationCoords = locationList[id - 1].coordinates;
	const distance = Math.abs(currentLocationCoords[0] - newLocationCoords[0]) + Math.abs(currentLocationCoords[1] - newLocationCoords[1]);
	const speed = 1; // one field per 'x' seconds

	return distance * speed;
}

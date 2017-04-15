"use strict";

// Define constant DOM elements
const dom_containerActions = document.querySelector('#container-actions');
const dom_containerSkills = document.querySelector('#container-skills');
const dom_containerInventory = document.querySelector('#container-inventory');

// Iterate through every player skill
function renderSkillList() {
	for (let i = 0; i < skillsList.length; i++) {
		// Insert HTML for each available skill
		dom_containerSkills.insertAdjacentHTML('beforeend', `
			<div class="item">
				<div class="flex center v-center">
					<div class="container-skill-icon">
						<img src="img/${skillsList[i].icon}" alt="${skillsList[i].title} icon" />
					</div>
					<div class="container-skill-title">
						<div class="title">${skillsList[i].title}</div>
						<div>
							LVL: <div class="value"><span id="skill-${skillsList[i].id}-level">0</span></div>
						</div>
						<div>
							EXP: <div class="value"><span id="skill-${skillsList[i].id}-experience">0</span> / <span id="skill-${skillsList[i].id}-experience-required">0</span></div>
						</div>
					</div>
				</div>
				<progress id="skill-${skillsList[i].id}-progress-bar" class="progress-bar" value="0" max="100"></progress>
			</div>
		`);
	}

	// Set up skills values based on player's progress
	refreshSkillList();

	return true;
}

// Refresh every skill details
function refreshSkillList() {
	for (let i = 0; i < skillsList.length; i++) {
		document.getElementById('skill-' + skillsList[i].id + '-level').textContent = getSkillLevel(i);
	    document.getElementById('skill-' + skillsList[i].id + '-experience').textContent = getSkillExperience(i);
	    document.getElementById('skill-' + skillsList[i].id + '-experience-required').textContent = getRequiredExperience(getSkillLevel(i) + 1);
	    document.getElementById('skill-' + skillsList[i].id + '-progress-bar').value = getRequiredExperiencePercentage(getSkillLevel(i), getSkillExperience(i), getSkillLevel(i) + 1);
	}

	return true;
}

// Iterate through every available player action
function renderActionList() {
	for (let i = 0; i < actionsList.length; i++) {
		// Insert HTML for each available action
		dom_containerActions.insertAdjacentHTML('beforeend', `
			<div id="action-${actionsList[i].id}" class="item">
				${actionsList[i].title}<br />
				<span class="details">${actionsList[i].time} seconds</span><br />
			</div>
		`);

		const dom_buttonAction = document.querySelector('#action-' + actionsList[i].id);

		// Listen for action clicks
		dom_buttonAction.addEventListener('click', () => {
			// Check if no any other action is active now
			if (actionTimer === undefined) {
				// Set action button class to active item
				dom_buttonAction.className = "item active";

				// Do action for defined time
				actionTimer = setTimeout(() => {
					// Reset action button class to default item
					dom_buttonAction.className = "item";

					// Clear current action timer
					actionTimer = undefined;

					// Add experience to player's statistics
					addSkillExperience(actionsList[i].experienceRewards[0].id, actionsList[i].experienceRewards[0].amount);

					// Add items into player's inventory
					actionsList[i].itemsRewards.forEach((value) => {
						addInventoryItem(value.id, value.amount);
					});

					// Refresh skills list values
					refreshSkillList();

					// Refresh inventory list
					refreshInventoryList();
				}, actionsList[i].time * 1000);
			}
		});
	}

	return true;
}

// Refresh player's every inventory item
function refreshInventoryList() {
	// Store inventory items list element
	const dom_containerInventoryList = dom_containerInventory.querySelector('ul');

	// Remove all items from inventory section
    while(dom_containerInventoryList.firstChild){
        dom_containerInventoryList.removeChild(dom_containerInventoryList.firstChild);
    }

	// Store inventory items list
	const inventory = getPlayerInventory();

	// List every item into inventory section
    inventory.forEach((value, key) => {
		dom_containerInventoryList.insertAdjacentHTML(
			'beforeend',
			`<li id="inventory-item-${key}">
				<div class="item">${getItemName(key)} x${value}</div>
				<div class="actions">
					<span class="button use">Use</span>
					<span class="button sell">Sell</span>
					<span class="button drop">Drop</span>
				</div>
			</li>`
		);
    });

	return true;
}

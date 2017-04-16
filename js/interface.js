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
			<div data-action-id="${actionsList[i].id}" class="item">
				${actionsList[i].title}<br />
				<span class="details">${actionsList[i].time} seconds</span><br />
			</div>
		`);
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
			`<li>
				<div class="item">${getItemName(key)} (x${value})</div>
				<div class="actions">
					<span data-inventory-id="${key}" data-inventory-action="use" class="button use">Use</span>
					<span data-inventory-id="${key}" data-inventory-action="sell" class="button sell">Sell</span>
					<span data-inventory-id="${key}" data-inventory-action="drop" class="button drop">Drop</span>
				</div>
			</li>`
		);
    });

	return true;
}

// Set up click listeners for whole containers
function setClickListeners() {
	// Listen for action clicks
	dom_containerActions.addEventListener('click', (e) => {
		let button = null;
		let id = null;

		// Get id of action button clicked directly
		if (e.target.getAttribute('data-action-id') != null) {
			button = e.target;
			id = e.target.getAttribute('data-action-id');
		}

		// Get id of action button when clicked on child
		if (e.target.parentNode.getAttribute('data-action-id') != null) {
			button = e.target.parentNode;
			id = e.target.parentNode.getAttribute('data-action-id');
		}

		// Do action if button or it's child has been clicked
		if (button != null && id != null) {
			if (actionTimer === undefined) {
				// Set action button class to active item
				button.className = "item active";

				// Do action for defined time
				actionTimer = setTimeout(() => {
					// Reset action button class to default item
					button.className = "item";

					// Clear current action timer
					actionTimer = undefined;

					// Add experience to player's statistics
					addSkillExperience(actionsList[id - 1].experienceRewards[0].id, actionsList[id - 1].experienceRewards[0].amount);

					// Add items into player's inventory
					actionsList[id - 1].itemsRewards.forEach((value) => {
						addInventoryItem(value.id, value.amountMin, value.amountMax, value.chance);
					});

					// Refresh skills list values
					refreshSkillList();

					// Refresh inventory list
					refreshInventoryList();
				}, actionsList[id - 1].time * 1000);
			}
		}
	});

	// Listen for inventory clicks
	dom_containerInventory.addEventListener('click', (e) => {
		let action = null;
		let id = null;

		// Get id of action button clicked directly
		if (e.target.getAttribute('data-inventory-id') != null && e.target.getAttribute('data-inventory-action') != null) {
			action = e.target.getAttribute('data-inventory-action');
			id = e.target.getAttribute('data-inventory-id');

			// I'm not implementing this feature yet, because there's no use for it now.
			// console.log('Requested', action, 'action for the', getItemName(id), '(' + id + ') item.');
		}
	});
}

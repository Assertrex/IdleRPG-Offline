"use-strict";

window.addEventListener('load', function() {
	var skill = new Skill();
    var player = new Player(skill);

    refreshHeaderSkills();

	var currentTimer;

    document.getElementById('action-fight-chicken').addEventListener('click', function() {
		if (currentTimer === undefined) {
			document.getElementById('action-fight-chicken').className = "item active";

			currentTimer = setTimeout(function() {
				player.addSkillExperience(1, 2);
				refreshHeaderSkills();

				document.getElementById('action-fight-chicken').className = "item";
				currentTimer = undefined;
			}, 2500);
		}
    });
    document.getElementById('action-mine-smallrock').addEventListener('click', function() {
		if (currentTimer === undefined) {
			document.getElementById('action-mine-smallrock').className = "item active";

			currentTimer = setTimeout(function() {
				player.addSkillExperience(2, 3);
				refreshHeaderSkills();

				document.getElementById('action-mine-smallrock').className = "item";
				currentTimer = undefined;
			}, 3000);
		}
    });
    document.getElementById('action-cut-smalltree').addEventListener('click', function() {
		if (currentTimer === undefined) {
			document.getElementById('action-cut-smalltree').className = "item active";

			currentTimer = setTimeout(function() {
				player.addSkillExperience(3, 1);
				refreshHeaderSkills();

				document.getElementById('action-cut-smalltree').className = "item";
				currentTimer = undefined;
			}, 2000);
		}
    });

    function refreshHeaderSkills() {
        document.getElementById('header-skill-combat-level').innerHTML = player.getSkillLevel(1);
        document.getElementById('header-skill-mining-level').innerHTML = player.getSkillLevel(2);
        document.getElementById('header-skill-woodcutting-level').innerHTML = player.getSkillLevel(3);

        document.getElementById('header-skill-combat-experience').innerHTML = player.getSkillExperience(1);
        document.getElementById('header-skill-mining-experience').innerHTML = player.getSkillExperience(2);
        document.getElementById('header-skill-woodcutting-experience').innerHTML = player.getSkillExperience(3);

        document.getElementById('header-skill-combat-experience-required').innerHTML = skill.getRequiredExperience(player.getSkillLevel(1) + 1);
        document.getElementById('header-skill-mining-experience-required').innerHTML = skill.getRequiredExperience(player.getSkillLevel(2) + 1);
        document.getElementById('header-skill-woodcutting-experience-required').innerHTML = skill.getRequiredExperience(player.getSkillLevel(3) + 1);

        document.getElementById('header-skill-progress-combat-bar').value = skill.getRequiredExperiencePercentage(player.getSkillLevel(1), player.getSkillExperience(1), player.getSkillLevel(1) + 1);
        document.getElementById('header-skill-progress-mining-bar').value = skill.getRequiredExperiencePercentage(player.getSkillLevel(2), player.getSkillExperience(2), player.getSkillLevel(2) + 1);
        document.getElementById('header-skill-progress-woodcutting-bar').value = skill.getRequiredExperiencePercentage(player.getSkillLevel(3), player.getSkillExperience(3), player.getSkillLevel(3) + 1);
    }
});

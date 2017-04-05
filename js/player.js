class Player
{
    constructor(o_skill)
    {
		this.o_skill = o_skill;

        this.skills = [
            [0, 0], // Null
            [1, 0], // Combat
            [1, 0], // Mining
            [1, 0] // Woodcutting
        ];
    }

    getSkillLevel(id)
    {
        return this.skills[id][0];
    }

    getSkillExperience(id)
    {
        return this.skills[id][1];
    }

    addSkillExperience(id, amount)
    {
		let requiredExperience = this.o_skill.getRequiredExperience(this.getSkillLevel(id) + 1);
        this.skills[id][1] = this.skills[id][1] + amount;

		if (this.skills[id][1] >= requiredExperience) {
			this.skills[id][0]++;
		}

        return true;
    }
}

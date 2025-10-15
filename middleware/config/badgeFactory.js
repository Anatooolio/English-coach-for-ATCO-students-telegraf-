function createBadge({ key, label, icon = '🎖️', statKey, target, condition }) {
	return {
		key,
		label,
		icon,
		condition,
		target,
		statKey,
		getStat(s) {
			return s?.[this.statKey] ?? 0
		},
		check(s) {
			return s?.[this.statKey] >= this.target
		},
	}
}

module.exports = { createBadge }

new Vue({
	el: '#app',
	data: {
		heroHealth: 100,
		monsterHealth: 100,
		isRunning: false
	},
	methods: {
		startGame: function() {
			this.isRunning = true;
			this.heroHealth = 100;
			this.monsterHealth = 100;
		},
		calculteDamage: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		attack: function() {
			var damage = this.calculteDamage(5, 15);
			this.monsterHealth -= damage;

			if (this.monsterHealth <= 0) {
				this.monsterHealth = 0;
				alert('You Won!');
				this.isRunning = false;
				return;
			}

			var monsterDamage = this.calculteDamage(7, 17);
			this.heroHealth -= monsterDamage;

			if (this.heroHealth <= 0) {
				this.heroHealth = 0;
				alert('You Lost!');
				this.isRunning = false;
			}
		}
	}
});

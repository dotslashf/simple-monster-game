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
		calculateDmg: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		calculateHeal: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		attack: function() {
			var damage = this.calculateDmg(5, 10);
			this.monsterHealth -= damage;

			var monsterDamage = this.calculateDmg(3, 12);
			this.heroHealth -= monsterDamage;

			this.checkWinner();
		},
		specialAttack: function() {
			var damage = this.calculateDmg(10, 15);
			this.monsterHealth -= damage;

			var monsterDamage = this.calculateDmg(3, 9);
			this.heroHealth -= monsterDamage;

			this.checkWinner();
		},
		heal: function() {
			if (this.heroHealth < 100) {
				var heal = this.calculateHeal(8, 17);
				this.heroHealth += heal;
				if (this.heroHealth > 100) {
					temp = this.heroHealth - 100;
					this.heroHealth = this.heroHealth - temp;
				}
			} else {
				alert('You Have Maximum Health!');
				return;
			}

			var monsterDamage = this.calculateDmg(3, 12);
			this.heroHealth -= monsterDamage;

			this.checkWinner();
		},
		giveUp: function() {
			var dialogBox = confirm('Are You Sure Want To Give Up?');
			if (dialogBox) {
				this.isRunning = false;
				this.monsterHealth = 100;
				this.heroHealth = 100;
			}
		},
		checkWinner: function() {
			if (this.monsterHealth <= 0) {
				this.monsterHealth = 0;
				alert('You Won!');
				this.isRunning = false;
				return;
			} else if (this.heroHealth <= 0) {
				this.heroHealth = 0;
				alert('You Lost!');
				this.isRunning = false;
				return;
			}
		}
	}
});

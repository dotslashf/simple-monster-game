new Vue({
	el: '#app',
	data: {
		heroHealth: 100,
		monsterHealth: 100,
		heroMana: 5,
		isRunning: false,
		turns: []
	},
	methods: {
		startGame: function() {
			this.isRunning = true;
			this.heroHealth = 100;
			this.monsterHealth = 100;
			this.heroMana = 5;
			this.turns = [];
		},
		calculateDmg: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		calculateHeal: function(min, max) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		attack: function() {
			var heroDamage = this.calculateDmg(5, 10);
			this.monsterHealth -= heroDamage;
			this.turns.unshift({
				isPlayer: true,
				text: 'Hero attack Monster for ' + heroDamage
			});
			if (this.checkWinner()) {
				return;
			}

			this.monsterAttack(3, 12);
			this.checkWinner();
		},
		specialAttack: function() {
			if (this.heroMana > 0) {
				var heroDamage = this.calculateDmg(10, 15);
				this.monsterHealth -= heroDamage;
				this.heroMana -= 1;
				this.turns.unshift({
					isPlayer: true,
					text: 'Hero attack Monster for ' + heroDamage
				});
				if (this.checkWinner()) {
					return;
				}
			} else {
				return alert('You have no mana left');
			}

			this.monsterAttack(3, 9);
			this.checkWinner();
		},
		heal: function() {
			if (this.heroHealth < 100) {
				var heal = this.calculateHeal(8, 17);
				this.heroHealth += heal;
				if (this.heroMana < 5) {
					this.heroMana += Math.floor(Math.random() * 2);
				}
				this.turns.unshift({
					isPlayer: true,
					text: 'Hero heals for ' + heal
				});
				if (this.heroHealth > 100) {
					temp = this.heroHealth - 100;
					this.heroHealth = this.heroHealth - temp;
				}
			} else {
				alert('You Have Maximum Health!');
				return;
			}

			this.monsterAttack(3, 12);
			this.checkWinner();
		},
		giveUp: function() {
			var dialogBox = confirm('Are You Sure Want To Give Up?');
			if (dialogBox) {
				this.isRunning = false;
			}
		},
		monsterAttack: function(min, max) {
			var monsterDamage = this.calculateDmg(min, max);
			this.heroHealth -= monsterDamage;
			this.turns.unshift({
				isPlayer: false,
				text: 'Monster attack Hero for ' + monsterDamage
			});
		},
		checkWinner: function() {
			if (this.monsterHealth <= 0) {
				if (confirm('You Won! New Game?')) {
					this.startGame();
					return;
				} else {
					this.isRunning = false;
				}
				this.monsterHealth = 0;
				return true;
			} else if (this.heroHealth <= 0) {
				if (confirm('You Lost! New Game?')) {
					this.startGame();
					return;
				} else {
					this.isRunning = false;
				}
				this.heroHealth = 0;
				return true;
			}
			return false;
		}
	}
});

/**
 * 
 * fonction pour retourner une valeur aleatoire
 * 
 * @param {*} min nombre minimum
 * @param {*} max nombre maximum
 * @returns number
 */
function RandomValue(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0,
            winner: null
        };
    },
    computed: {
        monsterBar() { 
            if (this.monsterHealth <= 0) {
                return {width: '0%'};
            }
            return {width: this.monsterHealth + "%"} },
        playerBar() {
            if (this.playerHealth <= 0) {
                return {width: '0%'};
            }
            return {width: this.playerHealth + "%"} },
        launch() { return this.currentRound % 4 !== 0; }
    },
    watch: {
        playerHealth(value) {
            if(value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'player';
            }
        }
    },
    methods: {
        attackMonster() {
            this.currentRound++;
            const attackPower = RandomValue(5, 12);
            this.monsterHealth -= attackPower;
            this.attackPlayer();
            checkWinner(this.playerHealth, this.monsterHealth);
        },
        attackPlayer() {
            const attackPower = RandomValue(8, 15);
            this.playerHealth -= attackPower;
            checkWinner(this.playerHealth, this.monsterHealth);
        },
        specialAttack() {
            this.currentRound = 1;
            const attackPower = RandomValue(18, 25);
            this.monsterHealth -= attackPower;
            this.attackPlayer();
            checkWinner(this.playerHealth, this.monsterHealth);
        },
        healPlayer() {
            const heal = RandomValue(8, 20);
            if(this.playerHealth >= 80) {
                alert("huh...you still heathy");
            } else {
                this.playerHealth += heal;
            }
            this.attackPlayer();
            checkWinner(this.playerHealth, this.monsterHealth);
        },
        start() {
            this.monsterHealth = 100;
            this.playerHealth = 100;
            this.currentRound = 0;
            this.winner = null;
        },
        surrender() {
            this.winner = 'monster';
        }
    }
});

app.mount("#game");
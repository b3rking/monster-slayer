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

/**
 * 
 * 
 * fonction to tell the winner
 * @param player value of the player's life
 * @param monster value of the monster's life
 * @returns string
 */
function checkWinner(player, monster) {
    if (player <= 0 && monster > 0) {
        alert("the monster got the better of you this time!");
    } else if (player > 0 && monster <= 0) {
        alert("congrats, you win!!!");
    } else {
        alert("no winner, both of you lost!");
    }
}

const app = Vue.createApp({
    data() {
        return {
            monsterHealth: 100,
            playerHealth: 100,
            currentRound: 0
        };
    },
    computed: {
        monsterBar() { return {width: this.monsterHealth + "%"} },
        playerBar() { return {width: this.playerHealth + "%"} },
        launch() { return this.currentRound % 4 !== 0; }
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
        }
    }
});

app.mount("#game");
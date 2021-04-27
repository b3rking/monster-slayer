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
            playerHealth: 100
        };
    },
    methods: {
        attackMonster() {
            const attackPower = RandomValue(5, 12);
            this.monsterHealth -= attackPower;
            this.attackPlayer();
        },
        attackPlayer() {
            const attackPower = RandomValue(8, 15);
            this.playerHealth -= attackPower;
        }
    }
});

app.mount("#game");
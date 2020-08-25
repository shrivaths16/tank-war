// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties:
    {   
        //the player bullet to fire 
        bullet: 
        {
            type: cc.Prefab,
            default: null
        },
        //the score label to display the score
        scoreLabel:
        {
            type: cc.Label,
            default: null
        },
        //Lives label to display number of lives remaining for the player
        livesLabel:
        {
            type: cc.Label,
            default: null
        },
        //Score to be updated whenever required
        score: 0, 
        //Number of enemies 
        numberOfEnemies: 0
    },

    // LIFE-CYCLE CALLBACKS:
    //This function adds the score whenever the enemy is destroyed
    addScore(valueToAdd)
    {
        this.score += valueToAdd;
        this.scoreLabel.string = 'SCORE : ' + this.score.toString();
    },

    //Function to display number of lives
    showLives(livesLeft)
    {
        this.livesLabel.string = 'LIVES : ' + livesLeft.toString();
    },

    //This function to count the number of enemies in the beginning
    totalEnemies()
    {
        this.numberOfEnemies++;
    },

    //function to restart the game
    restartGame()
    {
        cc.director.loadScene("Game");
    },

    //Function to remove enemy when destroyed
    enemyDestroyed()
    {
        this.numberOfEnemies--;
        if(this.numberOfEnemies <= 0)
        {
            var delay = cc.delayTime(5);
            this.node.runAction(delay);
            cc.director.loadScene("Game");
        }
    },

    //This function spawn a bullet and shoots from the players position
    spawnAndShoot()
    {
        var newBullet = cc.instantiate(this.bullet);
        newBullet.setPosition(this.node.getChildByName('player').position.x, this.node.getChildByName('player').position.y + 50);
        this.node.addChild(newBullet);

        var action = cc.moveTo(4, cc.v2(this.node.getChildByName('player').position.x, this.node.height));
        newBullet.runAction(action);
    },

    onLoad () 
    {
        this.node.on('mousedown', this.spawnAndShoot, this);
        cc.director.preloadScene("Game");
    },

    start () {
        this.score = 0;
    }

    // update (dt) {},
});

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
        //the max number of hits before the enemy is killed
        maxHits: 1,
        //number of hits already taken
        currentHits: 0,
        //movement speed in X
        moveSpeedX: 20,
        //movement speed in Y
        moveSpeedY: 30,
        //moving right or left
        moveRight: true,
        //the score to add when the enemy is destroyed
        scoreValue: 1,
        //enemy bullet prefab
        bullet: 
        {
            type: cc.Prefab,
            default: null
        }
    },

    // LIFE-CYCLE CALLBACKS:
    //function to handle collisions with other colliders
    onCollisionEnter (other, self)
    {
        if(other.tag == 2)
        {
            other.node.destroy();
            this.currentHits++;
            if(this.currentHits >= this.maxHits)
            {
                this.node.destroy();
                this.node.parent.getComponent('Game').addScore(this.scoreValue);
                this.node.parent.getComponent('Game').enemyDestroyed();
            }
        }
        else if(other.tag == 7)
        {
            this.moveRight = false;
            this.moveDown();
        }
        else if(other.tag == 8)
        {
            this.moveRight = true;
            this.moveDown();
        }
        else if(other.tag == 6)
        {
            this.node.parent.getComponent('Game').restartGame();
        }
    },

    //This function is to move the enemy forward every time it hits the boundary
    moveDown()
    {
        var moveY = cc.moveBy(cc.moveTime, cc.v2(0, -this.moveSpeedY));
        this.node.runAction(moveY);
    },

    //This function is for the enemy to fire at the player 
    spawnAndShoot()
    {
        var newBullet = cc.instantiate(this.bullet);
        newBullet.setPosition(this.node.position.x, this.node.position.y - 50);
        this.node.parent.addChild(newBullet);

        var action = cc.moveTo(4, cc.v2(newBullet.position.x, -this.node.parent.height));
        var destruct = cc.callFunc(function()
        {
            newBullet.destroy();
        }, this);
        var sequence = cc.sequence(action, destruct);
        newBullet.runAction(sequence);
    },

    onLoad () 
    {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.moveRight = true;
    },

    start () {
        this.currentHits = 0;
        this.node.parent.getComponent('Game').totalEnemies();
    },

    update (dt) 
    {
        var chance = Math.random();
        if(chance < (0.1*dt))
        {
            this.spawnAndShoot();
        }
        if(this.moveRight)
        {
            var moveX = cc.moveBy(cc.moveTime, cc.v2(this.moveSpeedX*dt, 0));
            this.node.runAction(moveX);            
        }
        else if(!this.moveRight)
        {
            var moveX = cc.moveBy(cc.moveTime, cc.v2(-this.moveSpeedX*dt, 0));
            this.node.runAction(moveX);
        }
    }    
});

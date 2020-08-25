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
        //number of units moved for each press of the key
        moveSpeed: 2,
        //lives before the game ends
        lives: 3
    },

    // LIFE-CYCLE CALLBACKS:
    onCollisionEnter(other, self)
    {
        if(other.tag == 4)
        {
            other.node.destroy();
            this.lives -= 1;
            this.node.parent.getComponent('Game').showLives(this.lives);
            if(this.lives == 0)
            {
                this.node.destroy();
                //Add a pause before reloading the scene
                var delay = cc.delayTime(5);
                this.node.runAction(delay);
                cc.director.loadScene("Game");
            }
        }
    },
    
    //function to check for keyboard inputs
    OnKeyDown: function (event) 
    {
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                var move = cc.moveBy(cc.moveTime, cc.v2(-this.moveSpeed, 0));
                this.node.runAction(move);
                break;
            case cc.macro.KEY.d:
                var move = cc.moveBy(cc.moveTime, cc.v2(this.moveSpeed, 0));
                this.node.runAction(move);
                break;
        }
    },

    onLoad : function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.OnKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.OnKeyUp, this);
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        cc.director.preloadScene("Game");
    },

    start () {
        this.node.parent.getComponent('Game').showLives(this.lives);
    },

    // update (dt) {},
});

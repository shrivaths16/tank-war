// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    //function to destroy when enemy and enemy bullets hit 
    onCollisionEnter(other, self)
    {
        if(other.tag == 4)
        {
            other.node.destroy();
            this.node.destroy();
        }
        if(other.tag == 3)
        {
            this.node.destroy();
        }
    },

    start () {

    },

    // update (dt) {},
});

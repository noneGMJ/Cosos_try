cc.Class({
    extends: cc.Component,

    properties: {
        x_speed: 0,
        y_speed: 0,
        y_accel: -50,
        rotate: 0,
        GameScript:
        {
            default: null,
            serializable: false
        },

    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var girl_node = this.GameScript.node.getChildByName("girl");
        var girl_loc = girl_node.convertToWorldSpace(cc.v2(0,0));
        var item_loc = this.node.convertToWorldSpace(cc.v2(0,0));
        this.rotate = (this.rotate + dt * 240) % 360;
        // cc.log("dt=============",dt);
        this.y_speed += dt * this.y_accel;
        this.node.y += this.y_speed * dt;
        this.node.rotation = this.rotate;
        //物体走出了画布，也清除
        if((girl_loc.x-item_loc.x) > (this.GameScript.node.width/2 - Math.abs(girl_node.x))){
            this.GameScript.onFlyBehindItemKilled(this.node);
        }
    },
});

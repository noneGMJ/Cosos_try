cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        y_accel: -100,
        y_speed: 0,
        x_accel: -100,
        x_speed:0,

        maingame : {
            default : null,
            type : cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.y_speed = 0;
        this.x_speed = 0;
        
        var moveout1 = cc.moveBy(1,0,50*cc.random0To1());
        var moveout2 = cc.moveBy(1,0,-50*cc.random0To1());

        this.node.runAction(cc.sequence(moveout1,moveout2));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    update: function(dt){
        // if(this.node.x <= -100){
        //     this.maingame.destroyPumpkin(this.node);
        // }else{
            
            this.y_speed += this.y_accel * dt;
            this.node.y += this.y_speed * dt;
            this.x_speed += this.x_accel * dt;
            this.node.x += this.x_speed * dt;
        // }
    }
});

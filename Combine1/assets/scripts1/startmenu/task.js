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

        startMainGame :{
            default : null,
            type : cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        // this.node.opacity = 0;
        this.node.setPosition(-11,-610);
    },

    callback_task : function (){
        this.node.runAction(
            cc.sequence(
                cc.fadeTo(0.3,0),
                
                cc.spawn(
                    cc.moveTo(0.3,-11,-610),
                    
                    cc.callFunc(function(){
                        this.startMainGame.active = true;
                    },this)
                ),

                cc.fadeTo(0.3,255),
            )
        );
        // this.node.opacity = 255;
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

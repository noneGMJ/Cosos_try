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
        this.node.opacity = 0;
        this.node.setPosition(790,-12);
    },

    callback1 : function(){
        this.node.runAction(
            cc.sequence(
                cc.moveTo(0.5,-6,3),
                cc.fadeTo(0.5,255),
                cc.callFunc(function(){
                    this.startMainGame.active = false;
                    // this.node.opacity = 0;
                },this)
            )
        );
    },

    callback2 : function(){
        this.node.runAction(
            cc.sequence(
                
                
                cc.spawn(
                    cc.fadeTo(0.5,0),
                    cc.callFunc(function(){
                        this.startMainGame.active = true;
                        // this.node.opacity = 0;
                    },this)
                ),
                cc.moveTo(0.5,790,-12)
            )
        );
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

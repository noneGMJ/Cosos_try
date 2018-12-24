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

        maskLayer:{
            default : null,
            type : cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        var  clickEventHandler = new cc.Component.EventHandler();
        clickEventHandler.target = this.node;
        clickEventHandler.component = "enterbutton";
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = "开始游戏";

        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);

    },

    callback: function (event , customEventData){
        // cc.log("start");
        this.maskLayer.active = true;
        this.maskLayer.opacity = 0;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(
            cc.sequence(
                cc.fadeTo(1,128),
                cc.fadeTo(1,200),
                cc.callFunc(function(){
                    cc.director.loadScene("Startmenu");
                },this)
            )
        );
        // cc.director.loadScene("Startmenu");
        // cc.directot.runScene(new cc.TransitionFade(2,"Startmenu"));

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

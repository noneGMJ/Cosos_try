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
        yes:{
            default : null,
            type : cc.Node
        },
        no:{
            default : null,
            type : cc.Node
        }
    },

    // use this for initialization
    onLoad: function () {
        this.yes.active = false;
        this.no.active = false;
        var scalebig = cc.scaleTo(1,0.9);
        var scalesmall = cc.scaleTo(1,1.1);
        var fadeout = cc.fadeTo(1,100);
        var fadein = cc.fadeTo(1,30);

        this.node.runAction(cc.sequence(cc.spawn(scalebig,fadein),
            cc.spawn(scalesmall,fadeout)).repeatForever());
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },

    callback: function (event , customEventData){
        // cc.log("start");
        this.yes.active = true;
        this.no.active = true;
        this.node.active = false;

        // cc.director.loadScene("Startmenu");
        // cc.directot.runScene(new cc.TransitionFade(2,"Startmenu"));

    },

    callback1: function (event , customEventData){
        cc.director.loadScene("MainScene");


        // cc.director.runScene(new cc.TransitionFade(2,"MainScene"));

    },
    callback2: function (event , customEventData){

        cc.director.loadScene("Startmenu");
        // cc.director.runScene(new cc.TransitionFade(2,"Startmenu"));

    }
});

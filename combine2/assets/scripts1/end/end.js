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
        gameover1:{  //--------- new ---------//
            default : null,
            type : cc.Node
        },
        gameover2:{
            default : null,
            type : cc.Node
        },
        again:{
            default : null,
            type : cc.Node
        },
        add :{
            default : null,
            type : cc.Label
        },
        base :{
            default : null,
            type : cc.Label
        },
        all :{
            default : null,
            type : cc.Label
        },

    },

    // use this for initialization
    onLoad: function () {
        var addscore = sys.localStorage.getItem("addscore");
        this.add.string = addscore;
        var basescore = sys.localStorage.getItem("basescore");
        this.base.string = basescore;
        this.all.string = (parseInt(addscore)  + parseInt(basescore)).toString();
        sys.localStorage.setItem("basescore",this.all.string);

        this.gameover2.runAction(cc.scaleBy(0.1,1.5));
        this.gameover1.runAction(cc.fadeTo(1,240));
        this.gameover2.runAction(cc.spawn(
                cc.fadeTo(2,30),
                cc.rotateBy(2,360),
                cc.scaleBy(2,0.67)
            )
        );
        this.again.active = true;
        this.again.opacity = 0;
        this.again.runAction(cc.fadeTo(3,100));
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

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


    },

    // use this for initialization
    onLoad: function () {

        var scalebig = cc.scaleTo(1,0.9);
        var scalesmall = cc.scaleTo(1,1.1);
        var fadeout = cc.fadeOut(1);
        var fadein = cc.fadeIn(1);

        this.node.runAction(cc.sequence(cc.spawn(scalebig,fadein),
            cc.spawn(scalesmall,fadeout)).repeatForever());


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

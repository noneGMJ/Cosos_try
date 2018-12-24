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
        // var basescore =  sys.localStorage.getItem("basescore");
        // var heartNum =  sys.localStorage.getItem("heartNum");
        // var accNum =  sys.localStorage.getItem("accNum");
        // var people1 =  sys.localStorage.getItem("people1");
        // var people2 =  sys.localStorage.getItem("people2");
        // var people3 =  sys.localStorage.getItem("people3");
        // var people4 =  sys.localStorage.getItem("people4");
        // var peopleUseNum =  sys.localStorage.getItem("peopleUseNum");

        // if(basescore == null){
            sys.localStorage.setItem("basescore","10000");
        // }
        // if(heartNum == null){
            sys.localStorage.setItem("heartNum","0");
        // }
        // if(accNum == null){
            sys.localStorage.setItem("accNum","0");
        // }
        // if(people1 == null){
            sys.localStorage.setItem("people1","1");
        // }
        // if(people2 == null){
            sys.localStorage.setItem("people2","0");
        // }
        // if(people3 == null){
            sys.localStorage.setItem("people3","0");
        // }
        // if(people4 == null){
            sys.localStorage.setItem("people4","0");
        // }
        // if(peopleUseNum == null){
            sys.localStorage.setItem("peopleUseNum","1");
        // }        

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

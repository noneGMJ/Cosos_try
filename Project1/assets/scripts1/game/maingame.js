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
        i : 0,
        pumpkin1perfab : {
            default : null,
            type : cc.Prefab
        }
    },

    // use this for initialization
    onLoad: function () {
        this.i = 0;
        this.pumpkinPool = new cc.NodePool();
        var initCount = 10; 
        for (var i = 0; i < initCount; i++) {
            var newPumpkin = cc.instantiate(this.pumpkin1perfab);
            this.pumpkinPool.put(newPumpkin);
        }
      
    },

    createNewPumpkin : function(x,y){
        var newPumpkinTemp = null;
        if(this.pumpkinPool.size() > 0){
            newPumpkinTemp = this.pumpkinPool.get();
        }else{
            newPumpkinTemp = cc.instantiate(this.pumpkin1perfab);
        }
        this.node.addChild(newPumpkinTemp);
        newPumpkinTemp.setPosition(cc.p(x,y));
        newPumpkinTemp.getComponent("pumpkin1").maingame = this;
    },

    destroyPumpkin : function(pumpkin){
        this.pumpkinPool.put(pumpkin);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.i = this.i + 1;
        if(this.i % 20 == 0 ){
            var x=-190;
            var y=167;
            for (var j=0;j<2;j++){
                this.createNewPumpkin(x,y);
                x+=-15;
                y+=-15;
            }
        }
    },
});

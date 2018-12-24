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

        rightNode : {
            default : null,
            type : cc.Node
        },

        leftNode : {
            default : null,
            type : cc.Node  
        },

        bottomNode : {
            default : null,
            type : cc.Node
        }

    },

    // use this for initialization
    onLoad: function () {
        this.startOnListner();
    },

    startOnListner : function (){
        var leftNode = this.leftNode;
        // cc.log('55');
        var rightNode = this.rightNode;
        var bottomNode = this.bottomNode;
        var noderoot = this.node;
        var listener = {
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            target : this ,
            onTouchBegan :function (touch ,event){

                noderoot.runAction(cc.spawn(
                    cc.callFunc(function(){
                        var moveout1 = cc.moveBy(1,-75,0);
                        leftNode.runAction(moveout1);
                    },this),
                    cc.callFunc(function(){
                        var moveout2 = cc.moveBy(1,75,0);
                        rightNode.runAction(moveout2);
                    },this),
                    cc.callFunc(function(){
                        var moveout3 = cc.moveBy(1,0,-67);
                        bottomNode.runAction(moveout3);
                    },this),
                    cc.fadeOut(1)
                ));
                // cc.log("777");
                return true;
            },
            onTouchMoved: function (touches, event) { 
                cc.log('Touch Moved: ' + event); 
            }, 
            onTouchEnded: function (touches, event) { 
                cc.log('Touch Ended: ' + event); 
            }, 
            onTouchCancelled: function (touches, event) { 
                cc.log('Touch Cancelled: ' + event); 
            }    
        }
        cc.eventManager.addListener(listener,this.node);

    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

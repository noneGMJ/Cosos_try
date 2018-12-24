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
        this.startOnListner();
    },

    startOnListner : function (){
        var noderoot = this.node;
        var listener = {
            event : cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches : true,
            target : this ,
            onTouchBegan :function (touch ,event){
                noderoot.opacity = 100;
                // cc.event.stopPropagation();
                // cc.log("666");
                return true;
            },
            onTouchMoved: function (touches, event) { 
                // var delta = event.getDeltaX();
                noderoot.x = touches.getLocationX()-500;
                noderoot.y = touches.getLocationY()-310;
            }, 
            onTouchEnded: function (touches, event) { 
                noderoot.opacity = 255;
            }, 
            onTouchCancelled: function (touches, event) { 
                // cc.log('Touch Cancelled: ' + event); 
            }    
        }
        cc.eventManager.addListener(listener,this.node);


    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

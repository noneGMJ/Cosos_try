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

        
        task : {
            default : null,
            type : cc.Node
        },

        masklayer :{
            default : null,
            type : cc.Node
        },





    },

    // use this for initialization
    onLoad: function () {
        // this.startOnListner();
        // this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
        //     this.node.opacity = 50;
        // }),
        this.node.opacity = 0;
        this.node.runAction(cc.fadeTo(0.2,255));
        
        var self_ = this.node;
        var task_ = this.task;
        var masklayer_ = this.masklayer;
        var resetX = this.node.x;
        var resetY = this.node.y;
        var resetX_task =  task_.x;
        var resetY_task =  task_.y;
        // cc.log(resetY);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            // var x = event.getDeltaX() ; 
            // self_.opacity = 0;     //获取鼠标距离上一次事件移动的 X轴距离。
            var y = event.getDeltaY() ; 
            if(this.y < 230){
                this.y += y;
                task_.y += y;
            }else{
                // self_.runAction(cc.spawn(c
                //     c.fadeOut(0.3,0),
                //     cc.callFunc(function(){
                //         this.task.runAction(cc.moveBy(0.5,0,100))
                //         // this.node.opacity = 0;
                //     },this)
                // ));
                
                // self_.active = false;
            }      

        })

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            // var x = event.getDeltaX() ;      //获取鼠标距离上一次事件移动的 X轴距离。
            if(this.y > -50){
                // masklayer_.runAction(cc.fadeTo(0.1,0));
                self_.opacity = 0;
                self_.x = resetX;
                self_.y = resetY;
                task_.runAction(cc.moveTo(0.4,-11,-12));
                masklayer_.active = false;
                
            }else{

                self_.runAction(cc.spawn(
                    cc.moveTo(0.3,resetX,resetY),
                    cc.callFunc(function(){
                        task_.runAction(cc.moveTo(0.3,resetX_task,resetY_task));
                        // this.node.opacity = 0;
                    })
                ));
                // this.y = resetY;
            }
            // cc.log('888');
            // self_.active = false;
        })
    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

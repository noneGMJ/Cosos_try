cc.Class({
    extends: cc.Component,

    properties: {
        x_speed: 0,
        y_speed: 0,
        y_accelerate: 0,
        maxMoveUpSpeed: 500,
        moveDuration: 1,
        enterDistance: 340,
        y_top: 223,
        y_bottom: -320,
        isClicked: 0,
        seconds: 0,
        lifeNum: 1,
        isLived: 1,
        clickListener: null
    },

    // use this for initialization
    onLoad: function () {
        this.y_speed = 0;
        this.y_accelerate = 0;
        this.maxMoveUpSpeed=500;
        // this.player_enter=this.enter();
        this.node.runAction(this.enter());
        // cc.log("123123123");
        // cc.log(cc.view.getFrameSize.toString());
        this.setClickControl();
    },
    enter: function(){
        var into = cc.moveTo(this.moveDuration,cc.p(-this.enterDistance, this.y_bottom)).easing(cc.easeCubicActionIn());
        return into;
    },
    setClickControl: function () {
        var self=this;
        //在点击屏幕时，设置y方向的加速度
        this.clickListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            // swallowTouches: true,
            onTouchBegan:function(touch,event){
                if(self.isLived==1){
                    self.node.rotation = -30;
                    self.isClicked = 1;
                    self.y_accelerate = 10000;    
                    self.node.parent.getComponent("Game").playFlySound();
                    return true;

                }
                else{
                    self.node.rotation = 0;
                    self.isClicked = 0;
                    self.node.parent.getComponent("Game").stopPlayFlySound();
                    self.y_accelerate = -10000; 
                    this.node.runAction(cc.moveTo(1,this.ndoe.x,this.y_bottom));
                    return true;  
                }
            },
            onTouchMoved:function(touch,event)  
            {  
                self.y_accelerate = 10000;
            },
            onTouchEnded:function(touch,event){
                self.node.rotation = 0;
                self.isClicked = 0;
                self.node.parent.getComponent("Game").stopPlayFlySound();
                self.y_accelerate = -10000;
            },
        }, self.node);

    },

    update: function (dt) {
        this.seconds = (this.seconds + 1) % 60;
        // cc.log(this.y_accelerate);
        // cc.log(this.y_speed);
        this.y_speed +=  dt* this.y_accelerate;

        var temp= this.node.y + this.y_speed * dt;
        this.node.y =  temp >=this.y_top ? this.y_top : temp <=this.y_bottom ? this.y_bottom : temp;
        //人物到达顶部后不再旋转角度
        if(this.node.y == this.y_top){
            this.node.rotation = 0;
        }
        // cc.log("asdasdsadasdasdsa");

        //限制主角的速度不能超过最大值
        if ( Math.abs(this.y_speed) > this.maxMoveUpSpeed ) {
            this.y_speed = this.maxMoveUpSpeed * this.y_speed / Math.abs(this.y_speed);
        }
        if(this.isClicked == 1 && this.seconds % 5 == 0){
            this.node.parent.getComponent("Game").createBehindItem_1();
        }
        if(this.isLived == 0){
            cc.eventManager.removeListener(this.clickListener);
            this.node.rotation = 0;
            this.isClicked = 0;
            this.node.parent.getComponent("Game").stopPlayFlySound();
            this.y_accelerate = -10000; 
            this.node.runAction(cc.moveTo(5,this.ndoe.x,this.y_bottom));
            this.node.active = false;
        }
    },
   
});

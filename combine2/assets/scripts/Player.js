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
        //判断手指是否在屏幕上触摸
        isClicked: 0,
        seconds: 0,
        lifeNum: 1,
        isLived: 1,
        clickListener: null,
        //代表无敌(加速)状态
        isInvincible : false,
        tempflag:0,
        GameScript:
        {
            default: null,
            serializable: false
        },
        player: {
            default: null,
            type: cc.SpriteFrame
        },
        player_1:{
            default: "",
            url: cc.Texture2D
        },
        player_2:{
            default: "",
            url: cc.Texture2D
        },
        player_3:{
            default: "",
            url: cc.Texture2D
        },
        player_4:{
            default: "",
            url: cc.Texture2D
        }
    },

    // use this for initialization
    onLoad: function () {
        this.y_speed = 0;
        this.y_accelerate = 0;
        this.maxMoveUpSpeed=500;
        //初始化状态
        //得到生命值
        this.lifeNum = this.lifeNum + parseInt(sys.localStorage.getItem("heartNum"));
        this.GameScript.HeartLabel.string = this.lifeNum.toString();
        // //得到是否加速
        var  num = parseInt(sys.localStorage.getItem("accNum"));
        if( num > 0){
            this.isInvincible = true;
            sys.localStorage.setItem("accNum",num - 1);
        }
        //得到人物角色
        var tempNum = parseInt(sys.localStorage.getItem("peopleUseNum"));
        var judge;
        judge = tempNum == 1 ? this.player_1 : tempNum == 2 ? this.player_2 :
        tempNum == 3 ? this.player_3 : this.player_4;
        this.player.setTexture(judge);
        
        //执行初始化的进入动作
        this.node.runAction(this.enter());
        // cc.log("123123123");
        // cc.log(cc.view.getFrameSize.toString());
        //为人物绑定触摸事件
        this.setClickControl();
    },
    //人物进入场景中的动作
    enter: function(){
        var into = cc.moveTo(this.moveDuration,cc.p(-this.enterDistance, this.y_bottom)).easing(cc.easeCubicActionIn());
        return into;
    },
    //绑定触摸事件
    setClickControl: function () {
        //后续绑定事件会生成新的this，所以此处需要保存代表人物的this！
        var self=this;
        //在点击屏幕时，设置y方向的加速度
        this.clickListener = cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan:function(touch,event){
                //触摸时，人物向上移动
                if(self.isLived==1){
                    self.node.rotation = -30;
                    self.isClicked = 1;
                    self.y_accelerate = 10000;    
                    self.node.parent.getComponent("Game").playFlySound();
                    return true;

                }
                else{
                    //不触摸，向下移动
                    self.node.rotation = 0;
                    self.isClicked = 0;
                    self.node.parent.getComponent("Game").stopPlayFlySound();
                    self.y_accelerate = -10000; 
                    this.node.runAction(cc.moveTo(1,this.node.x,this.y_bottom));
                    return true;  
                }
            },
            //点击的手指在屏幕上移动时
            onTouchMoved:function(touch,event)  
            {  
                self.y_accelerate = 10000;
            },
            //点击结束，人物回落
            onTouchEnded:function(touch,event){
                self.node.rotation = 0;
                self.isClicked = 0;
                self.node.parent.getComponent("Game").stopPlayFlySound();
                self.y_accelerate = -10000;
            },
        }, self.node);

    },

    update: function (dt) {
        //记录秒数 每1/60秒更新一次
        this.seconds = (this.seconds + 1) % 60;
        // cc.log(this.y_accelerate);
        // cc.log(this.y_speed);
        this.y_speed +=  dt* this.y_accelerate;
        //设置人物的位置
        var temp= this.node.y + this.y_speed * dt;
        this.node.y =  temp >=this.y_top ? this.y_top : temp <=this.y_bottom ? this.y_bottom : temp;
        //人物到达顶部后不再旋转角度
        if(this.node.y == this.y_top){
            this.node.rotation = 0;
        }
        // cc.log("here");

        //限制主角的速度不能超过最大值
        if ( Math.abs(this.y_speed) > this.maxMoveUpSpeed ) {
            // this.y_speed = + / -  this.maxMoveUpSpeed
            this.y_speed = this.maxMoveUpSpeed * this.y_speed / Math.abs(this.y_speed);
        }
        if(this.isClicked == 1 && this.seconds % 5 == 0){
            //生成后面的星星
            this.node.parent.getComponent("Game").createBehindItem_1();
        }
        if(this.isLived == 0){
            //若人物死亡，则移除监听事件，使人物下落
            cc.eventManager.removeListener(this.clickListener);
            this.node.rotation = 0;
            this.isClicked = 0;
            this.node.parent.getComponent("Game").stopPlayFlySound();
            this.y_accelerate = -10000;
            // this.node.runAction(cc.moveTo(0.5,this.node.x,this.y_bottom));
            // this.node.active = false;
            if(this.tempflag == 0){  //---------new-----------//
                sys.localStorage.setItem("addscore",this.GameScript.score.toString());
                if(this.node.y == this.y_bottom){
                    this.tempflag = 1;    //每次开始游戏的时候透明度也需为0
                    cc.director.loadScene("EndScene");
                }
            }
        }

    },
   
});

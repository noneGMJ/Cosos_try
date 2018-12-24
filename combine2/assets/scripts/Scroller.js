cc.Class({
    extends: cc.Component,

    properties: {
        // 滚动的速度，单位px/s
        speed: -300,
        // x到达此位置后开始重头滚动
        resetX: -6550,
        xbegin: 6450,
        accelerate: 30,
        canScroll: true,
        maxSpeed: -1400,
        //冲刺距离
        runDistance : 500,
        GameScript:
        {
            default: null,
            serializable: false
        },
        hasDone : true
    },

    onLoad(){
        //设置画布可以滑动
        this.canScroll = true;
        this.accelerate = 20;
        this.maxSpeed = -1400;
    },
    
    update (dt) {
        if (!this.canScroll) {
            return;
        }
        if(this.GameScript.Player.getComponent("Player").isInvincible && this.GameScript.distance <= this.runDistance){
            this.speed = -2000;
        }
        else{
            if(this.hasDone){
                this.GameScript.Player.getComponent("Player").isInvincible = false;
                //初始化速度
                this.speed  = -300;
                this.hasDone = false;
            }
            this.speed -= dt * this.accelerate;
            if(Math.abs(this.speed) >=  Math.abs(this.maxSpeed)){
                this.speed = this.maxSpeed;
            }
        }
        this.node.x += this.speed * dt;
        //若人物存活，则进行距离增加
        if(this.GameScript.Player.getComponent("Player").isLived == 1){
            this.GameScript.distance += Math.ceil(Math.abs(this.speed) * dt / 500);
            var content = this.GameScript.distance.toString()+" m";
            this.GameScript.setDistaceLabel(content);
        }
        if (this.node.x <= this.resetX) {
            this.node.x =this.xbegin;
        }
    },
    //停止滑动
    stopScroll (){
        this.canScroll = false;
    },
    //重启滑动
    startScroll(){
        this.canScroll = true;
    }
});

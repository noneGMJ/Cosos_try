cc.Class({
    extends: cc.Component,

    properties: {
        // 滚动的速度，单位px/s
        speed: -250,
        // x到达此位置后开始重头滚动
        resetX: -6550,
        xbegin: 6450,
        accelerate: 0,
        canScroll: true
    },

    onLoad(){
        this.canScroll = true;
    },
    
    update (dt) {
        if (!this.canScroll) {
            return;
        }
        this.node.x += this.speed * dt;
        if (this.node.x <= this.resetX) {
            this.node.x =this.xbegin;
        }
    },

    stopScroll (){
        this.canScroll = false;
    },

    startScroll(){
        this.canScroll = true;
    }
});

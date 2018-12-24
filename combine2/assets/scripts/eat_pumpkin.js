cc.Class({
    extends: cc.Component,

    properties: {
        //设置获取南瓜的半径
        pickRadius: 75 ,
        //绑定游戏脚本文件
        GameScript:
        {
            default: null,
            serializable: false
        },
        //切割场景
        part: 0,
        // first: true
       
    },

    // use this for initialization
    onLoad: function () {
        
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var girl_node = this.GameScript.Player;
        //得到主人物与南瓜的世界坐标，利用世界坐标判断
        var girl_loc = girl_node.convertToWorldSpace(cc.v2(0,0));
        var pumpkin_loc = this.node.convertToWorldSpace(cc.v2(0,0));
        //防止在运行过程中的画面生成物体
        // if(this.first){
        //     var length = Math.abs(girl_node.x) + this.GameScript.node.width / 2;
        //     if(pumpkin_loc.x-girl_loc.x < length){
        //         this.GameScript.onEat_pumpkinKilled(this.node,this.part);
        //         cc.log("failed        in              create");
        //     }
        //     this.first=false;
        // }
        // else{
            // cc.log("successful        in              create");
            //若吃到了南瓜，则进行声音的播放、分数的累加以及南瓜的删除
            if(this.onPicked(girl_loc,pumpkin_loc)==1){
                this.GameScript.playPickedPumpkinSound();
                this.GameScript.gainScore();
                this.GameScript.onEat_pumpkinKilled(this.node,this.part);
            }
            else{
                //南瓜走出了画布，清除南瓜
                if((girl_loc.x-pumpkin_loc.x) > (this.GameScript.node.width/2 - Math.abs(girl_node.x))){
                    // cc.log("delete pumpkin");
                    this.GameScript.onEat_pumpkinKilled(this.node,this.part);
                }
            }        
        // }
     },
     //判断南瓜是否可以被收集
     onPicked: function (position_1,position_2) {
        var dist = cc.pDistance(position_1, position_2);
        if(dist <= this.pickRadius && (this.GameScript.Player.getComponent("Player").isLived == 1)){
            return 1;
        } 
        return 0;
    },
    
});

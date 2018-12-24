cc.Class({
    extends: cc.Component,

    properties: {
        //设置获取心的半径
        pickRadius: 75 ,
        //绑定游戏脚本文件
        GameScript:
        {
            default: null,
            serializable: false
        },
        //切割场景
        part: 0,
    },

    // use this for initialization
    onLoad: function () {

    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var girl_node = this.GameScript.Player;
        //得到主人物与心的的世界坐标，利用世界坐标判断
        var girl_loc = girl_node.convertToWorldSpace(cc.v2(0,0));
        var heart_loc = this.node.convertToWorldSpace(cc.v2(0,0));
        if(this.onPicked(girl_loc,heart_loc)==1){
            //播放吃到心的音乐
            this.GameScript.playPickedPumpkinSound();
            //生命值数量 +1
            this.GameScript.Player.getComponent("Player").lifeNum += 1;
            this.GameScript.updateHeart();
            this.GameScript.onHeartKilled(this.node,this.part);
        }
        else{
            //南瓜走出了画布，清除南瓜
            if((girl_loc.x-heart_loc.x) > (this.GameScript.node.width/2 - Math.abs(girl_node.x))){
                // cc.log("delete pumpkin");
                this.GameScript.onHeartKilled(this.node,this.part);
            }
        }    
     },
     //判断心是否可以被收集
     onPicked: function (position_1,position_2) {
        var dist = cc.pDistance(position_1, position_2);
        if(dist <= this.pickRadius && (this.GameScript.Player.getComponent("Player").isLived == 1)){
            return 1;
        } 
        return 0;
    },
});

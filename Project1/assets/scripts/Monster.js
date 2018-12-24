cc.Class({
    extends: cc.Component,

    properties: {
        pickRadius: 75 ,
        
        GameScript:
        {
            default: null,
            serializable: false
        },
        part: 0,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var girl_node = this.GameScript.Player;
        var girl_loc = girl_node.convertToWorldSpace(cc.v2(0,0));
        var monster_loc = this.node.convertToWorldSpace(cc.v2(0,0));
        //主角碰触到怪物，则结束游戏
        if(this.onPicked(girl_loc,monster_loc)==1){
            if(girl_node.getComponent("Player").lifeNum == 1){
                this.GameScript.Player.getComponent("Player").isLived = 0;
                this.GameScript.playPickedMonsterSound();
                this.GameScript.gameOver();
                this.GameScript.onMonsterKilled(this.node,this.part);
            }
            //生命数量减少1
            else{
                ;
            }
        }
        else{
            //怪物走出了画布，也清除
            if((girl_loc.x-monster_loc.x) > (this.GameScript.node.width/2 - Math.abs(girl_node.x))){
                this.GameScript.onMonsterKilled(this.node,this.part);
            }
        }
        // cc.log("2222222222");
     },
     onPicked: function (position_1,position_2) {
        var dist = cc.pDistance(position_1, position_2);
        if(dist <= this.pickRadius && (this.GameScript.Player.getComponent("Player").isLived >= 1)){
            return 1;
        } 
        return 0;
    },
});

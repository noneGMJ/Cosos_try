cc.Class({
    extends: cc.Component,

    properties: {
        //怪物的拾取半径
        pickRadius: 75 ,
        
        GameScript:
        {
            default: null,
            serializable: false
        },
        part: 0,
        rotate : 0,
        y_speed: 50,
        y_top: 223,
        y_bottom: -320,
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var girl_node = this.GameScript.Player;
        var girl_loc = girl_node.convertToWorldSpace(cc.v2(0,0));
        var monster_loc = this.node.convertToWorldSpace(cc.v2(0,0));
        this.rotate = (this.rotate + dt * 60) % 360;
        this.node.rotation = this.rotate;
        var temp= this.node.y + this.y_speed * dt;
        this.node.y =  temp >=this.y_top ? this.y_top : temp <=this.y_bottom ? this.y_bottom : temp;
        if(this.node.y ==this.y_top || this.node.y ==this.y_bottom){
            this.y_speed = -this.y_speed;
        }
        //主角碰触到怪物，则判断生命值，生命值等于1，结束游戏；否则减少1
        if(this.onPicked(girl_loc,monster_loc)==1){
            this.GameScript.playPickedMonsterSound();
            this.GameScript.onMonsterKilled(this.node,this.part);
            if(girl_node.getComponent("Player").lifeNum == 1){
                this.GameScript.Player.getComponent("Player").lifeNum = 0;
                this.GameScript.Player.getComponent("Player").isLived = 0;
                sys.localStorage.setItem("heartNum","0");   
                this.GameScript.gameOver();
            }
            //生命数量减少1
            else{
                this.GameScript.Player.getComponent("Player").lifeNum -= 1;
                sys.localStorage.setItem("heartNum",this.GameScript.Player.getComponent("Player").lifeNum.toString());
            }
            this.GameScript.updateHeart();
        }
        else{
            //怪物走出了画布，也清除
            if((girl_loc.x-monster_loc.x) > (this.GameScript.node.width/2 - Math.abs(girl_node.x))){
                this.GameScript.onMonsterKilled(this.node,this.part);
            }
        }
        // cc.log("2222222222");
     },
    //判断怪物是否可以被收集
     onPicked: function (position_1,position_2) {
        var dist = cc.pDistance(position_1, position_2);
        if(dist <= this.pickRadius && (this.GameScript.Player.getComponent("Player").isLived == 1) &&  (!this.GameScript.Player.getComponent("Player").isInvincible)){
            return 1;
        } 
        return 0;
    },
});

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
        // first: true
       
    },

    // use this for initialization
    onLoad: function () {
        
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var girl_node = this.GameScript.Player;
        var girl_loc = girl_node.convertToWorldSpace(cc.v2(0,0));
        var pumpkin_loc = this.node.convertToWorldSpace(cc.v2(0,0));
        //防止在运行过程中的画面生成物体，此处有一些问题
        // if(this.first){
        // var length = Math.abs(girl_node.x) + this.GameScript.node.width / 2;
        //     if(pumpkin_loc.x-girl_loc.x < length){
        //         this.GameScript.onEat_pumpkinKilled(this.node,this.part);
        //         cc.log("failed        in              createeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        //     }
        //     this.first=false;
        // }
        // else{
        // cc.log("successful        in              createeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        if(this.onPicked(girl_loc,pumpkin_loc)==1){
            this.GameScript.playPickedPumpkinSound();
            this.GameScript.gainScore();
            this.GameScript.onEat_pumpkinKilled(this.node,this.part);
        }
        else{
            //南瓜走出了画布，也清除
            if((girl_loc.x-pumpkin_loc.x) > (this.GameScript.node.width/2 - Math.abs(girl_node.x))){
                // cc.log("delete iiiiiiiiiiiiiiiiiiiiiiiiiooooooooooooooooooooooo");
                this.GameScript.onEat_pumpkinKilled(this.node,this.part);
            }
        }        
        // }
     },
     onPicked: function (position_1,position_2) {
        var dist = cc.pDistance(position_1, position_2);
        if(dist <= this.pickRadius && (this.GameScript.Player.getComponent("Player").isLived == 1)){
            return 1;
        } 
        return 0;
    },
    
});

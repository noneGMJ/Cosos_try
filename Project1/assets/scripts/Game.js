cc.Class({
    extends: cc.Component,

    properties: {

        eat_pumpkinPrefab: cc.Prefab,
        eat_pumpkinNum : 50,
        eat_pumpkinAppearRate: 0.5,
        monsterPrefeb: cc.Prefab,
        monsterNum : 10,
        monsterAppearRate: 0.98,
        behindItemPrefeb: cc.Prefab,
        behindItemNum: 40,
        //当前分区是否生成了物体标记数组
        flag_array:[cc.Integer],
        //每个分区的边界记录数组       
        border_array:[cc.Integer],

        Player: {
            default: null,
            type: cc.Node
        },
        Background:{
            default: null,
            type: cc.Node
        },
        split_regionNum: 7,
        interval: 0,
        score:0,
        //跌落时间
        fallDuration: 2,
        // 得分音效资源
        PickedPumpkinAudio: {
            default: null,
            url: cc.AudioClip
        },
        FlyAudio: {
            default: null,
            url: cc.AudioClip
        },
        PickedMonsterAudio: {
            default: null,
            url: cc.AudioClip
        },
        // score label 的引用
        ScoresLabel: {
            default: null,
            type: cc.Label
        },
        
    },

    // use this for initialization
    onLoad: function () {
        this.Player.getComponent("Player").GameScript=this;
        //要被收集的南瓜的对象池
        this.eat_pumpkinPool = new cc.NodePool();
        for (var i = 0; i < this.eat_pumpkinNum; ++i) {
            var pumpkin = cc.instantiate(this.eat_pumpkinPrefab); // 创建节点
            this.eat_pumpkinPool.put(pumpkin); // 通过 putInPool 接口放入对象池
        }
        //生成怪物的对象池
        this.monsterPool = new cc.NodePool();
        for (var i = 0; i < this.monsterNum; ++i) {
            var monster = cc.instantiate(this.monsterPrefeb); // 创建节点
            this.monsterPool.put(monster); // 通过 putInPool 接口放入对象池
        }
        //生成喷射物的对象池
        this.behindItemPool = new cc.NodePool();
        for (var i = 0; i < this.behindItemNum; ++i) {
            var behindItem = cc.instantiate(this.behindItemPrefeb); // 创建节点
            this.behindItemPool.put(behindItem); // 通过 putInPool 接口放入对象池
        }
        var background_length=this.Background.width;
        this.interval=Math.floor(background_length/this.split_regionNum);
        for(var i = 0;i < this.split_regionNum; i++){
            this.border_array[i] = -0.5 * background_length + this.interval * (i+1);
        }
        for(var i = 0;i < this.split_regionNum; i++){
            this.flag_array[i] = 0;
        }
    },
    update(dt){
        var rate=Math.random();
        //每个分割区有1%的概率生成金币
        if(rate<=this.eat_pumpkinAppearRate){
            //生成要被收集的南瓜
            this.createPumpkin_1();
        }
        else if(rate>this.monsterAppearRate){
            //生成怪物
            this.createMonster_1();
        }

    },
    createPumpkin_1: function(){
        //一种生成南瓜的模式
        var num= Math.floor(Math.random() * (this.eat_pumpkinNum / 4)+1);
        //最多 5 行
        var row = Math.floor(Math.random() * 3+1); 
        var column = Math.floor(num/row);
        var half_width = this.Background.width / 2;
        var half_height = this.Background.height / 2;
        var x = Math.floor(cc.randomMinus1To1() * half_width);
        var y = Math.floor(cc.randomMinus1To1() * half_height)-100;
        //不要在最后的分界处生成南瓜，因为会因为轮换场景而清除
        var part = (Math.floor((x + half_width)/ this.interval) >= this.split_regionNum-1) ? this.split_regionNum-2 : Math.floor((x + half_width)/ this.interval);
        //若该部分没有生成过南瓜，则进行生成
        var flag=0;
        if(this.flag_array[part]==0){
            for(var i = 0; i < row; i++){
                for(var j = 0; j < column; j++){
                    if(x+j*60 > this.border_array[part] || y-i*100 <= -half_height){
                        flag=1;
                        break;
                    }
                    else{
                        this.createEat_pumpkin(x+j*60,y-i*60,part);
                    }
                }
                if(flag==1){
                    break;
                }
            }
        }
    },
    createPumpkin_2: function(){
        ;
    },
    createPumpkin_3: function(){
        ;   
    },
    createMonster_1: function(){
        //一种生成怪物的模式
        var num= Math.floor(Math.random() * (this.monsterNum / 4)+1);
        //最多 5 行
        var row = Math.floor(Math.random() * 3+1); 
        var column = Math.floor(num/row);
        var half_width = this.Background.width / 2;
        var half_height = this.Background.height / 2;
        var x = Math.floor(cc.randomMinus1To1() * half_width);
        var y = Math.floor(cc.randomMinus1To1() * half_height)-50;
        //不要在最后的分界处生成，因为会因为轮换场景而清除
        var part = (Math.floor((x + half_width)/ this.interval) >= this.split_regionNum-1) ? this.split_regionNum-2 : Math.floor((x + half_width)/ this.interval);
        //若该部分没有生成过南瓜，则进行生成
        var flag=0;
        var length = Math.abs(this.Player.x)+this.node.width/2;
        if(this.flag_array[part]==0){
            for(var i = 0; i < row; i++){
                for(var j = 0; j < column; j++){
                    if(x+j*60 > this.border_array[part] || y-i*100 <= -half_height){
                        flag=1;
                        break;
                    }
                    else{
                        this.createMonster(x+j*60,y-i*60,part);
                    }
                }
                if(flag==1){
                    break;
                }
            }
        } 
    },
    createMonster_2: function(){
        ;   
    },
    createMonster_3: function(){
        ;   
    },
    createBehindItem_1: function(){
        var girl_node = this.Player;
        var girl_loc = girl_node.convertToWorldSpaceAR(cc.v2(0,0));
        var girl_height = girl_node.height;        
        // var background_loc = this.node.getChildByName("background").convertToWorldSpace(cc.v2(0,0));
        // var det_x = background_loc.x - girl_loc.x;
        // var det_y = background_loc.y - girl_loc.y;
        var x = girl_loc.x ;
        var y = girl_loc.y + girl_height / 3;
        var pos = this.Background.convertToNodeSpaceAR(cc.v2(x,y));
        for(var i = 0; i < 2; i++){
            this.createFlyBehindItem(cc.v2(pos.x,pos.y-i*10));
        }
    },
    // judgeCanCreate: function(PlayerNode,ItemNode,length){
    //     var girl_loc = PlayerNode.convertToWorldSpace(cc.v2(0,0));
    //     var item_loc = ItemNode.convertToWorldSpace(cc.v2(0,0));
    //     if(item_loc.x-girl_loc.x>length){
    //         return true;
    //     }
    //     return false;
    // },
    createEat_pumpkin: function (x,y,part) {
        var eat_pumpkin = null;
        if (this.eat_pumpkinPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            eat_pumpkin = this.eat_pumpkinPool.get();
            this.Background.addChild(eat_pumpkin);
            eat_pumpkin.setPosition(cc.p(x,y));
            this.flag_array[part] += 1;
            eat_pumpkin.getComponent('eat_pumpkin').part=part;
            eat_pumpkin.getComponent('eat_pumpkin').GameScript=this;
        } else {
            ;
        }
        
    },
    createMonster: function (x,y,part) {
        var monster = null;
        if (this.monsterPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            monster = this.monsterPool.get();
            this.Background.addChild(monster);
            monster.setPosition(cc.p(x,y));
            this.flag_array[part] += 1;
            monster.getComponent('Monster').part=part;
            monster.getComponent('Monster').GameScript=this;
        } else {
            ;
        }
        
    },
    createFlyBehindItem: function (pos) {
        var behindItem = null;
        if (this.behindItemPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            behindItem = this.behindItemPool.get();
            this.Background.addChild(behindItem);
            behindItem.setPosition(pos);
            behindItem.getComponent('BehindItem').GameScript=this;
            // behindItem.getComponent('eat_pumpkin').GameScript=this;
        } else {
            ;
        }
    },
    onEat_pumpkinKilled: function (eat_pumpkin,part) {
        // eat_pumpkin 应该是一个 cc.Node
        this.eat_pumpkinPool.put(eat_pumpkin); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        this.flag_array[part] -= 1;        
    },
    onMonsterKilled: function (monsterItem,part) {
        // eat_pumpkin 应该是一个 cc.Node
        this.monsterPool.put(monsterItem); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        this.flag_array[part] -= 1;    
    },
    onFlyBehindItemKilled: function (behindItem) {
        // eat_pumpkin 应该是一个 cc.Node
        this.behindItemPool.put(behindItem); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },
    
    //得分数据更新
    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.ScoresLabel.string = this.score.toString();
    },
    // fallDown: function(){
    //     var playerScripts = this.Player.getComponent("Player");
    //     // cc.log("falllllllllllllllllllllllllll");
    //     // cc.eventManager.removeListener(this.Player.getComponent("Player").clickListener);
    //     // cc.log("===============",this.Player.x,playerScripts.y_bottom);
    //     // cc.log(this.Player.x, playerScrsipts.y_bottom);
    //     this.Player.runAction(cc.moveTo(this.fallDuration,cc.p(this.Player.x, playerScripts.y_bottom)));
        
    //     // this.Background.getComponent("Scroller").stopScroll();
        
    // },
    gameOver: function () {
        // this.fallDown();
        // this.Player.stopAllActions(); //停止 player 节点的动作
        // cc.director.loadScene('MainScene');
    },
    //播放得分音效
    playPickedPumpkinSound: function(){
        cc.audioEngine.playEffect(this.PickedPumpkinAudio, false);
    },
    playFlySound: function(){
        cc.audioEngine.playEffect(this.FlyAudio, true);
    },
    stopPlayFlySound: function(){
        cc.audioEngine.uncache(this.FlyAudio);
    },
    playPickedMonsterSound: function(){
        cc.audioEngine.playEffect(this.PickedMonsterAudio, false);
    },
});

cc.Class({
    extends: cc.Component,

    properties: {
        //南瓜节点
        eat_pumpkinPrefab: cc.Prefab,
        //南瓜对象池的包含数量
        eat_pumpkinNum : 50,
        //南瓜出现的概率 0.4
        eat_pumpkinAppearRate: 0.4,
        //怪物对象池包含数量
        monsterPrefeb: cc.Prefab,
        monsterNum : 30,
        //怪物出现的概率
        monsterAppearRate: 0.4,
        behindItemPrefeb: cc.Prefab,
        //后续物体的对象池包含数量
        behindItemNum: 40,
        //心出现的概率 1 - 0.999 = 0.001
        // 心的对象池包含数量
        heartAppearRate: 0.999,
        heartPrefeb: cc.Prefab,
        heartNum : 1,
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
        //划分的区域的总数
        split_regionNum: 7,
        interval: 0,
        //得分
        score:0,
        //跌落时间
        fallDuration: 2,
        //人物行进距离
        distance : 0,
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
        // heart label 的引用
        HeartLabel: {
            default: null,
            type: cc.Label
        },
        DistaceLabel: {
            default: null,
            type: cc.Label
        },
    },

    // use this for initialization
    onLoad: function () {
        this.eat_pumpkinAppearRate= 0.4;
        this.monsterNum = 30;
        //怪物出现的概率
        this.monsterAppearRate = 0.65;
        this.heartAppearRate = 0.999;
        this.heartNum = 1;
        this.Player.getComponent("Player").GameScript=this;
        this.Background.getComponent("Scroller").GameScript = this;
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
        //生成心的对象池
        this.heartItemPool = new cc.NodePool();
        for (var i = 0; i < this.heartNum; ++i) {
            var heartItem = cc.instantiate(this.heartPrefeb); // 创建节点
            this.heartItemPool.put(heartItem); // 通过 putInPool 接口放入对象池
        }
        // 背景的长度
        var background_length=this.Background.width;
        // 每个区域的间隔距离
        this.interval=Math.floor(background_length/this.split_regionNum);
        //设置每个区域的分割数值
        for(var i = 0;i < this.split_regionNum; i++){
            this.border_array[i] = -0.5 * background_length + this.interval * (i+1);
        }
        //每个区域的标志位设置
        for(var i = 0;i < this.split_regionNum; i++){
            this.flag_array[i] = 0;
        }
    },
    update(dt){
        var rate=Math.random();
        // 每个分割区有一定的概率生成
        if(rate<=this.eat_pumpkinAppearRate){
            //生成要被收集的南瓜
            this.createPumpkin_1();
        }
        else if(rate>this.monsterAppearRate && rate <= this.heartAppearRate){
            //生成怪物
            this.createMonster_1();
        }
        else if(rate>this.heartAppearRate){
            //生成心
            this.createHeart_1();
        }
    },
    //生成南瓜的模式
    createPumpkin_1: function(){
        //一种生成南瓜的模式
        var num= Math.floor(Math.random() * (this.eat_pumpkinNum / 4)+1);
        //最多 4 行
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
    //生成怪物的模式    
    createMonster_1: function(){
        //一种生成怪物的模式
        //生成的怪物数量
        var num= Math.floor(Math.random() * (this.monsterNum / 4)+1);
        //最多 4 行
        var row = Math.floor(Math.random() * 3+1); 
        var column = Math.floor(num/row);
        var half_width = this.Background.width / 2;
        var half_height = this.Background.height / 2;
        var x = Math.floor(cc.randomMinus1To1() * half_width);
        var y = Math.floor(cc.randomMinus1To1() * half_height)-50;
        //不要在最后的分界处生成，因为会因为轮换场景而清除
        var part = (Math.floor((x + half_width)/ this.interval) >= this.split_regionNum-1) ? this.split_regionNum-2 : Math.floor((x + half_width)/ this.interval);
        var flag=0;
        // var length = Math.abs(this.Player.x)+this.node.width/2;
        //若该区域没有生成怪物，则生成
        if(this.flag_array[part]==0){
            for(var i = 0; i < row; i++){
                for(var j = 0; j < column; j++){
                    // 若超过了界限或者超出了上下部分，则停止生成
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
    //生成心的模式
    createHeart_1: function(){
        var half_width = this.Background.width / 2;
        var half_height = this.Background.height / 2;
        var x = Math.floor(cc.randomMinus1To1() * half_width);
        var y = Math.floor(cc.randomMinus1To1() * half_height)-50;
        //不要在最后的分界处生成，因为会因为轮换场景而清除
        var part = (Math.floor((x + half_width)/ this.interval) >= this.split_regionNum-1) ? this.split_regionNum-2 : Math.floor((x + half_width)/ this.interval);
        //若该区域没有生成心，则生成
        if(this.flag_array[part]==0){
            //超过边界，不生成
            if(x > this.border_array[part] || y<= -half_height){
                ;
            }
            else{
                this.createHeart(x, y, part);
            }
        }
    },
    // 生成后继的喷射物的模式
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
        // 每次生成两个
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
    // 生成南瓜，每次从对象池中取出一个（若没有，则不生成）
    createEat_pumpkin: function (x,y,part) {
        var eat_pumpkin = null;
        if (this.eat_pumpkinPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            eat_pumpkin = this.eat_pumpkinPool.get();
            this.Background.addChild(eat_pumpkin);
            eat_pumpkin.setPosition(cc.p(x,y));
            //对应的南瓜是否在该区域的标记+1
            this.flag_array[part] += 1;
            // 设置南瓜的属性
            eat_pumpkin.getComponent('eat_pumpkin').part=part;
            eat_pumpkin.getComponent('eat_pumpkin').GameScript=this;
        } else {
            ;
        }
        
    },
    // 生成怪物，每次从对象池中取出一个（若没有，则不生成）
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
    //生成心
    createHeart:function (x,y,part){
        var heartItem = null;
        if (this.heartItemPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            heartItem = this.heartItemPool.get();
            this.Background.addChild(heartItem);
            heartItem.setPosition(cc.p(x,y));
            this.flag_array[part] += 1;
            heartItem.getComponent('Heart').part=part;
            heartItem.getComponent('Heart').GameScript=this;
        }
        else{
            ;
        }
    },
    // 生成后继的喷射物
    createFlyBehindItem: function (pos) {
        var behindItem = null;
        if (this.behindItemPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            behindItem = this.behindItemPool.get();
            this.Background.addChild(behindItem);
            behindItem.setPosition(pos);
            behindItem.getComponent('BehindItem').GameScript=this;
        } else {
            ;
        }
    },
   
    // 删除生成的南瓜，对象池回收
    onEat_pumpkinKilled: function (eat_pumpkin,part) {
        this.eat_pumpkinPool.put(eat_pumpkin); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        this.flag_array[part] -= 1;        
    },
    // 删除生成的怪物，对象池回收
    onMonsterKilled: function (monsterItem,part) {
        this.monsterPool.put(monsterItem); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        this.flag_array[part] -= 1;    
    },
     // 删除生成的心，对象池回收
     onHeartKilled: function (heartItem,part) {
        this.heartItemPool.put(heartItem); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
        this.flag_array[part] -= 1;    
    },
    // 删除生成的喷射物，对象池回收
    onFlyBehindItemKilled: function (behindItem) {
        this.behindItemPool.put(behindItem); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },
    //得分数据更新
    gainScore: function () {
        this.score += 1;
        // 更新 scoreDisplay Label 的文字
        this.ScoresLabel.string = this.score.toString();
    },
    //心的数据更新
    updateHeart: function () {
        // 更新 label 的文字
        this.HeartLabel.string = this.Player.getComponent("Player").lifeNum.toString();
    },
    // fallDown: function(){
    //     var playerScripts = this.Player.getComponent("Player");
    //     // cc.log("fal");
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
        //将南瓜数量数据保存到本地数据中
        // sys.localStorage.setItem("ScoreNum" ,this.score);
    },
    //播放得分音效
    playPickedPumpkinSound: function(){
        cc.audioEngine.playEffect(this.PickedPumpkinAudio, false);
    },
    //播放上升音效
    playFlySound: function(){
        cc.audioEngine.playEffect(this.FlyAudio, true);
    },
    //停止播放上升音效
    stopPlayFlySound: function(){
        cc.audioEngine.uncache(this.FlyAudio);
    },
    //播放触碰怪物音效
    playPickedMonsterSound: function(){
        cc.audioEngine.playEffect(this.PickedMonsterAudio, false);
    },
    setDistaceLabel: function(content){
        this.DistaceLabel.string = content;
    },
});
    

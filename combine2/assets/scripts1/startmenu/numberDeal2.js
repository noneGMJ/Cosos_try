cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        moneyNum :{
            default : null,
            type : cc.Label
        },
        moneyShow : {
            default : null,
            type : cc.Node
        },
        moneySucc : {
            default : null,
            type : cc.Node
        },
        accNum :{
            default : null,
            type : cc.Label
        },

    },

    // use this for initialization
    onLoad: function () {
        this.accNum.string = sys.localStorage.getItem("accNum");
        this.moneyShow.opacity = 0;
        this.moneyShow.runAction(cc.fadeTo(0.1,0));
        this.moneySucc.opacity = 0;
        this.moneySucc.runAction(cc.fadeTo(0.1,0));
    },


    sellbackMoney : function(){
        var acc = this.accNum.string;
        if(acc.valueOf() > 0){
            this.accNum.string = (acc - 1).toString();
            sys.localStorage.setItem("accNum",this.accNum.string);


            var money = this.moneyNum.string;
            this.moneyNum.string = (parseInt(money)+100).toString();

        }else{
            //库存不足
        }

    },

    callbackMoney : function(){
        var money = this.moneyNum.string;
        if(money.valueOf() >= 500){
            this.moneyNum.string = (money - 500).toString();
            this.moneySucc.runAction(
                cc.sequence(
                    cc.fadeTo(0.1,255),
                    cc.fadeTo(0.1,0)
                )
            )
            var acc = this.accNum.string;
            this.accNum.string = (parseInt(acc)+1).toString(); 
            sys.localStorage.setItem("accNum",this.accNum.string);
        }else{
            this.moneyShow.runAction(
                cc.sequence(
                    cc.fadeTo(0.1,255),
                    cc.fadeTo(0.1,0)
                )
            )
        }

    },

 

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

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
        alreadlybuy : {
            default : null,
            type : cc.Node
        },
        moneySucc : {
            default : null,
            type : cc.Node
        },
        lock:{
            default : null,
            type : cc.Node
        },
        peopleSucc : {
            default : null,
            type : cc.Node
        },
        peoplefail : {
            default : null,
            type : cc.Node
        },
    },

    // use this for initialization
    onLoad: function () {
        this.moneyShow.opacity = 0;
        this.moneyShow.runAction(cc.fadeTo(0.5,0));
        this.moneySucc.opacity = 0;
        this.moneySucc.runAction(cc.fadeTo(0.5,0));
        this.alreadlybuy.opacity = 0;
        this.alreadlybuy.runAction(cc.fadeTo(0.5,0));
        this.peopleSucc.opacity = 0;
        this.peopleSucc.runAction(cc.fadeTo(0.5,0));
        this.peoplefail.opacity = 0;
        this.peoplefail.runAction(cc.fadeTo(0.5,0));
        var people1 =  sys.localStorage.getItem("people4");
        if(parseInt(people1) == 1){
            this.lock.active = false;
        }
    },

    callbackMoney : function(){
        var people1 =  sys.localStorage.getItem("people4");
        if(parseInt(people1) == 1){
            this.alreadlybuy.runAction(
                cc.sequence(
                    cc.fadeTo(0.5,255),
                    cc.fadeTo(0.5,0)
                )
            )
        }else{
            var money = this.moneyNum.string;
            if(money.valueOf() >= 5000){
                this.moneyNum.string = (money - 5000).toString();
                this.moneySucc.runAction(
                    cc.sequence(
                        cc.fadeTo(0.5,255),
                        cc.fadeTo(0.5,0)
                    )
                );
                this.lock.runAction(cc.fadeTo(4,0));
                this.lock.active =false;  
                sys.localStorage.setItem("people4","1");
            }else{
                this.moneyShow.runAction(
                    cc.sequence(
                        cc.fadeTo(0.5,255),
                        cc.fadeTo(0.5,0)
                    )
                )
            }
        }


    },

    callbackPeople : function(){
        var people1 =  sys.localStorage.getItem("people4");
        if(parseInt(people1) == 1){
            sys.localStorage.setItem("peopleUseNum","4");
            this.peopleSucc.runAction(
                cc.sequence(
                    cc.fadeTo(0.5,255),
                    cc.fadeTo(0.5,0)
                )
            )
        }else{
            this.peoplefail.runAction(
                cc.sequence(
                    cc.fadeTo(0.5,255),
                    cc.fadeTo(0.5,0)
                )
            )
        }


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});

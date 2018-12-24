require = function e(t, c, o) {
function n(a, s) {
if (!c[a]) {
if (!t[a]) {
var r = "function" == typeof require && require;
if (!s && r) return r(a, !0);
if (i) return i(a, !0);
var l = new Error("Cannot find module '" + a + "'");
throw l.code = "MODULE_NOT_FOUND", l;
}
var u = c[a] = {
exports: {}
};
t[a][0].call(u.exports, function(e) {
var c = t[a][1][e];
return n(c || e);
}, u, u.exports, e, t, c, o);
}
return c[a].exports;
}
for (var i = "function" == typeof require && require, a = 0; a < o.length; a++) n(o[a]);
return n;
}({
Again: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "64d1etG7dlEFI4O87FFyi7l", "Again");
cc.Class({
extends: cc.Component,
properties: {
yes: {
default: null,
type: cc.Node
},
no: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.yes.active = !1;
this.no.active = !1;
var e = cc.scaleTo(1, .9), t = cc.scaleTo(1, 1.1), c = cc.fadeTo(1, 100), o = cc.fadeTo(1, 30);
this.node.runAction(cc.sequence(cc.spawn(e, o), cc.spawn(t, c)).repeatForever());
},
callback: function(e, t) {
this.yes.active = !0;
this.no.active = !0;
this.node.active = !1;
},
callback1: function(e, t) {
cc.director.loadScene("MainScene");
},
callback2: function(e, t) {
cc.director.loadScene("Startmenu");
}
});
cc._RF.pop();
}, {} ],
BehindItem: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "86a27iqWUBDJLZ8fg+WEWO/", "BehindItem");
cc.Class({
extends: cc.Component,
properties: {
x_speed: 0,
y_speed: 0,
y_accel: -50,
rotate: 0,
GameScript: {
default: null,
serializable: !1
}
},
onLoad: function() {},
update: function(e) {
var t = this.GameScript.node.getChildByName("girl"), c = t.convertToWorldSpace(cc.v2(0, 0)), o = this.node.convertToWorldSpace(cc.v2(0, 0));
this.rotate = (this.rotate + 240 * e) % 360;
this.y_speed += e * this.y_accel;
this.node.y += this.y_speed * e;
this.node.rotation = this.rotate;
c.x - o.x > this.GameScript.node.width / 2 - Math.abs(t.x) && this.GameScript.onFlyBehindItemKilled(this.node);
}
});
cc._RF.pop();
}, {} ],
Game: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "9a475n5PYxLKbWWdqQ14Cyw", "Game");
cc.Class({
extends: cc.Component,
properties: {
eat_pumpkinPrefab: cc.Prefab,
eat_pumpkinNum: 50,
eat_pumpkinAppearRate: .4,
monsterPrefeb: cc.Prefab,
monsterNum: 30,
monsterAppearRate: .4,
behindItemPrefeb: cc.Prefab,
behindItemNum: 40,
heartAppearRate: .999,
heartPrefeb: cc.Prefab,
heartNum: 1,
flag_array: [ cc.Integer ],
border_array: [ cc.Integer ],
Player: {
default: null,
type: cc.Node
},
Background: {
default: null,
type: cc.Node
},
split_regionNum: 7,
interval: 0,
score: 0,
fallDuration: 2,
distance: 0,
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
ScoresLabel: {
default: null,
type: cc.Label
},
HeartLabel: {
default: null,
type: cc.Label
},
DistaceLabel: {
default: null,
type: cc.Label
}
},
onLoad: function() {
this.eat_pumpkinAppearRate = .4;
this.monsterNum = 30;
this.monsterAppearRate = .65;
this.heartAppearRate = .999;
this.heartNum = 1;
this.Player.getComponent("Player").GameScript = this;
this.Background.getComponent("Scroller").GameScript = this;
this.eat_pumpkinPool = new cc.NodePool();
for (i = 0; i < this.eat_pumpkinNum; ++i) {
var e = cc.instantiate(this.eat_pumpkinPrefab);
this.eat_pumpkinPool.put(e);
}
this.monsterPool = new cc.NodePool();
for (i = 0; i < this.monsterNum; ++i) {
var t = cc.instantiate(this.monsterPrefeb);
this.monsterPool.put(t);
}
this.behindItemPool = new cc.NodePool();
for (i = 0; i < this.behindItemNum; ++i) {
var c = cc.instantiate(this.behindItemPrefeb);
this.behindItemPool.put(c);
}
this.heartItemPool = new cc.NodePool();
for (i = 0; i < this.heartNum; ++i) {
var o = cc.instantiate(this.heartPrefeb);
this.heartItemPool.put(o);
}
var n = this.Background.width;
this.interval = Math.floor(n / this.split_regionNum);
for (i = 0; i < this.split_regionNum; i++) this.border_array[i] = -.5 * n + this.interval * (i + 1);
for (var i = 0; i < this.split_regionNum; i++) this.flag_array[i] = 0;
},
update: function(e) {
var t = Math.random();
t <= this.eat_pumpkinAppearRate ? this.createPumpkin_1() : t > this.monsterAppearRate && t <= this.heartAppearRate ? this.createMonster_1() : t > this.heartAppearRate && this.createHeart_1();
},
createPumpkin_1: function() {
var e = Math.floor(Math.random() * (this.eat_pumpkinNum / 4) + 1), t = Math.floor(3 * Math.random() + 1), c = Math.floor(e / t), o = this.Background.width / 2, n = this.Background.height / 2, i = Math.floor(cc.randomMinus1To1() * o), a = Math.floor(cc.randomMinus1To1() * n) - 100, s = Math.floor((i + o) / this.interval) >= this.split_regionNum - 1 ? this.split_regionNum - 2 : Math.floor((i + o) / this.interval), r = 0;
if (0 == this.flag_array[s]) for (var l = 0; l < t; l++) {
for (var u = 0; u < c; u++) {
if (i + 60 * u > this.border_array[s] || a - 100 * l <= -n) {
r = 1;
break;
}
this.createEat_pumpkin(i + 60 * u, a - 60 * l, s);
}
if (1 == r) break;
}
},
createPumpkin_2: function() {},
createPumpkin_3: function() {},
createMonster_1: function() {
var e = Math.floor(Math.random() * (this.monsterNum / 4) + 1), t = Math.floor(3 * Math.random() + 1), c = Math.floor(e / t), o = this.Background.width / 2, n = this.Background.height / 2, i = Math.floor(cc.randomMinus1To1() * o), a = Math.floor(cc.randomMinus1To1() * n) - 50, s = Math.floor((i + o) / this.interval) >= this.split_regionNum - 1 ? this.split_regionNum - 2 : Math.floor((i + o) / this.interval), r = 0;
if (0 == this.flag_array[s]) for (var l = 0; l < t; l++) {
for (var u = 0; u < c; u++) {
if (i + 60 * u > this.border_array[s] || a - 100 * l <= -n) {
r = 1;
break;
}
this.createMonster(i + 60 * u, a - 60 * l, s);
}
if (1 == r) break;
}
},
createMonster_2: function() {},
createMonster_3: function() {},
createHeart_1: function() {
var e = this.Background.width / 2, t = this.Background.height / 2, c = Math.floor(cc.randomMinus1To1() * e), o = Math.floor(cc.randomMinus1To1() * t) - 50, n = Math.floor((c + e) / this.interval) >= this.split_regionNum - 1 ? this.split_regionNum - 2 : Math.floor((c + e) / this.interval);
0 == this.flag_array[n] && (c > this.border_array[n] || o <= -t || this.createHeart(c, o, n));
},
createBehindItem_1: function() {
for (var e = this.Player, t = e.convertToWorldSpaceAR(cc.v2(0, 0)), c = e.height, o = t.x, n = t.y + c / 3, i = this.Background.convertToNodeSpaceAR(cc.v2(o, n)), a = 0; a < 2; a++) this.createFlyBehindItem(cc.v2(i.x, i.y - 10 * a));
},
createEat_pumpkin: function(e, t, c) {
var o = null;
if (this.eat_pumpkinPool.size() > 0) {
o = this.eat_pumpkinPool.get();
this.Background.addChild(o);
o.setPosition(cc.p(e, t));
this.flag_array[c] += 1;
o.getComponent("eat_pumpkin").part = c;
o.getComponent("eat_pumpkin").GameScript = this;
}
},
createMonster: function(e, t, c) {
var o = null;
if (this.monsterPool.size() > 0) {
o = this.monsterPool.get();
this.Background.addChild(o);
o.setPosition(cc.p(e, t));
this.flag_array[c] += 1;
o.getComponent("Monster").part = c;
o.getComponent("Monster").GameScript = this;
}
},
createHeart: function(e, t, c) {
var o = null;
if (this.heartItemPool.size() > 0) {
o = this.heartItemPool.get();
this.Background.addChild(o);
o.setPosition(cc.p(e, t));
this.flag_array[c] += 1;
o.getComponent("Heart").part = c;
o.getComponent("Heart").GameScript = this;
}
},
createFlyBehindItem: function(e) {
var t = null;
if (this.behindItemPool.size() > 0) {
t = this.behindItemPool.get();
this.Background.addChild(t);
t.setPosition(e);
t.getComponent("BehindItem").GameScript = this;
}
},
onEat_pumpkinKilled: function(e, t) {
this.eat_pumpkinPool.put(e);
this.flag_array[t] -= 1;
},
onMonsterKilled: function(e, t) {
this.monsterPool.put(e);
this.flag_array[t] -= 1;
},
onHeartKilled: function(e, t) {
this.heartItemPool.put(e);
this.flag_array[t] -= 1;
},
onFlyBehindItemKilled: function(e) {
this.behindItemPool.put(e);
},
gainScore: function() {
this.score += 1;
this.ScoresLabel.string = this.score.toString();
},
updateHeart: function() {
this.HeartLabel.string = this.Player.getComponent("Player").lifeNum.toString();
},
gameOver: function() {},
playPickedPumpkinSound: function() {
cc.audioEngine.playEffect(this.PickedPumpkinAudio, !1);
},
playFlySound: function() {
cc.audioEngine.playEffect(this.FlyAudio, !0);
},
stopPlayFlySound: function() {
cc.audioEngine.uncache(this.FlyAudio);
},
playPickedMonsterSound: function() {
cc.audioEngine.playEffect(this.PickedMonsterAudio, !1);
},
setDistaceLabel: function(e) {
this.DistaceLabel.string = e;
}
});
cc._RF.pop();
}, {} ],
Heart: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "74f8cE2GCBJRIOzF6lZIzzq", "Heart");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 75,
GameScript: {
default: null,
serializable: !1
},
part: 0
},
onLoad: function() {},
update: function(e) {
var t = this.GameScript.Player, c = t.convertToWorldSpace(cc.v2(0, 0)), o = this.node.convertToWorldSpace(cc.v2(0, 0));
if (1 == this.onPicked(c, o)) {
this.GameScript.playPickedPumpkinSound();
this.GameScript.Player.getComponent("Player").lifeNum += 1;
this.GameScript.updateHeart();
this.GameScript.onHeartKilled(this.node, this.part);
} else c.x - o.x > this.GameScript.node.width / 2 - Math.abs(t.x) && this.GameScript.onHeartKilled(this.node, this.part);
},
onPicked: function(e, t) {
return cc.pDistance(e, t) <= this.pickRadius && 1 == this.GameScript.Player.getComponent("Player").isLived ? 1 : 0;
}
});
cc._RF.pop();
}, {} ],
Monster: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "a1abdYVPv1B4Y0WFobX+dK3", "Monster");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 75,
GameScript: {
default: null,
serializable: !1
},
part: 0
},
onLoad: function() {},
update: function(e) {
var t = this.GameScript.Player, c = t.convertToWorldSpace(cc.v2(0, 0)), o = this.node.convertToWorldSpace(cc.v2(0, 0));
if (1 == this.onPicked(c, o)) {
this.GameScript.playPickedMonsterSound();
this.GameScript.onMonsterKilled(this.node, this.part);
if (1 == t.getComponent("Player").lifeNum) {
this.GameScript.Player.getComponent("Player").lifeNum = 0;
this.GameScript.Player.getComponent("Player").isLived = 0;
sys.localStorage.setItem("heartNum", "0");
this.GameScript.gameOver();
} else {
this.GameScript.Player.getComponent("Player").lifeNum -= 1;
sys.localStorage.setItem("heartNum", this.GameScript.Player.getComponent("Player").lifeNum.toString());
}
this.GameScript.updateHeart();
} else c.x - o.x > this.GameScript.node.width / 2 - Math.abs(t.x) && this.GameScript.onMonsterKilled(this.node, this.part);
},
onPicked: function(e, t) {
return cc.pDistance(e, t) <= this.pickRadius && 1 == this.GameScript.Player.getComponent("Player").isLived && !this.GameScript.Player.getComponent("Player").isInvincible ? 1 : 0;
}
});
cc._RF.pop();
}, {} ],
Player: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "6287eS0X55LTq0Y1bW/BDRv", "Player");
cc.Class({
extends: cc.Component,
properties: {
x_speed: 0,
y_speed: 0,
y_accelerate: 0,
maxMoveUpSpeed: 500,
moveDuration: 1,
enterDistance: 340,
y_top: 223,
y_bottom: -320,
isClicked: 0,
seconds: 0,
lifeNum: 1,
isLived: 1,
clickListener: null,
isInvincible: !1,
tempflag: 0,
GameScript: {
default: null,
serializable: !1
},
player: {
default: null,
type: cc.SpriteFrame
},
player_1: {
default: "",
url: cc.Texture2D
},
player_2: {
default: "",
url: cc.Texture2D
},
player_3: {
default: "",
url: cc.Texture2D
},
player_4: {
default: "",
url: cc.Texture2D
}
},
onLoad: function() {
this.y_speed = 0;
this.y_accelerate = 0;
this.maxMoveUpSpeed = 500;
this.lifeNum = this.lifeNum + parseInt(sys.localStorage.getItem("heartNum"));
this.GameScript.HeartLabel.string = this.lifeNum.toString();
var e = parseInt(sys.localStorage.getItem("accNum"));
if (e > 0) {
this.isInvincible = !0;
sys.localStorage.setItem("accNum", e - 1);
}
var t, c = parseInt(sys.localStorage.getItem("peopleUseNum"));
t = 1 == c ? this.player_1 : 2 == c ? this.player_2 : 3 == c ? this.player_3 : this.player_4;
this.player.setTexture(t);
this.node.runAction(this.enter());
this.setClickControl();
},
enter: function() {
return cc.moveTo(this.moveDuration, cc.p(-this.enterDistance, this.y_bottom)).easing(cc.easeCubicActionIn());
},
setClickControl: function() {
var e = this;
this.clickListener = cc.eventManager.addListener({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
onTouchBegan: function(t, c) {
if (1 == e.isLived) {
e.node.rotation = -30;
e.isClicked = 1;
e.y_accelerate = 1e4;
e.node.parent.getComponent("Game").playFlySound();
return !0;
}
e.node.rotation = 0;
e.isClicked = 0;
e.node.parent.getComponent("Game").stopPlayFlySound();
e.y_accelerate = -1e4;
this.node.runAction(cc.moveTo(1, this.node.x, this.y_bottom));
return !0;
},
onTouchMoved: function(t, c) {
e.y_accelerate = 1e4;
},
onTouchEnded: function(t, c) {
e.node.rotation = 0;
e.isClicked = 0;
e.node.parent.getComponent("Game").stopPlayFlySound();
e.y_accelerate = -1e4;
}
}, e.node);
},
update: function(e) {
this.seconds = (this.seconds + 1) % 60;
this.y_speed += e * this.y_accelerate;
var t = this.node.y + this.y_speed * e;
this.node.y = t >= this.y_top ? this.y_top : t <= this.y_bottom ? this.y_bottom : t;
this.node.y == this.y_top && (this.node.rotation = 0);
Math.abs(this.y_speed) > this.maxMoveUpSpeed && (this.y_speed = this.maxMoveUpSpeed * this.y_speed / Math.abs(this.y_speed));
1 == this.isClicked && this.seconds % 5 == 0 && this.node.parent.getComponent("Game").createBehindItem_1();
if (0 == this.isLived) {
cc.eventManager.removeListener(this.clickListener);
this.node.rotation = 0;
this.isClicked = 0;
this.node.parent.getComponent("Game").stopPlayFlySound();
this.y_accelerate = -1e4;
if (0 == this.tempflag) {
sys.localStorage.setItem("addscore", this.GameScript.score.toString());
if (this.node.y == this.y_bottom) {
this.tempflag = 1;
cc.director.loadScene("EndScene");
}
}
}
}
});
cc._RF.pop();
}, {} ],
Score: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "04a29DqA0ZEIZjvy+CO/1ZI", "Score");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {});
this.node.on(cc.Node.EventType.TOUCH_END, function(e) {});
}
});
cc._RF.pop();
}, {} ],
Scroller: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "8c119+mLFZHIJUOG2EytQIx", "Scroller");
cc.Class({
extends: cc.Component,
properties: {
speed: -300,
resetX: -6550,
xbegin: 6450,
accelerate: 30,
canScroll: !0,
maxSpeed: -1400,
runDistance: 500,
GameScript: {
default: null,
serializable: !1
},
hasDone: !0
},
onLoad: function() {
this.canScroll = !0;
this.accelerate = 20;
this.maxSpeed = -1400;
},
update: function(e) {
if (this.canScroll) {
if (this.GameScript.Player.getComponent("Player").isInvincible && this.GameScript.distance <= this.runDistance) this.speed = -2e3; else {
if (this.hasDone) {
this.GameScript.Player.getComponent("Player").isInvincible = !1;
this.speed = -300;
this.hasDone = !1;
}
this.speed -= e * this.accelerate;
Math.abs(this.speed) >= Math.abs(this.maxSpeed) && (this.speed = this.maxSpeed);
}
this.node.x += this.speed * e;
if (1 == this.GameScript.Player.getComponent("Player").isLived) {
this.GameScript.distance += Math.ceil(Math.abs(this.speed) * e / 500);
var t = this.GameScript.distance.toString() + " m";
this.GameScript.setDistaceLabel(t);
}
this.node.x <= this.resetX && (this.node.x = this.xbegin);
}
},
stopScroll: function() {
this.canScroll = !1;
},
startScroll: function() {
this.canScroll = !0;
}
});
cc._RF.pop();
}, {} ],
background1: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "bd744FUUC1O+4Z1f21NxtIi", "background1");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var e = cc.moveBy(10, -1e3, 0);
this.node.runAction(e);
}
});
cc._RF.pop();
}, {} ],
bag: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "2db3e1HIYpExrW1lEtP11jM", "bag");
cc.Class({
extends: cc.Component,
properties: {
startMainGame: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.node.opacity = 0;
this.node.setPosition(790, -12);
},
callback1: function() {
this.node.runAction(cc.sequence(cc.moveTo(.5, -6, 3), cc.fadeTo(.5, 255), cc.callFunc(function() {
this.startMainGame.active = !1;
}, this)));
},
callback2: function() {
this.node.runAction(cc.sequence(cc.spawn(cc.fadeTo(.5, 0), cc.callFunc(function() {
this.startMainGame.active = !0;
}, this)), cc.moveTo(.5, 790, -12)));
}
});
cc._RF.pop();
}, {} ],
bottomNode: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "0be30n/WBFGUbjlwCq8C0na", "bottomNode");
cc.Class({
extends: cc.Component,
properties: {
task: {
default: null,
type: cc.Node
},
masklayer: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.node.opacity = 0;
this.node.runAction(cc.fadeTo(.2, 255));
var e = this.node, t = this.task, c = this.masklayer, o = this.node.x, n = this.node.y, i = t.x, a = t.y;
this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
var c = e.getDeltaY();
if (this.y < 230) {
this.y += c;
t.y += c;
}
});
this.node.on(cc.Node.EventType.TOUCH_END, function(s) {
if (this.y > -50) {
e.opacity = 0;
e.x = o;
e.y = n;
t.runAction(cc.moveTo(.4, -11, -12));
c.active = !1;
} else e.runAction(cc.spawn(cc.moveTo(.3, o, n), cc.callFunc(function() {
t.runAction(cc.moveTo(.3, i, a));
})));
});
}
});
cc._RF.pop();
}, {} ],
eat_pumpkin: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "2307ezkOxdMS7AxPYQvVUEQ", "eat_pumpkin");
cc.Class({
extends: cc.Component,
properties: {
pickRadius: 75,
GameScript: {
default: null,
serializable: !1
},
part: 0
},
onLoad: function() {},
update: function(e) {
var t = this.GameScript.Player, c = t.convertToWorldSpace(cc.v2(0, 0)), o = this.node.convertToWorldSpace(cc.v2(0, 0));
if (1 == this.onPicked(c, o)) {
this.GameScript.playPickedPumpkinSound();
this.GameScript.gainScore();
this.GameScript.onEat_pumpkinKilled(this.node, this.part);
} else c.x - o.x > this.GameScript.node.width / 2 - Math.abs(t.x) && this.GameScript.onEat_pumpkinKilled(this.node, this.part);
},
onPicked: function(e, t) {
return cc.pDistance(e, t) <= this.pickRadius && 1 == this.GameScript.Player.getComponent("Player").isLived ? 1 : 0;
}
});
cc._RF.pop();
}, {} ],
end: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "a9ec546rXdB27CZtOfYWtg0", "end");
cc.Class({
extends: cc.Component,
properties: {
gameover1: {
default: null,
type: cc.Node
},
gameover2: {
default: null,
type: cc.Node
},
again: {
default: null,
type: cc.Node
},
add: {
default: null,
type: cc.Label
},
base: {
default: null,
type: cc.Label
},
all: {
default: null,
type: cc.Label
}
},
onLoad: function() {
var e = sys.localStorage.getItem("addscore");
this.add.string = e;
var t = sys.localStorage.getItem("basescore");
this.base.string = t;
this.all.string = (parseInt(e) + parseInt(t)).toString();
sys.localStorage.setItem("basescore", this.all.string);
this.gameover2.runAction(cc.scaleBy(.1, 1.5));
this.gameover1.runAction(cc.fadeTo(1, 240));
this.gameover2.runAction(cc.spawn(cc.fadeTo(2, 30), cc.rotateBy(2, 360), cc.scaleBy(2, .67)));
this.again.active = !0;
this.again.opacity = 0;
this.again.runAction(cc.fadeTo(3, 100));
}
});
cc._RF.pop();
}, {} ],
enterbutton: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "e1dc4uFqZtFCpGRqPjGDgCo", "enterbutton");
cc.Class({
extends: cc.Component,
properties: {
maskLayer: {
default: null,
type: cc.Node
}
},
onLoad: function() {
sys.localStorage.setItem("basescore", "10000");
sys.localStorage.setItem("heartNum", "0");
sys.localStorage.setItem("accNum", "0");
sys.localStorage.setItem("people1", "1");
sys.localStorage.setItem("people2", "0");
sys.localStorage.setItem("people3", "0");
sys.localStorage.setItem("people4", "0");
sys.localStorage.setItem("peopleUseNum", "1");
var e = new cc.Component.EventHandler();
e.target = this.node;
e.component = "enterbutton";
e.handler = "callback";
e.customEventData = "开始游戏";
this.node.getComponent(cc.Button).clickEvents.push(e);
},
callback: function(e, t) {
this.maskLayer.active = !0;
this.maskLayer.opacity = 0;
this.maskLayer.color = cc.Color.BLACK;
this.maskLayer.runAction(cc.sequence(cc.fadeTo(1, 128), cc.fadeTo(1, 200), cc.callFunc(function() {
cc.director.loadScene("Startmenu");
}, this)));
}
});
cc._RF.pop();
}, {} ],
enter: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "ba3e2RjcnZOgoB8r5ES4c8u", "enter");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
var e = cc.scaleTo(1, .9), t = cc.scaleTo(1, 1.1), c = cc.fadeOut(1), o = cc.fadeIn(1);
this.node.runAction(cc.sequence(cc.spawn(e, o), cc.spawn(t, c)).repeatForever());
}
});
cc._RF.pop();
}, {} ],
leftNode: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "25184a3Q5BO1qnKbgY465DG", "leftNode");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.opacity = 0;
this.node.runAction(cc.fadeTo(.2, 255));
}
});
cc._RF.pop();
}, {} ],
maingame: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "72c0f2kOcFJrZ4gYxYbkIoJ", "maingame");
cc.Class({
extends: cc.Component,
properties: {
i: 0,
pumpkin1perfab: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {
this.i = 0;
this.pumpkinPool = new cc.NodePool();
for (var e = 0; e < 10; e++) {
var t = cc.instantiate(this.pumpkin1perfab);
this.pumpkinPool.put(t);
}
},
createNewPumpkin: function(e, t) {
var c = null;
c = this.pumpkinPool.size() > 0 ? this.pumpkinPool.get() : cc.instantiate(this.pumpkin1perfab);
this.node.addChild(c);
c.setPosition(cc.p(e, t));
c.getComponent("pumpkin1").maingame = this;
},
destroyPumpkin: function(e) {
this.pumpkinPool.put(e);
},
update: function(e) {
this.i = this.i + 1;
if (this.i % 20 == 0) for (var t = -190, c = 167, o = 0; o < 2; o++) {
this.createNewPumpkin(t, c);
t += -15;
c += -15;
}
}
});
cc._RF.pop();
}, {} ],
numberDeal1: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "717942dFeBDo57QRloUXFQx", "numberDeal1");
cc.Class({
extends: cc.Component,
properties: {
moneyNum: {
default: null,
type: cc.Label
},
moneyShow: {
default: null,
type: cc.Node
},
moneySucc: {
default: null,
type: cc.Node
},
heartNum: {
default: null,
type: cc.Label
}
},
onLoad: function() {
this.moneyShow.opacity = 0;
this.moneyShow.runAction(cc.fadeTo(.1, 0));
this.moneySucc.opacity = 0;
this.moneySucc.runAction(cc.fadeTo(.1, 0));
},
callbackMoney: function() {
var e = this.moneyNum.string;
if (e.valueOf() >= 500) {
this.moneyNum.string = (e - 500).toString();
this.moneySucc.runAction(cc.sequence(cc.fadeTo(.1, 255), cc.fadeTo(.1, 0)));
var t = this.heartNum.string;
this.heartNum.string = (parseInt(t) + 1).toString();
sys.localStorage.setItem("heartNum", this.heartNum.string);
} else this.moneyShow.runAction(cc.sequence(cc.fadeTo(.1, 255), cc.fadeTo(.1, 0)));
},
sellbackMoney: function() {
var e = this.heartNum.string;
if (e.valueOf() > 0) {
this.heartNum.string = (e - 1).toString();
sys.localStorage.setItem("heartNum", this.heartNum.string);
var t = this.moneyNum.string;
this.moneyNum.string = (parseInt(t) + 100).toString();
}
}
});
cc._RF.pop();
}, {} ],
numberDeal2: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "f8db6XabzROyaTJh5iNH6OV", "numberDeal2");
cc.Class({
extends: cc.Component,
properties: {
moneyNum: {
default: null,
type: cc.Label
},
moneyShow: {
default: null,
type: cc.Node
},
moneySucc: {
default: null,
type: cc.Node
},
accNum: {
default: null,
type: cc.Label
}
},
onLoad: function() {
this.accNum.string = sys.localStorage.getItem("accNum");
this.moneyShow.opacity = 0;
this.moneyShow.runAction(cc.fadeTo(.1, 0));
this.moneySucc.opacity = 0;
this.moneySucc.runAction(cc.fadeTo(.1, 0));
},
sellbackMoney: function() {
var e = this.accNum.string;
if (e.valueOf() > 0) {
this.accNum.string = (e - 1).toString();
sys.localStorage.setItem("accNum", this.accNum.string);
var t = this.moneyNum.string;
this.moneyNum.string = (parseInt(t) + 100).toString();
}
},
callbackMoney: function() {
var e = this.moneyNum.string;
if (e.valueOf() >= 500) {
this.moneyNum.string = (e - 500).toString();
this.moneySucc.runAction(cc.sequence(cc.fadeTo(.1, 255), cc.fadeTo(.1, 0)));
var t = this.accNum.string;
this.accNum.string = (parseInt(t) + 1).toString();
sys.localStorage.setItem("accNum", this.accNum.string);
} else this.moneyShow.runAction(cc.sequence(cc.fadeTo(.1, 255), cc.fadeTo(.1, 0)));
}
});
cc._RF.pop();
}, {} ],
package: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "6f37aVAd39DpZN+NhO6zlxs", "package");
cc.Class({
name: "Item"
});
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {}
});
cc._RF.pop();
}, {} ],
people1: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "d8893ReidNL66Aijl2oSyPF", "people1");
cc.Class({
extends: cc.Component,
properties: {
moneyNum: {
default: null,
type: cc.Label
},
moneyShow: {
default: null,
type: cc.Node
},
alreadlybuy: {
default: null,
type: cc.Node
},
moneySucc: {
default: null,
type: cc.Node
},
lock: {
default: null,
type: cc.Node
},
peopleSucc: {
default: null,
type: cc.Node
},
peoplefail: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.moneyShow.opacity = 0;
this.moneyShow.runAction(cc.fadeTo(.1, 0));
this.moneySucc.opacity = 0;
this.moneySucc.runAction(cc.fadeTo(.1, 0));
this.alreadlybuy.opacity = 0;
this.alreadlybuy.runAction(cc.fadeTo(.1, 0));
this.peopleSucc.opacity = 0;
this.peopleSucc.runAction(cc.fadeTo(.1, 0));
this.peoplefail.opacity = 0;
this.peoplefail.runAction(cc.fadeTo(.1, 0));
var e = sys.localStorage.getItem("people1");
1 == parseInt(e) && (this.lock.active = !1);
},
callbackMoney: function() {
var e = sys.localStorage.getItem("people1");
if (1 == parseInt(e)) this.alreadlybuy.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0))); else {
var t = this.moneyNum.string;
if (t.valueOf() >= 0) {
this.moneyNum.string = (t - 0).toString();
this.moneySucc.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
this.lock.runAction(cc.fadeTo(4, 0));
this.lock.active = !1;
sys.localStorage.setItem("people1", "1");
} else this.moneyShow.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
}
},
callbackPeople: function() {
var e = sys.localStorage.getItem("people1");
if (1 == parseInt(e)) {
sys.localStorage.setItem("peopleUseNum", "1");
this.peopleSucc.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
} else this.peoplefail.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
}
});
cc._RF.pop();
}, {} ],
people2: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "252feZzoPFHR7Vdq63JStuF", "people2");
cc.Class({
extends: cc.Component,
properties: {
moneyNum: {
default: null,
type: cc.Label
},
moneyShow: {
default: null,
type: cc.Node
},
alreadlybuy: {
default: null,
type: cc.Node
},
moneySucc: {
default: null,
type: cc.Node
},
lock: {
default: null,
type: cc.Node
},
peopleSucc: {
default: null,
type: cc.Node
},
peoplefail: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.moneyShow.opacity = 0;
this.moneyShow.runAction(cc.fadeTo(.5, 0));
this.moneySucc.opacity = 0;
this.moneySucc.runAction(cc.fadeTo(.5, 0));
this.alreadlybuy.opacity = 0;
this.alreadlybuy.runAction(cc.fadeTo(.5, 0));
this.peopleSucc.opacity = 0;
this.peopleSucc.runAction(cc.fadeTo(.5, 0));
this.peoplefail.opacity = 0;
this.peoplefail.runAction(cc.fadeTo(.5, 0));
var e = sys.localStorage.getItem("people2");
1 == parseInt(e) && (this.lock.active = !1);
},
callbackMoney: function() {
var e = sys.localStorage.getItem("people2");
if (1 == parseInt(e)) this.alreadlybuy.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0))); else {
var t = this.moneyNum.string;
if (t.valueOf() >= 1e3) {
this.moneyNum.string = (t - 1e3).toString();
this.moneySucc.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
this.lock.runAction(cc.fadeTo(4, 0));
this.lock.active = !1;
sys.localStorage.setItem("people2", "1");
} else this.moneyShow.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
}
},
callbackPeople: function() {
var e = sys.localStorage.getItem("people2");
if (1 == parseInt(e)) {
sys.localStorage.setItem("peopleUseNum", "2");
this.peopleSucc.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
} else this.peoplefail.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
}
});
cc._RF.pop();
}, {} ],
people3: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "eeb3aOn8+dAsJtNo/7H4TWw", "people3");
cc.Class({
extends: cc.Component,
properties: {
moneyNum: {
default: null,
type: cc.Label
},
moneyShow: {
default: null,
type: cc.Node
},
alreadlybuy: {
default: null,
type: cc.Node
},
moneySucc: {
default: null,
type: cc.Node
},
lock: {
default: null,
type: cc.Node
},
peopleSucc: {
default: null,
type: cc.Node
},
peoplefail: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.moneyShow.opacity = 0;
this.moneyShow.runAction(cc.fadeTo(.5, 0));
this.moneySucc.opacity = 0;
this.moneySucc.runAction(cc.fadeTo(.5, 0));
this.alreadlybuy.opacity = 0;
this.alreadlybuy.runAction(cc.fadeTo(.5, 0));
this.peopleSucc.opacity = 0;
this.peopleSucc.runAction(cc.fadeTo(.5, 0));
this.peoplefail.opacity = 0;
this.peoplefail.runAction(cc.fadeTo(.5, 0));
var e = sys.localStorage.getItem("people3");
1 == parseInt(e) && (this.lock.active = !1);
},
callbackMoney: function() {
var e = sys.localStorage.getItem("people3");
if (1 == parseInt(e)) this.alreadlybuy.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0))); else {
var t = this.moneyNum.string;
if (t.valueOf() >= 2e3) {
this.moneyNum.string = (t - 2e3).toString();
this.moneySucc.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
this.lock.runAction(cc.fadeTo(4, 0));
this.lock.active = !1;
sys.localStorage.setItem("people3", "1");
} else this.moneyShow.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
}
},
callbackPeople: function() {
var e = sys.localStorage.getItem("people3");
if (1 == parseInt(e)) {
sys.localStorage.setItem("peopleUseNum", "3");
this.peopleSucc.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
} else this.peoplefail.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
}
});
cc._RF.pop();
}, {} ],
people4: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "1c6edf4/JhF8J3Pm12T8RRz", "people4");
cc.Class({
extends: cc.Component,
properties: {
moneyNum: {
default: null,
type: cc.Label
},
moneyShow: {
default: null,
type: cc.Node
},
alreadlybuy: {
default: null,
type: cc.Node
},
moneySucc: {
default: null,
type: cc.Node
},
lock: {
default: null,
type: cc.Node
},
peopleSucc: {
default: null,
type: cc.Node
},
peoplefail: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.moneyShow.opacity = 0;
this.moneyShow.runAction(cc.fadeTo(.5, 0));
this.moneySucc.opacity = 0;
this.moneySucc.runAction(cc.fadeTo(.5, 0));
this.alreadlybuy.opacity = 0;
this.alreadlybuy.runAction(cc.fadeTo(.5, 0));
this.peopleSucc.opacity = 0;
this.peopleSucc.runAction(cc.fadeTo(.5, 0));
this.peoplefail.opacity = 0;
this.peoplefail.runAction(cc.fadeTo(.5, 0));
var e = sys.localStorage.getItem("people4");
1 == parseInt(e) && (this.lock.active = !1);
},
callbackMoney: function() {
var e = sys.localStorage.getItem("people4");
if (1 == parseInt(e)) this.alreadlybuy.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0))); else {
var t = this.moneyNum.string;
if (t.valueOf() >= 5e3) {
this.moneyNum.string = (t - 5e3).toString();
this.moneySucc.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
this.lock.runAction(cc.fadeTo(4, 0));
this.lock.active = !1;
sys.localStorage.setItem("people4", "1");
} else this.moneyShow.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
}
},
callbackPeople: function() {
var e = sys.localStorage.getItem("people4");
if (1 == parseInt(e)) {
sys.localStorage.setItem("peopleUseNum", "4");
this.peopleSucc.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
} else this.peoplefail.runAction(cc.sequence(cc.fadeTo(.5, 255), cc.fadeTo(.5, 0)));
}
});
cc._RF.pop();
}, {} ],
pumpkin1: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "27c186DsuhBbLGCkeA3K+NR", "pumpkin1");
cc.Class({
extends: cc.Component,
properties: {
y_accel: -100,
y_speed: 0,
x_accel: -100,
x_speed: 0,
maingame: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.y_speed = 0;
this.x_speed = 0;
var e = cc.moveBy(1, 0, 50 * cc.random0To1()), t = cc.moveBy(1, 0, -50 * cc.random0To1());
this.node.runAction(cc.sequence(e, t));
},
update: function(e) {
this.y_speed += this.y_accel * e;
this.node.y += this.y_speed * e;
this.x_speed += this.x_accel * e;
this.node.x += this.x_speed * e;
}
});
cc._RF.pop();
}, {} ],
rightNode: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "c4bf5+Ir9hG+JYO9fBLQtuz", "rightNode");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.node.opacity = 0;
this.node.runAction(cc.fadeTo(.2, 255));
}
});
cc._RF.pop();
}, {} ],
shop: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "3d8d6c9oIhH7pkIFj0BETbW", "shop");
cc.Class({
extends: cc.Component,
properties: {
startMainGame: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.node.opacity = 0;
this.node.setPosition(-926, 1);
},
callback1: function() {
this.node.runAction(cc.sequence(cc.moveTo(.5, -6, 3), cc.fadeTo(.5, 255), cc.callFunc(function() {
this.startMainGame.active = !1;
}, this)));
},
callback2: function() {
this.node.runAction(cc.sequence(cc.spawn(cc.fadeTo(.5, 0), cc.callFunc(function() {
this.startMainGame.active = !0;
}, this)), cc.moveTo(.5, -926, 1)));
}
});
cc._RF.pop();
}, {} ],
startgame: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "cda58gQM69MRI+sNSfECHFS", "startgame");
cc.Class({
extends: cc.Component,
properties: {
rightNode: {
default: null,
type: cc.Node
},
leftNode: {
default: null,
type: cc.Node
},
bottomNode: {
default: null,
type: cc.Node
},
moneyNum: {
default: null,
type: cc.Label
}
},
onLoad: function() {
var e = sys.localStorage.getItem("basescore");
this.moneyNum.string = null == e ? 0 : e;
this.startOnListner();
},
startOnListner: function() {
var e = this.leftNode, t = this.rightNode, c = this.bottomNode, o = this.node, n = this.moneyNum.string, i = {
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !0,
target: this,
onTouchBegan: function(i, a) {
o.runAction(cc.spawn(cc.callFunc(function() {
var t = cc.moveBy(1, -75, 0);
e.runAction(t);
}, this), cc.callFunc(function() {
var e = cc.moveBy(1, 75, 0);
t.runAction(e);
}, this), cc.callFunc(function() {
var e = cc.moveBy(1, 0, -67);
c.runAction(e);
}, this), cc.fadeOut(1)));
sys.localStorage.setItem("basescore", n);
cc.director.loadScene("MainScene");
return !0;
},
onTouchMoved: function(e, t) {
cc.log("Touch Moved: " + t);
},
onTouchEnded: function(e, t) {
cc.log("Touch Ended: " + t);
},
onTouchCancelled: function(e, t) {
cc.log("Touch Cancelled: " + t);
}
};
cc.eventManager.addListener(i, this.node);
}
});
cc._RF.pop();
}, {} ],
task: [ function(e, t, c) {
"use strict";
cc._RF.push(t, "8c1d1j5NpJG8aKZwXCRMRW8", "task");
cc.Class({
extends: cc.Component,
properties: {
startMainGame: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.node.setPosition(-11, -610);
},
callback_task: function() {
this.node.runAction(cc.sequence(cc.fadeTo(.3, 0), cc.spawn(cc.moveTo(.3, -11, -610), cc.callFunc(function() {
this.startMainGame.active = !0;
}, this)), cc.fadeTo(.3, 255)));
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "BehindItem", "Game", "Heart", "Monster", "Player", "Scroller", "eat_pumpkin", "Again", "end", "background1", "maingame", "pumpkin1", "enter", "enterbutton", "Score", "bag", "bottomNode", "leftNode", "numberDeal1", "numberDeal2", "package", "people1", "people2", "people3", "people4", "rightNode", "shop", "startgame", "task" ]);
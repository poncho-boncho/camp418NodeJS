const readlineSync = require('readline-sync');

var lastCastP = 1;
var lastCastM = 1;
var cast =-1;
var flag_c=true;
var flag_b=true;

var cdP = [0,0,0,0];
var cdM = [0,0,0];
function getHeart(){
    console.log("Сколько у тебя будет здоровья?");
    return  readlineSync.question('\n');

}

function getRandom(max) {
    return Math.floor(Math.random()* Math.floor(max));
}
function ramka(str,num){
    var pol = "";
    for(let i=0; i<str.length+2+num.toString().length;i++){
        pol+="-";
    }
    return '+'+pol+"+ \n|"+ str+' '+num+" | \n+"+pol+'+';
}

function buff(o,b){
    o.magicArmorPercents +=o.moves[b].magicArmorPercents;
    o.physicArmorPercents +=o.moves[b].physicArmorPercents;
}
function unbaff(o,b) {
    o.magicArmorPercents  -=o.moves[b].magicArmorPercents;
    o.physicArmorPercents -=o.moves[b].physicArmorPercents;

}
function phisDamage(o,n,r) {
    if (r>100)
        r=100;
    return o.moves[n].physicalDmg - (o.moves[n].physicalDmg * r /100);
}
function magDamage(o,n,r) {
    if (r>100)
        r=100;
    return o.moves[n].magicDmg - (o.moves[n].magicDmg * r /100);
}

const monster = {
    maxHealth: 10,
    name: "Лютый",
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3, // физический урон
            "magicDmg": 0,    // магический урон
            "physicArmorPercents": 20, // физическая броня
            "magicArmorPercents": 20,  // магическая броня
            "cooldown": 0     // ходов на восстановление
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
};
const player = {
    maxHealth: 0,
    physicArmorPercents: 0,
    magicArmorPercents: 0,
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
};

player.maxHealth=getHeart();
var raund =0;
console.log("\nО нет на тебя напал манстр "+monster.name+"!!");
console.log("\t\t\t ОПИСАНИЕ СПОСОБНОСТЕЙ :\n" +
    "1)" + player.moves[0].name + '\n' +
    ramka("Физ урон =", player.moves[0].physicalDmg) + '\n' +
    ramka("Маг резист =", player.moves[0].magicArmorPercents));
console.log("2)" + player.moves[1].name + '\n' +
    ramka("Физ урон =", player.moves[1].physicalDmg) + '\n' +
    ramka("Перезарядка =", player.moves[1].cooldown));
console.log("3)" + player.moves[2].name + '\n' +
    ramka("Маг урон =", player.moves[2].magicDmg) + '\n' +
    ramka("Перезарядка =", player.moves[2].cooldown));
console.log("4)" + player.moves[3].name + '\n' +
    ramka("Физ резист =", player.moves[3].physicArmorPercents) + '\n' +
    ramka("Маг резист =", player.moves[3].magicArmorPercents) + '\n' +
    ramka("Перезарядка =", player.moves[3].cooldown));

while (monster.maxHealth>0 && player.maxHealth>0) {

    raund+=1;


        var randAttack = getRandom(3);
        if (cdM[randAttack]!=0){
            while (cdM[randAttack]!=0){
                randAttack= getRandom(3);
            }
        }



    console.log("\n\t\tRAUND "+raund);
    console.log("\nPLAYER\t\t\tMONSTER");
    console.log("HP:"+player.maxHealth+"\t\t\tHP:"+monster.maxHealth);
    console.log("Физ резист: "+player.physicArmorPercents +"%\t\t"+"Физ резист:"+ monster.physicArmorPercents+"%");
    console.log("Маг резист: "+player.magicArmorPercents + "%\t\t"+"Маг резист:"+ monster.magicArmorPercents+ "%\n");
    console.log( monster.name+" пытается использовать: " + monster.moves[randAttack].name);
    console.log("Чем на это ответишь? \n1)" + player.moves[0].name + "   (Cooldown:"+ cdP[0] + ")\n"+
                                       "2)" + player.moves[1].name + "   (Cooldown:"+ cdP[1] + ")\n" +
                                       "3)" + player.moves[2].name + "   (Cooldown:"+ cdP[2] + ")\n" +
                                       "4)" + player.moves[3].name + "   (Cooldown:"+ cdP[3] + ")\n");

    for (let i=0; i<cdP.length; i++){
        if (cdP[i]>0){
            cdP[i]-=1;
        }
    }
    for (let i=0; i<cdM.length; i++){
        if (cdM[i]>0){
            cdM[i]-=1;
        }
    }

    player.maxHealth -= phisDamage(monster,randAttack,player.physicArmorPercents) +
        magDamage(monster,randAttack,player.magicArmorPercents);
    cdM[randAttack] =monster.moves[randAttack].cooldown;
    unbaff(player,lastCastP);

        while (cast>4 || cdP[cast]!=0 || flag_c==true) {
            cast = readlineSync.question('\n') - 1;
            flag_c=false;
            if (cdP[cast]!=0){
                console.log("Скилл "+player.moves[cast].name +" Перезаряжается!!!!");
            }
        }
        switch (cast) {
            case 0 :
                monster.maxHealth -= phisDamage(player, cast, monster.physicArmorPercents) +
                    magDamage(player, cast, monster.magicArmorPercents);
                cdP[cast] = player.moves[cast].cooldown;
                buff(player, cast);
                break;
            case 1:
                monster.maxHealth -= phisDamage(player, cast, monster.physicArmorPercents) +
                    magDamage(player, cast, monster.magicArmorPercents);
                cdP[cast] = player.moves[cast].cooldown;
                buff(player, cast);
                break;
            case 2:
                monster.maxHealth -= phisDamage(player, cast, monster.physicArmorPercents) +
                    magDamage(player, cast, monster.magicArmorPercents);
                cdP[cast] = player.moves[cast].cooldown;
                buff(player, cast);
                break;
            case 3:
                cdP[cast] = player.moves[cast].cooldown;
                buff(player, cast);
                break;
        }
    flag_c=true;
    unbaff(monster,lastCastM);
    buff(monster,randAttack);
    lastCastP = cast;
    lastCastM = randAttack;

}
    if (monster.maxHealth>player.maxHealth){
        console.log("Увы, " + monster.name + " Оказался сильнее тебя ):")
    }
    else
        console.log("Урааа!! ты победил!! :)");

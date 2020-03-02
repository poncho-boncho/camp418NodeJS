const readlineSync = require('readline-sync');

function getRandom(min , max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}
function arrCheck(trueArr, verifiableArr) {
    return trueArr.toString()==verifiableArr.toString();
}

var attempts = 3;
var maxArr = getRandom(3,7);
var longnamber = [];
var answer = false;

for (let i = 0; i<maxArr;){
    maybeFits = getRandom(1,9);

    if (longnamber.indexOf(maybeFits) == -1) {
        longnamber.push(maybeFits);
        i++;
    }
}

while (answer==false && attempts!=0) {
    var maskArr = [];
    var notPlace = [];
    var guessed = [];

    console.log("Длинна числа = " + longnamber.length + "\n" +
        "попыток осталось = " + attempts);

    console.log("Введи свою комбинацию цифр:");
    var user = readlineSync.question('\n');


    for (let i = 0; i < user.length; i++) {
        if (longnamber[i] == user[i]) {
            guessed.push(user[i]);
        } else
            maskArr.push(user[i]);
    }

    for (let i = 0; i < longnamber.length; i++) {
        for (let j = 0; j < maskArr.length; j++) {
            if (longnamber[i] == maskArr[j]) {
                notPlace.push(maskArr[j]);
            }
        }
    }

    attempts-=1;
    answer=arrCheck(longnamber,guessed);

    console.log("Совпавших цифр = " + guessed.length + " (" + guessed + ")");
    console.log("Количество цифр не на своих местах = " + notPlace.length + " (" + notPlace.sort() + ")");

}

 if (answer==true)
     console.log("Позравляю тебе удалось обхитрить меня!");
 else
     console.log("Ничего страшного, в следующий раз точно повезёт :)");
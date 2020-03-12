const fs = require('fs');
const readlineSync = require('readline-sync');
const dir = './questions/';

var filesName = fs.readdirSync (dir);
var score =0;
var poolFiles= [];
var q=0;
var variant;

function getRandomFile(min , max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}

for (var i =0; poolFiles.length<5;) {
    let fileContent = fs.readFileSync(dir + filesName[getRandomFile(0, filesName.length)], "utf8");

    if (poolFiles.indexOf(fileContent)==-1){
        poolFiles.push(fileContent);
        i++;
    }
}

while (q<5) {
    var lineFile = poolFiles[q].toString().split("\n");
    console.log(lineFile[0] + '\n');

    for (var i = 2; i < lineFile.length; i++) {
        variant=i;
        console.log(variant-1+")"+lineFile[i]);
    }

    var user = readlineSync.question('\n');

    if (user == lineFile[1][0])
        score += 1;
    q++;
}
console.log("Правильных ответов = "+score+"/"+q);
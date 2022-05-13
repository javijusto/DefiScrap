const fs = require('fs');

function tripleArrayToJson(name, net, rawData) { //convierte array de 3 arrays a objeto json
    let processedData = [];
    for(let i=0; i<(rawData.length)/3; i++){
        processedData.push({
            pair: rawData[i], //parejas de tokens
            apr: rawData[i+(rawData.length/3)], //porcetaje de rentabilidad
            liquidity: rawData[i+(2*(rawData.length/3))] //liquidez de la pool
        });
    }
    let dex = { //datos del dex
        name: name, //nombre
        net: net, //red
        pools: processedData //datos de las pools
    }
    let jsonData = JSON.stringify(dex);
    fs.writeFileSync('./data/json/' + name + '.json', jsonData); //guarda datos en fichero con su propio nombre
}

module.exports = {tripleArrayToJson};
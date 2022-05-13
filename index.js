const nomiswap = require('./farms/nomiswap');
const dataparser = require('./data/dataparser');
const datainit = require('./data/datainit');
const bodyParser = require("body-parser");
const express = require("express");

const app = express();
const {
    consultaInicial
} = require('./controllers/controller');

//ENDPOINTS
app.get("/", consultaInicial);

async function scrapper(){
    //ESCANEA LOS DEX
    nomiswap().then(nomiswapData => dataparser.tripleArrayToJson('nomiswap', 'BSC', nomiswapData));
    nomiswap().then(nomiswapData => dataparser.tripleArrayToJson('sushiswap', 'ETH', nomiswapData));
    
}

async function initServer(port){
    //LEVANTA EL SERVIDOR
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.listen(port, () => console.log("127.0.0.1:4000"));
}


function main(){
    try{
        //CENTRALIZA INFORMACION EN BACKUP.JSON
        scrapper()
        .then(datainit.scanDirs('./data/json/'))
        .then(initServer(4000));
    }
    catch(e){
        if(e){
            console.error(e);
            console.log("SCRAPING ERROR!");
            return;
        }
    }
    finally{
        console.log("Programa en ejecución");
    }
}

main();
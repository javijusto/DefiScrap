const path = require('path');
const fs = require('fs');

data=[]

function scanDirs(directoryPath){ //scanea directorio data/json
    try{
        var ls=fs.readdirSync(directoryPath);
        for (let index = 0; index < ls.length; index++) {
            const file = path.join(directoryPath, ls[index]);
            try{
                if(!file.includes('backup')){ //todo excepto backup
                    JSONData = fs.readFileSync('./' + file.replace(/\\/g, '\/' )); //reg.exp para rutas cambia \ por /
                    data.push(JSON.parse(JSONData)); //se guarsan datos en buffer
                }
            }catch(e){
                console.error(e);
            }
        }
        fs.writeFileSync('./data/json/backup.json', JSON.stringify(data));//escribe fichero de backup
    }catch(e){
        console.error(e);
    }
}

module.exports = {
    scanDirs
}
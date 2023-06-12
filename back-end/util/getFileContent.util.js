const fs = require('fs');

const getFileContent = async (filePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        });
    }); 
}

module.exports = getFileContent;

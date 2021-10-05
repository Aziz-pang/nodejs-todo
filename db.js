const homedir = require('os').homedir();
const home = process.env.HOME || homedir;
const fs = require('fs');
const path = require('path');
const dbPath = path.join(home, '.todo')

module.exports = {
  read(path = dbPath){
    return new Promise((resolve,reject)=>{
      fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
        if (error) return reject(error)
        let list
        try {
          list = JSON.parse(data.toString())
        } catch (error2) {
          list = []
        }
          resolve(list)
      })
    })
  },
  write(list, path = dbPath){
    return new Promise((resolve, reject)=> {
      const string = JSON.stringify(list) + '\n'
      fs.writeFile(dbPath, string, (error) => {
        if (error) return reject(error);
        resolve()
      })
    })
  }
}
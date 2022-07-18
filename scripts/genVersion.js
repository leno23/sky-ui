const fs = require('fs')

const pkg = require('../package.json')

function genVersion(){
    
    fs.writeFile('./package.json',JSON.stringify(pkg,null,2),(err) => {
        if(err){
            console.log('失败',err)
        }else{
            console.log('成功');
        }
    })
}
genVersion()
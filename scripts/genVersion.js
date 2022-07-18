const fs = require('fs-extra')

const pkg = require('../package.json')
const min = require('minimist')

let argvs = process.argv.slice(2)
let { v } = min(argvs)
if(v) pkg.version = v

if (argvs) {
    for (let x of argvs) {
        let [key, value] = x.split('=')
        pkg[key] = value
    }
}


function genVersion() {
    fs.writeJson('./package.json', pkg, { spaces: '\t' })
        .then(() => {
            console.log('版本更新成功！');
        })
}
genVersion()

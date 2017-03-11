// import * as model from '../../model/diseaseInfo/diseaseType' todo
import fs from 'fs'
import Promise from 'bluebird'
module.exports = async (req, res, next) => {
    Promise.promisifyAll(fs)
    const diseaseInfo = { diseaseType: req.body.diseaseType }
    try {
        let dirpath = '/Users/fuckingnoob/Documents/WitSeq/' + diseaseInfo.diseaseType,
            mode = '0777';
        //todo 文件权限的设置
        await fs.mkdir(dirpath,mode)
        return res.json({
            stateCode: '200',
            type: diseaseInfo.diseaseType
        })
    }catch (err){
        console.log(err||err.stack)
        return res.json({
            stateCode: '201',
            msg: 'mkdir failed'
        })
    }
}

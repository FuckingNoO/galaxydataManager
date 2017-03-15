import * as model from '../../model/file/fileOperations'
import fs from 'fs'
import Promise from 'bluebird'

module.exports = async (req, res, next) => {
    try {
        if(!req.session.user){
            return res.json({
                stateCode: '201',
                msg: 'no permission'
            })
        }
        console.log(req.files);
        return res.json({
            'stateCode': '200',
            'msg': 'success'
        })
    } catch (e){
        return res.json({
            'stateCode': '201',
            'msg': 'error'
        })
    }
}

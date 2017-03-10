import * as model from '../../model/file/fileOperations'
import fs from 'fs'
import Promise from 'bluebird'

module.exports = async (req, res, next) => {
    try {
        return res.json({
            'stateCode': '200',
            'msg': 'success'
        })
    } catch (error){
        return res.json({
            'stateCode': '201',
            'msg': 'error'
        })
    }
}

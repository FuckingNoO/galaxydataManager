import * as model from '../../model/file/fileOperations'
import Promise from 'bluebird'

module.exports = async (req, res, next) => {
    try {
        if(!req.session.user){
            return res.json({
                stateCode: '201',
                msg: 'no permission'
            })
        }
        //test console.log
        console.log(req.files)
        console.log('===========')
        console.log(req.body)
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

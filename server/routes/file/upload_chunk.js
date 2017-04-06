import * as model from '../../model/file/fileOperations'

module.exports = async (req, res, next) => {
    try {
        if(!req.session.user){
            return res.json({
                stateCode: '201',
                msg: 'no permission'
            })
        }
        const { originalname, path, size } = req.files.genefile[0]
        const { type } = req.body
        await model.file_upload(type, req.session.user, path, originalname, size)
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

/**
 * @param req
 * @param res
 * @param next
 */


module.exports = async (req, res, next) => {
   let files = [
      {
         type: '1',
         orderID: 'OR8394',
         filename: 'cancer.txt',
         size: '234kb',
         introduction: 'zhujiahao'
      },
      {
         type: '1',
         orderID: 'OR8493',
         filename: '123456.txt',
         size: '128kb',
         introduction: 'haojiazhu'
      },
      {
         type: '2',
         orderID: 'OR8493',
         filename: 'asdjisajdo.txt',
         size: '128kb',
         introduction: 'jiazhuhao'
      },
      {
         type: '2',
         orderID: 'OR8493',
         filename: 'zmckckxcm.txt',
         size: '128kb',
         introduction: 'hehehe'
      },
      {
         type: '3',
         orderID: 'OR8493',
         filename: 'sdhushdushd.txt',
         size: '128kb',
         introduction: 'hahaha'
      },
      {
         type: '',
         orderID: 'OR8493',
         filename: 'heart12818291.txt',
         size: '128kb',
         introduction: 'xixixixi'
      },
      {
         type: '3',
         orderID: 'OR8493',
         filename: 'heart11127.txt',
         size: '128kb',
         introduction: 'ahhahahaha'
      },
      {
         type: '4',
         orderID: 'OR8493',
         filename: 'zhujiahao.txt',
         size: '12000kb',
         introduction: 'sdahsdasidiadahshasudha'
      },
      {
         type: '4',
         orderID: 'OR8493',
         filename: 'heart.txt',
         size: '100kb',
         introduction: 'sdsdisdishdsdis'
      },
   ]
   if(req.session.user)
      return res.render('dataplatform/homepage',{username: req.session.user, files: files})
   else
      return res.send("please log in first")
}

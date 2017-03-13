import { Router } from 'express'
let router = Router()

/**
 * routes
 */
router.get('/', require('./index-main/index-main'))
router.route('/login').post(require('./login/login'))
router.route('/signup').post(require('./signup/signup'))
router.route('/email').get(require('./emailActive/emailValidate')).post(require('./emailActive/emailActive'))
router.route('/logout').get(require('./logout/logout'))
router.route('/user').get(require('./dataplatform/homepage'))
router.route('/upload_chunk').post(require('./file/upload_chunk'))
router.route('/download').post(require('./file/download'))
router.route('/diseasetypeadd').post(require('./diseaseTypeAdd/add'))

/**
 * route working for adminLTE module
 */
router.route('/test').get(require('./test/test'))
router.route('/test01').get(require('./test/test01'))
router.route('/upload').post(require('./test/upload'))

module.exports = router
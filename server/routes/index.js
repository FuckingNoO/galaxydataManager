import { Router } from 'express'
import M from '../utils/multer'
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
router.route('/upload_chunk').post(M.array('genefile'), require('./file/upload_chunk'))
router.route('/download').post(require('./file/download'))
router.route('/diseasetypeadd').post(require('./diseaseTypeAdd/add'))

/**
 * route working for adminLTE module
 */
router.route('/test').get(require('./test/test'))
router.route('/boxed').get(require('./test/boxed'))
router.route('/user/index2').get(require('./test/index2'))
router.route('/user/collapsed').get(require('./test/collapsed-sidebar'))
router.route('/user/topnav').get(require('./test/top-nav'))
router.route('/user/fixed').get(require('./test/fixed'))

module.exports = router
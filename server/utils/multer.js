import multer from 'multer'

let option = {
    dest: '/Users/fuckingnoob/Documents/galaxydataManager/public/uploadtemp',
    limits: {}
}

let M = multer(option)

module.exports = M



const router = require('express').Router();
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });

const Controller = require('../controllers/Controller');


router.get('/',Controller.home);
router.get('/login',Controller.login_page);
router.post('/login',Controller.login);
router.get('/homepage',Controller.homepage);
router.get('/upload',Controller.upload_page);
router.post('/upload', upload.single('avatar'),Controller.upload_form);
router.get('/logout',Controller.logout);
                  
                  
module.exports = router;
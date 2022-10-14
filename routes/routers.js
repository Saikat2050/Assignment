const router = require('express').Router();
const multer  = require('multer');
const maxSize = 2 * 1024 * 1024;
const upload = multer({ dest: './public/uploads/',
limits: { fileSize: maxSize },
fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  } 
});

const Controller = require('../controllers/Controller');


router.get('/',Controller.home);
router.get('/login',Controller.login_page);
router.post('/login',Controller.login);
router.get('/homepage',Controller.homepage);
router.get('/upload',Controller.upload_page);
router.post('/upload', upload.single('avatar'),Controller.upload_form);
router.get('/logout',Controller.logout);
                  
                  
module.exports = router;
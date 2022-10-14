const db = require('../db/db');
const Data = require('../models/emailschema');
const Image = require('../models/Image');
//const imageData = Image.find({});
var isLogin = false;

const home = (req,res)=>{
    res.render('home',{title: 'Home', error: null});
};

    const login_page = (req,res)=>{
      res.render('log_in', {title: 'Log in'});
      };
    const login = async (req,res)=>{
        const {email, password}= req.body;
       const check= await Data.findOne({email})
       if(check){
         if(check.password===password){
          isLogin = true;
          Image.find().exec()
        .then((result)=>{
        res.render('homepage',{title: 'Gallery', images: result, success: null});
        })
        .catch((err)=>{
          console.log(err);
        })
        /*imageData.exec((err,data)=>{
          if(err)
            console.log(err);
          res.render('homepage',{title: 'Gallery', images: data, success: null});
        })*/
         }
         else{
          const error = 'email and password mismatch';
          res.render('home',{title: 'Home', error: error});
             }
       }
       else{
        const error = 'email and password mismatch';
        res.render('home',{title: 'Home', error: error});
       }
        };
    const homepage = (req,res)=>{
      if(isLogin){
        Image.find().exec()
        .then((result)=>{
        res.render('homepage',{title: 'Gallery', images: result, success: null});
        })
        .catch((err)=>{
          console.log(err);
        })
      }
        else{
          const error = 'Log in first';
          res.render('home',{title: 'Home', error: error});
        }  
    };
    const upload_page = (req,res)=>{
      if(isLogin)
        res.render('upload_page',{title: 'Upload'});
      else{
        const error = 'Log in first';
        res.render('home',{title: 'Home', error: error});
      }
    };
    const upload_form = (req,res)=>{
      if(isLogin){
        const avatar = req.file.filename;
        const success = req.file.filename+" uploaded Successfully";
        const image = new Image({
          avatar: avatar
        });
        image.save()
        .then((result)=>{
          Image.find().exec()
        .then((data)=>{
        res.render('homepage',{title: 'Gallery', images: data, success: null});
        })
        .catch((err)=>{
          console.log(err);
        })
        })
        .catch((err)=>{
          console.log(err);
        })
      }
      else{
        const error = 'Log in first';
          res.render('home',{title: 'Home', error: error});
      }
    };
    const logout = (req,res)=>{
      isLogin = false;
      res.redirect('/');
    };


module.exports ={
    home,
    login_page,
    login,
    homepage,
    upload_page,
    upload_form,
    logout
};
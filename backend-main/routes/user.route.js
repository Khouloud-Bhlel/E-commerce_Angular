const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const  jwt  = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const nodemailer=require('nodemailer');

var transporter =nodemailer.createTransport({
  service:'gmail',

  auth:{
    user:'esps421@gmail.com',
    pass:'lnrqjuzysshlrpem'
  },
  tls:{
    rejectUnauthorized:false
  }
})
require('dotenv').config()

//Register

router.post('/register', async (req, res, )=> {
    const{email,password,role,firstname,lastname,isActive,avatar}=req.body;
    
    const user = await User.findOne({ email })
    if (user) return res.status(404).send({ success: false, message: "User already exists" })

    //const salt=await bcrypt.genSalt(10);
    const hash=await bcrypt.hash(password,salt);
    const bcrypt = require('bcrypt');

const data = 'votreDonneeAHasher';
const salt = 10; // Sel personnalisé, vous pouvez utiliser une autre valeur

bcrypt.hash(data, salt, (err, hash) => {
  if (err) {
    // Gérer l'erreur
    console.error(err);
  } else {
    // Utiliser le hash généré
    console.log(hash);
  }
});
    const newUser=new User({
      email:email,
      password:hash,
      role:role||"user",
      firstname:firstname ||"myfirstname",
      lastname:lastname||"mylastname",
      isActive:isActive ||true,
      avatar:avatar||"avatar.jpg"
        });
    
    try {
           await newUser.save();
           return res.status(201).send({ success: true, message: "Account created successfully", user: newUser })
 
       } catch (error) {
           res.status(409).json({ message: error.message });
       }
  
});


//Register
/*
router.post('/register', async (req, res) =>  {
  try {
 
         let { email, password, firstname, lastname } = req.body
         const avatar="image.jpg"
         const user = await User.findOne({ email })
         if (user) return res.status(404).send({ success: false, message: "User already exists" })
 
         const salt=await bcrypt.genSalt(10);
         const hash=await bcrypt.hash(password,salt);
         const newUser=new User({
                    firstname:firstname,
                    lastname:lastname,
                     email:email,
                     password:hash,
                     avatar:avatar
                     });
 
         const createdUser = await newUser.save()
 
// Envoyer l'e-mail de confirmation de l'inscription
var mailOption ={
  from: '"verify your email " <esps421@gmail.com>',
  to: newUser.email,
  subject: 'vérification your email ',
  html:`<h2>${newUser.firstname}! thank you for registreting on our website</h2>
  <h4>please verify your email to procced.. </h4>
  <a href="http://${req.headers.host}/api/users/status/edit?email=${newUser.email}">click here</a>`
}
transporter.sendMail(mailOption,function(error,info){
  if(error){
    console.log(error)
  }
  else{
    console.log('verification email sent to your gmail account ')
  }
})
  //const url =`http://localhost:3000/activate/${token}`;

     return res.status(201).send({ success: true, message: "Account created successfully", user: createdUser })
 
     } catch (err) {
         console.log(err)
         res.status(404).send({ success: false, message: err })
 
     }
 
 });
 */

// afficher la liste des utilisateurs.
router.get('/', async (req, res, )=> {
  try {
      const users = await User.find().select("-password");              
      return res.status(200).send({ success: true, message: "Account created successfully", user: users })
 
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

});


// se connecter

router.post('/login', async (req, res) =>  {
  let expires = Date.now() + 1
  try {
      let { email, password } = req.body

      if (!email || !password) {
          return res.status(404).send({ success: false, message: "All fields are required" })
      }

       const user = await User.findOne({email});

         const isMatch=await bcrypt.compare(password,user.password);
           if(!isMatch) {res.status(400).json({msg:'mot de passe incorrect'});
           return} ;
  
      if (!user) {

          return res.status(404).send({ success: false, message: "Account doesn't exists" })

      } else {

    let isCorrectPassword = await bcrypt.compare(password, user.password)
     if (isCorrectPassword) {

              delete user._doc.password
              if (!user.isActive) return res.status(200).send({ success: false, message: 'Your account is inactive, Please contact your administrator' })

              const token = generateAccessToken(user);
 
             const refreshToken = generateRefreshToken(user);
       
          

              return res.status(200).send({ success: true, user, token,refreshToken,expiresIn: expires  })

          } else {

              return res.status(404).send({ success: false, message: "Please verify your credentials" })

          }

      }

  } catch (err) {
      return res.status(404).send({ success: false, message: err.message })
  }

 });


// se connecter
/*
router.post('/login', async (req, res) =>  {
  try {
      let { email, password } = req.body

      if (!email || !password) {
          return res.status(404).send({ success: false, message: "All fields are required" })
      }

      let user = await User.findOne({ email }).select('+password').select('+isActive')
      

      if (!user) {

          return res.status(404).send({ success: false, message: "Account doesn't exists" })

      } else {

    let isCorrectPassword = await bcrypt.compare(password, user.password)
     if (isCorrectPassword) {

              delete user._doc.password
              if (!user.isActive) return res.status(200).send({ success: false, message: 'Your account is inactive, Please contact your administrator' })

              const token = generateAccessToken(user);
 
             const refreshToken = generateRefreshToken(user);

              return res.status(200).send({ success: true, user,token,refreshToken })

          } else {

              return res.status(404).send({ success: false, message: "Please verify your credentials" })

          }

      }

  } catch (err) {
      return res.status(404).send({ success: false, message: err.message })
  }

 });
*/
//Access Token 
const generateAccessToken=(user) =>{
    return jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
  }

  // Refresh
function generateRefreshToken(user) {
  //  return jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
  return jwt.sign ({ iduser: user._id, role: user.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y'})
    
}
  
  //Refresh Route
  
  router.post('/refreshToken', async (req, res, )=> { 
  /*  let expires = Date.now() + 3600 
  const refreshtoken = req.body.refreshToken;
  console.log("REFRESH : ",refreshtoken);
    if (!refreshtoken) {
     return res.status(404).json({ message: 'Token Not Found' });
        }
    else {
        jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
          if (err) {
            return res.status(406).json({ message: 'Unauthorized' });
          }
          else {
           const token = generateAccessToken(user);
 
           const refreshToken = generateRefreshToken(user);
   
          res.status(200).json({
            token,
           refreshToken,
           expiresIn: expires
         })
            }
        });
       }
 */

       const refreshtoken = req.body.refreshToken; 
    if (!refreshtoken) {
     return res.status(404).send({success: false, message: 'Token Not Found' });
        }
    else {
        jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, (err, user) => { 
          if (err) {  console.log(err)  
            return res.status(406).send({ success: false,message: 'Unauthorized' });
          }
          else {
           const token = generateAccessToken(user);
 
           const refreshToken = generateRefreshToken(user);
           console.log("token-------",token);  
          res.status(200).send({success: true,
           token,
           refreshToken
         })
            }
        });
       }
  
  });


  /**
 * as an admin i can disable or enable an account 
 */
  router.put('/status/edit',  async (req, res) =>  {
    try {

        let { idUser } = req.body
        let user = await User.findById(idUser).select('+isActive')
        user.isActive = !user.isActive
        user.save()
        res.status(200).send({ success: true, user })
    } catch (err) {
        return res.status(404).send({ success: false, message: err })
    }
   })

   router.get('/status/edit', async (req, res) => {
    try {
    let email = req.query.email
    let user = await User.findOne({email})
    //.select('+isActive')
    user.isActive = !user.isActive
    user.save()
    //res.status(200).send({ success: true, user })
    res.redirect("https://www.google.fr/")
    } catch (err) {
    return res.status(404).send({ success: false, message: err })
    }
    })
  
  
  
    /*
  Forgot password
    */
  router.post('/forgot-password', (req, res) => {
    const {email} = req.body; 
    User.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
              user:'esps421@gmail.com',
              pass:'lnrqjuzysshlrpem'
            },
            tls:{
              rejectUnauthorized:false
            }
          });
          
          var mailOptions = {
            from: '"verify your email " <esps421@gmail.com>',
            to: email,
            subject: 'Reset Password Link',
            text: `http://localhost:3000/reset_password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else { console.log(info)
              return res.send({Status: "Success"})
            }
          });
    })
  })
  
  /*
  Reset Password
  */
  
  router.post('/reset_password/:id/:token', async(req, res) => {
    const {id, token} = req.params
    const {password} = req.body
  
    jwt.verify(token, "jwt_secret_key", async (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } else {
          const salt=await bcrypt.genSalt(10);
          await bcrypt.hash(password,salt)
            .then(hash => {
                User.findByIdAndUpdate({_id: id}, {password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
  })
// afficher la liste des utilisateurs.
/*
router.get('/', async (req, res, )=> {
  try {
      const users = await User.find().select("-password");              
      res.status(200).json(users);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }

});
*/


  module.exports = router;



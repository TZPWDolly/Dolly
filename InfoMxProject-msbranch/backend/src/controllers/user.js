//const status = require('http-status');
const fs = require('fs');
const bcrypt = require('bcrypt');
const userModel = require('../models/users');
const fnErr = require('../controllers/fnErr');
const custErr = require('../controllers/custErr');
const { createToken } = require('../models/auth');
const saltRound = 10;
//....................USER LOGIN....................//
exports.userLogin = fnErr(async (req, res, next) => {
    console.log('login req body: ', req.body);
    const uName = await req.body.userName;
    const pass = await req.body.password;
    if(!uName || !pass) {
       await next(new custErr("User Name and Passwrod fields are cann't be blank.", 404))
    }
    const modelRes = await userModel.userLogin(uName);
    console.log('modelRes: ', modelRes);
    if(modelRes.length === 1){   
        const usrOrg = await userModel.getUserOrg(modelRes[0].USER_ORG);
        var match = await bcrypt.compareSync(pass, modelRes[0].USER_PASSWORD);
        console.log('match: ', match);
            if(match){
                const token = await createToken({userName: modelRes[0].USER_NAME, org: modelRes[0].USER_ORG, role: modelRes[0].USER_TYPE})
              return res.status(200).json({
                status: 200,
                token: token,
                data: { userId: modelRes[0].USER_ID, userName: modelRes[0].USER_FULL_NAME, org: modelRes[0].USER_ORG, orgName: usrOrg[0].ORG_SHORTNAME, loginName: modelRes[0].USER_NAME, role: modelRes[0].USER_TYPE, expire: modelRes[0].USER_EXPIRED},
              });
            }else{
              next(new custErr("Invalid Password", 404))
            }  
        }else{ 
            next(new custErr("User Not Found.", 404))
        }    
});


//....................USER RESET PASSWORD....................//
exports.userResetPassword = fnErr(async (req, res, next) => {
  console.log('resetPassword req:', req.headers);
  console.log('resetPassword req body :', req.body);
  const uId = await req.body.userId;
  const uName = await req.body.userName;
  const pass = await req.body.password;
  const npass = await req.body.newpassword;
  if(!uName || !pass) {
     await next(new custErr("User Name and Passwrod fields are cann't be blank.", 404))
  }
  const modelRes = await userModel.userLogin(uName);
  console.log('modelRes: ', modelRes);
  if(modelRes.length === 1){           
      const match = await bcrypt.compareSync(pass, modelRes[0].USER_PASSWORD);
          if(match){
            const usrOrg = await userModel.getUserOrg(modelRes[0].USER_ORG);
            const newHas = await bcrypt.hash(npass, saltRound);
            console.log("newHas : ", newHas)
            const upPass = await userModel.userResetPassword({up:newHas, ulg: uName, usrId:uId})
            const token = await createToken({userName: modelRes[0].USER_NAME, org: modelRes[0].USER_ORG})
            return res.status(200).json({
              status: 201,
              token: token,
              data: { userId: modelRes[0].USER_ID, userName: modelRes[0].USER_FULL_NAME, org: modelRes[0].USER_ORG, orgName: usrOrg[0].ORG_SHORTNAME, loginName: modelRes[0].USER_NAME, role: modelRes[0].USER_TYPE,expire: modelRes[0].USER_EXPIRED},
            });
          }else{
            next(new custErr("Invalid Password", 404))
          }  
      }else{ 
          next(new custErr("User Not Found.", 404))
      }    
});


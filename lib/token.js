
const nodemailer=require('nodemailer');
const convert = require('nodemailer-express-handlebars')

async function email(req, res){
    try{
      var topic;
      var result;
      var page
      const email=req.body.email;
      const userid=req.body.userid;
      const password=req.body.password;
      const requesttype=req.body.type
      if(requesttype == 'User'){
        page='welcome';
        topic='Welcome Mploycheck!'
        let base64=Buffer.from(email).toString('base64');
        result={username:userid,link:"http://localhost:4200/forget"+"/"+base64}

      }
      else if(requesttype == 'Register'){
        page='account';
        topic='Welcome Mploycheck!';
        let base64=Buffer.from(email).toString('base64');
        const datas="http://localhost:4200/login"+"/"+base64
        result={link:datas}
      }else{
        page='email';
        topic='Mploycheck Reset Password!'
        let base64=Buffer.from(email).toString('base64');
      const datas="http://localhost:4200/forget"+"/"+base64
        result={address:datas}
      }
        var mailtransporter = nodemailer.createTransport({ 
          host: 'smtpout.secureserver.net', 
          port: 465, 
          secure: true, 
          auth: 
          { 
            user: 'admin@mploychek.com', 
            pass: 'Ryw=*Mr39_'
           } 
      }); 
        mailtransporter.use(
          "compile",
          convert({
                viewEngine: {
            layoutsDir: './view/', // location of handlebars templates
            defaultLayout: page, // name of main template
        },
        viewPath: './view/',
        } 
      )
  )
  
    var mailOptions = {
      from: 'admin@mploychek.com',
      to: email,
      subject: topic,
      template: 'email',
      context: result,
      attachments: [{
        filename: 'logo.png',
        path: __dirname +'/img/logo.png', // path contains the filename, do not just give path of folder where images are reciding.
        cid: 'logo' // give any unique name to the image and make sure, you do not repeat the same string in given attachment array of object.
       }]
    }
  mailtransporter.sendMail(mailOptions, function(error, info){
    console.log(info)
    if(error){
        return console.log(error);
    }
    res.send({
      status:'success'
    })
  });
    }
    catch (_e) {
  
      //let e: Error = _e;
      const error = _e.message;
      console.log("error:" + error)
      throw new  Error("Error in gmail - " + error)
  
     
    }
  }

  module.exports = {
    post:email,

}
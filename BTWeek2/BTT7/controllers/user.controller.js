import User from '../models/user';
var md5 = require('md5');
import JWT from 'jsonwebtoken';
import helper from '../helper/response-handle';
import ResponseHandle from '../helper/response-handle';
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");

const UserController = {};

async function verifyToken(req, next) {
    const { token } = req.headers;
    // const token = req.headers.token;
    if (!token) {
        return next(new Error('Not found authentication'));
    }
    const data = await JWT.verify(token, '77yIw21VsG');
    const _id = data._id;
    const user = await User.findById(_id);
    if (!user) {
        return next(new Error('User is not found'));
    }
}

UserController.getAll = async (req, res, next) => {
    try {
        //const { token } = req.headers;
        //await verifyToken(req, next);
        // Authenticate user.
        const users = await User.find();
        // return res.json({
        //     isSuccess: true,
        //     users
        // });
        helper.returnSuccess(res, users);
    } catch (err) {
        return next(err);
    }
};


UserController.getOneUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { token } = req.headers;
        verifyToken(token, next);
        const user = await User.findById({ _id: id });
        if (!user) {
            return next(new Error('not found'));
        }
        // return res.json({
        //     isSuccess: true,
        //     user: user
        // });
        helper.returnSuccess(res, user);
    } catch (err) {
        return next(err);
    }
};

UserController.addUser = async (req, res, next) => {
    try {
        const { password, fullName, gender, email } = req.body;
        //const password1 = bcrypt.hashSync(password,10);
        const user = new User({
            //password: md5(password),
            password: await bcrypt.hash(password, 10),
            fullName,
            gender,
            email
        });
        await user.save();
        delete user._doc.password;
        // return res.status(200).json({
        //     isSuccess: true,
        //     user: user
        // });
        helper.returnSuccess(res, user);
    } catch (err) {
        return next(err);
    }
};

UserController.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const { token } = req.headers;
        verifyToken(token, next);
        const user = await User.findById(id);
        if (!user) {
            return next(new Error('User not found!'));
        }
        if (req.body.password !== undefined) {
            //user.password = md5(data.password);
            user.password = await bcrypt.hash(req.body.password, 10);
        }
        user.set(req.body);
        await user.save();
        delete user._doc.password;
        // return res.status(200).json({
        //     isSuccess: true,
        //     user: user
        // });
        helper.returnSuccess(res, user);
    } catch (err) {
        return next(err);
    }
};

UserController.deleteUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const { token } = req.headers;
        verifyToken(token, next);
        const user = await User.findById(_id);
        if (!user) {
            return next(new Error('User not found!'));
        }
        user.isDelete = true;
        await user.save();
        // return res.status(200).json({
        //     isSuccess: true,
        //     message: 'Delete Success!'
        // });
        helper.returnSuccess(res, { message: 'delete success!' });
    } catch (err) {
        return next(err);
    }
};

UserController.login = async (req, res, next) => {
    try {
        const { password, email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return next(new Error('User is not found'));
        }
        //const isCorrectPassword = md5(password) === user.password;
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            return next(new Error('password is not correct'));
        }
        delete user._doc.password;
        const token = JWT.sign(user._doc, '77yIw21VsG');
        // return res.json({
        //     isSuccess: true,
        //     user,
        //     token
        // });
        helper.returnSuccess(res, {
            user,
            token
        });
    } catch (e) {
        return next(e);
    }
};

UserController.changePassword = async (req, res, next) => {
    try {
        const _id = req.params.id;

        const { currentPassword, newPassword, confirmPassword } = req.body;
        //joi
        if (newPassword !== confirmPassword) {
            return next(new Error('confirmPassword not correct'));
        }
        const user = await User.findOne({ _id });
        if (!user) {
            return next(new Error('User is not found'));
        }
        if (!(await bcrypt.compare(currentPassword, user.password))) {
            return next(new Error('password not correct'));
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        // return res.json({
        //     isSuccess: true,
        //     message: 'password is updated!'
        // });
        helper.returnSuccess(res, { message: 'password is updated!' });
    } catch (e) {
        return next(e);
    }
};

UserController.upload = async (req, res, next) => {
    try {
        var form = new formidable.IncomingForm();
        form.uploadDir = "./uploads";
        form.maxFileSize = 20 * 1024 * 1024; //max 20MB
        form.multiples = true; //chọn nhiều
        form.keepExtensions = true;
        form.parse(req);
    } catch (err) {
        return next(err);
    }
};

UserController.sendMail = async (req, res, next) => {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let account = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: 'SSL', // true for 465, false for other ports
      auth: {
        user: 'hoyitfuc@gmail.com', // generated ethereal user
        pass: '1234@1234' // generated ethereal password
      }
    });
  
    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Fred Foo 👻" <hoyitfuc@gmail.com>', // sender address
      to: "nguyen111829@gmail.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    };
  
    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)
  
    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return ResponseHandle.returnSuccess(res, 'Send mail success', null);
  }
  
export default UserController;

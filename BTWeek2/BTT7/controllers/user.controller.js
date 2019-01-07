import User from '../models/user';
var md5 = require('md5');
import JWT from 'jsonwebtoken';
const bcrypt = require('bcrypt');


const UserController = {};

async function verifyToken(token, next) {
    // const { token } = req.headers;
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
        await verifyToken(token, next);
        // Authenticate user.
        const users = await User.find();
        return res.json({
            isSuccess: true,
            users
        });
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
        return res.json({
            isSuccess: true,
            user: user
        });
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
        return res.status(200).json({
            isSuccess: true,
            user: user
        });
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
        return res.status(200).json({
            isSuccess: true,
            user: user
        });
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
        return res.status(200).json({
            isSuccess: true,
            message: 'Delete Success!'
        });
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
        console.log(user._doc.token);
        return res.json({
            isSuccess: true,
            user
        });
    } catch (e) {
        return next(e);
    }
};

UserController.changePassword = async (req, res, next) => {
    try {
        const _id = req.params.id;

        const { currentPassword, newPassword, confirmPassword } = req.body;

        const user = await User.findOne({ _id });
        // if (!user) {
        //     return next(new Error('User is not found'));
        // }
        if (!(await bcrypt.compare(currentPassword, user.password))) {
            return next(new Error('password not correct'));
        }
        if (newPassword !== confirmPassword) {
            return next(new Error('confirmPassword not correct'));
        }
        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();
        return res.json({
            isSuccess: true,
            message: 'password is updated!'
        });
    } catch (e) {
        return next(e);
    }
};
export default UserController;

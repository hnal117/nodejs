import User from '../models/user';
var md5 = require('md5');

const UserController = {};

UserController.getAll = async (req, res, next) => {
    try {
        //const users = 
        const users = await User.find({
            // $or: [
            //     {
            //         isDelete: false
            //     },
            //     {
            //         isDelete: null
            //     }
            // ]
        });
        return res.json({
            isSuccess: true,
            users
        });
    } catch (err) {
        // return res.status(400).json({
        //     isSuccess: false,
        //     message: err.message,
        //     error: err
        // });
        return next(err);
    }
};

UserController.getOneUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findById({ _id: id });
        if (!user) {
            return next(new Error('not found'));
        }
        return res.json({
            isSuccess: true,
            user: user
        });
    } catch (err) {
        // return res.status(400).json({
        //     isSuccess: false,
        //     error: err
        // });
        return next(err);
    }
};

UserController.addUser = async (req, res, next) => {
    try {
        const { password, fullName, gender, email } = req.body;
        const user = new User({
            password: md5(password),
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
        // return res.status(400).json({
        //     isSuccess: false,
        //     error: err
        // });
        return next(err);
    }
};

UserController.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await User.findById(id);
        if (!user) {
            return next(new Error('User not found!'));
        }
        if (req.body.password !== undefined) {
            user.password = md5(data.password);
        }
        user.set(req.body);
        await user.save();
        delete user._doc.password;
        return res.status(200).json({
            isSuccess: true,
            user: user
        });
    } catch (err) {
        // return res.status(400).json({
        //     isSuccess: false,
        //     error: err
        // });
        return next(err);
    }
};

UserController.deleteUser = async (req, res, next) => {
    try {
        const _id = req.params.id;
        //const user = await User.findByIdAndDelete(id)
        // return res.json({
        //     isSuccess: true
        // });
        const user = await User.findById(_id);
        if (!user) {
            // return status(400).json({
            //     isSuccess: false,
            //     message: 'User is not found!'
            // });
            return next(new Error('User not found!'));
        }
        user.isDelete = true;
        await user.save();
        return res.status(200).json({
            isSuccess: true,
            message: 'Delete Success!'
        });
        //return next(new Error('Success!'));
    } catch (err) {
        // return res.status(400).json({
        //     isSuccess: false,
        //     error: err
        // });
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
        const isCorrectPassword = md5(password) === user.password;
        if (!isCorrectPassword) {
            return next(new Error('password is not correct'));
        }
        delete user._doc.password;
        return res.json({
            isSuccess: true,
            user
        });
    } catch (e) {
        return next(e);
    }
};

export default UserController;

import User from '../models/user';

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
        const { password, refName, firstName, gender, email } = req.body;
        if (!password) {
            return next(new Error('password is required field'));
        }
        if (!refName) {
            return next(new Error('refName is required field'));
        }
        if (!firstName) {
            return next(new Error('firstName is required field'));
        }
        if (!gender) {
            return next(new Error('gender is required field'));
        }
        if (!email) {
            return next(new Error('email is required field'));
        }
        const user = new User({
            password,
            refName,
            firstName,
            gender,
            email
        });
        await user.save();
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
        const { password, refName, firstName, gender, email } = req.body;
        if (!password) {
            // return res.status(400).json({
            //     isSuccess: false,
            //     message: 'password is required field'
            // });
            return next(new Error('password is required field'));
        }
        if (!refName) {
            // return res.status(400).json({
            //     isSuccess: false,
            //     message: 'refName is required field'
            // });
            return next(new Error('refName is required field'));
        }
        if (!firstName) {
            // return res.status(400).json({
            //     isSuccess: false,
            //     message: 'firstName is required field'
            // });
            return next(new Error('firstName is required field'));
        }
        if (!gender) {
            // return res.status(400).json({
            //     isSuccess: false,
            //     message: 'gender is required field'
            // });
            return next(new Error('gender is required field'));
        }
        if (!email) {
            // return res.status(400).json({
            //     isSuccess: false,
            //     message: 'email is required field'
            // });
            return next(new Error('email is required field'));
        }
        const user = await User.findByIdAndUpdate(id, {
            email: req.body.email,
            refName: req.body.refName,
            firstName: req.body.firstName,
            gender: req.body.gender,
            email: req.body.email
        }, { new: true })
        return res.json({
            isSuccess: true,
            message: 'Update Success!',
            user
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

export default UserController;

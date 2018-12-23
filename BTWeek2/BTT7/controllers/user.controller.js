import User from '../models/user';

const UserController = {};

UserController.getAll = async (req, res) => {
    try {
        await User.find().sort('-dateAdded').exec((err, users) => {
            if (err) {
                res.status(500).send(err);
            }
            return res.json({
                isSuccess: true,
                users,
            });
        });
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            message: err.message,
            error: err
        });
    }
};

UserController.getOneUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findById({ _id: id }).exec((err, user) => {
            if (err) {
                res.status(200).send(err);
            }
            return res.json({
                isSuccess: true,
                user: user
            });
        });
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            error: err
        })
    }
};

UserController.addUser = async (req, res) => {
    try {
        const { password, refName, firstName, gender, email} = req.body;
        if(!password) {
            return res.status(400).json('password is required field');
        }
        if(!refName) {
            return res.status(400).json('refName is required field');
        }
        if(!firstName) {
            return res.status(400).json('firstName is required field');
        }
        if(!gender) {
            return res.status(400).json('gender is required field');
        }
        if(!email) {
            return res.status(400).json('email is required field');
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
         })
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            error: err
        })
    }
};

UserController.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const { password, refName, firstName, gender, email} = req.body;
        if(!password) {
            return res.status(400).json('password is required field');
        }
        if(!refName) {
            return res.status(400).json('refName is required field');
        }
        if(!firstName) {
            return res.status(400).json('firstName is required field');
        }
        if(!gender) {
            return res.status(400).json('gender is required field');
        }
        if(!email) {
            return res.status(400).json('email is required field');
        }
        await User.findByIdAndUpdate(id, {
            email: req.body.email,
            refName: req.body.refName,
            firstName: req.body.firstName,
            gender: req.body.gender,
            email: req.body.email
        }, { new: true }).exec((err, user) => {
            if (err) {
                res.status(200).send(err);
            }
            return res.json({
                isSuccess: true,
                user
            });
        });
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            error: err
        })
    }
};

UserController.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        await User.findByIdAndDelete(id).exec((err, user) => {
            if (err) {
                res.status(400).send(err);
            }
            return res.json({
                isSuccess: true
            });
        });
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            error: err
        })
    }
};

export default UserController;

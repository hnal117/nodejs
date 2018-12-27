import Group from '../models/group';

const GroupController = {};

GroupController.getAll = async (req, res, next) => {
    try {
        const groups = await group.find().populate('author');
        if (!groups) {
            return next(new Error('group not found!'));
        }
        return res.status(200).json({
            isSuccess: true,
            groups
        });
    } catch (err) {
        return next(err);
    }
};

GroupController.getOneGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const group = await Group.findOne({ _id }).populate('author');
        if (!group) {
            return next(new Error('group not found!'));
        }
        return res.status(200).json({
            isSuccess: true,
            group
        });
    } catch (err) {
        return next(err);
    }
};

GroupController.addGroup = async (req, res, next) => {
    try {
        const { name, lastMessage, author, member } = req.body;
        if (!name) {
            return next(new Error('name is required field!'));
        }
        if (!author) {
            return next(new Error('author is required field!'));
        }
        const group = new Group({
            ...req.body
        });
        await group.save();
        return res.status(200).json({
            isSuccess: true,
            group
        });
    } catch (err) {
        return next(err);
    }
}

GroupController.updateGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const { name, author } = req.body;
        if (!name) {
            return next(new Error('name is require!d field!'));
        }
        if (!author) {
            return next(new Error('author is required field!'));
        }
        const group = await Group.findOne({ _id });
        if (!group) {
            return next(new Error('group not found!!'));
        }
        group.set(req.body);
        await group.save();
        return res.status(200).json({
            isSuccess: true,
            message: 'Update success!',
        });
    } catch (err) {
        return next(err);
    }
};

GroupController.deleteGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const group = await Group.findOne(_id);
        if (!group) {
            return next(new Error('group not found!'));
        }
        group.deleteAt = Date.now();
        await group.save();
        return res.status(200).json({
            isSuccess: true,
            message: 'Delete success!'
        });
    } catch (err) {
        return next(err);
    }
};

export default GroupController;
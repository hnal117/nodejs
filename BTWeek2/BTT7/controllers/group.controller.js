import Group from '../models/group';
import helper from '../helper/response-handle';
const GroupController = {};

GroupController.getAll = async (req, res, next) => {
    try {
        const { page, limit } = req.query;
        const skip = (parseInt(page) - 1) * limit;
        const groups = await Group.find()
            .populate([{
                path: 'author',
                select: 'email fullName gender'
                //where: {
                //    _id:edsfsdf
                //}
            }
                // {
                //     path: 'members',
                //     select: 'email fullName gender'
                //     //where: {
                //     //    _id:edsfsdf
                //     //}
                // }
            ])
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);
        if (!groups) {
            return next(new Error('group not found!'));
        }
        // return res.status(200).json({
        //     isSuccess: true,
        //     groups
        // });
        helper.returnSuccess(res, groups);
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
        // return res.status(200).json({
        //     isSuccess: true,
        //     group
        // });
        helper.returnSuccess(res, group);
    } catch (err) {
        return next(err);
    }
};

GroupController.addGroup = async (req, res, next) => {
    try {
        const { members, name } = req.body;
        members.push(req.user._id);
        const author = req.user._id;
        const setOfMembers = new Set();
        for (const member of members) {
            setOfMembers.add(member);
        }
        const addedMember = Array.from(setOfMembers);
        var type = '';
        if (addedMember.length > 2) {
            type = 'public';
        }
        else {
            type = 'private';
        }
        const group = new Group({
            name,
            members: addedMember,
            author,
            type
        });
        await group.save();
        // return res.json({
        //     isSuccess: true,
        //     group
        // });
        helper.returnSuccess(res, group);
    } catch (err) {
        return next(err);
    }
}

GroupController.updateGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const { name, author } = req.body;
        if (!name) {
            return next(new Error('name is required field!'));
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
        // return res.status(200).json({
        //     isSuccess: true,
        //     message: 'Update success!',
        // });
        helper.returnSuccess(res, { message: 'Update success' });
    } catch (err) {
        return next(err);
    }
};

GroupController.deleteGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const group = await Group.findOne({ _id });
        if (!group) {
            return next(new Error('group not found!'));
        }
        group.deletedAt = Date.now();
        await group.save();
        // return res.status(200).json({
        //     isSuccess: true,
        //     message: 'Delete success!'
        // });
        helper.returnSuccess(res, { message: 'Delete Success0' });
    } catch (err) {
        return next(err);
    }
};

GroupController.addMemberToGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const { members } = req.body;
        const group = await Group.findOne({ _id });
        if (!group) {
            return next(new Error('group not found!'));
        }
        //console.log(members);
        // console.log(group.members);
        // console.log(group._id);
        members.map(member => group.members.push(member));
        //console.log(group.members);
        await group.save();
        // return res.status(200).json({
        //     isSuccess: true,
        //     message: 'Insert success!'
        // });
        helper.returnSuccess(res, { message: 'Insert success!' });
    } catch (err) {
        return next(err);
    }
};

GroupController.deleteMemberToGroup = async (req, res, next) => {
    try {
        const _id = req.params.id;
        const memberid = req.params.memberid;
        const group = await Group.findOne({ _id });
        if (!group) {
            return next(new Error('group not found!'));
        }
        console.log(typeof (memberid) + ' ' + memberid + '.');
        let i = 0;
        for (var item in group.members) {
            console.log(item);

            if (item.toString() === memberid) {
                console.log(typeof (item.toString()) + typeof (memberid));
                console.log('1');
                group.members.splice(i, 1)
                await group.save();
                // return res.status(200).json({
                //     isSuccess: true,
                //     message: 'Delete member success!'
                // });
                helper.returnSuccess(res, { message: 'Delete member success!' });
            }
            i++;
        }
        return next(new Error('member not found!'));
    } catch (err) {
        return next(err);
    }
};


export default GroupController;
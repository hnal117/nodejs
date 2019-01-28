import User from '../models/user';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required field!'],
        maxlength: [255, 'name is too long!'],
        unique: true
    },
    lastMessage: {
        type: Schema.Types.ObjectId
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'author is required field!']
    },
    members: [{
        type: Schema.Types.ObjectId
    }],
    deletedAt: {
        type: Date,
        default: null
    },
    type: {
        type: String,
        enum: ['public', 'private']
    }
}, { timestamps: true });

function checkDeleted(_this) {
    const query = _this.getQuery();
    query['$or'] = [
        {
            deletedAt: null
        }
    ]
}

groupSchema.pre('find', function () {
    checkDeleted(this);
});

groupSchema.pre('findOne', function () {
    checkDeleted(this);
});

groupSchema.pre('findById', function () {
    checkDeleted(this);
});


groupSchema.pre('save', async function (next) {
    let user = await User.findOne({ _id: this.author });
    //console.log(this.author)
    if (!user) {
        return next(new Error('Author not found!!'));
    }

    // user = await User.findOne({ _id: this.lastMessage });
    // if (!user) {
    //     return next(new Error('lastMessage not found!!'));
    // }

    let users = await User.find({ _id: this.members });
    if (users.length !== this.members.length) {
        return next(new Error('Member not found!!'));
    }
});

let Group = mongoose.model('Group', groupSchema);
export default Group;
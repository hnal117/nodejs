import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let groupSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required field!'],
        maxlength: [255, 'name is too long!'],
    },
    lastMessage: { 
        type: mongoose.Schema.Types.ObjectId
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'author is required! field']
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    deleteAt: {
        type: Date,
        default: null
    }
});

groupSchema.pre('find', function () {
    const query = this.getQuery();
    query['$or'] = [
        {
            deleteAt: null
        }
    ]
});

groupSchema.pre('findOne', function () {
    const query = this.getQuery();
    query['$or'] = [
        {
            deleteAt: null
        }
    ]
});

let Group = mongoose.model('Group', groupSchema);
export default Group;
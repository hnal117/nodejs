import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let truckSchema = new Schema({
    no: String,
    branch: String,
    number: String
});

let Truck = mongoose.model('Truck', truckSchema);

export default Truck;
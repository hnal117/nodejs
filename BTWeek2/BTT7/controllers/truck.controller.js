import Truck from '../models/truck';

const TruckController = {};

TruckController.addTruck = async (req, res) => {
    try {
        const { no, branch, number } = req.body;
        if(!branch) {
            return res.status(400).json('branch is required field');
        }
        const truck = new Truck({
            no, 
            branch, 
            number
        });
        await truck.save();
        return res.status(200).json({ 
            isSuccess: false,
            truck
         })
    } catch (err) {
        return res.status(400).json({
            isSuccess: false,
            error: err
        })
    }
};

export default TruckController;

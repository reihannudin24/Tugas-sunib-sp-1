
const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');
    }catch (err){
        console.error('Error connection : ', err);
        process.exit(1);
    }
}

module.exports = connectDB;
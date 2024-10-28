import mongoose from 'mongoose';

const collection = "Writings"
const schema = new mongoose.Schema({

	title: {
        type:String,
        required:true
    },
    text: {
        type:String,
        required:true
    },
    date: {
        type:Date,
        default:Date.now
    },
    file: {
        type:String,
        required:true
    }
});

const writingModel = mongoose.model(collection,schema);
export default writingModel;
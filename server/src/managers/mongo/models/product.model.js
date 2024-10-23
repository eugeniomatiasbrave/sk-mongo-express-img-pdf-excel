import mongoose from 'mongoose';

const collection = "Products"
const schema = new mongoose.Schema({

	name: {
        type:String,
        required:true
    },
    price: {
        type:Number,
        required:true
    },
    image: {
		type:Array,
	    required:true
    }
	
});

const productModel = mongoose.model(collection,schema);
export default productModel;
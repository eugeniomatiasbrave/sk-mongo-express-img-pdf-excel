
import writingModel from './models/writings.model.js';

export default class WritingsManagers {
	
    getWritings() {
		return writingModel.find({}).lean();
	};

    createWriting(wtn){ // Crea uno nuevo
        return writingModel.create(wtn);
    };

    getWritingById (wid) { // Busca solo uno
		return writingModel.findOne({_id:wid}).lean(); 
	};

};
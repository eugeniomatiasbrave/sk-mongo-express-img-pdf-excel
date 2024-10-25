import { writingsService } from "../managers/index.js";

const createWriting = async (req, res) => {

	try {
		const { title, text } = req.body;

		// Validar que los campos requeridos estén presentes
		if (!title || !text ) {
			return res.status(400).json({ status: "error", error: 'Faltan datos para crear el pdf' });
		}

		const newWriting = {
			title,
			text
        }
		
		const writing = await writingsService.createWriting(newWriting);

		res.json({ status: "success", message: 'Pdf creado', payload: writing });

	}
	catch (error) {
		console.error('Error al crear el pdf:', error);
		res.status(500).send({ status: "error", error: 'Error al crear el pdf' });
	}
}

const getWritings = async (req, res) => { 
	try {
		const writings = await writingsService.getWritings();
		res.json({ status: "success", message: 'Pdfs obtenidos', payload: writings });
	}
	catch (error) {
		console.error('Error al obtener los writtens:', error);
		res.status(500).send({ status: "error", error: 'Error al obtener los writtens' });
	}
}

const getWritingById = async (req, res) => {
	const {wid} = req.params;

	try {
		const writing = await writingsService.getWritingById(wid);

		if (!writing) {
			return res.status(404).send({ status: "error", error: 'Pdf no encontrado' });
		}

		res.json({ status: "success", data: writing });

	} catch (error) {
		console.error('Error al obtener el pdf:', error);
		res.status(500).send({ status: "error", error: 'Error al obtener el pdf' });
	}
}


export default  {
    createWriting,
	getWritings,
	getWritingById
}
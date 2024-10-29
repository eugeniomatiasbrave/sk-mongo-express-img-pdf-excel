import { writingsService } from '../managers/index.js';
import createPdf from '../libs/pdf-creator.js';
import createXlsx from "../libs/xlsx-creator.js";
import path from 'path';
import __dirname from '../utils.js';

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

const deleteWriting = async (req, res) => {
	const {wid} = req.params;

	try {
		const writing = await writingsService.deleteWriting(wid);

		if (!writing) {
			return res.status(404).send({ status: "error", error: 'Pdf no encontrado' });
		}

		res.json({ status: "success", message: 'Pdf eliminado' });

	} catch (error) {
		console.error('Error al eliminar el pdf:', error);
		res.status(500).send({ status: "error", error: 'Error al eliminar el pdf' });
	}
}

const createPDFId = async (req,res) => {
	const {html,id} = req.body;

	try {
        // Crear el PDF
		const pdfFileName = `${id}.pdf`;
        const pdfPath = path.join(__dirname, 'public/files/pdfs', pdfFileName);
        await createPdf({ html, path: pdfPath });
        // Devolver la URL del PDF
		const pdfUrl = `/files/pdfs/${pdfFileName}`;
		res.json({ status: "success", message: 'PDF creado', url: pdfUrl });
    } catch (error) {
        console.error('Error al crear el PDF:', error);
        res.status(500).send({ status: "error", error: 'Error al crear el PDF' });
    }
	
}

const createXLSX = async (req, res) => {
	const { data } = req.body;
	
	console.log('Data recibida - ruta:', req.body);

	try {
		
		const xlsxPath = path.join(__dirname, 'public/files/xlsx', path.basename('writings.xlsx'));
		await createXlsx({ data, path: xlsxPath });
		const xlsxUrl = `/files/xlsx/${path.basename('writings.xlsx')}`;

		res.json({ status: "success", message: 'XLSX creado', url: xlsxUrl });
	} catch (error) {
		console.error('Error al crear el XLSX:', error);
		res.status(500).send({ status: "error", error: 'Error al crear el XLSX' });
	}

}



export default  {
    createWriting,
	getWritings,
	getWritingById,
	deleteWriting,
	createPDFId,
	createXLSX
}
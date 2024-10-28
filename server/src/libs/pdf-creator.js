import pdf from 'pdf-creator-node';

export default async function createPdf({ html, path }) {
    try {

		if (fs.existsSync(path)) {
            return path; // Devolver la ruta del archivo existente
        }
		
        let document = {
            html,
            data: {},
            path,
        };

        let options = {
            format: "A4",
            orientation: "portrait",
            border: "10mm"
        };

        await pdf.create(document, options);

        return document.path;
    } catch (error) {
        return error;
    }
}
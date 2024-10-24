
import { productsService } from "../managers/index.js";


const getProducts =  async (req, res) => {
    try {
        const products = await productsService.getProducts();
        if (!products) {
            return res.status(400).json({ status: "error", error: 'Error al obtener los productos' });
        }
        res.json({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
};


//Endpoint para crear una producto.
const createProduct = async (req, res) => {
    const { name, price } = req.body;

    // Validar que los campos requeridos estén presentes
    if (!name || !price ) {
        return res.status(400).json({ status: "error", error: 'Faltan datos para crear el producto' });
    }

    try {
        const newProduct = {
            name,
            price,
            image:[] // Guardar el nombre del archivo de la imagen
        };

        if (req.files && req.files.length > 0) {
            for (let i = 0; i < req.files.length; i++) {
                newProduct.image.push({ maintype: req.files[i].mimetype, path: `/files/products/${req.files[i].filename}`, main: i == 0 });
            }
        } else {
            // Usar la imagen por defecto
            newProduct.image.push({ maintype: 'image/webp', path: '/files/default/webp-800x450.webp', main: true });
        }
        const result = await productsService.createProduct(newProduct);

        // CREAR LUEGO UNA FUNCION / VALIDACION O CONDICIONAL PARA BORRAR LA IMAGEN SI NO SE CREA EL PRODUCTO

        if (!result) {
            return res.status(500).send({ status: "error", error: 'Error al crear el producto' });
        }

        res.json({ status: "success", message: 'Producto creado', payload: result });

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error: error.message });
    }
};

const deleteProduct = async (req, res) => {
    const {pid} = req.params;
    try {
        const product = await productsService.getProductById(pid);

        if (!product) {
            return res.status(404).send({ status: "error", error: 'El producto que intentas borrar no existe' });
        }

        const deletedProduct = await productsService.deleteProduct(pid);

        if (!deletedProduct) {
            return res.status(500).send({ status: "error", error: 'Error al borrar el producto' });
        }

        res.send({ status: "success", data: deletedProduct });

    } catch (error) {
        console.error('Error al borrar el producto:', error);
        res.status(500).send({ status: "error", error: 'Hubo un problema al intentar borrar el producto' });
    }
};

const getProductById =   async (req, res) => {
    const {pid} = req.params;

    try {
        const product = await productsService.getProductById(pid);

        if (!product) {
            return res.status(404).send({ status: "error", error: 'Producto no encontrado' });
        }

        res.json({ status: "success", data: product });

    } catch (error) {
        console.error('Error al obtener el producto:', error);
        res.status(500).send({ status: "error", error: 'Error al obtener el producto' });
    }
};

const updatedProduct =  async (req, res) => { // esta correcto: 27/09 8:02 am , no cambiar
    
        const { pid } = req.params;
        const updateData = req.body;

        if (!updateData) {
            return res.status(400).json({ status: "error", error: 'Faltan datos para actualizar el producto' });
        }

        try {
            const product = await productsService.getProductById(pid);

            if (!product) {
                return res.status(404).send({ status: "error", error: 'Producto no encontrado' });
            }

            const updatedProduct = await productsService.updateProduct(pid, updateData);

            if (!updatedProduct) {
                return res.status(500).send({ status: "error", error: 'Error al actualizar el producto' });
            }

            res.send({ status: "success", data: updatedProduct });

        } catch (error) {
            console.error('Error al actualizar el producto:', error);
            res.status(500).send({ status: "error", error: 'Error al actualizar el producto' });
        } 
};


export default  {
    getProducts,
    createProduct,
    deleteProduct,
    getProductById,
    updatedProduct
}





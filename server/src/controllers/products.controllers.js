import { Router } from "express";
import { productsService } from "../managers/index.js";

const router = Router();

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
 const createProduct =  async (req, res) => {
    const { name, price } = req.body;

    try {
        const newProduct = {
            name,
			price,
			image: req.file 
     };

        const result = await productsService.createProduct(newProduct);

        if (!result) {
            return res.status(500).send({ status: "error", error: 'Error' });
        }

        res.json({ status: "success", message: 'Product created', payload: result }); // data: result es el producto creado.

    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', error: error });
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
    try {
        const { pid } = req.params;
        const updateData = req.body;

        if (!updateData.name || !updateData.image) {
            return res.status(400).send({ status: "error", error: 'Faltan datos para actualizar el producto' });
        }
       
        const result = await productsService.updateProduct(pid, updateData);

        const updatedProduct = await productsService.getProductById(pid);
        res.json({ status: "success", message: `Producto actualizado id: ${pid}`, data: updatedProduct });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).send({ status: "error", error: 'Error al actualizar el producto' });
    }
};

export {
    getProducts,
    createProduct,
    deleteProduct,
    getProductById,
    updatedProduct
};

export default router;

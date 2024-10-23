import express from "express";
import path from "path";
import  __dirname from "./utils.js";
import productsRouter from "./routes/products.router.js";
import mongoose from 'mongoose';
import config from './config/config.js';

const app = express();
const PORT = config.app.PORT;

mongoose.connect(config.mongo.URL);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos desde la carpeta 'public'
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos desde la carpeta 'uploads'

app.use('/api/products', productsRouter);
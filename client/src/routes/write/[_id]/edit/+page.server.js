import { redirect, error } from '@sveltejs/kit';
const API_URL = process.env.VITE_API_URL;

export async function load({ params }) {
    const { _id } = params;

    try {
        const getProduct = async () => {
            const response = await fetch(`${API_URL}/products/${_id}`);
            const data = await response.json();
            if (!response.ok) {
                throw new Error('Product not found');
            }
            return data;
        }
        return {
            product: await getProduct(),
        };
    } catch (err) {
        return error( 404, err.message );
    }
}

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const pid = formData.get('id');
		const name = formData.get('name');
		const price = formData.get('price');
		const image = formData.get('image');

		console.log('name:', name, 'price:', price, 'image:', image); //llega la imagen

        if (isNaN(price)) {
            return { success: false, error: 'Error, is not a number' };
        }

        if (!name || !price || !image) {
            return { success: false, error: 'Error Data ' };
        }

        const uploaderFormData = new FormData();
        uploaderFormData.append('name', name);
        uploaderFormData.append('price', price);
        uploaderFormData.append('image', image);

		console.log('newProductFormData:', uploaderFormData); 

        const result = await fetch(`${API_URL}/products/${pid}`, {
            method: 'PUT',
            body: uploaderFormData,
        });

        if (!result.ok) {
            return { success: false, error: 'Error' };
        }
        
        throw redirect(303, '/products');
    }
}
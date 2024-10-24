import { redirect } from '@sveltejs/kit';

const API_URL = process.env.VITE_API_URL;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
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

        const newProductFormData = new FormData();
        newProductFormData.append('name', name);
        newProductFormData.append('price', price);
        newProductFormData.append('image', image);

		console.log('newProductFormData:', newProductFormData); 

        const result = await fetch(`${API_URL}/products`, {
            method: 'POST',
            body: newProductFormData,
        });

        if (!result.ok) {
            return { success: false, error: 'Error' };
        }

        throw redirect(303, '/products');
    }
	}

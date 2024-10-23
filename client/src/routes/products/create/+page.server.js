import { redirect } from '@sveltejs/kit';

const API_URL = process.env.VITE_API_URL;

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const name = formData.get('name');
		const price = formData.get('price');
		//const image = formData.get('image');

		if (isNaN(price)) {
			return { success: false, error: 'Error, is not an number' };
		}

		if (!name || !price ) {
			return { success: false, error: 'Error Data ' };
		}

		const newProduct = {
			name,
			price
		};

		const result = await fetch(`${API_URL}/products`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newProduct),
		});

		if (!result.ok) {
			return { success: false, error: 'Error' };
		}

		throw redirect(303, '/products');
	}
}
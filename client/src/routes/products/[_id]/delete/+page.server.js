import { redirect } from '@sveltejs/kit';
const API_URL = process.env.VITE_API_URL;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const pid = formData.get('pid');

        if (!pid) {
            return { success: false, error: 'Product ID is required' };
        }

        const result = await fetch(`${API_URL}/products/${pid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!result.ok) {
            return { success: false, error: 'Error deleting product' };
        }

        throw redirect(303, '/products');
    }
}
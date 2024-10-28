import { redirect } from '@sveltejs/kit';
const API_URL = process.env.VITE_API_URL;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const wid = formData.get('wid');

        if (!wid) {
            return { success: false, error: 'Doc ID is required' };
        }

        const result = await fetch(`${API_URL}/writings/${wid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!result.ok) {
            return { success: false, error: 'Error deleting product' };
        }

        throw redirect(303, '/write');
    }
}
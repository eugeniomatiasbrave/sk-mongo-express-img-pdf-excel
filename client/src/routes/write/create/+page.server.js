import { redirect } from '@sveltejs/kit';

const API_URL = process.env.VITE_API_URL;

export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const title = formData.get('title');
        const text = formData.get('text');

        const body = {
            title,
            text
        };

        const response = await fetch(`${API_URL}/writings`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(body),
        });

        if (response.ok) {
            throw redirect(303, '/write');
        } else {
            return {
                status: response.status,
                errors: new Error('Failed to create writing')
            };
        }
    }
};


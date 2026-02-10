'use server';

import { createSession, deleteSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function login(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // Get the redirect URL from the form data, or default to dashboard
    const redirectTo = formData.get('redirect') as string || '/admin/dashboard';

    // Simple environment variable check
    if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
    ) {
        await createSession();
        // Redirect to the intended destination
        redirect(redirectTo);
    } else {
        return {
            error: 'Invalid email or password',
        };
    }
}

export async function logout() {
    await deleteSession();
    revalidatePath('/'); // Revalidate to update UI state if needed
    redirect('/admin');
}

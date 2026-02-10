'use server';

import { createUserSession } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { createUser, getUserByEmail, validateCredentials } from '@/lib/userStorage';
import { revalidatePath } from 'next/cache';

// User Registration Action
export async function userRegister(prevState: any, formData: FormData) {
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const redirectTo = formData.get('redirect') as string || '/';

    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        return {
            error: 'All fields are required',
        };
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return {
            error: 'Please enter a valid email address',
        };
    }

    // Password match validation
    if (password !== confirmPassword) {
        return {
            error: 'Passwords do not match',
        };
    }

    // Password strength validation
    if (password.length < 6) {
        return {
            error: 'Password must be at least 6 characters long',
        };
    }

    // Check if email already exists
    const existingUser = getUserByEmail(email);
    if (existingUser) {
        return {
            error: 'Email already registered. Please login instead.',
        };
    }

    try {
        // Create new user
        const newUser = createUser({
            firstName,
            lastName,
            email,
            password, // In production, hash this password!
        });

        // Create session for the new user
        await createUserSession(email);
        revalidatePath('/');
    } catch (error) {
        console.error('Registration error:', error);
        return {
            error: 'Failed to create account. Please try again.',
        };
    }

    // Redirect MUST be outside try-catch to work in Next.js server actions
    redirect(redirectTo);
}

// User Login Action
export async function userLogin(prevState: any, formData: FormData) {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const redirectTo = formData.get('redirect') as string || '/';

    // Validation
    if (!email || !password) {
        return {
            error: 'Please provide email and password',
        };
    }

    // Validate credentials against stored users
    const user = validateCredentials(email, password);

    if (!user) {
        return {
            error: 'Invalid email or password',
        };
    }

    try {
        // Create session for the user
        await createUserSession(email);
        revalidatePath('/');
    } catch (error) {
        console.error('Login error:', error);
        return {
            error: 'Failed to login. Please try again.',
        };
    }

    // Redirect MUST be outside try-catch to work in Next.js server actions
    redirect(redirectTo);
}

// User Logout Action
export async function logout() {
    const { deleteUserSession } = await import('@/lib/auth');
    const { revalidatePath } = await import('next/cache');

    await deleteUserSession();
    revalidatePath('/'); // Revalidate to update Navbar state
    redirect('/');
}

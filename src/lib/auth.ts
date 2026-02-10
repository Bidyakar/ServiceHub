
import { cookies } from 'next/headers';

const ADMIN_SESSION_COOKIE_NAME = 'admin_session';
const USER_SESSION_COOKIE_NAME = 'user_session';
// 24 hours
const SESSION_DURATION = 60 * 60 * 24 * 1000;

// Admin authentication functions
export async function createSession() {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_SESSION_COOKIE_NAME, 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: SESSION_DURATION,
        path: '/',
        sameSite: 'lax',
    });
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_SESSION_COOKIE_NAME);
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(ADMIN_SESSION_COOKIE_NAME);
    return !!session?.value;
}

// User authentication functions
export async function createUserSession(email: string) {
    const cookieStore = await cookies();
    cookieStore.set(USER_SESSION_COOKIE_NAME, email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: SESSION_DURATION,
        path: '/',
        sameSite: 'lax',
    });
}

export async function deleteUserSession() {
    const cookieStore = await cookies();
    cookieStore.delete(USER_SESSION_COOKIE_NAME);
}

export async function getUserSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(USER_SESSION_COOKIE_NAME);
    return session?.value || null;
}

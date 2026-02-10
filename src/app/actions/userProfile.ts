'use server';

import { getUserSession } from '@/lib/auth';
import { getUserByEmail, updateUserByEmail, updatePasswordByEmail, validateCredentials } from '@/lib/userStorage';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Update Profile Information
export async function updateProfileInfo(prevState: any, formData: FormData) {
    const email = await getUserSession();
    if (!email) return { error: 'Not authenticated' };

    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const phone = formData.get('phone') as string;
    const address = formData.get('address') as string;

    if (!firstName || !lastName) {
        return { error: 'First name and last name are required' };
    }

    try {
        const updatedUser = updateUserByEmail(email, {
            firstName,
            lastName,
            phone,
            address
        });

        if (!updatedUser) return { error: 'User not found' };

        revalidatePath('/');
        revalidatePath('/profile');
    } catch (error) {
        console.error('Update profile error:', error);
        return { error: 'Failed to update profile' };
    }

    redirect('/');
}

// Update User Avatar
export async function updateUserAvatar(avatarUrl: string) {
    const email = await getUserSession();
    if (!email) return { error: 'Not authenticated' };

    try {
        const updatedUser = updateUserByEmail(email, { avatar: avatarUrl });
        if (!updatedUser) return { error: 'User not found' };

        revalidatePath('/');
        revalidatePath('/profile');
        return { success: 'Avatar updated successfully', avatar: avatarUrl };
    } catch (error) {
        console.error('Update avatar error:', error);
        return { error: 'Failed to update avatar' };
    }
}

// Change User Password
export async function changeUserPassword(prevState: any, formData: FormData) {
    const email = await getUserSession();
    if (!email) return { error: 'Not authenticated' };

    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!currentPassword || !newPassword || !confirmPassword) {
        return { error: 'All fields are required' };
    }

    if (newPassword !== confirmPassword) {
        return { error: 'New passwords do not match' };
    }

    if (newPassword.length < 6) {
        return { error: 'Password must be at least 6 characters long' };
    }

    try {
        // Validate current password
        const user = validateCredentials(email, currentPassword);
        if (!user) {
            return { error: 'Current password is incorrect' };
        }

        const success = updatePasswordByEmail(email, newPassword);
        if (!success) return { error: 'Failed to update password' };

        return { success: 'Password changed successfully' };
    } catch (error) {
        console.error('Change password error:', error);
        return { error: 'Failed to change password' };
    }
}

// Fetch current user details
export async function getCurrentUser() {
    const email = await getUserSession();
    if (!email) return null;

    return getUserByEmail(email);
}

import fs from 'fs';
import path from 'path';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    createdAt: string;
    avatar?: string;
    phone?: string;
    address?: string;
}

const USERS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'users.json');

// Ensure the data directory exists
function ensureDataDirectory() {
    const dataDir = path.dirname(USERS_FILE_PATH);
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
}

// Read all users from the JSON file
export function getAllUsers(): User[] {
    try {
        ensureDataDirectory();
        if (!fs.existsSync(USERS_FILE_PATH)) {
            fs.writeFileSync(USERS_FILE_PATH, '[]', 'utf-8');
            return [];
        }
        const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading users:', error);
        return [];
    }
}

// Save all users to the JSON file
function saveUsers(users: User[]) {
    ensureDataDirectory();
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), 'utf-8');
}

// Find a user by email
export function getUserByEmail(email: string): User | null {
    const users = getAllUsers();
    return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

// Create a new user
export function createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const users = getAllUsers();

    // Generate unique ID (timestamp + random string)
    const id = `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    const newUser: User = {
        id,
        ...userData,
        createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    return newUser;
}

// Update an existing user
export function updateUserByEmail(email: string, userData: Partial<User>): User | null {
    const users = getAllUsers();
    const index = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());

    if (index === -1) return null;

    // We don't allow changing email as it's our key in many places for now
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email: _, id: __, password: ___, createdAt: ____, ...updates } = userData;

    users[index] = {
        ...users[index],
        ...updates
    };

    saveUsers(users);
    return users[index];
}

// Update user password
export function updatePasswordByEmail(email: string, newPassword: string): boolean {
    const users = getAllUsers();
    const index = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());

    if (index === -1) return false;

    users[index].password = newPassword;
    saveUsers(users);
    return true;
}

// Validate user credentials
export function validateCredentials(email: string, password: string): User | null {
    const user = getUserByEmail(email);
    if (!user) return null;

    // Simple password check (in production, use proper password hashing)
    if (user.password === password) {
        return user;
    }

    return null;
}

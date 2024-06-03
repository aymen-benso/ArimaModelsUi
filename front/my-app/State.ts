import { persist } from 'zustand/middleware';
import {create} from 'zustand';

interface LoginState {
    username: string;
    password: string;
    isLoggedIn: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

// Create the store
const useLoginStore = create<LoginState>((set) => ({
    username: '',
    password: '',
    isLoggedIn: false,
    login: (username, password) => {
        // Perform login logic here
        // For example, send a request to the server to validate the credentials
        // If the credentials are valid, set isLoggedIn to true and save the credentials in a cookie
        set({ username, password, isLoggedIn: true });
        document.cookie = `username=${username}; password=${password}`;
    },
    logout: () => {
        // Perform logout logic here
        // For example, clear the saved credentials from the cookie and set isLoggedIn to false
        set({ username: '', password: '', isLoggedIn: false });
        document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'password=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
}));

export default useLoginStore;
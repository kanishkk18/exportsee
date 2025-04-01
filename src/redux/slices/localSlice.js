

import { createSlice } from '@reduxjs/toolkit';

// Utility function to safely parse JSON from localStorage
const getLocalStorageItem = (key) => {
    try {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : null; // Return `null` if no value is found
    } catch (error) {
        console.error(`Error parsing localStorage item "${key}":`, error);
        return null; // Return `null` if parsing fails
    }
};

const initialState = {
    user: getLocalStorageItem('user'),
};

const localSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // Persist the user in localStorage
            window.localStorage.setItem('user', JSON.stringify(action.payload));
        },
        clearUser: (state) => {
            state.user = null;
            // Remove the user from localStorage
            window.localStorage.removeItem('user');
        },
    },
});

export const { setUser, clearUser } = localSlice.actions;

export default localSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import { cityReducer } from './slices/citySlice.ts';
import { listenerMiddleware } from './types.ts';

export const store = configureStore({
    reducer: {
        city: cityReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

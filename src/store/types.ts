import type { store } from './root';
import { createListenerMiddleware } from '@reduxjs/toolkit';
import type { TypedStartListening } from '@reduxjs/toolkit';

export type RootStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// listenerMiddleware
export const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootStore, AppDispatch>;

export const startAppListening =
    listenerMiddleware.startListening as AppStartListening;

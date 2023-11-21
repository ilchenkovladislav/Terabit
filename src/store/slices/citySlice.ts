import { createSlice } from '@reduxjs/toolkit';
import { City } from '../../models/city/city.ts';
import { startAppListening } from '../types.ts';
import {
    deleteStoredCity,
    storeCity,
} from '../../utilities/localStorageUtility.ts';

interface CityState {
    items: City[];
    status: 'init' | 'success';
}

const initialState: CityState = {
    items: [],
    status: 'init',
};

export const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {
        addStoredCities(state, action) {
            state.status = 'success';
            state.items = action.payload;
        },
        addCity(state, action) {
            state.items.push(action.payload);
        },
        deleteCity(state, action) {
            state.items.splice(action.payload, 1);
        },
        toggleFavoriteCity(state, action) {
            state.items[action.payload].isFavorite =
                !state.items[action.payload].isFavorite;
        },
    },
});

startAppListening({
    actionCreator: citySlice.actions.deleteCity,
    effect: (action, listenerApi) => {
        const index = action.payload;
        const state = listenerApi.getOriginalState().city.items;
        deleteStoredCity(state[index]);
    },
});

startAppListening({
    actionCreator: citySlice.actions.toggleFavoriteCity,
    effect: (action, listenerApi) => {
        const index = action.payload;
        const state = listenerApi.getState().city.items;

        if (state[index].isFavorite) {
            storeCity(state[index]);
        } else {
            deleteStoredCity(state[index]);
        }
    },
});

export const { reducer: cityReducer, actions: cityActions } = citySlice;

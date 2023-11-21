import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useActionCreators, useStateSelector } from './store/hooks';
import { getStoredCities } from './utilities/localStorageUtility/localStorageUtility.ts';
import { cityActions } from './store/slices/citySlice';

import { HomePage } from './pages/HomePage/HomePage';
import { WeatherWeek } from './pages/WeatherWeek/WeatherWeek';
import { NotFound } from './pages/NotFound/NotFound';

function App() {
    const cityStatus = useStateSelector((state) => state.city.status);
    const actions = useActionCreators(cityActions);

    useEffect(() => {
        if (cityStatus === 'init') {
            actions.addStoredCities(getStoredCities());
        }
    }, [cityStatus]);

    return (
        <>
            <Routes>
                <Route path="/" index element={<HomePage />} />
                <Route path="/week" element={<WeatherWeek />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;

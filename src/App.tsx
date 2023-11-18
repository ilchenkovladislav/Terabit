import { FormEvent, useState } from 'react';
import { CitiesList } from './components/CitiesList/CitiesList';
import { CitySuggest } from './components/CitySuggest/CitySuggest';
import { City } from './models/city/city';

function App() {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const [cities, setCities] = useState<City[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCity) return;

        setCities((prevState) => [...prevState, selectedCity]);
        setSelectedCity(null);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CitySuggest value={selectedCity} onChange={setSelectedCity} />
                <button type="submit">Добавить</button>
            </form>
            <CitiesList cities={cities} />
        </>
    );
}

export default App;

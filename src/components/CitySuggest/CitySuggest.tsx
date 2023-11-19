import { Suggest } from '../Suggest/Suggest';
import { api } from '../../services/api';
import { City } from '../../models/city/city';

type CitySuggestProps = {
    value: City | null;
    onChange: (city: City) => void;
};

export function CitySuggest(props: CitySuggestProps) {
    const { value, onChange } = props;

    const handleSelectCity = (city: City) => {
        onChange(city);
    };

    return (
        <Suggest
            value={value}
            onChange={handleSelectCity}
            fetch={(query) => api.city.getCities(query)}
            nameGetter={(city) => {
                const cityName = city?.local_names?.['ru'] || city.name;
                return `${cityName}, ${city?.state || ''}`;
            }}
        />
    );
}

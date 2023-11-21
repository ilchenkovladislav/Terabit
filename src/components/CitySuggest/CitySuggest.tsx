import { Suggest } from '@/components/Suggest/Suggest.tsx';
import { api } from '@/services/api.tsx';
import type { City } from '@/models/city/city.ts';

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
            fetch={(query) => api.city.getCitiesByName(query)}
            nameGetter={getCityName}
        />
    );
}

const getCityName = (city: City) => {
    const cityName = city?.local_names?.['ru'] || city.name;
    const cityState = city?.state ? `, ${city?.state}` : '';
    return `${cityName}${cityState}`;
};

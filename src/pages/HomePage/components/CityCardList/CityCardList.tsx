import cls from 'classnames';

import { useActionCreators, useStateSelector } from '@/store/hooks.ts';
import { cityActions } from '@/store/slices/citySlice.ts';

import { CityCard } from '../CityCard/CityCard.tsx';
import s from './CityCardList.module.scss';

type CitiesListProps = {
    className?: string;
};

export const CityCardList = ({ className }: CitiesListProps) => {
    const cities = useStateSelector((state) => state.city.items);
    const actions = useActionCreators(cityActions);

    const handleDelete = (index: number) => {
        actions.deleteCity(index);
    };

    const handleFavorite = (index: number) => {
        actions.toggleFavoriteCity(index);
    };

    return (
        <ul className={cls(s.citiesList, className)}>
            {cities.map((city, index) => (
                <li key={index}>
                    <CityCard
                        city={city}
                        handleDelete={() => handleDelete(index)}
                        handleFavorite={() => handleFavorite(index)}
                    />
                </li>
            ))}
        </ul>
    );
};

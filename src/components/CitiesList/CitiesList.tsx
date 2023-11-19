import styles from './CitiesList.module.scss';
import { City } from '../../models/city/city';
import { CityCard } from '../CityCard/CityCard.tsx';
import cls from 'classnames';

type CitiesListProps = {
    cities: City[];
    onDelete: (index: number) => void;
    onFavorite: (index: number) => void;
    className?: string;
};

export const CitiesList = ({
    cities,
    onFavorite,
    onDelete,
    className,
}: CitiesListProps) => {
    return (
        <ul className={cls(styles.citiesList, className)}>
            {cities.map((city, index) => (
                <li key={index}>
                    <CityCard
                        city={city}
                        onDelete={() => onDelete(index)}
                        onFavorite={() => onFavorite(index)}
                    />
                </li>
            ))}
        </ul>
    );
};

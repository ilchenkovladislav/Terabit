import styles from './CitiesList.module.scss';
import { City } from '../../models/city/city';

type CitiesListProps = {
    cities: City[];
};

export const CitiesList = ({ cities }: CitiesListProps) => {
    console.log(cities);
    return (
        <ul className={styles.citiesList}>
            {cities.map((city, index) => (
                <li key={index}>
                    Город: {city.local_names['ru'] || city.name}
                </li>
            ))}
        </ul>
    );
};

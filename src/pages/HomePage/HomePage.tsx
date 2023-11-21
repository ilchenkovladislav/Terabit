import { CityCardList } from './components/CityCardList/CityCardList';
import { SearchBar } from './components/SearchBar/SearchBar';
import { Container } from '@/components/Container/Container.tsx';

import s from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <Container>
            <div className={s.homePage}>
                <SearchBar className={s.search} />
                <CityCardList className={s.list} />
            </div>
        </Container>
    );
};

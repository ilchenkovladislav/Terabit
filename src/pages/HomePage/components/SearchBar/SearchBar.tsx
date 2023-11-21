import { FormEvent, useState } from 'react';
import cls from 'classnames';

import { useActionCreators } from '../../../../store/hooks.ts';
import { cityActions } from '../../../../store/slices/citySlice.ts';

import { CitySuggest } from '../../../../components/CitySuggest/CitySuggest.tsx';
import type { City } from '../../../../models/city/city.ts';

import s from './SearchBar.module.scss';

type SearchBarProps = {
    className?: string;
};

export const SearchBar = (props: SearchBarProps) => {
    const { className } = props;

    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const actions = useActionCreators(cityActions);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedCity) return;

        actions.addCity({ ...selectedCity, isFavorite: false });
        setSelectedCity(null);
    };

    return (
        <form onSubmit={handleSubmit} className={cls(s.form, className)}>
            <CitySuggest value={selectedCity} onChange={setSelectedCity} />
            <button type="submit" className={s.button} disabled={!selectedCity}>
                Добавить
            </button>
        </form>
    );
};

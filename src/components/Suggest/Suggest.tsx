import { ChangeEvent, useEffect, useState } from 'react';
import cls from 'classnames';
import { useDebounce } from '../../hooks/useDebounce';
import s from './Suggest.module.scss';

type SuggestProps<T> = {
    value: T | null;
    onChange: (value: T) => void;
    fetch: (value: string) => Promise<T[]>;
    nameGetter: (value: T) => string;
};

export function Suggest<T>(props: SuggestProps<T>) {
    const { value, onChange, fetch, nameGetter } = props;

    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState<T[]>([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const debouncedInputValue = useDebounce(inputValue, 1000);

    useEffect(() => {
        if (value) {
            setInputValue(nameGetter(value));
        } else {
            setInputValue('');
        }
    }, [value]);

    useEffect(() => {
        if (debouncedInputValue) {
            fetch(debouncedInputValue).then(setSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [debouncedInputValue]);

    const handleChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleSelectSuggest = (suggest: T) => {
        onChange(suggest);
        setIsFocus(false);
    };

    return (
        <div>
            <input
                className={cls(s.input)}
                value={inputValue}
                onChange={handleChangeInputValue}
                onBlur={() => {
                    if (isHovered) return;

                    setIsFocus(false);
                }}
                onFocus={() => setIsFocus(true)}
            />
            {isFocus && (
                <ul
                    className={s.suggestList}
                    onMouseEnter={() => {
                        setIsHovered(true);
                    }}
                    onMouseLeave={() => {
                        setIsHovered(false);
                    }}
                >
                    {suggestions.map((suggest, index) => (
                        <li
                            className={s.suggest}
                            key={index}
                            onClick={() => handleSelectSuggest(suggest)}
                        >
                            {nameGetter(suggest)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

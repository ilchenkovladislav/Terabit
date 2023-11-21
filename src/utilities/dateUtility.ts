import { format, fromUnixTime, isToday } from 'date-fns';
import { ru } from 'date-fns/locale';
import { Weather } from '../models/weather/weather.ts';

export const formatDate = (unixTime: number, dateFormat: string) => {
    return format(fromUnixTime(unixTime), dateFormat, { locale: ru });
};

const NUMBER_OF_ENTRIES_PER_DAY = 8;
const MIDDAY_ENTRY_INDEX = 4;

const getCurrentWeather = (weathers: Weather[]): Weather => {
    return weathers[0];
};

const filterTodayWeathers = (weathers: Weather[]): Weather[] => {
    return weathers.filter((weather) => !isToday(fromUnixTime(weather.dt)));
};

const getMiddayWeathers = (weathers: Weather[]): Weather[] => {
    const middayWeathers: Weather[] = [];

    for (
        let i = MIDDAY_ENTRY_INDEX;
        i < weathers.length;
        i += NUMBER_OF_ENTRIES_PER_DAY
    ) {
        middayWeathers.push(weathers[i]);
    }

    return middayWeathers;
};

export const filterDates = (weathers: Weather[]): Weather[] => {
    if (!weathers.length) {
        return [];
    }

    const result: Weather[] = [];

    const currentWeather = getCurrentWeather(weathers);
    result.push(currentWeather);

    const otherWeathers = filterTodayWeathers(weathers);

    const middayWeathers = getMiddayWeathers(otherWeathers);
    result.push(...middayWeathers);

    return result;
};

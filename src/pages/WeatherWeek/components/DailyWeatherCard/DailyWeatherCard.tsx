import cls from 'classnames';

import { formatDate } from '../../../../utilities/dateUtility.ts';
import type { Weather } from '../../../../models/weather/weather.ts';

import s from './DailyWeatherCard.module.scss';

type DailyWeatherCardProps = {
    weather: Weather;
};

export const DailyWeatherCard = (props: DailyWeatherCardProps) => {
    const { weather } = props;

    const { dt, main } = weather;
    const { icon, description } = weather.weather[0];
    const { temp } = main;
    const imgSource = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <div className={cls(s.dailyWeatherCard)}>
            <h3 className={s.title}>
                {formatDate(dt, 'd MMMM')}, {formatDate(dt, 'eeee')}
            </h3>
            <div className={s.icon}>
                <img src={imgSource} alt="Значок погоды" />
            </div>
            <div className={s.temperature}>{Math.round(temp)}°</div>
            <div className={s.description}>{description}</div>
        </div>
    );
};

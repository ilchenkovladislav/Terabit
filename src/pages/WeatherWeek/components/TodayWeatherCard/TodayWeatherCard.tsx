import { ReactNode } from 'react';
import cls from 'classnames';
import { FiWind } from 'react-icons/fi';
import { IoWaterOutline } from 'react-icons/io5';
import { RiCompass2Line } from 'react-icons/ri';

import { formatDate } from '@/utilities/dateUtility.ts';
import {
    degreesToDirection,
    hPaToMmHg,
} from '@/utilities/weatherUtility/weatherUtility.ts';
import type { Weather } from '@/models/weather/weather.ts';

import s from './TodayWeatherCard.module.scss';

type WeatherDetailItemProps = {
    icon: ReactNode;
    children: ReactNode;
};

const WeatherDetailItem = ({ icon, children }: WeatherDetailItemProps) => (
    <div className={s.detailsItem}>
        {icon} {children}
    </div>
);

type MainWeatherCardProps = {
    weather: Weather;
    className: string;
};

export const TodayWeatherCard = ({
    weather,
    className,
}: MainWeatherCardProps) => {
    if (!weather) return null;

    const { dt, main, wind } = weather;
    const { icon, description } = weather.weather[0];
    const { temp, feels_like, humidity, pressure } = main;
    const { speed, deg } = wind;
    const imgSource = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    return (
        <div className={cls(s.card, className)}>
            <div>
                <h3 className={s.name}>{formatDate(dt, 'd MMMM')}, сегодня</h3>
                <div className={s.icon}>
                    <img src={imgSource} alt="Иконка погоды" />
                </div>
                <div className={s.basic}>
                    <div className={s.temperature}>{Math.round(temp)}°</div>
                    <div className={s.description}>{description}</div>
                    <div className={s.feelsLike}>
                        Ощущается как {Math.round(feels_like)}
                    </div>
                </div>
                <div className={s.details}>
                    <WeatherDetailItem icon={<IoWaterOutline />}>
                        {Math.round(humidity)}%
                    </WeatherDetailItem>
                    <WeatherDetailItem icon={<RiCompass2Line />}>
                        {hPaToMmHg(pressure)} мм рт. ст.
                    </WeatherDetailItem>
                    <WeatherDetailItem icon={<FiWind />}>
                        {speed.toFixed(1)} м/с, {degreesToDirection(deg)}
                    </WeatherDetailItem>
                </div>
            </div>
        </div>
    );
};

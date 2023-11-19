import cls from 'classnames';
import s from './MainWeatherCard.module.scss';
import { CurrentWeather } from '../../models/weather/weather.ts';
import { format, fromUnixTime } from 'date-fns';
import { ru } from 'date-fns/locale';

type MainWeatherCardProps = {
    weather: CurrentWeather;
    className: string;
};

export const MainWeatherCard = (props: MainWeatherCardProps) => {
    const { weather, className } = props;

    return weather ? (
        <div className={cls(s.card, className)}>
            <h3 className={s.name}>
                {format(fromUnixTime(weather.dt), 'eeee', {
                    locale: ru,
                })}
            </h3>
            <div className={s.icon}>
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt=""
                />
            </div>
            <div className={s.temperature}>
                {Math.round(weather.main.temp)}°
            </div>
            <div className={s.description}>
                {weather.weather[0].description}
            </div>
            <div className={s.feelsLike}>
                Ощущается как {Math.round(weather.main.feels_like)}
            </div>
        </div>
    ) : null;
};

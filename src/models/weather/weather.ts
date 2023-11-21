type Coord = {
    lon: number;
    lat: number;
};

type WeatherInner = {
    id: number;
    main: string;
    description: string;
    icon: string;
};

type Main = {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
};

type Wind = {
    speed: number;
    deg: number;
    gust: number;
};

type Rain = Record<string, number>;
type Clouds = Record<string, number>;

type Sys = {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
};

export type Weather = {
    coord: Coord;
    weather: WeatherInner[];
    base: string;
    main: Main;
    visibility: number;
    wind: Wind;
    rain: Rain;
    clouds: Clouds;
    dt: number;
    sys: Sys;
    timezone: number;
    id: number;
    name: string;
    cod: string;
};

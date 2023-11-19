type LocalNames = Record<string, string>;

export type City = {
    name: string;
    local_names: LocalNames;
    lat: number;
    lon: number;
    country: string;
    state: string;
    isFavorite?: boolean;
};

export const hPaToMmHg = (value: number) => {
    return Math.round(value * 0.750147667);
};

export const degreesToDirection = (degrees: number) => {
    const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
};

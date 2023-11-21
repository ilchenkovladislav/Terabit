import { expect, test } from 'vitest';
import { hPaToMmHg, degreesToDirection } from './weatherUtility.ts'; // замените на имя вашего файла с функциями

test('hPaToMmHg converts correctly', () => {
    expect(hPaToMmHg(100)).toBe(75);
    expect(hPaToMmHg(200)).toBe(150);
    expect(hPaToMmHg(300)).toBe(225);
});

test('degreesToDirection converts correctly', () => {
    expect(degreesToDirection(0)).toBe('С');
    expect(degreesToDirection(45)).toBe('СВ');
    expect(degreesToDirection(90)).toBe('В');
    expect(degreesToDirection(135)).toBe('ЮВ');
    expect(degreesToDirection(180)).toBe('Ю');
    expect(degreesToDirection(225)).toBe('ЮЗ');
    expect(degreesToDirection(270)).toBe('З');
    expect(degreesToDirection(315)).toBe('СЗ');
});

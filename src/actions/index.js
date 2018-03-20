export const FETCH_JUOMAT = 'FETCH_JUOMAT';

export function fetchJuomat() {
    return {
        type: FETCH_JUOMAT,
        payload:  [
            { id: 1, nimi: 'Viina', vahvuus: 40, tilavuus: 0.04},
            { id: 2, nimi: 'Rommi', vahvuus: 40, tilavuus: 0.04},
            { id: 3, nimi: 'Viski', vahvuus: 40, tilavuus: 0.04},
            { id: 4, nimi: 'Fisu', vahvuus: 30, tilavuus: 0.04},
            { id: 5, nimi: 'Likööri', vahvuus: 20, tilavuus: 0.04},
            { id: 6, nimi: 'Kuohuviini', vahvuus: 12, tilavuus: 0.12},
            { id: 7, nimi: 'Olut IV', vahvuus: 5.5, tilavuus: 0.33},
            { id: 8, nimi: 'Olut IV', vahvuus: 5.5, tilavuus: 0.4},
            { id: 9, nimi: 'Olut IV', vahvuus: 5.5, tilavuus: 0.5},
            { id: 10, nimi: 'Olut III', vahvuus: 4.7, tilavuus: 0.33},
            { id: 11, nimi: 'Olut III', vahvuus: 4.7, tilavuus: 0.4},
            { id: 12, nimi: 'Olut III', vahvuus: 4.7, tilavuus: 0.5},
            { id: 13, nimi: 'Viinilasi', vahvuus: 13.5, tilavuus: 0.12},
            { id: 14, nimi: 'Viinilasi', vahvuus: 13.5, tilavuus: 0.16},
            { id: 15, nimi: 'Viinilasi', vahvuus: 13.5, tilavuus: 0.24}
        ]
    }
}
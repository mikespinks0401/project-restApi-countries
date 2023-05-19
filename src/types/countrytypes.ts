
export interface flag {
    png: string,
    svg: string,
    alt: string
}
export interface country {
    borders: string[],
    name: {
        common: string,
        nativeName: object
        
    },
    population: number,
    capital: string[],
    region: string,
    subregion: string,
    flags: flag,
    topLevelDomain: string[],
    languages: string[],
    currencies: {
        name: string,
        symbole: string
    }[] 
}
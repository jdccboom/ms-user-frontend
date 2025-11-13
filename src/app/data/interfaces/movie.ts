import { Function } from "@data/interfaces/funtion"


export interface Movie {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    year: string;
    functionList: Function[];
    genres: string;
    active: boolean;
}

export interface MovieCardDetails {
    id: number,
    title: string;
    description: string;
    imageUrl: string;
    year: string;
};

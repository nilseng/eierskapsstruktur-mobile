import { IShareholder } from "../models/models";

const baseUrl = 'https://norske-aksjer.herokuapp.com/api/shareholder';

export const getShareholders = async (count?: boolean) => {
    const res = await fetch(`${baseUrl}${count ? '?count=true' : ''}`);
    return res.json();
}

export const searchShareholders = async (searchTerm: string): Promise<IShareholder[]> => {
    const res = await fetch(`${baseUrl}/${searchTerm}`);
    return res.json();
}
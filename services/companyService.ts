import { debounce } from "lodash"
import { ICompany } from "../models/models";

const baseUrl = 'https://norske-aksjer.herokuapp.com/api/company';

export const getCompanies = async (count?: boolean) => {
    const res = await fetch(`${baseUrl}${count ? '?count=true' : ''}`);
    return res.json();
};

export const searchCompanies = async (searchTerm: string): Promise<ICompany[] | { error: any }> => {
    const res = await fetch(`${baseUrl}/${searchTerm}`);
    return res.json();
}
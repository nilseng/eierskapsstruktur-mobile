import { useEffect, useState } from "react";
import { ICompany } from "../models/models";

const baseUrl = 'https://norske-aksjer.herokuapp.com/api/company';
const brregUrl = 'https://data.brreg.no/enhetsregisteret/api/enheter';

export const getCompanies = async (count?: boolean) => {
    const res = await fetch(`${baseUrl}${count ? '?count=true' : ''}`);
    return res.json();
};

export const searchCompanies = async (searchTerm: string): Promise<ICompany[] | { error: any }> => {
    const res = await fetch(`${baseUrl}/${searchTerm}`);
    return res.json();
}

export const getBrregUnit = async (orgnr: string) => {
    const res = await fetch(`${brregUrl}/${orgnr}`);
    return res.json();
}

// Setting orgnr to optional in order to avoid calling hook conditionally
// TODO: Find better solution
export const useBrregUnit = (orgnr?: string) => {

    if (!orgnr) return;

    const [unit, setUnit] = useState<any>();

    useEffect(() => {
        getBrregUnit(orgnr).then(res => setUnit(res))
        return setUnit(undefined)
    }, [orgnr])

    return unit;
}
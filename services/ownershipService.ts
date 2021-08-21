import { isError } from "lodash";
import { useEffect, useState } from "react";
import { ICompany, IOwnership } from "../models/models"

const baseUrl = 'https://norske-aksjer.herokuapp.com/api/ownerships';

export const getOwnerships = async (company: ICompany): Promise<IOwnership[]> => {
    const ownerships = await fetch(`${baseUrl}?orgnr=${company.orgnr}`).catch(e => console.log('Failed to fetch ownershiips'));
    return ownerships?.json();
}

export const useGetOwnerships = (company?: ICompany) => {
    if (!company) return;

    const [ownerships, setOwnerships] = useState<IOwnership[]>();

    useEffect(() => {
        getOwnerships(company).then(res => setOwnerships(res))
        return () => setOwnerships(undefined);
    }, [company])

    return ownerships;
}
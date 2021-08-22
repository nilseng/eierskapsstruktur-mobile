import { useEffect, useState } from "react";
import { ICompany, IOwnership, IShareholder } from "../models/models"

const baseUrl = 'https://norske-aksjer.herokuapp.com/api/ownerships';

export const getCompanyOwnerships = async (company: ICompany): Promise<IOwnership[]> => {
    const ownerships = await fetch(`${baseUrl}?orgnr=${company.orgnr}`).catch(e => console.log('Failed to fetch ownerships'));
    return ownerships?.json();
}

export const getShareholderOwnerships = async (shareholder: IShareholder): Promise<IOwnership[]> => {
    const ownerships = await fetch(`${baseUrl}?shareholderId=${shareholder.id}`).catch(e => console.log('Failed to fetch ownerships'));
    return ownerships?.json();
}

export const useGetCompanyOwnerships = (company?: ICompany) => {
    if (!company) return;

    const [ownerships, setOwnerships] = useState<IOwnership[]>();

    useEffect(() => {
        getCompanyOwnerships(company).then(res => setOwnerships(res))
        return () => setOwnerships(undefined);
    }, [company])

    return ownerships;
}

export const useGetShareholderOwnerships = (shareholder?: IShareholder) => {
    if (!shareholder) return;

    const [ownerships, setOwnerships] = useState<IOwnership[]>();

    useEffect(() => {
        getShareholderOwnerships(shareholder).then(res => setOwnerships(res))
        return () => setOwnerships(undefined);
    }, [shareholder])

    return ownerships;
}
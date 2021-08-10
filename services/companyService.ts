export const getCompanies = async (count?: boolean) => {
    const res = await fetch(`https://norske-aksjer.herokuapp.com/api/company${count ? '?count=true' : ''}`);
    return res.json();
};

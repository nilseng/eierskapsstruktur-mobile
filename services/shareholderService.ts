export const getShareholders = async (count?: boolean) => {
    const res = await fetch(`https://norske-aksjer.herokuapp.com/api/shareholder${count ? '?count=true' : ''}`);
    return res.json();
}
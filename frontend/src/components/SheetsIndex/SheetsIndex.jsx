import { useLoaderData } from "react-router-dom"

export default function SheetsIndex() {
    const data = useLoaderData();
    console.log(data)
    let [ currentSheets, {sheets: publicSheets} ] = data;
    if (currentSheets) {
        currentSheets = currentSheets.sheets;
        publicSheets = publicSheets.filter(s => !(currentSheets.some(c => c.id === s.id)))
    }
    return <>
    { currentSheets ? <>
    <h2>Your Sheets</h2>
    {currentSheets.map(s => <div key={s.id}>
        <h3>{s.name}</h3>
        <p>{s.description || '—'}</p>
    </div>)}</>
    : null}
    
    <h2>Public Sheets</h2>
        { publicSheets.map(s => <div key={s.id}>
            <h3>{s.name}</h3>
            <p>{s.description || '—'}</p>
            </div>)}
    </>
}
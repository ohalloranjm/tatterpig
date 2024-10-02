import { useLoaderData } from "react-router-dom"

export default function SheetsIndex() {
    const { sheets } = useLoaderData();
    return <><h2>Public Sheets</h2>
        { sheets.map(s => <div key={s.id}>
            <h3>{s.name}</h3>
            <p>{s.description || '—'}</p>
            </div>)}
    </>
}
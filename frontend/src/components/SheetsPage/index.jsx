import { useLoaderData } from 'react-router-dom';

export default function SheetsPage() {
  const { sheets } = useLoaderData();
  console.log(sheets);
  return <p>{sheets.length}</p>;
}

import { useLoaderData } from 'react-router-dom';

export default function PublicSheetDetailsPage() {
  const { sheet } = useLoaderData();
  console.log(sheet);
  return (
    <>
      <h1>{sheet.name}</h1>
    </>
  );
}

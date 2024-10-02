export default function SheetTile({ sheet }) {
  return (
    <div>
      <h3>{sheet.name}</h3>
      <p>{sheet.description || '—'}</p>
    </div>
  );
}

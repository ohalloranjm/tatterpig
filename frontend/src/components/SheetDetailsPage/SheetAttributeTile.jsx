export default function SheetAttributeTile({ attribute }) {
  return (
    <div>
      <p>{attribute.name}</p>
      <p>{attribute.value}</p>
    </div>
  );
}

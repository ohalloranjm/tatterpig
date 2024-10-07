export default function PublicValueTile({ value }) {
  return (
    <div>
      <h2>{value.name}</h2>
      <p>{value.value}</p>
    </div>
  );
}

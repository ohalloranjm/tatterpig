export default function AttributeTile({ attribute }) {
  return (
    <div>
      <p>
        {attribute.name} ({attribute.dataType})
      </p>
    </div>
  );
}

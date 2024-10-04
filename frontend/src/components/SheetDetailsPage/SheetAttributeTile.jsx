import { Link, useSubmit } from 'react-router-dom';

export default function SheetAttributeTile({ attribute }) {
  const submit = useSubmit();
  return (
    <div>
      <p>
        <Link to={`/attributes/${attribute.attributeId}`}>
          {attribute.name}
        </Link>
      </p>
      <p>{attribute.value}</p>
      <button
        type='button'
        onClick={() =>
          submit(null, {
            action: `/sheets/${attribute.sheetId}/attributes/${attribute.attributeId}`,
            method: 'DELETE',
          })
        }
      >
        Remove Attribute
      </button>
    </div>
  );
}

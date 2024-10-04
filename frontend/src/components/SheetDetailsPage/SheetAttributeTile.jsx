import { Link, useSubmit } from 'react-router-dom';

export default function SheetAttributeTile({ attribute }) {
  const submit = useSubmit();

  const removeAttribute = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to remove the ${attribute.name} attribute from this sheet?`
    );
    if (confirmDelete) {
      submit(null, {
        action: `/sheets/${attribute.sheetId}/attributes/${attribute.attributeId}`,
        method: 'DELETE',
      });
    }
  };

  return (
    <div>
      <p>
        <Link to={`/attributes/${attribute.attributeId}`}>
          {attribute.name}
        </Link>
      </p>
      <p>{attribute.value}</p>
      <button type='button' onClick={removeAttribute}>
        Remove Attribute
      </button>
    </div>
  );
}

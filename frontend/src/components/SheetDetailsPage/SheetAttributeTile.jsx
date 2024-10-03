import { Link } from 'react-router-dom';

export default function SheetAttributeTile({ attribute }) {
  return (
    <div>
      <p>
        <Link to={`/attributes/${attribute.attributeId}`}>
          {attribute.name}
        </Link>
      </p>
      <p>{attribute.value}</p>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function AttributeTile({ attribute }) {
  return (
    <div>
      <p>
        <Link to={String(attribute.id)}>
          {attribute.name} ({attribute.dataType})
        </Link>
      </p>
    </div>
  );
}

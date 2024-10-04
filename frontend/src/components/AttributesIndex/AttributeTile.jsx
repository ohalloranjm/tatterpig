import { useState } from 'react';
import AttributeDetailsPage from './AttributeDetailsPage';

export default function AttributeTile({ attribute }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <p onClick={() => setShowDetails(true)}>
        {attribute.name} ({attribute.dataType})
      </p>
      {showDetails && <AttributeDetailsPage attribute={attribute} />}
    </div>
  );
}

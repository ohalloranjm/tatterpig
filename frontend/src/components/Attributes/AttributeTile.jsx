import { useState } from 'react';
import AttributeDetailsPage from './AttributeDetails';

export default function AttributeTile({ attribute }) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div onClick={() => setShowDetails(prev => !prev)}>
      {!showDetails && <p>{attribute.name}</p>}
      {showDetails && <AttributeDetailsPage attribute={attribute} />}
    </div>
  );
}

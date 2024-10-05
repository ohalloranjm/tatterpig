import AttributeDetailsPage from './AttributeDetails';
import { useAttributeSelection } from './context';

export default function AttributeTile({ attribute }) {
  const { display } = useAttributeSelection();
  const showDetails = display(<AttributeDetailsPage attribute={attribute} />);

  return <p onClick={showDetails}>{attribute.name}</p>;
}

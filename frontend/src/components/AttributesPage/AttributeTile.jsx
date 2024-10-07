import { useNavigate } from 'react-router-dom';

export default function AttributeTile({ attribute }) {
  const navigate = useNavigate();
  const showDetails = () => navigate(`/attributes?id=${attribute.id}`);

  return <p onClick={showDetails}>{attribute.name}</p>;
}

import { useNavigate } from 'react-router-dom';

export default function LabelTile({ label }) {
  const navigate = useNavigate();
  const showDetails = () => navigate(`/labels?id=${label.id}`);

  return <p onClick={showDetails}>{label.name}</p>;
}

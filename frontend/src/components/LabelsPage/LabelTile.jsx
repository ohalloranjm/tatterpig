import { useNavigate, useSearchParams } from 'react-router-dom';

export default function LabelTile({ label }) {
  const navigate = useNavigate();
  const showDetails = () => navigate(`/labels?id=${label.id}`);
  const [searchParams] = useSearchParams();

  const className = `labels-list-tile${
    Number(searchParams.get('id')) === label.id
      ? ' labels-list-tile-active'
      : ''
  }`;

  label.SheetLabels.sort((a, b) =>
    a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
  );

  return (
    <div className={className} onClick={showDetails}>
      {label.name}
    </div>
  );
}

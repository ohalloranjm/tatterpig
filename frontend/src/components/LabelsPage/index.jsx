import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import LabelTile from './LabelTile';
import FormView from './FormView';
import { useEffect, useState } from 'react';
import './Labels.css';
import DetailView from './DetailView';
import DefaultView from './DefaultView';

export default function LabelsPage() {
  const { labels } = useLoaderData();
  const [searchParams] = useSearchParams();
  const [mainContent, setMainContent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has('id')) {
      const labelId = Number(searchParams.get('id'));
      const label = labels.find(a => a.id === labelId);
      if (label && searchParams.get('edit') === 'true') {
        setMainContent(<DetailView label={label} edit={true} />);
      } else if (label) {
        setMainContent(<DetailView label={label} />);
      } else {
        setMainContent(<DefaultView />);
      }
    } else if (searchParams.get('new') === 'true') {
      setMainContent(<FormView />);
    } else {
      setMainContent(<DefaultView />);
    }
  }, [searchParams, labels]);

  labels.sort((a, b) => (a.name < b.name ? -1 : 1));

  return (
    <div className='labels'>
      <button
        className='create-label-button'
        onClick={() => {
          if (searchParams.get('new') === 'true') {
            navigate('/labels');
          } else {
            navigate('/labels?new=true');
          }
        }}
      >
        {searchParams.get('new') === 'true' ? 'Cancel' : 'Create a New Label'}
      </button>
      <div className='labels-list block'>
        {labels.map(a => (
          <LabelTile key={a.id} label={a} />
        ))}
      </div>
      <div className='labels-view block'>{mainContent}</div>
    </div>
  );
}

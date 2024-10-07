import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import AttributeTile from './AttributeTile';
import FormView from './FormView';
import { useEffect, useState } from 'react';
import './Attributes.css';
import DetailView from './DetailView';
import DefaultView from './DefaultView';

export default function AttributesPage() {
  const { attributes } = useLoaderData();
  const [searchParams] = useSearchParams();
  const [mainContent, setMainContent] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has('id')) {
      const attributeId = Number(searchParams.get('id'));
      const attribute = attributes.find(a => a.id === attributeId);
      if (attribute && searchParams.get('edit') === 'true') {
        setMainContent(<FormView attribute={attribute} />);
      } else if (attribute) {
        setMainContent(<DetailView attribute={attribute} />);
      } else {
        setMainContent(<DefaultView />);
      }
    } else if (searchParams.get('new') === 'true') {
      setMainContent(<FormView />);
    } else {
      setMainContent(<DefaultView />);
    }
  }, [searchParams, attributes]);

  return (
    <div className='attributes'>
      <h1 className='attributes-title'>My Attributes</h1>

      <div className='attributes-list'>
        <button
          onClick={() => {
            if (searchParams.get('new') === 'true') {
              navigate('/attributes');
            } else {
              navigate('/attributes?new=true');
            }
          }}
        >
          {searchParams.get('new') === 'true'
            ? 'Cancel'
            : 'Create a New Attribute'}
        </button>
        {attributes.map(a => (
          <AttributeTile key={a.id} attribute={a} />
        ))}
      </div>
      <div className='attributes-panel'>{mainContent}</div>
    </div>
  );
}

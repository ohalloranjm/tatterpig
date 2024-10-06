import { useLoaderData, useNavigate, useSearchParams } from 'react-router-dom';
import AttributeTile from './AttributeTile';
import AttributeForm from './AttributeForm';
import { useEffect } from 'react';
import { useAttributeSelection } from './context';
import './Attributes.css';
import AttributeDetailsPage from './AttributeDetails';

export default function Landing() {
  const { attributes } = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();

  // context to track which element is open
  const { content, contentId, display, toggle, show } = useAttributeSelection();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.has('id')) {
      const attributeId = Number(searchParams.get('id'));
      const attribute = attributes.find(a => a.id === attributeId);
      if (searchParams.get('edit') === 'true') {
        show(<AttributeForm attribute={attribute} />);
      } else {
        show(<AttributeDetailsPage attribute={attribute} />);
      }
    } else if (searchParams.get('new') === 'true') {
      show(<AttributeForm />);
    }
  }, [searchParams]);

  return (
    <div className='attributes'>
      <h1 className='attributes-title'>My Attributes</h1>

      <div className='attributes-list'>
        <button onClick={() => navigate('/attributes?new=true')}>
          {contentId === 'create' ? 'Cancel' : 'Create a New Attribute'}
        </button>
        {attributes.map(a => (
          <AttributeTile key={a.id} attribute={a} />
        ))}
      </div>
      <div className='attributes-panel'>{content}</div>
    </div>
  );
}

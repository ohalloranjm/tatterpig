import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import {
  useActionData,
  useNavigate,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';

export default function EditLabelInline({ label }) {
  const [name, setName] = useState('');
  const [dataType, setDataType] = useState('number');

  const submit = useSubmit();
  const data = useActionData();
  const navigate = useNavigate();
  const nameInputRef = useRef();

  const [submitted, setSubmitted] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paramsName = searchParams.has('name');
    const paramsDataType = searchParams.has('datatype');
    if (paramsName || paramsDataType) {
      if (paramsName) setName(searchParams.get('name'));
      if (paramsDataType) setDataType(searchParams.get('datatype'));
    } else {
      setName(label.name);
      setDataType(label.dataType);
    }
  }, [label, searchParams]);

  useEffect(() => nameInputRef.current.select(), [data?.errors]);

  const errors = submitted ? data?.errors : {};

  const handleSubmit = e => {
    e.preventDefault();

    if (dataType !== label.dataType) {
      const confirmChange = window.confirm(
        "Are you sure you want to change the data type of this label? Doing so will reset the label's value on every associated sheet."
      );
      if (!confirmChange) {
        setDataType(label.dataType);
        return nameInputRef.current.focus();
      }
    }
    submit(
      { name, dataType },
      {
        method: 'PUT',
        encType: 'application/json',
        action: `/labels?id=${label.id}&edit=true&name=${name}&datatype=${dataType}`,
      }
    );
    setSubmitted(true);
  };

  return (
    <div>
      <form className='label-details-header' onSubmit={handleSubmit}>
        <input
          className='ldh-title'
          placeholder='Label Name'
          value={name}
          ref={nameInputRef}
          onChange={e => setName(e.target.value)}
        />

        <select
          value={dataType}
          className='ldh-datatype'
          onChange={e => setDataType(e.target.value)}
        >
          <option value='number'>Number</option>
          <option value='string'>String</option>
          <option value='boolean'>Boolean</option>
        </select>

        <p className='error ldh-error'>{submit && errors?.name}</p>

        <button className='ldh-submit-edit icon' type='submit'>
          <FontAwesomeIcon icon={faCheck} />
        </button>
        <button
          className='ldh-cancel-edit icon'
          type='button'
          onClick={() => navigate(`/labels?id=${label.id}`)}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </form>
    </div>
  );
}

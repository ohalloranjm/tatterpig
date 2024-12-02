import {
  Link,
  useNavigate,
  useSearchParams,
  useSubmit,
} from 'react-router-dom';
import ValueTile from './ValueTile';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faSquarePlus,
  faPenToSquare,
  faSquareMinus,
  faEye,
  faEyeSlash,
  faTrash,
  faUpDown,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import ValueForm from './ValueForm';
import SheetFormView from './SheetFormView';

export default function SheetDetailsView({ sheet, edit }) {
  const [searchParams] = useSearchParams();
  const [addValue, setAddValue] = useState(false);
  const [settingsView, setSettingsView] = useState(null);
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [dropBottomClass, setDropBottomClass] = useState('sd-drop-bottom');
  const submit = useSubmit();
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.get('add') === 'label') {
      setAddValue(true);
    } else {
      setAddValue(false);
    }
  }, [searchParams]);

  sheet.SheetLabels.sort((a, b) => a.index - b.index);
  const order = sheet.SheetLabels.map(sl => sl.labelId);

  const deleteSheet = () => {
    submit(null, { method: 'delete', action: `/sheets?id=${sheet.id}` });
  };

  const settingsViewLookup = {
    buttons: (
      <div className='sds-buttons'>
        {/* reorder labels button */}
        <button type='button' onClick={() => setSettingsView('reorder')}>
          <FontAwesomeIcon icon={faUpDown} /> Reorder
        </button>

        {/* public/private toggle button */}
        {sheet.public ? (
          <button
            type='button'
            onClick={() => setSettingsView('confirmPrivate')}
          >
            <FontAwesomeIcon icon={faEyeSlash} /> Make Private
          </button>
        ) : (
          <button
            type='button'
            onClick={() => setSettingsView('confirmPublish')}
          >
            <FontAwesomeIcon icon={faEye} /> Publish
          </button>
        )}

        {/* delete sheet button */}
        <button
          type='button'
          className='grayed-out'
          onClick={() => setSettingsView('confirmDelete')}
        >
          <FontAwesomeIcon icon={faTrash} /> Delete Sheet
        </button>
      </div>
    ),

    reorder: (
      <>
        <p className='sds-message'>
          <strong>Hint:</strong> You can always drag and drop labels to
          rearrange them, even when the up and down buttons aren’t present.
        </p>
        <button type='button' onClick={() => setSettingsView(null)}>
          Done Reordering
        </button>
      </>
    ),

    confirmDelete: (
      <>
        <p className='sds-message sds-confirm-delete-message'>
          Are you sure you want to delete this sheet?
        </p>
        <button type='button' onClick={deleteSheet}>
          Yes, Delete This Sheet
        </button>
      </>
    ),

    confirmPrivate: (
      <>
        <p className='sds-message'>
          Are you sure you want to make this sheet private? Other users will no
          longer be able to discover and view it.
        </p>
        <button
          type='button'
          onClick={() => {
            setSettingsView(null);
            changePublic(false);
          }}
        >
          Confirm
        </button>
      </>
    ),

    confirmPublish: (
      <>
        <p className='sds-message'>
          Are you sure you want to publish this sheet? Other users will be able
          to discover and view it. Only you will be able to edit it.
        </p>
        <button
          type='button'
          onClick={() => {
            setSettingsView(null);
            changePublic(true);
          }}
        >
          Confirm
        </button>
      </>
    ),
  };

  const changePublic = newValue => {
    const { name, description } = sheet;
    const body = { name, description, public: newValue };
    submit(body, {
      method: 'PUT',
      action: `/sheets?id=${sheet.id}`,
      encType: 'application/json',
    });
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDropBottomClass('sd-drop-bottom-dragover');
  };
  const handleDragLeave = e => {
    e.preventDefault();
    setDropBottomClass('sd-drop-bottom');
  };
  const handleDrop = e => {
    const moveId = Number(e.dataTransfer.getData('text/plain'));
    const newOrder = [];
    order.forEach(id => {
      if (id !== moveId) newOrder.push(id);
    });
    newOrder.push(moveId);

    submit(
      { order: newOrder },
      {
        action: `/sheets?sheetId=${sheet.id}&reorder=true`,
        method: 'PUT',
        encType: 'application/json',
      }
    );

    setDropBottomClass('sd-drop-bottom');
  };

  return (
    <>
      <div className='sheet-view-details'>
        {edit ? (
          <SheetFormView sheet={sheet} />
        ) : (
          <div className='sheet-details-header'>
            <h1 className='sdh-title'>{sheet.name}</h1>

            {settingsView && (
              <div className='sdh-settings'>
                {settingsViewLookup[settingsView]}
              </div>
            )}

            <p className='sdh-description'>{sheet.description}</p>

            {/* settings button - opens the settings menu */}
            <button
              type='button'
              className='icon sdh-toggle-settings'
              disabled={searchParams.has('edit')}
              onClick={() =>
                setSettingsView(prev => {
                  if (prev === 'buttons') return null;
                  return 'buttons';
                })
              }
            >
              <FontAwesomeIcon icon={faGear} />
            </button>

            {/* edit button - opens sheet name/description edit menu */}
            <button
              type='button'
              className='icon sdh-edit'
              onClick={() => navigate(`/sheets?id=${sheet.id}&edit=true`)}
              disabled={searchParams.has('edit')}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
        )}

        {/* populate the labels and values, passing the order */}
        <div className='sheet-details-values'>
          {sheet.SheetLabels.map((a, i) => {
            const aboveId = order[i - 1] ?? null;
            const belowId = order[i + 1] ?? null;
            return (
              <ValueTile
                key={a.id}
                label={a}
                aboveId={aboveId}
                belowId={belowId}
                order={order}
                reorder={settingsView === 'reorder'}
              />
            );
          })}
          <div
            className={dropBottomClass}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          ></div>
        </div>

        <button
          type='button'
          className='sd-add-label-button'
          onClick={() =>
            navigate(
              `/sheets?id=${sheet.id}${
                searchParams.get('add') === 'label' ? '' : '&add=label'
              }`
            )
          }
        >
          <FontAwesomeIcon
            icon={
              searchParams.get('add') === 'label' ? faSquareMinus : faSquarePlus
            }
          />{' '}
          Add Label
        </button>
        {addValue && <ValueForm sheet={sheet} />}
      </div>
      {sheet.public && (
        <>
          <div className='view-public-page'>
            <Link to={`/publicsheets/${sheet.id}`}>Public View</Link>
            <button
              type='button'
              className='icon'
              onClick={() => {
                setCopiedPublicLink(false);
                navigator.clipboard
                  .writeText(
                    `https://tatterpig.onrender.com/publicsheets/${sheet.id}`
                  )
                  .then(() => setCopiedPublicLink(true));
              }}
            >
              <FontAwesomeIcon icon={faLink} />
            </button>
          </div>
          {copiedPublicLink && (
            <p className='center view-public-link-successfully-copied'>
              Link successfully copied!
            </p>
          )}
        </>
      )}
    </>
  );
}

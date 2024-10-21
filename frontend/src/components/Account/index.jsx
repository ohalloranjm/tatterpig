import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './Account.css';
import { useState } from 'react';
import { deleteAccount } from '../../store/session';

export default function Account() {
  const { user } = useSelector(store => store.session);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [reallySure, setReallySure] = useState(false);
  const dispatch = useDispatch();

  if (!user) return <Navigate to='/' />;

  return (
    <div className='account-settings'>
      <div className='block'>
        <h1 className='center'>Account Settings</h1>
        <div>
          <div className='as-tile'>
            <div>Username</div>
            <div>{user.username}</div>
          </div>
          <div className='as-tile'>
            <div>Email</div>
            <div>{user.email}</div>
          </div>
        </div>
      </div>
      <button
        type='button'
        className={`delete-account-button${confirmDelete ? '' : ' grayed-out'}`}
        onClick={() => {
          setConfirmDelete(prev => !prev);
          setReallySure(false);
        }}
      >
        {confirmDelete ? 'Never Mind' : 'Delete Account'}
      </button>
      {confirmDelete && (
        <div className='block'>
          <p>
            Are you ready to go? If you delete your account, ALL your
            information will be deleted. You will not be able to recover your
            sheets.
          </p>
          <div className='confirm-delete-buttons'>
            {reallySure ? (
              <button
                className='confirm-delete-button-real'
                onClick={() => dispatch(deleteAccount())}
              >
                CONFIRM DELETE
              </button>
            ) : (
              <button
                className='grayed-out'
                onClick={() => setReallySure(true)}
              >
                Delete My Account
              </button>
            )}
            <button onClick={() => setConfirmDelete(false)}>Never Mind</button>
          </div>
        </div>
      )}
    </div>
  );
}

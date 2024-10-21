import { useSelector } from 'react-redux';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';

export default function Welcome() {
  const { user } = useSelector(store => store.session);
  const { sheets } = useLoaderData();
  const navigate = useNavigate();

  const compareUpdatedAt = function (a, b) {
    if (a?.updatedAt > b?.updatedAt) return a;
    else return b;
  };

  const latestUpdate = function (sheet) {
    const { SheetLabels } = sheet;
    if (!SheetLabels?.length) return sheet.updatedAt;
    const latestValue = SheetLabels.reduce((curr, v) =>
      compareUpdatedAt(curr, v)
    );
    return compareUpdatedAt(sheet, latestValue).updatedAt;
  };

  let sheet;
  if (sheets?.length) {
    const compareSheets = function (sheet1, sheet2) {
      if (latestUpdate(sheet1) > latestUpdate(sheet2)) {
        return sheet1;
      } else {
        return sheet2;
      }
    };

    sheet = sheets.reduce((curr, s) => compareSheets(curr, s));
    if (sheet.ownerId !== user.id) sheet = null;
  }

  let formattedUpdate;
  if (sheet) {
    const dateString = latestUpdate(sheet);
    const dateObj = new Date(dateString);
    let day = dateObj.getDate();
    if (day < 10) day = '0' + day;
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    formattedUpdate = `Last updated ${month}-${day}-${year}`;
  }

  return (
    <>
      <h1>Welcome back, {user.username}!</h1>
      <div className='welcome-user'>
        <div className='wv-dash-links'>
          <div
            className='block big-link wv-my-sheets'
            onClick={() => navigate('/sheets')}
          >
            My Sheets
          </div>
          <div
            className='block big-link wv-my-labels'
            onClick={() => navigate('/labels')}
          >
            My Labels
          </div>
          {!!sheet && (
            <div
              className='block big-link wv-sheet'
              onClick={() => navigate(`/sheets?id=${sheet.id}`)}
            >
              <h2 className='wv-sheet-name'>{sheet.name}</h2>
              <p>{sheet.description}</p>
              <p className='wv-last-updated'>{formattedUpdate}</p>
            </div>
          )}
        </div>
        <div className='about-tatterpig'>
          <p>Not sure where to get started?</p>
          <ul className='tatterpig-whatdo'>
            <li>
              <Link to='/sheets?new=true'>Create a sheet</Link> to represent
              your character.
            </li>
            <li>
              <Link to='/labels?new=true'>Create labels</Link> to represent
              fields for game stats, items, and other attributes, then add them
              to your sheet.
            </li>
            <li>Edit as needed!</li>
            <li>
              If you’re stuck, check out{' '}
              <Link to='/public'>publically available sheets</Link> to see how
              other people are using Tatterpig.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

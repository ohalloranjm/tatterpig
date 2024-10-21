import { useSelector } from 'react-redux';
import { useLoaderData, useNavigate } from 'react-router-dom';

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

  const compareSheets = function (sheet1, sheet2) {
    if (latestUpdate(sheet1) > latestUpdate(sheet2)) {
      return sheet1;
    } else {
      return sheet2;
    }
  };

  const sheet = sheets.reduce((curr, s) => compareSheets(curr, s));

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
        <div
          className='block big-link my-sheets'
          onClick={() => navigate('/sheets')}
        >
          My Sheets
        </div>
        <div
          className='block big-link my-labels'
          onClick={() => navigate('/labels')}
        >
          My Labels
        </div>
        {!!sheet && (
          <div
            className='block'
            onClick={() => navigate(`/sheets?id=${sheet.id}`)}
          >
            <h2>{sheet.name}</h2>
            <p>{sheet.description}</p>
            <p>{formattedUpdate}</p>
          </div>
        )}
      </div>
    </>
  );
}

import { createBrowserRouter } from 'react-router-dom';
import api from '../api';
import Layout from './Layout';
import SheetsPage from '../components/SheetsPage';
import DefaultError from '../components/DefaultError/DefaultError';
import LabelsPage from '../components/LabelsPage';
import PublicSheetsIndex from '../components/PublicSheetsIndex';
import PublicSheetDetailsPage from '../components/PublicSheetDetailsPage';
import Landing from '../components/Landing';

const { checkQuery, collect, handleError, map } = api.utils;

const pages = [
  {
    path: '/',
    element: <Landing />,
    loader: handleError(api.sheet.getCurrent),
  },
  {
    path: '/labels',
    element: <LabelsPage />,
    loader: api.label.getCurrent,
    action: map({
      POST: handleError(api.label.post),
      PUT: handleError(api.label.put),
      DELETE: api.label.del,
    }),
  },
  {
    path: '/sheets',
    element: <SheetsPage />,
    loader: collect(api.sheet.getCurrent, api.label.getCurrent),
    action: map({
      POST: checkQuery(
        'add',
        'label',
        handleError(api.value.post),
        handleError(api.sheet.post)
      ),
      PUT: checkQuery(
        'labelId',
        null,
        handleError(api.value.put),
        handleError(api.sheet.put)
      ),
      DELETE: checkQuery('labelId', null, api.value.del, api.sheet.del),
    }),
  },
  {
    path: '/public',
    element: <PublicSheetsIndex />,
    loader: api.sheet.getPublic,
  },
  {
    path: '/public/:sheetId',
    element: <PublicSheetDetailsPage />,
    loader: api.sheet.getOne,
  },
];

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        errorElement: <DefaultError />,
        children: pages,
      },
    ],
  },
]);

export default router;

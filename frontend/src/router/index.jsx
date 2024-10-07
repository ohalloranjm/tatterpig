import { createBrowserRouter } from 'react-router-dom';
import api from '../api';
import LoginForm from '../components/SessionForms/LoginFormPage';
import SignupForm from '../components/SessionForms/SignupFormPage';
import Layout from './Layout';
import SheetsPage from '../components/SheetsPage';
import DefaultError from '../components/DefaultError/DefaultError';
import LabelsPage from '../components/LabelsPage';
import PublicSheetsIndex from '../components/PublicSheetsIndex';
import PublicSheetDetailsPage from '../components/PublicSheetDetailsPage';

const { checkQuery, collect, handleError, map } = api.utils;

const pages = [
  {
    path: '/',
    element: <h1>Landing page</h1>,
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/signup',
    element: <SignupForm />,
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

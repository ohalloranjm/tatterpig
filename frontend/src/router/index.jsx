import { createBrowserRouter } from 'react-router-dom';
import api from '../api';
import LoginForm from '../components/SessionForms/LoginFormPage';
import SignupForm from '../components/SessionForms/SignupFormPage';
import Layout from './Layout';
import SheetsPage from '../components/SheetsPage';
import DefaultError from '../components/DefaultError/DefaultError';
import AttributesPage from '../components/AttributesPage';
import ValueForm from '../components/ValueForm/ValueForm';
import ActionNavigator from '../utils/ActionNavigator';

const { collect, handleError, map } = api.utils;

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
    path: '/attributes',
    element: <AttributesPage />,
    loader: api.attribute.getCurrent,
    action: map({
      POST: handleError(api.attribute.post),
      PUT: handleError(api.attribute.put),
      DELETE: api.attribute.del,
    }),
  },
  {
    path: '/sheets',
    element: <SheetsPage />,
    loader: api.sheet.getCurrent,
    action: map({
      POST: handleError(api.sheet.post),
    }),
  },
  {
    path: '/sheets/:sheetId/attributes/:attributeId',
    element: <ActionNavigator />,
    action: map({
      DELETE: api.value.del,
      PUT: api.value.put,
    }),
  },
  {
    path: '/sheets/:sheetId/attributes/add',
    element: <ValueForm />,
    loader: collect(api.sheet.getOne, api.attribute.getCurrent),
    action: handleError(api.value.post),
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

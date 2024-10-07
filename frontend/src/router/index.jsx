import { createBrowserRouter } from 'react-router-dom';
import api from '../api';
import LoginForm from '../components/SessionForms/LoginFormPage';
import SignupForm from '../components/SessionForms/SignupFormPage';
import Layout from './Layout';
import SheetsPage from '../components/SheetsPage';
import DefaultError from '../components/DefaultError/DefaultError';
import AttributesPage from '../components/AttributesPage';

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
    loader: collect(api.sheet.getCurrent, api.attribute.getCurrent),
    action: map({
      POST: checkQuery(
        'add',
        'attribute',
        handleError(api.value.post),
        handleError(api.sheet.post)
      ),
      PUT: handleError(api.sheet.put),
      DELETE: checkQuery('attributeId', null, api.value.del, api.sheet.del),
    }),
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

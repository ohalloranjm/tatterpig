import { createBrowserRouter } from 'react-router-dom';
import api from '../api';
import LoginForm from '../components/SessionForms/LoginFormPage';
import SignupForm from '../components/SessionForms/SignupFormPage';
import Layout from './Layout';
import SheetsIndex from '../components/SheetsIndex';
import SheetDetailsPage from '../components/SheetDetailsPage/SheetDetailsPage';
import DefaultError from '../components/DefaultError/DefaultError';
import SheetForm from '../components/SheetForm/SheetForm';
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
    element: <SheetsIndex />,
    loader: collect(
      handleError(api.sheet.getCurrent, false),
      api.sheet.getPublic
    ),
  },
  {
    path: '/sheets/new',
    element: <SheetForm edit={false} />,
    action: handleError(api.sheet.post),
  },
  {
    path: '/sheets/:sheetId',
    element: <SheetDetailsPage />,
    loader: api.sheet.getOne,
    action: api.sheet.del,
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
    path: '/sheets/:sheetId/edit',
    element: <SheetForm edit={true} />,
    loader: api.sheet.getOne,
    action: handleError(api.sheet.put),
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

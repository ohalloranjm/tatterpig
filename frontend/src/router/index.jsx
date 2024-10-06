import { createBrowserRouter, Navigate } from 'react-router-dom';
import api, { get } from '../api';
import LoginForm from '../components/SessionForms/LoginFormPage';
import SignupForm from '../components/SessionForms/SignupFormPage';
import Layout from './Layout';
import SheetsIndex from '../components/SheetsIndex';
import SheetDetailsPage from '../components/SheetDetailsPage/SheetDetailsPage';
import DefaultError from '../components/DefaultError/DefaultError';
import SheetForm from '../components/SheetForm/SheetForm';
import Attributes from '../components/Attributes';
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
    element: <Attributes />,
    loader: get.attributes.current,
    action: handleError(api.postAttribute),
    children: [
      {
        path: ':attributeId',
        element: <Navigate to='/attributes' />,
        action: map({
          PUT: handleError(api.putAttribute),
          DELETE: api.deleteAttribute,
        }),
      },
    ],
  },
  {
    path: '/sheets',
    element: <SheetsIndex />,
    loader: collect(
      handleError(api.getCurrentSheets, false),
      api.getPublicSheets
    ),
  },
  {
    path: '/sheets/new',
    element: <SheetForm edit={false} />,
    action: handleError(api.postSheet),
  },
  {
    path: '/sheets/:sheetId',
    element: <SheetDetailsPage />,
    loader: api.getSheetDetails,
    action: api.deleteSheet,
  },
  {
    path: '/sheets/:sheetId/attributes/:attributeId',
    element: <ActionNavigator />,
    action: map({
      DELETE: api.deleteValue,
      PUT: api.putValue,
    }),
  },
  {
    path: '/sheets/:sheetId/edit',
    element: <SheetForm edit={true} />,
    loader: api.getSheetDetails,
    action: handleError(api.putSheet),
  },
  {
    path: '/sheets/:sheetId/attributes/add',
    element: <ValueForm />,
    loader: collect(api.getSheetDetails, api.getCurrentAttributes),
    action: handleError(api.postValue),
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

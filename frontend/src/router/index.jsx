import { createBrowserRouter } from 'react-router-dom';
import api from '../api';
import LoginForm from '../components/SessionForms/LoginFormPage';
import SignupForm from '../components/SessionForms/SignupFormPage';
import Layout from './Layout';
import SheetsIndex from '../components/SheetsIndex';
import SheetDetailsPage from '../components/SheetDetailsPage/SheetDetailsPage';
import DefaultError from '../components/DefaultError/DefaultError';
import SheetForm from '../components/SheetForm/SheetForm';
import AttributesIndex from '../components/AttributesIndex';
import AttributeDetailsPage from '../components/AttributeDetailsPage/AttributeDetailsPage';
import AttributeForm from '../components/AttributeForm/AttributeForm';
import ValueForm from '../components/ValueForm/ValueForm';
import ActionNavigator from '../utils/ActionNavigator';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        errorElement: <DefaultError />,
        children: [
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
            element: <AttributesIndex />,
            loader: api.getCurrentAttributes,
          },
          {
            path: '/attributes/new',
            element: <AttributeForm edit={false} />,
            action: api.handleError(api.postAttribute),
          },
          {
            path: '/attributes/:attributeId',
            element: <AttributeDetailsPage />,
            loader: api.getAttributeDetails,
            action: api.deleteAttribute,
          },
          {
            path: '/attributes/:attributeId/edit',
            element: <AttributeForm edit={true} />,
            loader: api.getAttributeDetails,
            action: api.handleError(api.putAttribute),
          },
          {
            path: '/sheets',
            element: <SheetsIndex />,
            loader: api.collect(
              api.handleError(api.getCurrentSheets, false),
              api.getPublicSheets
            ),
          },
          {
            path: '/sheets/new',
            element: <SheetForm edit={false} />,
            action: api.handleError(api.postSheet),
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
            action: api.sendRoute({
              DELETE: api.deleteValue,
              PUT: api.putValue,
            }),
          },
          {
            path: '/sheets/:sheetId/edit',
            element: <SheetForm edit={true} />,
            loader: api.getSheetDetails,
            action: api.handleError(api.putSheet),
          },
          {
            path: '/sheets/:sheetId/attributes/add',
            element: <ValueForm />,
            loader: api.collect(api.getSheetDetails, api.getCurrentAttributes),
            action: api.handleError(api.postValue),
          },
        ],
      },
    ],
  },
]);

export default router;

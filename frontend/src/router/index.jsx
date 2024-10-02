import LoginForm from '../components/SessionForms/LoginFormPage';
import SignupForm from '../components/SessionForms/SignupFormPage';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import SheetsIndex from '../components/SheetsIndex';
import api from '../api';
import SheetDetailsPage from '../components/SheetDetailsPage/SheetDetailsPage';
import DefaultError from '../components/DefaultError/DefaultError';
import SheetForm from '../components/SheetForm/SheetForm';

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
            path: '/sheets',
            element: <SheetsIndex />,
            loader: api.collect(
              api.handleError(api.getCurrentSheets, false),
              api.getPublicSheets
            ),
          },
          {
            path: '/sheets/new',
            element: <SheetForm />,
            action: api.handleError(api.postSheet),
          },
          {
            path: '/sheets/:sheetId',
            element: <SheetDetailsPage />,
            loader: api.getSheetDetails,
            action: api.deleteSheet,
          },
        ],
      },
    ],
  },
]);

export default router;

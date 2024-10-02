import LoginForm from '../components/SessionForms/LoginFormPage';
import SignupForm from '../components/SessionForms/SignupFormPage';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import SheetsIndex from '../components/SheetsIndex';
import api from '../api';
import getPublicSheets from '../api/getPublicSheets';
import SheetDetailsPage from '../components/SheetDetailsPage/SheetDetailsPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        errorElement: <h1>Uh oh, something went wrong.</h1>,
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
              api.ignoreError(api.getCurrentSheets),
              getPublicSheets
            ),
          },
          {
            path: '/sheets/:sheetId',
            element: <SheetDetailsPage />,
            loader: api.getSheetDetails,
          },
        ],
      },
    ],
  },
]);

export default router;

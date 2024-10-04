import { Navigate, useActionData } from 'react-router-dom';

export default function ActionNavigator() {
  const to = useActionData();
  return <Navigate to={to} />;
}

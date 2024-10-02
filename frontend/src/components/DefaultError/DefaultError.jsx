import { useRouteError } from 'react-router-dom';

export default function DefaultError() {
  const err = useRouteError();
  const { title, message, status } = err;

  const pageTitle =
    title && status ? `Error ${status}: ${title}` : 'Something went wrong.';

  return (
    <>
      <h1>{pageTitle}</h1>
      <p>{message}</p>
    </>
  );
}

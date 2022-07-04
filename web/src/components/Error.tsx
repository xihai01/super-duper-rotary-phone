import { Link } from 'react-router-dom';

export function Error() {
  return (
    <div>
      <h1>
        The application is experiencing a server error. Please try going back to
        home.
      </h1>
      <Link to={'/'}>Back home</Link>
    </div>
  );
}

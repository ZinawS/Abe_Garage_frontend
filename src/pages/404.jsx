import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

/**
 * 404 Page Component
 * 
 * Displays when a route is not found
 */
const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-400">404</h1>
        <h2 className="mt-4 text-2xl font-medium text-gray-900">Page not found</h2>
        <p className="mt-2 text-gray-600">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate('/')}>
            Go back home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
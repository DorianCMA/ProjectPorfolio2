import { Link } from "react-router-dom";

const NotPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">
        Oops! The page you are looking for might be in another castle.
      </p>
      <Link
        to="/"
        className="text-lg bg-blue-500 text-white py-2 px-4 rounded transition duration-300 hover:bg-blue-700"
      >
        Go back home
      </Link>
    </div>
  );
};

export default NotPage;

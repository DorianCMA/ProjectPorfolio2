import propTypes from "prop-types";

const ScreenPositive = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 w-[calc(100%-225px)] h-full ml-56 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <p className="text-lg font-bold">{message}</p>
      </div>
    </div>
  );
};

ScreenPositive.propTypes = {
  message: propTypes.string.isRequired,
}

export default ScreenPositive;

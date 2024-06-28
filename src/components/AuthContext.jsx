import { createContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import propTypes from 'prop-types';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const defaultToken = "";



	const [token, setToken] = useState(() => {
		const storedToken = localStorage.getItem('token');
		return storedToken ? storedToken : defaultToken;
	});
	

	useEffect(() => {
		localStorage.setItem('token', token);
	}, [token] );

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,

			}}
		>
			{children ? children : <Outlet />}
		</AuthContext.Provider>
	);
};

AuthContextProvider.propTypes = {
	children: propTypes.node
};

export default AuthContext;

import { createContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import propTypes from 'prop-types';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const defaultToken = "";
	const defaultCustomer_id = "";
	const defaultUser_id = "";


	const [token, setToken] = useState(() => {
		const storedToken = localStorage.getItem('token');
		return storedToken ? storedToken : defaultToken;
	});
	const [customer_id, setCustomer_id] = useState(() => {
		const storedCustomer_id = localStorage.getItem('customer_id');
		return storedCustomer_id ? storedCustomer_id : defaultCustomer_id;
	});
	const [user_id, setUser_id] = useState(() => {
		const storedUser_id = localStorage.getItem('user_id');
		return storedUser_id ? storedUser_id : defaultUser_id;
	});

	useEffect(() => {
		localStorage.setItem('token', token);
		localStorage.setItem('customer_id', customer_id);
		localStorage.setItem('user_id', user_id);
	}, [token, customer_id, user_id]);

	return (
		<AuthContext.Provider
			value={{
				token,
				setToken,
				customer_id,
				setCustomer_id,
				user_id,
				setUser_id
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

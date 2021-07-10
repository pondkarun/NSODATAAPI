import React,{useEffect} from "react";
import {useAuthToken} from "./AppHooks";
import PropTypes from "prop-types";
import {Cookies} from 'react-cookie';
import {setAccessToken} from '../util/Utility';

const AuthRoutes = ({children}) => {
	useAuthToken();

	return <>{children}</>;
};

export default AuthRoutes;

AuthRoutes.propTypes = {
	children: PropTypes.node.isRequired
};

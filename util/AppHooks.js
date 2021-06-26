import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Cookies } from 'react-cookie'

import Axios from 'axios';
import API from './Api';
import { SET_MENU } from '../redux/actions'

export const useAuthToken = () => {
	const dispatch = useDispatch();
	const cookies = new Cookies();
	const auth = useSelector(({auth})=>auth);
	const [loading, setLoading] = useState(true);

	const Getmydata=() => API.get('/services/v1/api/user/mydata',{
	}).then((data) => {
		console.log(`data`, data)
		dispatch(SET_MENU(data.data));
	}).catch((error) => {
		console.log('error :>> ', error);
	})
	useEffect(() => {
	}, []);

	return [loading];
};

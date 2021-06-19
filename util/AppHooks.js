import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import API from './Api';
import { SET_MENU } from '../redux/actions'

export const useAuthToken = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		API.get('/services/v1/api/user/mydata').then((data) => {
			console.log(`data`, data)
			dispatch(SET_MENU(data.data));
		}).catch((error) => {
			console.log('error :>> ', error);
		})
	}, [dispatch]);

	return [loading];
};

export const useAuthUser = () => {
	const { user } = useSelector(({ auth }) => auth);

	if (user) {
		return { id: 1, ...user };
	}
	return [null];
};

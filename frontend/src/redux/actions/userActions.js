import axios from "axios";

export const registerUser = (values, setSuccessFlagForSubmit, setErrorFlagForSubmit, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axios.post('/api/user/register', values)
            .then((response) => {
                if (response.data.ok && response.status === 200) {
                    setSuccessFlagForSubmit(true);
                    setTimeout(() => {
                        navigate('/login');
                    }, 3000);
                    dispatch({ type: 'LOADING', payload: false });
                }
            })
            .catch(() => setErrorFlagForSubmit(true));
    } catch ({ error }) {
        //console.log(error);
        setErrorFlagForSubmit(true);
        dispatch({ type: 'LOADING', payload: false });
    }
};
export const loginUser = (credentials, setErrorFlagForSubmit, setErrorMessage, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const user = await axios.post(
            '/api/user/login',
            credentials,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );
        localStorage.setItem('user', JSON.stringify(user.data))
        setTimeout(() => {
            navigate('/');
        }, 500);
        dispatch({ type: 'LOADING', payload: false });
    } catch ({ response }) {
        //console.log(response.data);
        setErrorFlagForSubmit(true);
        setErrorMessage(response.data);
        dispatch({ type: 'LOADING', payload: false });
    }
};
export const logoutUser = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        localStorage.removeItem('user');
        await axios.get('/api/user/logout');

        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false });
        console.log(error);
    }
};
export const getUsers = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const { data } = await axios.get('/api/user/all-users');
        dispatch({
            type: 'GET_ALL_USERS',
            payload: data.users
        })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false });
        console.log(error);
    }
};
export const updateUser = (id, values, setSuccessFlagForSubmit, setErrorFlagForSubmit, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    console.log(values);
    try {
        await axios.put(`/api/user/update/${id}`, values)
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    setSuccessFlagForSubmit(true);
                    setTimeout(() => {
                        navigate('/userprofile');
                    }, 2000);
                    dispatch({ type: 'LOADING', payload: false });
                }
            })
            .catch(() => setErrorFlagForSubmit(true));
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false });
        console.log(error);
    }
};
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
    // console.log(localStorage.getItem('user'));
};
export const logoutUser = (navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        localStorage.removeItem('user');
        const data = await axios.get('/api/user/logout');
        console.log(data);
        dispatch({ type: 'LOADING', payload: false });
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false });
        //console.log(error);
    }
};
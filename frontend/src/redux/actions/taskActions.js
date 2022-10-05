import axios from "axios";

/* export const createTask = (values, setSuccessFlagForSubmit, setErrorFlagForSubmit, navigate) => async dispatch => {
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
}; */
export const getTasks = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const { data } = await axios.get('/api/task/all-tasks');
        dispatch({
            type: 'GET_ALL_TASKS',
            payload: data.tasks
        })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false });
        console.log(error);
    }
};

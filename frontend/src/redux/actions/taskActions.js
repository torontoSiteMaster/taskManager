import axios from "axios";

export const createTask = (values, setErrorFlagForSubmit, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axios.post('/api/task/create/new', values)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
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
export const assignTask = (values, setErrorFlagForSubmit, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axios.post('/api/task/assign-task/new', values)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
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
export const getAssignedTasks = () => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        const { data } = await axios.get('/api/task/all-assigned-tasks');
        dispatch({
            type: 'GET_ALL_ASSIGNED_TASKS',
            payload: data.assignedTasks
        })
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        dispatch({ type: 'LOADING', payload: false });
        console.log(error);
    }
};

export const inviteTask = (values, setErrorFlagForSubmit, navigate) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        await axios.post('/api/task/invite-task/new', values)
            .then((response) => {
                if (response.status === 200) {
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
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

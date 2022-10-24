const initialState = {
    tasks: [],
    assignedTasks: []
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TASKS':
            return { ...state, tasks: action.payload }
        default:
            return state;
    }
};

export const assignedTasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_ASSIGNED_TASKS':
            return { ...state, assignedTasks: action.payload }
        default:
            return state;
    }
}
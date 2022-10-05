const initialState = {
    tasks: []
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_TASKS':
            return { ...state, tasks: action.payload }
        default:
            return state;
    }
}
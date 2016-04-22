export const ADD_ACTIVITY_TYPE = 'ADD_ACTIVITY';
export const DELETE_ACTIVITY_TYPE = 'DELETE_ACTIVITY';
export const SHOW_ACTIVITY_LIST_TYPE = 'SHOW_ACTIVITY_LIST';
export const SHOW_TIMER_FORM_TYPE = 'SHOW_TIMER_FORM';

export const addActivity = (name: string) =>  {
    return {
        type: ADD_ACTIVITY_TYPE,
        name: name
    };
}

export const deleteActivity = (id: number) =>  {
    return {
        type: DELETE_ACTIVITY_TYPE,
        id: id
    };
}

export const showActivityList = () =>  {
    return {
        type: SHOW_ACTIVITY_LIST_TYPE
    };
}

export const showTimerForm = () =>  {
    return {
        type: SHOW_TIMER_FORM_TYPE
    };
}
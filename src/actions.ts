export const ADD_ACTIVITY_TYPE = 'ADD_ACTIVITY';
export const DELETE_ACTIVITY_TYPE = 'DELETE_ACTIVITY';

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
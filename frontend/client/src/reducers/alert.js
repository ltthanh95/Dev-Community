import {SET_ALERT,REMOVE_ALERT} from '../action/types'
const initialState=[
    // {
    //     id:1,
    //     msg:'Please log in',
    //     alertType:'success'
    // },
    // {}
]
export default function(state=initialState,action){
    const {type,payload}=action;
    switch(type){
        case SET_ALERT:
            //add alert to array. it becomes the mutable state that will be immutable
            return [...state,payload];
        case REMOVE_ALERT:
            return state.filter(alert=>alert.id!==payload);
        default:
            return state;
    }
}
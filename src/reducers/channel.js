import * as actionTypes from '../store/actions/actionTypes';
import { updateObject } from '../utility';

const initialChannelState = {
    currentChannel: null,
    isPrivateChannel: false
}

const setCurrentChannel = (state, action) => {
    return updateObject(state, {
        currentChannel: action.currentChannel
    })
}

const setPrivateChannel = (state, action) => {
    return updateObject(state, {
        isPrivateChannel: action.isPrivateChannel
    })
}

const channelReducer = (state = initialChannelState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return setCurrentChannel(state, action);
        case actionTypes.SET_PRIVATE_CHANNEL:
            return setPrivateChannel(state, action);
        default:
            return state;
    }
}

export default channelReducer;
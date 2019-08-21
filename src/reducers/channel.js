import * as actionTypes from '../store/actions/actionTypes';
import { updateObject } from '../utility';

const initialChannelState = {
    currentChannel: null
}

const setCurrentChannel = (state, action) => {
    return updateObject(state, {
        currentChannel: action.currentChannel
    })
}

const channelReducer = (state = initialChannelState, action) => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return setCurrentChannel(state, action);
        default:
            return state;
    }
}

export default channelReducer;
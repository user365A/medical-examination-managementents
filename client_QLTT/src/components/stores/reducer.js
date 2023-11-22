let initState = '';


const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'veryfy':
            let actionData = action.payload;
            console.log(actionData, "actionData"); // Check the payload
            let sendata = actionData;
            console.log(sendata, "sendata"); // Check the sendata variable
            return { ...state, sendata };
        default:
            break;
    }
    return state;
}

export default rootReducer;
const initaialState = {
    token: null,
    authenticated: false
}


const reducer = (state = initaialState, action) => {
    if (action.type === 'SETTOKEN') {
        return {
            authenticated: true,
            token: action.token
        }
    }
    else {
        return {
            token: null,
            authenticated: false
        }
    }
}

export default reducer
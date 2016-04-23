var actions = {};

actions.showLoading = (msg) => {
    return {
        type: 'SHOWLOADING',
        msg: msg
    }
}

actions.hideLoading = () => {
    return {
        type: 'HIDELOADING'
    }
}

actions.alert = (msg) => {
    return {
        type: 'ALERT',
        msg: msg
    }
    // return (dispatch, getState) => {
    // 	{
    // 		type: 'ALERT',
    // 		msg: msg
    // 	}
    // 	setTimeout(() => {
    // 		dispatch({
    // 			type: 'HIDEALERT'			
    // 		})
    // 	}, 1500);
    // }
}

actions.showBindUser = () => {
    return {
        type: 'SHOWBINDUSER'
    }
}

actions.hideBindUser = () => {
    return {
        type: 'HIDEBINDUSER'
    }
}


export default actions;

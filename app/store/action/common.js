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
}

export default actions;
const init =''

const notificationReducer = (state = init, action) => {

  switch(action.type) {
    case 'CLEAR':
			return ''
		case 'NOTIFY':
			return action.message
  }
  return state
}

export default notificationReducer
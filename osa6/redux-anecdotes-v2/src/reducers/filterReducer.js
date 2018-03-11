const init =''

export const filterChange = (filter) => {

  return {
    type: 'FILTER',
    filter
  }
}


const filterReducer = (state = init, action) => {
  switch(action.type) {
    case 'FILTER':
      return action.filter
    default:
      return ''
  }
}



export default filterReducer
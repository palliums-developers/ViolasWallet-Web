let initState = {
    type:'',
    types:''
}

let ListReducer = (state = initState, action) => {
  let type = state.type;
  let types = state.type;
  switch (action.type) { 
      case 't_type':
          return { type:action.params }  
      case 't_types':
          return { types:action.params } 
      default:
          return state;
  }
};
export default ListReducer;
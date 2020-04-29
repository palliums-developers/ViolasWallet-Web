let initState = {
    display:false,
    display1:false,
    address1:''
}

let ListReducer = (state = initState, action) => {
  let display = state.display;
  let display1 = state.display1;
  let address = state.address1;
  console.log(action.params)
  switch (action.type) { 
      case 'DISPLAY':
          return { display:action.params }  
      case 'DISPLAY1':
          return { display1:action.params.type }  
      case 'ADDRESS':
          return { address1:action.params.address }  
      default:
          return state;
  }
};
export default ListReducer;
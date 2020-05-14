let initState = {
    display:false,
    display1:false,
    address:'',
    amount:0,
    showExcode:false,
    visible: false,
    visible1: false,
    showpooling:false
}

let ListReducer = (state = initState, action) => {
  let display = state.display;
  let display1 = state.display1;
  let address = state.address;
  let amount = state.amount;
  let showExcode = state.showExcode;
  let visible = state.visible;
  let visible1 = state.visible1;
  switch (action.type) { 
      case 'DISPLAY':
          return { display:action.params }  
      case 'DISPLAY1':
          return { display1: action.params.type, address: action.params.address, amount: action.params.amount }  
      case 'EXCHANGE':
          return { showExcode: action.params.type }  
      case 'VISIBLE':
          return { visible: action.payload }  
      case 'VISIBLE1':
          return { visible1: action.payload } 
      case 'SHOWPOOL':
          return { showpooling: action.payload } 
      default:
          return state;
  }
};
export default ListReducer;
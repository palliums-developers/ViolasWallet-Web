let initState = {
    display: false,
    display1: false,
    display2: false
}

let ListReducer = (state = initState, action) => {
    let display = state.display;
    console.log(action.payload )
    switch (action.type) {
        case 'DISPLAY':
            return { display: action.payload };
        case 'DISPLAY1':
            return { display1: action.payload };
        case 'DISPLAY2':
            return { display2: action.payload };
        default:
            return state;
    }
};
export default ListReducer;
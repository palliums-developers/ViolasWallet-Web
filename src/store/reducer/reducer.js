let initState = {
    display: false,
    display1: false,
    display2: false,
    detailData:{}
}

let ListReducer = (state = initState, action) => {
    let display = state.display;
    let display1 = state.display;
    let display2 = state.display;
    let detailData = state.detailData;
    console.log(action.payload)
    switch (action.type) {
        case 'DISPLAY':
            return { display: action.payload };
        case 'DISPLAY1':
            return { display1: action.payload };
        case 'DISPLAY2':
            return { display2: action.payload.display2, detailData: action.payload.detailData };
        // case 'DETAILDATA':
        //     return { }
        default:
            return state;
    }
};
export default ListReducer;
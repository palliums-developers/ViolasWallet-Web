let initState = {
  detailAddr: "",
  name: "",
  eth: null,
  unreadCount:0
};

let ListReducer = (state = initState, action) => {
    console.log(action.data,'.....')
    switch (action.type) {
      case "GETETH":
        return { eth: action.payload };
      case "unreadCount":
        return { unreadCount: action.data };
      default:
        return state;
    }
};
export default ListReducer;
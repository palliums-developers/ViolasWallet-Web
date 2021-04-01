import axios from "axios";
let url = "https://api4.violas.io";
//未读推送数
export const getCurAddAddress = () =>{
    return dispatch =>{
         fetch(
           url +
             "/1.0/violas/messages/unread/count?token=" +
             window.sessionStorage.getItem("firebase_token")
         )
           .then((res) => res.json())
           .then((res) => {
             console.log(res,'...../');
             if (res.data) {
                 dispatch({
                   type: "unreadCount",
                   data: res.data.notice + res.data.message,
                 });
             }
           });
    }
}
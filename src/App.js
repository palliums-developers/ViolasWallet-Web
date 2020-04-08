import React, { Component } from "react";
import "./App.css";
import QRCode from "qrcode.react"

let url = "http://52.27.228.84:4000"

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      session_id: "",
      login: false,
      time: 0,
      address: "",
      wallet_info: {}
    }
  }
  login_state() {
    // http://125.39.5.57:38080/app/mock/16/1.0/violas/singin
    fetch(url + "/explorer/violas/singin?session_id=" +
      this.state.session_id
      // ")Z9v[lNc11tkUYC2)ADwP2!kYL$5SnjjT]^IVfbIg$*lru3y5o7p0XwdR[[SzVsTwdxpq)oqXMJG]$hY&Hr50(o1oEhniPy#VH[Fh7tT2WU)zNn$go%9QmZbj#d$lQDBZ79wEN1V(&3WM9Si^vs4"

      // {
      //   method: "POST",
      //   // body: this.state.session_id,
      //   body: {
      //     // type: "1",
      //     // "sessioin_id": "bh!%Rc(Oyu7INDjF6QKqF^x*dn&l2OYb4W*d$xZL&1UM)h6UiMyOEC1qMm4Dn$Ej*QDorV5[#QG]Jwp2uFosP1eNXtAYz7B$UMUxhfRMaZ3slb16lP[[M2dS!0[nTZRPfM3wvgfHK(CgHPee[tkefpiJXNg)J*E",
      //     // "session_id":"vYj^OV[*lK10H#PpmK4@fxB*jbY3uN@js6&wppsC[bG8fLN]BIcuRh!L!gdh)yOw!SlEITrmYJU1bUpdW(6(X30sVLJTYklG#*mBSzm$TjMYocRqA8J!yXnM&iP(0rfQt6zF3#iTqW*7yXLj8pg%jmj[i$!n",
      //     // "address": "b45d3e7e8079eb16cd7111b676f0c32294135e4190261240e3fd7b96fe1b9b89"
      //     // session_id:this.state.session_id
      //     session_id: "*j7DMD^v1K@(t*LH69(3xrtLg%p@4Aj1yTTYWhWfLw7rURPOF(RX1KHI^em#YSRKEdw8@*n&V$FCi5l5alN%jKsBUrMciE55iIA0kPP%(EgiSxkNNu33V2*P&BuS)FedI]CbglbZ(Ne$)qMt&uBk^)7kM5UwWKRX(BE"
      //   },
      //   Headers: {
      //     // 'Accept': 'application/json',
      //     'Content-Type': 'application/json',
      //   },
      // }
    )
      .then(res => res.json())
      // .then(res=>{console.log(JSON.stringify(res.data.wallets));return res})
      .then(res => { res.data.status === 1 ? this.setState({ login: true, wallet_info: JSON.stringify(res.data.wallets) }) : this.setState({ login: false }) })
      .catch(e => console.log(e))
  }
  get_address_info() {
    fetch(url + "/explorer/violas/address/" + this.state.address)
      .then(res => res.json())
      .then(res => { this.setState({ address_info: res }) })
  }
  getQR = () => {
    return fetch(
      url + "/explorer/violas/singin/qrcode"
    )
      .then(res => res.json())
      .then(res => {
        console.log(res.data.qr_code.session_id.toString())
        this.setState({
          session_id: res.data.qr_code.session_id.toString(),
          login: false
        });
      });
  };
  ask_login_state() {
    let count = this.state.time;
    let Timer = setInterval(() => {
      if (this.state.login) {
        clearInterval(Timer);
        this.setState({ clicked: false });
      } else if (count === 60) {
        alert("timeout please click login again");
        clearInterval(Timer)
        this.setState({ clicked: false });
      } else {
        this.login_state();
        count++
      }
    }, 1000);
    // setTimeout(() => { this.setState({ session_id: "" }) }, 5000);
  }
  click_login = () => {
    // return (e) => {console.log(111),this.getQR()};
    this.setState({ clicked: true, login: false, address: "", wallet_info: {} });
    this.getQR();
    this.ask_login_state();
  };
  json2String = (_id) => {
    let _temp = {
      session_id: _id,
      type: 2
    }
    return JSON.stringify(_temp)
  }
  // printWallet = (_temp) => {
  //   _temp.data?return (_temp.data.wallets.map((item, i) => (
  //     <li key={i}>
  //       <p>{item.address}</p>
  //       <p>{item.identity}</p>
  //       <p>{item.name}</p>
  //       <p>{item.type}</p>
  //     </li>
  //   ))):return (<></>)
  // }
  render() {
    return (
      <div className="App">
        {
          this.state.clicked ? <></> : <button onClick={this.click_login}>log in</button>
        }
        <br />
        {
          this.state.session_id === ""
            ? <></> :
            this.state.login ? <></> :
              <QRCode size={300} value={this.json2String(this.state.session_id)} style={{ margin: "30px" }}></QRCode>
        }
        <p>log in {this.state.login.toString()}</p>
        <p>Your wallet information :</p>
        {/* {this.state.wallet_info[0] ?
          (this.state.wallet_info.map((item) => (
            <li>
              <p>{item.address}</p>
              <p>{item.identity}</p>
              <p>{item.name}</p>
              <p>{item.type}</p>
            </li>
          ))) :
          <></>
        } */}
        {
          JSON.stringify(this.state.wallet_info)
        }
      </div>
    )
  }
}
export default App;


// http://125.39.5.57:38080/app/mock/16/explorer/violas/singin?session_id=vYj^OV[*lK10H#PpmK4@fxB*jbY3uN@js6&wppsC[bG8fLN]BIcuRh!L!gdh)yOw!SlEITrmYJU1bUpdW(6(X30sVLJTYklG#*mBSzm$TjMYocRqA8J!yXnM&iP(0rfQt6zF3#iTqW*7yXLj8pg%jmj[i$!n
// http://125.39.5.57:38080/app/mock/16/explorer/violas/singin?session_id=yISBYzm2Y(Z6Ags!DmkWwn6KbiVYp)JrKLHzefM$Enbc2IExTjO2j4abd3Zh%I2NF0knGnBHQrmJWH1CPvb3vx&22NYw)v))JPg[*1XNiCeZU&I*[^0r2sDaFw4y!jkRhQVJXU9f^KT!hHFOwM%^7Z(!XIMV^lqO2(i3h

//http://52.27.228.84:4000/1.0/violas/singin
let aaa =
{
  "type": 2,
  "session_id": "f47d0e3e39dc52e0ee6f5fe7af940fc40628f110d4d954626edccb42d6d09a96",
  "wallets": [
    {
      "type": "violas", "address": "3a4cd3dd5bcb938dd7f8e68e1f0ebb6bae1492c41749857d9fda01b7e5f89e6c",
      "name": "Violas-Qwe", "identity": 0
    },
    {
      "type": "libra", "address": "3a4cd3dd5bcb938dd7f8e68e1f0ebb6bae1492c41749857d9fda01b7e5f89e6c",
      "name": "Libra-Qwe",
      "identity": 0
    },
    {
      "type": "bitcoin",
      "address": "mk6uz3KnEVgMD7Ht7okrfNgnhsNJyDupH8",
      "name": "Bitcoin-Qwe",
      "identity": 0
    },
    {
      "type": "violas",
      "address": "e06fda7f2bfb3efc1f9e976bf277a1328f599021f45db6182309f23a9c7be949",
      "name": "import vwallet",
      "identity": 1
    }
  ]
}
import React, { Component } from "react";
import QRCode from "qrcode.react";
import { message } from "antd";
import { callHandler, registerHandler } from "../../utils/jsbridge";
//保存图片
class PhotoSynthesis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgData: "",
      id:""
    };
  }
  componentWillMount() {
    this.setState({
      id: rndNum(100)
    });
  }
  initCanvas() {
    let canvas1 = document.getElementById("customCanvas");
    let width = (canvas1.width = 305);
    let height = (canvas1.height = 534);
    let context1 = canvas1.getContext("2d");
    context1.rect(100, 0, canvas1.width, canvas1.height);
    context1.fillStyle = "#fff";
    context1.fill();
    var myImage = new Image();
    myImage.src = require("./image/m_编组 322@2x.png"); //背景图片 你自己本地的图片或者在线图片
    myImage.crossOrigin = "Anonymous";
    myImage.onload = function () {
      context1.drawImage(myImage, -2, 0, 309, 534);
      var myImage2 = new Image();
      myImage2.src = require("./image/m_编组 31@2x.png"); //你自己本地的图片或者在线图片
      myImage2.crossOrigin = "Anonymous";
      myImage2.onload = function () {
        let qrCodeCanvas = document.querySelectorAll("canvas")[0];
        let image3 = new Image();
        image3.src = qrCodeCanvas.toDataURL("image/png");
        let xw = width - 72;
        let xh = height - 72;
        context1.drawImage(myImage2, 40, 70, 234, 168);
        image3.onload = function () {
          context1.font = "600 17px PingFangSC-Semibold, PingFang SC";
          context1.fillText("扫描二维码", xw - 120, xh + 5);
          context1.fillStyle = "rgba(254, 169, 18, 1)";
          context1.fillText("一起瓜分奖励", xw - 138, xh + 30);

          context1.drawImage(image3, xw - 20, xh - 20, 60, 60);
          //绘制完成,转为图片
          setTimeout(function () {
            //在ios上无法在画完之后取到整个画布内容，加了个settimeout
            let bigcan = document.querySelectorAll("canvas")[1];
            let images = new Image();
            images.src = bigcan.toDataURL("image/png");
            // alert(bigcan.toDataURL("image/png"));
            images.setAttribute("crossOrigin", "Anonymous");
          });
        };
      };
    };
  }
  getPhoto1 = () => {
    var type = "png";
    var bigcan = document.querySelectorAll("canvas")[1];
    //设置保存图片的类型
    var imgdata = bigcan.toDataURL(type);
    //将mime-type改为image/octet-stream,强制让浏览器下载
    // var fixtype = function (type) {
    //   type = type.toLocaleLowerCase().replace(/jpg/i, "jpeg");
    //   var r = type.match(/png|jpeg|bmp|gif/)[0];
    //   return "image/" + r;
    // };
    // imgdata = imgdata.replace(fixtype(type), "image/octet-stream");
    this.setState({
      imgData: imgdata,
    });
    this.saveToAlbum(imgdata.split(",")[1]);
  };
  saveToAlbum = (imgBase64) => {
    callHandler(
      "callNative",
      JSON.stringify({
        id: this.state.id,
        method: "save_picture",
        params: [imgBase64],
      }),
      (resp) => {
        message.success(JSON.stringify(resp));
      }
    );
  };

  getPhoto = () => {
    var type = "png";
    this.download(type);
  };
  //图片下载操作,指定图片类型
  download(type) {
    var bigcan = document.querySelectorAll("canvas")[1];
    //设置保存图片的类型
    var imgdata = bigcan.toDataURL(type);
    //将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
      type = type.toLocaleLowerCase().replace(/jpg/i, "jpeg");
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return "image/" + r;
    };
    imgdata = imgdata.replace(fixtype(type), "image/octet-stream");
    //将图片保存到本地
    var saveFile = function (data, filename) {
      var link = document.createElement("a");
      link.href = data;
      link.download = filename;
      var event = document.createEvent("MouseEvents");
      event.initMouseEvent(
        "click",
        true,
        false,
        window,
        0,
        0,
        0,
        0,
        0,
        false,
        false,
        false,
        false,
        0,
        null
      );
      link.dispatchEvent(event);
    };
    var filename = new Date().toLocaleDateString() + "." + type;
    saveFile(imgdata, filename);
  }
  componentDidMount() {
    this.initCanvas();
  }
  // componentDidUpdate() {
  //   this.initCanvas();
  // }

  render() {
    let { canvaswidth, canvasheight, ifMobile } = this.props;
    // console.log(ifMobile);
    return (
      <div
        className={ifMobile == false ? "canvasWrap" : "canvasWrap canvasWrap1"}
      >
        <div className="canvas">
          <QRCode style={{ display: "none" }} value={666}></QRCode>
          <canvas
            id="customCanvas"
            width={canvaswidth}
            height={canvasheight}
            style={{ marginTop: "50%" }}
          ></canvas>
          <img className="canimg" src="" />
          {/* <img id="avatar" ></img> */}
          {ifMobile == false ? (
            <a className="btns" onClick={() => this.getPhoto()}>
              保存图片
            </a>
          ) : (
            <div className="btns1List">
              <a className="btns1" onClick={() => this.getPhoto1()}>
                <img src="/img/mobile_m_xiazai 2@2x.png" />
                保存到相册
              </a>
            </div>
          )}
          {ifMobile == false ? (
            <p
              className="closeDilog"
              onClick={() => this.props.closeDialog(false)}
            >
              <img src="/img/m_guanbi 2@2x.png" />
            </p>
          ) : (
            <p
              className="closeDilog1"
              onClick={() => this.props.closeDialog(false)}
            >
              取 消
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default PhotoSynthesis;

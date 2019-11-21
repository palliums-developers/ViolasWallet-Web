import React, { Component } from 'react';
import QrReader from 'react-qr-reader';
import { inject,observer } from 'mobx-react';
// import '../default.scss';
@inject('index')
@observer

class Sweepcode1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file:false,
            address:''
        }
    }
    componentDidMount(){
       
    }
    handleScan = data => {
        let start = data.indexOf(":"); 
        let str= data.substring(start,0); 
        let mun= data.substring(start+1); 
        console.log(mun)
        this.props.index.getAddress({
            type:str,
            address:mun
        });
     }
 
     handleError = err => {
         console.error(err)
     }
 
     openImageDialog = () =>{
         this.setState({
            file:true
         },()=>{
             this.refs.qrReader.openImageDialog();
         }) 
      }
    render() {
        return (
            <div className="sweepcode">
                <header>
                    <span onClick={() => {
                    this.props.history.push('/transfar')
                    }}><img src="/img/Combined Shape 1@2x.png"/></span>
                    <span>扫一扫</span>
                    <button onClick={this.openImageDialog}>相册</button>
                </header>
                <section>
                    <div className="code">
                        <QrReader
                            ref="qrReader"
                            delay={300}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            style={{ width: '100%' }}
                            legacyMode={this.state.file}
                        />
                    </div>
                </section>
            </div>
        );
    }
}

export default Sweepcode1;

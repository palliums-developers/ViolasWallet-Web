import React, { Component } from 'react';
import '../default.scss';
import { inject, observer } from 'mobx-react';
import { thisExpression } from '@babel/types';
import intl from 'react-intl-universal';
let aes256 = require('aes256');

@inject('index')
@observer

class ConfirmWords extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mnes_arr: [],
            mnes_empty: [],
            mnes_json: [],
            clickable: true,
            swap:{},
        }
    }
    componentWillMount(){
      intl.options.currentLocale=localStorage.getItem("local");
      this.forceUpdate();
    }
    componentDidMount() {
        let decrypted = JSON.parse( window.localStorage.getItem('data'));
        console.log(decrypted)
        this.setState({ mnes_arr: decrypted.mne_arr.split(" ") });
        let mne_arr_json = this.get_mne_json(decrypted.mne_arr);
        this.random_arr(mne_arr_json);
        this.init_click_block_arr();
        
    }

    get_mne_json(mne_string_temp) {
        let temp = [];
        let temp_part = {};
        for (let i = 0; i < 12; i++) {
           console.log(mne_string_temp)
          temp_part = {
            index: i,
            mne: mne_string_temp.split(" ")[i]
          };
          temp.push(temp_part);
        }
        this.setState({ mnes_json: temp });
        return temp;
    }

    init_click_block_arr() {
        let temp = [];
        for (let i = 0; i < 12; i++) {
            temp.push(" ");
        }
        this.setState({ mnes_empty: temp });
    }
    random_arr(arr) {
        if (!Array.prototype.derangedArray) {
          Array.prototype.derangedArray = function() {
            for (
              var j, x, i = this.length;
              i;
              j = parseInt(Math.random() * i),
                x = this[--i],
                this[i] = this[j],
                this[j] = x
            );
            return this;
          };
        }
        return arr.derangedArray();
      }
    handleRemove(remove_json) {
        let temp_mnes_empty = this.state.mnes_empty;
        let temp_mnes_json=this.state.mnes_json;
        let temp_swap=this.state.swap;
        if(remove_json===" "){
          return;
        }
        for(let i=0;i<12;i++){
          temp_swap={index:remove_json.index,mne:remove_json.mne};
          this.setState({swap:temp_swap});
          if(temp_mnes_json[i].index==remove_json.index){
            temp_mnes_json[i].mne=remove_json.mne;
            this.setState({mnes_json:temp_mnes_json});
          }
        }
        for (let i = 0; i < 12; i++) {
          if (temp_mnes_empty[i].index == remove_json.index) {
            temp_mnes_empty[i] = " ";
            this.setState({ mnes_empty: temp_mnes_empty });
            this.setState({clickable:true});
            return;
          }
        }
    }
    check_mne() {
        let temp_check = this.state.mnes_empty;
        let temp_arr = this.state.mnes_arr;
        for (let i = 0; i < 12; i++) {
          if (temp_check[i] !== " " && temp_check[i].mne !== temp_arr[i]) {
            this.setState({ clickable: false });

          }
        }

      }
    handleClick(click_json) {
        this.handleMove(click_json);
        this.check_mne();
      }
    
      handleMove(click_json){
        let temp_mnes_empty = this.state.mnes_empty;
        let temp_mnes_json=this.state.mnes_json;
        let temp_swap=this.state.swap;
        if(click_json.mne===" "){
          return;
        }else if (this.state.clickable){
          for(let i=0;i<12;i++){
            if(temp_mnes_json[i].index===click_json.index){
              temp_swap={index:click_json.index,mne:click_json.mne};
              this.setState({swap:temp_swap});
              temp_mnes_json[i].mne=" ";
              this.setState({mnes_json:temp_mnes_json});
            }
          }
          for (let i = 0; i < 12; i++) {
            if (temp_mnes_empty[i] == " ") {
              temp_mnes_empty[i] = temp_swap;
              this.setState({ mnes_empty: temp_mnes_empty });
              return;
            }
          }
        } else {
            console.log('error ')
        }
      }
    finish = () =>{
      if(this.state.mnes_empty.length == 12 && this.state.mnes_empty.length != '' ){
        let data = JSON.parse(window.localStorage.getItem('data'));
        var jsonData = aes256.encrypt(data.password1, JSON.stringify(data));
        var a = document.createElement("a");
        var file = new Blob([jsonData], { type: 'text/plain' });
        a.href = URL.createObjectURL(file);
        a.download = data.name + '.json';
        a.click();
        data.backup = false;
        window.localStorage.setItem('data',JSON.stringify(data))
        this.props.history.push('/home')
      }
      
    }
    render() {
        return (
            <div className="confirmWords">
                <header>
                    <span onClick={() => {
                        this.props.history.push('/codeBackup')
                    }}><img src="/img/Combined Shape 1@2x.png" /></span>
                    <span>{intl.get('Confirm Mnemonic Words')}</span>
                </header>
                <section>
                    <div className="backupPaper">
                        <h4>{intl.get('Please select these mnemonic words in proper order to confirm you have backup them properly')}</h4>
                        {
                            this.state.clickable ? null : <p>{intl.get('The order of mnemonic words is not correct, please try again')}</p>
                        }
                        <div className="words">
                            {this.state.mnes_empty.map((v, i) => {
                                return (
                                    <p key={i} className="square" onClick={() => this.handleRemove(v)}>
                                        {v.mne}
                                    </p>
                                );
                            })}
                        </div>
                        <div className="wordsClick">
                        {
                            this.state.mnes_json.map((v, i) => {
                            return (
                            <p key={i} className="square" onClick={() => this.handleClick(v)}>
                                {v.mne}
                            </p>
                            );
                        })
                        }
                        </div>
                        <div className="btn" onClick={()=>this.finish()}>{intl.get('Complete')}</div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ConfirmWords;

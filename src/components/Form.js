import React, { Component } from 'react';
import Web3 from 'web3';
import './Form.css';
import Meme from '../abis/Meme.json'
import { useHistory } from "react-router-dom";
// import {React} from 'react'
import {withRouter}  from 'react-router-dom'
// import {Component} from 'react'
import "./B2.jpg"
 
// import Login from './Login.js';
// import{BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import { Route , Switch , BrowserRouter as Router } from 'react-router-dom'

//import certcontract from "./Meme.json";

const web3 = window.web3;
var abiDecoder = require('abi-decoder');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class Form extends Component {

  constructor(props) {
    super(props)

    this.state = {
      memeHash: '',
      contract: null,
      web3: null,
      buffer: null,
      account: "",
      result1:"",
      txh:"0x0",
      param_values:""
    }
  }

  

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({account:accounts[0]})
    console.log(accounts)
    const networkId =await web3.eth.net.getId()
    console.log(networkId)
    const networkData =Meme.networks[networkId]
    if(networkData)
    {
      const abi= Meme.abi
      const address=networkData.address

      //fetch contract
      const contract =web3.eth.Contract(abi,address)

      this.setState({contract})
      const memeHash=await contract.methods.get().call()
     /* var x='0x583e7e16e5bf9419a4f927764c68246678f478c07e6082162c58f8c7cff1307f'
      web3.eth.getTransaction(x,function(err,tx)
      {
        let txdata=tx.input;
        let input_data = '0x' + txdata.slice(10);
        let params = web3.eth.abi.decodeParameters(['bytes32', 'string', 'string', 'string'], input_data);
        console.log(params);
      })*/
     // const mem=await contract.methods.gettx(0xd7d47297b6ad5f52bc47a02af537e27379acd1248eb4b1afe7bafc8a88c370d2).call
      //console.log("from blk hash",mem);
      // console.log("meme hash",memeHash)

      var ABI = abi ;   // abi of your contract
var transaction = '0x6590cca03848ee00d6b93bf36e54505b154c5ec1477ee2a085216202ace86978';
//var transaction = this.state.txh;
web3.eth.getTransaction(transaction, function(err, tx){
    abiDecoder.addABI(ABI);
    let tx_data = tx.input;

    let decoded_data = abiDecoder.decodeMethod(tx_data);
    let params = decoded_data.params;

    let param_values = [];
    for(let i in params){  // loop to print parameters without unnecessary info
      param_values.push( params[i].value);
    }

    console.log("from blockchain",param_values);
    // this.setState({param_values})
    
});
       
      this.setState({memeHash})
     
      this.state.result1=memeHash
      // console.log('bhkdnjn');
      // var tt=web3.eth.getTransaction('0xd7d47297b6ad5f52bc47a02af537e27379acd1248eb4b1afe7bafc8a88c370d2');
     
      //        console.log(tt);
    }
    else{
      window.alert("smart contract not deployed")
    }
  }
  
  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
    }
  }

   // example="QmS8LhsnR6A5vpgA3sfvZBbp7wpAHaLtbziHyw1huQoot6"
   onSubmit = (event) => {
    event.preventDefault()
    console.log("Submitting file to ipfs...")
    
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      console.log('Ipfs result', this.state.result1)
      const memeHash=result[0].hash
      this.setState({memeHash})
      if(error) {
        console.error(error)
        return
      }
    
      
       this.state.contract.methods.set(result[0].hash).send(
         { 
           from: this.state.account
         },
         (error,result)=>{
           if(error) console.log("error"+error);
           else{
             this.setState({txh:result});
             console.log("result3",this.state.txh);
            
              
           }
         }
           ).then((r) => {
         return this.setState({ memeHash: result[0].hash })
       })
    })
  }


  display=() =>{
       
    this.props.history.push('/')
}
    
// add=(e) =>{
//   e.preventDefault();
//   this.props.a(this.state)
//   alert ("info  added")
// }
  



  render() {
    return (
      <div >

 <nav class="navbar navbar-dark bg-dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
  
      BLOCKCHAIN 
    </a>
  </div>
</nav>
<div className="bg3">
<div className="container-fluid mt-5">
  <div className="t3">
  <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
               < div className="ha">
              
               </div>
      
            
                <div className='b5'>
                
                <div  className='view'>
              <a href={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} >VIEW DATA</a>
             
              <h6>{this.state.txh}</h6>
              
                
                  </div>
                <form onSubmit={this.onSubmit} >
                  <div className="fi">
                         <input type='file' onChange={this.captureFile}   />
                  </div>
                  
                
                  <div className="b">
                  <input  type='submit' class="btn btn-dark"  />
                  <input type ="button"  class="btn btn-dark" value="back" onClick={this.display}  />
                
                  </div>
                </form>
                </div>
              </div>
            </main>
          </div>
  </div>
        
        </div>
</div>
        
      </div>
    );
  }
}

export default withRouter(Form);

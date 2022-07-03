// import { useState } from 'react'
// import{useHistory} from 'react-router-dom'
// import { Form } from "react-bootstrap";
// import * as React from 'react';
import './Verify.css'
// import Meme from '../abis/Meme.json'
// import Web3 from 'web3';

// const web3 = window.web3;
// var abiDecoder = require('abi-decoder');

// export default function Verify(){
//     const [hash , setHash]=useState([])
//     const [pass, setPass] = useState([])
//     const history = useHistory()

//     const goback = () =>{
      
//             history.push("/")   

//     }


//     const verify = () =>{
      
//         alert("ALERTT!!!!! HASH NOT VERIFIED")
//     }


//     return(
//         <>
//           <div className='bg1'>
//           <Form >
             
//               <input type="text" name="hash" class="shadow-lg p-3 mb-5 bg-body rounded" placeholder="Enter the hash value" id="hash" autoComplete='off' value={hash}
//                             onChange={(e) => setHash(e.target.value)} className="t" />
        
               
              
//              <div className="btn1">
//              <button type="button" class="btn btn-danger" onClick={verify}>Verify</button>
             
           
                
//              <button type="button" class="btn btn-danger"   onClick={goback} >Back</button>
//              </div>
             
//               {/* <input type ="button"  value="back" onClick={goback}  /> */}
//           </Form>
     
//           </div>
         
//         </>
//     )


// }

import React, { Component } from 'react';
import Web3 from 'web3';
import './Form.css';
import Meme from '../abis/Meme.json'
import { useHistory } from "react-router-dom";
import {withRouter}  from 'react-router-dom'
import "./B2.jpg"
import { Route , Switch , BrowserRouter as Router } from 'react-router-dom'
const web3 = window.web3;
var abiDecoder = require('abi-decoder');
const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class verify extends Component {

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
      param_values:"",
      hash:""
    }
  }

     
     

         goback = () =>{
      
            this.props.history.push("/")   

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
      param_values.push(params[i].name + " : " + params[i].value);
    }

    console.log(param_values);
    // this.setState({param_values})
    
});
       
      this.setState({memeHash})
     
      this.state.result1=memeHash
    }
    else{
      window.alert("smart contract not deployed")
    }
  }
  
  display=() =>{
       
    this.props.history.push('/')
}
    
     verify = (event) =>{
        event.preventDefault()
        if(this.state.hash === this.state.hash ==="0x91d8bfbc0fcca4760b7f176d790025ef94fd4ced86ff1ea5cb8b3b5d8a5273ca" || this.state.hash ==="0xbf8d08fb47e22f1ccd928c300b2198d45d862bf87a19ef0c161e88188361b586" || this.state.hash ==="0x2e7c717266c5865f8ae7389cd50695c505585f6f86089b85440f6fdeedc630f5" || this.state.hash ==="0x7a99cac510fbb4bf8b2b0857a1120023726ebcf8d9f9606cf815db0aac1f068f" ||this.state.hash ==="0x9e826545a5dd1cdfe5f2c4814a1d2f4410a55c25646c9309cbbcc2904a7eb7b3" || this.state.hash.length===66 ){
            alert("valid")
        }

        else {
            alert ("not valid")
    }
        console.log("verifying....")
      

       //      alert("ALERTT!!!!! HASH NOT VERIFIED")
         }
  



  render() {
 
    return(
        <>
        <div className='bg1'>
        
        <input type="text" value={this.state.hash}         onChange={(e) => this.setState({hash:e.target.value})} className="t" />
        <div className="btn1">
         <button type="button" class="btn btn-danger" onClick={this.verify}>Verify</button>
         <button type="button" class="btn btn-danger"   onClick={this.goback} >Back</button>
        </div>
      
        </div>
         </>
     );
  }
}

export default withRouter(verify);

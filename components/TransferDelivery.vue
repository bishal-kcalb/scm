<template>
    <div class=" flex items-center justify-center p-4">
      <div  class="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <!-- <h2 class="text-2xl font-bold text-center text-black mb-6">Add Manufacturer</h2> -->
  
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2 md:col-span-2">
            <label for="manufacturerAddress" class="block text-sm font-medium text-gray-700">Order Id </label>
            <input id="manufacturerAddress" disabled  v-model="props.orderData.orderId" required rows="3"
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50">
          </div>
          <div class="space-y-2 md:col-span-2">
            <label for="manufacturerAddress" class="block text-sm font-medium text-gray-700">Shipper Address</label>
            <input id="manufacturerAddress" v-model="shipperAddress" required rows="3"
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50">
          </div>
        </div>
        <ButtonPrimary :title="title" class="mt-5" @click="transferDelivery()"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Web3 from "web3";
  import { scmContract, scmAbi } from "../constants/constant.js"

  const props = defineProps({
    orderData:{
        type: Object,
        required: true
    }
  })
  
  const web3 = new Web3('http://127.0.0.1:8545')
  const contractScm = new web3.eth.Contract(scmAbi,scmContract);
  
  const  shipperAddress = ref('')
  const title='Transfer For Delivery'
  
  
  const transferDelivery = async()=>{
      const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
      })
    const txObject = {
      from: accounts[0],
      to: contractScm.options.address,  // Smart contract address
      data: contractScm.methods.transferForDeliver(
        shipperAddress.value,
        props.orderData.orderId
      ).encodeABI(),  // ABI encoding of the method and parameters
    };

    const response = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    });

    console.log(response);
   
  }
  
  onBeforeMount(()=>{
console.log('order prp',props.orderData)  })
  </script>
  
  
  <style>
  input:focus {
    outline: none;
  }
  
  input:focus-visible {
    outline: none;
  }
  
  input {
    border: 1px solid #FF6600 !important;
  }
  </style>
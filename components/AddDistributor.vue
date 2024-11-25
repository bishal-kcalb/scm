<template>
    <div class=" flex items-center justify-center p-4">
      <div  class="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="name" class=" text-sm font-medium text-gray-700 focus:none">Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
               class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2">
            <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
            <input
              id="location"
              v-model="formData.location"
              type="text"
              required
               class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2">
            <label for="contact" class="block text-sm font-medium text-gray-700">Contact</label>
            <input
              id="contact"
              v-model="formData.contact"
              type="text"
              required
               class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
               class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Type</label>
            <input
              id="email"
              v-model="formData.type"
              type="text"
              required
               class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          <div class="space-y-2">
            <label for="email" class="block text-sm font-medium text-gray-700">Distributor Address</label>
            <input
              id="email"
              v-model="formData.distributorAddress"
              type="email"
              required
               class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
        </div>
        
        <ButtonPrimary :title="title" class="mt-5" @click="addDistributor()"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Web3 from "web3";
import { scmContract, scmAbi } from "../constants/constant.js"

const web3 = new Web3('http://127.0.0.1:8545')
const contractScm = new web3.eth.Contract(scmAbi,scmContract);
 const title = 'Register' 
  const formData = ref({
    name: '',
    location: '',
    contact: '',
    email: '',
    type:'',
    distributorAddress: ''
  })
  

  
const addDistributor = async()=>{
    const accounts = await window.ethereum.request({
      method:'eth_requestAccounts'
    })
    const txObject = {
      from: accounts[0],
      to: contractScm.options.address,  // Smart contract address
      data: contractScm.methods.addDistributor(
        formData.value.name,
        formData.value.location,
        formData.value.contact,
        formData.value.email,
        formData.value.type,
        formData.value.distributorAddress
      ).encodeABI(),  // ABI encoding of the method and parameters
    };

    const response = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    });
    console.log('Transaction successful:', response);
   
}
  </script>
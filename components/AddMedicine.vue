<template>
    <div class="  flex items-center justify-center p-4">
      <div class="max-w-4xl w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-2">
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2">
            <label for="medType" class="block text-sm font-medium text-gray-700">Medicine Type</label>
            <input
              id="medType"
              v-model="formData.medType"
              type="text"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2">
            <label for="manufacturedDate" class="block text-sm font-medium text-gray-700">Manufactured Date</label>
            <input
              id="manufacturedDate"
              v-model="formData.manufacturedDate"
              type="date"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2">
            <label for="expiryDate" class="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input
              id="expiryDate"
              v-model="formData.expiryDate"
              type="date"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2">
            <label for="mrp" class="block text-sm font-medium text-gray-700">Description</label>
            <input
              id="des"
              v-model="formData.description"
              type="text"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2">
            <label for="manufacturerId" class="block text-sm font-medium text-gray-700">MRP</label>
            <input
              id="mrp"
              v-model="formData.mrp"
              type="text"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
<!--           
          <div class="space-y-2">
            <label for="category" class="block text-sm font-medium text-gray-700">Manufacturer Id</label>
            <input
              id="mId"
              v-model="formData.manufacturerId"
              type="text"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div> -->
          <div class="space-y-2">
            <label for="category" class="block text-sm font-medium text-gray-700">QRcode Url</label>
            <input
              id="qr"
              v-model="formData.qrcodeUrl"
              type="text"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            />
          </div>
          
          <div class="space-y-2 md:col-span-2">
            <label for="description" class="block text-sm font-medium text-gray-700">Category</label>
            <input
              id="category"
              v-model="formData.category"
              rows="3"
              required
              class="mt-1 block text-black w-full bg-transparent rounded-sm border-black  focus:border-[#FF6600] focus:ring focus:ring-[#FF6600] focus:ring-opacity-50"
            >
          </div>
        </div>
        
        <ButtonPrimary :title="title" class="mt-5" @click="addMedicine()"/>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Web3 from "web3";
import { scmContract, scmAbi } from "../constants/constant.js"

const web3 = new Web3('http://127.0.0.1:8545')
const contractScm = new web3.eth.Contract(scmAbi,scmContract);
  const title='Add Medicine'
  const formData = ref({
    name: '',
    medType: '',
    manufacturedDate: '',
    expiryDate: '',
    description: '',
    mrp: '',
    qrcodeUrl:'',
    category: ''
  })
  
  
  const addMedicine = async()=>{
    const accounts = await window.ethereum.request({
      method:'eth_requestAccounts'
    })
    console.log('date is ',formData.value.manufacturedDate)
    const txObject = {
      from: accounts[0],
      to: contractScm.options.address,  // Smart contract address
      data: contractScm.methods.addMedicine(
        formData.value.name,
        formData.value.medType,
        formData.value.manufacturedDate,
        formData.value.expiryDate,
        formData.value.description,
        formData.value.mrp,
        formData.value.qrcodeUrl,
        formData.value.category
      ).encodeABI(),  // ABI encoding of the method and parameters
    };

    const response = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    });
    console.log('Transaction successful:', response);
 
}
  </script>
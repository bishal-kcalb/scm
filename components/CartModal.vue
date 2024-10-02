<template>
    <div>
        <UModal
        v-model="props.isOpen"
        prevent-close
        :ui="{
          body: { background: 'bg-white' },
          background: 'bg-white',
          rounded: 'rounded-xl',
          base: 'rounded-xl',
        }"
      >
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-red dark:divide-[#F5F5F5]',
            background: 'bg-white',
            body: { background: 'bg-white' },
            header: { background: 'bg-white', base: 'text-[#604CC3]' },
            rounded: 'rounded-xl',
            base: 'rounded-xl text-[#604CC3]',
          }"
        >
          <template #header>
            <div class="flex items-center text-center justify-between">
              <h3
                class=" text-[#604CC3] text-xl font-semibold leading-6 text-gray-900 dark:text-[#604CC3]"
              >
                Cart Items Details
              </h3>
              <UButton
                color="orange"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="sendDataToParent"
              />
            </div>
          </template>
          <Table :columns="props.col" :td="props.row" :title="'Cart Items'"/>
          <ButtonSecondary :title="'Place Order For All Cart Items'" @click="placeOrder"/>
          
        </UCard>
      </UModal>
    </div>
</template>

<script setup>
import Web3 from "web3";
import { scmContract, scmAbi } from "../constants/constant.js"

const web3 = new Web3('http://127.0.0.1:8545')
const contractScm = new web3.eth.Contract(scmAbi,scmContract);

const isOpen = ref(false)

const props = defineProps({
    isOpen:{
        type:Boolean,
        required:true
    },
    col:{
      type:Array,
      required:true
    },
    row:{
      type:Array,
      required:true
    }
})

const emit = defineEmits(['update'])

const sendDataToParent = ()=>{
    const data = isOpen.value;
    emit('update',data);
}


const placeOrder = async() => {
    const accounts = await window.ethereum.request({
      method:'eth_requestAccounts'
    })
 
    const items = []
    props.row.forEach(element => {
        element.medId
        items.push(Number(element.medId))
        console.log(element.medId)
    });
    
   

    const txObject = {
      from: accounts[0],
      to: contractScm.options.address,  // Smart contract address
      data: contractScm.methods.placeOrder(
        accounts[0],
        items,

      ).encodeABI(),  // ABI encoding of the method and parameters
    };

    const response = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    });
    console.log('Transaction successful:', response);
}

onBeforeMount(()=>{
    console.log("cartitem in order is",props.row)
})

</script>
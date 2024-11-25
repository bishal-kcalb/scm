<template>
    <div>
        <UModal :fullscreen="true"
        v-model="props.isOpen"
        prevent-close
        :ui="{
          body: { background: 'bg-white dark:bg-white' },
          background: 'bg-white dark:bg-white',
          rounded: 'rounded-xl',
          base: 'rounded-xl bg-white',
          overlay:{background:'bg-white',base:'bg-white dark:bg-white'},
          container:'bg-white',
          wrapper:'bg-white',
          inner:'bg-white'
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
                Supplier Details
              </h3>
              <UButton
                color="orange"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="sendDataToParent()"
              />
            </div>
          </template>
          <Table :columns="props.col" :td="props.row" :title="title" :buttonTitle="buttontitle" :tableFunc="addToCart"/>
          
        </UCard>
      </UModal>
    </div>
</template>

<script setup>
import Web3 from 'web3';
import { scmContract, scmAbi } from "../constants/constant.js";

const web3 = new Web3('http://127.0.0.1:8545')
const contractScm = new web3.eth.Contract(scmAbi, scmContract);

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



const isOpen = ref(false)
const title = "Supplier Details"
const buttontitle = "Add to cart"


const emit = defineEmits(['update','cartItem'])

const sendDataToParent = ()=>{
    const data = isOpen.value;
    emit('update',data);
}

const cartItem = ref([])

const addToCart = (row)=>{
  cartItem.value.push(row)
  const data = cartItem.value
  emit('cartItem',data)
}




onMounted(()=>{
  
})
</script>
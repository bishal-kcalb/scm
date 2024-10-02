<template>
    <div class="text-black">
        <ManufacturerProfile v-if="props.userRole === 'Manufacturer'" />
        <SupplierProfile v-if="props.userRole === 'Supplier'" />
    </div>
</template>

<script setup>
import Web3 from 'web3';
import { scmContract, scmAbi } from "../constants/constant.js";

const web3 = new Web3('http://127.0.0.1:8545')
const contractScm = new web3.eth.Contract(scmAbi, scmContract);

const props = defineProps({
    userRole:{
        type:String,
        required:true
    }
})

onBeforeMount(() => {
    // getAllManufacturer()
})
</script>

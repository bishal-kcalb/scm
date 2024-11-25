<template>
    <div class="text-black">
        <div class="mt-20">
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css">
            <link rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css">

            <div class="">
                <div class="flex flex-col md:flex-row   w-[100%]">
                    <div class="w-full px-4 lg:order-1">
                        <div class="flex justify-center py-4 lg:pt-4 pt-8">
                            <div class="mr-4 p-3 text-center">
                                <span
                                    class="text-xl font-bold block uppercase text-[#604CC3]">{{ totalSupplier }}</span><span
                                    class="text-sm text-blueGray-400">Supplier</span>
                            </div>
                            <div class="mr-4 p-3 text-center">
                                <span
                                    class="text-xl font-bold block uppercase text-[#604CC3]">{{ totalMedicine + totalSoldMedicine }}</span><span
                                    class="text-sm text-blueGray-400">Medicine</span>
                            </div>
                            <div class="lg:mr-4 p-3 text-center">
                                <span
                                    class="text-xl font-bold block uppercase text-[#604CC3]">{{totalMedicine}}</span><span
                                    class="text-sm text-blueGray-400">Stock</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full hidden md:block lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div class="relative">
                            <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                                class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px">
                        </div>
                    </div>
     
                    <div class="mr-4 w-full lg:self-center p-3 lg:order-2 pr-20 text-center">
                                <span
                                    class="text-xl font-bold block uppercase text-[#604CC3]">{{ userDetails.id }}</span><span
                                    class="text-sm text-blueGray-400">UserId</span>
                            </div>

                </div>
                <div class="text-center mt-12">
                    <h3 class="text-[#604CC3] text-3xl font-semibold leading-normal mb-2 mb-2">
                        {{userDetails.name}}
                    </h3>
                    <div class="text-sm leading-normal mt-0 mb-1 text-blueGray-400 font-bold uppercase">
                        <i class="fas fa-map-marker-alt mr-2 text-lg text-[#FF6600]"></i>
                        {{userDetails.location}}
                    </div>
                    <div class="mb-2text-[#604CC3] mt-6">
                        <i class="fas fa-calendar-week mr-2 text-lg text-[#FF6600]"></i>Joined Date: {{ userDetails.joinedDate }}
                    </div>
                    <div class="mb-2text-[#604CC3] ">
                        <i class="fas fa-envelope mr-2 text-lg text-[#FF6600]"></i>Email: {{ userDetails.email }}
                    </div>
                    <div class="mb-2text-[#604CC3]">
                        <i class=" fas fa-phone-alt mr-2 text-lg text-[#FF6600]"></i>Contact: {{userDetails.contact}}
                    </div>
                </div>

            </div>
        </div>
        <UDivider label="" :ui="{ border: { base: 'border-[#F5F5F5] dark:border-[#F5F5F5]' } }" class="mt-10" />
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10 mb-10">
            <div v-for="card in cards" :key="card.title">
                <Card :card="card" />
            </div>
        </div>
        <UDivider label="" :ui="{ border: { base: 'border-[#F5F5F5] dark:border-[#F5F5F5]' } }" class="mt-10 mb-10" />
        <div>
            <div>
                <div class="">
                            <h1 class="text-[#604CC3] text-3xl">Order List</h1>
                        </div>
                <Table :columns="col" :td="tableData" :buttonTitle="buttonTitle" :tableFunc="deliverOrder"/>
            </div>
        </div>

    </div>
</template>

<script setup>
import { BeakerIcon, TruckIcon, UserCircleIcon } from '@heroicons/vue/24/outline';
import Web3 from 'web3';
import { scmContract, scmAbi } from "../constants/constant.js";

const web3 = new Web3('http://127.0.0.1:8545')
const contractScm = new web3.eth.Contract(scmAbi, scmContract);

const cards = ref([
    {
        title: 'User Total Medicine',
        total: 0,
        icon: BeakerIcon
    },
    {
        title: 'Total Medicine in Stock',
        total: 0,
        icon: TruckIcon
    },
    {
        title: 'Total Supplier',
        total: 0,
        icon: UserCircleIcon
    }
])

const buttonTitle='Deliver Order'
const col = ref([])
const tableData = ref([])
const totalSupplier = ref(0)
const totalMedicine = ref(0)
const userDetails = ref({
    contact:'',
    email:'',
    joinedDate: '',
    location: '',
    name:'',
    verified:false
})
const totalSoldMedicine = ref(0)
const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
    })

const myOrder = async () => {
    
    const supplierList = await contractScm.methods.getDeliveryOrderList(accounts[0]).call();
    totalSupplier.value = supplierList.length
    supplierList.map((data) => {
        const filteredKeys = Object.keys(data).filter((key, index) => {
            return key !== '__length__' && isNaN(key);
        })

        filteredKeys.forEach((data) => {
            const colObj = {
                key: data,
                label: data.toUpperCase()
            }
            // Ensure no duplicates are added
            if (!col.value.some(item => item.key === colObj.key)) {
                col.value.push(colObj);
            }
            
        })
        // col.value.push({key:'action',label:"Action"})
        const rowData = {
            medId: String(data.medId),
            orderId: Number(data.orderId),
            orderer: data.orderer,
            status: data.status,
            orderTo: data.orderTo,
            shipper: data.shipper,
            ordererVerification: data.ordererVerification
        }
        tableData.value.push(rowData)

    })
    col.value.push({key:'action',label:'Action'})
 
}







const deliverOrder = async (orderData)=>{
    const txObject = {
      from: accounts[0],
      to: contractScm.options.address,  // Smart contract address
      data: contractScm.methods.deliverOrder(
        orderData.orderId
      ).encodeABI(),  // ABI encoding of the method and parameters
    };

    const response = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    });

    console.log(response);
}



onBeforeMount(() => {
    myOrder()
})
</script>

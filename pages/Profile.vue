<template>
    <div class="text-black">
        <div class="mt-20">
            <!-- <h1 class="text-[#604CC3] text-3xl">UserId</h1>
            <h1 class="text-[#604CC3] text-3xl">Name</h1> -->
            <!-- component -->
            <link rel="stylesheet" href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css">
            <link rel="stylesheet"
                href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css">

            <div class="">
                <div class="flex flex-wrap  w-[100%]">
                    <div class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div class="relative">
                            <img alt="..." src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                                class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px">
                        </div>
                    </div>
                    <div class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                        <div class="py-6 px-3 mt-32 sm:mt-0">
                            <h1 class="text-[#604CC3] text-3xl">UserId</h1>
                        </div>
                    </div>
                    <div class="w-full lg:w-4/12 px-4 lg:order-1">
                        <div class="flex justify-center py-4 lg:pt-4 pt-8">
                            <div class="mr-4 p-3 text-center">
                                <span
                                    class="text-xl font-bold block uppercase text-[#604CC3]">22</span><span
                                    class="text-sm text-blueGray-400">Supplier</span>
                            </div>
                            <div class="mr-4 p-3 text-center">
                                <span
                                    class="text-xl font-bold block uppercase text-[#604CC3]">10</span><span
                                    class="text-sm text-blueGray-400">Medicine</span>
                            </div>
                            <div class="lg:mr-4 p-3 text-center">
                                <span
                                    class="text-xl font-bold block uppercase text-[#604CC3]">89</span><span
                                    class="text-sm text-blueGray-400">Stock</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center mt-12">
                    <h3 class="text-[#604CC3] text-3xl font-semibold leading-normal mb-2 mb-2">
                        Jenna Stones
                    </h3>
                    <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i class="fas fa-map-marker-alt mr-2 text-lg text-[#FF6600]"></i>
                        Los Angeles, California
                    </div>
                    <div class="mb-2text-[#604CC3] mt-10">
                        <i class="fas fa-calendar-week mr-2 text-lg text-[#FF6600]"></i>Joined Date: 2024-30-2
                    </div>
                    <div class="mb-2text-[#604CC3] ">
                        <i class="fas fa-envelope mr-2 text-lg text-[#FF6600]"></i>Email: gg@gami.com
                    </div>
                    <div class="mb-2text-[#604CC3]">
                        <i class=" fas fa-phone-alt mr-2 text-lg text-[#FF6600]"></i>Contact: 9862573704
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
        <div>
            <div>
                <div class="flex justify-between">
                            <h1 class="text-[#604CC3] text-3xl">Manu</h1>
                        </div>
                <Table :columns="col" :td="tableData" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { BeakerIcon, TruckIcon } from '@heroicons/vue/24/outline';
import Web3 from 'web3';
import { scmContract, scmAbi } from "../constants/constant.js";

const web3 = new Web3('http://127.0.0.1:8545')
const contractScm = new web3.eth.Contract(scmAbi, scmContract);

const cards = ref([
    {
        title: 'User Total Medicine',
        total: 2000,
        icon: BeakerIcon
    },
    {
        title: 'Total Medicine in Stock',
        total: 3000,
        icon: TruckIcon
    }
])

const col = ref([])
const tableData = ref([])
const totalManufacturer = ref(0)

const getAllManufacturer = async () => {
    const manufacturerList = await contractScm.methods.getallManufacturerDetail().call();
    totalManufacturer.value = manufacturerList.length
    console.log("type is ", typeof (manufacturerList), totalManufacturer.value)
    manufacturerList.map((data) => {
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
        const rowData = {
            id: data.id,
            name: data.name,
            location: data.location,
            contact: data.contact,
            email: data.email,
            joinedDate: data.joinedDate,
            verified: data.verified
        }
        tableData.value.push(rowData)

    })
}

onBeforeMount(() => {
    getAllManufacturer()
})
</script>




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
                            <h1 class="text-[#604CC3] text-3xl">Supplier List</h1>
                        </div>
                <Table :columns="col" :td="tableData" />
            </div>
        </div>
        <div>
            <div>
                <div class="flex justify-between">
                            <h1 class="text-[#604CC3] text-3xl">Medicine List</h1>
                        </div>
                <Table :columns="colMedicine" :td="tableDataMedicine" :buttonTitle="buttonTitleMedicine" :tableFunc="sellMedicine"  />
            </div>
        </div>
        <div>
            <div>
                <div class="flex justify-between">
                            <h1 class="text-[#604CC3] text-3xl">Sold Medicine List</h1>
                        </div>
                <Table :columns="totalSoldMedicineCol" :td="totalSoldMedicineRow" />
            </div>
        </div>
        <UModal
        v-model="isOpen"
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
                {{ modalTitle }}
              </h3>
              <UButton
                color="orange"
                variant="ghost"
                icon="i-heroicons-x-mark-20-solid"
                class="-my-1"
                @click="isOpen = false"
              />
            </div>
          </template>
          <div>
            <SellMedicine :medId="medicineId" />
          </div>
        </UCard>
      </UModal>
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
const isOpen = ref(false)
const medicineId = ref(0)
const modalTitle = ref('Sell Medicine')
const buttonTitleMedicine='Sell Medicine'
const col = ref([])
const tableData = ref([])
const totalSupplier = ref(0)
const totalMedicine = ref(0)
const tableDataMedicine = ref([])
const colMedicine = ref([])
const userDetails = ref({
    contact:'',
    email:'',
    joinedDate: '',
    location: '',
    name:'',
    verified:false
})
const totalSoldMedicine = ref(0)
const totalSoldMedicineCol = ref([])
const totalSoldMedicineRow = ref([])
const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
    })

const getSupplierList = async () => {
    
    const supplierList = await contractScm.methods.getManufacturerSupplierList(accounts[0]).call();
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
            id: data.id,
            name: data.name,
            location: data.location,
            contact: data.contact,
            email: data.email,
            joinedDate: data.joinedDate,
            verified: data.verified,
            addedBy: data.addedBy,
            walletAddress: data.walletAddress
        }
        tableData.value.push(rowData)

    })
 
}

const getMedicineList = async()=>{
    const medicineList = await contractScm.methods.getManufacturerMedicineList(accounts[0]).call();
    totalMedicine.value = medicineList.length
    cards.value[1].total = totalMedicine.value
    medicineList.map((data)=>{
        const filteredKeys = Object.keys(data).filter((key,index)=>{
            return key !== '__length__' && isNaN(key);
        })
        
        filteredKeys.forEach((data)=>{
            const colObj = {
                key:data,
                label:data.toUpperCase()
            }
                // Ensure no duplicates are added
                 if (!colMedicine.value.some(item => item.key === colObj.key)) {
                colMedicine.value.push(colObj);
            }

        })

       
        const rowData = {
            medId:data.medId,
            manufacturer:data.manufacturer,
            name:data.name,
            medType:data.medType,
            manufacturedDate:data.manufacturedDate,
            expiryDate:data.expiryDate,
            description:data.description,
            presentHolder:data.presentHolder,
            mrp:data.mrp,
            qrcodeUrl:data.qrcodeUrl,
            owner:data.owner,
            category:data.category,
            verified:data.verified
        }
        tableDataMedicine.value.push(rowData)

    })
    colMedicine.value.push({key:'action',label:'Action'})
}

const getManufacturerDetail = async ()=>{
    const manufacturerDetails = await contractScm.methods.getManufacturerDetails(accounts[0]).call();
    userDetails.value.contact=manufacturerDetails.contact
    userDetails.value.email = manufacturerDetails.email
    userDetails.value.joinedDate = manufacturerDetails.joinedDate
    userDetails.value.location = manufacturerDetails.location
    userDetails.value.verified = manufacturerDetails.verified
    userDetails.value.name = manufacturerDetails.name
    userDetails.value.id = manufacturerDetails.id

}

const getManufacturerSoldMedicineList = async()=>{
    const soldMedicineList = await contractScm.methods.getManufacturerSoldMedicineList(accounts[0]).call();
    totalSoldMedicine.value = soldMedicineList.length
    cards.value[0].total = totalMedicine.value + totalSoldMedicine.value
    soldMedicineList.map((data)=>{
        const filteredKeys = Object.keys(data).filter((key,index)=>{
            return key !== '__length__' && isNaN(key);
        })
        
        
        filteredKeys.forEach((data)=>{
            const colObj = {
                key:data,
                label:data.toUpperCase()
            }
                // Ensure no duplicates are added
                 if (!totalSoldMedicineCol.value.some(item => item.key === colObj.key)) {
                    totalSoldMedicineCol.value.push(colObj);
            }

        })
        const rowData = {
            medId:data.medId,
            manufacturer:data.manufacturer,
            name:data.name,
            medType:data.medType,
            manufacturedDate:data.manufacturedDate,
            expiryDate:data.expiryDate,
            description:data.description,
            presentHolder:data.presentHolder,
            mrp:data.mrp,
            qrcodeUrl:data.qrcodeUrl,
            owner:data.owner,
            category:data.category,
            verified:data.verified
        }
        totalSoldMedicineRow.value.push(rowData)

    })
}


const sellMedicine = async(medId)=>{
    isOpen.value = true
    medicineId.value = Number(medId.medId)
}


onBeforeMount(() => {
    getSupplierList()
    getMedicineList()
    getManufacturerDetail()
    getManufacturerSoldMedicineList()
})
</script>




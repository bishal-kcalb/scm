<template>

    <div class="light flex flex-row overflow-hidden">
      
        <div :class="['bg-[#F5F5F5] w-[18rem] text-black p-5 min-h-[100vh]  md:block',openMenu ? 'block' : 'hidden']">
            <Sidebar @update="handleUpdate" />
        </div>
            <div class="p-5 w-[100%] md:w-[75%] xl:w-[100%]">
                <div class="mb-4">
                    <Nav @update="handleToogle" :userRole="role"/>
                </div>
                <UDivider label="" :ui="{border:{base:'border-[#F5F5F5] dark:border-[#F5F5F5]'}}" />
                <div v-if="activeTab=='Profile'" class="text-black">
                    <Profile :userRole="role"/>
                </div>
                <div v-if="activeTab!='Profile'" class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-10 mb-10">
                    <div v-for="card in cardItem" :key="card.title" class="">
                        <Card :card="card"/>
                      </div>
                    </div>
                    <ButtonPrimary v-if="role != 'MOH'" :title="'View Cart item'" @click="openCart=true"/>
                    <CartModal @update="handleCartUpdate" :col="cartItemCol" :row="cartItemRow" :isOpen="openCart"/>
                <UDivider label="" :ui="{border:{base:'border-[#F5F5F5] dark:border-[#F5F5F5]'}}" />
        
                <div v-if="activeTab=='Manufacturer'" class="mt-10">
                        <div class="flex justify-between">
                            <h1 class="text-[#604CC3] text-3xl">{{ user }}</h1>
                            <ButtonSecondary v-if="userRole=='User'" :title="title" @click="isOpen=true; modalTitle = 'Register Manufacturer';"/>
                        </div>
                    <Table :columns="col" :td="tableData" :buttonTitle="manufacturerButtonTitle" :tableFunc="getManufacturerMedicineList"/>
                      <ManufacturerDetailModal :isOpen="modalOpen" :col="manufacturerMedCol" :row="manufacturerMedRow" @update="modalOpen=false" @cartItem="handleCartItem"/>
                </div>
                <div v-if="activeTab=='Supplier'" class="mt-10">
                        <div class="flex justify-between">
                            <h1 class="text-[#604CC3] text-3xl">{{ user }}</h1>
                            <ButtonSecondary v-if="userRole=='User'" :title="'Register Supplier'" @click="isOpen=true; modalTitle = 'Register Supplier';" />
                        </div>
                    <Table :columns="colSupplier" :td="tableDataSupplier" :buttonTitle="manufacturerButtonTitle" :tableFunc="getManufacturerMedicineList"/>
                    <SupplierDetailModal :isOpen="modalOpen" :col="manufacturerMedCol" :row="manufacturerMedRow" @update="modalOpen=false" @cartItem="handleCartItem"/>
                </div>
                <div v-if="activeTab=='Distributor'" class="mt-10">
                        <div class="flex justify-between">
                            <h1 class="text-[#604CC3] text-3xl">{{ user }}</h1>
                            <ButtonSecondary v-if="userRole=='User'" :title="'Register Distributor'" @click="isOpen=true; modalTitle = 'Register Distributor';" />
                        </div>
                    <Table :columns="colDistributor" :td="tableDataDistributor"/>
                </div>
                <div v-if="activeTab=='Shipper'" class="mt-10">
                        <div class="flex justify-between">
                            <h1 class="text-[#604CC3] text-3xl">{{ user }}</h1>
                            <ButtonSecondary v-if="userRole=='User'" :title="'Register Shipper'" @click="isOpen=true; modalTitle = 'Register Shipper';" />
                        </div>
                    <Table :columns="colShipper" :td="tableDataShipper"/>
                </div>
                <div v-if="activeTab=='Medicine'" class="mt-10">
                        <div class="flex justify-between">
                            <h1 class="text-[#604CC3] text-3xl">{{ user }}</h1>
                            <ButtonSecondary  :title="title" @click="isOpen=true; modalTitle = 'Add Medicine';" />
                        </div>
                    <Table :columns="colMedicine" :td="tableDataMedicine"/>
                </div>

            </div>
            <div>
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
          <div v-if="modalTitle == 'Add Manufacturer'">
            <AddManufacturer />
          </div>
          <div v-if="modalTitle == 'Add Supplier'">
            <AddSupplier />
          </div>
          <div v-if="modalTitle == 'Add Medicine'">
            <AddMedicine />
          </div>
          <div v-if="modalTitle == 'Add Shipper'">
            <AddShipper/>
          </div>
          <div v-if="modalTitle == 'Add Distributor'">
            <AddDistributor/>
          </div>
        </UCard>
      </UModal>
    </div>
    </div>
</template>


<script setup>
import Web3 from "web3";
import { scmContract, scmAbi } from "../constants/constant.js";
import {
  CubeIcon,
  TruckIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/vue/24/outline";
import AddManufacturer from "~/components/AddManufacturer.vue";


const web3 = new Web3('http://127.0.0.1:8545')
const contractScm = new web3.eth.Contract(scmAbi,scmContract);
const isOpen = ref(false)
const totalManufacturer = ref(0)
const totalSupplier = ref(0)
const totalShipper =ref(0)
const totalMedicine = ref(0)
const manufacturerButtonTitle='View Details'
const manufacturerMedCol = ref([])
const manufacturerMedRow = ref([])
const openCart = ref(false)
const cartItemCol = ref([])
const cartItemRow = ref([])
const cardItem = reactive([
{
  title:'Total Manufacturer',
  total:totalManufacturer,
  icon:CubeIcon
},
{
  title:'Total Supplier',
  total:totalSupplier,
  icon:TruckIcon
},
{
  title:'Total Seller',
  total:0,
  icon:ClipboardDocumentListIcon
},
{
  title:'Total Medicine',
  total:totalMedicine,
  icon:BeakerIcon
}

])

const col =ref([])

const tableData = ref([])
const colSupplier = ref([])
const tableDataSupplier = ref([])
const colMedicine = ref([])
const tableDataMedicine = ref([])
const colShipper = ref([])
const tableDataShipper = ref([])
const colDistributor = ref([])
const tableDataDistributor = ref([])
const openMenu = ref(true)
const modalOpen = ref(false)
const cartItems = ref([])

const user = ref('All Manufacturer')
const title= ref('Register Manufacturer')
const role = ref('')
const activeTab = ref('Manufacturer')
const handleUpdate = (data) => {
    activeTab.value = data;
    user.value ='All '+ activeTab.value
    if(activeTab.value=='Manufacturer'){
        title.value= 'Register Manufacturer'

    }

    if(activeTab.value=='Supplier'){
        title.value= 'Add Supplier'
    }
    if(activeTab.value=='Medicine'){
        title.value= 'Add Medicine'
    }

}

const handleToogle = (data)=>{
    console.log("data in parent", data)
    openMenu.value = data;
}

const getAllManufacturer=async()=>{
    const manufacturerList = await contractScm.methods.getallManufacturerDetail().call();
    totalManufacturer.value = manufacturerList.length
    manufacturerList.map((data)=>{
        const filteredKeys = Object.keys(data).filter((key,index)=>{
            return key !== '__length__' && isNaN(key);
        })
        
        filteredKeys.forEach((data)=>{
            const colObj = {
                key:data,
                label:data.toUpperCase()
            }
                // Ensure no duplicates are added
                 if (!col.value.some(item => item.key === colObj.key)) {
                col.value.push(colObj);
            }

        })
        const rowData = {
            id:data.id,
            name:data.name,
            location:data.location,
            contact:data.contact,
            email:data.email,
            joinedDate:data.joinedDate,
            verified:data.verified,
            walletAddress: data.walletAddress
        }
        tableData.value.push(rowData)

    })
    col.value.push({key:"action",label:"Action"})
}

const getAllSuppliers = async()=>{
    const supplierList = await contractScm.methods.getAllSupplierDetails().call();
    totalSupplier.value =supplierList.length
    supplierList.map((data)=>{
        const filteredKeys = Object.keys(data).filter((key,index)=>{
            return key !== '__length__' && isNaN(key);
        })
        filteredKeys.forEach((data)=>{
            const colObj = {
                key:data,
                label:data.toUpperCase()
            }
                // Ensure no duplicates are added
                 if (!colSupplier.value.some(item => item.key === colObj.key)) {
                colSupplier.value.push(colObj);
            }

        })
        const rowData = {
            id:data.id,
            name:data.name,
            location:data.location,
            contact:data.contact,
            email:data.email,
            joinedDate:data.joinedDate,
            addedBy:data.addedBy,
            verified:data.verified,
            walletAddress:data.walletAddress
        }
        tableDataSupplier.value.push(rowData)
        
      })
      colSupplier.value.push({key:"action",label:"Action"})
}

const getAllDistributor = async()=>{
    const supplierList = await contractScm.methods.getAllDistributorDetails().call();
    totalSupplier.value =supplierList.length
    supplierList.map((data)=>{
        const filteredKeys = Object.keys(data).filter((key,index)=>{
            return key !== '__length__' && isNaN(key);
        })
        filteredKeys.forEach((data)=>{
            const colObj = {
                key:data,
                label:data.toUpperCase()
            }
                // Ensure no duplicates are added
                 if (!colDistributor.value.some(item => item.key === colObj.key)) {
                colDistributor.value.push(colObj);
            }

        })
        const rowData = {
            id:data.id,
            name:data.name,
            location:data.location,
            contact:data.contact,
            email:data.email,
            joinedDate:data.joinedDate,
            distributorType:data.distributorType,
            verified:data.verified,
            walletAddress:data.walletAddress
        }
        tableDataDistributor.value.push(rowData)

    })
}

const getAllShipper = async()=>{
    const shipperList = await contractScm.methods.getAllShipperDetails().call();
    totalShipper.value =shipperList.length
    shipperList.map((data)=>{
        const filteredKeys = Object.keys(data).filter((key,index)=>{
            return key !== '__length__' && isNaN(key);
        })
        filteredKeys.forEach((data)=>{
            const colObj = {
                key:data,
                label:data.toUpperCase()
            }
                // Ensure no duplicates are added
                 if (!colShipper.value.some(item => item.key === colObj.key)) {
                colShipper.value.push(colObj);
            }

        })
        const rowData = {
            id:data.id,
            name:data.name,
            location:data.location,
            contact:data.contact,
            email:data.email,
            joinedDate:data.joinedDate,
            deliveryId: data.deliveryId,
            verified:data.verified,
            walletAddress:data.walletAddress
        }
        tableDataShipper.value.push(rowData)

    })
}

const getAllMedicine = async()=>{
    const medicineList = await contractScm.methods.getAllMedicineDetails().call();
    totalMedicine.value = medicineList.length
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

}

const getUserRole = async ()=>{
    const accounts = await window.ethereum.request({
        method:'eth_requestAccounts'
    })
    const userRole = await contractScm.methods.getUserRole(accounts[0]).call();
    role.value = userRole[0]
}


const getManufacturerMedicineList = async(data)=>{
  console.log("data is:",data)
  modalOpen.value = data
  modalOpen.value = true
    const medicineList = await contractScm.methods.getUserMedicineList(data.walletAddress).call();
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
                 if (!manufacturerMedCol.value.some(item => item.key === colObj.key)) {
                  manufacturerMedCol.value.push(colObj);
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
        if(!manufacturerMedRow.value.some(item => item.medId === rowData.medId)){

          manufacturerMedRow.value.push(rowData)
        }

    })
    if(!manufacturerMedCol.value.some(item=>item.key == 'action')){

      manufacturerMedCol.value.push({key:'action',label:'Action'})
    }

}


const handleCartItem = (data)=>{
  cartItems.value = data;
  console.log("cartItem", cartItems.value)
  const medicineList = cartItems.value
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
                 if (!cartItemCol.value.some(item => item.key === colObj.key)) {
                cartItemCol.value.push(colObj);
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
        if(!cartItemRow.value.some(item => item.medId === rowData.medId)){

          cartItemRow.value.push(rowData)
        }

    })

}

const handleCartUpdate = (data)=>{
  openCart.value = data;
}


onBeforeMount(()=>{
    getAllManufacturer()
    getAllSuppliers()
    getAllMedicine()
    getUserRole()
    getAllShipper()
    getAllDistributor()

})
</script>

<style>

* {
    box-sizing: border-box;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
  display: hidden;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px white; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #FF6600; 
  border-radius: 10px;
  display: none;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #FF6600; 

}
::-webkit-scrollbar:hover {
  background: #FF6600;
  display: block; 

}
</style>
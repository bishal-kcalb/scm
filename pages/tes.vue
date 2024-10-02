<template>
  <div class="container mx-auto pt-[6rem] p-4 space-y-6">
    <div>
      <!-- <h1 class="text-3xl font-bold text-gray-800">
        {{ user[0] }}
      </h1>
      <h1 class="text-3xl font-bold text-gray-800">
        ID:{{ user[1] }}
      </h1> -->

    </div>

    <input type="text" @change="chekcProp()">

    <ButtonPrimary :title="msg" />
    <Card :card="cardObject"/>

    <!-- <Input /> -->
    <Table :columns="col" :td="tableData"/>

    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="(metric, index) in metrics"
        :key="index"
        class="bg-white p-4 rounded-lg shadow"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-medium text-gray-500">{{ metric.title }}</h2>
          <component :is="metric.icon" class="h-5 w-5 text-gray-400" />
        </div>
        <p class="text-2xl font-bold text-gray-800 mt-2">{{ metric.value }}</p>
      </div>
    </div>

    <div class="space-y-4">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
              activeTab === tab
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
            ]"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </nav>
      </div>

      <div v-if="activeTab === 'manufacturers'">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Manufacturers</h2>
          <button
            v-if="user[0] == 'Manufacturer'"
            @click="
              isOpen = true;
              modalTitle = 'Add Manufacturer';
            "
            class="px-3 py-1 border rounded text-sm"
            :class="
              manufacturersEndIndex >= manufacturers.length
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            "
          >
            Add Manufacturer
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in manufacturersHeaders"
                  :key="header"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white text-black divide-y divide-gray-200">
              <tr
                v-for="manufacturer in paginatedManufacturers"
                :key="manufacturer.name"
              >
                <td
                  v-for="(value, key) in manufacturer"
                  :key="key"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-sm text-gray-700">
            Showing {{ manufacturersStartIndex + 1 }} to
            {{ manufacturersEndIndex }} of {{ manufacturers.length }} entries
          </span>
          <div class="space-x-2">
            <button
              @click="manufacturersPage--"
              :disabled="manufacturersPage === 1"
              class="px-3 py-1 border rounded text-sm"
              :class="
                manufacturersPage === 1
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              "
            >
              Previous
            </button>
            <button
              @click="manufacturersPage++"
              :disabled="manufacturersEndIndex >= manufacturers.length"
              class="px-3 py-1 border rounded text-sm"
              :class="
                manufacturersEndIndex >= manufacturers.length
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'suppliers'">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Suppliers</h2>
          <button
            @click="
              isOpen = true;
              modalTitle = 'Add Supplier';
            "
            class="px-3 py-1 border rounded text-sm"
            :class="
              manufacturersEndIndex >= manufacturers.length
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            "
          >
            Add Supplier
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in suppliersHeaders"
                  :key="header"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white text-black divide-y divide-gray-200">
              <tr v-for="supplier in paginatedSuppliers" :key="supplier.name">
                <td
                  v-for="(value, key) in supplier"
                  :key="key"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-sm text-gray-700">
            Showing {{ suppliersStartIndex + 1 }} to {{ suppliersEndIndex }} of
            {{ suppliers.length }} entries
          </span>
          <div class="space-x-2">
            <button
              @click="suppliersPage--"
              :disabled="suppliersPage === 1"
              class="px-3 py-1 border rounded text-sm"
              :class="
                suppliersPage === 1
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              "
            >
              Previous
            </button>
            <button
              @click="suppliersPage++"
              :disabled="suppliersEndIndex >= suppliers.length"
              class="px-3 py-1 border rounded text-sm"
              :class="
                suppliersEndIndex >= suppliers.length
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              "
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'medicines'">
        <div class="flex justify-between items-center">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Medicines</h2>
          <button
            @click="
              isOpen = true;
              modalTitle = 'Add Medicine';
            "
            class="px-3 py-1 border rounded text-sm"
            :class="
              manufacturersEndIndex >= manufacturers.length
                ? 'bg-gray-100 text-gray-400'
                : 'bg-white text-blue-600 hover:bg-blue-50'
            "
          >
            Add Medicine
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="header in medicinesHeaders"
                  :key="header"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
              </tr>
            </thead>
            <tbody class="bg-white text-black divide-y divide-gray-200">
              <tr v-for="medicine in paginatedMedicines" :key="medicine.name">
                <td
                  v-for="(value, key) in medicine"
                  :key="key"
                  class="px-6 py-4 whitespace-nowrap"
                >
                  {{ value }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-sm text-gray-700">
            Showing {{ medicinesStartIndex + 1 }} to {{ medicinesEndIndex }} of
            {{ medicines.length }} entries
          </span>
          <div class="space-x-2">
            <button
              @click="medicinesPage--"
              :disabled="medicinesPage === 1"
              class="px-3 py-1 border rounded text-sm"
              :class="
                medicinesPage === 1
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              "
            >
              Previous
            </button>
            <button
              @click="medicinesPage++"
              :disabled="medicinesEndIndex >= medicines.length"
              class="px-3 py-1 border rounded text-sm"
              :class="
                medicinesEndIndex >= medicines.length
                  ? 'bg-gray-100 text-gray-400'
                  : 'bg-white text-blue-600 hover:bg-blue-50'
              "
            >
              Next
            </button>
          </div>
        </div>
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
            header: { background: 'bg-white', base: 'text-black' },
            rounded: 'rounded-xl',
            base: 'rounded-xl',
          }"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3
                class="text-black font-semibold leading-6 text-gray-900 dark:text-black"
              >
                {{ modalTitle }}
              </h3>
              <UButton
                color="gray"
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
        </UCard>
      </UModal>
    </div>
    
  </div>
</template>
  
  <script setup>
import {
  CubeIcon,
  TruckIcon,
  BeakerIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/vue/24/outline";

import Web3 from "web3";
import { scmContract, scmAbi } from "../constants/constant.js";
import { compileScript } from "vue/compiler-sfc";

const msg = "CLick me"
const cardObject ={
  title:'Total Medicine',
  total:9999,
  icon:CubeIcon
}

const props = defineProps({
  activeTab:{
    type:String,
    required:false
    
  }
})

const chekcProp=()=>{
  console.log("prop datae",(props.activeTab))
}


const col = [{
  key: 'id',
  label: 'ID'
}, {
  key: 'name',
  label: 'User name'
}, {
  key: 'title',
  label: 'Job position'
}, {
  key: 'email',
  label: 'Email'
}, {
  key: 'role',
  label: 'role'
}]

const tableData = [{
  id: 1,
  name: 'Lindsay Walton',
  title: 'Front-end Developer',
  email: 'lindsay.walton@example.com',
  role: 'Member'
}, {
  id: 2,
  name: 'Courtney Henry',
  title: 'Designer',
  email: 'courtney.henry@example.com',
  role: 'Admin'
}, {
  id: 3,
  name: 'Tom Cook',
  title: 'Director of Product',
  email: 'tom.cook@example.com',
  role: 'Member'
}, {
  id: 4,
  name: 'Whitney Francis',
  title: 'Copywriter',
  email: 'whitney.francis@example.com',
  role: 'Admin'
}, {
  id: 5,
  name: 'Leonard Krasner',
  title: 'Senior Designer',
  email: 'leonard.krasner@example.com',
  role: 'Owner'
}, {
  id: 6,
  name: 'Floyd Miles',
  title: 'Principal Designer',
  email: 'floyd.miles@example.com',
  role: 'Member'
}]



const isOpen = ref(false);
const modalTitle = ref();
const activeTab = ref("manufacturers");
const tabs = ["manufacturers", "suppliers", "medicines"];

const web3 = new Web3("http://127.0.0.1:8545");
const contractScm = new web3.eth.Contract(scmAbi, scmContract);
const user = ref([]);

const metrics = [
  { title: "Total Manufacturers", value: "25", icon: CubeIcon },
  { title: "Total Suppliers", value: "103", icon: TruckIcon },
  { title: "Total Medicines", value: "1,234", icon: BeakerIcon },
  { title: "Active Orders", value: "89", icon: ClipboardDocumentListIcon },
];

const manufacturersHeaders = [
  "Id",
  "Name",
  "Location",
  "Contact",
  "Email",
  "Joined Date",
  "Verified",
];
const manufacturers = [
  {
    id: 1,
    name: "PharmaCorp",
    location: "New York, USA",
    contact: "250",
    email: "4.8",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "MediLabs",
    location: "London, UK",
    contact: "180",
    email: "4.6",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "BioTech Solutions",
    location: "Tokyo, Japan",
    contact: "320",
    email: "4.9",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "HealthCare Inc.",
    location: "Toronto, Canada",
    contact: "210",
    email: "4.7",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "MedicoPharm",
    location: "Sydney, Australia",
    contact: "280",
    email: "4.5",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "VitaLabs",
    location: "Berlin, Germany",
    contact: "190",
    email: "4.7",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "CureAll Pharma",
    location: "Mumbai, India",
    contact: "300",
    email: "4.6",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "NordicHealth",
    location: "Stockholm, Sweden",
    contact: "150",
    email: "4.8",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "MedTech Innovations",
    location: "Seoul, South Korea",
    contact: "270",
    email: "4.7",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "PharmaPlus",
    location: "São Paulo, Brazil",
    contact: "230",
    email: "4.5",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "EuroMed",
    location: "Paris, France",
    contact: "200",
    email: "4.6",
    joineDate: "2024/01/02",
    verified: false,
  },
  {
    id: 1,
    name: "HealthFirst",
    location: "Singapore",
    contact: "240",
    email: "4.8",
    joineDate: "2024/01/02",
    verified: false,
  },
];

const suppliersHeaders = [
  "Id",
  "Name",
  "Location",
  "Contact",
  "Email",
  "Joined Date",
  "Added By",
  "Verified",
];
const suppliers = [
  {
    id: 1,
    name: "PharmaCorp",
    location: "New York, USA",
    contact: "250",
    email: "4.8",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "MediLabs",
    location: "London, UK",
    contact: "180",
    email: "4.6",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "BioTech Solutions",
    location: "Tokyo, Japan",
    contact: "320",
    email: "4.9",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "HealthCare Inc.",
    location: "Toronto, Canada",
    contact: "210",
    email: "4.7",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "MedicoPharm",
    location: "Sydney, Australia",
    contact: "280",
    email: "4.5",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "VitaLabs",
    location: "Berlin, Germany",
    contact: "190",
    email: "4.7",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "CureAll Pharma",
    location: "Mumbai, India",
    contact: "300",
    email: "4.6",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "NordicHealth",
    location: "Stockholm, Sweden",
    contact: "150",
    email: "4.8",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "MedTech Innovations",
    location: "Seoul, South Korea",
    contact: "270",
    email: "4.7",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "PharmaPlus",
    location: "São Paulo, Brazil",
    contact: "230",
    email: "4.5",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "EuroMed",
    location: "Paris, France",
    contact: "200",
    email: "4.6",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
  {
    id: 1,
    name: "HealthFirst",
    location: "Singapore",
    contact: "240",
    email: "4.8",
    joineDate: "2024/01/02",
    addedBy: 1,
    verified: false,
  },
];
const medicinesHeaders = [
  "Id",
  "ManufacturerId",
  "Name",
  "Type",
  "Manufacturered Date",
  "Expiry Date",
  "Description",
  "Owner",
  "MRP",
  "QR Code URL",
];
const medicines = [
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
  {
    id: 1,
    manufacturerId: 23,
    name: "Aspirin",
    type: "Pain Relief",
    manufacturedDate: "2024/02/1",
    expiryDate: "2026/02/23",
    description: "good for fever",
    owner: "0x23sdr324gsdgf42hhktyu",
    mrp: 200,
    qrCodeUrl: "https://nep.com",
  },
];

const itemsPerPage = 10;
const manufacturersPage = ref(1);
const suppliersPage = ref(1);
const medicinesPage = ref(1);

const paginatedManufacturers = computed(() => {
  const start = (manufacturersPage.value - 1) * itemsPerPage;
  return manufacturers.slice(start, start + itemsPerPage);
});

const paginatedSuppliers = computed(() => {
  const start = (suppliersPage.value - 1) * itemsPerPage;
  return suppliers.slice(start, start + itemsPerPage);
});

const paginatedMedicines = computed(() => {
  const start = (medicinesPage.value - 1) * itemsPerPage;
  return medicines.slice(start, start + itemsPerPage);
});

const manufacturersStartIndex = computed(
  () => (manufacturersPage.value - 1) * itemsPerPage
);
const manufacturersEndIndex = computed(() =>
  Math.min(manufacturersStartIndex.value + itemsPerPage, manufacturers.length)
);

const suppliersStartIndex = computed(
  () => (suppliersPage.value - 1) * itemsPerPage
);
const suppliersEndIndex = computed(() =>
  Math.min(suppliersStartIndex.value + itemsPerPage, suppliers.length)
);

const medicinesStartIndex = computed(
  () => (medicinesPage.value - 1) * itemsPerPage
);
const medicinesEndIndex = computed(() =>
  Math.min(medicinesStartIndex.value + itemsPerPage, medicines.length)
);

const checkUser = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  const _user = await contractScm.methods.getUserRole(accounts[0]).call();

  user.value = _user;

  console.log(user.value[0]);
};

onBeforeMount(async () => {
  await checkUser();


  console.log("the tab is",props.activeTab)
});
</script>
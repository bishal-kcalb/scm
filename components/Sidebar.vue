<template>
    <div class="">
        <div class="flex gap-3 items-center mb-[3rem]">
            <span><img src="../assets/images/logo.webp" alt="" class="h-[40px] w-[40px] rounded-full"></span>
            <h1>KUSM</h1>
        </div>
        <div class="flex flex-col gap-4">
            <span @click="() => { acitveTab = 'Dashboard'; sendActiveTabToParent() }"
                :class="['cursor-pointer flex items-center rounded gap-2 hover:bg-[#604CC3] p-[8px] hover:text-[#F5F5F5] hover:transaction-all hover:duration-700', acitveTab == 'Dashboard' ? 'bg-[#604CC3] text-[#F5F5F5]' : '']"><svg
                    class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF6600" viewBox="0 0 24 24">
                    <path
                        d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z" />
                </svg>

                Dashboard</span>
            <span @click="acitveTab = 'Profile', sendActiveTabToParent()"
                :class="['cursor-pointer flex items-center rounded gap-2 hover:bg-[#604CC3] p-[8px] hover:text-[#F5F5F5] hover:transaction-all hover:duration-700', acitveTab == 'Profile' ? 'bg-[#604CC3] text-[#F5F5F5]' : '']"><svg
                    class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF6600" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z"
                        clip-rule="evenodd" />
                </svg>
                Profile</span>


            <span @click="acitveTab = 'Manufacturer', sendActiveTabToParent()"
                :class="['cursor-pointer flex items-center rounded gap-2 hover:bg-[#604CC3] p-[8px] hover:text-[#F5F5F5] hover:transaction-all hover:duration-700', acitveTab == 'Manufacturer' ? 'bg-[#604CC3] text-[#F5F5F5]' : '']"><svg
                    class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF6600" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z"
                        clip-rule="evenodd" />
                </svg>
                Manufacturer</span>
            <span @click="acitveTab = 'Supplier', sendActiveTabToParent()"
                :class="['cursor-pointer flex items-center rounded gap-2 hover:bg-[#604CC3] p-[8px] hover:text-[#F5F5F5] hover:transaction-all hover:duration-700', acitveTab == 'Supplier' ? 'bg-[#604CC3] text-[#F5F5F5]' : '']"><svg
                    class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF6600" viewBox="0 0 24 24">
                    <path stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1"
                        d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z" />
                </svg>
                Supplier</span>
                <span @click="acitveTab = 'Distributor', sendActiveTabToParent()"
                :class="['cursor-pointer flex items-center rounded gap-2 hover:bg-[#604CC3] p-[8px] hover:text-[#F5F5F5] hover:transaction-all hover:duration-700', acitveTab == 'Distributor' ? 'bg-[#604CC3] text-[#F5F5F5]' : '']"><svg
                    class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF6600" viewBox="0 0 24 24">
                    <path stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1"
                        d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z" />
                </svg>
                Distributor</span>
                <span @click="acitveTab = 'Shipper', sendActiveTabToParent()"
                :class="['cursor-pointer flex items-center rounded gap-2 hover:bg-[#604CC3] p-[8px] hover:text-[#F5F5F5] hover:transaction-all hover:duration-700', acitveTab == 'Shipper' ? 'bg-[#604CC3] text-[#F5F5F5]' : '']"><svg
                    class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF6600" viewBox="0 0 24 24">
                    <path stroke="#FF6600" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.1"
                        d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z" />
                </svg>
                Shipper</span>
                
            <span @click="acitveTab = 'Medicine', sendActiveTabToParent()"
                :class="['cursor-pointer flex items-center rounded gap-2 hover:bg-[#604CC3] p-[8px] hover:text-[#F5F5F5] hover:transaction-all hover:duration-700', acitveTab == 'Medicine' ? 'bg-[#604CC3] text-[#F5F5F5]' : '']"><svg
                    class="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF6600" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                        d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z"
                        clip-rule="evenodd" />
                </svg>
                Medicine</span>
        </div>
    </div>
</template>

<script setup>


const acitveTab = ref('Dashboard')

const emit = defineEmits(['update']);

// Method to emit data to the parent
const sendActiveTabToParent = () => {
    const data = acitveTab.value
    emit('update', data);  // Emits the event 'update' with the data
};



</script>
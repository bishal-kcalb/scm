<template>
    <div>
        <div class="flex  py-3.5 border-b border-[#FF6600] dark:border-[#FF6600]">
            <UInput color="orange" v-model="q" name="q" placeholder="Search..."
                icon="i-heroicons-magnifying-glass-20-solid" autocomplete="off"
                :ui="{ icon: { trailing: { pointer: '' } }, base: '!text-black' }">
                <template #trailing>
                    <UButton v-show="q !== ''" color="gray" variant="link" icon="i-heroicons-x-mark-20-solid"
                        :padded="false" @click="q = ''" />
                </template>
            </UInput>
        </div>
        <UTable :columns="props.columns" :rows="filteredRows"
            :ui="{ th: { color: 'text-black' }, td: { color: 'text-black' }, tbody: 'divide-y divide-[#FF6600] dark:divide-[#FF6600]', divide: 'divide-y divide-[#FF6600] dark:divide-[#FF6600]' }">
            <template #action-data = "{row}">
                <ButtonSecondary @click="row.buttonFunc(row)" :title="row.buttonTitle"/>
            </template>
        </UTable>

        <div class="flex justify-end  py-3.5 border-t border-[#FF6600] dark:[#FF6600]">
            <UPagination v-model="page" :page-count="pageCount" :total="props.td.length"
                :prevButton="{ color: 'black' }" :nextButton="{ color: 'black' }" :activeButton="{ color: 'orange' }"
                :inactiveButton="{ color: 'black' }" />
        </div>
    </div>
</template>


<script setup>

const props = defineProps({
    columns: {
        type: Array,
        required: true
    },

    td: {
        type: Array,
        required: true
    },

    buttonTitle:{
        type:String
    },
    tableFunc:{
        type:Function
    },
    transferDelivery:{
        type:Function
    },
    acceptDelivery:{
        type:Function
    },
    delivering:{
        type:Function
    },
    delivered:{
        type:Function
    }
})

const page = ref(1)
const pageCount = 5
const q = ref('')




const filteredRows = computed(() => {
    const rows = !q.value
        ? props.td.slice((page.value - 1) * pageCount, page.value * pageCount)
        : props.td.filter((person) =>
            Object.values(person).some((value) =>
                String(value).toLowerCase().includes(q.value.toLowerCase())
            )
        );

    return rows.map((row) => ({
        ...row,
        buttonTitle: props.buttonTitle || // Use prop if provided
            (Number(row.status) === 0 ? 'Accept Order' :
             Number(row.status) === 1 ? 'Transfer For Deliver' :
             Number(row.status) === 2 ? 'Delivering' :
             Number(row.status) === 3 ? 'Delivered' : 'Unknown'),

             buttonFunc: props.tableFunc || // Use a prop function if uniform
            (Number(row.status) === 0 ? props.acceptDelivery :
             Number(row.status) === 1 ? props.transferDelivery :
             Number(row.status) === 2 ? props.delivering:
             Number(row.status) === 3 ? props.delivered : null),
    }));
});



onMounted(() => {
})


</script>


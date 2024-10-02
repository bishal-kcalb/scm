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
                <ButtonSecondary @click="tableFunc(row)" :title="props.buttonTitle"/>
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
    }
})

const page = ref(1)
const pageCount = 5
const q = ref('')

const filteredRows = computed(() => {
    if (!q.value) {
        return props.td.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    }

    return props.td.filter((person) => {
        return Object.values(person).some((value) => {
            return String(value).toLowerCase().includes(q.value.toLowerCase())
        })
    })
})


onMounted(() => {
})


</script>

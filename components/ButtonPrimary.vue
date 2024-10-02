<template>
    <div>
        <button class="bg-[#FF6600] text-[#F5F5F5] p-2 w-[100%] rounded rounded-md hover:bg-[#ff8100] hover:transition-all hover:duration-500">{{ title }}</button>
    </div>
</template>


<script setup>
defineProps({
    title:{
        type:String,
        required:true
    }
})

</script>

<style>


</style>
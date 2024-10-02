<template>
    <div>
        <button class="bg-[#604CC3] border  text-[#F5F5F5] p-2 w-[100%] rounded rounded-md hover:bg-[#7765d3] hover:transition-all hover:duration-500">{{ title }}</button>
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
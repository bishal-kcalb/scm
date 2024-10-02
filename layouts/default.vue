<template>
    <div class="light flex flex-row">

        <div class="w-[100%]">
            <slot />
        </div>

        <UNotifications />

    </div>
</template>


<script setup>
const activeTab = ref('Dashboard')
const handleUpdate = (data) => {
    activeTab.value = data;
    console.log("", activeTab.value)
}

</script>

<style>
body {
    background: white;
}
</style>
<template>
    <div>
        <div
        class="bg-[#FF6600] p-4 rounded-lg shadow hover:bg-[#ff8100] hover:transition-all hover:duration-500"
      >
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-medium text-[#F5F5F5]">{{ card.title }}</h2>
          <component :is="card.icon" class="h-5 w-5 text-[#F5F5F5]" />
        </div>
        <p class="text-2xl font-bold text-[#F5F5F5] mt-2">{{ card.total }}</p>
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

defineProps({
    card:{
        type:Object,
        required:true
    }
})


</script>
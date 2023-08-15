<template>
    <div>
Esto es un detalle

<VBtn @click="emits('back')">Atrás</VBtn>
    </div>
</template>

<script setup lang="ts">
import type { User } from '@/interfaces/User/User.model'
const props = defineProps<{
    user: User
}>()
const emits = defineEmits<{
    (e:'back'):void
}>()
</script>

<style scoped>

</style>
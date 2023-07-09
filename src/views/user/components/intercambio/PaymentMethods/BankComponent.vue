<template>
    <div>
Esto es un pago por banco
{{ itemsDetails }}
    </div>
</template>

<script setup lang="ts">
import type { BankAccount } from '@/interfaces/CompanyAccount/BankAccount/BankAccount.model';
defineProps<{
    itemsDetails: any
}>()
</script>

<style scoped>

</style>
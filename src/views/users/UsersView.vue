<template>
    <TableComponentVue
    :optionsHabilit="false"
    :headers="headers"
    :items="helper.items"
    >
    <template #cel-attributes.username="{data}">
        <span class="text-primary"> 
            {{ data.attributes.username }}
        </span>
    </template>
    </TableComponentVue>
</template>

<script setup lang="ts">
import TableComponentVue from '@/components/global/TableComponent.vue';
import { helperStore } from '@/helper';
import type { Head } from '@/interfaces/TableComponent.helper';

const headers: Head[] = [
    {
        name: 'Usuario',
        value: 'attributes.username',
    },
    {
        name: 'Email',
        value: 'attributes.email',
    },
    {
        name: 'Estado de verificacion',
        value: '',
    },
    {
        name: 'Referido por',
        value: '',
    },
    {
        name: 'Estado',
        value: 'attributes.deleted_at',
        status: 'deleted'
    },
    {
        name: 'Fecha de Ingreso',
        value: 'attributes.created_at',
        type: 'date',
        format: 'YYYY-MM-DD | HH:mm:ss'
    },
]

const helper = helperStore()
helper.url = 'users'

helper.index()
</script>

<style scoped>

</style>
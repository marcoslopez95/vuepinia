<template>
    <VBtn @click="openModal">{{$t('buttons.create')}}</VBtn>

    <CrudComponent singular="Users" :rows="rows"></CrudComponent>
    <h3>Roles</h3>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
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
import CrudComponent from '@/components/global/CrudComponent.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import { helperStore } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
const helper = helperStore()
helper.url = 'roles'

helper.index()
const openModal = async () => {
  formCrud.value = {}
  clickIn.value = 'Create'
  openModalCrud.value = true;
}
const { t } = useI18n()
const {formCrud,openModalCrud,clickIn,formRef} = storeToRefs(helper)
const rows: Row[] = [
    {
        fields: [
            {
                label: 'Nombre',
                type: 'text',
                valueForm: 'name',

            }
        ]
    }
]

const headers: Head[] = [
    {
        name: t('general-views.name'),
        value: 'attributes.name',
    },
    
]


</script>

<style scoped>

</style>
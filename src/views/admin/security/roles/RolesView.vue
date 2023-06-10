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
import { RoleStore } from '@/stores/RoleStore'
const helper = helperStore()
helper.url = 'roles'
helper.index()

const roleStore = RoleStore();
roleStore.getPermissions()
const {permissions} = storeToRefs(roleStore);

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
                label: t('general-views.name'),
                type: 'text',
                valueForm: 'name',
            },
            {
                label: t('views.permissions.title'),
                type: 'select',
                select: {
                    items: permissions,
                    itemTitle: 'attributes.name',
                    itemValue: 'id',
                    multiple:true
                },
                valueForm: 'permissions',
            },
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
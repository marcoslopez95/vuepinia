<template>
    <div class="d-flex justify-space-between">
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
            {{ $t('buttons.add') }}
        </VBtn>
    </div>

    <CrudComponent singular="Role" :rows="rows"></CrudComponent>
    <TableComponentVue
    optionsHabilit
    icon-update
    icon-delete
    :headers="headers"
    :items="helper.items"
    >
    </TableComponentVue>
</template>

<script setup lang="ts">
import SearchInputComponentVue from '@/components/global/SearchInputComponent.vue';
import CrudComponent from '@/components/global/CrudComponent.vue';
import TableComponentVue from '@/components/global/TableComponent.vue';
import { helperStore } from '@/helper';
import type { Row } from '@/interfaces/FormComponent.helper';
import type { Head } from '@/interfaces/TableComponent.helper';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { RoleStore } from '@/stores/RoleStore'
import { ref } from 'vue'
const helper = helperStore()
helper.url = 'roles'
helper.index()

const search = ref<string>('')
const getSearch = () => {
    helper.index({
        name: search.value
    })
}

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
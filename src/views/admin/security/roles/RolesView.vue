<template>
    <div v-if="helper.clickIn == ''">
        <div class="d-flex justify-space-between">
            <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
            <VBtn @click="openComponent(undefined)" prepend-icon="mdi-plus" class="rounded-xl">
                {{ $t("buttons.add") }}
            </VBtn>
        </div>

        <TableComponentVue
            optionsHabilit
            icon-update
            icon-delete
            :headers="headers"
            :items="helper.items"
            @update="openComponent"
        >

        </TableComponentVue>
    </div>
    <create-or-edit-role
        v-if="helper.clickIn == 'Edit' || helper.clickIn == 'Create'"
        :role="role"
        >
    </create-or-edit-role>
</template>

<script setup lang="ts">
import CreateOrEditRole from "@/views/admin/security/roles/CreateOrEditRole.vue";
import SearchInputComponentVue from "@/components/global/SearchInputComponent.vue";
import CrudComponent from "@/components/global/CrudComponent.vue";
import TableComponentVue from "@/components/global/TableComponent.vue";
import { helperStore } from "@/helper";
import type { Row } from "@/interfaces/FormComponent.helper";
import type { Head } from "@/interfaces/TableComponent.helper";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import { RoleStore } from "@/stores/RoleStore";
import { ref } from "vue";
import type { Role } from "@/interfaces/Role/Role.model";
const helper = helperStore();
helper.url = "roles";
helper.index();

const search = ref<string>("");
const getSearch = () => {
    helper.index({
        name: search.value,
    });
};

const roleStore = RoleStore();
roleStore.getPermissionCategories();
const { permissions } = storeToRefs(roleStore);

const role = ref<Role>()

const openModal = async () => {
    formCrud.value = {};
    clickIn.value = "Create";
    openModalCrud.value = true;
};

const openComponent = (roleItem?: Role) => {
    console.log(roleItem)
    if(roleItem){
        role.value = roleItem
        helper.clickIn = 'Edit'
        return
    }
    role.value = undefined
    helper.clickIn = 'Create';
}

const { t } = useI18n();
const { formCrud, openModalCrud, clickIn, formRef } = storeToRefs(helper);
const rows: Row[] = [
    {
        fields: [
            {
                label: t("general-views.name"),
                type: "text",
                valueForm: "name",
            },
            {
                label: t("views.permissions.title"),
                type: "select",
                select: {
                    items: permissions,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                    multiple: true,
                },
                valueForm: "permissions",
            },
        ],
    },
];

const headers: Head[] = [
    {
        name: t("general-views.name"),
        value: "attributes.name",
    },
];
</script>

<style scoped></style>

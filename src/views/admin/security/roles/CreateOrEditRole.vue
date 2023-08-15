<template>
    <div class="text-table">
        <VForm>
            <div class="font-22 font-weight-semibold text-primary">
                {{ helper.clickIn == "Edit" ? "Editar" : "Crear" }} Rol
            </div>
            <div class="w-25 my-5">
                <div>
                    <InputComponent
                        v-model="form.name"
                        name="Nombre"
                        :rules="[validator.required]"
                    >
                    </InputComponent>
                </div>
            </div>
            <div>
                <div>
                    Permisos
                </div>
                <div>
                    <TableComponent
                        :optionsHabilit="false"
                        :headers="headers"
                        :items="roleStore.permissionCategories"
                    >
                        <template #name="{ data }">
                            <th class="text-left text-primary text-capitalize"  style="width: 280px;">
                                {{ data }} 
                            </th>
                        </template>
                        <template #cel-name="{ data }">
                            <div class="text-left">
                                {{ permissionCategory(data).attributes.name }}
                            </div>
                        </template>

                        <template #cel-permissions="{ data }">
                            <div class="d-flex">
                                <VCheckbox density="compact" hideDetails label="Crear"></VCheckbox>
                                <VCheckbox density="compact" hideDetails label="Editar"></VCheckbox>
                                <VCheckbox density="compact" hideDetails label="Eliminar"></VCheckbox>
                                <VCheckbox density="compact" hideDetails label="Ver"></VCheckbox>
                            </div>
                        </template>
                    </TableComponent>
                </div>
            </div>
            <div class="d-flex justify-space-between">
                <VBtnSecondary @click="helper.clickIn = ''">
                    Atrás
                </VBtnSecondary>
                <VBtnPrimary @click="helper.clickIn = ''">
                    Guardar
                </VBtnPrimary>
            </div>
        </VForm>
    </div>
</template>

<script setup lang="ts">
import { helperStore } from "@/helper";
import InputComponent from "@/components/InputComponent.vue";
import { reactive } from "vue";
import type { RoleCreate } from "@/interfaces/Role/Role.dto";
import * as validator from '@/validator'
import TableComponent from "@/components/global/TableComponent.vue";
import type { Head } from "@/interfaces/TableComponent.helper";
import { RoleStore } from '@/stores/RoleStore'
import type { PermissionCategory } from '@/interfaces/Permission/Permission.model'
import type { Role } from "@/interfaces/Role/Role.model";

const props = defineProps<{
    role?: Role
}>()

const helper = helperStore();
const roleStore = RoleStore()
const form = reactive<RoleCreate>({
    name: '',
    permissions: []
})

if(props.role){
    form.name = props.role.attributes.name
}

const permissionCategory = (item:unknown): PermissionCategory => item as PermissionCategory

const headers: Head[] = [
    {
        name: 'Categoría',
        value: "name",
        
    },
    {
        name: 'Permisos',
        value: "permissions",
    },
];

</script>

<style scoped></style>

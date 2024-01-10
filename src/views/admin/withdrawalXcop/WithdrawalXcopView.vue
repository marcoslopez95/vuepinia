<template>
    <div>
        <div class="d-flex justify-space-between mx-5 mb-5">
            <h2 class="text-primary font-weight-bold">Retiro de XCOP</h2>
            <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        </div>

        <TableComponentVue
            optionsHabilit
            newButtons
            icon-show
            :headers="headers"
            @show="showItem"
            :items="helper.items"
        >
            <template #cel-attributes.status="{ data }">
                <VChipSuccess
                    class=""
                    v-if="data.attributes.status === 'Procesado'"
                >
                    Completado
                </VChipSuccess>
                <VChipWarning
                    class=""
                    v-if="data.attributes.status == 'En proceso'"
                >
                    Pendiente
                </VChipWarning>
            </template>
            <template #newButtons="{ data }">
                <v-list-item-title class="cursor-pointer"  v-if="data.attributes.status == 'En proceso'">
                    <VBtn
                        title="Aceptar"
                        color="transparent"
                        size="x-small"
                        elevation="0"
                        icon
                        @click="accept(data)"
                    >
                        <VIcon color="primary" size="24" :icon="CheckIconVue" />
                    </VBtn>
                    Aceptar
                </v-list-item-title>
            </template>
        </TableComponentVue>
        <ResumenModal v-if="helper.item" v-model="showKyc" @update:model-value="(v) => showKyc = v"> </ResumenModal>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ResumenModal from "./ResumenModal.vue";
import { useI18n } from "vue-i18n";
import { helperStore } from "@/helper";
import SearchInputComponentVue from "@/components/global/SearchInputComponent.vue";
import TableComponentVue from "@/components/global/TableComponent.vue";
import type { Head } from "@/interfaces/TableComponent.helper";
import type { Kyc } from "@/interfaces/User/Kyc/Kyc.model";
import { KYC_STATUS } from "@/enums/Kyc.enum";
import CheckIconVue from "@/assets/icons/CheckIcon.vue";
import type { WithdrawalXCOP } from "@/interfaces/TransactionXCOP/TransactionXCOP.model";

const showKyc = ref(false);
const { t } = useI18n();
const helper = helperStore();
const search = ref<string>("");
helper.url = "withdrawal/xcop";
helper.initView()
const account = ref({});
helper.index();

const getSearch = () => {
    helper.index({
        type_document: search.value,
    });
};

const headers: Head[] = [
    {
        name: t("general-views.id"),
        value: "id",
    },
    {
        name: t("views.users.title"),
        value: "relationships.user.attributes.username",
    },
    {
        name: t("views.users.email"),
        value: "relationships.user.attributes.email",
    },
    {
        name: t("general-views.status"),
        value: "attributes.status",
    },
];

const showItem = (element: Kyc) => {
    helper.item = element;
    showKyc.value = true;
    helper.clickIn = "Show";
};

const accept = async (itemI: unknown) => {
    const item = itemI as WithdrawalXCOP;
    const url = "withdrawal/xcop/accept/process/" + item.id;
    await helper.http(url, "POST");
    helper.index();
};
</script>

<style scoped></style>

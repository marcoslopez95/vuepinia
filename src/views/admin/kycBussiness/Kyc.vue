<template>
    <div v-if="helper.clickIn != 'Show'">
        <div class="d-flex justify-space-between mx-5 mb-5">
            <h2 class="text-primary font-weight-bold">
                {{ $t("views.admin.kyc.title") }} Empresas
            </h2>
            <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        </div>

        <TableComponentVue
            optionsHabilit
            icon-show
            :headers="headers"
            @show="showItem"
            :items="helper.items"
        >
            <template #cel-attributes.status="{ data }">
                <VChipSuccess
                    v-if="getStatusKyc(bussiness(data)) === KYC_STATUS.ACCEPT"
                >
                    {{ getStatusKyc(bussiness(data)) }}
                </VChipSuccess>
                <VChipError
                    v-if="getStatusKyc(bussiness(data)) === KYC_STATUS.REJECT"
                >
                    {{ getStatusKyc(bussiness(data)) }}
                </VChipError>
                <VChipWarning
                    v-if="
                        getStatusKyc(bussiness(data)) ===
                        KYC_STATUS.IN_VERIFICATION
                    "
                >
                    {{ getStatusKyc(bussiness(data)) }}
                </VChipWarning>
            </template>
        </TableComponentVue>
    </div>
    <KycShow v-else @back="helper.index" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { helperStore } from "@/helper";
import SearchInputComponentVue from "@/components/global/SearchInputComponent.vue";
import TableComponentVue from "@/components/global/TableComponent.vue";
import type { Head } from "@/interfaces/TableComponent.helper";
import KycShow from "./KycShow.vue";
import type { Kyc } from "@/interfaces/User/Kyc/Kyc.model";
import { KYC_STATUS } from "@/enums/Kyc.enum";
import type { BussinessKyc } from "@/interfaces/Bussiness/Bussiness.model";

const showKyc = ref(false);
const { t } = useI18n();
const helper = helperStore();
const search = ref<string>("");
helper.url = "companys/kyc";
helper.initView()

helper.index();

const bussiness = (item: unknown) => item as BussinessKyc;

const getStatusKyc = (item: BussinessKyc): string =>
    item.attributes.status ?? "";
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
        name: 'Empresa',
        value: "relationships.company.attributes.name",
    },
    {
        name: t("views.users.title"),
        value: "relationships.company.relationships.user.attributes.username",
    },
    {
        name: t("views.users.email"),
        value: "relationships.company.relationships.user.attributes.email",
    },
    {
        name: t("general-views.status"),
        value: "attributes.status",
    },
];

const showItem = (element: BussinessKyc) => {
    helper.item = element;
    helper.clickIn = "Show";
};
</script>

<style scoped></style>

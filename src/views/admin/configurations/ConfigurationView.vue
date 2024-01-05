<template>
    <h2 class="text-table font-weight-bold">
        {{ $t("views.configurations.title", 2) }} - {{ menuActive }}
        {{ submenuActive ? " - " + submenuActive : "" }}
    </h2>

    <!-- <v-card> -->
    <div class="border-b-md">
        <v-tabs v-model="menuActive" bg-color="transparent" show-arrows>
            <v-tab
                v-for="(item, i) in tabs"
                @click.prevent="clickInTab(i, item,item.nameRoute)"
                :value="item.name"
            >
                <span
                    :class="
                        menuActive == item.name ? 'text-primary' : 'text-tab'
                    "
                    v-if="!item.children"
                    >{{ item.name }}</span
                >
                <v-menu v-else class="w-100 h-100" v-model="menusOpened[i]">
                    <template v-slot:activator="{ props }">
                        <v-btn
                            variant="plain"
                            rounded="0"
                            class="align-self-center font-weight-bold w-100 h-100"
                            height="100%"
                            v-bind="props"
                            :color="
                                item.children.some(
                                    (ch) => ch.name === submenuActive
                                )
                                    ? 'primary'
                                    : 'tab'
                            "
                        >
                            {{ item.name }}
                            <v-icon end icon="mdi-menu-down"></v-icon>
                        </v-btn>
                    </template>

                    <v-list
                        elevation="10"
                        class="bg-grey-lighten-3 border-primary rounded-xl text-primary"
                    >
                        <v-list-item
                            v-for="(child, j) in item.children"
                            :key="j"
                            @click="
                                clickInSubMenu(
                                    child.value,
                                    child.name,
                                    item.name,
                                    child.nameRoute
                                )
                            "
                            :active="submenuActive == child.name"
                            color="primary"
                        >
                            {{ child.name }}
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-tab>
        </v-tabs>
    </div>

    <v-card-text>
        <v-window v-model="tabActive" :touch="false">
            <RouterView />
            <!-- <Component :key="tabActive" :is="tabActive" /> -->
            <!-- <v-window-item value="">
                    <span class="text-table">Por favor escoja una opción</span>
                </v-window-item> -->
        </v-window>
    </v-card-text>
    <!-- </v-card> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CountryView from "./countries/CountryView.vue";
import DepartamentsView from "./departaments/DepartamentsView.vue";
import MunicipalitiesView from "./municipalities/MunicipalitiesView.vue";
import TypeDocumentsView from "./type-documents/TypeDocumentsView.vue";
import { helperStore } from "@/helper";
import { storeToRefs } from "pinia";
import { watch, shallowRef } from "vue";
import BanksView from "./banks/BanksView.vue";
import CurrencyView from "./currencies/CurrencyView.vue";
import PaymentMethodView from "./PaymentMethod/PaymentMethodView.vue";
import TypeBankAccountView from "./TypeBankAccount/TypeBankAccountView.vue";
import CategoriesFaqView from "./Faq/CategoriesFaqView.vue";
import FaqView from "./Faq/FaqView.vue";
import BankAccountCompanyView from "./CompanyAccounts/Bank/BankAccountCompanyView.vue";
import EfectyAccountCompanyView from "./CompanyAccounts/Efecty/EfectyAccountCompanyView.vue";
import items from "@/layouts/full/sidebar/items/AdminItems";
import OtherAccountCompanyView from "./CompanyAccounts/Other/OtherAccountCompanyView.vue";
import CurrencyTypeView from "./CurrencyType/CurrencyTypeView.vue";
import WalletView from "./wallet/WalletView.vue";
import ShippingTypeView from "./ShippingTypes/ShippingTypeView.vue";
import OtherPaymentsView from "./OtherPayments/OtherPaymentsView.vue";
import PenaltyTypeView from "./PenaltyTypes/PenaltyTypeView.vue";
import NetworkTypeView from "./NetworkType/NetworkTypeView.vue";
import RolesView from "../security/roles/RolesView.vue";
import ExternalDeposit from "./CompanyAccounts/ExternalDeposit/ExternalDeposit.vue";
import PermissionsView from "../security/permissions/PermissionsView.vue";
import ConfigurationGeneralView from "./Generals/ConfigurationGeneralView.vue";
import { useRoute, useRouter } from "vue-router";

const { t } = useI18n();
const helper = helperStore();
const tabActive = ref(RolesView);
const tabs = shallowRef<ItemTab[]>([
    {
        name: "Seguridad",
        value: "Seguridad",
        nameRoute: "",
        children: [
            {
                name: t("views.roles.title", 2),
                value: RolesView,
                nameRoute: "admin-configurations-security-roles",
            },
        ],
    },
    {
        name: t("views.configurations.tabs.ubication"),
        value: "ubicaciones",
        nameRoute: "",
        children: [
            {
                name: t("views.countries.title", 2),
                value: CountryView,
                nameRoute: "admin-configurations-ubications-countries",
            },
            {
                name: t("views.departaments.title", 2),
                value: DepartamentsView,
                nameRoute: "admin-configurations-ubications-departaments",
            },
            {
                name: t("views.municipalities.title", 2),
                value: MunicipalitiesView,
                nameRoute: "admin-configurations-ubications-municipalities",
            },
        ],
    },
    {
        name: "Configuraciones",
        value: "general",
        nameRoute: "",
        children: [
            {
                name: "General",
                value: ConfigurationGeneralView,
                nameRoute: "admin-configurations-generals",
            },
            {
                name: t("views.type_documents.title", 2),
                value: TypeDocumentsView,
                nameRoute: "admin-configurations-type-documents",
            },
            {
                name: t("views.banks.title", 2),
                value: BanksView,
                nameRoute: "admin-configurations-generals-banks",
            },
            {
                name: t("views.currencies.title", 2),
                value: CurrencyView,
                nameRoute: "admin-configurations-generals-currencies",
            },
            {
                name: t("views.currency-types.title", 2),
                value: CurrencyTypeView,
                nameRoute: "admin-configurations-generals-type-currencies",
            },
            {
                name: t("views.type-company-account.title", 2),
                value: PaymentMethodView,
                nameRoute: "admin-configurations-generals-payment-methods",
            },
            {
                name: t("views.other-payments.title", 2),
                value: OtherPaymentsView,
                nameRoute: "admin-configurations-generals-other-payments",
            },
            {
                name: t("views.type-bank-account.title", 2),
                value: TypeBankAccountView,
                nameRoute: "admin-configurations-generals-type-accounts",
            },
            {
                name: t("views.shipping-types.title", 2),
                value: ShippingTypeView,
                nameRoute: "admin-configurations-generals-shipping-types",
            },
            {
                name: t("views.penalties-types.title", 2),
                value: PenaltyTypeView,
                nameRoute: "admin-configurations-generals-penalty-type",
            },
            {
                name: t("views.network-type.title", 2),
                value: NetworkTypeView,
                nameRoute: "admin-configurations-generals-network-types",
            },
        ],
    },
    {
        name: t("views.configurations.tabs.company-account.title"),
        value: "finanzas",
        nameRoute: "",
        children: [
            {
                name: t("views.company-accounts.bank.title", 2),
                value: BankAccountCompanyView,
                nameRoute: "admin-configurations-banks-accounts",
            },
            {
                name: t("views.company-accounts.efecty.title", 2),
                value: EfectyAccountCompanyView,
                nameRoute: "admin-configurations-efecty-accounts",
            },
            {
                name: t("views.company-accounts.other.title", 2),
                value: OtherAccountCompanyView,
                nameRoute: "admin-configurations-other-accounts",
            },
            {
                name: "Deposito Externo",
                value: ExternalDeposit,
                nameRoute: "admin-configurations-external-deposits",
            },
        ],
    },
    {
        name: t("views.wallets.title", 2),
        value: WalletView,
        nameRoute: "admin-configurations-wallets",
    },
]);

const router = useRouter()
const route  = useRoute()
const menusOpened = ref(
    tabs.value.filter((item) => item.children).map((item) => false)
);

const submenuActive = ref("");
const menuActive = ref("");

const clickInSubMenu = (
    component: any,
    name: string,
    parent: string,
    to:string
) => {
    submenuActive.value = name;
    tabActive.value = component;
    menuActive.value = parent;
    router.push({name:to})
};

const clickInTab = (
    i: number,
    item: ItemTab,
    to:string
) => {
    menusOpened.value[i] = true;
    submenuActive.value = "";
    if (!item.children) {
        tabActive.value = item.value;
        menuActive.value = item.name;
        router.push({name:to})
    }
};
const verificatedUrl = ():void => {
    const itemChildren = tabs.value.filter(t => t.children)
                            .find(
                                t => t.children!.find( t => t.nameRoute == route.name)
                            )
                            
    if(itemChildren){
        const children = itemChildren.children?.find( t => t.nameRoute == route.name)!
        submenuActive.value = children.name;
        menuActive.value = itemChildren.name;
        return
    }
    const item = tabs.value.find( t => t.nameRoute == route.name)!
    menuActive.value = item.name;
}
verificatedUrl()
interface ItemTab {
    name: string;
    value: any;
    children?: ItemTab[];
    nameRoute: string;
}
</script>

<style scoped></style>

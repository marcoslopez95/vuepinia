<template>
    <div class="d-flex justify-space-between">
        <h3 class="text-primary">{{ $t("views.users.title", 2) }}</h3>
        <SearchInputComponentVue v-model="search" @onSearch="getSearch" />
        <VBtn @click="openModal" prepend-icon="mdi-plus" class="rounded-xl">
            {{ $t("buttons.add") }}
        </VBtn>
    </div>
    <!-- <VBtn @click="openModal">{{ $t('buttons.create') }}</VBtn> -->
    <v-tabs class="mb-5" v-model="role_id" color="primary">
        <v-tab v-for="(role, i) in userStore.roles" :value="role.id">
            {{ role.attributes.name }}
        </v-tab>
    </v-tabs>
    <CrudComponent
        :singular="$t('views.users.title', 2)"
        :rows="rows"
    ></CrudComponent>
    <TableComponentVue
        :optionsHabilit="true"
        icon-show
        icon-update
        :headers="headers"
        :items="helper.items"
        new-buttons
    >
        <template #cel-attributes.username="{ data }">
            <span class="text-primary">
                {{ data.attributes.username }}
            </span>
        </template>

        <template #cel-verificate-state="{ data }">
            <span class="text-table">
                <VIcon
                    :icon="CheckedIcon"
                    :color="emailVerificated(data) ? 'success' : 'inactive'"
                >
                </VIcon>
                Email
            </span>
            <span class="text-table">
                <VIcon
                    :icon="CheckedIcon"
                    :color="phoneVerificated(data) ? 'success' : 'inactive'"
                >
                </VIcon>
                Teléfono
            </span>
            <span class="text-table">
                <VIcon
                    :icon="CheckedIcon"
                    :color="kycVerificated(data) ? 'success' : 'inactive'"
                >
                </VIcon>
                Kyc
            </span>
        </template>
        <!-- Botones -->
        <template #newButtons="{ data }">
            <OptionsMenu 
                :user="data"
                @click:send-email="openModalSendNotification(data, TypeNotification.EMAIL)"
                @click:send-sms="openModalSendNotification(data, TypeNotification.SMS)"
            >
            </OptionsMenu>
        </template>
    </TableComponentVue>
    <send-message 
        ref="sendMessageRef"
        :user="userSelect!"
        @close-modal="userSelect = undefined"
        :type="typeNotification!"
    >
    </send-message>
</template>

<script setup lang="ts">
import SendMessage from "./OptionsMenu/SendMessage.vue";
import CrudComponent from "@/components/global/CrudComponent.vue";
import TableComponentVue from "@/components/global/TableComponent.vue";
import { helperStore } from "@/helper";
import type { Row } from "@/interfaces/FormComponent.helper";
import type { Head } from "@/interfaces/TableComponent.helper";
import { UserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import CheckedIcon from "@/assets/icons/CheckedIcon.vue";
import { TypeNotification, type User } from "@/interfaces/User/User.model";
import { KYC_STATUS } from "@/enums/Kyc.enum";
import { ref, watch } from "vue";
import SearchInputComponentVue from "@/components/global/SearchInputComponent.vue";
import OptionsMenu from "./OptionsMenu/OptionsMenu.vue";

const role_id = ref<number | "">("");

const typeNotification = ref<TypeNotification>()
const sendMessageRef = ref<InstanceType<typeof SendMessage> | null>()
const userSelect = ref<User>()

const openModalSendNotification = (user:User, typeNotificationI:TypeNotification) => {
    userSelect.value = user
    typeNotification.value = typeNotificationI
    sendMessageRef.value!.modal = true
}

const helper = helperStore();
helper.url = "users";
// helper.index();
const search = ref<string>("");
const getSearch = () => {
    helper.index({
        name: search.value,
        role_id: role_id.value,
    });
};
const userStore = UserStore();
userStore.getDepartaments();
userStore.getMunicipalities();
userStore.getUsers();
userStore.getRoles().then(() => {
    if (userStore.roles.length > 0) {
        role_id.value = userStore.roles[1].id;
    }
    getSearch();
});
userStore.getCountries();
userStore.getTypeDocuments();

watch(role_id, () => {
    getSearch();
});

const { departaments, municipalities, users, roles, countries, typeDocuments } =
    storeToRefs(userStore);

const openModal = async () => {
    itemH.value = {};
    formCrud.value = {};
    clickIn.value = "Create";
    openModalCrud.value = true;
};
const { t } = useI18n();
const {
    formCrud,
    openModalCrud,
    item: itemH,
    clickIn,
    formRef,
} = storeToRefs(helper);
const rows: Row[] = [
    {
        fields: [
            {
                label: t("views.users.first_name"),
                type: "text",
                valueForm: "first_name",
            },
            {
                label: t("views.users.second_name"),
                type: "text",
                valueForm: "second_name",
            },
            {
                label: t("views.users.last_name"),
                type: "text",
                valueForm: "last_name",
            },
            {
                label: t("views.users.second_last_name"),
                type: "text",
                valueForm: "second_last_name",
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.users.email"),
                type: "text",
                valueForm: "email",
            },
            {
                label: t("views.users.password"),
                type: "text",
                valueForm: "password",
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.users.code_phone"),
                type: "text",
                valueForm: "code_phone",
            },
            {
                label: t("views.users.phone"),
                type: "text",
                valueForm: "phone",
            },
            {
                label: t("views.users.username"),
                type: "text",
                valueForm: "username",
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.users.referred_by"),
                type: "select",
                valueForm: "referred_by",
                select: {
                    items: users,
                    itemTitle: "attributes.username",
                    itemValue: "id",
                },
            },
            {
                label: t("views.roles.title"),
                type: "select",
                valueForm: "role_id",
                select: {
                    items: roles,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
            {
                label: t("views.countries.title"),
                type: "select",
                valueForm: "country_id",
                select: {
                    items: countries,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.departments.title"),
                type: "select",
                valueForm: "department_id",
                select: {
                    items: departaments,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
            {
                label: t("views.municipalities.title"),
                type: "select",
                valueForm: "municipalitie_id",
                select: {
                    items: municipalities,
                    itemTitle: "attributes.name",
                    itemValue: "id",
                },
            },
        ],
    },
    {
        fields: [
            {
                label: t("views.type_documents.title"),
                type: "select",
                valueForm: "type_documents_id",
                select: {
                    items: typeDocuments,
                    itemTitle: "attributes.type_document",
                    itemValue: "id",
                },
            },
            {
                label: t("views.users.document"),
                type: "text",
                valueForm: "document",
            },
            {
                label: t("views.users.address"),
                type: "text",
                valueForm: "address",
            },
            {
                label: t("views.users.birth"),
                type: "date",
                valueForm: "birth",
            },
        ],
    },
];

const headers: Head[] = [
    {
        name: t("views.users.user"),
        value: "attributes.username",
    },
    {
        name: t("views.users.email"),
        value: "attributes.email",
    },
    {
        name: t("views.users.estate-verification"),
        value: "verificate-state",
        style: "min-width:350px",
    },
    {
        name: t("views.users.referred-by"),
        value: "",
    },
    {
        name: t("genereal-views.state"),
        value: "attributes.deleted_at",
        status: "deleted",
    },
    {
        name: t("views.users.created_at"),
        value: "attributes.created_at",
        type: "date",
        format: "YYYY-MM-DD | HH:mm:ss",
        style: "min-width:250px",
    },
];

const emailVerificated = (user: User): boolean => {
    return user.attributes.email_verified_at ? true : false;
};
const phoneVerificated = (user: User): boolean => {
    return user.attributes.phone_verified_at ? true : false;
};
const kycVerificated = (user: User): boolean => {
    return user.relationships?.kyc?.attributes.status == KYC_STATUS.ACCEPT
        ? true
        : false;
};
</script>

<style scoped></style>

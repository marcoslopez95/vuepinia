<template>
    <div class="d-flex justify-space-between mx-5 mb-2">
        <h2
            class="text-table font-weight-bold"
            v-html="$t('views.admin.kyc.show.title', { fullname: fullname })"
        ></h2>

        <VBtnSecondary @click="back">
            {{ $t("general-views.back") }}
        </VBtnSecondary>
    </div>
    <VDivider class="" />

    <div class="mt-10 d-lg-flex">
        <div
            class="px-2 border-primary rounded-lg text-table font-weight-bold py-5 mx-auto"
            style="max-width: 345px; max-height: 540px;"
        >

            <VRow class="justify-space-between" dense>
                <VCol cols="7" class="pb-0 mb-0">
                    Nombre de Empresa:
                </VCol>
                <VCol cols="5" class="text-center">
                    {{ kyc.attributes.name}}
                </VCol>

                <VCol cols="7" class="pb-0 mb-0">
                    Dirección:
                </VCol>
                <VCol cols="5" class="text-center">
                    {{ kyc.attributes.address }}
                </VCol>

                <VCol cols="7" class="pb-0 mb-0">
                    NIC:
                </VCol>
                <VCol cols="5" class="text-center">
                    {{ kyc.attributes.nic }}
                </VCol>

                <VCol cols="7" class="pb-0 mb-0">
                    Teléfono:
                </VCol>
                <VCol cols="5" class="text-center">
                    {{ kyc.attributes.code_phone }} {{ kyc.attributes.phone }}
                </VCol>

                <VCol cols="7"> Departamento: </VCol>
                <VCol cols="5" class="text-center">
                    {{ kyc.relationships?.department?.attributes.name ?? '' }}
                </VCol>

                <VCol cols="7"> Municipio : </VCol>
                <VCol cols="5" class="text-center">
                    {{ kyc.relationships?.municipalitie?.attributes.name ?? '' }}
                </VCol>

            </VRow>

            <div class="mt-5">
                <p class="text-center">
                    {{ $t("views.admin.kyc.check-list") }}
                </p>

                <p>{{ $t("views.admin.kyc.last-check") }} :</p>
            </div>
        </div>

        <!-- Imagenes del kyc -->
        <VRow class="my-auto ml-3 mx-auto" style="gap: 15px">
            <VCol
                :class="$vuetify.display.mdAndDown ? 'mt-10' : ''"
                class="mx-auto"
                style="min-width: 210px; max-width: 210px"
                v-for="(image, i) in images"
                :key="i"
            >
                <div class="text-center">
                    <span class="text-18 font-weight-light text-table">{{
                        image.name
                    }}</span>
                </div>
                <VCard
                    elevation="0"
                    style="min-width: 210px; max-width: 210px"
                    class="mx-auto bg-sky-1"
                >
                    <template #title>
                        <div class="d-flex justify-center">
                            <VImg
                                class=""
                                :style="`transform: rotate(${
                                    rotateImg[image.value]
                                }deg);`"
                                v-if="image.image"
                                sizes="180px"
                                :src="image.image"
                            >
                                <template #error>
                                    <VIcon
                                        class=""
                                        size="180"
                                        icon="mdi-image-off-outline"
                                    ></VIcon>
                                </template>
                            </VImg>
                        </div>
                    </template>
                    <VCardText class="mb-0 pb-1 d-flex">
                        <div class="d-flex gap-2">
                            <VIcon
                                @click="rotateImg[image.value] -= 45"
                                class="cursor-pointer"
                                :icon="ArrowLeft"
                            />
                            <VIcon
                                @click="rotateImg[image.value] += 45"
                                class="cursor-pointer"
                                :icon="ArrowRight"
                            />
                        </div>
                        <VSpacer></VSpacer>
                        <div>
                            <VIcon
                                class="cursor-pointer"
                                :icon="ZoomOut"
                                @click="showImgZoom(image.image, image.value)"
                            />
                        </div>
                    </VCardText>
                </VCard>

                <div
                    class="d-flex mt-2"
                    style="width: 210px"
                    v-if="image.status === KYC_STATUS.IN_VERIFICATION"
                >
                    <VBtnSuccess
                        class="text-uppercase font-weight-bold"
                        style=""
                        elevation="10"
                        @click="rejectOrAccept(image.value, 'accept')"
                    >
                        Aprobar
                    </VBtnSuccess>
                    <VSpacer />
                    <VBtnDanger
                        @click="rejectOrAccept(image.value, 'reject')"
                        class="text-uppercase font-weight-bold"
                        style=""
                        elevation="10"
                    >
                        Rechazar
                    </VBtnDanger>
                </div>
                <div v-else class="w-100 mt-2 text-center">
                    <VChip
                        class="mx-auto font-weight-bold text-uppercase"
                        :color="
                            image.status === KYC_STATUS.ACCEPT ? 'ok' : 'erro'
                        "
                        variant="outlined"
                    >
                        {{ image.status }}
                    </VChip>
                </div>
            </VCol>
            <DialogGlobal :dialog="openModal" @close-dialog="openModal = false">
                <template #content>
                    <VImg
                        :style="`transform: rotate(${rotateImageModal}deg);`"
                        :src="imgModal"
                    ></VImg>
                </template>
            </DialogGlobal>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import { helperStore } from "@/helper";
import type { Kyc } from "@/interfaces/User/Kyc/Kyc.model";
import { computed, ref } from "vue";
import dayjs from "dayjs";
import ArrowLeft from "@/assets/icons/kyc/GireLeftIcon.vue";
import ArrowRight from "@/assets/icons/kyc/GireRightIcon.vue";
import ZoomOut from "@/assets/icons/kyc/ZoomOutIcon.vue";
import { useI18n } from "vue-i18n";
import { KYC_STATUS } from "@/enums/Kyc.enum";
import DialogGlobal from "@/components/global/DialogGlobal.vue";
import type { Bussiness } from "@/interfaces/Bussiness/Bussiness.model";

const emits = defineEmits<{
    (e: "back"): void;
}>();
const { t } = useI18n();
const helper = helperStore();
const kyc = ref<Bussiness>(helper.item);

const back = () => {
    helper.clickIn = "";
    emits("back");
};
const fullname = computed((): string => {
    const user = kyc.value.relationships!.user!;
    return user.attributes.first_name + " " + user.attributes.last_name;
});
const user = kyc.value.relationships?.user;

const getDateLastConnection = (): string => {
    const last_connection =
        user?.relationships?.last_connection.attributes.created_at;
    return dayjs(last_connection).format("YYYY-MM-DD | HH:mm:ss");
};

const images = computed(
    (): {
        value: imageType;
        name: string;
        image: string;
        status: KYC_STATUS;
    }[] => {
        return [
            {
                name: t("views.admin.kyc.selfie"),
                image:
                    kyc.value.relationships?.kyc?.attributes
                        .url_aws_address_verification ?? "",
                status: kyc.value.relationships?.kyc?.attributes
                    .address_verification_status as KYC_STATUS,
                value: "selfie",
            },
            {
                name: t("views.admin.kyc.front"),
                image:
                    kyc.value.relationships?.kyc?.attributes
                        .url_aws_banking_certification ?? "",
                status: kyc.value.relationships?.kyc?.attributes
                    .banking_certification_status as KYC_STATUS,
                value: "front",
            },
            {
                name: t("views.admin.kyc.back"),
                image:
                    kyc.value.relationships?.kyc?.attributes
                        .url_aws_chamber_commerce_certificate ?? "",
                status: kyc.value.relationships?.kyc?.attributes
                    .chamber_commerce_certificate_status as KYC_STATUS,
                value: "back",
            },
            {
                name: t("views.admin.kyc.back"),
                image:
                    kyc.value.relationships?.kyc?.attributes.url_aws_rut ?? "",
                status: kyc.value.relationships?.kyc?.attributes
                    .rut_status as KYC_STATUS,
                value: "back",
            },
            {
                name: t("views.admin.kyc.back"),
                image:
                    kyc.value.relationships?.kyc?.attributes
                        .url_aws_shareholding_structure ?? "",
                status: kyc.value.relationships?.kyc?.attributes
                    .shareholding_structure_status as KYC_STATUS,
                value: "back",
            },
        ];
    }
);

const rejectOrAccept = async (type: imageType, action: keyof Actions) => {
    let data: putKyc = {};
    const act = actions[action];
    if (type == "back") {
        data.reverse_identity_document_status = act;
    } else if (type == "front") {
        data.front_identity_document_status = act;
    } else if (type == "selfie") {
        data.selfie_identity_document_status = act;
    }
    if (action === "reject") {
        data.status_all = act;
    }
    const url = `kyc/verificate/` + helper.item.id;
    const res = (await helper.http(url, "put", { data })).data.response as Kyc;

    // kyc.value = res;
};

const openModal = ref(false);
const imgModal = ref("");
const rotateImg = ref({
    selfie: 0,
    back: 0,
    front: 0,
});
const rotateImageModal = ref(0);
const showImgZoom = (src: string, type: imageType) => {
    imgModal.value = src;
    openModal.value = true;
    rotateImageModal.value = rotateImg.value[type];
};
// --------------------------------
type imageType = "selfie" | "back" | "front";

const actions = {
    reject: KYC_STATUS.REJECT,
    accept: KYC_STATUS.ACCEPT,
};

interface Actions {
    reject: KYC_STATUS;
    accept: KYC_STATUS;
}

interface putKyc {
    status_all?: KYC_STATUS;
    front_identity_document_status?: KYC_STATUS;
    reverse_identity_document_status?: KYC_STATUS;
    selfie_identity_document_status?: KYC_STATUS;
}
</script>

<style lang="scss">
@import "@/scss/variables.scss";

.border-primary {
    border: 1px solid;
    border-color: $color-primary !important;
}
</style>

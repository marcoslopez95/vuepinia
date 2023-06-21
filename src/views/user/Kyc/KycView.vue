<template>
    <h2 class="text-primary">{{ $t('views.profile.kyc.verification-identity') }}</h2>
    <AlertVerification @exist-kyc="(e) => existKyc = e"/>
    <WarningPersonalData v-model="validPersonalData" @personal-data="setForm" />

    <div v-if="!existKyc || existKyc == KYC_STATUS.REJECT">
        <div>
            <p class="text-table mt-4">
                {{ $t('views.profile.kyc.upload-documents') }}
            </p>
        </div>
        <div class="text-table mt-4">
            <h3 class="text-primary mb-3">
                {{ $t('views.profile.kyc.title-intructions') }}
            </h3>
            <div class="ma-0 pa-0" style="max-height: 16px;">
                <VAvatar class="ma-0 pa-0">
                    <VIcon icon="mdi-circle" size="7"></VIcon>
                </VAvatar>
                {{ $t('views.profile.kyc.instructions.one') }}
            </div>
            <div class="ma-0 pa-0" style="max-height: 16px;">
                <VAvatar class="ma-0 pa-0">
                    <VIcon icon="mdi-circle" size="7"></VIcon>
                </VAvatar>
                {{ $t('views.profile.kyc.instructions.two') }}
            </div>
            <div class="ma-0 pa-0" style="max-height: 30px;">
                <VAvatar class="ma-0 pa-0">
                    <VIcon icon="mdi-circle" size="7"></VIcon>
                </VAvatar>
                {{ $t('views.profile.kyc.instructions.three') }} <span
                    class="text-primary font-weight-bold">JPG,PNG,GIF</span>
            </div>
        </div>

        <div>
            <VForm class="mx-10">
                <UploadImageComponent :image="items[0].image" :text="items[0].text"
                    v-model="form.front_identity_document" />
                <UploadImageComponent :image="items[1].image" :text="items[1].text"
                    v-model="form.reverse_identity_document" />
                <UploadImageComponent :image="items[2].image" :text="items[2].text"
                    v-model="form.selfie_identity_document" />

                <VCheckbox v-model="checkbox.terms">
                    <template #label>
                        <div v-html="$t('views.profile.kyc.checkbox.terms-and-conditions')">
                        </div>
                    </template>
                </VCheckbox>
                <VCheckbox v-model="checkbox.all_data">
                    <template #label>
                        <div>
                            {{ $t('views.profile.kyc.checkbox.all-information') }}
                        </div>
                    </template>
                </VCheckbox>
            </VForm>
            <div class="w-100 text-center">
                <VBtnPrimary @click="sendKyc" :disabled="!enabledButton" class=""> {{ $t('commons.send') }} </VBtnPrimary>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import UploadImageComponent from './components/UploadImageComponent.vue'
import FrontalDni from '@/assets/images/kyc/Frontal Dni.png'
import BackDni from '@/assets/images/kyc/BackDni.png'
import SelfieDni from '@/assets/images/kyc/SelfieDni.png'
import { ref } from 'vue'
import { reactive } from 'vue';
import { computed } from 'vue';
import WarningPersonalData from './WarningPersonalData/WarningPersonalData.vue'
import { helperStore } from '@/helper';
import { useRouter } from 'vue-router';
import AlertVerification from './AlertVerification/AlertVerification.vue'
import { KYC_STATUS } from '@/enums/Kyc.enum';
const helper = helperStore()
const router = useRouter()
const { t } = useI18n()

const existKyc = ref<KYC_STATUS | false> (false)
const items: ImagesKyc[] = [
    {
        image: FrontalDni,
        text: 'Sube aqui el documento por la cara <span class="text-uppercase text-primary">frontal</span>'
    },
    {
        image: BackDni,
        text: 'Sube aqui el documento por la cara <span class="text-uppercase text-primary">trasera</span>'
    },
    {
        image: SelfieDni,
        text: `
        Sube aqui una <span class="text-uppercase text-primary">selfie</span> 
        con el documento en tu mano acompañado de una hoja donde escribiras: 
        <span class="text-uppercase text-primary">usuario xeler go</span>
        y la <span class="text-primary">fecha de envío</span>
        `
    },
]

const form = ref<KycUpload>({
    type_documents_id: '',
    document: '',
    front_identity_document: '',
    selfie_identity_document: '',
    reverse_identity_document: '',
    country_id: '',
    nationality_id: '',
})

const validPersonalData = ref(false)

const checkbox = reactive({
    terms: false,
    all_data: false
})

const setForm = (personalData: Omit<KycUpload,
    'front_identity_document' | 'selfie_identity_document' | 'reverse_identity_document'>
) => {
    form.value.country_id = personalData.country_id
    form.value.nationality_id = personalData.nationality_id
    form.value.document = personalData.document
    form.value.type_documents_id = personalData.type_documents_id
}

const enabledButton = computed(() => {
    const allCheckbox = checkbox.all_data && checkbox.terms

    let formValid = true;
    for (let key in form.value) {
        if (!form.value[key as keyof KycUpload]) {
            console.log(key, form.value[key as keyof KycUpload])
            formValid = false;
            break;
        }
    }

    return allCheckbox && formValid && validPersonalData.value
})

const sendKyc = () => {
    const url = 'kyc'

    const data = new FormData()
    for (let key in form.value) {
        //@ts-ignore
        data.append(key, form.value[key as keyof KycUpload])
    }

    helper
        .http(url, 'post', { data }, t('commons.message-success', { message: 'Kyc' }))
        .then(() => {
            router.push({ name: 'Profile' })
        })
}
//--------------------------
interface ImagesKyc {
    image: string
    text: string
}

interface KycUpload {
    type_documents_id: number | ''
    document: string
    front_identity_document: Blob | ''
    selfie_identity_document: Blob | ''
    reverse_identity_document: Blob | ''
    country_id: number | ''
    nationality_id: number | ''
}

</script>

<style lang="scss" scoped></style>
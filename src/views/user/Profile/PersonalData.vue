<template>
    <VForm ref="formRef" @submit="valid">
        <VRow>
            <VCol lg="6" sm="12">
                <NewInputComponentVue 
                    v-model="form.first_name" 
                    :name="$t('views.profile.personal-data.name')" 
                    :rules="[validator.required]"
                    />
            </VCol>
            <VCol lg="6" sm="12">
                <NewInputComponentVue 
                    v-model="form.second_name" 
                    :name="$t('views.profile.personal-data.second-name')" 
                    :rules="[validator.required]" 
                    />
            </VCol>
            <VCol lg="6" sm="12">
                <NewInputComponentVue 
                    v-model="form.last_name" 
                    :name="$t('views.profile.personal-data.lastname')" 
                    :rules="[validator.required]" 
                    />
            </VCol>
            <VCol lg="6" sm="12">
                <NewInputComponentVue 
                    v-model="form.second_last_name" 
                    :name="$t('views.profile.personal-data.second-lastname')" 
                    :rules="[validator.required]" 
                    />
            </VCol>
            <VCol lg="6" sm="12">
                <NewInputComponentVue 
                    v-model="form.email" 
                    :name="$t('views.profile.personal-data.email')" 
                    :rules="[validator.required]" 
                    />
            </VCol>
            <VCol lg="6" sm="12">
                <TelInput
                    v-model="phoneFormat"
                    @phone="(phone) => form.phone = phone"
                    @phoneCode="(code) => form.code_phone = code"
                    :name="$t('views.profile.personal-data.phone')"
                    required
                    @isValid="(bool) => isPhoneValid = bool"
                    />
            </VCol>
            <VCol lg="6" sm="12">
                <SelectComponentVue
                :items="userStore.typeDocuments"
                v-model="form.country_id"
                :name="$t('views.type_documents.title')"
                itemTitle="attributes.type_document"
                itemValue="id"
                />
            </VCol>
            <VCol lg="6" sm="12">
                <NewInputComponentVue 
                    v-model="form.document" 
                    :name="$t('views.profile.personal-data.document')" 
                    :rules="[validator.required]" 
                    />
            </VCol>
            <VCol lg="6" sm="12">
                <NewInputComponentVue 
                    v-model="form.birth" 
                    type="date"
                    :name="$t('views.profile.personal-data.birthday')" 
                    :rules="[validator.required]" 
                    />
            </VCol>
            <VCol lg="6" sm="12">
                falta nacionalidad
            </VCol>
            <VCol lg="6" sm="12">
                <SelectComponentVue
                :items="userStore.countries"
                v-model="form.country_id"
                :name="$t('views.countries.title')"
                itemTitle="attributes.name"
                itemValue="id"
                />
            </VCol>
            <VCol lg="6" sm="12">
                <SelectComponentVue
                :items="userStore.departaments"
                v-model="form.department_id"
                :name="$t('views.departaments.title')"
                itemTitle="attributes.name"
                itemValue="id"
                />
            </VCol>
            <VCol lg="6" sm="12">
                <SelectComponentVue
                :items="userStore.municipalities"
                v-model="form.municipalitie_id"
                :name="$t('views.municipalities.title')"
                itemTitle="attributes.name"
                itemValue="id"
                />
            </VCol>
            <VCol lg="6" sm="12">
                <NewInputComponentVue 
                    v-model="form.address" 
                    :name="$t('views.profile.personal-data.address')" 
                    :rules="[validator.required]" 
                    />
            </VCol>
        </VRow>
    </VForm>
    <VBtnPrimary 
        class="mx-auto mt-3" 
        type="submit" 
        @click.prevent="valid">
        {{ $t('commons.update') }}
    </VBtnPrimary>
</template>

<script setup lang="ts">
import * as validator from '@/validator'
import { getUserAuth, helperStore } from '@/helper';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Profile } from '@/interfaces/User/User.dto'
import { reactive } from 'vue';
import { storeToRefs } from 'pinia';
import NewInputComponentVue from '@/components/InputComponent.vue';
import SelectComponentVue from '@/components/SelectComponent.vue';
import TelInput from '@/components/TelInput.vue';
import { UserStore } from '@/stores/UserStore';
import user from '@/router/user';
import type { User } from '@/interfaces/User/User.model';

const { t } = useI18n()
const valid = async () => {
    const { valid } = await formRef.value.validate()
    console.log(valid)
    if(!valid || !isPhoneValid.value){
        return;
    }
    updateData()
}
const userStore = UserStore()
userStore.updateUserAuth()

const { userAuth } = storeToRefs(userStore)
const helper = helperStore()
const { formRef } = storeToRefs(helper)
const isPhoneValid = ref(false)
const phoneFormat = ref('')

const form = reactive<Profile>({
    address: '',
    birth: '',
    code_phone: '',
    country_id: '',
    department_id: '',
    email: '',
    first_name: '',
    last_name: '',
    municipalitie_id: '',
    phone: '',
    second_last_name: '',
    second_name: '',
    username: '',
    document: ''
})

userStore.getCountries()
userStore.getDepartaments()
userStore.getMunicipalities()
userStore.getTypeDocuments()

const updateData = () =>{
    const url = 'users/update/profile'
    helper
        .http(url,'put',{data:form},t('commons.update-successfull'))
}
</script>

<style scoped lang="scss">
.v-text-field__slot {
  background: linear-gradient(white, white) padding-box, linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(80,67,233,1) 0%, rgba(22,180,229,1) 100%) border-box;
  border: 1px solid transparent;
  border-radius: 20px;
  text-align: center;
  color: #5D5FEF;
}
</style>
<template>
    <VForm ref="form">
        <VTextField
            label="nombre"
            class="rounded-lg"
            :rounded="40"
            
        />
    </VForm>
</template>

<script setup lang="ts">
import InputComponentVue from '@/components/InputComponent.vue';
import { helperStore } from '@/helper';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { Profile } from '@/interfaces/User/User.dto'
import { reactive } from 'vue';

const { t } = useI18n()
const helper = helperStore()
const first_name = ref()
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
    username:'',
})


</script>

<style scoped lang="scss">
.form-control{
    background: linear-gradient(white, white) padding-box, linear-gradient(180deg, rgba(2,0,36,1) 0%, rgba(80,67,233,1) 0%, rgba(22,180,229,1) 100%) border-box;
    border: 1px solid transparent;
    border-radius: 20px;
    text-align: center;
    color: #5D5FEF;
}

.form-control:hover{
    color: var(--bs-body-color, black);
    background-color: var(--bs-form-control-bg, white);
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgba(13,110,253,.25);
}
</style>
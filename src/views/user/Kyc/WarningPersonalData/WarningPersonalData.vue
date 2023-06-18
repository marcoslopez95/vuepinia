<template>
    <div>
estoe s un warning
    </div>
</template>

<script setup lang="ts">
import { UserStore } from '@/stores/UserStore';
import { ref } from 'vue'

const props = defineProps<{
    modelValue:boolean
}>()
const emits = defineEmits<{
    (e:'update:model-value',value:boolean):void
}>()
const userStore = UserStore()

const kycInformation = ref<KycUpload>({
    type_document_id:'',
    document:'',
    country_id:'',
    nationality_id:'',
})

userStore
    .updateUserAuth().then(()=>{
        const user = userStore.userAuth
        kycInformation.value.type_document_id = user?.relationships?.userDetail.attributes.type_documents_id ?? ''
        kycInformation.value.document = user?.relationships?.userDetail.attributes.document ?? ''
        kycInformation.value.country_id = user?.relationships?.userDetail.relationships?.country.id ?? ''
        // kycInformation.value.nationality_id = user?.relationships?.userDetail.relationships.asd ?? ''
    })

interface KycUpload{
    type_document_id:number|''
    document:string
    country_id:number|''
    nationality_id:number|''
}
</script>

<style scoped>

</style>
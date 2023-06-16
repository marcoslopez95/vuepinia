<template>
    <h2 class="text-table font-weight-bold">{{ $t('views.profile.title') }}</h2>

    <v-card >
        <div class="border-b-md">
            <v-tabs 
                v-model="tabActive" 
                bg-color="transparent"
                >
                <v-tab 
                    v-for="item,i in tabs" 
                    :value="item.value"
                    >
                    {{item.name}}
                </v-tab>
            </v-tabs>
        </div>

        <v-card-text>
            <v-window v-model="tabActive">
                <Component :key="tabActive" :is="tabActive" />
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import PersonalData from './Profile/PersonalData.vue';
import { helperStore } from '@/helper';
import { storeToRefs } from 'pinia';
import { watch , shallowRef} from 'vue';
const { t } = useI18n()
const helper = helperStore()
const tabActive = ref('')
const tabs = shallowRef<{name:string,value:any}[]>([
    {
        name: t('views.profile.personal-data.title'),
        value: PersonalData
    },
])

</script>

<style scoped></style>
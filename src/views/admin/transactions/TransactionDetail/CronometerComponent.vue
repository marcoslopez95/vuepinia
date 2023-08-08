<template>
    <div class="border-degree">
        <div class="d-flex align-center justify-center">
            <VIcon size="40" :icon="CronometerIcon" color="primary" />
            <div class="pb-2">
                <div class="text-primary" style="font-size: 30px">
                    Cronómetro de Pago
                </div>
                <div class="mx-5">
                    <div
                        @click="openModal = true"
                        class="mx-auto text-table"
                        id="inputCronometer"
                    >
                        {{ cronometer }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <DialogGlobal
        :dialog="openModal"
        @close-dialog="openModal = false"
        width-dialog="300"
    >
        <template #content>
            <div class="d-flex justify-center">
                <VIcon size="73" :icon="ClockIcon" color="primary" />
            </div>
            <div
                class="text-center text-table font-weight-bold"
                style="font-size: 30px"
            >
                Agregar tiempo estimado
            </div>
            <div class="d-flex justify-center" >
                <div class="inputCronometer border-degree d-flex justify-center">
                    <input
                        class="mx-auto"
                        type="time"
                        name="limitetiempo"
                        list="listalimitestiempo"
                        style="outline: none;"
                        v-model="cron"
                        :min="now"
                    />
    
                    <datalist id="listalimitestiempo">
                        <option 
                            v-for="(time, i) in getTimes" 
                            :key="i"
                            :value="time"
                            :style="getOptionStyle()"
                        ></option>
                    </datalist>
                </div>
            </div>
            <div class="mt-3 text-center">
                <VBtnPrimary class="" :disabled="!cronIsCorrect">
                    Guardar
                </VBtnPrimary>
            </div>
        </template>
    </DialogGlobal>
</template>

<script setup lang="ts">
import CronometerIcon from "@/assets/icons/CronometerIcon.vue";
import { ref } from "vue";
import DialogGlobal from "@/components/global/DialogGlobal.vue";
import ClockIcon from "@/assets/icons/ClockIcon.vue";
import InputComponent from "@/components/InputComponent.vue";
import { computed } from "vue";
import dayjs from "dayjs";

const cronometer = ref("23h:05m:03s");
const cron = ref("");
const openModal = ref(false);
const times = [15,30,60,90,120] // in minutes

const getTimes = computed(()=> {
    
    return times.map((time) => dayjs().add(time,'minutes').format('HH:mm'))
})
const now = ref(dayjs().format('HH:mm'))
const getOptionStyle = () => {
      return {
        background: '#f0f0f0', // Cambia este color según tu preferencia
        color: '#333', // Cambia este color según tu preferencia
        transition: 'background-color 0.3s ease', // Transición suave de color
        cursor: 'pointer', // Cambia el cursor al pasar por encima
      };
    };

    const cronIsCorrect = computed(() => {
        if(!cron.value) return false
        const cronArray = cron.value.split(':').map(c=>parseInt(c))
        const now = dayjs();
        const nowMoreCron = dayjs()
                                .set('hour',cronArray[0])
                                .set('minute',cronArray[1])
        return nowMoreCron >= now
    })
</script>

<style scoped lang="scss">
.border-degree {
    > div {
        gap: 15px;
    }
}
.inputCronometer{
    font-size: 15px;
    width: 170px;
    height: 30px;
    flex-shrink: 0;
}

option:hover{
    background-color: red;
}
</style>

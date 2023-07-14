<template>
    <span class="text-primary font-weight-bold text-h6">
        {{ countDown }}
    </span>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { computed } from "vue";
import duration from "dayjs/plugin/duration"; // Importa el complemento de duración de Day.js
import relativeTime from "dayjs/plugin/relativeTime"; // Importa el complemento de tiempo relativo de Day.js
import { ref } from "vue";
import { onMounted } from "vue";
dayjs.extend(duration)
dayjs.extend(relativeTime)

const props = defineProps<{
    dateFinish: string;
}>();

const emits = defineEmits<{
    (e: 'endTime'):void
}>()

const now = ref(dayjs());
const countDown = computed((): string => {
    const countdownDuration = dayjs.duration(dayjs(props.dateFinish).diff(now.value));
    //@ts-ignore
    const minutes = countdownDuration.minutes().toString().padStart(2, '0')
    //@ts-ignore
    const seconds = countdownDuration.seconds().toString().padStart(2, '0')
    return `${minutes}:${seconds}`;
});

const endTime = computed(():boolean => {
    const [minutes,seconds] = countDown.value.split(':')
    if(parseInt(minutes) <= 0 && parseInt(seconds) <= 0){
        return true
    }
    return false
})

onMounted(() => {
    const interval = setInterval(() => {
        now.value = dayjs()
        if(endTime.value){
            clearInterval(interval)
            emits('endTime')
        }
    },1000)
})
</script>

<style scoped></style>

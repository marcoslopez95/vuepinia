<template>
    <div class="d-flex gap-2 justify-center">
        <VChip
            v-if="userIsPenaltyFor(PENALTY_TYPES.COMPRA)"
            class="cursor-pointer"
            @click="openModal(PENALTY_TYPES.COMPRA)"
            color="warning"
            >Compra</VChip
        >
        <VChip
            v-if="userIsPenaltyFor(PENALTY_TYPES.VENTA)"
            class="cursor-pointer"
            @click="openModal(PENALTY_TYPES.VENTA)"
            color="warning"
            >Venta</VChip
        >
    </div>
    <DialogConfirm
        title="Quitar Penalizacion"
        :dialog="dialog"
        @close-dialog="dialog = false"
        @ok="confirmDelete"
    >
        <template #content>
            <div class="text-table text-center">
                ¿Realmente desea quitar la penalización de
                <b>{{ PENALTY_NAMES[typePenalty!-1] }}</b>
                del usuario
                <b>{{ user.attributes.username }}</b>
                ?
            </div>
            <div  class="text-table mt-5 text-center">
                <b>Fecha:</b> <br> {{ dayjs(penalty!.attributes.initial_time).format('YYYY-MM-DD | HH:mm:ss')  }}<br>
                <b>Fecha de culminación:</b><br> {{ dayjs(penalty!.attributes.end_time).format('YYYY-MM-DD | HH:mm:ss')  }}
            </div>
        </template>
    </DialogConfirm>
</template>

<script setup lang="ts">
import DialogConfirm from "@/components/global/DialogConfirm.vue";
import { PENALTY_NAMES, PENALTY_TYPES } from "@/enums/PenaltyTypes.enum";
import { helperStore } from "@/helper";
import type { Penalty } from "@/interfaces/Penalty/Penalty.model";
import type { User } from "@/interfaces/User/User.model";
import dayjs from "dayjs";
import { ref, computed } from "vue";

const emits = defineEmits<{
    (e:'deletePenalty'):void
}>()
const props = defineProps<{
    user: User;
}>();
const helper = helperStore()

const dialog = ref(false);
const typePenalty = ref<PENALTY_TYPES>();
const penalty = ref<Penalty>()

const openModal = (type: PENALTY_TYPES) => {
    typePenalty.value = type;
    penalty.value = props.user.relationships?.penaltyNow.find(penalty => penalty.attributes.type_penaltie_id == type)!
    dialog.value = true;
};

const confirmDelete = async () => {
    const url = 'penalties/'+ penalty.value!.id
    const res = await helper.http(url,'delete')
    emits('deletePenalty')
    dialog.value = false
}

const userIsPenaltyFor = (type: PENALTY_TYPES):boolean => !!props.user.relationships?.penaltyNow.find(penalty => penalty.attributes.type_penaltie_id == type)
</script>

<style scoped></style>

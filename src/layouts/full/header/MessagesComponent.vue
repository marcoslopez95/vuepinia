<template>
    <div>
        <VMenu>
            <template #activator="{ props }">
                <!-- <v-btn icon class="mx-0 px-0"  v-bind="props" elevation="0" color="transparent"> -->
                <!-- <v-avatar size="35"> -->
                <MessageIcon
                    class="cursor-pointer"
                    v-bind="props"
                    :class="colorIcons"
                    :active="false"
                />
                <!-- </v-avatar> -->
                <!-- </v-btn> -->
            </template>
            <v-card v-if="false" max-width="280" elevation="50" class="rounded-xl">
                <v-list>
                    <v-list-item class="text-primary text-center">
                        <template #title>
                            <span class="font-weight-semibold">
                                Notificaciones
                            </span>
                        </template>
                    </v-list-item>

                    <v-divider></v-divider>
                    <span v-for="(item, index) in notifications" :key="index" >
                        <v-list-item  :value="index" class="text-table">
                            <template #title>
                                <div class="d-flex gap-2">
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                        >
                                            <ellipse
                                                cx="6.58398"
                                                cy="6.5"
                                                rx="5"
                                                ry="4.5"
                                                fill="#5043E9"
                                            />
                                            <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="5.5"
                                                stroke="#F7F8FA"
                                                stroke-width="2"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    </div>
                                    <div class="text-wrap">
                                        <span class="font-weight-semibold">
                                            {{
                                                onlyTwoWords(item.notification)
                                            }}
                                        </span>
                                        {{
                                            allContentMinunTwoFirstWords(
                                                item.notification
                                            )
                                        }}
                                    </div>
                                </div>
                            </template>
                            <template #subtitle>
                                <div class="text-right font-weight-light">
                                    <span>{{
                                        dayjs(item.created_at).format(
                                            "YYYY-MM-DD HH:mm:s"
                                        )
                                    }}</span>
                                </div>
                            </template>
                        </v-list-item>
                        <v-divider></v-divider>
                    </span>
                    <v-list-item
                        @click="goViewNotification"
                        class="text-primary text-center"
                    >
                        <template #title>
                            <span
                                class="text-decoration-underline cursor-pointer"
                            >
                                Ver todo
                            </span>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card>
        </VMenu>
    </div>
</template>

<script setup lang="ts">
import MessageIcon from "@/assets/icons/header/MessageIcon.vue";
import { ref, computed,onMounted, onUnmounted} from "vue";
import NotificationIcon from "@/assets/icons/header/NotificationIcon.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { useRouter } from "vue-router";
import type { User } from "@/interfaces/User/User.model";
import { helperStore } from "@/helper";
import dayjs from "dayjs";

const router = useRouter();
const { smAndDown: isMobile } = useDisplay();
const existNotifications = ref(true);
const colorIcons = computed(() => {
    return isMobile.value ? "text-white" : "text-disabled mt-2";
});


const helper = helperStore();
const url = "notifications/active/user";

const notifications = ref<Notifications[]>([]);
const index = async () => {
    const res = await helper.http(url, "get", {
        params: { pag: 5 },
    },'',true);
    notifications.value = res.data.response.data;
};
index();

const interval = ref()
onMounted(() => {
    interval.value = setInterval(()=> index(),10000)
})

onUnmounted(() => {
    clearInterval(interval.value)
})


const goViewNotification = () => router.push({ name: "Notifications" });

const quantityWordsTitle = 2;
const allContentMinunTwoFirstWords = (value: string): string => {
    const valueArray = value.split(" ");
    const newValue = valueArray.splice(quantityWordsTitle, valueArray.length);
    return newValue.join(" ");
};

const onlyTwoWords = (value: string): string => {
    const valueArray = value.split(" ");
    const newValue = valueArray.splice(0, quantityWordsTitle);
    return newValue.join(" ");
};

const readNotification = async (id:string|number) => {
    const url = `notifications/user/read/active/${id}`
    try{
        const res = await helper.http(url,'post')
        index()
    }catch(e){}
}
interface Notifications {
    id: number;
    user_id: number;
    notification: string;
    read: number;
    deleted_at?: any;
    created_at: string;
    updated_at: string;
    user: User;
}
</script>

<style scoped></style>

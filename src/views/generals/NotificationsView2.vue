<template>
    <VRow>

    <VCol class="mx-auto" cols="12" style="max-width: 360px;">
        <div class="d-flex justify-space-between my-3 ">
            <div></div>
            <div class="text-primary font-weight-semibold">Notificaciones</div>
            <div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="19"
                    height="20"
                    viewBox="0 0 19 20"
                    fill="none"
                >
                    <path
                        d="M11.3346 16.25H12.3496C12.4842 16.25 12.6133 16.2006 12.7085 16.1127C12.8037 16.0248 12.8571 15.9056 12.8571 15.7812V7.34375C12.8571 7.21943 12.8037 7.1002 12.7085 7.01229C12.6133 6.92439 12.4842 6.875 12.3496 6.875H11.3346C11.2 6.875 11.0709 6.92439 10.9757 7.01229C10.8805 7.1002 10.8271 7.21943 10.8271 7.34375V15.7812C10.8271 15.9056 10.8805 16.0248 10.9757 16.1127C11.0709 16.2006 11.2 16.25 11.3346 16.25ZM18.2707 3.125H14.7853L13.3473 0.910156C13.1669 0.632428 12.9116 0.402614 12.6064 0.243108C12.3011 0.0836025 11.9564 -0.000154039 11.6057 2.12674e-07H7.34168C6.99113 -1.90925e-05 6.64655 0.0838016 6.34149 0.243301C6.03643 0.4028 5.78128 0.632542 5.60089 0.910156L4.16208 3.125H0.676692C0.497222 3.125 0.325103 3.19085 0.198198 3.30806C0.0712941 3.42527 0 3.58424 0 3.75L0 4.375C0 4.54076 0.0712941 4.69973 0.198198 4.81694C0.325103 4.93415 0.497222 5 0.676692 5H1.35338V18.125C1.35338 18.6223 1.56727 19.0992 1.94798 19.4508C2.32869 19.8025 2.84505 20 3.38346 20H15.5639C16.1023 20 16.6187 19.8025 16.9994 19.4508C17.3801 19.0992 17.594 18.6223 17.594 18.125V5H18.2707C18.4501 5 18.6223 4.93415 18.7492 4.81694C18.8761 4.69973 18.9474 4.54076 18.9474 4.375V3.75C18.9474 3.58424 18.8761 3.42527 18.7492 3.30806C18.6223 3.19085 18.4501 3.125 18.2707 3.125ZM7.26767 1.98867C7.29029 1.9539 7.32228 1.92515 7.36054 1.90523C7.39879 1.8853 7.44199 1.87489 7.4859 1.875H11.4615C11.5053 1.87495 11.5484 1.8854 11.5866 1.90532C11.6248 1.92524 11.6567 1.95396 11.6793 1.98867L12.4177 3.125H6.52965L7.26767 1.98867ZM15.5639 18.125H3.38346V5H15.5639V18.125ZM6.59774 16.25H7.61278C7.74738 16.25 7.87647 16.2006 7.97165 16.1127C8.06683 16.0248 8.1203 15.9056 8.1203 15.7812V7.34375C8.1203 7.21943 8.06683 7.1002 7.97165 7.01229C7.87647 6.92439 7.74738 6.875 7.61278 6.875H6.59774C6.46314 6.875 6.33405 6.92439 6.23887 7.01229C6.1437 7.1002 6.09023 7.21943 6.09023 7.34375V15.7812C6.09023 15.9056 6.1437 16.0248 6.23887 16.1127C6.33405 16.2006 6.46314 16.25 6.59774 16.25Z"
                        fill="#5C6776"
                    />
                </svg>
            </div>
        </div>
        <div>
            <v-list>
                <v-divider></v-divider>
                <span v-for="(item, index) in notifications" :key="index">
                    <v-list-item value="1" class="text-table my-1">
                        <template #title>
                            <div class="d-flex gap-2">
                                <div>
                                    <svg
                                        v-if="!item.read"
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
                                        {{ onlyTwoWords(item.notification) }}
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
                                <span>{{ dayjs(item.created_at).format('YYYY-MM-DD HH:mm:s') }}</span>
                            </div>
                        </template>
                    </v-list-item>
                    <v-divider></v-divider>
                </span>
            </v-list>
        </div>
    </VCol>
</VRow>

</template>

<script setup lang="ts">
import { helperStore } from "@/helper";
import type { User } from "@/interfaces/User/User.model";
import dayjs from "dayjs";
import { ref, onMounted, onUnmounted} from "vue";

const helper = helperStore();
const url = "notifications/active/user";

const notifications = ref<Notifications[]>([]);
const index = async () => {
    const res = await helper.http(url, 'get',{},'',true);
    notifications.value = res.data.response;
};
index();
const interval = ref()
onMounted(() => {
    interval.value = setInterval(()=> index(),3000)
})

onUnmounted(() => {
    clearInterval(interval.value)
})
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

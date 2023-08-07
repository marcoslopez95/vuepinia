<template>
    <div class="px-3 text-white mb-4 mt-10 margin-full" 
    :class="!isMobile ? 'fond_monedas' : '' "
    >
        <VRow class="px-6">
            <VCol :cols="isMobile ? 12 :6" 
                class="text-center d-flex px-5 aos-init aos-animate" 
                style="flex-direction: column;"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1000"
                >
                <div>
                    <VIcon :size="isMobile? 300 :500" :icon="img1" />
                </div>
                <div class="text-justify" :class="{
                    'text-table': isMobile
                }">
                    <p class="text-h4 font-weight-bold text-center"
                    :class="{
                        'text-primary': isMobile
                    }">
                        Nuestro objetivo: La Rapidez  
                    </p>
                    <p class="my-4">La palabra CELER proviene del latin y significa rápido, y las transaciones en criptomonedas deben ser rapidas y eficientes.</p>
                    <p class="my-4">xeler nace en Colombia en 2019 como plataforma automatizada, en base a la experiencia adquirida desde el 2014 en el mercado persona  a persona.</p>
                    <p class="my-4">Entendemos que el dinero en efectivo cumple una función primordial en la economía colombiana por lo tanto esta 100% integrado a nuestras operaciones.</p>
                </div>
            </VCol>
            <VCol 
                :cols="isMobile ? 12 :6" 
                class="text-center d-flex px-5 aos-init aos-animate" 
                style="flex-direction: column;"
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1000"
                :class="isMobile ? 'fond_monedas ' : '' "
            >
                <div>
                    <VIcon :size="isMobile? 300 :500" :icon="img2" />
                </div>
                <div class="text-justify">

                    <p class="text-h4 font-weight-bold text-center">Las mejores Criptomonedas </p>
                    <p class="my-4">Estamos en constante actualización incluyendo en nuestro sistema las criptomonedas de mayor capitalización, las cuales puedes intercambiar por pesos y viceversa, listamos las monedas que consideramos tienen un volumen importante de operaciones y por supuesto los proyectos solidos.</p>
                </div>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import img1 from './FourElement/img1.vue'
import img2 from './FourElement/img2.vue'
import { ref } from 'vue'
import { useDisplay } from 'vuetify/lib/framework.mjs'
import { onMounted } from "vue";
//@ts-ignore
import AOS from "aos";

onMounted(() => {
    AOS.init();
})
const isMobile = ref(useDisplay().smAndDown)

</script>

<style scoped>
.fond_monedas{
    background: linear-gradient(90deg, #5043E8 22.21%, #17B4E6 71.31%);
    background-size: 200% 100%; /*Asignamos un ancho para el background del 300% y altura 100%*/
    animation: gradient 6s ease infinite;
}

.margin-full {
    margin-left: -40px;
    margin-right: -40px;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
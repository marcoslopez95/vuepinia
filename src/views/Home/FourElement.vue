<template>
    <div class="fond_monedas px-3 text-white" >
        <VRow>
            <VCol cols="6" class="text-center d-flex" style="flex-direction: column;">
                <div>
                    <VIcon size="500" :icon="img1" />
                </div>
                <div>
                    <p class="text-h4 font-weight-bold">
                        Nuestro objetivo: La Rapidez  
                    </p>
                    <p>La palabra CELER proviene del latin y significa rápido, y las transaciones en criptomonedas deben ser rapidas y eficientes.</p>
                    <p>xeler nace en Colombia en 2019 como plataforma automatizada, en base a la experiencia adquirida desde el 2014 en el mercado persona  a persona.</p>
                    <p>Entendemos que el dinero en efectivo cumple una función primordial en la economía colombiana por lo tanto esta 100% integrado a nuestras operaciones.</p>
                </div>
            </VCol>
            <VCol cols="6" class="text-center d-flex" style="flex-direction: column;">
                <div>
                    <VIcon size="500" :icon="img2" />
                </div>
                <div>

                    <p class="text-h4 font-weight-bold">Las mejores Criptomonedas </p>
                    <p>Estamos en constante actualización incluyendo en nuestro sistema las criptomonedas de mayor capitalización, las cuales puedes intercambiar por pesos y viceversa, listamos las monedas que consideramos tienen un volumen importante de operaciones y por supuesto los proyectos solidos.</p>
                </div>
            </VCol>
        </VRow>
    </div>
</template>

<script setup lang="ts">
import img1 from './FourElement/img1.vue'
import img2 from './FourElement/img2.vue'
</script>

<style scoped>
.fond_monedas{
    margin-left: -40px;
    margin-right: -40px;
    background: linear-gradient(90deg, #5043E8 22.21%, #17B4E6 71.31%);
    background-size: 200% 100%; /*Asignamos un ancho para el background del 300% y altura 100%*/
  }
</style>
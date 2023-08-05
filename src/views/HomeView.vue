<template>
   
    <v-app>
        <NavBar />

        <v-main :class="isMobile ? 'px-2' : 'px-10'">
            <vue-particles
            id="tsparticles"
                :particlesInit="particlesInit"
                :particlesLoaded="particlesLoaded"
                :options="optionsParticles"
    />
            <div style="max-width: 1200px;" class="mx-auto">
                <FirstElement />
                <!-- Contenido principal de tu aplicación -->
                <SecondElement />
                <VSpacer class="my-3"> </VSpacer>
                <ThreeElement />
            </div>

            <VSpacer class="my-3"> </VSpacer>
            <FourElement />
            <FiveElement />

            <VRow class="text-table">
                <VCol class="text-center">
                    <span class="text-h5">
                        Dudas? Preguntas? visita nuestro
                        <span class="text-primary">help desk</span>
                    </span>
                </VCol>
            </VRow>
        </v-main>
        <FooterComponent />
    </v-app>
</template>

<script setup lang="ts">
import NavBar from "./Home/NavBar.vue";
import FirstElement from "./Home/FirstElement.vue";
import SecondElement from "./Home/SecondElement.vue";
import ThreeElement from "./Home/ThreeElement.vue";
import FourElement from "./Home/FourElement.vue";
import FiveElement from "./Home/FiveElement.vue";
import FooterComponent from "@/layouts/full/FooterComponent.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";
import { ref } from "vue";
//@ts-ignore
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

const isMobile = ref(useDisplay().smAndDown);

const particlesInit = async (engine:any) => {
    //await loadFull(engine);
    await loadSlim(engine);
};

const particlesLoaded = async (container:any) => {
    console.log("Particles container loaded", container);
};

const optionsParticles = {
		"particles": {
			"number": {
				"value": 100,
				"density": {
					"enable": true,
					"value_area": 800
				}
			},
			"color": {
				"value": "#00c0fa"
			},
			"shape": {
				"type": "images",
				"opacity": 0.20,
				"stroke": {
					"width": 0,
					"color": "#2b56f5"
				},
				"polygon": {
					"nb_sides": 5
				},
				"image": {
					"src": "images/xeler_ico1.svg",
					"width": 100,
					"height": 100
				}
			},
			"opacity": {
				"value": 0.30,
				"random": false,
				"anim": {
					"enable": false,
					"speed": 1,
					"opacity_min": 0.12,
					"sync": false
				}
			},
			"size": {
				"value": 6,
				"random": true,
				"anim": {
					"enable": false,
					"speed": 40,
					"size_min": 0.08,
					"sync": false
				}
			},
			"line_linked": {
				"enable": true,
				"distance": 150,
				"color": "#2b56f5",
				"opacity": 0.30,
				"width": 1.3
			},
			"move": {
				"enable": true,
				"speed": 3,
				"direction": "none",
				"random": false,
				"straight": false,
				"out_mode": "out",
				"bounce": false,
				"attract": {
					"enable": false,
					"rotateX": 600,
					"rotateY": 1200
				}
			}
		},
		"interactivity": {
			"detect_on": "canvas",
			"events": {
				"onhover": {
					"enable": true,
					"mode": "repulse"
				},
				"onclick": {
					"enable": true,
					"mode": "push"
				},
				"resize": true
			},
			"modes": {
				"grab": {
				"distance": 400,
					"line_linked": {
						"opacity": 1
					}
				},
				"bubble": {
					"distance": 400,
					"size": 40,
					"duration": 2,
					"opacity": 8,
					"speed": 3
				},
				"repulse": {
					"distance": 200,
					"duration": 0.4
				},
				"push": {
					"particles_nb": 4
				},
				"remove": {
					"particles_nb": 2
				}
			}
		},
			"retina_detect": true
		}
</script>

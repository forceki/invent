<template >

    <template v-if="route.name != 'login'">
    <Toasts/>
    <div class="flex overflow-hidden max-h-[100vh]">
        <div class="w-[calc(100vw)]">
            <div>
                <div :class="layout.$state.dark ? 'dark ' : ' '"  @keyup.ctrl.b="collapseSide" class=" home">
                    <Mestionora v-if="layout.$state.mestionora"/>
                    <div @click="sTop" class="toTop">
                    </div>
                    <!-- <TopBar/> -->
                    <div  :class="layout.$state.collapse ? 'collapsed'  : ''" class="bg-gradient-to-tl from-indigo-100 via-slate-300 to-emerald-100 justify-between layoutBody">
                        
                        <Aside class="sidebarD"/>
                        
                        <div :class="layout.$state.loading ? 'cursor-progress' : ''"  class="ewilgiebe" style="width: 100%;">
                            <div class="geduldh">
                                
                                <MobileBreadCrumbs class="mbreadD"/>
                                <div class="w-full bg-gradient-to-r from-cyan-800 via-emerald-800 to-emerald-900 h-[20px]">

                                </div>
                                <div id="emwarmen" class="viewPort relative" style="width: 100%; flex: 1; display: flex; flex-direction: column;">
                                    <BreadCrumbs class="breadD sticky top-0 z-[100]"/>
                                    <div 
                                        v-if="layout.$state.absoluteLoading == true"
                                        class="
                                            col
                                            gap-5
                                            justify-center
                                            items-center
                                            bg-white/30
                                            backdrop-blur
                                            absolute
                                            z-50
                                            w-full
                                            h-full
                                        "
                                    >
                                        <SyncLoader :size="'10px'" :loading="true" :color="'#294289'"/>
                                        <p>
                                            {{ layout.$state.loadingStatement != '' ? layout.$state.loadingStatement : 'Loading ...' }}
                                        </p>
                                    </div>
                                    <div style="flex: 1"  :class="layout.$state.padding ? 'viewMargin ': ''" class="p-2">
                                        <router-view v-slot="{ Component }">
                                            <suspense timeout="0">
                                            <template #default>
                                                <component :is="Component" :key="$route.path"></component>
                                            </template>
                                            <template #fallback>
                                                <div class="flex justify-center items-center w-full h-full">
                                                    <SyncLoader :size="'10px'" :loading="true" :color="'#294289'"/>
                                                </div>
                                            </template>
                                            </suspense>
                                        </router-view>
                                    </div>
                                    <Footer class="footerD"/>
                                </div>
                                <BottomBar class="bottomBarD"/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </template>
    <SignIn v-else/>
    
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, nextTick, watch } from 'vue'
import Aside from './aside/Aside.vue'
import TopBar from './topbar/TopBar.vue'
import BreadCrumbs from './breadcrumbs/BreadCrumbs.vue'
import MobileBreadCrumbs from './breadcrumbs/MobileBreadCrumbs.vue'
import Footer from './footer/Footer.vue'
import Mestionora from './mestionora/Mestionora.vue'
import BottomBar from './bottombar/BottomBar.vue'
import Toasts from '../components/Toaster/Toasts.vue'
import {useLayoutStore} from '../stores/layout'
import SyncLoader from '../components/Loader/SyncLoader.vue'
import { useRoute, } from 'vue-router'
import 'moment/dist/locale/id'
import moment from 'moment'
import SignIn from './auth/SignIn.vue'
import Cookies from 'js-cookie'
import router from '@/router';
import axios from 'axios'

moment.locale('id')

let keys = [];
const layout = useLayoutStore()
const sTop = () => {
    emwarmen.scrollTo({top: 0, behavior: 'smooth'});
}
const route = useRoute();

const chceking = async() => {


    try {
        
        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"auth/me")

    } catch (error) {
        Cookies.remove('access_token');
        setTimeout(() => {
            router.push("login")
        }, 200);
    }
    

}

const check = Cookies.get("access_token")
if(check){
    console.log(check)
    chceking()
}



onMounted(
    () => {
        
        let emwarmen = document.getElementById("emwarmen");

        document.addEventListener("keydown", function (e) {
            keys = (keys || []);
            keys[e.keyCode]=true;

            if (keys[18] && keys[66]){
                collapseSide()
            }
            
            if (keys[18] && keys[84]){
                sTop()
            }
            
            if (keys[27]){
                layout.$state.mestionora = false;
            }
            if (keys[18] && keys[80]){
                layout.$state.mestionora = true;
            }
        } , false);


        // document.addEventListener("keyup", function (e) {
        //     keys[e.keyCode]=false;
        //     // stop();
        // }, false);

            
        }
);
onBeforeUnmount(
    () => {
        document.removeEventListener('keyup')
        document.removeEventListener('keydown')
    }
) 

const collapseSide = () => {
    console.log("It weoker")
    layout.$state.collapse = !layout.$state.collapse
}

</script>


<style>
    .toTop{
        overflow: hidden;
        border-radius: 5px;
        cursor: pointer;
        right: 20px;
        bottom: 60px;
        z-index: 3;
        position: fixed;
        width: 35px;
        height: 35px;
        background-color: rgba(98, 163, 232, 0.265);
    }
    .toTop:hover{
        background-color: rgba(93, 167, 246, 0.586);
    }
    .viewMargin{
        flex: 1;
        box-sizing: border-box;
        margin: 10px;
    }
</style>

<style scoped>

</style>

<style scoped>
    .geduldh{
        display: flex;
        flex-direction: column;
        min-height: 100%;
        max-height: 100%;
    }
    .ewilgiebe{
        transition: 500ms ease;
        display: flex;
        flex-direction: column;
        min-height: 100%;
        max-height: 100%;
    }
    @media (max-width: 600px) {
        .footerD,
        .breadD,
        .sidebarD{
            display: none;
        }
        .ewilgiebe, .geduldh{
            max-width: calc(100%);
        }
    }
    @media (min-width: 600px) {
        .mbreadD,
        .bottomBarD{
            display: none;
        }
        .ewilgiebe{
            max-width: calc(100% - 60px);
        }
    }
</style>

<style scoped>
    .viewPort{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        overflow-y: scroll;
        max-height: calc(100vh - 20px);
    }
    .hide{
        display: none;
    }
    .layoutBody{
        display: flex;
        width: 100%;
        flex: 1;
        max-height: 100%;
    }
    .home{
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100%;
    }
</style>
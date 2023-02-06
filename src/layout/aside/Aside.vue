<template>
 
    <div v-if="detailUser && layout.$state.collapse" class="pop userDetail w-[calc(100%-20px)] right-[10px] left-[70px] h-[220px] bg-slate-50 left-[80px] absolute bottom-[10px] z-[500] w-[200px] rounded shadow border overflow-hidden">
        <div>
            <img class="w-full h-[50px] rounded-t object-cover filter brightness-95 blur-sm" :src="USER.PFP">
            <img class="min-w-[70px] min-h-[70px] absolute top-2 left-2 shadow-sm z-10 max-w-[50px] max-h-[50px] border rounded object-cover" :src="USER.PFP" />
            <div class="flex-col absolute right-3 top-3 gap-0">
                <p class="font-semibold p-0 m-0 text-slate-700">
                    {{USER.USER_DATA.fullname}}
                </p>
                <p class="text-xs text-slate-600 m-0 p-0">
                    {{USER.USER_DATA.nip}}
                </p>
            </div>
        </div>
        <div class="p-2 flex-col flex rounded w-[100%] h-[65%]  justify-start absolute bottom-0">
            <hr class="m-2"/>
            <div class="w-full text-sm font-semibold text-slate-500 cursor-pointer hover:bg-blue-100 p-2 flex items-center cursor rounded gap-2">
                Detail
            </div>
            <div class="w-full text-sm font-semibold text-slate-500 cursor-pointer hover:bg-blue-100 p-2 flex items-center cursor rounded gap-2">
                Pengaturan
            </div>
            <div @click="
                async () => {
                    detailUser = false
                    await USER.LOGOUT()
                    router.push('/login')
                }" class="w-full text-sm font-semibold text-slate-500 cursor-pointer hover:bg-blue-100 p-2 flex items-center cursor rounded gap-2">
                Log Out
            </div>
        </div>

    </div>
    <div 
    @mouseenter="layout.$state.asideHover = true" @mouseleave="layout.$state.asideHover = false" 
    class="flex"
    :class="(layout.$state.collapse == true ? 'collapsed ' : ' ') + (layout.$state.dark ? 'dark ' : '') ">
        <div 
        
        @mouseleave="() => {
        
                subStatus.activeMain = {}
                layout.$state.collapse= true
        }" 
         :class="layout.$state.collapse == false ? 'w-[310px]' : 'w-[60px]'" class="flex absolute h-[100vh] overflow-hidden transition-all ease duration-500 shadow-md z-[999] bg-gradient-to-b from-cyan-800 via-sky-800  items-end to-blue-900">
            <div class="flex h-full items-center py-5 min-w-[60px] flex-col">
                <button @click="router.back()" class="rotate-180 group flex flex-col justify-center items-center ease-out border-white/50 border border bg-white/0 hover:bg-white/10 transition-all rounded-[100%] w-[40px] h-[40px] active:border-white/50 text-slate-200 hover:text-blue-100 active:bg-white/30">
                    <ArrowRightIcon class="group-active:scale-90 group-active:transition-none group-hover:scale-110 p-0 m-0 transition-all duration-300 ease-out w-[20px] h-auto"/>
                </button>
                <div class="border-t w-[80%] border-white/30 mb-1 mt-3"/>
                <div class="flex flex-col flex-1 overflow-y-auto gap-2">
                    <button 
                        @mouseenter="() => {
                        
                            if(item.sub) {
                                subStatus.activeMain = item
                                layout.$state.collapse= false
                                return
                            }
                        }" 
                        @click="() => {
                            if(item.sub) {
                                subStatus.activeMain = item
                                layout.$state.collapse= false
                                return
                            }
                            subStatus.activeMain = {}
                            layout.$state.collapse= true
                            router.push(item.route)
                            }" v-for="(item, i) in asideConfig" 
                        :key="i" 
                        :class="subStatus.activeMain.sectionTitle == item.sectionTitle ? 'bg-slate-100 shadow rounded' : 'bg-white/0 hover:bg-white/10 rounded-[100%]'"
                        class="group flex flex-col justify-center items-center ease-out border-white/0 border hover:rounded   transition-all  min-w-[50px] min-h-[50px] active:border-white/50 text-slate-300 hover:text-blue-100" :title="item.sectionTitle">
                        <component v-if="subStatus.activeMain.sectionTitle != item.sectionTitle" :is="item.svgIcon" class="group-active:scale-90 group-active:transition-none group-hover:scale-110 p-0 m-0 transition-all duration-300 ease-out w-[25px] h-auto"/>
                        <img v-else style="min-height: 25px; min-width:25px;max-width:25px; max-height: 25px;" class="slide-down" :src="item.activeIcon" alt="My Happy SVG"/>
                    </button>
                </div>
                <div class="justify-self-end">
                               
                    <img v-if="Object.keys(USER.USER_DATA).length != 0 && layout.$state.collapse" @click="Object.keys(USER.USER_DATA).length == 0 ? detailUser = false : detailUser == false ? detailUser = true : detailUser = false"  class="min-w-[40px] cursor-pointer shadow min-h-[40px] max-w-[40px] max-h-[40px] border rounded pop object-cover" :src="USER.PFP" />
                </div>
            </div>
            <div style="background: linear-gradient(90deg,rgba(250,251,252,1) 94%,rgba(253,253,253,1) 100%)" class="flex flex-col justify-between border-slate-200 border-r h-[calc(100%-20px)] shadow-md overflow-x-hidden rounded-tl-lg flex-1">
                <div v-if="Object.keys(subStatus.activeMain).length >0 " class="flex-1 overflow-y-auto overflow-x-hidden">
                    <p class="font-semibold text-slate-700 p-5">
                        {{subStatus.activeMain.sectionTitle}}
                    </p>
                    <div class="flex gap-2 flex-col" >
                        <div v-for="(item, i) in subStatus.activeMain.sub" :key="i">
                            <button v-if="!item.sub" @click="() => {router.push(item.route);subStatus.activeMain = {};layout.$state.collapse = true}" class="w-full border-l-2 border-blue-100 active:border-blue-900 active:bg-blue-200 hover:border-blue-500 p-2 text-sm active:text-blue-900  text-left hover:bg-blue-100 font-semibold text-slate-500 whitespace-nowrap hover:text-slate-800 slide-down transition-all  ">
                                ・ {{item.heading}}
                            </button>
                            <div v-else >
                                <button @click="() => {subStatus.activeSub == item ? subStatus.activeSub = {} : subStatus.activeSub = item}" 
                                    :class="subStatus.activeSub == item ? ' border-blue-900 bg-blue-900 text-white ' : 'border-blue-100 active:border-blue-900 active:bg-blue-200 hover:border-blue-500 active:text-blue-900 hover:bg-blue-100 hover:text-slate-800 text-slate-500'" 
                                    class="w-full border-l-2  font-semibold p-2   whitespace-nowrap  slide-down transition-all  ">
                                    <div class="flex w-full text-sm  font-semibold text-left  whitespace-nowrap justify-between">
                                        ・ {{item.heading}}
                                        <ChevronRightIcon :class="subStatus.activeSub == item ? 'rotate-90 ' : ''" class="transition-all w-[20px] h-auto"/>
                                    </div>
                                </button> 
                                <div class="flex flex-col gap-2 mt-2" v-if="subStatus.activeSub == item">
                                            
                                    <button v-for="(sub, i) in subStatus.activeSub.sub" :key="i" @click="() => {router.push(sub.route);subStatus.activeMain = {};subStatus.activeSub = {};layout.$state.collapse = true}" class="w-full rounded active:bg-blue-200 hover:border-blue-500 p-2 text-sm border-box mx-2 active:text-blue-900  text-left hover:bg-blue-100 font-semibold text-slate-500 whitespace-nowrap hover:text-slate-800 slide-down transition-all  ">
                                        ・ {{sub.heading}}
                                    </button> 
                                </div>

                            </div>

                        </div>
                        
                    </div>
                </div>
                <div class="slide-down p-2" v-if="layout.$state.collapse == false ">            
                    <div v-if="detailUser" class="pop userDetail w-[calc(100%-20px)] right-[10px] left-[10px] h-[220px] bg-slate-50 left-[-0.5px] absolute top-[-230px] rounded shadow border overflow-hidden">
                        <div>
                            <img class="w-full h-[50px] rounded-t object-cover filter brightness-95 blur-sm" :src="USER.PFP">
                            <img class="min-w-[70px] min-h-[70px] absolute top-2 left-2 shadow-sm z-10 max-w-[50px] max-h-[50px] border rounded object-cover" :src="USER.PFP" />
                            <div class="flex-col absolute right-3 top-3 gap-0">
                                <p class="font-semibold p-0 m-0 text-slate-700">
                                    {{USER.USER_DATA.username}}
                                </p>
                                <p class="text-xs text-slate-600 m-0 p-0">
                                    {{USER.USER_DATA.email}}
                                </p>
                            </div>
                        </div>
                        <div class="p-2 flex-col flex rounded w-[100%] h-[65%]  justify-start absolute bottom-0">
                            <hr class="m-2"/>
                            <div class="w-full text-sm font-semibold text-slate-500 cursor-pointer hover:bg-blue-100 p-2 flex items-center cursor rounded gap-2" @click="
                                async () => {
                                    router.push('/Profile')
                                }">
                                Detail
                            </div>
                            <div class="w-full text-sm font-semibold text-slate-500 cursor-pointer hover:bg-blue-100 p-2 flex items-center cursor rounded gap-2">
                                Pengaturan
                            </div>
                            <div @click="
                                async () => {
                                    detailUser = false
                                    await USER.LOGOUT()
                                    router.push('/login')
                                }" class="w-full text-sm font-semibold text-slate-500 cursor-pointer hover:bg-blue-100 p-2 flex items-center cursor rounded gap-2">
                                Log Out
                            </div>
                        </div>

                    </div>
                    <div @click="Object.keys(USER.USER_DATA).length == 0 ? detailUser = false : detailUser == false ? detailUser = true : detailUser = false" class="w-full h-[70px] p-2 items-center flex gap-2 hover:bg-slate-100 active:bg-white cursor-pointer select-none rounded border">
                        <div v-if="Object.keys(USER.USER_DATA).length == 0" @click="router.push('/login')" class="w-full h-full flex justify-center items-center">
                            <p class="font-semibold p-0 m-0 text-slate-700">
                                Sign In
                            </p>
                        </div>
                        <img v-if="Object.keys(USER.USER_DATA).length != 0" class="min-w-[50px] min-h-[50px] max-w-[50px] max-h-[50px] border rounded object-cover" :src="USER.PFP" />
                        <div v-if="Object.keys(USER.USER_DATA).length != 0" class="h-full flex-col justify-between">
                            <div class="flex-col gap-0">
                                <p class="whitespace-nowrap font-semibold p-0 m-0 text-slate-700">
                                    {{USER.USER_DATA.username}}
                                </p>
                                <p class="text-xs text-blue-600 m-0 p-0">
                                    {{USER.USER_DATA.email}}
                                </p>
                            </div>
                        </div>
                    </div>
            </div>
            </div>
        </div>
    </div>
</template>
<script setup>
//Vue Import
import { reactive, ref } from '@vue/reactivity';

//Import Router & Config
import { RouterLink, RouterView, useRouter } from 'vue-router'
import asideConfig from "../../config/aside";
import {user} from '@/stores/user.ts';
//Component Import
import {useBreadcrumbStore} from '../../stores/breadcrumb'
import {useLayoutStore} from '../../stores/layout'
//Icon Import
import { ArrowRightIcon, ChevronRightIcon, EnvelopeIcon,AdjustmentsIcon } from '@heroicons/vue/24/outline'

//Image Import
import Logos from '../../assets/image/sbd-logos.png'

const router = useRouter()

const USER = user()
const layout = useLayoutStore()
const breadcrumbStore = useBreadcrumbStore()

const subStatus = reactive({
    activeMain: {},
    activeSub: {}
})


const detailUser = ref(false);

const collapseSide = () => {
    layout.$state.collapse = !layout.$state.collapse
}

const chgActiveSection = (e)=>{
    layout.$state.asideSection = (layout.$state.asideSection == e ? -1 : e )
    layout.$state.asideSub =  -1
}
const changeSub = (e, t, r, p)=>{
    layout.$state.padding = p
    breadcrumbStore.$state.section = r
    breadcrumbStore.$state.view = t
    layout.$state.asideSub = e
}
</script>

<style scoped>
.slide-down{
    animation: slideDown 500ms ease;
}
.slide-right{
    animation: slideRight 500ms ease;
}
.pop{
    animation: pop 500ms ease;
}

    @keyframes slideDown {
        0%   {
            top: -10px;
            opacity: 0%;}
        100%  {
            top: 0px;
            opacity: 100%;}
    }
    @keyframes pop {
        0%   {
            transform: scale(0.9);
            opacity: 0%;}
        100%  {
            transform: scale(1);
            opacity: 100%;}
    }
    @keyframes slideRight {
        0%   {
            right: -10px;
            opacity: 0%;}
        100%  {
            right: 0px;
            opacity: 100%;}
    }
</style>
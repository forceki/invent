<template>
    <div>
        <div v-if="activeSection > -1">
            <div class="trayTitle"  style="font-size: 1rem;font-weight: 700;">
                {{asideConfig[activeSection].sectionTitle}}
                <XMarkIcon @click="close()" style="min-height: 16px; min-width:16px;max-width:14px; max-height: 14px;"/>
            </div>
            <div class="systemTray">
                <router-link @click="changeSub(ind, subItem.heading, asideConfig[activeSection].sectionTitle, subItem.padding)"   v-for="(subItem, ind) in asideConfig[activeSection].sub" :key="ind" :to="subItem.route" class="subs"> 
                        ・
                        <component style="min-height: 14px; min-width:14px;max-width:14px; max-height: 14px;" :is="subItem.svgIcon"/>
                        {{subItem.heading}}
                </router-link>
            </div>
        </div>
        <div class="bottomBar">
            <div v-for="(item,i) in asideConfig" :key="i">
                <component  @click="chgActiveSection(i)" v-if="item.sub" style="min-height: 16px; min-width:16px;max-width:14px; max-height: 14px;" :is="item.svgIcon"/>
                <router-link v-else @click="() => {
                        changeSub(-1, '', item.sectionTitle, item.padding) 
                        chgActiveSection(-1)}"
                    :key="ind" :to="item.route" class="subs"> 
                        <component style="min-height: 16px; min-width:16px;max-width:14px; max-height: 14px;" :is="item.svgIcon"/>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import asideConfig from "../../config/aside";
import { ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from '@vue/reactivity';
import {useBreadcrumbStore} from '../../stores/breadcrumb'
import {useLayoutStore} from '../../stores/layout'

const breadcrumbStore = useBreadcrumbStore()
const layout = useLayoutStore()

const activeSection = ref(-1);
const subSection = ref(-1);
const collapse = ref(false)

const close = () => {
    activeSection.value = -1;
}

const collapseSide = () => {
    collapse.value = !collapse.value
}

const chgActiveSection = (e)=>{
    console.log(e)
    activeSection.value = (e == activeSection.value ? -1 : e)
    subSection.value = -1
}
const changeSub = (e, t, r, p)=>{
    layout.$state.padding = p
    breadcrumbStore.$state.section = r
    breadcrumbStore.$state.view = t
    activeSection.value = -1
    subSection.value = e
}
</script>



<style scoped>

    @keyframes fade {
        0%   {
            opacity: 0%;}
        100%  {
            opacity: 100%;}
    }
    
    @keyframes slideUp {
        0%   {
            top: 10px;
            opacity: 0%;}
        100%  {
            top: 0px;
            opacity: 100%;}
    }
    .subs{
        animation: fade 500ms ease;
        display: flex;
        width: 100%;
        gap: 10px;
        align-items: center;
        user-select: none;
        cursor: pointer;
        padding: 10px;
        color: #777986;
        font-weight: 500;
        border: 0.5px solid rgb(217, 217, 217);
        /* background-color: #d8dae45a; */
        border-radius: 5px;
    }
    .trayTitle{
        animation: slideUp 500ms ease;
        gap: 5px;
        color: #282A3A;
        -webkit-font-smoothing: antialiased;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        background: white;
        overflow: hidden;
        height: 50px;
        width: 100%;
        border-top: 1px solid rgb(217, 217, 217);
        border-bottom: 1px solid rgb(217, 217, 217);
    }
    .systemTray{
        animation: slideUp 500ms ease;
        gap: 15px;
        color: #282A3A;
        -webkit-font-smoothing: antialiased;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        background: white;
        overflow: auto;
        height: 150px;
        width: 100%;
    }
    .copy{
        color: #777986;
        font-weight: 700;
    }
    .bottomBar{
        gap: 5px;
        color: #282A3A;
        -webkit-font-smoothing: antialiased;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        justify-content: space-around;
        align-items: center;
        background: white;
        height: 50px;
        width: 100%;
        border-top: 1px solid rgb(217, 217, 217);
    }
</style>
<template>
    <div class="navigator">
        <div class=" rounded bodyNav byordBorder">
            <div class="inputNav rounded">
                <input v-model="query" autocomplete="off" id="mestionora" class=" rounded byordBorder" type="text">
            </div>
        </div>
        <div class="grundrisheit bg-white/30 backdrop-blur-md byordBorder">
            <div @click="clicked(i)" :class="i == selectedPath ? 'selected' : ''"  v-for="(path, i) in matches.searched" :key="i">
                <router-link :to="path.route" class="listPath">
                <p class="heading">{{path.heading}}</p>
                <p>{{path.route}}</p>
                </router-link>
            </div>

        </div>
    </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, watch, watchEffect } from "@vue/runtime-core";

import { RouterLink, RouterView, useRouter } from 'vue-router'
import asideConfig from "../../config/aside";
import { ChevronDownIcon, ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/outline'
import { reactive, ref } from '@vue/reactivity';
import {useBreadcrumbStore} from '../../stores/breadcrumb'
import {useLayoutStore} from '../../stores/layout'

const layout = useLayoutStore()
const breadcrumbStore = useBreadcrumbStore()
const paths = reactive([])
const selectedPath = ref(0)
const dregarnuhr = useRouter()
let matches = reactive({searched: []}) 
const query = ref('')

let keys = [];

const changePath = (e, t, r, p)=>{
    layout.$state.padding = p
    breadcrumbStore.$state.section = r
    breadcrumbStore.$state.view = t
}

watch(
    query,
    (oldWord, newWord) => {
        if (newWord != "") {
            var finder = new RegExp(newWord)
            matches.searched = paths.filter((e) => {
                return finder.test(e.heading) || finder.test(e.route) 
            })
            matches.searched.length <= 0 ? matches.searched = paths : ''
        } else{
            matches.searched = paths 
        }
        
    }
)

const clicked = (i) => {
    layout.padding = matches.searched[i].padding
    dregarnuhr.push(matches.searched[i].route)

    breadcrumbStore.$state.section = matches.searched[i].sectionTitle
    breadcrumbStore.$state.view = matches.searched[i].heading

    layout.$state.asideSection = matches.searched[i].section
    layout.$state.asideSub = matches.searched[i].sub

    layout.$state.mestionora = false;
}

onMounted(
    () => {

        asideConfig.forEach((en, id) => {
            en.sub.forEach((e, index) => {
                paths.push({...e, section: id, sectionTitle: en.sectionTitle, sub: index})
            })
        })

        nextTick(
            () => {
                const mestionora = document.getElementById('mestionora');
                mestionora.focus()
            }
        )
        mestionora.addEventListener("keydown", function (e) {
            keys = (keys || []);
            keys[e.keyCode]=true;
            if (keys[13]){
                e.preventDefault()
                console.log(matches.searched[selectedPath.value].route)
                layout.padding = matches.searched[selectedPath.value].padding
                dregarnuhr.push(matches.searched[selectedPath.value].route)
                
                breadcrumbStore.$state.section = matches.searched[selectedPath.value].sectionTitle
                breadcrumbStore.$state.view = matches.searched[selectedPath.value].heading
                
                layout.$state.asideSection = matches.searched[selectedPath.value].section
                layout.$state.asideSub = matches.searched[selectedPath.value].sub

                layout.$state.mestionora = false;
            }
            if (keys[38]){
                e.preventDefault()
                selectedPath.value == 0 ? '' : selectedPath.value = --selectedPath.value
            }
            
            if (keys[40]){
                e.preventDefault()
                selectedPath.value = selectedPath.value > paths.length -1 ? '' : ++selectedPath.value
            }
        } , false);

        mestionora.addEventListener("keyup", function (e) {
            keys[e.keyCode]=false;
            stop();
        }, false);

    }
);
</script>

<style scoped>
    .listPath{
        cursor: pointer;
        user-select: none;
        padding: 5px;
        display: flex;
        color: #777986 !important;
    }
    .listPath:hover{
        background-color: #E6EFFC;

    }
    .selected{
        background-color: #E6EFFC;
    }
    .grundrisheit{
        color: #777986;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.122);
        animation: slideDown 500ms ease;
        width: 500px;
        /* background-color: white; */
    }
    .grundrisheit
    .heading{
        font-weight: 700;
    }
    .inputNav
    input[type="text"]:focus{
        outline: none;
    }
    .inputNav
    input[type="text"]
    {
        width: 95%;
        color: #777986;
        padding: 5px;
        height: 100%;
        width: 100%;
    }
    .inputNav{
        height: 100%;
                width: 100%;
    }
    .navigator{
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 10;
    }
    .bodyNav{
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.122);
        margin-top: 50px;
        animation: slideDown 500ms ease;
        background-color: white;
        width: 500px;
        height: 50px;
    }

    @keyframes slideDown {
        0%   {
            top: -10px;
            opacity: 0%;}
        100%  {
            top: 0px;
            opacity: 100%;}
    }
</style>
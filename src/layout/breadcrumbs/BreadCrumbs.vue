<template>
    <div class="
    flex gap-5 justify-between breadCrumbs dark:bg-[#272727]/30 dark:border-[#1c1c1c] bg-[#f5f5f5]/90  backdrop-blur-md">
        <div class="flex items-center gap-2" >
            
            <p class=" text-slate-600 dark:text-slate-200" style="font-size: 14px;font-weight: 900;">
                {{route.name}} 
            </p>
            <p class="antialiased text-slate-600 dark:text-slate-200" style="font-size: 14px;">
                {{route.path}}
            </p>
        </div>
    </div>
</template>

<script setup>
import {useBreadcrumbStore} from '../../stores/breadcrumb'
import { MoonIcon, SunIcon, MagnifyingGlassIcon, ArrowLeftIcon } from '@heroicons/vue/24/outline'
import { useLayoutStore } from '../../stores/layout'
import MoonAndStar from '../../assets/customSvg/MoonAndStar.svg'
import Sun from '../../assets/customSvg/Sun.svg'
import { useRoute } from 'vue-router'

const layout = useLayoutStore()
const breadcrumbStore = useBreadcrumbStore()
const route = useRoute();
</script>

<style scoped>
    .breadCrumbs{
        color: #282A3A;
        -webkit-font-smoothing: antialiased;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        align-items: center;
        /* background: rgb(245,245,245);
        background: -moz-linear-gradient(90deg, rgba(245,245,245,0.3) 0%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.3) 100%);
        background: -webkit-linear-gradient(90deg, rgba(245,245,245,0.3) 0%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.3) 100%);
        background: linear-gradient(90deg, rgba(245,245,245,0.3) 0%, rgba(255,255,255,0.3) 6%, rgba(255,255,255,0.3) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ededed",endColorstr="#ffffff",GradientType=1); */
        height: 30px;
        width: 100%;
        border-bottom: 1px solid rgb(217, 217, 217);
    }
</style>
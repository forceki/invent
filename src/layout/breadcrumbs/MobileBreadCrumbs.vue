<template>
    <div class="breadCrumbs">
        <p style="font-size: 1rem;font-weight: 700;">
            {{breadcrumbStore.$state.section}} {{breadcrumbStore.$state.view != "" ? '・': '' }} 
        </p>
        <p style="font-size: 12px;">
            {{breadcrumbStore.$state.view}}
        </p>
    </div>
</template>

<script setup>
import {useBreadcrumbStore} from '../../stores/breadcrumb'

const breadcrumbStore = useBreadcrumbStore()

</script>

<style scoped>
    .breadCrumbs{
        color: #282A3A;
        -webkit-font-smoothing: antialiased;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        align-items: center;
        background: rgb(245,245,245);
        background: -moz-linear-gradient(0deg, rgba(245,245,245,1) 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 100%);
        background: -webkit-linear-gradient(0deg, rgba(245,245,245,1) 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 100%);
        background: linear-gradient(0deg, rgba(245,245,245,1) 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ededed",endColorstr="#ffffff",GradientType=1);
        height: 40px;
        width: 100%;
        border-bottom: 1px solid rgb(217, 217, 217);
    }
</style>
<template>
    <div class="topBar">
        <div class="leftHand">
            <img src="../../assets/jamkrida/logoTextBnW.png"/>
            <Bars3Icon style="max-width: 15px; max-height:15px;"/>
        </div>
    </div>
</template>

<script setup>
import { Bars3Icon } from '@heroicons/vue/24/outline'
</script>

<style scoped>
    .leftHand{
        display: flex;
        gap: 10px;
        z-index: 3;
        align-items: center;
        box-sizing: border-box;
        padding-left: 25px;
    }
    img{
        max-width: 200px;
        max-height: auto;
    }
    .topBar{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        z-index: 100;
        box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.098);
        background: linear-gradient(90deg, rgba(44,54,145,1) 45%, rgba(10,135,102,1) 85%);
        min-height: 60px;
        width: 100%;
        border-bottom: 1px solid rgb(217, 217, 217)
    }
</style>
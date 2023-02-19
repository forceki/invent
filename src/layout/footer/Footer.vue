<template>
    <div class="footer dark:bg-[#272727] dark:border-[#1c1c1c] dark:text-slate-200 ">
        <p class="copy">
            {{ new Date().getFullYear() }}©
        </p>
        <p>
            Forceki
        </p>
    </div>
</template>

<script setup>
</script>

<style scoped>
    .copy{
        color: #777986;
        font-weight: 700;
    }
    .footer{
        gap: 5px;
        color: #282A3A;
        -webkit-font-smoothing: antialiased;
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        align-items: center;
        background: rgb(245,245,245);
        /* background: -moz-linear-gradient(90deg, rgba(245,245,245,1) 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 100%);
        background: -webkit-linear-gradient(90deg, rgba(245,245,245,1) 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 100%);
        background: linear-gradient(90deg, rgba(245,245,245,1) 0%, rgba(255,255,255,1) 6%, rgba(255,255,255,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ededed",endColorstr="#ffffff",GradientType=1); */
        height: 50px;
        width: 100%;
        border-top: 1px solid rgb(217, 217, 217);
    }
</style>
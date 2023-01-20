<template>
    <div class="card">

    </div>
</template>

<script setup>

</script>

<style>
    .card{
        width: 100%;
        background-color: white;
        border-radius: 5px;
        animation: init 500ms ease;
    }
    
    @keyframes init {
        0%   {
            transform: scale(0.9);
            opacity: 0%;}
        100%  {
            transform: scale(1);
            opacity: 100%;}
    }
</style>
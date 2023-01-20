<template>
    <TransitionGroup name="toast" tag="div" class="toasts-wrapper gap-y-2 mt-4">
        <Toast
        v-for="(toast, index) in layout.$state.toasts"
        :toast="toast"
        :key="index"
        />
    </TransitionGroup>
</template>

<script setup>
import Toast from './Toast.vue'

import {useLayoutStore} from '../../stores/layout'

const layout = useLayoutStore()
</script>

<style scoped>
    .toasts-wrapper {
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    }
     /* enter transitions */
  .toast-enter-from {
    opacity: 0;
    transform: translateX(60px);
  }
  .toast-enter-to {
    opacity: 1;
    transform: translateY(0);
  }
  .toast-enter-active {
    transition: all 0.3s ease;
  }
  /* leave transitions */
  .toast-leave-from {
    opacity: 1;
    transform: translateX(0);
  }
  .toast-leave-to {
    opacity: 0;
    transform: translateX(60px);
  }
  .toast-leave-active {
    transition: all 0.3s ease;
  }
</style>
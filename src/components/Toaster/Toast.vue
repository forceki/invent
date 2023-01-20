<template>
    <div id="toast-simple" class="toast" :class="TYPECLASS" role="alert">
      <img :src="TYPEICON" class="w-5 h-5">
      <div class="pl-4 text-sm font-semibold">{{props.toast.data.message}}</div>
    </div>
</template>

<script setup>
const props = defineProps({
  toast: {
    required: true,
    type: Object
  }
})

import { computed } from '@vue/runtime-core'
import {useLayoutStore} from '../../stores/layout'
import { InfoIcon, SuccesIcon, WarningIcon, ErrorIcon } from '../../assets'

const layout = useLayoutStore()

const TYPECLASS = computed({
    get() {
        return props.toast.data.type == 'info' ? 'toast-info' : 
               props.toast.data.type == 'success' ? 'toast-success':
               props.toast.data.type == 'warning' ? 'toast-warning': 'toast-error';
    }
})

const TYPEICON = computed({
    get() {
        return props.toast.data.type == 'info' ? InfoIcon : 
               props.toast.data.type == 'success' ? SuccesIcon:
               props.toast.data.type == 'warning' ? WarningIcon: ErrorIcon;
    }
})

setTimeout(() => {
  layout.clearToast(props.toast.id)
}, props.toast.data.duration)
</script>

<style scoped>
 
</style>
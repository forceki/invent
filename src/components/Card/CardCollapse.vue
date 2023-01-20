<template>
  <div id="card" class="card-body box-border w-full row p-4 px-0 md:pl-0 justify-center">
    <div class="row w-full justify-between px-4">
      <div class="basis-1/3 md:flex justify-center items-center hidden">
        <span :class="!CONTENTCOLLAPSE ? 'h-24 w-24' : 'h-48 w-48'" class="transition-all duration-500 md:flex justify-center items-center hidden">
          <slot name="image"></slot>
        </span>
      </div>
      <div class="basis-2/3 col gap-3">
        <div class="row justify-between">
            <div id="header">
              <slot name="header"></slot>
            </div>
            <div id="button">
              <div @click="() => onCollapse()" class="btn-icon rounded-full">
                <ChevronUpIcon class="stroke-2" :class="CONTENTCOLLAPSE ? '' : 'rotate-180'"  style="width: 24px; height: auto;"/>
              </div>
            </div>
        </div>
        <section class="transition-all ease-in-out duration-500" :class="CONTENTCOLLAPSE ? 'max-h-64 opacity-1' : 'max-h-0 opacity-0'">
          <div v-show="CONTENTHIDDEN" :class="!CONTENTCOLLAPSE ? 'not-allowed' : ''">
          <slot name="content"></slot>
          </div>
        </section>
      </div>
    </div>     
  </div>
</template>

<script setup>
//Import Icon
import { BackspaceIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'
import { ref } from '@vue/reactivity'

//Ref
const CONTENTCOLLAPSE = ref(true)
const CONTENTHIDDEN = ref(true)

//onClick
const onCollapse = () => {
    if (CONTENTCOLLAPSE.value) {
        CONTENTCOLLAPSE.value = false
        setTimeout(() => {
            CONTENTHIDDEN.value = false
        }, 501)
        return
    }
    CONTENTCOLLAPSE.value = true
    CONTENTHIDDEN.value = true

}

//Date Range Import
import VueDatepickerUi from 'vue-datepicker-ui';

//Icon Import
import { Adjust } from '../../assets'

//Component Import
import Select from '../Form/Select.vue'
</script>

<style>

</style>
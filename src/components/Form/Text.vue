<template>
    <div>
      <p v-if="props.labelClass != ''" :class="props.labelClass + ' label-control'">{{props.label}} <span class="text-red-400">{{props.required? '*' : ''}}</span></p>
      <span :class="props.type == 'textarea' ? 'reset-input-textarea' : 'reset-input'">
        <component
        v-if="props.type != 'number' && props.type != 'wang'" 
        :is="props.type == 'textarea' ? 'textarea' : 'input' "
        id="text" 
        class="input-control" 
              :style="props.inputStyle"
        :placeholder="props.placeholder" 
        :value="props.value"
        :class="props.inputClass + ' ' + (props.error ? 'border-red-400' : 'border-slate-200')"
        @change="(e) => {props.onChange(e)}"
        :disabled="props.disabled"
        :readonly="props.readonly"
        :type="props.type"
        />
        <component
        v-else
        :is="'input'"
        id="number" 
        :style="props.inputStyle"
        class="input-control pr-8 text-right pr-[35px]" 
        :placeholder="props.placeholder" 
        :value="props.type == 'number' ? props.value : 'Rp. ' + doMath.intParser(props.value, true)"
        :class="props.inputClass + ' ' + (props.error ? 'border-red-400' : '')"
        @input="(e) => {
          props.type == 'wang' ?  e.target.value = parseFloat(e.target.value.replace(/\.|(Rp.)|\D|\,/g, '')) : ''
          props.type == 'wang' ? e.target.value /= 100 : e.target.value
          if (props.max && e.target.value > parseInt(props.max)) e.target.value = props.max;
          if (props.min && e.target.value < parseInt(props.min)) e.target.value = props.min;
          props.onChange(e)
          props.type == 'wang' ? e.target.value = 'Rp. ' + doMath.intParser(e.target.value, true) : e.target.value
          } "
        :disabled="props.disabled"
        :readonly="props.readonly"
        type="text"
        :min=" props.min ? parseInt(props.min) : false"
        :max=" props.max ? parseInt(props.max) : false"
        />
      <span v-if="props.type != 'date'" :class="props.type == 'textarea' ? 'reset-btn-textarea' : 'reset-btn'" @click="props.onDelete"  v-show="!props.readonly && props.value"><BackspaceIcon class="text-slate-500" style="width: 26px; height: auto;"/></span>
      </span>
      <p class="text-xs text-red-400">
        {{props.errorText != false ? props.errorText : null}}
      </p>
      <p class="text-xs text-slate-400">
        {{props.note != false ? props.note : null}}
      </p>
    </div>
</template>

<script setup>
import { BackspaceIcon } from '@heroicons/vue/24/outline'
import { onMounted, onUnmounted } from '@vue/runtime-core';
import { doMath } from '../../utils';

const props = defineProps({
  label: {
    type: String,
    default: 'Label'
  },
  placeholder: {
    type: String,
    default: 'Placeholder'
  },
  value: {
    type: String,
    default: ''
  },
  inputStyle: {
    type: String,
    default:''
  },
  min: {
    type: String,
  },
  max: {
    type: String,
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: Boolean,
    default: false
  },
  note: {
    type: Boolean,
    default: false
  },
  errorText: {
    type: String,
    default: null
  },
  labelClass: {
    type: String,
    default: ''
  },
  inputClass: {
    type: String,
    default: 'p-1'
  },
  onChange: {
    type: Function,
    default: () => {}
  },
  onDelete: {
    type: Function,
    default: () => {}
  },
})



let invalidChars = [
  "+",
  "e",
  "E"
];

const keydown = (e) => {
  if (invalidChars.includes(e.key)) {
    e.preventDefault();
  }
}

onMounted(() => {
  if(props.type == 'number'){
    let inputNumber = document.getElementById("number")
    if(inputNumber){
      inputNumber.addEventListener("keydown", keydown)
    }
    return
  }
})

onUnmounted(() => {
  if(props.type == 'number'){
    let inputNumber = document.getElementById("number")
    if(inputNumber){
      inputNumber.removeEventListener("keydown", keydown)
    }
    return
  }
})




</script>

<style>

</style>
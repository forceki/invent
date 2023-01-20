<template>
  <div :id="props.id">
    <p v-if="props.title != ''" :class="props.labelClass + ' label-control text-left'">
      {{props.title}}
      <span class="text-red-400">{{props.required? '*' : ''}}</span>
    </p>
    <span class="reset-input">
        <input 
        :class="props.inputClass + ' input-control cursor-pointer'"
        autocomplete="off" 
        :readonly="props.readonly"
        :disabled="props.disabled"
        v-model="display.input" 
        @input="onSearch" 
        @focus="() => 
            {
                display.select = true;
                $emit('selectModal', true)
            }
            " :id="'sehweit' + props.id"  :placeholder="props.placeholder"/>
        <span v-if="!props.disabled" class="reset-btn row gap-2">
          <span @click="deleteItem" v-show="display.input">
            <BackspaceIcon class="text-slate-500" style="width: 26px; height: auto;"/>
          </span>
          <span class="border-l pl-2 cursor-pointer" @click="() => 
            {
                if(!display.select){
                  display.select = true;
                  $emit('selectModal', true)
                  return
                }
                  display.select = false;
                  $emit('selectModal', false)
            }">
            <ChevronUpIcon class="text-slate-500 transition duration-300" :class="display.select ? 'rotate-180' : ''" style="width: 26px; height: auto;"/>
          </span>
        </span>
    </span>
    <div v-show="display.select" :id="'nemesis' + props.id"  class="select box-shadow-sm byordBorder">
        <div @click="item[props.item.value] == null ? null : (
          selectItem(item[props.item.value], item[props.item.text]),
          $emit('selectModal', false)
          )" class="select-item" v-for="(item, index) in props.datas" v-bind:key="index" :value="item[props.item.value]">
        {{props.seperator ? item[props.item.value] : null}} {{props.seperator ? ' - ' : null}} {{item[props.item.text]}}
        </div>
        <div v-if="!props.lastPage" class="select-item row justify-center">
          <BounceLoader :loading="!props.lastPage" size="1rem" :color="'#294289'"/>
        </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity"
import { onMounted, onUnmounted, watch } from "@vue/runtime-core"

//Icon Import
import { BackspaceIcon, ChevronUpIcon } from '@heroicons/vue/24/outline'

//Debounce Import
import { debounce } from 'debounce'

// Component Import
import BounceLoader from '../Loader/BounceLoader.vue'

//If Click Out of Select
const clickOutSelect = (event) => {
  let select = document.getElementById(props.id)
  let { target } = event
  if(!select.contains(target)){
    display.select = false
    
  }
}

//Props Define
const props = defineProps({
  defaultValue: {
    type: String,
    default: ''
  },
  id: {
    type: String,
    default: 'Selector'
  },
  title: {
    type: String,
    default: 'Title'
  },
  placeholder: {
    type: String,
    default: 'Select Item'
  },
  seperator: {
    type: Boolean,
    default: true
  },
  lastPage: {
    type: Boolean,
    default: true,
  },
  inputClass: {
    type: String,
    default: ''
  },
  labelClass: {
    type: String,
    default: ''
  },
  item: {
    type: Object,
    default: {
      value: 'value',
      text: 'text'
    }
  },
  datas: {
    type: Array,
    default: [{
      'value': null,
      'text': 'No Items' 
    }]
  },
  readonly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  required: {
    type: Boolean,
    default: false
  },
  diffSearch: {
    type: Function,
    default: () => {}
  },
  onClick: {
    type: Function,
    default: () => {}
  },
  onDelete: {
    type: Function,
    default: () => {}
  },
  onSearch: {
    type: Function,
    default: () => {}
  },
  onScroll: {
    type: Function,
    default: () => {}
  } 
})

watch(() => props.defaultValue, async(newData, oldData) => {
  props.datas.length > 0 && newData ? 
    display.input = 
      props.seperator == true 
        ? props.datas.filter(a => a[props.item.value] == newData)[0][props.item.value] + ' - ' +  props.datas.filter(a => a[props.item.value] == newData)[0][props.item.text]
        : props.datas.filter(a => a[props.item.value] == newData)[0][props.item.text] : ''
})

//Lifecycle Vue
onMounted(() => {
  props.datas.length > 0 && props.defaultValue ? 
    display.input = 
      props.seperator == true 
        ? props.datas.filter(a => a[props.item.value] == props.defaultValue)[0][props.item.value] + ' - ' +  props.datas.filter(a => a[props.item.value] == props.defaultValue)[0][props.item.text]
        : props.datas.filter(a => a[props.item.value] == props.defaultValue)[0][props.item.text] : ''

  window.addEventListener('click', clickOutSelect)
  
  let nemesis = document.getElementById("nemesis" + props.id)

  nemesis.addEventListener('scroll', function(event)
  {
    var {target} = event;
    if (target.scrollHeight - target.scrollTop === target.clientHeight)
    {
      if(props.lastPage){
        return
      }
      ++page.value
      props.diffSearch(false)
      status.search ? props.onSearch(display.input, page.value) : props.onSearch(null, page.value)
    }
  });
})

onUnmounted(() => {
  window.removeEventListener('click', clickOutSelect)
})

//Reactive & Ref Local
const page = ref(1)

const display = reactive({
  input: '',
  select: false
})

const status = reactive({
  search: false
})

//Function for Select Item
const selectItem = (kode, text) => {
  display.input =  props.seperator ? kode + ' - ' + text : text
  display.select = false
  try {
    props.onClick(kode, text)  
  } catch (error) {
    props.onClick(kode)
  }
  
}

//Function for Delete Item
const deleteItem = () => {
  display.input = ''
  display.select = false
  props.onDelete()
}

const clearDisplay = () => {
  display.input = ''
  display.select = false
}

//Function for Search Bank
const onSearch = debounce((e) => {
  let {value} = e.target
  console.log(value)
  status.search = true
  page.value = 1
  props.onSearch(value, 1)
}, 500)

//Watch if has diff search
watch(() => display.input, debounce(async (newSearch, oldSearch) => {
  if(!oldSearch){
    return
  }
  if(newSearch != oldSearch){
    props.diffSearch(true)
  }
}, 400))

defineExpose({
  deleteItem,
  clearDisplay
})
</script>

<style>

</style>
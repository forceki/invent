<template>
    <ul class="inline-flex items-center -space-x-px">
        <li v-for="(item, index) in props.pageTotal.length < 1 ? defaultArray : props.pageTotal" :key="index">
            <a @click="prevPage" v-if="index == 0" href="#" class="prev-pagination">
                <span class="sr-only">Previous</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
            </a>
            <a v-if="index != 0 && index != (props.pageTotal.length < 1 ? defaultArray.length : props.pageTotal.length) - 1" @click="changePage(item.label, item.active)" :class="item.label === '...' ? 'pagination cursor-not-allowed' : item.active ? 'active-pagination' : 'pagination' " class="cursor-pointer">{{item.label}}</a>
            <a @click="nextPage" v-if="index == (props.pageTotal.length < 1 ? defaultArray.length : props.pageTotal.length) - 1" href="#" class="next-pagination">
                <span class="sr-only">Next</span>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
            </a>
        </li>
    </ul>
</template>

<script setup>
//Debounce Import
import { debounce } from 'debounce'

const props = defineProps({
    pageTotal : {
        type: Array,
        default: [{
            label: '',
            active: false
        },{
            label: '1',
            active: true
        },{
            label: '',
            active: false
        }]
    },
    changePage : {
        type: Function,
        default: () => {}
    }
})

const defaultArray = [{
            label: '',
            active: false
        },{
            label: '1',
            active: true
        },{
            label: '',
            active: false
        }]

const prevPage = debounce(() => {
    if(props.pageTotal.length != 0){
        let obj = props.pageTotal.find(item => item.active == true)
        if(obj.label != 1){
            let page = parseInt(obj.label) - 1
            props.changePage(page)
            return
        }
    }
}, 200)

const nextPage = debounce(() => {
    if(props.pageTotal.length != 0){
        let obj = props.pageTotal.find(item => item.active == true)
        let index = props.pageTotal.findIndex(item => item.label == obj.label)
        if(props.pageTotal.length - 2 != index){
            let page = parseInt(obj.label) + 1
            props.changePage(page)
            return
        }
    }
    return

}, 200)

const changePage = (page, active) => {
    if(active){
        return
    }
    props.changePage(page)
}
</script>

<style>

</style>
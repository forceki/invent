<template>
    <el-card>
        <template #header>
        <div class="card-header">
          <div>
              <span>Edit Checkins</span>
          </div>
        </div>
      </template>

      <div>
        <el-form 
        label-position="top"
        :model="TAMBAH_BARANG"
        ref="ruleFormRef"
        status-icon
        :rules="rules"
        style="max-width: 100%"
        label-width="100px"
        > 
            <div class="grid grid-cols-4 gap-2">
                <el-form-item label="Tanggal" prop="tanggal">
                    <el-date-picker
                        type="date"
                        placeholder="Pilih Tanggal"
                        v-model="TAMBAH_BARANG.tanggal"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="Jumlah Koli" prop="total">
                    <el-input-number
                        class="w-full"
                        v-model="TAMBAH_BARANG.total"
                        :min="0"
                        controls-position="right"
                    />
                </el-form-item>
                <el-form-item label="Supplier" prop="supplier_id">
                    <el-select v-model="TAMBAH_BARANG.supplier_id" filterable class="w-full">
                        <el-option
                            v-for="item in Supplier"
                            :label="item.label"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Gudang" prop="gudang_id" >
                    <el-select filterable class="w-full" v-model="TAMBAH_BARANG.gudang_id">
                        <el-option
                            v-for="item in Gudang"
                            :label="item.label"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="Items">
                    <el-select @change="addItem"  filterable class="w-full" placeholder="cari item">
                        <el-option
                            v-for="item in Item"
                            :label="item.nama"
                            :value="item.id"
                            :disabled="item.disabled"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-table 
                :data="addData"  
                table-layout="auto" 
                max-height="250"
                class="my-4"
                :header-cell-style="{background:'#ffffff', color:'black', border :'solid 1px white'}"
                :cell-style="{border :'solid 1px white'}"
                >
                    <el-table-column label="#" width="50">
                        <template #default="scope">
                            <div @click="Delete(scope.row.id)" class="cursor-pointer">
                                <i class="fa-solid fa-trash text-red-500"></i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="nama" label="Item"/>
                    <el-table-column prop="qty" label="Quantity" align="center">
                        <template #default="scope">
                            <el-input-number
                                    class="mx-4"
                                    v-model="scope.row.qty"
                                    :min="0"
                                    controls-position="right"
                                />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="grid grid-cols-1 gap-5">
                <el-form-item label="Keterangan" prop="keterangan">
                    <el-input v-model="TAMBAH_BARANG.keterangan" type="textarea"/>
                </el-form-item>
            </div>
        </el-form>
        <div class="w-40">
            <el-button type="success" @click="Submit(ruleFormRef)" :loading="loading">
                Tambah
            </el-button>
        </div>
      </div>


    </el-card>
</template>

<script setup lang="ts">
import { reactive , ref} from 'vue';
import { getSupplier,getMasterGudang,getMasterItem, parse } from '../../stores/master';
import { SuccessSwal, FailledSwal } from '../../components/SwallAlert/Alert'

import { FormInstance, FormRules } from 'element-plus';
import axios from 'axios';
import { useRoute } from 'vue-router';
import routers from '@/router'

const ruleFormRef = ref<FormInstance>()
const TAMBAH_BARANG = reactive({
    id : '',
    tanggal : '',
    total : 0,
    supplier_id: '',
    gudang_id :'',
    keterangan : '',
})

const rules = reactive<FormRules>({
    tanggal : [
        {required : true , message: 'Please input tanggal', trigger: 'blur'}
    ],
    total : [
        {required:true, message: 'Please input jumlah koli', trigger: 'blur'}
    ],
    supplier_id: [
        {required :true, message: 'Please input supplier', trigger: 'change'}
    ],
    gudang_id : [ 
        {required : true, message: 'Please input gudang', trigger: 'change'}
    ]
})

const loading = ref(false)
const Supplier = reactive([])
const router = useRoute()
const params = ref(router.params.id)

const sup = await getSupplier()
Object.assign(Supplier,sup)

const Gudang = reactive([])
const gu  = await getMasterGudang()
Object.assign(Gudang,gu)

const Item = reactive([])
const item =  await getMasterItem()
Object.assign(Item,item)

const addData = reactive([])


const addItem = (e) => {
    Item.map((item,index) => {
        if(item.id == e){
            addData.push(item)
            item.disabled = true
        }
    })
}

const Delete = (id) => {
    console.log(id)
    addData.map((item,index) => {
        if(item.id == id){
            addData.splice(index,1)
        }
    })

    Item.map((it) => {
        if(it.id == id){
            it.disabled = false
        }
    })
}

const GetData = async()=>{
    const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"checkin/one",{
        params : {
            id : params.value
        }
    })

    console.log(data)
    const res = data.data.data
    TAMBAH_BARANG.gudang_id = res.gudang_id
    TAMBAH_BARANG.keterangan = res.keterangan
    TAMBAH_BARANG.supplier_id = res.supplier_id
    TAMBAH_BARANG.tanggal = res.tanggal
    TAMBAH_BARANG.total = res.total
    TAMBAH_BARANG.id = res.id

    res.items.forEach(el => {
        Item.forEach(item => {
            if(el.id == item.id){
                item.disabled = true
            }
        });
    });
    Object.assign(addData,res.items)

}

GetData()

const Submit = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    await formEl.validate( async(valid, fields) => {
        if (valid) {

            const body = {
                id : TAMBAH_BARANG.id,
                tanggal : TAMBAH_BARANG.tanggal,
                total : TAMBAH_BARANG.total,
                supplier_id: TAMBAH_BARANG.supplier_id,
                gudang_id :TAMBAH_BARANG.gudang_id,
                keterangan : TAMBAH_BARANG.keterangan,
                details : addData,
            }
            try {
                await axios.put(import.meta.env.VITE_API_ORIGIN+"checkin",body,{
                    params :{
                        id : params.value
                    }
                })
                SuccessSwal('success','Berhasil Mengedit Checkins')
                loading.value = false
                addData.length = 0
                routers.push("/checkins")
             } catch (error) {
                console.log(error)
                FailledSwal("erorr!", error.response.data.data ? parse(error.response.data.data) : error.response.data.message)
                loading.value = false
            }
        }else{
        loading.value = false
        }

    })

}



</script>
<template>
    <el-card>
        <template #header>
        <div class="card-header">
          <div>
              <span>Tambah Item</span>
          </div>
        </div>
      </template>

      <div>
        <el-form 
        label-position="top"
        :model="TAMBAH_BARANG"
        ref="ruleFormRef"
        :rules="rules"
        status-icon
        style="max-width: 100%"
        label-width="100px"
        > 
            <div class="grid grid-cols-2 gap-5">
                <el-form-item label="Nama Item" prop="nama">
                    <el-input v-model="TAMBAH_BARANG.nama" type="text"/>
                </el-form-item>
                <el-form-item label="Kategori" prop="kategori_id">
                    <el-select v-model="TAMBAH_BARANG.kategori_id" class="w-full" filterable>
                        <el-option
                            v-for="item in Kategori"
                            :label="item.nama"
                            :value="parseInt(item.id)"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <div class="grid grid-cols-2 gap-5">
                <el-form-item label="Satuan" prop="satuan">
                    <el-select v-model="TAMBAH_BARANG.satuan"  class="w-full" filterable>
                        <el-option
                            v-for="item in Satuan"
                            :label="item.value"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Barcode" prop="barcode">
                    <el-input v-model="TAMBAH_BARANG.barcode" type="text"/>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="Detail" prop="detail">
                    <el-input v-model="TAMBAH_BARANG.detail" type="textarea"/>
                </el-form-item>
            </div>
        </el-form>
        <div >
            <el-button type="success" @click="Submit(ruleFormRef)" :loading="loading">
                Tambah
            </el-button>
        </div>
      </div>


    </el-card>
</template>

<script setup lang="ts">
import axios from 'axios';
import { FormInstance, FormRules } from 'element-plus';
import Swal from 'sweetalert2';
import { reactive , ref} from 'vue';
import { SuccessSwal, FailledSwal } from '../../components/SwallAlert/Alert'
import { getKategori, parse } from '../../stores/master';
import router from '@/router';

const loading = ref(false)
const ruleFormRef = ref<FormInstance>()
const TAMBAH_BARANG = reactive({
    nama : '',
    kategori_id : '',
    satuan : '',
    barcode : '',
    detail : ''
})

const Submit = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    await formEl.validate( async(valid, fields) => {
        if (valid) {
            try {
                await axios.post(import.meta.env.VITE_API_ORIGIN+"items",TAMBAH_BARANG)
                SuccessSwal('success','Berhasil Menambahkan Item')
                Object.assign(TAMBAH_BARANG,{
                    nama : '',
                    kategori_id : '',
                    satuan : '',
                    barcode : '',
                    detail : ''
                })
                loading.value = false
                router.push("/item")
             } catch (error) {
                FailledSwal("erorr!", error.response.data.data ? parse(error.response.data.data) : error.response.data.message)
                loading.value = false
            }
        }else{
        loading.value = false
        }

    })

}

const rules = reactive<FormRules>({
    nama : [
        {required : true , message: 'Please input nama item', trigger: 'blur'}
    ],
    kategori_id : [
        {required:true, message: 'Please input kategori', trigger: 'change'}
    ],
    satuan: [
        {required :true, message: 'Please input satuan', trigger: 'change'}
    ],
    barcode : [ 
        {required : true, message: 'Please input barcode', trigger: 'blur'}
    ]
})



const Kategori = reactive([])

// const getKategori = async() => {
//     try {
//         const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"kategori")
       
//         Object.assign(Kategori,data.data.data)
        
//     } catch (error) {
//         FailledSwal("erorr!", error.response.data.message)
//     }
// }

// getKategori()

const kategori = await getKategori()

Object.assign(Kategori,kategori)

const Satuan = reactive([
    {
        value : "Koli",
    },
    {
        value : "Piece",
    },
])
</script>
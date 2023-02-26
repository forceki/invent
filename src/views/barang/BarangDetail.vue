<template>
    <el-card>
        <template #header>
        <div class="card-header">
          <div>
              <span>Detail Item</span>
          </div>
        </div>
      </template>

      <div>
        <el-form 
        label-position="top"
        status-icon
        style="max-width: 100%"
        label-width="100px"
        > 
            <div class="grid grid-cols-4 gap-5">
                <el-form-item label="Nama Item" prop="nama">
                    <el-input v-model="TAMBAH_BARANG.item.nama" disabled type="text"/>
                </el-form-item>
                <el-form-item label="Kategori" prop="kategori_id">
                    <el-input v-model="TAMBAH_BARANG.item.kategori_nama" disabled type="text"/>
                </el-form-item>
                <el-form-item label="Satuan" prop="barcode">
                    <el-input v-model="TAMBAH_BARANG.item.satuan" disabled type="text"/>
                </el-form-item>
                <el-form-item label="Barcode" prop="barcode">
                    <el-input v-model="TAMBAH_BARANG.item.barcode" disabled type="text"/>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="Detail" prop="detail">
                    <el-input v-model="TAMBAH_BARANG.item.detail" disabled type="textarea"/>
                </el-form-item>
            </div>
        </el-form>
        <el-divider/>
        <div v-if="TAMBAH_BARANG.detail.length > 0" class="w-[50%]">
            <el-table 
          :data="TAMBAH_BARANG.detail" 
          table-layout="auto" 
          height="200"
          class="mt-4"
          style="width: 100%;"
          >
              <el-table-column prop="gudang" label="Nama Gudang"/>
              <el-table-column prop="qty" label="Quantity"/>
              <el-table-column prop="rack" label="Rack"/>
        </el-table>
        </div>
      </div>


    </el-card>
</template>

<script setup lang="ts">
import axios from 'axios';
import { FormInstance, FormRules } from 'element-plus';
import Swal from 'sweetalert2';
import { reactive , ref} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { SuccessSwal, FailledSwal } from '../../components/SwallAlert/Alert'
import routers from '@/router';

const router = useRoute()
const params = ref(router.params.id)
const loading = ref(false)
const TAMBAH_BARANG = reactive({
    item : {
        nama : "",
        kategori_nama : "",
        satuan : "",
        barcode : "",
        detail : ""
    },
    detail : []
})


const getItem = async()=>{
    try {

        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"items/detail",{
            params : {
                id : params.value
            }
        })
    
        console.log(data.data.data)
        Object.assign(TAMBAH_BARANG.item,data.data.data.item[0])
        Object.assign(TAMBAH_BARANG.detail,data.data.data.detail)
    } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
    }
}
getItem()





</script>
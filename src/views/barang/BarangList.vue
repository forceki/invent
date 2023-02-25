<template>
    <el-card class="box-card">
    <template #header>
      <div class="card-header flex justify-between">
        <div>
            <span>List Item</span>
        </div>
        <div>
          <router-link to="/item/add">
            <el-button class="button">Tambah</el-button>
          </router-link>
        </div>
      </div>
    </template>
    <div class="grid grid-cols-4">
        <el-input
        v-model="search"
        class="w-50"
        placeholder="Search"
        >
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
    </div>
    <div>
        <el-table
        :data="tableData" 
        table-layout="auto" 
        height="300"
        class="shadow-lg mt-4"
        :header-cell-style="{background:'#ECECEC', color:'black'}">
            <el-table-column type="index" :index="indexMethod" label="#"/>
            <el-table-column prop="nama" label="Nama" />
            <el-table-column prop="kategori_nama" label="Katergori" />
            <el-table-column prop="barcode" label="Barcode" />
            <el-table-column prop="satuan" label="Satuan" />
            <el-table-column prop="detail" label="Keterangan" />
            <el-table-column label="Action" header-align="center" align="center" width="max-content">
            <template #default="scope" >
                <!-- <el-dropdown trigger="click" placement="left" >
                    <el-button type="primary" text> <i class="fa-solid fa-ellipsis"></i></el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                        <el-dropdown-item class="text-green-500 font-bold"><router-link :to="'/item/edit/'+scope.row.id">Edit</router-link></el-dropdown-item>
                        <el-dropdown-item class="text-red-500 font-bold" @click="Delete(scope.row.id)">Hapus</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown> -->
                <div class="flex justify-evenly">
                    <div class="cursor-pointer"><i class="fa-solid fa-circle-info"></i></div>
                    <router-link  class="text-blue-500" :to="'/item/edit/'+scope.row.id"><i class="fa-solid fa-pen-to-square"></i></router-link>
                    <div class="cursor-pointer text-red-500" @click="Delete(scope.row.id)" ><i class="fa-solid fa-trash"></i></div>
                  </div>
            </template>
        </el-table-column>
        </el-table>
    </div>
    <div class="flex justify-between align-bottom">
        <el-select
        class="mt-4"
        v-model="size"
        style="width: 70px"
        >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
        </el-select>
        <el-pagination
        small
        background
        layout="prev, pager, next"
        :total="data.total"
        :page-size="data.perPage"
        class="mt-4"
        />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import axios from 'axios';
import { SuccessSwal, FailledSwal, deleteConfirmSwal } from '../../components/SwallAlert/Alert'


const search = ref('')

const indexMethod = (index: number) => {
  return index + 1
}


const tableData = reactive([])

const getItem = async() => {
  tableData.length = 0
  try {
    const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"items")
    
    Object.assign(tableData,data.data.data)
  } catch (error) {
    FailledSwal("erorr!", error.response.data.message)
  }
  

}

getItem()

const Delete = async(id)=>{
  const data =  await deleteConfirmSwal("Hapus Item!","anda yakin ingin menghapus?")

  if(data.isConfirmed){
    try {
      await axios.delete(import.meta.env.VITE_API_ORIGIN+"items",{
        params : {
          id : id
        }
      })
      SuccessSwal("Success","Berhasil Menghapus Item")
      getItem()
    } catch (error) {
      FailledSwal("erorr!", error.response.data.message)
    }
  }
} 

const data = reactive({
    total : 10,
    perPage : 10
})

const size = ref(10)
const options = [
  {
    value: '10',
    label: '10',
  },
  {
    value: '25',
    label: '25',
  },
  {
    value: '50',
    label: '50',
  }
]


</script>

<style>
.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background: none;
  border-radius: 10%;
  font-weight: 500;
  font-size: 1.075rem;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #004a76;
}
</style>
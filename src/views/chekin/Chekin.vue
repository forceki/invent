<template>
    <el-card class="box-card">
    <template #header>
      <div class="card-header flex justify-between">
        <div>
            <span>List Checkins</span>
        </div>
        <div>
          <router-link to="/checkins/add">
            <el-button type="success">Tambah</el-button>
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
          :row-class-name="tableRowClassName"
          :header-cell-style="{background:'#ECECEC', color:'black'}">
              <el-table-column type="index" :index="indexMethod" label="#"/>
              <el-table-column prop="tanggal" label="Tanggal" >
                <template #default="scope">
                  <div>{{ moment(scope.row.tanggal).format('DD-MM-YYYY') }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="total" label="Jumlah Koli" width="100" align="center" />
              <el-table-column prop="supplier" label="Supplier" />
              <el-table-column prop="gudang" label="Gudang" />
              <el-table-column prop="keterangan" label="keterangan" width="400"/>
              <el-table-column label="Action" header-align="center" align="center" width="max-content">
              <template #default="scope" >
                  <!-- <el-dropdown trigger="click" placement="left" >
                      <el-button type="primary" text> <i class="fa-solid fa-ellipsis"></i></el-button>
                      <template #dropdown>
                          <el-dropdown-menu>
                          <el-dropdown-item >Detail</el-dropdown-item>
                          <el-dropdown-item class="text-green-500 font-bold"></el-dropdown-item>
                          <el-dropdown-item class="text-red-500 font-bold" @click="Delete(scope.row.id)">Hapus</el-dropdown-item>
                          </el-dropdown-menu>
                      </template>
                  </el-dropdown> -->
                  <div class="flex justify-evenly">
                    <div class="cursor-pointer" @click="getDetail(scope.row)"><i class="fa-solid fa-circle-info"></i></div>
                    <router-link  class="text-blue-500" :to="'/checkins/edit/'+scope.row.id"><i class="fa-solid fa-pen-to-square"></i></router-link>
                    <div class="cursor-pointer text-red-500" @click="Delete(scope.row.id)" ><i class="fa-solid fa-trash"></i></div>
                  </div>
              </template>
          </el-table-column>
          </el-table>
    </div>


    <el-dialog v-model="openModal" title="Detail Checkins">
      <div class="grid grid-cols-3 gap-2 my-2">
        <div>
          <div>Tanggal</div>
          <el-input v-model="dataModal.tanggal" disabled/>
        </div>
        <div>
          <div>Koli</div>
          <el-input v-model="dataModal.total" disabled/>
        </div>
        <div>
          <div>Gudang</div>
          <el-input v-model="dataModal.gudang" disabled/>
        </div>
        <div>
          <div>Supplier</div>
          <el-input v-model="dataModal.supplier" disabled/>
        </div>
        <div>
          <div>Rak</div>
          <el-input v-model="dataModal.rack_name" disabled/>
        </div>
      </div> 
      <div>
        <div>Keterangan</div>
        <el-input type="textarea" v-model="dataModal.keterangan" disabled />
      </div>
      <el-divider/>
      <div>Item Detail</div>
      <el-table 
          :data="dataModal.items"  
          table-layout="auto" 
          :header-cell-style="{color:'black'}"
          >
        <el-table-column property="nama" label="Nama" width="200" />
        <el-table-column property="qty" label="qty" width="150" />
      </el-table>
      <template #footer>
        <span v-if="dataModal.status == 0" class="dialog-footer">
            <el-button type="primary" @click="ConfirmRetur">Proses</el-button>
        </span>
        </template>
    </el-dialog>
    
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
import moment from 'moment';
import { SuccessSwal, FailledSwal, deleteConfirmSwal } from '../../components/SwallAlert/Alert'
import Swal from 'sweetalert2';



const search = ref('')
const openModal = ref(false)
const indexMethod = (index: number) => {
  return index + 1
}

const dataModal = reactive({
  id : "",
  tanggal : '',
  gudang : '',
  supplier : '',
  total : '',
  keterangan : '',
  items : [],
  rack_name : "",
  status : 0
})

const tableData = reactive([])
const getCheckins = async() =>{

  tableData.length = 0

  try {
    
    const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"checkin")
    Object.assign(tableData,data.data.data)
  } catch (error) {
    FailledSwal("erorr!", error.response.data.message)
  }

} 

getCheckins()


const ConfirmRetur = () =>{

  openModal.value = false
  Swal.fire({
  title: 'Apakah ada item yang perlu di retur?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yaa',
  cancelButtonText : "Tidak"
}).then(async(result) => {
  if (result.isConfirmed) {
    await axios.get(import.meta.env.VITE_API_ORIGIN+"checkin/up-status",{
      params : {
        id : dataModal.id,
        status : "yes"
      }
    })
    SuccessSwal("Success","Berhasil Meretur")
    getCheckins()
  }else{
    await axios.get(import.meta.env.VITE_API_ORIGIN+"checkin/up-status",{
      params : {
        id : dataModal.id,
        status : "no"
      }
    })
    SuccessSwal("Success","Berhasil Memasukan")
    getCheckins()
  }
})
}


const getDetail = async(row)=>{
  const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"checkin/one",{
    params : {
      id : row.id
    }
  })

  row.items = data.data.data.items
  
  Object.assign(dataModal,row)
  console.log(dataModal)
  openModal.value = true
}

const Delete = async(id) => {
  const data =  await deleteConfirmSwal("Hapus Checkin!","anda yakin ingin menghapus?")

  if(data.isConfirmed){
    try {
      await axios.delete(import.meta.env.VITE_API_ORIGIN+"checkin",{
        params : {
          id : id
        }
      })
      SuccessSwal("Success","Berhasil Menghapus Checkin")
      getCheckins()
    } catch (error) {
      FailledSwal("erorr!", error.response.data.message)
    }
  }
}


const tableRowClassName = ({
  row,
  rowIndex,
}) => {
   if(row.status == 0){
    return 'warning-row'
   }

  return ''
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
.el-table .warning-row {
  --el-table-tr-bg-color: rgba(246, 246, 181, 0.922);
}
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
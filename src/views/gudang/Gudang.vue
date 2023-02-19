<template>
    <el-card class="box-card">
    <template #header>
      <div class="card-header flex justify-between">
        <div>
            <span>List Gudang</span>
        </div>
        <div>
            <el-button type="success" @click="Diff('add',null)">Tambah</el-button>
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
              <el-table-column type="expand" :index="indexMethod" label="#">
                <div>
                    <el-table 
                        :data="DataRack" 
                        style="width: 500px;margin-left: 10px;"
                        table-layout="auto" 
                        :border="false"
                        >
                            <el-table-column type="index" :index="indexMethod" label="#"/>
                            <el-table-column prop="nama" label="Nama Rak"/>
                            <el-table-column label="Action" header-align="center" align="center" width="max-content">
                            <template #default="scope" >
                                <div class="flex justify-evenly">
                                    <div class="cursor-pointer text-red-500" @click="Delete(scope.row.id)" ><i class="fa-solid fa-trash"></i></div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <el-table 
                    :data="DataRack" 
                    table-layout="auto" 
                    >
                        <el-table-column type="index" :index="indexMethod" label="#"/>
                        <el-table-column prop="nama" label="Nama Rak"/>
                        <el-table-column label="Action" header-align="center" align="center" width="max-content">
                        <template #default="scope" >
                            <div class="flex justify-evenly">
                                <div class="cursor-pointer text-red-500" @click="Delete(scope.row.id)" ><i class="fa-solid fa-trash"></i></div>
                            </div>
                        </template>
                    </el-table-column>
                    </el-table> -->
              </el-table-column>
              <el-table-column prop="nama" label="Nama Gudang"/>
              <el-table-column prop="alamat" label="Alamat" />
              <el-table-column prop="status" label="Status"  align="center">
                <template #default="scope">
                    <div v-if="scope.row.status">Aktif</div>
                    <div v-else>Non-Aktif</div>
                </template>
              </el-table-column>
              <el-table-column label="Action" header-align="center" align="center" width="max-content">
              <template #default="scope" >
                  <div class="flex justify-evenly">
                    <div class="cursor-pointer" @click="OpenDetail(scope.row)"><i class="fa-solid fa-circle-info"></i></div>
                    <div  class="text-blue-500" @click="Diff('edit',scope.row)"><i class="fa-solid fa-pen-to-square"></i></div>
                    <div class="cursor-pointer text-red-500" @click="Delete(scope.row.id)" ><i class="fa-solid fa-trash"></i></div>
                  </div>
              </template>
          </el-table-column>
          </el-table>
    </div>


    <el-dialog v-model="dialogFormVisible"  :title="isCreate ? 'Tambah Gudang' : 'Edit Gudang'">
        <el-form 
        :model="form" 
        :rules="rules"
        ref="ruleFormRef"
        label-position="top"
        >
        <el-form-item label="Nama Gudang" prop="nama" >
            <el-input v-model="form.nama" autocomplete="off" class="w-full" />
        </el-form-item>
        <el-form-item label="Alamat" prop="alamat">
            <el-input v-model="form.alamat" autocomplete="off" class="w-full" />
        </el-form-item>
        <el-form-item label="Status Gudang" prop="status">
            <el-checkbox v-model="form.status" :label="form.status ? 'Aktif' : 'Non-Aktif'" size="large" border />
        </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="isCreate ? Submit(ruleFormRef) : Update(ruleFormRef)">Submit</el-button>
        </span>
        </template>
    </el-dialog>



    <!-- list rack -->
    <el-dialog v-model="openDetail" title="Detail Gudang">
        <el-divider content-position="left">Add Rack</el-divider>
        <div class="mb-2">
         <el-table 
          :data="DataRack" 
          table-layout="auto" 
          height="250"
          class="mt-4"
          :header-cell-style="{background:'#ECECEC', color:'black'}">
              <el-table-column type="index" :index="indexMethod" label="#"/>
              <el-table-column prop="nama" label="Nama Rak"/>
              <!-- <el-table-column prop="rack_location" label="Lokasi Rack" /> -->
              <el-table-column label="Action" header-align="center" align="center" width="max-content">
              <template #default="scope" >
                  <div class="flex justify-evenly">
                    <!-- <div class="cursor-pointer" @click="OpenDetail(scope.row)"><i class="fa-solid fa-circle-info"></i></div>
                    <div  class="text-blue-500" @click="Diff('edit',scope.row)"><i class="fa-solid fa-pen-to-square"></i></div> -->
                    <div class="cursor-pointer text-red-500" @click="Delete(scope.row.id)" ><i class="fa-solid fa-trash"></i></div>
                  </div>
              </template>
          </el-table-column>
          </el-table>
        </div>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="openDetail = false">Cancel</el-button>
            <el-button type="primary" @click="AddRack">Tambah Rak</el-button>
        </span>
        </template>
    </el-dialog>
    <!-- end list rack -->


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

<script setup lang="ts">
import { ref,reactive } from 'vue';
import { Search } from '@element-plus/icons-vue'
import { SuccessSwal, FailledSwal, deleteConfirmSwal } from '../../components/SwallAlert/Alert'
import axios from 'axios';
import { FormInstance, FormRules } from 'element-plus';
import { parse } from '../../stores/master';

const ruleFormRef = ref<FormInstance>()
const search = ref('')
const dialogFormVisible = ref(false)
const loading = ref(false)
const isCreate = ref(false)
const openDetail = ref(false)
const addRack = ref(false)
const indexMethod = (index: number) => {
  return index + 1
}


const AddRack = () =>{
    openDetail.value = false
    addRack.value = true
}

const tableData = reactive([])
const getData = async()=>{
    tableData.length = 0

    try {
        
        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"gudang")
        Object.assign(tableData,data.data.data)
    } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
    }

}
getData()

const Delete = async(id) => {
  const data =  await deleteConfirmSwal("Hapus Gudang!","anda yakin ingin menghapus?")

  if(data.isConfirmed){
    try {
      await axios.delete(import.meta.env.VITE_API_ORIGIN+"gudang",{
        params : {
          id : id
        }
      })
      SuccessSwal("Success","Berhasil Menghapus Gudang")
      getData()
    } catch (error) {
      FailledSwal("erorr!", error.response.data.message)
    }
  }
}

const Diff = async(kind,data) => {
    for (var member in form) delete form[member];
    await new Promise(resolve => setTimeout(resolve, 500));
    if(kind == "edit"){
        isCreate.value = false
        dialogFormVisible.value = true
        Object.assign(form,data)
    }else{
        isCreate.value = true
        dialogFormVisible.value = true
    }
}

const form = reactive({
    id: '',
 nama : '',
 alamat : '',
 status : false
})

const Submit = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    await formEl.validate( async(valid, fields) => {
        if (valid) {
            dialogFormVisible.value = false

            try {
                await axios.post(import.meta.env.VITE_API_ORIGIN+"gudang",form)
                SuccessSwal('success','Berhasil Menambahkan Gudang')
                Object.assign(form,{
                   nama : '',
                   alamat : '',
                   status :false
                })
                loading.value = false
                getData()
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

const Update = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    await formEl.validate( async(valid, fields) => {
        if (valid) {
            dialogFormVisible.value = false

            try {
                await axios.put(import.meta.env.VITE_API_ORIGIN+"gudang",form,{
                    params : {
                        id : form.id
                    }
                })
                SuccessSwal('success','Berhasil Mengedit Gudang')
                Object.assign(form,{
                    id: '',
                   nama : '',
                   alamat : '',
                   status :false
                })
                loading.value = false
                getData()
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

const OpenDetail = async (e) =>{
    console.log(e)
    openDetail.value = true 
}

const DataRack = reactive([
    {nama : "MT"},
    {nama : "TY"}
])

const rules = reactive<FormRules>({
    nama : [
        {required : true , message: 'Please input nama', trigger: 'blur'}
    ],
    alamat : [
        {required:true, message: 'Please input alamat', trigger: 'blur'}
    ]
})


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
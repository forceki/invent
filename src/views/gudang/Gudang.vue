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

                <template #default="scope">
                    <div>
                    <el-table 
                        :data="scope.row.rack" 
                        style="width: 500px;margin-left: 10px;"
                        table-layout="auto" 
                        :border="false"
                        >
                            <el-table-column type="index" :index="indexMethod" label="#"/>
                            <el-table-column prop="rack_name" label="Nama Rak"/>
                            <el-table-column label="Action" header-align="center" align="center" width="max-content">
                            <template #default="scope" >
                                <div class="flex justify-evenly">
                                    <div class="cursor-pointer text-red-500" @click="DeleteRack(scope.row.rack_id)" ><i class="fa-solid fa-trash"></i></div>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                </template>
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
                    <div  class="text-blue-500 cursor-pointer" @click="Diff('edit',scope.row)"><i class="fa-solid fa-pen-to-square"></i></div>
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
        <div class="grid grid-cols-1 gap-2">
            <span class="w-full">Nama Rak</span>
            <div class="flex">
                <el-input v-model="nama_rak" class="w-full"/>
                <el-button type="primary" @click="addRackLocal">Add</el-button>
            </div>
        </div>
        <div class="mb-2">
         <el-table 
          :data="racks.details" 
          table-layout="auto" 
          height="250"
          class="mt-4"
          :header-cell-style="{background:'#ECECEC', color:'black'}">
              <el-table-column type="index" :index="indexMethod" label="#"/>
              <el-table-column prop="rack_name" label="Nama Rak"/>
              <!-- <el-table-column prop="rack_location" label="Lokasi Rack" /> -->
              <el-table-column label="Action" header-align="center" align="center" width="max-content">
              <template #default="scope" >
                  <div class="flex justify-evenly">
                    <!-- <div class="cursor-pointer" @click="OpenDetail(scope.row)"><i class="fa-solid fa-circle-info"></i></div>
                    <div  class="text-blue-500" @click="Diff('edit',scope.row)"><i class="fa-solid fa-pen-to-square"></i></div> -->
                    <div class="cursor-pointer text-red-500" @click="deleteRackLocal(scope.$index)" ><i class="fa-solid fa-trash"></i></div>
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
const indexMethod = (index: number) => {
  return index + 1
}


const nama_rak = ref("")
const racks = reactive({
    gudang_id : "",
    details : []
})
const AddRack = async() =>{
    const body = {
        gudang_id : racks.gudang_id,
        details : racks.details
    }

    try {
        axios.post(import.meta.env.VITE_API_ORIGIN+"gudang/rack",body)
        SuccessSwal('success','Berhasil Menambahkan rak')
        Object.assign(racks,{
            gudang_id : "",
            details : []
        })
        setTimeout(() => {
            openDetail.value = false
        }, 200);
    } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
    }
}

const addRackLocal = () => {
    racks.details.push({rack_name : nama_rak.value})
    nama_rak.value = ""

}

const deleteRackLocal = (e) => {
    racks.details.splice(e,1)
}   


const DeleteRack = async(id) => {
    const data =  await deleteConfirmSwal("Hapus Rack!","anda yakin ingin menghapus?")

    if(data.isConfirmed){
        try {
        await axios.delete(import.meta.env.VITE_API_ORIGIN+"gudang/rack",{
            params : {
                id : id
            }
        })
        SuccessSwal("Success","Berhasil Menghapus Rack")
        getData()
        } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
        }
    }
}

const tableData = reactive([])
const getData = async()=>{
    tableData.length = 0

    try {
        
        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"gudang")
        const item = data.data.data
        item.forEach(element => {
            if(element.rack != ""){
                element.rack = JSON.parse(element.rack)
            }else{
                element.rack = []
            }
        });
        Object.assign(tableData,item)   


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
                FailledSwal("erorr!", error.response.data.data ? parse(error.response.data.data) : error.response.data.message)
                loading.value = false
            }
        }else{
        loading.value = false
        }

    })
}

const OpenDetail = async (e) =>{
    openDetail.value = true 
    racks.gudang_id = e.id
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
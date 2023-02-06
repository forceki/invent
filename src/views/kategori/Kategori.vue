<template>
    <el-card class="box-card">
    <template #header>
      <div class="card-header flex justify-between">
        <div>
            <span>List Kategori</span>
        </div>
        <div>
            <el-button class="button" @click="Diff('add',null)">Tambah</el-button>
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
              <el-table-column prop="nama" label="Nama Kategori"/>
              <el-table-column label="Action" header-align="center" align="center" width="max-content">
              <template #default="scope" >
                  <el-dropdown trigger="click" placement="left" >
                      <el-button type="primary" text> <i class="fa-solid fa-ellipsis"></i></el-button>
                      <template #dropdown>
                          <el-dropdown-menu>
                          <el-dropdown-item class="text-green-500 font-bold" @click="Diff('edit',scope.row)">Edit</el-dropdown-item>
                          <el-dropdown-item class="text-red-500 font-bold" @click="Delete(scope.row.id)">Hapus</el-dropdown-item>
                          </el-dropdown-menu>
                      </template>
                  </el-dropdown>
              </template>
          </el-table-column>
          </el-table>
    </div>


    <el-dialog v-model="dialogFormVisible" :title="isCreate ? 'Tambah Kategori' : 'Edit Kategori'">
        <el-form 
        :model="form" 
        :rules="rules"
        ref="ruleFormRef"
        label-position="top"
        >
        <el-form-item label="Nama Kategori" prop="nama" >
            <el-input v-model="form.nama" autocomplete="off" class="w-full" />
        </el-form-item>
        </el-form>
        <template #footer>
        <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">Cancel</el-button>
            <el-button type="primary" @click="isCreate ? Submit(ruleFormRef) : Update(ruleFormRef)">Submit</el-button>
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

const indexMethod = (index: number) => {
  return index + 1
}

const tableData = reactive([])
const getData = async()=>{
    tableData.length = 0

    try {
        
        const data = await axios.get(import.meta.env.VITE_API_ORIGIN+"kategori")
        Object.assign(tableData,data.data.data)
    } catch (error) {
        FailledSwal("erorr!", error.response.data.message)
    }

}
getData()

const Delete = async(id) => {
  const data =  await deleteConfirmSwal("Hapus Kategori!","anda yakin ingin menghapus?")

  if(data.isConfirmed){
    try {
      await axios.delete(import.meta.env.VITE_API_ORIGIN+"kategori",{
        params : {
          id : id
        }
      })
      SuccessSwal("Success","Berhasil Menghapus Kategori")
      getData()
    } catch (error) {
      FailledSwal("erorr!", error.response.data.message)
    }
  }
}

const Diff = async(kind,data) => {
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
})

const Submit = async (formEl: FormInstance | undefined) => {
    loading.value = true
    if (!formEl) return
    await formEl.validate( async(valid, fields) => {
        if (valid) {
            dialogFormVisible.value = false

            try {
                await axios.post(import.meta.env.VITE_API_ORIGIN+"kategori",form)
                SuccessSwal('success','Berhasil Menambahkan Kategori')
                Object.assign(form,{
                    nama : '',
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
                await axios.put(import.meta.env.VITE_API_ORIGIN+"kategori",form,{
                    params : {
                        id : form.id
                    }
                })
                SuccessSwal('success','Berhasil Mengedit Kategori')
                Object.assign(form,{
                    id: '',
                    nama : '',
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


const rules = reactive<FormRules>({
    nama : [
        {required : true , message: 'Please input nama lengkap', trigger: 'blur'}
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
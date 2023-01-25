<template>
    <el-card class="box-card">
    <template #header>
      <div class="card-header flex justify-between">
        <div>
            <span>List Checkins</span>
        </div>
        <div>
          <router-link to="/checkins/add">
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
              <el-table-column prop="tanggal" label="Tanggal" /> 
              <el-table-column prop="koli" label="Jumlah Koli" width="100" />
              <el-table-column prop="supplier" label="Supplier" />
              <el-table-column prop="gudang" label="Gudang" />
              <el-table-column prop="keterangan" label="keterangan" width="400"/>
              <el-table-column label="Action" header-align="center" align="center" width="max-content">
              <template #default="scope" >
                  <el-dropdown trigger="click" placement="left" >
                      <el-button type="primary" text> <i class="fa-solid fa-ellipsis"></i></el-button>
                      <template #dropdown>
                          <el-dropdown-menu>
                          <el-dropdown-item >Detail</el-dropdown-item>
                          <el-dropdown-item class="text-green-500 font-bold">Edit</el-dropdown-item>
                          <el-dropdown-item class="text-red-500 font-bold">Hapus</el-dropdown-item>
                          </el-dropdown-menu>
                      </template>
                  </el-dropdown>
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
const search = ref('')

const indexMethod = (index: number) => {
  return index + 1
}


const tableData = [
  {
    tanggal: '01-02-2022',
    koli : 3,
    supplier: 'Kanzler',
    gudang : 'Gudang 1',
    keterangan : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the in"
  },
  {
    tanggal: '01-02-2022',
    koli : 3,
    supplier: 'Sedaap',
    gudang : 'Gudang 2',
    keterangan : "Lorem Ipsum is simply dummy text of the printing and typesetting industry"
  },
  {
    tanggal: '01-02-2022',
    koli : 3,
    supplier: 'Erigo',
    gudang : 'Gudang 1',
    keterangan : ""
  },
  {
    tanggal: '01-02-2022',
    koli : 3,
    supplier: 'Eriog',
    gudang : 'Gudang 1',
    keterangan : "Lorem Ipsum is simply dummy text of the printing "
  },
  {
    tanggal: '01-02-2022',
    koli : 3,
    supplier: 'haruki murakami',
    gudang : 'Gudang 1',
    keterangan : "Lorem Ipsum has been the industry's standard dummy text ever since"
  },
  {
    tanggal: '01-01-2023',
    koli : 3,
    supplier: 'Kanzler',
    gudang : 'Gudang 2',
    keterangan : "Lorem Ipsum has been the industry's standard dummy text ever since"
  },
  {
    tanggal: '01-01-2023',
    koli : 3,
    supplier: 'Sedaap',
    gudang : 'gudang 2',
    keterangan : ""
  },
  {
    tanggal: '01-01-2023',
    koli : 3,
    supplier: 'Erigo',
    gudang : 'Gudang 1',
    keterangan : ""
  },
  {
    tanggal: '01-01-2023',
    koli : 3,
    supplier: 'Eriog',
    gudang : 'Gudang 1',
    keterangan : ""
  },
  {
    tanggal: '01-01-2023',
    koli : 3,
    supplier: 'haruki murakami',
    gudang : 'Gudang 2',
    keterangan : "Lorem Ipsum has been the industry's standard dummy text ever since"
  }
]


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
<template>
    <el-card class="box-card">
    <template #header>
      <div class="card-header flex justify-between">
        <div>
            <span>List Chekins</span>
        </div>
        <div>
          <router-link to="/chekin/add">
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
              <el-table-column prop="nama" label="Nama" />
              <el-table-column prop="supplier" label="Supplier" />
              <el-table-column prop="gudang" label="Gudang" />
              <el-table-column prop="qty" label="Qty" />
              <el-table-column prop="keterangan" label="keterangan" />
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
    nama: 'Sosis Kanzler',
    kategori: 'Makanan',
    supplier: 'Kanzler',
    gudang : 'Gudang 1',
    rak: "41 - W - II",
    qty: 12,
    keterangan : "sosis enak"
  },
  {
    tanggal: '01-02-2022',
    nama: 'Mie Goreng',
    kategori: 'Makanan',
    supplier: 'Sedaap',
    gudang : 'Gudang 2',
    rak: "6 - V - IV",
    qty: 20,
    keterangan : "mie goreng sedaap"
  },
  {
    tanggal: '01-02-2022',
    nama: 'Hoodie Barnet Black',
    kategori: 'Outwear Hoodie',
    supplier: 'Erigo',
    gudang : 'Gudang 1',
    rak: "43 - J - III",
    qty: 10,
    keterangan : "hoodie barnet"
  },
  {
    tanggal: '01-02-2022',
    nama: 'Coach Jacket Your Mind Black ',
    kategori: 'Outwear Coach Jacket',
    supplier: 'Eriog',
    gudang : 'Gudang 1',
    rak: "9 - M - V",
    qty: 10,
    keterangan : "Jacket Black"
  },
  {
    tanggal: '01-02-2022',
    nama: 'Novel Norwegian Wood',
    kategori: 'Buku Novel',
    supplier: 'haruki murakami',
    gudang : 'Gudang 1',
    rak: "30 - N - V",
    qty: 5,
    keterangan : 'Novel yang dibuat oleh haruku murakami'
  },
  {
    tanggal: '01-01-2023',
    nama: 'Sosis Kanzler',
    kategori: 'Makanan',
    supplier: 'Kanzler',
    gudang : 'Gudang 2',
    rak: "23 - O - IV",
    qty: 12,
    keterangan : "sosis enak"
  },
  {
    tanggal: '01-01-2023',
    nama: 'Mie Goreng',
    kategori: 'Makanan',
    supplier: 'Sedaap',
    gudang : 'gudang 2',
    rak: "16 - L - III",
    qty: 20,
    keterangan : "mie goreng sedaap"
  },
  {
    tanggal: '01-01-2023',
    nama: 'Hoodie Barnet Black',
    kategori: 'Outwear Hoodie',
    supplier: 'Erigo',
    gudang : 'Gudang 1',
    rak: "28 - O - V",
    qty: 10,
    keterangan : "hoodie barnet"
  },
  {
    tanggal: '01-01-2023',
    nama: 'Coach Jacket Your Mind Black ',
    kategori: 'Outwear Coach Jacket',
    supplier: 'Eriog',
    gudang : 'Gudang 1',
    rak: "30 - N - III",
    qty: 10,
    keterangan : "Jacket Black"
  },
  {
    tanggal: '01-01-2023',
    nama: 'Novel Norwegian Wood',
    kategori: 'Buku Novel',
    supplier: 'haruki murakami',
    gudang : 'Gudang 2',
    rak: "30 - M - II",
    qty: 5,
    keterangan : 'Novel yang dibuat oleh haruku murakami'
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
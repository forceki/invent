<template>
    <el-card class="box-card">
      <template #header>
        <div class="card-header flex justify-between">
          <div>
              <span>Retur Barang</span>
          </div>
          <div>
            <el-button class="button" @click="check = !check ">{{ check ? 'Tutup' : 'Tambah' }}</el-button>
          </div>
        </div>
      </template>
      <div v-if="check">
        <el-form 
        label-position="left"
        :model="TAMBAH_BARANG"
        status-icon
        style="max-width: 100%"
        label-width="100px"
        > 
            <div class="grid grid-cols-3 gap-5">
                <el-form-item label="Nama Barang" prop="nama_barang">
                    <el-input v-model="TAMBAH_BARANG.nama_barang" type="text"/>
                </el-form-item>
                <el-form-item label="Kategori" prop="kategori">
                    <el-select v-model="TAMBAH_BARANG.kategori" filterable>
                        <el-option
                            v-for="item in Kategori"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Satuan" prop="satuan">
                    <el-input v-model="TAMBAH_BARANG.satuan" type="text" />
                </el-form-item>
            
            </div>
            <div class="grid grid-cols-2 gap-5">
                <el-form-item label="Nama Brand" prop="brandName">
                    <el-input v-model="TAMBAH_BARANG.brandName" type="text"/>
                </el-form-item>
                <el-form-item label="Tanggal Keluar" prop="tanggal">
                <el-date-picker
                    v-model="TAMBAH_BARANG.tanggal"
                    type="date"
                    placeholder="Pilih Tanggal"
                >
                </el-date-picker>
            </el-form-item>
            </div>
        </el-form>
        <el-button type="success">
            Simpan
        </el-button>
      </div>
      <el-divider v-if="check" />
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
              <el-table-column prop="kategori" label="Katergori" />
              <el-table-column prop="brandname" label="BrandName" />
              <el-table-column prop="qty" label="Qty" />
              <el-table-column prop="satuan" label="Satuan" />
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

const check = ref(false)

const tableData = [
  {
    tanggal: '01-02-2022',
    nama: 'Sosis Kanzler',
    kategori: 'Makanan',
    brandname: 'Kanzler',
    rak: "41 - W - II",
    qty: 12,
    satuan: "Buah",
    keterangan : "sosis enak"
  },
  {
    tanggal: '01-02-2022',
    nama: 'Mie Goreng',
    kategori: 'Makanan',
    brandname: 'Sedaap',
    qty: 20,
    satuan: "Buah",
    keterangan : "mie goreng sedaap"
  },
  {
    tanggal: '01-02-2022',
    nama: 'Hoodie Barnet Black',
    kategori: 'Outwear Hoodie',
    brandname: 'Erigo',
    qty: 10,
    satuan: "Buah",
    keterangan : "hoodie barnet"
  },
  {
    tanggal: '01-02-2022',
    nama: 'Coach Jacket Your Mind Black ',
    kategori: 'Outwear Coach Jacket',
    brandname: 'Eriog',
    qty: 10,
    satuan: "Buah",
    keterangan : "Jacket Black"
  },
  {
    tanggal: '01-02-2022',
    nama: 'Novel Norwegian Wood',
    kategori: 'Buku Novel',
    brandname: 'haruki murakami',
    qty: 5,
    satuan: "Buah",
    keterangan : 'Novel yang dibuat oleh haruku murakami'
  },
  {
    tanggal: '01-01-2023',
    nama: 'Sosis Kanzler',
    kategori: 'Makanan',
    brandname: 'Kanzler',
    qty: 12,
    satuan: "Buah",
    keterangan : "sosis enak"
  },
  {
    tanggal: '01-01-2023',
    nama: 'Mie Goreng',
    kategori: 'Makanan',
    brandname: 'Sedaap',
    qty: 20,
    satuan: "Buah",
    keterangan : "mie goreng sedaap"
  },
  {
    tanggal: '01-01-2023',
    nama: 'Hoodie Barnet Black',
    kategori: 'Outwear Hoodie',
    brandname: 'Erigo',
    qty: 10,
    satuan: "Buah",
    keterangan : "hoodie barnet"
  },
  {
    tanggal: '01-01-2023',
    nama: 'Coach Jacket Your Mind Black ',
    kategori: 'Outwear Coach Jacket',
    brandname: 'Eriog',
    qty: 10,
    satuan: "Buah",
    keterangan : "Jacket Black"
  },
  {
    tanggal: '01-01-2023',
    nama: 'Novel Norwegian Wood',
    kategori: 'Buku Novel',
    brandname: 'haruki murakami',
    qty: 5,
    satuan: "Buah",
    keterangan : 'Novel yang dibuat oleh haruku murakami'
  }
]

const TAMBAH_BARANG = reactive({
    nama_barang : '',
    kategori : '',
    satuan : '',
    brandName : '',
    tanggal : '',
})


const Kategori = reactive([
    {
        value : 1,
        label : "Makanan"
    },
    {
        value : 2,
        label : "Baju"
    },
    {
        value : 3,
        label : "Buku"
    },
    {
        value : 4,
        label : "Jacket"
    },
    {
        value : 5,
        label : "Hoodie"
    },

])

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
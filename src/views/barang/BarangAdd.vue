<template>
    <el-card>
        <template #header>
        <div class="card-header">
          <div>
              <span>Tambah Barang</span>
          </div>
        </div>
      </template>

      <div>
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
                <el-form-item label="Barcode" prop="barcode">
                    <el-input v-model="TAMBAH_BARANG.barcode" type="text"/>
                </el-form-item>
            </div>
        </el-form>
        <div class="w-40 flex justify-around items-center">
            <el-button type="success">
                Tambah
            </el-button>
            <span class="text-base text-blue-500 hover:text-blue-800 cursor-pointer">Bulk Insert</span>
        </div>
      </div>


    </el-card>
</template>

<script setup lang="ts">
import { reactive , ref} from 'vue';

const TAMBAH_BARANG = reactive({
    nama_barang : '',
    kategori : '',
    satuan : '',
    brandName : '',
    barcode : '',
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
</script>
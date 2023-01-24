<template>
    <el-card>
        <template #header>
        <div class="card-header">
          <div>
              <span>Tambah Chekins</span>
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
                <el-form-item label="Tanggal" prop="tanggal">
                    <el-date-picker
                        type="date"
                        placeholder="Pilih Tanggal"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="Nama Barang" prop="nama_barang">
                    <el-input type="text"/>
                </el-form-item>
                <el-form-item label="Qty" prop="satuan">
                    <el-input v-model="TAMBAH_BARANG.satuan" type="text" />
                </el-form-item>
            </div>
            <div class="grid grid-cols-4 gap-5">
                <el-form-item label="Supplier" prop="kategori">
                    <el-select v-model="TAMBAH_BARANG.kategori" filterable>
                        <el-option
                            v-for="item in Kategori"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Gudang" prop="kategori">
                    <el-select filterable>
                        <el-option
                            v-for="item in Gudang"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <div class="grid grid-cols-1 gap-5">
                <el-form-item label="Keterangan" prop="brandName">
                    <el-input v-model="TAMBAH_BARANG.brandName" type="textarea"/>
                </el-form-item>
            </div>
        </el-form>
        <div class="w-40 flex justify-around items-center">
            <el-button type="success">
                Tambah
            </el-button>
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
        label : "Kanzer"
    },
    {
        value : 2,
        label : "Haruki Murakami"
    },
    {
        value : 3,
        label : "Indomie"
    },
    {
        value : 4,
        label : "Nanang sumenan"
    },
    {
        value : 5,
        label : "Hikmah"
    },

])


const Gudang = reactive([
    {
        value : 1,
        label : "Gudang 1"
    },
    {
        value : 2,
        label : "Gudang 2"
    }
])
</script>
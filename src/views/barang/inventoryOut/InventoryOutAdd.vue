<template>
    <el-card>
        <template #header>
        <div class="card-header">
          <div>
              <span>Tambah Inventory Out</span>
          </div>
        </div>
      </template>

      <el-form 
        label-position="left"
        :model="FORM_BODY"
        status-icon
        style="max-width: 100%"
        label-width="100px"
      > 
        <div class="grid grid-cols-3 gap-5">
            <el-form-item label="Nama Barang" prop="nama_barang">
                <el-select v-model="FORM_BODY.nama_barang" placeholder="Pilih Barang" filterable>
                    <el-option
                        v-for="item in BARANG_LIST"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Kategori" prop="kategori">
                <el-select v-model="FORM_BODY.kategori" filterable disabled>
                    <el-option
                        v-for="item in BARANG_LIST"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="Barcode" prop="barcode">
                <el-input v-model="FORM_BODY.barcode" type="text" disabled/>
             </el-form-item>
        </div>
        <div class="grid grid-cols-2 gap-5">
            <el-form-item label="Nama Brand" prop="brandName">
                <el-input v-model="FORM_BODY.brandName" type="text" disabled/>
             </el-form-item>
             <el-form-item label="Rak" prop="rak">
                <el-input v-model="FORM_BODY.rak" type="text" />
             </el-form-item>
        </div>
        <div class="grid grid-cols-2 gap-5">
            <el-form-item label="Qty" prop="qty">
                <el-input v-model="FORM_BODY.qty" type="number" width="50" />
            </el-form-item>
            <el-form-item label="Tanggal Keluar" prop="tanggal">
                <el-date-picker
                    v-model="FORM_BODY.tanggal"
                    type="date"
                    placeholder="Pilih Tanggal"
                >
                </el-date-picker>
            </el-form-item>
        </div>
      </el-form>
      <div class="flex justify-between">
        <el-button type="primary">
            Simpan
        </el-button>
      </div>
    </el-card>
</template>

<script setup lang="ts">
import { reactive , ref} from 'vue';



const FORM_BODY = reactive({
    nama_barang : '',
    kategori : '',
    qty : 0,
    tanggal : '',
    brandName : '',
    barcode : '',
    rak : ''
})


const BARANG_LIST = reactive([
    {
        value : 1,
        label : "Sosis Kanzler"
    },
    {
        value : 2,
        label : "Mie Goreng"
    },
    {
        value : 3,
        label : "Hoodie Barnet Black"
    },
    {
        value : 4,
        label : "Coach Jacket Your Mind Black"
    },
    {
        value : 5,
        label : "Novel Norwegian Wood"
    },

])
</script>
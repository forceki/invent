<template>
    <el-card>
        <template #header>
        <div class="card-header">
          <div>
              <span>Tambah Checkins</span>
          </div>
        </div>
      </template>

      <div>
        <el-form 
        label-position="top"
        :model="TAMBAH_BARANG"
        status-icon
        style="max-width: 100%"
        label-width="100px"
        > 
            <div class="grid grid-cols-3 gap-2">
                <el-form-item label="Tanggal" prop="tanggal">
                    <el-date-picker
                        type="date"
                        placeholder="Pilih Tanggal"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="Supplier" prop="kategori">
                    <el-select v-model="TAMBAH_BARANG.kategori" filterable class="w-full">
                        <el-option
                            v-for="item in Kategori"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="Gudang" prop="kategori" >
                    <el-select filterable class="w-full">
                        <el-option
                            v-for="item in Gudang"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="Items">
                    <el-select @change="addItem"  filterable class="w-full" placeholder="search item">
                        <el-option
                            v-for="item in tableData"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-table 
                :data="addData"  
                table-layout="auto" 
                max-height="250"
                class="my-4"
                :header-cell-style="{background:'#ffffff', color:'black', border :'solid 1px white'}"
                :cell-style="{border :'solid 1px white'}"
                >
                    <el-table-column label="#" width="50">
                        <template #default="scope">
                            <div @click="Delete(scope.row.value)" class="cursor-pointer">
                                <i class="fa-solid fa-trash text-red-500"></i>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="label" label="Item"/>
                    <el-table-column prop="berat" label="Weight" align="center">
                        <template #default="scope">
                            <el-input type="number" v-model="scope.row.berat" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="qty" label="Quantity" align="center">
                        <template #default="scope">
                            <el-input type="number" v-model="scope.row.qty" />
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="grid grid-cols-5">
                <el-form-item label="Jumlah Koli" prop="nama_barang">
                        <el-input type="number" />
                </el-form-item>
            </div>
            <div class="grid grid-cols-1 gap-5">
                <el-form-item label="Keterangan" prop="brandName">
                    <el-input v-model="TAMBAH_BARANG.brandName" type="textarea"/>
                </el-form-item>
            </div>
        </el-form>
        <div class="w-40">
            <el-button type="success">
                Tambah
            </el-button>
        </div>
      </div>


    </el-card>
</template>

<script setup lang="ts">
import { faBorderAll } from '@fortawesome/free-solid-svg-icons';
import { add, split } from 'lodash';
import { reactive , ref} from 'vue';


const item = reactive({
    id : ''
})
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

const addData = reactive([])
const tableData = [
  {
    value : 1,
    label: 'Sosis Kanzler',
    qty: 12,
    berat :1 
  },
  {
    value : 2,
    label: 'Mie Goreng',
    qty: 20,
    berat : 5
  },
  {
    value : 3,
    label: 'Hoodie Barnet Black',
    qty: 10,
    berat : 8
  }
]

const addItem = (e) => {
    tableData.map((item) => {
        if(item.value == e){
            addData.push(item)
        }
    })
}

const Delete = (id) => {
    console.log(id)
    addData.map((item,index) => {
        if(item.value == id){
            addData.splice(index,1)
        }
    })
}



</script>
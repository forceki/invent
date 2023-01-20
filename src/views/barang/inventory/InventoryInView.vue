<template>
    <el-card>
        <el-tabs type="border-card" class="demo-tabs">
        <el-tab-pane>
            <template #label>
                <i class="fa-solid fa-clock-rotate-left"></i>
                <span class="custom-tabs-label">
                   List
                </span>
            </template>
        <InventoryIn/>
        </el-tab-pane>
        <el-tab-pane>
            <template #label>
                <i class="fa-solid fa-plus"></i>
                <span class="custom-tabs-label">
                   Add
                </span>
            </template>
        <InventoryInAdd/>
        </el-tab-pane>
    </el-tabs>
    </el-card>
    
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import InventoryIn from './InventoryIn.vue';
import InventoryInAdd from './InventoryInAdd.vue';

</script>
<style>
.demo-tabs > .el-tabs__content {
  padding: 12px;
  color: #6b778c;
  font-size: 12px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>

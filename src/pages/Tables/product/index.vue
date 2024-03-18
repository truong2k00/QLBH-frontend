<template>
  <v-card>
    <v-cart style="card-header fill-height height">
      <VRow min-width="12px">
        <VCol cols="8">
          <span style="height: 2em">
            <h2 style="margin-left: 18px">{{ pageName }}</h2>
          </span>
        </VCol>
        <VCol cols="4">
          <div>
            <VBtn
              append-icon="mdi-new-box"
              prepend-icon="mdi-plus-thick"
              class="attractive-color"
              style="position: absolute; right: 0"
              @click="onAddItem()"
            >
              <template v-slot:prepend>
                <v-icon color="success"></v-icon>
              </template>
              Add New Product
            </VBtn>
          </div>
        </VCol>
      </VRow>
    </v-cart>
    <div class="card-header fill-height height">
      <v-row>
        <v-col
          class="search-area"
          cols="3"
        >
          <v-text-field
            v-model="queryParams.searchText"
            placeholder="Search..."
            variant="solo"
            solo-inverted
            @blur="onSearchInputBlur"
          />
        </v-col>
        <v-col
          class="filter-area"
          cols="9"
        >
          <v-row>
            <VCol cols="6">
              <VCombobox
                v-model="queryParams.categoryIds"
                multiple
                clearable
                placeholder="Category"
                item-title="categoryName"
                item-value="productCategoryID"
                :items="categoryDatasource"
                @update:modelValue="onCategoryDropdownChanged"
              />
            </VCol>
            <v-col cols="6">
              <v-combobox
                v-model="queryParams.status"
                clearable
                placeholder="active"
                item-title="title"
                item-value="value"
                :items="statusDatasource"
                @update:modelValue="onStatusDropdownChanged"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <VDialog><h1>hello</h1></VDialog>
    </div>
    <div class="card-body">
      <!-- <VDataTable :items="tableConfig.data"></VDataTable> -->
      <VDataTable
        ref="table"
        :headers="tableConfig.headers"
        :items="tableConfig.data"
        :items-per-page="tableConfig.pagination.pageSize"
        :items-per-page-options="tableConfig.pagination.pageSizeOptions"
        :search="queryParams.searchText"
        items-per-page-text="quản lý sản phẩm"
      >
        <template #item.imageProduct="{ item }">
          <img
            v-if="item.row && item.row.imageProduct && item.row.imageProduct.length > 0"
            :src="item.row.imageProduct[0].imageUrl"
            alt="Hình ảnh"
            style="max-width: 100px; max-height: 100px"
          />
          <img
            v-else
            src=""
            alt="Hình null"
            style="max-width: 100px; max-height: 100px"
          />
        </template>
        <template #item.action="{ item }">
          <VBtn
            color="cyan-accent-4"
            icon="mdi-pencil"
            density="compact"
            @click="DELETE_PRODUCT(item.row)"
          ></VBtn>
          <VBtn
            color="red"
            icon="mdi-trash-can"
            density="compact"
          ></VBtn>
        </template>
      </VDataTable>
      <v-pagination
        v-model="tableConfig.pagination.pageNo"
        :length="tableConfig.pagination.totalPages"
        @input="onPageChange"
      ></v-pagination>
    </div>
    <div class="card-footer"></div>
  </v-card>
  <createproductdialog ref="dialog"></createproductdialog>
</template>
<script setup lang="ts">
import { onMounted, ref, getCurrentInstance } from 'vue'
import ProductServices from '@/services/product'
import createproductdialog from './createDialogproduct.vue'
import { IProductCategoryServicesRes } from '@/interfaces/res/Response_Models/IProductCategoryServices.res'
import category from '@/services/category'

const queryParams: IProductQueryParams = ref<IProductQueryParams>({})
const categoryDatasource = ref([])
const statusDatasource = ref([
  {
    title: 'Active',
    value: true,
  },
  {
    title: 'Inactive',
    value: false,
  },
])
const tableConfig = ref({
  headers: [
    { title: '', key: 'data-table-expand' },
    { title: 'Sản Phẩm ID', key: 'productID' },
    { title: 'Người tạo', key: 'username' },
    { title: 'Image', key: 'imageProduct' },
    { title: 'Tên Sản Phẩm', key: 'product_Name' },
    { title: 'Giá Bán', key: 'price' },
    { title: 'Số Lượng', key: 'quantity' },
    { title: 'Thao tác', key: 'action' },
  ],
  data: [],
  pagination: {
    pageNo: 1,
    pageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
    totalPages: 1,
    totalItems: 1,
  },
})
const loadData = async () => {
  const res = await ProductServices.GetAll()
  tableConfig.value.data = res?.data
  tableConfig.value.pagination.totalPages = res.pagination.totalPages
  tableConfig.value.pagination.pageSize = res.pagination.pageSize
  tableConfig.value.pagination.pageNo = res.pagination.pageNumber + 1
  tableConfig.value.pagination.totalItems = res.pagination.totalCount + 1
}
const DELETE_PRODUCT = script => {
  console.log('s')
}
onMounted(() => {
  loadCategory()
  loadCategory()
  DELETE_PRODUCT
  loadTableData()
  loadData()
})

const onAddItem = () => {
  instance?.refs.dialog.show()
}
const instance = getCurrentInstance()

const loadCategory = async () => {
  try {
    const res = await category.GetAll()
    // Gán dữ liệu vào biến tham chiếu
    categoryDatasource.value = res
    console.log(categoryDatasource.value) // Kiểm tra dữ liệu đã được gán vào biến tham chiếu
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}

const loadTableData = () => {
  const param = {
    searchText: queryParams.value.searchText,
    categoryIds: queryParams.value.categoryIds,
    status: queryParams.value.status,
  }
  console.log(param)
}

const onSearchInputBlur = () => {
  console.log(queryParams.value)
  loadTableData()
}

const onCategoryDropdownChanged = () => {
  console.log(queryParams.value.categoryIds)
  loadTableData()
}

const onStatusDropdownChanged = () => {
  console.log(queryParams.value)
  loadTableData()
}
// Components
import { useRoute } from 'vue-router'
import { anyTypeAnnotation, typeParameter } from '@babel/types'
import { all } from 'axios'
import { ALL } from 'dns'
/** Title */

const route = useRoute()
console.log(route)
const pageName = ref('')

onMounted(() => {
  pageName.value = route.meta.pageName
})
</script>

<style scoped>
.attractive-color {
  /* Thiết lập màu sắc hấp dẫn */
  background-color: green-lighten-1; /* Màu sắc chính */
  color: white; /* Màu chữ */
  /* Thêm các thuộc tính khác nếu cần thiết */
}
</style>

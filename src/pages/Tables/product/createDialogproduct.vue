<script setup lang="ts">
import { ref } from 'vue'
import { IProductCategoryServicesRes } from '@/interfaces/res/Response_Models/IProductCategoryServices.res'
import category from '@/services/category'
import { tr } from 'vuetify/lib/locale/index.mjs'

const categoryData = ref<IProductCategoryServicesRes | null>(null)
const loadCategory = async () => {
  try {
    const res = await category.GetAll()
    // Gán dữ liệu vào biến tham chiếu
    categoryData.value = res
    console.log(categoryData.value) // Kiểm tra dữ liệu đã được gán vào biến tham chiếu
  } catch (error) {
    console.error('Error loading categories:', error)
  }
}
const showDialog = ref(false)
const workingItem = ref({})
const showChungChiLienQuan = ref(false)
const listVitrimodel = ref(false)
const viTriBoSungItem = ref('')
const emit = defineEmits(['onSaveClick'])
const cardTitle = ref('')
const showItemViTri = ref(false)
const showId = ref(false)
const show = async (item: any) => {
  showDialog.value = true
  if (item != null) {
    cardTitle.value = 'Edit'
    showId.value = true
  } else {
    cardTitle.value = 'Create'
    workingItem.value = { chungChiLienQuan: [], viTriBoSung: [] }
  }
}
const cancelAction = () => {
  showDialog.value = false
}
const onAddItemChungChiLienQuan = () => {
  workingItem.value.chungChiLienQuan.push({
    tenChungChi: '',
    ketQua: '',
    fileCV: '',
  })
}
const addItemVitriValues = async () => {
  await workingItem.value.viTriBoSung.push({
    id: viTriBoSungItem.value.id,
    tenViTri: viTriBoSungItem.value.tenViTri,
    tenViTriTiengAnh: viTriBoSungItem.value.tenViTriTiengAnh,
  })
  viTriBoSungItem.value = ''
  listVitrimodel.value = false
}
const onShowItemChild = () => {
  showChungChiLienQuan.value = !showChungChiLienQuan.value
}
const listNhanVien = ref([])
const onAddItemVitri = async () => {
  listVitrimodel.value = !listVitrimodel.value
}

const onShowItemChildHoSo = () => {
  showItemViTri.value = !showItemViTri.value
}
const saveChange = async () => {
  showDialog.value = false
  emit('onSaveClick')
}
const onDeleteItemViTri = async e => {
  await workingItem.value.viTriBoSung.splice(e, 1)
}
const onDeleteItemChungChi = async e => {
  await workingItem.value.chungChiLienQuan.splice(e, 1)
}
onMounted(() => {
  loadCategory()
})
defineExpose({
  show,
})
</script>
<template>
  <v-row>
    <v-dialog
      v-model="showDialog"
      width="1024px"
      height="1025px"
      :title="cardTitle"
    >
      <v-form
        class="hiddenScroll"
        style="background-color: #2f3349; border-radius: 10px; overflow-y: scroll"
      >
        <VCard>
          <VLabel class="Title">{{ cardTitle }}</VLabel>
        </VCard>
        <v-card style="margin: 20px">
          <v-text-field
            class="my-3"
            v-if="showId"
            v-model="workingItem.taiKhoanId"
            label="Tai Khoan Id"
            required
          >
          </v-text-field>
          <VCombobox
            label="Category"
            :items="categoryData"
            item-title="categoryName"
            item-value="productCategoryID"
          ></VCombobox>
          <v-text-field
            class="my-3"
            v-model="workingItem.viTriTuyenDungId"
            label="Vi Tri Tuyen Dung Id"
            required
          ></v-text-field>
          <v-text-field
            class="my-3"
            v-model="workingItem.fileCV"
            label="File CV"
            required
          ></v-text-field>
          <v-text-field
            class="my-3"
            v-model="workingItem.anhHoSo"
            label="Anh Ho So Tuyen Dung"
            required
          ></v-text-field>
          <v-row style="margin: 15px">
            <h3
              style="cursor: pointer"
              @click="onShowItemChild"
            >
              Chung Chi Lien Quan
            </h3>
            <v-form
              v-show="showChungChiLienQuan"
              style="width: 100%"
            >
              <v-container>
                <v-row
                  v-for="(item, index) in workingItem.chungChiLienQuan"
                  :key="index"
                >
                  <v-col cols="3">
                    <v-text-field
                      v-model="item.tenChungChi"
                      label="Ten Chung Chi"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="item.ketQua"
                      label="Ket Qua"
                      required
                    ></v-text-field> </v-col
                  ><v-col cols="4">
                    <v-text-field
                      v-model="item.fileChungChi"
                      label="File Chung Chi"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-icon @click="onDeleteItemChungChi(index)"> mdi-delete </v-icon>
                  </v-col>
                </v-row>
              </v-container>
              <div
                style="text-align: center"
                @click="onAddItemChungChiLienQuan"
              >
                <v-icon> mdi-plus-circle </v-icon>
              </div>
            </v-form>
          </v-row>
          <v-row style="margin: 15px">
            <h3
              style="cursor: pointer"
              @click="onShowItemChildHoSo"
            >
              Vi Tri Lien Quan
            </h3>
            <v-form
              v-show="showItemViTri"
              style="width: 100%"
            >
              <v-container>
                <v-row
                  v-for="(item, index) in workingItem.viTriBoSung"
                  :key="item.id"
                >
                  <v-col cols="5">
                    <v-text-field
                      v-model="item.tenViTri"
                      label="Ten Vi Tri"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="5">
                    <v-text-field
                      v-model="item.tenViTriTiengAnh"
                      label="Ten Vi Tri Tieng Anh"
                      required
                    ></v-text-field> </v-col
                  ><v-col cols="1"> </v-col>
                  <v-col cols="1">
                    <v-icon @click="onDeleteItemViTri(index)"> mdi-delete </v-icon>
                  </v-col>
                </v-row>
              </v-container>
              <div style="text-align: center">
                <v-combobox
                  v-show="listVitrimodel"
                  v-model="viTriBoSungItem"
                  @update:model-value="addItemVitriValues"
                  item-title="tenViTri"
                  item-value="id"
                  :items="listNhanVien"
                  label="Ten Vi Tri"
                ></v-combobox>
                <v-icon @click="onAddItemVitri()"> mdi-plus-circle </v-icon>
              </div>
            </v-form>
          </v-row>
          <v-row style="float: right; margin: 20px">
            <div>
              <btn
                @click="cancelAction"
                style="
                  color: #e65354;
                  background-color: none;
                  padding: 15px;
                  border: #e65354 1px solid;
                  border-radius: 15px;
                  margin-right: 15px;
                  cursor: pointer;
                "
              >
                Hủy
              </btn>
              <btn
                @click="saveChange"
                style="background-color: #28c76f; color: white; padding: 15px; border-radius: 15px; cursor: pointer"
              >
                Đồng Ý
              </btn>
            </div>
          </v-row>
        </v-card>
      </v-form>
    </v-dialog>
  </v-row>
</template>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
.Title {
  font-size: 45px;
  height: 45px;
  justify-content: center;
  color: green;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.anhhoso {
  padding: 2em;
  width: 100%;
  height: 100%;
  background-origin: content-box;
  background-repeat: no-repeat;
  background-size: contain;
  border: 0.3em solid transparent;
}
</style>

import axios from '@/plugins/axios'
import { isParameter } from 'typescript'
import { ca } from 'vuetify/locale'

const CONTROLLER_NAME = 'ProductCategory'
const CONTROLLER_DELETE = 'Delete'

const GetAll = async () => {
  try {
    const res = await axios.get(`${CONTROLLER_NAME}/GetAll`)
    return res.data
  } catch {
    return null
  }
}

const Category = {
  GetAll,
}

export default Category

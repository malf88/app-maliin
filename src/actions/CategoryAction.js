import { promiseDelete, promiseInfo, promiseUpdate } from '../views/utils/assets/Alerts'
import CategoryService from '../services/CategoryService'

export const insertCategory = async (data, history) => {
  let categoryService = new CategoryService()
  let responseInsertCategory = categoryService.insert(data).then((response) => {
    history.push('/categories')
  })
  promiseInfo('Category insert successful', responseInsertCategory)
}

export const deleteCategory = async (idCategory, categoryListCallback) => {
  let categoryService = new CategoryService()
  let responseDeleteCategory = categoryService.delete(idCategory).then((response) => {
    categoryListCallback([])
  })
  promiseDelete(responseDeleteCategory)
}
export const updateCategory = async (idCategory, data, history) => {
  let categoryService = new CategoryService()
  let responseUpdateCategory = categoryService.update(idCategory, data).then((response) => {
    history.push('/categories')
  })
  promiseUpdate(responseUpdateCategory)
}

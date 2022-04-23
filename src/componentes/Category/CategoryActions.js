import { getServiceWithToken } from '../../library/Service'

export const listCategories = async () => {
  let categories
  await getServiceWithToken()
    .get('/category')
    .then((response) => {
      categories = response.data
    })
  return categories
}

export const insertCategory = async (category) => {
  let message = ''
  await getServiceWithToken().post('/category', category)
  return message
}

export const updateCategory = async (categoryId, category) => {
  let message = ''
  return await getServiceWithToken().put('/category/' + categoryId, category)
}

export const deleteCategory = async (categoryId) => {
  return await getServiceWithToken().delete('/category/' + categoryId)
}

export const getCategory = async (categoryId) => {
  let category = {}
  await getServiceWithToken()
    .get('/category/' + categoryId)
    .then((response) => {
      category = response.data
    })
  return category
}

import service from './Service'

export default class CategoryService {
  async getCategories() {
    const response = await service.get('/category')
    return response
  }

  async insert(data) {
    const response = await service.post('/category', data)
    return response
  }
  async delete(idCategory) {
    const response = await service.delete('/category/' + idCategory)
    return response
  }
  async getCategory(idCategory) {
    const response = await service.get('/category/' + idCategory)
    return response
  }
  async update(idCategory, data) {
    const response = await service.put('/category/' + idCategory, data)
    return response
  }
}

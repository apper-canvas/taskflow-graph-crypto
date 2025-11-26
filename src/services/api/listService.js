import listsData from "../mockData/lists.json"

// Simulate API delay
const delay = (ms = 200) => new Promise(resolve => setTimeout(resolve, ms))

class ListService {
  constructor() {
    this.initializeData()
  }

  initializeData() {
    // Initialize localStorage with mock data if it doesn't exist
    if (!localStorage.getItem("taskflow-lists")) {
      localStorage.setItem("taskflow-lists", JSON.stringify(listsData))
    }
  }

  async getAll() {
    await delay()
    try {
      const data = localStorage.getItem("taskflow-lists")
      return data ? JSON.parse(data) : []
    } catch (error) {
      throw new Error("Failed to load lists")
    }
  }

  async getById(id) {
    await delay()
    try {
      const lists = await this.getAll()
      const list = lists.find(list => list.Id === parseInt(id))
      if (!list) {
        throw new Error("List not found")
      }
      return { ...list }
    } catch (error) {
      throw new Error("Failed to load list")
    }
  }

  async create(listData) {
    await delay()
    try {
      const lists = await this.getAll()
      const newList = {
        Id: Math.max(...lists.map(l => l.Id), 0) + 1,
        ...listData,
        createdAt: Date.now(),
        order: lists.length + 1
      }
      
      const updatedLists = [...lists, newList]
      localStorage.setItem("taskflow-lists", JSON.stringify(updatedLists))
      
      return { ...newList }
    } catch (error) {
      throw new Error("Failed to create list")
    }
  }

  async update(id, listData) {
    await delay()
    try {
      const lists = await this.getAll()
      const listIndex = lists.findIndex(list => list.Id === parseInt(id))
      
      if (listIndex === -1) {
        throw new Error("List not found")
      }
      
      lists[listIndex] = { ...lists[listIndex], ...listData }
      localStorage.setItem("taskflow-lists", JSON.stringify(lists))
      
      return { ...lists[listIndex] }
    } catch (error) {
      throw new Error("Failed to update list")
    }
  }

  async delete(id) {
    await delay()
    try {
      const lists = await this.getAll()
      const updatedLists = lists.filter(list => list.Id !== parseInt(id))
      
      if (lists.length === updatedLists.length) {
        throw new Error("List not found")
      }
      
      localStorage.setItem("taskflow-lists", JSON.stringify(updatedLists))
      
      return true
    } catch (error) {
      throw new Error("Failed to delete list")
    }
  }
}

export default new ListService()
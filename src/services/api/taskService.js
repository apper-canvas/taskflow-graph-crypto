import tasksData from "../mockData/tasks.json"

// Simulate API delay
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms))

class TaskService {
  constructor() {
    this.initializeData()
  }

  initializeData() {
    // Initialize localStorage with mock data if it doesn't exist
    if (!localStorage.getItem("taskflow-tasks")) {
      localStorage.setItem("taskflow-tasks", JSON.stringify(tasksData))
    }
  }

  async getAll() {
    await delay()
    try {
      const data = localStorage.getItem("taskflow-tasks")
      return data ? JSON.parse(data) : []
    } catch (error) {
      throw new Error("Failed to load tasks")
    }
  }

  async getById(id) {
    await delay()
    try {
      const tasks = await this.getAll()
      const task = tasks.find(task => task.Id === parseInt(id))
      if (!task) {
        throw new Error("Task not found")
      }
      return { ...task }
    } catch (error) {
      throw new Error("Failed to load task")
    }
  }

  async create(taskData) {
    await delay()
    try {
      const tasks = await this.getAll()
      const newTask = {
        Id: Math.max(...tasks.map(t => t.Id), 0) + 1,
        ...taskData,
        completed: false,
        createdAt: Date.now(),
        completedAt: null,
        order: tasks.length + 1
      }
      
      const updatedTasks = [...tasks, newTask]
      localStorage.setItem("taskflow-tasks", JSON.stringify(updatedTasks))
      
      return { ...newTask }
    } catch (error) {
      throw new Error("Failed to create task")
    }
  }

  async update(id, taskData) {
    await delay()
    try {
      const tasks = await this.getAll()
      const taskIndex = tasks.findIndex(task => task.Id === parseInt(id))
      
      if (taskIndex === -1) {
        throw new Error("Task not found")
      }
      
      tasks[taskIndex] = { ...tasks[taskIndex], ...taskData }
      localStorage.setItem("taskflow-tasks", JSON.stringify(tasks))
      
      return { ...tasks[taskIndex] }
    } catch (error) {
      throw new Error("Failed to update task")
    }
  }

  async delete(id) {
    await delay()
    try {
      const tasks = await this.getAll()
      const updatedTasks = tasks.filter(task => task.Id !== parseInt(id))
      
      if (tasks.length === updatedTasks.length) {
        throw new Error("Task not found")
      }
      
      localStorage.setItem("taskflow-tasks", JSON.stringify(updatedTasks))
      
      return true
    } catch (error) {
      throw new Error("Failed to delete task")
    }
  }

  async complete(id) {
    await delay()
    try {
      const task = await this.getById(id)
      return await this.update(id, {
        completed: !task.completed,
        completedAt: !task.completed ? Date.now() : null
      })
    } catch (error) {
      throw new Error("Failed to complete task")
    }
  }
}

export default new TaskService()
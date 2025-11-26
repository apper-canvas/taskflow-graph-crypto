import TaskList from "@/components/organisms/TaskList"
import { useState, useEffect } from "react"

const AllTasksPage = () => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const savedLists = localStorage.getItem("taskflow-lists")
    if (savedLists) {
      setLists(JSON.parse(savedLists))
    }
  }, [])

  return (
    <TaskList 
      filter="all"
      title="All Tasks"
      lists={lists}
    />
  )
}

export default AllTasksPage
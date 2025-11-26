import TaskList from "@/components/organisms/TaskList"
import { useState, useEffect } from "react"

const UpcomingPage = () => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const savedLists = localStorage.getItem("taskflow-lists")
    if (savedLists) {
      setLists(JSON.parse(savedLists))
    }
  }, [])

  return (
    <TaskList 
      filter="upcoming"
      title="Upcoming Tasks"
      lists={lists}
    />
  )
}

export default UpcomingPage
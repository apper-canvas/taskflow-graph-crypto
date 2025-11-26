import TaskList from "@/components/organisms/TaskList"
import { useState, useEffect } from "react"
import { format } from "date-fns"

const TodayPage = () => {
  const [lists, setLists] = useState([])

  useEffect(() => {
    const savedLists = localStorage.getItem("taskflow-lists")
    if (savedLists) {
      setLists(JSON.parse(savedLists))
    }
  }, [])

  const today = format(new Date(), "EEEE, MMMM d")

  return (
    <TaskList 
      filter="today"
      title={`Today • ${today}`}
      lists={lists}
    />
  )
}

export default TodayPage
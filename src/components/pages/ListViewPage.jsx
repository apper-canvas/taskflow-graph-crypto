import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import TaskList from "@/components/organisms/TaskList"
import { useNavigate } from "react-router-dom"

const ListViewPage = () => {
  const { listId } = useParams()
  const navigate = useNavigate()
  const [lists, setLists] = useState([])
  const [currentList, setCurrentList] = useState(null)

  useEffect(() => {
    const savedLists = localStorage.getItem("taskflow-lists")
    if (savedLists) {
      const parsedLists = JSON.parse(savedLists)
      setLists(parsedLists)
      
      const list = parsedLists.find(l => l.Id === parseInt(listId))
      if (list) {
        setCurrentList(list)
      } else {
        // List not found, redirect to all tasks
        navigate("/")
      }
    } else {
      navigate("/")
    }
  }, [listId, navigate])

  if (!currentList) {
    return null // Will redirect
  }

  return (
    <TaskList 
      filter="list"
      listId={parseInt(listId)}
      title={currentList.name}
      lists={lists}
    />
  )
}

export default ListViewPage
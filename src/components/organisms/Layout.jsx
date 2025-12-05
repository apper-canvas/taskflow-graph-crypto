import { useState, useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Sidebar from "@/components/organisms/Sidebar"
import MobileSidebar from "@/components/organisms/MobileSidebar"
import QuickAddBar from "@/components/organisms/QuickAddBar"

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [lists, setLists] = useState([])
  const location = useLocation()

  useEffect(() => {
    // Load lists from localStorage on mount
    const savedLists = localStorage.getItem("taskflow-lists")
    if (savedLists) {
      setLists(JSON.parse(savedLists))
    } else {
      // Create default lists
      const defaultLists = [
        {
          Id: 1,
          name: "Work",
          color: "#6366F1",
          createdAt: Date.now(),
          order: 1
        },
        {
          Id: 2,
          name: "Personal",
          color: "#8B5CF6",
          createdAt: Date.now(),
          order: 2
        }
      ]
      setLists(defaultLists)
      localStorage.setItem("taskflow-lists", JSON.stringify(defaultLists))
    }
  }, [])

  const handleAddList = (newList) => {
    const updatedLists = [...lists, newList]
    setLists(updatedLists)
    localStorage.setItem("taskflow-lists", JSON.stringify(updatedLists))
  }

  const handleDeleteList = (listId) => {
    const updatedLists = lists.filter(list => list.Id !== listId)
    setLists(updatedLists)
    localStorage.setItem("taskflow-lists", JSON.stringify(updatedLists))
  }

  const closeSidebar = () => setSidebarOpen(false)

  // Close mobile sidebar on route change
  useEffect(() => {
    setSidebarOpen(false)
  }, [location])

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Mobile Sidebar Overlay */}
      <MobileSidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
        lists={lists}
        onAddList={handleAddList}
        onDeleteList={handleDeleteList}
      />

      {/* Desktop Layout */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar 
            lists={lists}
            onAddList={handleAddList}
            onDeleteList={handleDeleteList}
          />
        </div>

        {/* Main Content */}
<div className="flex-1 lg:ml-0">
          {/* Mobile Header */}
<div className="lg:hidden bg-surface border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">TaskFlow Ultra Pro Max</h1>
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Quick Add Bar */}
          <QuickAddBar lists={lists} />

          {/* Page Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout
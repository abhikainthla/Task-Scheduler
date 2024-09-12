import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Tasks from './components/Tasks'
import PrevTasks from './components/PrevTasks'

function App() {

  return (
    <>
      <Tasks/>
      <PrevTasks/>
    </>
  )
}

export default App

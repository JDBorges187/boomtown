import React, { useState, useEffect } from 'react'
import ReposTable from './components/ReposTable'
import TopLevel from './components/TopLevel'
import EventsTable from './components/EventsTable'
import MembersTable from './components/MembersTable'

export default function App() {

  const [topLevel, setTopLevel] = useState([])
  const [urls, setUrls] = useState([])

  useEffect(() => {
    console.log("Hello from App.js")
    async function fetchData() {
        const res = await fetch('https://api.github.com/orgs/boomtownroi');
        const resData = await res.json();
        setTopLevel(Object.entries(resData))
        console.log(resData.repos_url)
    }
    fetchData();
}, [])

  return (
    <>
      <h1>Jorge Borges Tech Assessment</h1>
      <TopLevel topLevel={topLevel} />
      <ReposTable />
      <EventsTable />
      <MembersTable />
    </>
  )
}

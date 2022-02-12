import React from 'react'
import ReposTable from './components/ReposTable'
import TopLevel from './components/TopLevel'
import EventsTable from './components/EventsTable'
import MembersTable from './components/MembersTable'

export default function App() {
  return (
    <>
      <h1>App</h1>
      <TopLevel />
      <ReposTable />
      <EventsTable />
      <MembersTable />
    </>
  )
}

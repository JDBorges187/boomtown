import React, { useState, useEffect } from 'react'
import { Container, Row , Col} from 'react-bootstrap'
import ReposTable from './components/ReposTable'
import TopLevel from './components/TopLevel'
import EventsTable from './components/EventsTable'
import MembersTable from './components/MembersTable'

export default function App() {

  const [topLevel, setTopLevel] = useState([]);
  const [reposUrl, setReposUrl] = useState("");
  const [eventsUrl, setEventsUrl] = useState("");
  const [hooksUrl, setHooksUrl] = useState("");
  const [issuesUrl, setIssuesUrl] = useState("");
  const [membersUrl, setMembersUrl] = useState("");

  useEffect(() => {
    console.log("Hello from App.js")
    async function fetchData() {
      const res = await fetch('https://api.github.com/orgs/boomtownroi');
      const resData = await res.json();
      setTopLevel(Object.entries(resData))
      setReposUrl(resData.repos_url)
      setEventsUrl(resData.events_url)
      setHooksUrl(resData.hooks_url)
      setIssuesUrl(resData.issues_url)
      setMembersUrl(resData.members_url)
    }
    fetchData();
  }, [])

  return (
    <>
      <Container>
        <Row>
          <Col><h1>Jorge Borges Tech Assessment</h1></Col>
        </Row>
        {/* <Row>
          <Col><TopLevel topLevel={topLevel} /></Col>
        </Row> */}
        <Row>
          <Col><ReposTable reposUrl={reposUrl}/></Col>
        </Row>
        <Row>
          <Col><EventsTable eventsUrl={eventsUrl}/></Col>
        </Row>
        <Row>
          <Col><MembersTable membersUrl={membersUrl} /></Col>
        </Row>
      </Container>      
    </>
  )
}

import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import TopLevel from './components/TopLevel'
import ReposTable from './components/ReposTable'
import EventsTable from './components/EventsTable'
import Hooks from './components/Hooks'
import Issues from './components/Issues'
import MembersTable from './components/MembersTable'

export default function App() {
  const [errors, setErrors] = useState([]);
  const [topLevel, setTopLevel] = useState([]);
  const [reposUrl, setReposUrl] = useState("");
  const [eventsUrl, setEventsUrl] = useState("");
  const [hooksUrl, setHooksUrl] = useState("");
  const [issuesUrl, setIssuesUrl] = useState("");
  const [membersUrl, setMembersUrl] = useState("");
  const [reposFromArray, setReposFromArray] = useState(0);
  const [reposFromTopLevel, setReposFromTopLevel] = useState(0);
  const [dateValid, setDateValid] = useState(false);
  const [rateLimitRemaining, setRateLimitRemaining] = useState(0);

  useEffect(() => {

    async function fetchData() {
      // Fetch the top level data
      const res = await fetch('https://api.github.com/orgs/boomtownroi');
      if (!res.ok) { // If the response is not OK, set the error state
        const resData = await res.json();
        setErrors(errors => [...errors, resData.message, resData.documentation_url]);
        const reset = new Date(res.headers.get('X-RateLimit-reset')*1000).toLocaleString();
        setErrors(errors => [...errors, "Reset at: " + reset]);
        return
      };
      const resData = await res.json();
      setRateLimitRemaining(res.headers.get('X-RateLimit-Remaining'));
      setDateValid(()=> isDateValid(resData))
      setTopLevel(Object.entries(resData));
      setReposFromTopLevel(resData.public_repos);
      // Pull URLS from the top level data
      setReposUrl(resData.repos_url);
      setEventsUrl(resData.events_url);
      setHooksUrl(resData.hooks_url);
      setIssuesUrl(resData.issues_url);
      setMembersUrl(resData.members_url.split('{')[0]);
    }
    fetchData();
  },[])

  // verify updated_at is greater tham created_at
  const isDateValid = (res) => {
    const created_at = new Date(res.created_at);
    const updated_at = new Date(res.updated_at);
    return updated_at >= created_at;
  }

  // When github ratelimit is exceeded, the response is a 403
  if (errors.length > 0) {
    return (
      <Container>
        <Row>
          <Col><h1>Jorge Borges Tech Assessment</h1></Col>
        </Row>
        <Row>
          <Col>
            {errors.map((error, i) => <Alert key={i} variant="danger">{error}</Alert>)}
          </Col>
        </Row>
      </Container>

    )
  };

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
          <Col>
            <ReposTable
              reposUrl={reposUrl}
              reposFromArray={reposFromArray}
              setReposFromArray={setReposFromArray} />
          </Col>
        </Row>
        <Row>
          <Col><EventsTable eventsUrl={eventsUrl} /></Col>
        </Row>
        <Row>
          <Col><Hooks hooksUrl={hooksUrl} /></Col>
        </Row>
        <Row>
          <Col><Issues issuesUrl={issuesUrl} /></Col>
        </Row>
        <Row>
          <Col><MembersTable membersUrl={membersUrl} /></Col>
        </Row>
        <Row>
          <Col>
            <h2>Verifications:</h2>
            <Alert variant={dateValid ? "success" : "danger"}>
              {dateValid ? "Date is valid" : "Date is invalid"}
            </Alert>
            <Alert variant={
              reposFromArray === reposFromTopLevel ? "success" : "danger"
            }>
              <p>Repos from array: {reposFromArray}</p>
              <p>Repos from top level: {reposFromTopLevel}</p>
            </Alert>
            <Alert variant={rateLimitRemaining < 20 ? "danger" : "primary"}>
              Github API Requests Remaining: {rateLimitRemaining}
            </Alert>
          </Col>
        </Row>
      </Container>
    </>
  )
}

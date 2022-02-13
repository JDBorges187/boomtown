import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';

export default function EventsTable({ eventsUrl }) {
    const [events, setEvents] = useState([])

    useEffect(() => {
        if (!eventsUrl) return;
        async function fetchData() {
            const res = await fetch(eventsUrl);
            const resData = await res.json();
            setEvents(resData);
        }
        fetchData();

    }, [eventsUrl])

    return (
        <>
            <h2>Events Table</h2>
            <p>{eventsUrl}</p>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Event ID</th>
                        <th>Type</th>
                        <th>User</th>
                        <th>Repo</th>
                        <th>Created At</th>
                    </tr>
                </thead>
                <tbody>
                    {events && events.map((event, index) => {
                        return (
                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.type}</td>
                                <td>{event.actor.display_login}</td>
                                <td>
                                    <a href={`https://github.com/${event.repo.name}`} target="_blank" rel="noopener noreferrer">{event.repo.name}</a>
                                </td>
                                <td>
                                    {event.created_at}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

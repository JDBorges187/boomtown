import React from 'react';
import { Table} from 'react-bootstrap';

export default function EventsTable({ eventsUrl }) {
  return (
    <>
            <h2>Events Table</h2>
            <p>{eventsUrl}</p>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </tbody>
            </Table>
        </>
  )
}

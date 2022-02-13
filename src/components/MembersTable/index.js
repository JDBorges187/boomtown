import React, { useEffect } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'

export default function MembersTable({ membersUrl }) {
    const [members, setMembers] = React.useState([]);

    useEffect(() => {
        if (!membersUrl) return;
        async function fetchData() {
            const res = await fetch(membersUrl);
            if (res.ok) {
                const resData = await res.json();
                setMembers(resData);
            }
        }
        fetchData();

    }
        , [membersUrl]);


    return (
        <>
            <h2>Members</h2>
            <p>{membersUrl}</p>
            <Container>
                <Row xs={1} sm={2} md={3}>
                    {members.length > 0 && members.map((user) => (
                        <Col key={user.id}>
                            <Card>
                                <Card.Img variant="top" src={user.avatar_url} />
                                <Card.Body>

                                    <Card.Link href={user.html_url} className="stretched-link">
                                        <Card.Title>{user.login}</Card.Title>
                                    </Card.Link>
                                    <Card.Subtitle>User ID : {user.id}</Card.Subtitle>
                                    <Card.Text>
                                        This is user is {user.site_admin ? 'an admin' : 'not an admin'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

        </>
    )
}

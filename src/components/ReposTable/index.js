import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'

export default function ReposTable({ reposUrl }) {
    
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        if(!reposUrl) return;
        async function fetchData() {
            const res = await fetch(reposUrl);
            const resData = await res.json();
            setRepos(resData);
        }
        fetchData();
    
    }, [reposUrl])

    return (
        <>
            <h2>Repos Table</h2>
            <p>{reposUrl}</p>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Repo ID</th>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Last Updated</th>
                        <th>Links</th>
                    </tr>
                </thead>
                <tbody>
                    {repos && repos.map((repo) => {
                        return (
                            <tr key={repo.id}>
                                <td>{repo.id}</td>
                                <td>{repo.name}</td>
                                <td>{repo.owner.login}</td>
                                <td>{repo.updated_at}</td>
                                <td>
                                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">Link</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
}

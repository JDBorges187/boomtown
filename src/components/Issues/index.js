import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';

export default function Issues({ issuesUrl }) {
    const [issues, setIssues] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!issuesUrl) return;
        async function fetchData() {
            const res = await fetch(issuesUrl);
            if (res.ok) {
                const resData = await res.json();
                setIssues(resData);
            } else {
                const resData = await res.json();
                // setError(resData.message);
                setError("There be no issues, matey!");
            }
        }
        fetchData();
    }
        , [issuesUrl]);


    return (
        <>
            <h2>Issues</h2>
            <p>{issuesUrl}</p>
            {error && <Alert variant="danger">{error}</Alert>}
            {issues.length > 0 &&
                (<ul>
                    {issues.map((_, i) => <li key={i}>{_.name}</li>)}
                </ul>)}
        </>

    )
}

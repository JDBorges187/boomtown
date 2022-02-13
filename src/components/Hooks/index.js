import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';

export default function Hooks({ hooksUrl }) {
    const [hooks, setHooks] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!hooksUrl) return;
        async function fetchData() {
            const res = await fetch(hooksUrl);
            if (res.ok) {
                const resData = await res.json();
                setHooks(resData);
            } else {
                const resData = await res.json();
                // setError(resData.message);
                setError("Arrgh!! No Hooks, matey!");
            }
        }
        fetchData();
    }
        , [hooksUrl]);


    return (
        <>
            <h2>Hooks</h2>
            <p>{hooksUrl}</p>
            {error && <Alert variant="danger">{error}</Alert>}
            {hooks.length > 0 &&
                (<ul>
                    {hooks.map((hook, i) => <li key={i}>{hook.name}</li>)}
                </ul>)}
        </>

    )
}

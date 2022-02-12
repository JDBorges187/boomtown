import React, { useEffect, useState } from 'react'
import { Alert } from 'react-bootstrap';


export default function TopLevel({ topLevel }) {

    const [topLevelData, setTopLevelData] = useState([])

    useEffect(() => {
        setTopLevelData(topLevel.map(([key, value]) => {
            const variant = key.includes('url') ?
                value.includes('api.github.com/orgs/BoomTownROI/') ? 'success' : 'danger' : 'primary'
            return (
                <Alert key={key} variant={variant}>
                    <b>{key}:</b> {value}
                </Alert>
            );
        }))
    }, [topLevel])



    return (
        <>
            <h2>Top Level Response</h2>
            <ul>{topLevelData || null}</ul>
        </>
    )
}

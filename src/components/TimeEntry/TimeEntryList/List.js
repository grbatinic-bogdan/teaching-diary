import React from 'react';

import { ListGroup, ListGroupItem } from 'reactstrap';

export default ({timeEntries: {result, entities}}) => {
    if (result.length === 0) {
        // no time entries, return empty content for now
        return (
            <div></div>
        )

    }
    return (
        <div>
            <ListGroup>
                {result.map((timeEntryId) => {
                    const timeEntry = entities.timeEntry[timeEntryId];
                    return <ListGroupItem key={timeEntryId}>{timeEntry.name}</ListGroupItem>
                })}
            </ListGroup>
        </div>
    );
}
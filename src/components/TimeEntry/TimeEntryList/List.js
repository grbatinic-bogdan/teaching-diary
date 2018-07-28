import React from 'react';
import moment from 'moment';
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
                    const location = entities.location[timeEntry.location]
                    const hasLocation = location && location.address;
                    const time = moment(timeEntry.time);
                    const timeFormat = time.format('DD.MM.YYYY');
                    return (
                        <ListGroupItem key={timeEntryId}>
                            <h3>{timeEntry.name}</h3>
                            <p>
                                {timeFormat} {hasLocation && ` @ ${location.address}`}
                            </p>

                        </ListGroupItem>
                    )
                })}
            </ListGroup>
        </div>
    );
}
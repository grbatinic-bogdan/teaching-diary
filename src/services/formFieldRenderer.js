import React from 'react';
import { Input } from 'reactstrap';

export default (props) => {
    const {
        input,
        meta: {
            touched,
            error,
            warning
        },
        ...custom
    } = props;

    return (
        <div>
            <Input {...input}  {...custom} />
            {touched &&
                ((error && <span>{error}</span>) ||
                (warning && <span>{warning}</span>))}
        </div>

    )

}
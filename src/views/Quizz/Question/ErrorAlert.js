import React, {Component} from 'react';
import {Alert} from 'reactstrap';
export default class ErrorAlert extends Component
{
    render(){
        return(
            <Alert color="danger">
                 Failed
                </Alert>
        )
    }
}
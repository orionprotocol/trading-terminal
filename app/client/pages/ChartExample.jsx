import React from 'react';
import Chart from './../../client/components/Chart'
import ReactDOM from 'react-dom';

class ChartExample extends React.Component {

    constructor() {
        super();
        this.state = {}

    }

    componentDidMount() {
    }

    render() {
        return (
            <div style={{marginLeft: '150px', paddingLeft: '10px', paddingTop: '5px',height:'100px',width:'100px'}}>
                <Chart/>
            </div>
        );
    }
}
;

export default ChartExample;
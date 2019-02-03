import React from 'react';
import ReactDOM from 'react-dom';
import Chart from './../../client/components/Chart'

import {Modal} from 'react-bootstrap'


class Modals extends React.Component {

    constructor() {
        super();
        this.state = {
            showModal: true
        }
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }


    componentDidMount() {
    }

    handleCloseModal() {
        console.log("Close modal")
    }

    render() {
        const windowHeight = window.innerHeight;
        const chartHeight = windowHeight * 0.45;
        return (
            <div style={{paddingLeft: '10px', paddingTop: '5px'}}>
                <Modal dialogClassName="modal-big" show={this.state.showModal} onHide={this.handleCloseModal}>
                    <Modal.Body>
                        <div style={{backgroundColor: '#fff'}}>
                            <div>
                                <div className='row'>
                                    <div style={{float:'left',width:'35%'}}>
                                        <Chart height={chartHeight} id="first_chart"/>
                                    </div>
                                    <div style={{float:'left',width:'35%'}}>
                                        <Chart height={chartHeight} id="second_chart"/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div style={{float:'left',width:'35%'}}>
                                        <Chart height={chartHeight} id="third_chart"/>
                                    </div>
                                    <div style={{float:'left',width:'35%'}}>
                                        <Chart height={chartHeight} id="fourth_chart"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
;

export default Modals;
import React from 'react';
import ReactDOM from 'react-dom';

class Balance extends React.Component {

    constructor() {
        super();
        this.state = {}

    }

    componentDidMount() {
    }

    render() {
        return (
            <div style={{paddingRight: '20px', paddingLeft: '10px', paddingTop: '5px',height:'100%'}}>
                <div>
                    <button className="btn  balance-btn">
                        Deposit
                    </button>
                    <button style={{marginLeft: '10px'}} className="btn balance-btn">
                        Withdraw
                    </button>
                </div>
                <div style={{backgroundColor: '#fff', marginTop: '20px'}}>
                    <table id="balance" style={{width: '100%', height: '100%', minHeight: '100%'}}>
                        <thead>
                        <td>
                            Имя токена
                        </td>
                        <td>
                            Баланс
                        </td>
                        <td>
                            Зарезервировано
                        </td>
                        <td>
                            Стоимость, USD
                        </td>
                        <td>
                            Цена, USD
                        </td>
                        <td>
                            Изменение, 24ч
                        </td>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                                <div className="row" style={{marginLeft:'5px'}}>
                                    <div className="col-md-6" style={{
                                        width: '30px',
                                        height: '30px',
                                        backgroundImage: 'url(/resources/img/waves.svg)'
                                    }}>
                                    </div>
                                    <div className="col-md-6" style={{paddingTop:'5px'}}>
                                        Waves
                                    </div>
                                </div>
                            </td>
                            <td>
                                <b>10000</b>
                            </td>
                            <td>
                                5000
                            </td>
                            <td>
                                100
                            </td>
                            <td>
                                100
                            </td>
                            <td>
                                0.75%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="row" style={{marginLeft:'5px'}}>
                                    <div className="col-md-6" style={{
                                        width: '30px',
                                        height: '30px',
                                        backgroundSize:'100% 100%',
                                        backgroundImage: 'url(/resources/img/bitcoin.svg)'
                                    }}>
                                    </div>
                                    <div className="col-md-6" style={{paddingTop:'5px'}}>
                                        BTC
                                    </div>
                                </div>
                            </td>
                            <td>
                                <b>10000</b>
                            </td>
                            <td>
                                5000
                            </td>
                            <td>
                                100
                            </td>
                            <td>
                                100
                            </td>
                            <td>
                                0.75%
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <div className="row" style={{marginLeft:'5px'}}>
                                    <div className="col-md-6" style={{
                                        width: '30px',
                                        height: '30px',
                                        backgroundSize:'100% 100%',
                                        backgroundImage: 'url(/resources/img/ethereum.svg)'
                                    }}>
                                    </div>
                                    <div className="col-md-6" style={{paddingTop:'5px'}}>
                                        Ethereum
                                    </div>
                                </div>
                            </td>
                            <td>
                                <b>10000</b>
                            </td>
                            <td>
                                5000
                            </td>
                            <td>
                                100
                            </td>
                            <td>
                                100
                            </td>
                            <td>
                                0.75%
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
;

export default Balance;
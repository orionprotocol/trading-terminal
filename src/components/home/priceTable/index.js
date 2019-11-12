import React, {Fragment,useState,useEffet} from 'react'
import { Table } from 'antd';
import './index.css'
export default function PriceTable () {
    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a>b
          },
          {
            title: 'Pair',
            dataIndex: 'pair',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a>b
          },
          {
            title: 'Time',
            dataIndex: 'time',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a>b
          },
          {
            title: 'Amount',
            dataIndex: 'amount',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a>b
          },
          {
            title: 'Price',
            dataIndex: 'price',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.price>b.price
          },
          {
            title: 'Status',
            dataIndex: 'status',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a>b
          },
          {
            title: 'Total',
            dataIndex: 'total',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.Total>b
          },
      /*   {
          title: 'Status',
          dataIndex: 'status',
          // specify the condition of filtering result
          // here is that finding the name started with `value`
         // onFilter: (value, record) => record.name.indexOf(value) === 0, 
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend'],
        },
        {
          title: 'Age',
          dataIndex: 'age',
          defaultSortOrder: 'descend',
          sorter: (a, b) => a.age - b.age,
        },
        {
          title: 'Address',
          dataIndex: 'address',
          filterMultiple: false,
          onFilter: (value, record) => record.address.indexOf(value) === 0,
          sorter: (a, b) => a.address.length - b.address.length,
          sortDirections: ['descend', 'ascend'],
        }, */
      ];
    let pricetable='price-table'
let dummyDate=Date.now()
      const data = [
        {
          key: '1',
          type: 'sell',
          pair: 'ETH/BTC',
          time: dummyDate,
          amount: 0.004422124,
          price: 0.000042142,
          status: (<span style={{color:'#FDCD6F'}}> Filled </span>),
          total: 1.4422124,
        },
        {
            key: '1',
            type: 'sell',
            pair: 'ETH/BTC',
            time: dummyDate,
            amount: 0.004422124,
            price: 0.000042142,
            status: (<span style={{color:'#5DCD91'}}> Open </span>),
            total: 1.4422124,
          },
          {
            key: '1',
            type: 'sell',
            pair: 'ETH/BTC',
            time: dummyDate,
            amount: 0.004422124,
            price: 0.000042142,
            status: (<span style={{color:'#F65375'}}> Cancel </span>),
            total: 1.4422124,
          },
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#FDCD6F'}}> Filled </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#5DCD91'}}> Open </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#F65375'}}> Cancel </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#FDCD6F'}}> Filled </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#5DCD91'}}> Open </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#F65375'}}> Cancel </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#FDCD6F'}}> Filled </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#5DCD91'}}> Open </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#F65375'}}> Cancel </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#FDCD6F'}}> Filled </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#5DCD91'}}> Open </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#F65375'}}> Cancel </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#FDCD6F'}}> Filled </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#5DCD91'}}> Open </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#F65375'}}> Cancel </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#FDCD6F'}}> Filled </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#5DCD91'}}> Open </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#F65375'}}> Cancel </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#FDCD6F'}}> Filled </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#5DCD91'}}> Open </span>),total: 1.4422124},
          {key: '1',type: 'sell',pair: 'ETH/BTC',time: dummyDate,amount: 0.004422124,price: 0.000042142,status: (<span style={{color:'#F65375'}}> Cancel </span>),total: 1.4422124},
       
      ];

      function onChange(pagination, filters, sorter, extra) {
        console.log('params', pagination, filters, sorter, extra);
      }
    return(
        <Fragment>
            <Table pagination={false}  columns={columns} dataSource={data} onChange={onChange} />
        </Fragment>
    )
}
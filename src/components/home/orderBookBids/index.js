import React,{Fragment,useState} from 'react';
import eth from '../../../style/media/eth.png'
import bit from '../../../style/media/bitcoin.png'
import arrow from '../../../style/media/arrow-down.svg'
import './index.css'
const Index = (props) => {
    const [colorAmount, setcolorAmount] = useState({up:'green',down:'red'})
let array=[]

for(let x=0;x<100;x++){
    array.push({
      key: x,
      class:'',
      price: 0.0174,
      amount: 0.5125,
      total: 20.4124,
      exch: (
        <Fragment>
          <img src={eth} alt="" />
          <img src={bit} alt="" />
          <img src={arrow} className='arrow-exch'alt="" />
        </Fragment>
      )
    });
}
let rows = array.map((res,key)=>{
    return(
         <tr className='table-rows' key={key}>
            <td className='table-rows' >
                <div class="tooltip1" style={{width:'45px'}}> 
                {res.price}
                  <span class="tooltiptext1 green" style={{width:  `${Math.random()*54}px` }}>  </span>
                </div>
            </td>
            <td className={`${colorAmount.up}`}>{res.amount}</td>
            <td>{res.total}</td>
            <td>{res.exch}</td>
         </tr> 
    )
}) 

console.log(array)
    return (
        
            <div className='bids-table' >

           <table className='bids-table' >
                <thead className='bids-table-head'>
                    <tr className='table-rows'>
                        <th className='table-header'>Price</th>
                        <th>Amount</th>
                        <th>Total</th>
                        <th>Exch</th>
                    </tr>
                </thead>
                <tbody className='bids-table-body'>
                    {rows}
                </tbody>
           </table>
            </div>
       
    );
};

export default Index;

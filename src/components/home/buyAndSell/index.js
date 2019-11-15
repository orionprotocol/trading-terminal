import React, {Fragment,useState} from 'react'

import './index.css'
import BuyAndSellForm from './form'


export default function BuyAndSell(){
const [activeTab,setActiveTab]=useState({buy:'buy-tab active',sell:'sell-tab',type:'buy'})
const [activeButton,setActiveButton]=useState({left:'market-button active',rigth:'limit-order-button',type:'market'})
    
    return(
        <Fragment>
                <div>
                    <div className={activeTab.buy} onClick={()=>setActiveTab({buy:'buy-tab active',sell:'sell-tab',type:'buy'})}  >Buy</div>
                    <div className={activeTab.sell} onClick={()=>setActiveTab({buy:'buy-tab',sell:'sell-tab active',type:'sell'})} >Sell</div>
                </div>
                <div>
                    <div className='buttons-options'>
                        <button className={activeButton.left} onClick={()=>setActiveButton({left:'market-button active',rigth:'limit-order-button',type:'market'})}>Market</button>
                    </div>
                    <div className='buttons-options'>
                        <button className={activeButton.rigth} onClick={()=>setActiveButton({left:'market-button',rigth:'limit-order-button active',type:'limit-order'})}>Limit order</button>
                    </div>
                </div>
                <div className="buy-and-sell-form">
                    <BuyAndSellForm type={{trade:activeTab.type,selection:activeButton.type}}/>
                </div>
        </Fragment>
    )
}
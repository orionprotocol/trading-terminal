import React, {Fragment,useState,useEffect} from 'react'
import {Row,Col, Layout,Card, Icon,Select } from 'antd'
import './index.css'
export default function BuyAndSell(){
const [activeTab,setActiveTab]=useState({buy:'buy-tab active',sell:'sell-tab'})
const [activeButton,setActiveButton]=useState({left:'sell-buy-button active',rigth:'sell-buy-button'})
    return(
        <Fragment>
          
           
                <div className={activeTab.buy} onClick={()=>setActiveTab({buy:'buy-tab active',sell:'sell-tab'})}  >Buy</div>

                <div className={activeTab.sell} onClick={()=>setActiveTab({buy:'buy-tab',sell:'sell-tab active'})} >Sell</div>

                    <div className='buttons-options'>
                        <button className={activeButton.left} onClick={()=>setActiveButton({left:'sell-buy-button active',rigth:'sell-buy-button'})}>Market</button>
                    </div>
                    <div className='buttons-options'>
                        <button className={activeButton.rigth} onClick={()=>setActiveButton({left:'sell-buy-button',rigth:'sell-buy-button active'})}>Limit order</button>
                    </div>
         dfafd
        </Fragment>
    )
}
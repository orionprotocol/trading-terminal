import React,{Fragment,useState} from 'react'
import Modal from './modal'
import './index.css'
import start from '../../../style/media/star.png'
import growth from '../../../style/media/growth.png'
import arrow from '../../../style/media/arrow-down.svg'
export default function CommonInfo(){
    const [arrowStyle, setArrowStyle]=useState({arrow:'common-info-arrow down',modal:'none'})
    const [currencyModal, setCurrencyModal]=useState({selector:['BTC','USD','ETH / BTC','NEO','EOS'], selection:['buttons','buttons','buttons active','buttons','buttons']})
    return(
        <Fragment>
            <div className='common-info-top'>
                <div className='common-info-top-left'>
                    <img src={start} alt=''/>
                    <span style={{marginLeft:'7px',color:'#514E61'}}>PAIR</span>
                </div>
                <div className='common-info-top-rigth'>
                   
                    <div style={{cursor:'pointer'}} onClick={()=>setArrowStyle({arrow:'common-info-arrow up',modal:'block'})}>
                         <span style={{fontSize:'16px',color:'rgba(20,16,41,0.8)',fontWeight:'600'}}>
                         {currencyModal.selection[0]==='buttons active' && currencyModal.selector[0]} 
                        {currencyModal.selection[1]==='buttons active' && currencyModal.selector[1]} 
                        {currencyModal.selection[2]==='buttons active' && currencyModal.selector[2]} 
                        {currencyModal.selection[3]==='buttons active' && currencyModal.selector[3]} 
                        {currencyModal.selection[4]==='buttons active' && currencyModal.selector[4]}
                        </span>
                        <img src={arrow} className={arrowStyle.arrow} alt=''></img>  
                    </div>
                    

                <div style={{display:arrowStyle.modal}}>
                    <Modal arrowStyle={arrowStyle}  setArrowStyle={setArrowStyle} currencyModal={currencyModal} setCurrencyModal={setCurrencyModal} />
                </div>
                    
                </div>
            </div>

            <div className='common-info-middle top'>
                <div className='common-info-middle-left'>
                    <span >Last price</span>
                </div>
                <div className='common-info-middle-rigth'>
                    <span style={{marginRight:'19px'}}>24h change</span>
                </div>
            </div>
            <div className='common-info-middle'>
                <div >
                    <span className='emp'>0.0174</span>
                    <span className='dollars'>$174.41</span>
                </div>
                <div className='common-info-middle-rigth'>
                    <span ><img src={growth} alt=''/> </span>
                    <span className='emp'>+4.42%</span>
                </div>
            </div>


            <div className='common-info-bottom'>
                <div >
                <div className='common-info-bottom-left'>
                    <span >24h High</span>
                </div>
                </div>
                <div className='common-info-bottom-rigth'>
                    <span className="numbers" >0.015200</span>
                    <span className='price'>$180.41</span>
                </div>
            </div>
            <div className='common-info-bottom'>
                <div >
                <div className='common-info-bottom-left'>
                    <span >24h Low</span>
                </div>
                </div>
                <div className='common-info-bottom-rigth'>
                    <span className="numbers" >0.015200</span>
                    <span className='price'>$180.41</span>
                </div>
            </div>
            <div className='common-info-bottom'>
                <div >
                <div className='common-info-bottom-left'>
                    <span >24h Vol</span>
                </div>
                </div>
                <div className='common-info-bottom-rigth'>
                    <span className="numbers" >0.015200</span>
                    <span className='price'>$180.41</span>
                </div>
            </div>
            

        </Fragment>
    )
}
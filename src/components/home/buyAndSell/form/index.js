import React, {Fragment,useState} from 'react'
import { Formik, Form, Field } from 'formik';
import validate from './validation'

export default function BuyAndSellForm ({type}){
    console.log("viene del form",type.trade,type.selection)

    const[values,/* setValues */]=useState({
        amount:'',available:'0.00001123',price:'',percent:'',total:''
    })

    return(
        <Fragment>
            <Formik
            initialValues={values}
            validationSchema={validate}
            onSubmit={values => {
                console.log(values);
            }}
           
            >
            {({ errors, touched,setFieldValue }) => (
                <Form >
                    <div>
                    <span style={{marginLeft:'10px'}}>Amount</span>
                        <Field className='form-fields-buyandsell after' name="amount" type='number'/>
                        <label style={{position:'absolute',fontSize:'16px',color:'#706E7D',marginLeft:'-40px',marginTop:'7px'}}>ETH</label>
                        {errors.amount && touched.amount ? (<div>{errors.amount}</div>) : null}
                        
                    </div>
                       {type.selection==='limit-order'&&
                        <div>
                            <span style={{marginLeft:'10px'}}>Price</span>
                            <Field className='form-fields-buyandsell after' name="price" type='number'/>
                            {errors.price && touched.price ? (<div>{errors.price}</div>) : null}
                        </div>
                        }
                    <div style={{justifyContent:'space-between',display:'flex'}}>
                        <span style={{marginLeft:'10px'}}>Available</span> <span>{values.available}  BTC</span>
                    </div>
                    <div className='percent-buttons'>
                        <button type='button' onClick={()=>setFieldValue('percent','25%')}  className='percent-button'> 
                            25%
                        </button>
                        <button type='button' onClick={()=>setFieldValue('percent','50%')} className='percent-button'> 
                            50%
                        </button>
                        <button type='button' onClick={()=>setFieldValue('percent','75%')} className='percent-button'> 
                            75%
                        </button>
                        <button type='button' onClick={()=>setFieldValue('percent','100%')} className='percent-button'> 
                            100%
                        </button>
                    </div>
                    
                    <div className='total-price'>
                    <span style={{marginLeft:'10px'}}>Total</span>
                        <Field className='form-fields-buyandsell after' name="total"/>
                        <label style={{position:'absolute',fontSize:'16px',color:'#706E7D',marginLeft:'-40px',marginTop:'7px'}}>BTC</label>
                        {errors.total && touched.total ? (<div>{errors.total}</div>) : null}
                       
                    </div>
                    <div style={{margin:'30px 0px 20px 0'}}>
                        {type.trade==='buy' && <button className="submit-form buy" type="submit">Buy ETH</button>}
                        {type.trade==='sell' && <button className="submit-form sell" type="submit">Sell ETH</button>}
                    </div>
                    
                </Form>
            )}
            </Formik>
     
        </Fragment>
    );
};
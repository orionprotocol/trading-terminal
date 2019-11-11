import React, {Fragment} from 'react';
import {Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar'


const PrincipalRouter = () => {
  return(
    <Fragment>
        <Switch>
         <Route exact path='/' component={Sidebar} /> 
          {/* //roles
          //select role buyer or supplier
          <Route path='/Select_type_user' component={SelecttypeUser}/>
          //supplier
          <Route path='/SupplierForm' component={SupplierForm}/>
          <Route path='/Supplier' component={Supplier} />
          //buyer
          <Route path='/BuyerForm' component={BuyerForm}/>
          <Route path='/Buyer' component={Buyer} />
          //warehouse
          <Route path='/WareHouse' component={WareHouse} />
          //contract manager
          <Route path='/Contract_Manager' component={ContractManager} />
          //Financial Officer
          <Route path='/financial_officer' component={FinancialOfficer} />
          //Account manager buyer
          <Route path='/account_manager_buyer' component={AccountManagerBuyer} />
          //Account manager supplier
          <Route path='/account_manager_supplier' component={AccountManagerSupplier} />
          // auth
          //signUp
          <Route exact path='/SignUp' component={SignUp} />
          <Route path='/PostRegister' component={PostRegister} />
          <Route path='/SignUp/activate/:token' component={EmailConfirmation} />
          //login for the amdmins
          <Route path='/admin/login' component={LoginAdmin} />
          //reset password
          <Route path='/PasswordEmail' component={PasswordEmailConfirmation} />
          <Route path='/PasswordEmailPost' component={PasswordPostRegister} />
          <Route path='/ForgotPassword/:token' component={ForgotPassword} />
          //faqs landing page
          <Route path='/Faqs' component={FAQ}/>
          //pif create
          <Route path='/pif' component={ContainerPage}/>
          //pif show
          <Route path='/Pif_read' component={ContainerPage2}/>
          //error conect server
          <Route path='/WrongRequest' component={PageWrongRequest}/>
          //page not found
          <Route component={PageNotFound} /> */}
        </Switch>
    </Fragment>
  )
}

export default PrincipalRouter;

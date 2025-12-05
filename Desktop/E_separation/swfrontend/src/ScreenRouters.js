import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import SCREENS from './screens/constants'
import BankMaster from './screens/BankMaster'
import PartyMaster from './screens/PartyMaster'
import PlantMaster from './screens/PlantMaster'
import LCDocumentType from './screens/LCDocumentTypeMaster'

const ScreenRouters = () => {
  return (
    <Switch>
      <Route exact path={SCREENS.BANK_MASTER.path} component={BankMaster} />
      <Route exact path={SCREENS.PARTY_MASTER.path} component={PartyMaster} />
      <Route exact path={SCREENS.PLANT_MASTER.path} component={PlantMaster} />
      <Route exact path={SCREENS.LC_DOCUMENT_TYPE.path} component={LCDocumentType} />
      
      <Route exact path="/app" render={() => <Redirect to={SCREENS.BANK_MASTER.path} />} />
      
      <Route exact path="/" render={() => <Redirect to="/login" />} />
    </Switch>
  )
}

export default ScreenRouters
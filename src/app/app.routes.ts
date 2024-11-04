import { Routes } from '@angular/router';
import { CountryComponent } from './component/country/country.component';
import { CountriesComponent } from './component/countries/countries.component';
import { EnergiesComponent } from './component/energies/energies.component';
import { EnergyComponent } from './component/energy/energy.component';
import { EnergiesProducedComponent } from './component/energies-produced/energies-produced.component';
import { EnergyProducedComponent } from './component/energy-produced/energy-produced.component';

export const routes: Routes = [
 {path:"country", component:CountryComponent},
 {path:"country/:countryId", component:CountryComponent},
 {path:"countries", component:CountriesComponent},
 {path:"energies", component:EnergiesComponent},
 {path:"energy", component:EnergyComponent},
 {path:"energiesProduced", component:EnergiesProducedComponent},
 {path:"energyProduced", component:EnergyProducedComponent},
 {path:"energyProduced/:energyPId", component:EnergyProducedComponent}
];

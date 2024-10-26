import { Routes } from '@angular/router';
import { CountryComponent } from './component/country/country.component';
import { CountriesComponent } from './component/countries/countries.component';

export const routes: Routes = [
 {path:"country", component:CountryComponent},
 {path:"country/:countryId", component:CountryComponent},
 {path:"countries", component:CountriesComponent}
];

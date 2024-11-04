import { Country } from "./country";
import { Energy } from "./energy";

export class EnergyProduced {

 constructor(
  public production_id:number,
  public country:Country,
  public energy: Energy,
  public quantity_produced: number,
  public production_date: number
 ){}
}

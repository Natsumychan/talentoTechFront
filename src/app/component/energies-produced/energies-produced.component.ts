type EnergyProductionData = {
  year: number;
  countryName: string;
  totalProduced: number;
}

import Chart from 'chart.js/auto'
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnergyProduced } from '../../class/energy-produced';
import { EnergyProducedService } from '../../service/energy-produced.service';
import { RouterLink } from '@angular/router';
import { EnergyTypeChartComponent } from "../energy-type-chart/energy-type-chart.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-energies-produced',
  standalone: true,
  imports: [RouterLink, EnergyTypeChartComponent, CommonModule],
  templateUrl: './energies-produced.component.html',
  styleUrl: './energies-produced.component.css'
})
export class EnergiesProducedComponent implements OnInit, AfterViewInit  {

   @ViewChild('myChart') myChart!: ElementRef<HTMLCanvasElement>;
  chart: any;
  energyProduced: EnergyProduced[]=[]
  energyProductionData: EnergyProductionData[] = []

  energyTypes=["Hydro", "Solar", "Biomass"]


  constructor(private energyProducedService:EnergyProducedService){}
  ngOnInit(): void {
    this.energyList()
  }

   ngAfterViewInit(): void {
    this.fetchEnergyData();
  }

  fetchEnergyData(){

    this.energyProducedService.getEnergyProducedSorted().subscribe(data =>{
      this.energyProductionData = data.map((item: any) => ({
        countryName: item[1],
        year: item[0],
        totalProduced: item[2]
      }));
      if(this.chart){
        this.updateChartData();
      }else{
        this.createChart();
      }
    })
  }

  energyList(){
    this.energyProducedService.getEnergyProducedList().subscribe(
      data =>{
        this.energyProduced=data.sort((a, b) => a.production_date - b.production_date)
        console.log(this.energyProduced)
      }
    )
  }

 createChart() {
    // Prepara los datos de los ejes
    const labels = Array.from(new Set(this.energyProductionData.map(item => item.year))); // Años únicos para el eje X
    const countries = Array.from(new Set(this.energyProductionData.map(item => item.countryName))); // Nombres de los países
    // Para cada país, crea un dataset de energía producida por año
    const datasets = countries.map(country => {
      return {
        label: `Producción de energía total en ${country}`,
        data: labels.map(year => {
          const item = this.energyProductionData.find(data => data.countryName === country && data.year === year);
          return item ? item.totalProduced : 0; // Agrega la cantidad producida o 0 si no hay datos
        }),
        backgroundColor: this.getRandomColor(),
        borderColor: this.getRandomColor(),
        borderWidth: 1
      };
    });



    // Configura y crea la gráfica
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'bar', // Cambia a 'line' si prefieres una gráfica de líneas
      data: {
        labels, // Eje X (Años)
        datasets // Datos por país
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Energía Producida (TWh)' // Título del eje Y
            }
          },
          x: {
            title: {
              display: true,
              text: 'Años' // Título del eje X
            }
          }
        }
      }
    });
  }

  updateChartData() {
  if (!this.chart) return;

  // Obtener etiquetas y datos actualizados
  const labels = Array.from(new Set(this.energyProductionData.map(item => item.year)));
  const countries = Array.from(new Set(this.energyProductionData.map(item => item.countryName)));

  // Actualizar etiquetas del eje X (años)
  this.chart.data.labels = labels;

  // Actualizar datasets para cada país
  const updatedDatasets = countries.map(country => {
    return {
      label: `Producción de Energía en ${country}`,
      data: labels.map(year => {
        const item = this.energyProductionData.find(data => data.countryName === country && data.year === year);
        return item ? item.totalProduced : 0;
      }),
      backgroundColor: this.getRandomColor(),
      borderColor: this.getRandomColor(),
      borderWidth: 1
    };
  });

  // Asignar los datasets actualizados a la gráfica
  this.chart.data.datasets = updatedDatasets;

  // Actualizar la gráfica para reflejar los cambios
  this.chart.update();
}

  // Función para generar un color aleatorio para cada dataset
  getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  }

  deleteEnergyProduced(id:number){
    this.energyProducedService.deleteEnergyProduced(id).subscribe(
      data=>{
        console.log(data)
        this.energyList()
      }
    )
  }
}

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

  energyTypes=["Hídrica", "Solar", "Biomasa", "Eólica"]

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
      }
    )
  }

 createChart() {
  const chartOptions = {
    responsive: true,
      scales: {
        x: {
        ticks: {
          padding: 10, // Ajusta este valor para mayor separación
        },
        },
        y: {
        ticks: {
          padding: 10, // Ajusta este valor para las etiquetas verticales
        },
      },
    },
  };

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



    // Configure and create the graphic
    this.chart = new Chart(this.myChart.nativeElement, {
      type: 'bar', // use bar or line depend in the case
      data: {
        labels, // Eje X (years)
        datasets // Data by country
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              padding: 10, 
            },
            title: {
              display: true,
              text: 'Energía Producida (TWh)' // Título del eje Y
            }
          },
          x: {
            ticks: {
              padding: 10,
              align: 'center',
            },
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

  // obtain data and tags updated
  const labels = Array.from(new Set(this.energyProductionData.map(item => item.year)));
  const countries = Array.from(new Set(this.energyProductionData.map(item => item.countryName)));

  // Update tags of eje X (years)
  this.chart.data.labels = labels;

  // Update datasets for each country
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

  // Asign updated datasets to the graphic
  this.chart.data.datasets = updatedDatasets;

  // Update graphic
  this.chart.update();
}

  // Set random color to each dataset
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

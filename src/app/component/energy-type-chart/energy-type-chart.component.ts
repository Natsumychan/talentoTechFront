import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { EnergyProducedService } from '../../service/energy-produced.service';

@Component({
  selector: 'app-energy-type-chart',
  standalone: true,
  imports: [],
  templateUrl: './energy-type-chart.component.html',
  styleUrl: './energy-type-chart.component.css'
})
export class EnergyTypeChartComponent implements OnInit, AfterViewInit {
  @Input() energyType!: string; // Tipo de energía recibido como entrada
  @ViewChild('energyChart') energyChart!: ElementRef<HTMLCanvasElement>;
  chart: any;
  energyData: any[] = [];

  constructor(private energyProducedService: EnergyProducedService) {}

  ngOnInit(): void {
    this.fetchEnergyData();
  }

  ngAfterViewInit(): void {
    if (this.energyData.length) {
      this.createChart();
    }
  }

  fetchEnergyData() {
    // Llama al servicio para obtener los datos de acuerdo con el tipo de energía
    this.energyProducedService.getEnergyProducedByType(this.energyType).subscribe(data => {
      this.energyData = data.sort((a, b) => a.production_date - b.production_date)
      if (this.chart) {
        this.updateChartData();
      } else {
        this.createChart();
      }
    });
  }

  createChart() {
    const labels = Array.from(new Set(this.energyData.map(item => item.production_date)));
    const countries = Array.from(new Set(this.energyData.map(item => item.country.country_name)));

    const datasets = countries.map(country => ({
      label: `Producción en ${country}`,
      data: labels.map(year => {
        const item = this.energyData.find(data => data.country.country_name === country && data.production_date === year);
        return item ? item.quantity_produced : 0;
      }),
      backgroundColor: this.getRandomColor(),
      borderColor: this.getRandomColor(),
      borderWidth: 1
    }));

    this.chart = new Chart(this.energyChart.nativeElement, {
      type: 'bar',
      data: { labels, datasets },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Energía Producida' } },
          x: { title: { display: true, text: 'Años' } }
        }
      }
    });
  }

  updateChartData() {
    if (!this.chart) return;

    const labels = Array.from(new Set(this.energyData.map(item => item.production_date)));
    const countries = Array.from(new Set(this.energyData.map(item => item.country.country_name)));

    this.chart.data.labels = labels;

    const updatedDatasets = countries.map(country => ({
      label: `Producción en ${country}`,
      data: labels.map(year => {
        const item = this.energyData.find(data => data.country.country_name === country && data.production_date === year);
        return item ? item.quantity_produced : 0;
      }),
      backgroundColor: this.getRandomColor(),
      borderColor: this.getRandomColor(),
      borderWidth: 1
    }));

    this.chart.data.datasets = updatedDatasets;
    this.chart.update();
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r}, ${g}, ${b}, 0.6)`;
  }
}

<template>
  <div class="chart-container">
    <canvas class="chart"></canvas>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Seller from '@/domain/sellers/Seller';
import Chart from 'chart.js';

@Component
export default class SellerBarComparisonChart extends Vue {
  private chart: Chart | null = null;
  private data: Chart.ChartConfiguration = {
    type: 'bar',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            type: 'linear',
            ticks: {
              beginAtZero: true,
              callback: value => `${value.toLocaleString()} kr.`,
            },
          },
        ],
      },
      tooltips: {
        callbacks: {
          label: ({ yLabel }) =>
            yLabel === undefined ? '' : `${yLabel.toLocaleString()} kr.`,
        },
      },
    },
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    },
  };

  @Prop() private sellers!: Seller[];
  @Prop() private price!: number;
  @Prop() private hours!: number;

  @Watch('sellers')
  private onSellersChanged() {
    if (
      this.chart === null ||
      this.data.data === undefined ||
      this.data.data.datasets === undefined
    ) {
      return;
    }
    this.data.data.labels = this.sellers.map(s => s.name);
    this.data.data.datasets[0].data = this.sellers.map(seller =>
      seller.totalFee(),
    );
    this.data.data.datasets[0].backgroundColor = this.sellers.map(s => s.color);
    this.chart.update();
  }

  private mounted() {
    const ctx = this.$el.querySelector('.chart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, this.data);
    this.onSellersChanged();
  }

  private renderChart() {
    if (this.chart == null) {
      return;
    }
    this.chart.update();
  }
}
</script>

<style>
.chart-container {
  position: relative;
}
</style>

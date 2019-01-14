<template>
  <div class="relative">
    <canvas class="chart"></canvas>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Seller from '@/domain/sellers/Seller';
import sellers from '@/domain/sellers/sellers';
import Chart from 'chart.js';

@Component
export default class SellerLineComparisonChart extends Vue {
  private chart: Chart | null = null;
  private data: Chart.ChartConfiguration = {
    type: 'line',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            ticks: {
              callback: value => `${value.toLocaleString()} kr.`,
            },
          },
        ],
      },

      tooltips: {
        mode: 'label',
        callbacks: {
          label: ({ yLabel }) =>
            yLabel === undefined ? '' : `${yLabel.toLocaleString()} kr.`,
        },
      },
    },
    data: {},
  };
  private datasets = new Map<string, Chart.ChartDataSets>();

  @Prop() private hours!: number;

  get prices(): number[] {
    return [...Array(25).keys()].map(i => i * 5 * 1_000_000);
  }

  @Watch('hours')
  private updateChart() {
    if (
      this.data === undefined ||
      this.chart === null ||
      this.data.data === undefined
    ) {
      return;
    }

    // const datasets: Chart.ChartDataSets[] = [];

    sellers.forEach(seller => {
      let dataset = this.datasets.get(seller.name);
      if (dataset === undefined) {
        dataset = {
          data: [] as number[],
          fill: false,
          label: seller.name,
          borderColor: seller.color,
          backgroundColor: seller.color,
        };
        this.datasets.set(seller.name, dataset);
      }
      if (dataset.data!.length > 0) {
        dataset.data = [];
      }
      dataset.data = this.prices.map(price =>
        seller.totalFee(price, this.hours),
      );
    });
    this.data.data.datasets = [...this.datasets.values()];
    this.data.data.labels = this.prices.map(
      price => price.toLocaleString() + ' kr.',
    );
    this.chart.update();
  }

  private mounted() {
    const ctx = this.$el.querySelector('.chart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, this.data);
    this.updateChart();
  }

  private renderChart() {
    if (this.chart == null) {
      return;
    }
    this.chart.update();
  }
}
</script>

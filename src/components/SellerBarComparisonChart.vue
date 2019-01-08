<template>
  <canvas></canvas>
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
      legend: {
        display: false,
      },
    },
    data: {
      labels: [],
      datasets: [
        {
          data: [],
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
      this.chart == null ||
      this.data.data == undefined ||
      this.data.data.datasets == undefined
    ) {
      return;
    }
    this.data.data.labels = this.sellers.map(s => s.name);
    this.data.data.datasets[0].data = this.sellers.map(seller =>
      seller.totalFee(),
    );
    this.chart.update();
  }

  private mounted() {
    const ctx = this.$el as HTMLCanvasElement;
    this.chart = new Chart(ctx, this.data);
  }

  protected renderChart() {
    if (this.chart == null) return;
    this.chart.update();
  }
}
</script>

<style>
</style>

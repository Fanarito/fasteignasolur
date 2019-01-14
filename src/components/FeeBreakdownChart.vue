<template>
  <div class="relative">
    <canvas class="chart"></canvas>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Fee from '@/domain/fees/Fee';
import Chart from 'chart.js';

@Component
export default class FeeBreakdownChart extends Vue {
  private chart: Chart | null = null;
  private data: Chart.ChartConfiguration = {
    type: 'pie',
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      tooltips: {
        callbacks: {
          label: (item, data) => {
            const label = data!.labels![item.index!];
            const value = data!.datasets![item.datasetIndex!].data![
              item.index!
            ];
            return `${label}: ${value!.toLocaleString()} kr.`;
          },
        },
      },
    },
    data: {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [
            '#45b7b8',
            '#f6c523',
            '#ef6c57',
            '#228c7b',
            '#474f85',
          ],
        },
      ],
    },
  };

  @Prop() private fees!: Fee[];

  @Watch('fees')
  private updateChart() {
    if (
      this.chart === null ||
      this.data.data === undefined ||
      this.data.data.datasets === undefined
    ) {
      return;
    }
    this.data.data.labels = this.fees.map(f => f.shortExplanation);
    this.data.data.datasets[0].data = this.fees.map(fee => fee.totalFee());
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

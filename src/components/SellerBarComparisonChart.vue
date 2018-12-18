<template>
  <chart :options="options" :init-options="initOptions" theme="shine"></chart>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ECharts from 'vue-echarts/components/ECharts.vue';
import 'echarts/lib/chart/bar';
import 'echarts/theme/shine';
import Seller from '@/domain/sellers/Seller';

@Component({
  components: {
    chart: ECharts,
  },
})
export default class SellerBarComparisonChart extends Vue {
  @Prop() private sellers!: Seller[];
  @Prop() private price!: number;
  @Prop() private hours!: number;

  private options: any = {
    xAxis: { type: 'category' },
    yAxis: {},
    dataset: {
      source: [],
    },
    series: [{ type: 'bar' }],
  };

  private initOptions = {
    renderer: 'canvas',
  };

  @Watch('sellers')
  onSellerChange() {
    this.updateChart();
  }

  private updateChart() {
    const source: any[] = [];
    this.sellers.forEach(seller => {
      source.push([seller.name, seller.totalFee()]);
    });

    this.options.dataset.source = source;
  }
}
</script>

<style>
</style>

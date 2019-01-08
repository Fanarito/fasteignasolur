<template>
  <div class="home">
    <div class="charts">
      <SellerBarComparisonChart class="chart" :sellers="sellers" :price="price" :hours="hours"/>
      <SellerBarComparisonChart class="chart" :sellers="sellers" :price="price" :hours="hours"/>
    </div>
    <div class="details">
      <h1>Nákvæmar-ish tölur</h1>
      <div class="inputs">
        <Card>
          <div slot="header">Söluverð (milljónir)</div>
          <Slider v-model.number="price" :max="200"/>
        </Card>
        <Card>
          <div slot="header">Tímar</div>
          <Slider v-model.number="hours" :max="100"/>
        </Card>
      </div>
      <transition-group name="list" tag="div" class="sellers">
        <SellerComission
          v-for="seller in sellersByPrice"
          :key="seller.name"
          :seller="seller"
          :price="price"
          :hours="hours"
        ></SellerComission>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import SellerComission from '@/components/SellerComission.vue';
import Slider from '@/components/forms/Slider.vue';
import Card from '@/components/ui/Card.vue';
import SellerBarComparisonChart from '@/components/SellerBarComparisonChart.vue';
import Seller from '@/domain/sellers/Seller';
import RemaxSeller from '@/domain/sellers/RemaxSeller';
import BorgSeller from '@/domain/sellers/BorgSeller';
import LindSeller from '@/domain/sellers/LindSeller';
import EignarmidlunSeller from '@/domain/sellers/EignarmidlunSeller';
import MiklaborgSeller from '@/domain/sellers/MiklaborgSeller';

@Component({
  components: {
    SellerComission,
    SellerBarComparisonChart,
    Slider,
    Card,
  },
})
export default class Home extends Vue {
  private price = 40;
  private hours = 10;

  get sellers(): Seller[] {
    const translatedPrice = this.price * 1_000_000;
    return [
      new BorgSeller(translatedPrice, this.hours),
      new EignarmidlunSeller(translatedPrice, this.hours),
      new LindSeller(translatedPrice, this.hours),
      new MiklaborgSeller(translatedPrice, this.hours),
      new RemaxSeller(translatedPrice, this.hours),
    ];
  }

  get sellersByPrice(): Seller[] {
    return this.sellers.slice(0).sort((a, b) => a.totalFee() - b.totalFee());
  }
}
</script>

<style scoped>
.home {
  width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  display: grid;
  grid-template-columns: 65% calc(35% - 8px);
  grid-template-rows: auto;
  grid-template-areas: 'charts details';
  grid-gap: 8px;
  padding: 8px;
}

.charts {
  padding: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.charts > .chart {
  height: 46vh;
  width: 100%;
  position: relative;
}

.details {
  grid-area: 'details';
  display: flex;
  flex-flow: column;
  height: calc(100vh - 8px);
}

.sellers {
  overflow-y: auto;
  height: 100%;
}

.inputs {
  display: flex;
  justify-content: space-between;
  padding-bottom: 8px;
  padding-top: 8px;
}

.inputs > div {
  width: calc(50% - 4px); /* 8px padding */
}

input {
  padding: 8px;
}

.list-move {
  transition: transform 0.5s;
}

@media (max-width: 768px) {
  .home {
    display: flex;
    height: auto;
    flex-direction: column-reverse;
    width: auto;
    height: auto;
  }

  .details {
    height: auto;
  }

  .inputs {
    flex-direction: column;
  }

  .charts {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  .inputs > div {
    width: 100%;
  }

  .sellers {
    overflow-y: visible;
    width: 100%;
  }
}
</style>

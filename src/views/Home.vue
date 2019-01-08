<template>
  <div class="home">
    <div class="charts">
      <SellerBarComparisonChart :sellers="sellers" :price="price" :hours="hours"/>
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
          v-for="seller in sellers"
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
  private sellers: Seller[] = [];

  @Watch('hours')
  @Watch('price')
  onPriceChange() {
    this.getSellers();
  }

  private mounted() {
    this.getSellers();
  }

  private getSellers() {
    const translatedPrice = this.price * 1_000_000;
    this.sellers = [
      new RemaxSeller(translatedPrice, this.hours),
      new BorgSeller(translatedPrice, this.hours),
      new LindSeller(translatedPrice, this.hours),
      new EignarmidlunSeller(translatedPrice, this.hours),
      new MiklaborgSeller(translatedPrice, this.hours),
    ].sort((a, b) => a.totalFee() - b.totalFee());
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
  grid-area: 'charts';
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: auto;
  grid-template-areas: 'charts details';
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

@media (min-width: 320px) and (max-width: 480px) {
  .home {
    display: flex;
    height: auto;
    flex-direction: column-reverse;
  }

  .inputs {
    flex-direction: column;
  }

  .charts {
    display: flex;
    flex-direction: column;
  }
}
</style>

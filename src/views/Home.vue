<template>
  <div class="home">
    <div class="charts">
      <SellerBarComparisonChart
        class="chart"
        :sellers="sellers"
        :price="translatedPrice"
        :hours="hours"
      />
      <SellerLineComparisonChart class="chart" :hours="hours"/>
    </div>
    <div class="details">
      <h1>
        Nákvæmar-ish tölur
        <span class="subtitle">Vaskur bættur við.</span>
      </h1>
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
          :price="translatedPrice"
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
import SellerLineComparisonChart from '@/components/SellerLineComparisonChart.vue';
import Seller from '@/domain/sellers/Seller';
import sellers from '@/domain/sellers/sellers';

@Component({
  components: {
    SellerComission,
    SellerBarComparisonChart,
    SellerLineComparisonChart,
    Slider,
    Card,
  },
})
export default class Home extends Vue {
  private price = 40;
  private hours = 10;
  private sellers = sellers;

  get translatedPrice(): number {
    return this.price * 1_000_000;
  }

  get sellersByPrice(): Seller[] {
    return this.sellers
      .slice(0)
      .sort(
        (a, b) =>
          a.totalFee(this.translatedPrice, this.hours) -
          b.totalFee(this.translatedPrice, this.hours),
      );
  }
}
</script>

<style scoped>
.subtitle {
  font-size: 0.4em;
  display: block;
  font-style: italic;
}

.home {
  width: calc(100vw - 16px);
  height: calc(100vh - 16px);
  display: grid;
  grid-template-columns: 60% minmax(30%, 40%);
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
  height: 45vh;
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
  flex-grow: 0;
}

.inputs {
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  flex-grow: 0;
  margin-bottom: 1em;
  margin-top: 1em;
}

.inputs > div {
  width: calc(50% - 4px); /* 8px padding */
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

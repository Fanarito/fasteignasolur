<template>
  <div class="home">
    <div class="charts" v-if="!this.$root.$data.isMobile">
      <SellerBarComparisonChart
        class="chart"
        :sellers="sellers"
        :price="translatedPrice"
        :hours="hours"
      />
      <SellerLineComparisonChart class="chart" :hours="hours"/>
    </div>
    <div class="details">
      <h1 class="title">
        <img class="logo" src="/img/icons/fasteignasölur.png">
        <span class="subtitle">Samanburður á þóknun fasteignasala við sölu samkvæmt verðskrá.</span>
      </h1>
      <div class="flex flex-none flex-col md:flex-row md:-mx-2 md:my-2">
        <div class="py-2 md:px-2">
          <Card>
            <div slot="header">Söluverð (milljónir)</div>
            <Slider v-model.number="price" :max="200"/>
          </Card>
        </div>
        <div class="py-2 md:px-2">
          <Card>
            <div slot="header">Tímar</div>
            <Slider v-model.number="hours" :max="100"/>
          </Card>
        </div>
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
import Loader from '@/components/Loader.vue';
import Seller from '@/domain/sellers/Seller';
import sellers from '@/domain/sellers/sellers';

const SellerBarComparisonChart = () =>
  ({
    component: import(/* webpackChunkName: "charting" */ '@/components/SellerBarComparisonChart.vue'),
    loading: Loader,
  } as any);

const SellerLineComparisonChart = () =>
  ({
    component: import(/* webpackChunkName: "charting" */ '@/components/SellerLineComparisonChart.vue'),
    loading: Loader,
  } as any);

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
.logo {
  height: 5rem;
}

.subtitle {
  font-size: 0.4em;
  display: block;
  font-style: italic;
}

.home {
  height: 100vh;
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

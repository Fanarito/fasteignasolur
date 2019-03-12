<template>
  <div id="app" class="home">
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
      <div class="header">
        <div class="title">
          <img class="logo" src="@/assets/img/icons/logo.svg">
          <div class="pl-2 flex flex-col">
            <span>Fasteignasölur</span>
            <span class="subtitle">Samanburður á þóknun fasteignasala við sölu samkvæmt verðskrá.</span>
          </div>
        </div>
        <div class="links">
          <a
            href="https://github.com/Fanarito/fasteignasolur"
            target="blank"
            class="link"
            title="Sjá kóða"
          >
            <img src="@/assets/icons/GitHub-Mark-32px.png" alt="GitHub Repository">
          </a>
          <a
            href="mailto:viktor.saevars@gmail.com"
            target="blank"
            class="link"
            title="Senda fyrirspurn"
          >
            <img src="@/assets/icons/iconmonstr-email-10.svg" alt="Senda fyrirspurn">
          </a>
        </div>
      </div>
      <Card class="my-2 flex-no-shrink">
        <div slot="header">Söluverð (milljónir)</div>
        <Slider v-model.number="price" :max="200"/>
      </Card>
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

<style>
@import url('https://fonts.googleapis.com/css?family=Lato:300,400');

#app {
  background-color: #f5f5f5;
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header {
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  height: 100px;
}

.title {
  font-size: 2em;
  display: flex;
  align-items: center;
  font-weight: lighter;
}

.title > .logo {
  height: 1.5em;
}

.subtitle {
  font-size: 0.8rem;
  display: block;
  font-style: italic;
}

.links {
  padding: 0.25rem;
  display: flex;
  flex-flow: column;
  justify-content: space-evenly;
}

.links > .link {
  height: 32px;
  width: 32px;
}

.links > .link > img {
  height: inherit;
  width: inherit;
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

.list-move {
  transition: transform 0.5s;
}

@media (max-width: 768px) {
  .home {
    display: flex;
    height: auto;
    flex-direction: column-reverse;
    width: auto;
    height: fit-content;
  }

  .details {
    height: auto;
  }

  .charts {
    display: flex;
    flex-direction: column;
    height: auto;
  }

  .sellers {
    overflow-y: visible;
    width: 100%;
  }
}
</style>

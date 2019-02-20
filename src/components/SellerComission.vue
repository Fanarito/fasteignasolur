<template>
  <div
    class="rounded overflow-hidden shadow bg-white mb-2 border border-grey-light"
    :style="{ borderLeft: `4px solid ${seller.color}` }"
  >
    <div class="flex p-2 justify-between cursor-pointer" @click="expand">
      <div class="flex w-full lg:w-3/4 xl:text-xl justify-between">
        <div class="seller-name-display">
          <img class="h-6 xl:h-8" :src="seller.logoUrl">
          <span v-if="seller.showName" class="seller-name">{{seller.name}}</span>
        </div>
        <div class="seller-total">
          {{sellerFee.toLocaleString()}} kr.
          <span class="text-xs">{{propertyPercentage}}%</span>
        </div>
      </div>
      <div class="header-icon">
        <div class="h-6 xl:h-8 w-6 xl:w-8" :class="openIconClasses">❱</div>
      </div>
    </div>
    <transition name="fade-height" mode="out-in">
      <div v-show="expanded">
        <transition name="fade-width" mode="out-in">
          <div v-show="expanded" class="divider" :style="{ backgroundColor: seller.color }"></div>
        </transition>
        <div class="p-4">
          <div class="h-32">
            <FeeBreakdownChart v-if="expanded" class="h-32" :fees="sellerFees"/>
          </div>
          <table class="fee-table w-full">
            <tr>
              <th>Gjald</th>
              <th>Skýring</th>
            </tr>
            <tr v-for="(fee, index) in seller.feesTaken(price, hours)" :key="index">
              <td class="nowrap">{{fee.totalFee().toLocaleString()}} kr.</td>
              <td>{{fee.explanation()}}</td>
            </tr>
          </table>
          <div class="actions pt-4">
            <a :href="seller.tariffUrl" target="blank">
              <button class="btn-white">Gjaldskrá 🔗</button>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Loader from '@/components/Loader.vue';
import Seller from '@/domain/sellers/Seller';
import Fee from '@/domain/fees/Fee';

const FeeBreakdownChart = () =>
  ({
    component: import(/* webpackChunkName: "charting" */ '@/components/FeeBreakdownChart.vue'),
    loading: Loader,
  } as any);

@Component({
  components: {
    FeeBreakdownChart,
  },
})
export default class SellerComission extends Vue {
  @Prop() private seller!: Seller;
  @Prop() private price!: number;
  @Prop() private hours!: number;

  get sellerFee(): number {
    return this.seller.totalFee(this.price, this.hours);
  }

  get sellerFees(): Fee[] {
    return this.seller.feesTaken(this.price, this.hours);
  }

  get propertyPercentage(): string {
    return ((this.sellerFee / this.price) * 100).toFixed(2);
  }

  private openIconClasses = {
    'open-icon': true,
    'open-icon-closed': true,
    'open-icon-open': false,
  };

  private expanded = false;

  private expand(): void {
    this.expanded = !this.expanded;
    this.openIconClasses['open-icon-closed'] = !this.expanded;
    this.openIconClasses['open-icon-open'] = this.expanded;
  }
}
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}

.seller-name-display {
  display: flex;
  align-items: center;
}

.seller-name-display .seller-name {
  padding-left: 0.4em;
  user-select: none;
}

.seller-total {
  line-height: 2rem;
}

@media (max-width: 1200px) {
  .seller-total {
    line-height: 1.5rem;
  }
}

.divider {
  height: 1px;
  width: 100%;
}

.header-icon {
  text-align: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.open-icon {
  transform-origin: 50% 50%;
  transition: all 0.3s ease-in-out;
}

.open-icon-closed {
  transform: rotate(90deg);
}

.open-icon-open {
  transform: rotate(-90deg);
}

.fee-table th,
.fee-table td {
  padding: 4px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.fade-height-enter-active,
.fade-height-leave-active {
  transition: all 0.3s ease-in-out;
  max-height: 500px;
}
.fade-height-enter,
.fade-height-leave-to {
  opacity: 0;
  max-height: 0px;
}

.fade-width-enter-active,
.fade-width-leave-active {
  transition: all 0.5s ease-in-out;
  width: 100%;
}
.fade-width-enter,
.fade-width-leave-to {
  opacity: 0;
  width: 0%;
}
</style>

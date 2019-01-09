<template>
  <div class="container" :style="{ borderLeft: `4px solid ${seller.color}` }">
    <div class="header" @click="expand">
      <h1>
        <img class="seller-logo" :src="seller.logoUrl">
        <span class="seller-total">
          {{sellerFee.toLocaleString()}} kr.
          <span
            class="property-percentage"
          >{{propertyPercentage}}%</span>
        </span>
      </h1>
      <div class="header-icon">
        <div :class="openIconClasses">❱</div>
      </div>
    </div>
    <transition name="fade-width" mode="out-in">
      <div v-if="expanded" class="divider" :style="{ backgroundColor: seller.color }"></div>
    </transition>
    <transition name="fade-height" mode="out-in">
      <div class="details-container" v-if="expanded">
        <FeeBreakdownChart :fees="sellerFees"/>
        <div
          v-for="(fee, index) in seller.feesTaken(price, hours)"
          :key="index"
        >{{fee.totalFee().toLocaleString()}} : {{fee.explanation()}}</div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Seller from '@/domain/sellers/Seller';
import Fee from '@/domain/fees/Fee';
import FeeBreakdownChart from '@/components/FeeBreakdownChart.vue';

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
.container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 3px 3px 3px #ccc;
  margin-bottom: 8px;
  width: calc(100% - 6px); /* account for shadow in width */
}

.header {
  display: flex;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  border-bottom: 1px solid transparent;
  cursor: pointer;
}

.seller-logo {
  height: 35px;
}

.divider {
  height: 1px;
  width: 100%;
  background-color: #2c3e50;
}

.header h1 {
  font-size: 1.4em;
  margin: 16px 0 16px 0;
  display: flex;
  justify-content: space-between;
  width: 80%;
}

.property-percentage {
  font-size: 12px;
}

.header-icon {
  text-align: center;
  display: flex;
  flex-flow: column;
  justify-content: center;
}

.open-icon {
  height: 32px;
  width: 32px;
  transform-origin: 50% 50%;
  transition: all 0.3s ease-in-out;
}

.open-icon-closed {
  transform: rotate(90deg);
}

.open-icon-open {
  transform: rotate(-90deg);
}

.details-container {
  padding: 16px;
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
  transition: all 0.3s ease-in-out;
  width: 100%;
}
.fade-width-enter,
.fade-width-leave-to {
  opacity: 0;
  width: 0%;
}

@media (max-width: 1300px) {
  .header h1 {
    width: 100%;
    font-size: 1em;
  }

  .seller-logo {
    height: 22px;
  }
}
</style>

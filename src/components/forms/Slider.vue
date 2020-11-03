<template>
  <div>
    <input
      type="number"
      class="value-display"
      v-model.number="value"
      step="0.1"
      @input="$emit('input', $event.target.value)"
    />
    <div class="slider-container">
      <input
        type="range"
        :min="min"
        :max="max"
        :value="value"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Slider extends Vue {
  @Prop() public value!: number;
  @Prop({ default: 0 }) public min!: number;
  @Prop({ default: 100 }) public max!: number;
  @Prop({ default: false }) public showValue!: boolean;
}
</script>

<style scoped>
.value-display {
  font-size: 32px;
  text-align: center;
  background: none;
  border: none;
  width: 100%;
}
</style>

<style>
/* Range styling */
input[type='range'] {
  -webkit-appearance: none;
  margin: 0;
  width: 100%;
}
input[type='range']:focus {
  outline: none;
}
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #607d8b;
}
input[type='range']::-webkit-slider-thumb {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 25px;
  width: 26px;
  border-radius: 50px;
  background: #009688;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -11.7px;
}
input[type='range']:focus::-webkit-slider-runnable-track {
  background: #367ebd;
}
input[type='range']::-moz-range-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #607d8b;
}
input[type='range']::-moz-range-thumb {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 25px;
  width: 26px;
  border-radius: 50px;
  background: #009688;
  cursor: pointer;
}
input[type='range']::-ms-track {
  width: 100%;
  height: 2px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type='range']::-ms-fill-lower {
  background: #2a6495;
  border: 0.2px solid #607d8b;
  border-radius: 2.6px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
}
input[type='range']::-ms-fill-upper {
  background: #3071a9;
  border: 0.2px solid #607d8b;
  border-radius: 2.6px;
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
}
input[type='range']::-ms-thumb {
  box-shadow: 0px 0px 0px rgba(0, 0, 0, 0), 0px 0px 0px rgba(13, 13, 13, 0);
  border: 0px solid rgba(0, 0, 0, 0);
  height: 25px;
  width: 26px;
  border-radius: 50px;
  background: #009688;
  cursor: pointer;
  height: 2px;
}
input[type='range']:focus::-ms-fill-lower {
  background: #3071a9;
}
input[type='range']:focus::-ms-fill-upper {
  background: #367ebd;
}
</style>

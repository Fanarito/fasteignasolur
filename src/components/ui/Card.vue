<template>
  <div class="card">
    <div class="card-header">
      <slot name="header"></slot>
    </div>
    <div class="card-content">
      <slot></slot>
    </div>
    <div class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Card extends Vue {}
</script>

<style>
.card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 3px 3px 3px #ccc;
  margin-bottom: 8px;
  width: calc(100% - 6px); /* account for shadow in width */
}

.card > .card-header {
  padding: 8px;
  border-bottom: 1px solid #607d8b;
}

.card > .card-content {
  padding: 8px;
}
</style>

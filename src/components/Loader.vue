<template>
  <div class="loader-wrapper">
    <div class="loader"></div>
  </div>
</template>

<style scoped>
.loader-wrapper {
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  display: block;
  position: relative;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #2da79b;
  width: 4em;
  height: 4em;

  animation: spin 2s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */

  z-index: 1001;
}

.loader:before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #2da79b;

  animation: spin 3s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

.loader:after {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: #2da79b;

  animation: spin 1.5s linear infinite; /* Chrome, Firefox 16+, IE 10+, Opera */
}

@-webkit-keyframes spin {
  0% {
    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg); /* Firefox 16+, IE 10+, Opera */
  }
  100% {
    transform: rotate(360deg); /* Firefox 16+, IE 10+, Opera */
  }
}
</style>


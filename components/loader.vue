<template>
  <div class="loader">
    <svg>
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2"
            result="gooey"
          />
          <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
        </filter>
      </defs>
    </svg>
  </div>
</template>

<style scoped>
html,
body {
  background: #1b2832;
  position: absolute;
  overflow: hidden;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}

@-webkit-keyframes loader-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loader-spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
.loader {
  position: absolute;
  margin: -18px 0 0 -18px;
  border: 3.6px solid #ff974d;
  box-sizing: border-box;
  overflow: hidden;
  width: 36px;
  height: 36px;
  left: 50%;
  top: 50%;
  animation: loader-spin 2s linear infinite reverse;
  -webkit-filter: url(#goo);
  filter: url(#goo);
  box-shadow: 0 0 0 1px #ff974d inset;
}
.loader:before {
  content: "";
  position: absolute;
  -webkit-animation: loader-spin 2s cubic-bezier(0.59, 0.25, 0.4, 0.69) infinite;
  animation: loader-spin 2s cubic-bezier(0.59, 0.25, 0.4, 0.69) infinite;
  background: #ff974d;
  -webkit-transform-origin: top center;
  transform-origin: top center;
  border-radius: 50%;
  width: 150%;
  height: 150%;
  top: 50%;
  left: -12.5%;
}
</style>
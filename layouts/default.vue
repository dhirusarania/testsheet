<template>
  <div>
    <client-only>
      <NavBar
        v-if="
          $nuxt.$route.name != 'index' &&
            $nuxt.$route.name != 'dashboard-invoices'
        "
      />
      <nuxt />
    </client-only>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  components: {
    NavBar
  },
  mounted() {
    console.log($nuxt.$route.name);
  }
};
</script>
<style>
@font-face {
  font-family: "Regular";
  src: url("~static/fonts/regular.woff") format("truetype");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "Light";
  src: url("~static/fonts/light.woff") format("truetype");
  font-weight: lighter;
  font-style: normal;
}

/* @font-face {
font-family: 'Medium';
src: url('~static/fonts/um.woff2') format('truetype');
font-weight: lighter;
font-style: normal;
} */

@font-face {
  font-family: "Bold";
  src: url("~static/fonts/bold.woff") format("truetype");
  font-weight: bold;
  font-style: normal;
}

html {
  font-family: "Regular", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

body {
  font-family: "Regular", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  background-color: #f1f3f6;
}

.holder {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.07843);
  margin: 0 auto;
}

/* vue table */

table.vgt-table {
  font-size: 13px !important;
}

.vgt-table.bordered td,
.vgt-table.bordered th {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
}

.vgt-table.bordered td,
.vgt-table.bordered th {
  border: 1px solid #dcdfe6;
}
.vgt-table th.sortable {
  cursor: pointer;
}
.vgt-table thead th {
  color: #606266;
  vertical-align: bottom;
  border-bottom: 1px solid #dcdfe6;
  padding-right: 1.5em;
  background: linear-gradient(#f4f5f8, #f1f3f6);
}
.vgt-table th {
  padding: 0.75em 1.5em 0.75em 0.75em;
  vertical-align: middle;
  position: relative;
}
.vgt-left-align {
  text-align: left;
}

table.vgt-table td {
    padding: .75em .75em .75em .75em;
    vertical-align: top;
    border-bottom: 0;
    color: #606266;
}


/* quill */

.ql-snow .ql-toolbar button svg, .quillWrapper .ql-snow.ql-toolbar button svg{
  width: 17px!important;
  height:17px!important
}

.nuxt-link-active{
  color: black;
  margin-right: 5px;
  margin-left: 5px;
}

.breadcrumbs{
  margin-bottom: 15px
}

.apexcharts-svg {
  border-radius: 0 0 5px 5px;
}

.relative{
  position: relative;
}

</style>

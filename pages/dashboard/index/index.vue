<template>
  <div class="navbar-spacing padding-top-30 analytics-spacing">
    <div class="analytics">
      <div class="row">
        <div class="col s24">
          <div class="holder relative live">
            <div class="ring-container">
              <div class="ringring"></div>
              <div class="circle"></div>
            </div>
            <h3 style="padding-left: 2em!important;" class="white-text">Live Test Going On</h3>
            <div class="pt-2 pl-4 pr-5">
              <div class="row mb-0">
              <div class="col s24 m8">
                <p class="white-text">Class:  8 | Section: A | Subject: English</p>
                <p class="white-text">Students: 39 | Absent: 4 | Questions: 15</p>
              </div>
              <div class="col s24 m8">
                <p class="white-text">Class:  7 | Section: C | Subject: English</p>
                <p class="white-text">Students: 20 | Absent: 2 | Questions: 15</p>
              </div>
              <div class="col s24 m8">
                <p class="white-text">Class:  6 | Section: B | Subject: English</p>
                <p class="white-text">Students: 23 | Absent: 6 | Questions: 15</p>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-header row no-gutters">
      <div class="col s24 text-center text-sm-left mb-0">
        <div style="display:flex;justify-content: space-between;align-items:center">
          <div>
            <span class="text-uppercase page-subtitle">Dashboard</span>
            <h3 class="page-title">
              School Overview
              <span
                style="font-size: 13px;font-family:light;font-weight: lighter;"
              >(Last {{this.days}} Days)</span>
            </h3>
          </div>
          <div>
            <ul class="date_options" style="display: flex; list-style:none">
              <li @click="reloadCharts(7)">7 Days</li>
              <li @click="reloadCharts(30)">30 Days</li>
              <li @click="reloadCharts(90)">3 Months</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="analytics row">
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Tests Taken</h3>
            <p>{{orders_placed}}</p>
          </div>
          <apexchart class="charts" height="80" type="area" :options="options" :series="series"></apexchart>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Questions in Database</h3>
            <p>{{new_customers}}</p>
          </div>
          <apexchart class="charts" height="80" type="area" :options="options_1" :series="series1"></apexchart>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Question Attempted</h3>
            <p>{{today_sales}}</p>
          </div>
          <apexchart class="charts" height="80" type="area" :options="options_2" :series="series"></apexchart>
        </div>
      </div>
      <div class="col s24 m8 l6">
        <div class="card">
          <div class="card-content">
            <h3>Total Student</h3>
            <p>18</p>
          </div>
          <apexchart class="charts" height="80" type="area" :options="options_3" :series="series"></apexchart>
        </div>
      </div>
    </div>

    <div class="analytics">
      <div class="row">
        <div class="col s24">
          <div class="holder">
            <h3 class="pb-3" style="padding-left: .5em!important;">Past Exams Report</h3>
            <vue-good-table
              class="vue-good-table-correction"
              :columns="columns"
              :rows="issueproducts"
            >
              <template slot="table-row" slot-scope="props">
                <span v-if="props.column.field === 'images'">
                  <img
                    style="width: 40px; height: 40px; object-fit:contain"
                    :src="
                    baseurl +
                      '/backend/api/products/image/40/40/' +
                      props.row.images[0]
                  "
                    @error="setFallbackImageUrl"
                  />
                </span>
                <span v-else-if="props.column.field === 'issue'">
                  <p class="red-text">Shipping Information Missing</p>
                </span>
                <span v-else>{{ props.formattedRow[props.column.field] }}</span>
              </template>
            </vue-good-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  data() {
    return {
      baseurl: process.env.baseUrl,
      options: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        fill: {
          type: "gradient",
          colors: ["#9188f1"],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [100]
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {},
        xaxis: {
          type: "numeric",
          lines: {
            show: false
          },
          axisBorder: {
            show: false
          },

          labels: {
            show: false
          }
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["#9188f1"]
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0
            }
          }
        ],
        tooltip: {
          x: {
            show: false,
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      options_1: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        fill: {
          type: "gradient",
          colors: ["#4caf50"],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [100]
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {},
        xaxis: {
          type: "numeric",
          lines: {
            show: false
          },
          axisBorder: {
            show: false
          },

          labels: {
            show: false
          }
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["#4caf50"]
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0
            }
          }
        ],
        tooltip: {
          x: {
            show: false,
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      options_2: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        fill: {
          type: "gradient",
          colors: ["#ff9800"],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [100]
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        fontFamily: "Regular",
        xaxis: {
          type: "numeric",
          lines: {
            show: false
          },
          axisBorder: {
            show: false
          },

          labels: {
            show: false
          }
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["#ff9800"]
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0
            }
          }
        ],
        tooltip: {
          x: {
            show: false,
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      options_3: {
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0
          }
        },
        fill: {
          type: "gradient",
          colors: ["#2196f3"],
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.6,
            stops: [100]
          }
        },
        chart: {
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: true
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          type: "numeric",
          lines: {
            show: false
          },
          axisBorder: {
            show: false
          },

          labels: {
            show: false
          }
        },
        stroke: {
          show: true,
          width: 0,
          colors: ["#2196f3"]
        },
        yaxis: [
          {
            y: 0,
            offsetX: 0,
            offsetY: 0,
            padding: {
              left: 0,
              right: 0
            }
          }
        ],
        tooltip: {
          x: {
            show: false,
            format: "dd/MM/yy HH:mm"
          }
        }
      },
      series: [
        {
          name: "Orders",
          data: [21, 10, 45, 74, 32, 43, 23]
        }
      ],
      series1: [
        {
          name: "Customers",
          data: [10, 20]
        }
      ],
      columns: [
        {
          label: "Class",
          field: "class",
          sortable: false,
          tdClass: "capitalize"
        },
        {
          label: "Subject",
          field: "Subject",
          sortable: false,
          tdClass: "capitalize"
        },
        {
          label: "Chapter",
          field: "chapter",
          sortable: false,
          tdClass: "capitalize"
        },
        {
          label: "Students Appeared",
          field: "students",
          sortable: false,
          width: "200px",
          thClass: "capitalize"
        },
        {
          label: "Pass Percentage",
          field: "percent",
          sortable: false,
          width: "200px",
          thClass: "capitalize",
          type: 'percentage',
        }
      ],
      issueproducts: [
        {
            "class" : 7,
            "Subject" : "Science",
            "chapter" : "Thermodynamics",
            "students" : 25,
            "percent" : 0.6732,
        },
        {
            "class" : 8,
            "Subject" : "Maths",
            "chapter" : "Geometry",
            "students" : 15,
            "percent" : 0.5345,
        },
      ],
      days: 7,
      orders_placed: 12,
      new_customers: 27,
      today_sales: 45,
      admin_counts: []
    };
  },

  updated: function() {},
  mounted() {
    // this.getAnalytics(this.days);
    // this.getProductIssues();
    // this.getAdminCounts();
  },
  watch: {},
  beforeMount() {},
  methods: {
    getAnalytics: function(days) {
      // this.$store.dispatch("getAnalytics", days).then(res => {
      //   console.log(res);
      //   this.orders_placed = res.data.all_orders.reduce(this.func);
      //   this.new_customers = res.data.new_customer.reduce(this.func);
      //   this.series = [
      //     {
      //       data: res.data.all_orders
      //     }
      //   ];
      //   this.series1 = [
      //     {
      //       data: res.data.new_customer
      //     }
      //   ];
      // });
    },
    getProductIssues: function() {
      this.$store.dispatch("getProductIssues").then(res => {
        console.log(res);
        this.issueproducts = res.data.missing_shipping;
        this.issueproducts.filter(v => (v.images = JSON.parse(v.images)));
      });
    },
    getAdminCounts: function() {
      this.$store.dispatch("admin_counts").then(res => {
        console.log(res);
        this.admin_counts = res.data;
      });
    },
    func: function(a, b) {
      return a + b;
    },
    reloadCharts: function(days) {
      this.days = days;
      this.getAnalytics(days);
    }
  }
};
</script>

<style scoped>
.analytics .card {
  height: 150px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 3px 10px rgba(62, 85, 120, 0.07);
}
.analytics .card .card-content {
  padding: 20px;
  z-index: 10;
  position: relative;
}
.analytics .card .card-content h3 {
  font-size: 15px;
  font-family: "Regular";
}
.analytics .card .card-content p {
  font-size: 30px;
}

.analytics.row .col {
  margin-bottom: 25px;
}

.analytics .charts {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 9;
}

.page-title {
  padding-top: 5px;
}

.red-text {
  color: #f44336;
}

.analytics-spacing .analytics:not(:nth-child(2)) {
  margin-top: 10px;
}

.date_options li {
  padding: 0 10px;
  cursor: pointer;
}

.ring-container {
  position: absolute;
  top: 3px;
  left: 0;
}

.circle {
  width: 15px;
  height: 15px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 20px;
}

.ringring {
  border: 3px solid #fff;
  -webkit-border-radius: 30px;
  height: 25px;
  width: 25px;
  position: absolute;
  left: 15px;
  top: 15px;
  -webkit-animation: pulsate 1s ease-out;
  -webkit-animation-iteration-count: infinite;
  opacity: 0;
}
@-webkit-keyframes pulsate {
  0% {
    -webkit-transform: scale(0.1, 0.1);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1.2, 1.2);
    opacity: 0;
  }
}

.green,
.live {
  background-color: #4caf50 !important;
}
</style>

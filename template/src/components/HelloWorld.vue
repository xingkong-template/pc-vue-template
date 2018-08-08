<template>
  <div class="hello" @keydown.enter="test">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <el-table
      :data="tableData6"
      :span-method="objectSpanMethod"
      border
      style="width: 100%; margin-top: 20px">
      <el-table-column
        prop="id"
        label="ID"
        width="180"
        class-name="aaa">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="amount1"
        label="数值 1（元）">
      </el-table-column>
      <el-table-column
        prop="amount2"
        label="数值 2（元）">
        <template slot-scope="scope">
          <div class="cell">{{scope.row.amount1|NumToCny}}</div>
        </template>
      </el-table-column>
      <el-table-column
        prop="amount3"
        label="数值 3（元）">
      </el-table-column>
    </el-table>
      <el-checkbox-group 
    v-model="checkedCities1">
    <el-checkbox v-for="city in cities" :label="city.val" :key="city.name">{{city.name}}</el-checkbox>
  </el-checkbox-group>
  <el-upload
    :action="uploadApi"
    list-type="picture-card"
    :headers="headers"
    :on-preview="handlePictureCardPreview"
    :on-remove="handleRemove"
    :on-success="uploadSuccess">
    <i class="el-icon-plus"></i>
  </el-upload>
  <el-button type="primary" @click="img">查看图片</el-button>
  <img-preview src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1532514108303&di=f4bf68b0e6fe5f2c3b4755a19a84066f&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2Fqk%2Fback_origin_pic%2F00%2F02%2F28%2Fa267f1b4fc7f925e278939c12e66267a.jpg" v-model="imgFlag"></img-preview>
  <chart :options="options1" style="width: 100%;height:auth;"></chart>
  <chart :options="options2" style="width: 100%;height:auth;"></chart>
  </div>
</template>

<script>
const cityOptions = [
  { name: "上海", val: "0" },
  { name: "北京", val: "1" },
  { name: "广州", val: "2" },
  { name: "深圳", val: "3" }
];
export default {
  name: "HelloWorld",
  created() {
    console.log(this.$store);
    console.log(this.headers);
  },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      imgFlag: false,
      uploadApi:process.env.BASE_API+'/upload',
      headers:{
        Authorization:this.$store.getters.token
      },
      settings: {
        barGap: "60%"
      },
      tableData6: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15
        }
      ],
      checkedCities1: ["0", "1"],
      cities: cityOptions,
      colors: ["#003366", "#006699", "#4cabce", "#e5323e"],
      chartData: {
        columns: ["name", "访问用户", "yy"],
        rows: [
          { name: "uv 1393", 访问用户: 1393, yy: 0 },
          { name: "pv 22", 访问用户: 0, yy: 20 }
        ],
        dataEmpty: true
      },
      yAxis: {
        axisLine: {
          show: true,
          lineStyle: {
            color: "#aaa"
          }
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          textStyle: {
            color: "#999"
          }
        }
      },
      chartData2: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      },

      ////
      options1: {
        yAxis: {
          inverse: false,
          axisLine: {
            show: true,
            lineStyle: {
              color: "#aaa"
            }
          },
          axisTick: {
            show: false
          }
        },
        xAxis: {
          data: ["aa", "ss"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#aaa"
            }
          },
          axisTick: {
            show: false
          },
          interval: 2
        },
        series: [
          {
            type: "bar",
            barWidth: 40,
            stack: "one",
            data: [4593, 0]
          },
          {
            type: "bar",
            barWidth: 40,
            stack: "one",
            data: [0, 222]
          }
        ]
      },

      ////
      options2: {
        legend: {
          show: false
        },
        color: ["#003366", "#006699"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["60%", "80%"],
            avoidLabelOverlap: false,
            limitShowNum: 1,
            hoverAnimation: false,
            label: {
              show: false
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" }
            ]
          }
        ]
      }
    };
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 4) {
        if (rowIndex % 5 === 0) {
          return {
            rowspan: 5,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    test() {
      console.log("sadsad");
    },
    img() {
      this.imgFlag = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadSuccess(res){
      console.log(res)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

<template>
    <div id="pie"></div>
</template>
<script setup lang="ts" name="pie">
import * as echarts from 'echarts/core';
import {
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted,nextTick,watch, watchEffect, } from 'vue';
const props = defineProps(['distribution'])
let pieData:any = []

watch(props.distribution,(newVal)=>{
    newVal.forEach((e:any)=>{
        let tmp:any = {}
        tmp.name = e.name
        tmp.value = e.count
        pieData.push(tmp)
    })
    setupPieChart()
})
echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);

type EChartsOption = echarts.ComposeOption<
  TooltipComponentOption | LegendComponentOption | PieSeriesOption
>;

const setupPieChart =  ()=>{
    var chartDom = document.getElementById('pie')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
    tooltip: {
        trigger: 'item'
    },
    legend: {
        top: '5%',
        left: 'center'
    },
    series: [
        {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
        },
        label: {
            show: false,
            position: 'center'
        },
        emphasis: {
            label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
            }
        },
        labelLine: {
            show: false
        },
        data: pieData
        }
    ]
    };
    option && myChart.setOption(option);
}

onMounted(()=>{

})

</script>
<style lang="scss" scoped>
</style>
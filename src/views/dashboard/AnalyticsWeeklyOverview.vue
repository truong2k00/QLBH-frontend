<script setup lang="ts">
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

const vuetifyTheme = useTheme()

const options = computed(() => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)

  const disabledColor = `rgba(${hexToRgb(currentTheme.value['on-surface'])},${variableTheme.value['disabled-opacity']})`
  const borderColor = `rgba(${hexToRgb(String(variableTheme.value['border-color']))},${
    variableTheme.value['border-opacity']
  })`

  return {
    chart: {
      offsetY: -10,
      offsetX: -15,
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '30%',
      },
    },
    stroke: {
      width: 2,
      colors: [currentTheme.value.surface],
    },
    legend: { show: false },
    grid: {
      borderColor,
      strokeDashArray: 7,
      xaxis: { lines: { show: false } },
    },
    dataLabels: { enabled: false },
    colors: series[0].data.map(value => {
      // Xác định màu sắc dựa trên giá trị của điểm dữ liệu
      if (value >= 500) {
        return currentTheme.value['track-bg'], 'rgba(var(--v-theme-primary),1)'
      } else if (value >= 100) {
        return 'rgba(var(--v-theme-secondary),1)'
      } else {
        return currentTheme.value['track-bg']
      }
    }),
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    xaxis: {
      categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      tickPlacement: 'on',
      labels: { show: false },
      crosshairs: { opacity: 0 },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        style: {
          colors: disabledColor,
          fontSize: '13px',
        },

        formatter: (value: number) => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}k`,
      },
    },
    responsive: [
      {
        breakpoint: 1560,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '35%',
            },
          },
        },
      },
      {
        breakpoint: 1380,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '45%',
            },
          },
        },
      },
    ],
  }
})

const series = [{ data: [397, 57, 735, 735, 57, 40, 65] }]
const colors = series[0].data.map(value => {
  // Xác định màu sắc dựa trên giá trị của điểm dữ liệu
  if (value >= 500) {
    return 'track-bg rgba(var(--v-theme-primary),1)' // Màu sắc cho giá trị lớn hơn hoặc bằng 500
  } else if (value >= 100) {
    return 'rgba(var(--v-theme-secondary),1)' // Màu sắc cho giá trị lớn hơn hoặc bằng 100 và nhỏ hơn 500
  } else {
    return 'rgba(0,0,0,0)' // Màu sắc mặc định cho các giá trị còn lại
  }
})

// Bây giờ mảng colors chứa các màu sắc tương ứng với giá trị của từng điểm dữ liệu trong chuỗi series
console.log(colors)
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Weekly Overview</VCardTitle>

      <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        type="bar"
        :options="options"
        :series="series"
        :height="200"
      />

      <div class="d-flex align-center mb-5 gap-x-4">
        <h4 class="text-h4">45%</h4>
        <p class="mb-0">
          Your sales performance is 45% <span class="text-high-emphasis">😎</span> better compared to last month
        </p>
      </div>

      <VBtn block> Details </VBtn>
    </VCardText>
  </VCard>
</template>

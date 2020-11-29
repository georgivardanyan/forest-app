import React from 'react'

export const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'relative volume (m3 per hectare)',
      },
    }],
  },
  legend: {
    onClick(e: React.MouseEvent) {
      e.stopPropagation()
    },
  },
}

export interface IVolumeKey {
  [key: string]: number
}

export interface IBarChartDataset {
  label: string
  data: number[]
  backgroundColor: string[] | CanvasGradient
  borderWidth: number
}

export interface IScatterChartDataset {
  label: string
  data: ICoordinates[]
  backgroundColor: string[] | CanvasGradient
  pointRadius: number
  pointHoverRadius: number
}

type IChartDataset = IBarChartDataset | IScatterChartDataset

export interface IChartData {
  labels?: string[]
  datasets: IChartDataset[]
}

export interface ICoordinates {
  x: number
  y: number
}

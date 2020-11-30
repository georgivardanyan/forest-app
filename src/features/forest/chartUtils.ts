import React from 'react'
import { Species } from './types'

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

export interface ICoordinates {
  x: number
  y: number
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

export interface IPieChartDataset {
  data: number[]
  backgroundColor: string[] | CanvasGradient
}

type IChartDataset = IBarChartDataset | IScatterChartDataset | IPieChartDataset

export interface IChartData {
  labels?: string[]
  datasets: IChartDataset[]
}

type ISpeciesColors = {
  [key: string]: string
}

export const speciesColors: ISpeciesColors = {
  [Species.pine]: '#01796f',
  [Species.spruce]: '#12552b',
  [Species.birch]: '#f8dfa1',
  [Species.other]: '#b5b5aa',
}

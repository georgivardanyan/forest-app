import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectSelectedSpecies, selectStandsBySpecies } from '../features/forest/forestSlice'
import { RootState } from '../app/store'
import {
  IChartData,
  ICoordinates,
  IScatterChartDataset,
  IVolumeKey,
  options,
} from '../features/forest/chartUtils'
import { max, min, range, round, meanBy } from 'lodash'
import { ChartCanvasContainer } from '../features/forest/ChartCanvasContainer'
import { Scatter } from 'react-chartjs-2'

interface IPreparedData {
  data: ICoordinates[]
}

const scatterplotOptions = Object.assign(options, {
  tooltips: {
    callbacks: {
      label(tooltipItem: any) {
        return tooltipItem.yLabel
      },
    },
  },
})

export const Scatterplot: FC = () => {
  const selectedSpecies = useSelector(selectSelectedSpecies)
  const stands = useSelector(((state: RootState) => selectStandsBySpecies(state, selectedSpecies)))

  const [chartData, setChartData] = useState<IChartData>()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const preparedData = useMemo<IPreparedData>(() => {
    const volumes = stands.map(o => ({
      vol: round(o.relative_vol, -1),
      age: o.age,
    }))

    const maxVolume = max(volumes.map(o => o.vol)) as number
    const minVolume = min(volumes.map(o => o.vol)) as number

    const volumeKeys: IVolumeKey = {}

    range(minVolume, maxVolume + 10, 10).forEach((key) => {
      volumeKeys[key.toString()] = round(meanBy(volumes.filter(o => o.vol === key), 'age'))
    })

    const data: ICoordinates[] = []

    Object.entries(volumeKeys).forEach(([key, value]) => {
      data.push({ x: +key, y: value })
    })

    return { data }
  }, [stands])

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!

    const gradient = ctx.createLinearGradient(containerRef.current!.offsetWidth, 0, 0, 0)
    gradient.addColorStop(0, 'rgb(255,92,38)')
    gradient.addColorStop(1, 'rgb(207,255,135)')

    const { data } = preparedData

    const dataset: IScatterChartDataset = {
      label: 'average age',
      data,
      backgroundColor: gradient,
      pointRadius: 5,
      pointHoverRadius: 8,
    }

    const newChartData: IChartData = {
      datasets: [dataset],
    }

    setChartData(newChartData)
  }, [preparedData])

  return (
    <ChartCanvasContainer ref={containerRef}>
      <canvas ref={canvasRef} style={{ display: 'none' }}/>
      {chartData && <Scatter data={chartData} options={scatterplotOptions}/>}
    </ChartCanvasContainer>
  )
}

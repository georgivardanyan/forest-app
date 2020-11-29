import React, { FC, useEffect, useMemo, useRef, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import {
  selectSelectedSpecies,
  selectStandsBySpecies,
} from '../features/forest/forestSlice'
import { max, round, min, range, throttle } from 'lodash'
import { RootState } from '../app/store'
import { ChartCanvasContainer } from '../features/forest/ChartCanvasContainer'
import {
  IBarChartDataset,
  IChartData,
  IVolumeKey,
  options,
} from '../features/forest/chartUtils'

interface IPreparedData {
  labels: string[]
  data: number[]
}

export const Histogram: FC = () => {
  const [barKey, setBarKey] = useState<number>(1)
  const selectedSpecies = useSelector(selectSelectedSpecies)

  const stands = useSelector(((state: RootState) => selectStandsBySpecies(state, selectedSpecies)))

  const [chartData, setChartData] = useState<IChartData>()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const incrementBarKey = useRef(throttle(() => {
    setBarKey(prev => prev + 1)
  }, 500))

  useEffect(() => {
    const onResize = () => {
      incrementBarKey.current()
    }

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const preparedData = useMemo<IPreparedData>(() => {
    const volumes = stands.map(o => round(o.relative_vol, -1))
    const maxVolume = max(volumes) as number
    const minVolume = min(volumes) as number

    const volumeKeys: IVolumeKey = {}

    range(minVolume, maxVolume + 10, 10).forEach((key) => {
      volumeKeys[key.toString()] = volumes.filter(o => o === key).length
    })

    const labels: string[] = []
    const data: number[] = []

    Object.entries(volumeKeys).forEach(([key, value]) => {
      labels.push(key)
      data.push(value)
    })

    return { labels, data }
  }, [stands])

  useEffect(() => {
    const ctx = canvasRef.current!.getContext('2d')!

    const gradient = ctx.createLinearGradient(containerRef.current!.offsetWidth, 0, 0, 0)
    gradient.addColorStop(0, 'rgb(255,92,38)')
    gradient.addColorStop(1, 'rgb(207,255,135)')

    const { labels, data } = preparedData

    const dataset: IBarChartDataset = {
      label: '# of stands',
      data,
      backgroundColor: gradient,
      borderWidth: 1,
    }

    const newChartData: IChartData = {
      labels,
      datasets: [dataset],
    }

    setChartData(newChartData)
  }, [preparedData, barKey])

  return (
    <ChartCanvasContainer ref={containerRef}>
      <canvas ref={canvasRef} style={{ display: 'none' }}/>
      {chartData && <Bar data={chartData} options={options}/>}
    </ChartCanvasContainer>
  )
}

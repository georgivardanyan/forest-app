import React, { FC, useEffect, useMemo, useState } from 'react'
import { ChartCanvasContainer } from '../features/forest/ChartCanvasContainer'
import { useSelector } from 'react-redux'
import { selectStands } from '../features/forest/forestSlice'
import { IChartData, IPieChartDataset, speciesColors } from '../features/forest/chartUtils'
import { chain } from 'lodash'
import { Pie as PieChart } from 'react-chartjs-2'

interface IPreparedData {
  data: number[]
  labels: string[]
  backgrounds: string[]
}

export const Pie: FC = () => {
  const stands = useSelector(selectStands)

  const [chartData, setChartData] = useState<IChartData>()

  const preparedData = useMemo<IPreparedData>(() => {
    const data: number[] = []
    const labels: string[] = []
    const backgrounds: string[] = []

    const species = chain(stands)
      .groupBy('main_species')
      .map((stands, type) => ({
        type,
        amount: stands.length,
      }))
      .value()

    species.forEach(item => {
      labels.push(item.type)
      data.push(item.amount)
      backgrounds.push(speciesColors[item.type])
    })

    return { data, labels, backgrounds }
  }, [stands])

  useEffect(() => {
    const { labels, data, backgrounds } = preparedData

    const dataset: IPieChartDataset = {
      data,
      backgroundColor: backgrounds,
    }

    const newChartData: IChartData = {
      labels,
      datasets: [dataset],
    }

    setChartData(newChartData)
  }, [preparedData])

  return (
    <ChartCanvasContainer>
      {chartData && <PieChart data={chartData} options={{ animation: { animateScale: true } }}/>}
    </ChartCanvasContainer>
  )
}

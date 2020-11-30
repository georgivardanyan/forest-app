import React, { FC } from 'react'

import { CSVReader } from 'react-papaparse'
import { IForestStand } from '../features/forest/types'
import { useDispatch } from 'react-redux'
import { setStands, setLoading } from '../features/forest/forestSlice'

interface IParsedData {
  data: IForestStand
  errors: []
  meta: object
}

export const Upload: FC = () => {
  const dispatch = useDispatch()

  const handleOnDrop = (data: any) => {
    dispatch(setLoading(true))
    const stands: IForestStand[] = data.filter((o: IParsedData) => !o.errors.length).map((o: IParsedData) => o.data)

    dispatch(setStands(stands))

    setTimeout(() => {
      dispatch(setLoading(false))
    }, 2300)
  }

  const readerConfig = {
    header: true,
    dynamicTyping: true,
    transformHeader(name: string) {
      switch (name) {
        case 'standid':
          return 'id'
        case 'longitude':
          return 'lng'
        case 'latitude':
          return 'lat'
        case 'vol_m3_per_ha':
          return 'relative_vol'
        case 'age_years':
          return 'age'
        case 'size_in_ha':
          return 'size'
        default:
          return name
      }
    },
  }

  const handleOnError = (err: any, file: any, inputElem: any, reason: any) => {
    alert('Something went wrong!')
  }

  return (
    <>
      <CSVReader
        onDrop={handleOnDrop}
        onError={handleOnError}
        config={readerConfig}
      >
        <span>Drop CSV file here or click to upload</span>
      </CSVReader>
    </>
  )
}

import React, { ChangeEvent, FC } from 'react'
import styled from 'styled-components'
import { Species } from '../features/forest/types'
import { useDispatch, useSelector } from 'react-redux'
import { selectSelectedSpecies, setSelectedSpecies } from '../features/forest/forestSlice'

const FilterContainer = styled.div`
  text-align: right;
  margin-bottom: 1rem;
`

const Select = styled.select`
  outline: none;
  border: 2px solid lightgreen;
  border-radius: 5px;
  background: white;

  .selected {
    background: #3ee;
  }
`


export const SpeciesFilter: FC = () => {
  const val = useSelector(selectSelectedSpecies)
  const dispatch = useDispatch()

  return (
    <FilterContainer>
      <Select value={val}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => dispatch(setSelectedSpecies(e.target.value))}>
        <option value="" className={val === '' ? 'selected' : ''}>All</option>
        {Object.values(Species).map(t => <option value={t} key={t}
                                                 className={val === t ? 'selected' : ''}>{t}</option>)}
      </Select>
    </FilterContainer>
  )
}

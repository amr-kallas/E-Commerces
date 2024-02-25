import TextField from './TextField'
import { useSearchParams } from 'react-router-dom'
import useQuerySearchParams from '../../hooks/useQuerySeachParams'
import { useEffect, useState } from 'react'
const SearchDate = () => {
  const { q, clearSearchParams } = useQuerySearchParams()
  const [, setSearchParams] = useSearchParams()
  const [dateInput, setDateInput] = useState('')
  console.log({dateInput})

  useEffect(() => {
    setSearchParams({ q, date: dateInput })
    if (!dateInput) {
      clearSearchParams()
    }
  }, [dateInput])
  return (
    <form style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        type="date"
        placeholder="Search..."
        onChange={(e) => setDateInput(e.target.value)}
        size="small"
        sx={{
          maxWidth: 250,
          margin: '10px 0',
          '.MuiInputBase-root': {
            pl: '6px',
          },
        }}
      />
    </form>
  )
}

export default SearchDate

import TextField from './TextField'
import useQuerySearchParams from '@hooks/useQuerySeachParams'
import { useEffect, useState } from 'react'
const SearchDate = () => {
  const { setQueryParam } = useQuerySearchParams()
  const [dateInput, setDateInput] = useState('')
  useEffect(() => {
    setQueryParam('date', dateInput)
  }, [dateInput])
  return (
    <form style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        type="date"
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

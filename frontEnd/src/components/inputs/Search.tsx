import { IconButton, InputAdornment } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import SearchIcon from '@mui/icons-material/Search'
import { useSearchParams } from 'react-router-dom'
import useQuerySearchParams from '../../hooks/useQuerySeachParams'
import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/ useDebounce'
const Search = () => {
  const { q, clearSearchParams } = useQuerySearchParams()
  const [searchInput, setSearchInput] = useState('')
  const debounceSearch = useDebounce(searchInput)
  const [, setSearchParams] = useSearchParams()
  const handleResetInput = () => {
    setSearchInput('')
  }
  useEffect(() => {
    setSearchParams({ q: debounceSearch })
    if (q.length == 0 && !debounceSearch) {
      clearSearchParams()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, debounceSearch])
  return (
    <form style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        placeholder="Search..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        size="small"
        sx={{
          maxWidth: 250,
          margin: '10px 0',
          '.MuiInputBase-root': {
            pl: '6px',
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: searchInput && (
            <InputAdornment position="end">
              <IconButton onClick={handleResetInput}>
                <CloseIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </form>
  )
}

export default Search

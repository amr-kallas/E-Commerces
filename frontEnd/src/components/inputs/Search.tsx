import { IconButton, InputAdornment } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import TextField from './TextField'
import SearchIcon from '@mui/icons-material/Search'
import useQuerySearchParams from '@hooks/useQuerySeachParams'
import { useEffect, useState } from 'react'
import useDebounce from '@hooks/ useDebounce'
import { useTranslation } from 'react-i18next'
const Search = () => {
  const {t}=useTranslation('layout')
  const { setQueryParam } = useQuerySearchParams()
  const [searchInput, setSearchInput] = useState('')
  const debounceSearch = useDebounce(searchInput)
  const handleResetInput = () => {
    setSearchInput('')
  }
  useEffect(() => {
    setQueryParam('q', debounceSearch)
  }, [debounceSearch])
  return (
    <form style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        variant="outlined"
        placeholder={t('search')}
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

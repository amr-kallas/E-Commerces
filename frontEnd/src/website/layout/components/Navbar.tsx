import Search from '@components/inputs/Search'
import { Box, Button, Container, IconButton, Stack } from '@mui/material'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import PersonIcon from '@mui/icons-material/Person'
import logo from '@assets/Logo.png'
import { queries } from '@dashbord/features/product/api/queries'
import { Link } from 'react-router-dom'
const Navbar = () => {
  const { data } = queries.useAllCategories()
  return (
    <Container>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            width: 75,
            height: 55,
            mt: 1,
          }}
        >
          <img src={logo} alt="" style={{ width: '100%', height: '100%' }} />
        </Box>
        <Box
          sx={{
            flex: 1,
            width: 1,
            '.MuiTextField-root': {
              maxWidth: 450,
            },
            form: {
              justifyContent: 'center',
            },
            '@media(max-width:400px)': {
              flex: 'none',
              order: 3,
              margin: 'auto',
            },
          }}
        >
          <Search />
        </Box>
        <Stack direction="row">
          <IconButton>
            <LocalGroceryStoreOutlinedIcon />
          </IconButton>
          <IconButton color="primary">
            <PersonIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        sx={{
          justifyContent: 'start',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 1,
          mt: 2,
        }}
      >
        {data?.map((item) => (
          <Button key={item.id}>
            <Link
              to={item.title}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              {item.title}
            </Link>
          </Button>
        ))}
        <Button>Show All</Button>
      </Stack>
    </Container>
  )
}

export default Navbar

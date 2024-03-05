import { motion, useMotionValue, animate } from 'framer-motion'
import { Product } from '@website/product/api/type'
import { useEffect, useRef, useState } from 'react'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import Loading from './Loading'
type SliderProps =
  | {
      product: Product[]
      skeleton: undefined
    }
  | {
      product: undefined
      skeleton: true
    }
const Slider = ({ product, skeleton }: SliderProps) => {
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const sliderPosition = useMotionValue(0)
  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        const offsetWidth = ref.current.offsetWidth
        setWidth(1580 - offsetWidth)
      }
    }
    updateWidth()

    window.addEventListener('resize', updateWidth)

    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const handleLeftArrowClick = () => {
    const newPosition =
      sliderPosition.get() < 0 ? sliderPosition.get() + 100 : 0

    animate(sliderPosition, newPosition, { duration: 0.5 })
  }
  const handleRightArrowClick = () => {
    const newPosition =
      sliderPosition.get() > -width ? sliderPosition.get() - 100 : -width
    animate(sliderPosition, newPosition, { duration: 0.5 })
  }
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginTop: '100px',
        marginBottom: '100px',
      }}
    >
      <IconButton onClick={handleLeftArrowClick}>
        <ArrowLeftIcon />
      </IconButton>
      <motion.div
        style={{
          overflow: 'hidden',
          cursor: 'grab',
        }}
        ref={ref}
      >
        <motion.div
          drag="x"
          whileTap={{ cursor: 'grabbing' }}
          dragConstraints={{ right: 0, left: -width }}
          style={{ display: 'flex', x: sliderPosition, gap: '16px' }}
        >
          {product?.map((item) => (
            <Box
              key={item.id}
              sx={{
                '&:hover .image2': {
                  opacity: '1 !important',
                },
              }}
            >
              <motion.div
                key={item.id}
                style={{
                  minHeight: 'fit-content',
                  minWidth: '250px',
                  position: 'relative',
                }}
              >
                <img
                  src={item.images[0].image}
                  style={{
                    width: '100%',
                    height: '250px',
                    pointerEvents: 'none',
                  }}
                />
                {item.images.length > 1 && (
                  <img
                    className="image2"
                    src={item.images[1].image}
                    style={{
                      width: '100%',
                      height: '250px',
                      pointerEvents: 'none',
                      position: 'absolute',
                      inset: 0,
                      opacity: 0,
                      transition: '.4s',
                    }}
                  />
                )}

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 'bold',
                  }}
                >
                  {item.title}
                </Typography>
                <Stack direction="row" spacing={1}>
                  {item.discount != '0' && (
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#777',
                        textDecoration: 'line-through',
                      }}
                    >
                      {item.discount}$
                    </Typography>
                  )}
                  <Typography variant="body1">{item.price}$</Typography>
                </Stack>
                <Button
                  variant="outlined"
                  sx={{
                    width: 1,
                    mt: 2,
                    textTransform: 'capitalize',
                    fontSize: '1rem',
                    p: 1,
                    borderColor: theme.palette.secondary.main,
                    color: theme.palette.secondary.main,
                  }}
                >
                  Choose Option
                </Button>
              </motion.div>
            </Box>
          ))}
          {skeleton && (
            <>
              <Loading />
              <Loading />
              <Loading />
              <Loading />
            </>
          )}
        </motion.div>
      </motion.div>
      <IconButton onClick={handleRightArrowClick}>
        <ArrowRightIcon />
      </IconButton>
    </div>
  )
}

export default Slider

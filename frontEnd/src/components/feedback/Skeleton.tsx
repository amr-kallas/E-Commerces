import { Skeleton as MuiSkeleton, SkeletonProps as Props } from '@mui/material'
type widthRange = {
  min: number
  max: number
}
type SkeletonType = {
  widthRange: widthRange
} & Props
export const Skeleton = ({ widthRange, ...props }: SkeletonType) => {
  const widthSkeleton = widthRange.min + Math.random() * widthRange.max
  const heightSkeleton = 30
  return (
    <MuiSkeleton width={widthSkeleton} height={heightSkeleton} {...props} />
  )
}

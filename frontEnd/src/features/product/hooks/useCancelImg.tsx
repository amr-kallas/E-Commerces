import { queries } from '../api/queries'
export const useCancelImages = () => {
  const DeleteImg = queries.useDeleteImg()

  const cancelImages = (ids: string[]) => {
    ids.forEach((id) => {
      DeleteImg.mutateAsync(id, {
        onError: (error) => {
          console.log(error)
        },
      })
    })
  }

  return cancelImages
}

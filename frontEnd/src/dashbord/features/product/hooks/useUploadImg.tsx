import { useProgressContext } from '@context/ProgressContext'
import { queries } from '../api/queries'
type UploadImageProps = {
  imgs: File[]
  id: string
}
const useUploadImg = () => {
  const { setPercentage, indexRef, setIds } = useProgressContext()
  const addImg = queries.useAddImg()
  const uploadImage = async ({ imgs, id }: UploadImageProps) => {
    let c = 0
    for (const [index, element] of imgs.entries()) {
      if (index == c) {
        indexRef.current++
        c++
      }
      const changePercentageAtIndex = (newValue: number) => {
        setPercentage((oldArray: any) => {
          const newArray = [...oldArray]
          newArray[indexRef.current] = { num: newValue }
          return newArray
        })
      }
      const currentBody = {
        image: element,
        product_id: id,
      }
      await new Promise((resolve) => setTimeout(resolve, 1000))
      if (imgs.length != 0) {
        await addImg.mutateAsync(
          { body: currentBody, changePercentageAtIndex },
          {
            onSuccess: (data) => {
              setIds((prev) => [...prev, data.id])
            },
            onError: (error) => {
              console.log(error)
            },
          }
        )
      }
    }
  }
  return uploadImage
}

export default useUploadImg

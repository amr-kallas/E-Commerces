import { useProgressContext } from '../../context/ProgressContext'
import useEditSearchParams from '../useEditSearchParams'
import { queries } from '../../features/product/api/queries'
const useUploadImg = () => {
  const { setPercentage, indexRef, setIds } = useProgressContext()
  const { id } = useEditSearchParams()
  const addImg = queries.useAddImg()

  const uploadImage = async (files: File[]) => {
    let c = 0
    for (const [index, element] of files.entries()) {
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
      if (files.length != 0) {
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

import Storage from '@utils/storage'
import { queries } from '../api/queries'

export const GoogleCallBack = () => {
  const { data, isLoading, isError } = queries.useGoogle()
  if (!isLoading && !isError) {
    const token = data.access_token
    Storage.setToken(token)
  }

  return <div>GoogleCallBack</div>
}

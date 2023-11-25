import { useTranslation } from 'react-i18next'

const TableHeader = () => {
  const { t } = useTranslation('category', { keyPrefix: 'table' })
  return [t('id'), t('title'), t('image'), t('action')]
}

export default TableHeader

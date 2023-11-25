import { useTranslation } from 'react-i18next'

const TableHeader = () => {
  const { t } = useTranslation('product', { keyPrefix: 'table' })
  return [
    t('id'),
    t('title'),
    t('description'),
    t('images'),
    t('price'),
    t('rating'),
    t('action'),
  ]
}

export default TableHeader

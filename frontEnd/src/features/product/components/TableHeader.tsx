import { useTranslation } from 'react-i18next'

const TableHeader = () => {
  const { t } = useTranslation('product', { keyPrefix: 'table' })
  return [
    'id',
    t('title'),
    t('description'),
    t('images'),
    t('price'),
    t('rating'),
    t('created'),
    t('updated'),
    t('action'),
  ]
}

export default TableHeader

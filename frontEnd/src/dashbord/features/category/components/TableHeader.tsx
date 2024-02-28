import { useTranslation } from 'react-i18next'

const TableHeader = () => {
  const { t } = useTranslation('category', { keyPrefix: 'table' })
  return ['id', t('title'), t('image'), t('created'), t('updated'), t('action')]
}

export default TableHeader

import { useTranslation } from 'react-i18next'
const HeaderTable = () => {
  const { t } = useTranslation('user',{keyPrefix:"table"})
  return ['id', t('name'), t('email'), t('role'), t('action')]
}

export default HeaderTable

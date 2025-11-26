import { STATUS_EN_TO_KO } from '@src/constants/constants'

export const getTradeStatus = (tradeStatus: string) => {
  const condition = STATUS_EN_TO_KO.find((status) => status.value === tradeStatus)
  return condition?.name || tradeStatus
}

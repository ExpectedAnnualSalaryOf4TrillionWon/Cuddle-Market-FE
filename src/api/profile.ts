import type { WithDrawRequest, WithDrawResponse } from '../types'
import { api } from './api'

export const withDraw = async (requestData: WithDrawRequest) => {
  await api.delete<WithDrawResponse>(`/auth/withdraw`, { data: requestData })
}

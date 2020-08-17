import { setupWorker } from 'msw'
import { SetupWorkerApi } from 'msw/lib/types/setupWorker/setupWorker'


const mocks = [
  rest.get('/api/user/:userId/point', (req, res, ctx) => {
    const { userId } = req.params
    return res(
      ctx.json({
        userId,
        point: 12000,
        limitedPeriodPoint: 500
      }),
    )
  }),
]

const worker = setupWorker(...mocks)

export const startServiceWoker = async (): ReturnType<SetupWorkerApi['start']> => worker.start()
export const stopServiceWorker = (): void => worker.stop()


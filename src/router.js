import controller from './controller'
import { Router } from 'express'
import wrapper from 'express-async-handler'

const router = new Router()

router.get('/countries-by-isolation',
    wrapper(controller.countries_by_isolation))
router.post('/find-closest', 
    controller.validators, wrapper(controller.find_closest))

export default router
import { Router } from "express"
import {createJournal, lastTenJournals} from '../controllers/journal.controller.js'
const router = Router()

router.post('/create',createJournal)
router.post('/recent',lastTenJournals)

export default router
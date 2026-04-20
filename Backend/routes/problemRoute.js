import express from "express"
import {getProblems,getProblemById,createProblem,joinProlem,updateProblemStatus,addProblemUpdate} from "../controller/problemController.js"
const router = express.Router()

router.get('/',getProblems)
routter.get('/:id',getProblemById)
roouter.post('/',createProblem)
router.post('/:id/join',joinProlem)
router.post('/:id/status',updateProblemStatus)
router.post('/:id/update',addProblemUpdate)

export default router

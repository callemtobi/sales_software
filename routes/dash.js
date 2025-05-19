import { Router } from "express";

const router = Router();

router.get('/', async (req, res) => {
    res.render('dash');
})

export default router;
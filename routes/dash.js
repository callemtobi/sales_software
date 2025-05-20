import { Router } from "express";
import multer from "multer";
import Company from "../models/Company.js";

const router = Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
}) 
const upload = multer({storage : storage});

router.route('/company/add')
    .get(async (req, res) => {
        try {
            const getCompanies = await Company.find({});
            return res.render('companyDash', {comp: getCompanies});
        } catch(err) {
            res.status(404).json(err);
        }
    })
    .post(upload.single('compBgImage'), async (req, res) => {
        const {compName, compDesc, coreProd } = req.body;
        const file = req.file;

        const newCompany = new Company({name: compName, desc: compDesc, img: file.filename, coreProduct: coreProd});

        try {
            const addCompany = await newCompany.save();
            res.redirect('/home');
            // res.status(200).json("Company added ----------> " + addCompany);
        } catch(err) {
            res.status(404).json(err);
        }

    })

router.post('/company/delete/:id', async (req, res) => {
    try {
        const deleteComp = await Company.findByIdAndDelete(req.params.id);
        console.log('----------> Company deleted');

        if (!deleteComp) {
            return res.status(400).json('Product not found');
        }

        if (deleteComp.img) {
            const imagePath = path.join(process.cwd(), 'uploads', deleteComp.img);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        res.redirect('/admin/company/add');
    } catch (err) {
        return res.status(400).json(err + "Error deleting product");
    }
});

export default router;
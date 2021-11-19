const { Router} = require('express');
const shopController = require('../controllers/shopController')
const router = Router();
router.get("/", (req, res) => {
  res.send("welcome");
});
router.get('/api/v1/shops', shopController.shops_get);
router.get('/api/v1/shops/:id', shopController.shops_get_byID);
router.post('/api/v1/shops',shopController.shop_post);
router.post('/api/v1/shoplogin',shopController.authenticate_post);

module.exports = router;

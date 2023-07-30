import express from "express";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("from get request");
});
// router.put("/", function (req, res, next) {
//   res.send("from get put");
// });
// router.delete("/", function (req, res, next) {
//   res.send("from get delete");
// });
export default router;

import express, { NextFunction } from "express";
const router = express.Router();

/* GET home page. */
// enveloping

const requestTime = function (req: any, res: Response, next: NextFunction) {
  req.requestTime = Date.now();
  next();
};

router.get("/", function (req, res, next) {
  res.json({
    msg: "from get request",
  });
});
router.put("/", function (req, res, next) {
  res.json({
    msg: "from put request",
  });
});
router.post("/", function (req, res, next) {
  res.json({
    msg: "from post request",
  });
});
router.delete("/", function (req, res, next) {
  res.json({
    msg: "from delete request",
  });
});

export default router;

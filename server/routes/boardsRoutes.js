const express = require("express");
router = express.Router();
const controller = require("../controllers/boardsControllers");

router.get("/all", controller.showAllBoards);
router.post("/add", controller.addNewBoard);
router.post("/update", controller.updateBoard);
router.delete("/delete", controller.deleteBoard);
router.get("/board", controller.showOneBoard);
module.exports = router;

const router = require("express").Router();
const Slot = require("../models/slot");

router.get("/", async (req, res) => {
  try {
    const records = await Slot.all();
    res.status(200).json({ records });
  } catch (error) {
    res.status(200).json({ error });
  }
});

router.post("/", async (req, res) => {
  try {
    const { day, slot, plateNumber, fullName } = req.body;
    if (!day) res.status(422).json({ msg: "day_param_is_required" });
    if (!slot) res.status(422).json({ msg: "slot_param_is_required" });
    if (!plateNumber) res.status(422).json({ msg: "plateNumber_param_is_required" });
    if (!fullName) res.status(422).json({ msg: "fullName_param_is_required" });
    const record = await Slot.book({ day, slot, plateNumber, fullName });
    res.status(201).json({record});
  } catch (error) {
    res.status(422).json({ msg: error });
    console.log({error});
  }
});

router.get("/:day", async (req, res) => {
  try {
    const { day } = req.params;
    const formattedDay = day.replace(/_/g, '/');
    const records = await Slot.findById(formattedDay);
    res.status(200).json({ records });
  } catch (error) {
    res.status(200).json({ error });
  }
});

module.exports = router;

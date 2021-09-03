const router = require("express").Router();

const Action = require("./actions-model");

const { validateActionID, validateAction } = require("./actions-middlware");

router.get("/", (req, res, next) => {
  Action.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionID, (req, res) => {
  res.json(req.actionID);
});

router.post("/", validateAction, (req, res, next) => {
  Action.insert(req.action)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.put("/:id", validateActionID, validateAction, (req, res, next) => {
  const { id } = req.params;
  Action.update(id, req.action)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.delete("/:id", validateActionID, (req, res, next) => {
  const { id } = req.params;
  Action.remove(id)
    .then(() => next())
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: `Something went wrong`,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;

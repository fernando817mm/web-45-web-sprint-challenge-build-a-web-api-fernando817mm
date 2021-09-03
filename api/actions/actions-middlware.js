const { get } = require("./actions-model");
const yup = require("yup");

const actionSchema = yup.object({
  description: yup.string().max(128).required(),
  notes: yup.string().required(),
  project_id: yup.number().required(),
});

const validateActionID = (req, res, next) => {
  const { id } = req.params;
  get(id).then((action) => {
    action
      ? ((req.actionID = action), next())
      : next({
          status: 404,
        });
  });
};

const validateAction = (req, res, next) => {
  const action = req.body;
  actionSchema
    .validate(action)
    .then((action) => {
      req.action = action;
      next();
    })
    .catch(() => {
      next({
        status: 400,
      });
    });
};

module.exports = {
  validateActionID,
  validateAction,
};

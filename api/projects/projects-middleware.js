const yup = require("yup");
const { get } = require("./projects-model");

const projectSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
});

const projectUpdateSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  completed: yup.boolean().required(),
});

const validateProjectID = (req, res, next) => {
  const { id } = req.params;
  get(id)
    .then((project) => {
      project
        ? ((req.projectID = project), next())
        : next({
            status: 404,
          });
    })
    .catch(next);
};

const validateProject = (req, res, next) => {
  const project = req.body;
  projectSchema
    .validate(project)
    .then((project) => {
      req.project = project;
      next();
    })
    .catch(() => {
      next({
        status: 400,
      });
    });
};

const validateProjectUpdate = (req, res, next) => {
  const project = req.body;
  projectUpdateSchema
    .validate(project)
    .then((project) => {
      req.updatedProject = project;
      next();
    })
    .catch(() => {
      next({
        status: 400,
      });
    });
};

module.exports = {
  validateProjectID,
  validateProject,
  validateProjectUpdate,
};

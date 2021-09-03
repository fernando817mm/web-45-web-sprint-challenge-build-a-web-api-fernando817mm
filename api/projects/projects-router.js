const express = require("express");
const router = express.Router();
const Project = require("./projects-model");

const {
  validateProjectID,
  validateProject,
  validateProjectUpdate,
} = require("./projects-middleware");

router.get("/", (req, res, next) => {
  Project.get()
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.get("/:id", validateProjectID, (req, res) => {
  res.json(req.projectID);
});

router.post("/", validateProject, (req, res, next) => {
  Project.insert(req.project)
    .then((project) => {
      res.json(project);
    })
    .catch(next);
});

router.put(
  "/:id",
  validateProjectID,
  validateProjectUpdate,
  (req, res, next) => {
    const { id } = req.params;
    Project.update(id, req.updatedProject)
      .then((project) => {
        res.json(project);
      })
      .catch(next);
  }
);

router.delete("/:id", validateProjectID, (req, res, next) => {
  const { id } = req.params;
  Project.remove(id)
    .then(() => next())
    .catch(next);
});

router.get("/:id/actions", validateProjectID, (req, res, next) => {
  const { id } = req.params;
  Project.getProjectActions(id)
    .then((projects) => {
      res.json(projects);
    })
    .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    custom: `There appears to be an error`,
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;

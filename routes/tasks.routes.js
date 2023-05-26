const express = require("express");
const router = express.Router();
const database = require("../utils/database");

router.get("/", async (req, res) => {
  try {
    let data = await database.execute("SELECT * FROM task.tasks");
    let [blogs] = data;
    res.json({
      status: "success",
      blogs,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { newTask } = req.body;
  try {
    let data = await database.execute(
      `INSERT INTO task.tasks (content,newDate, taskStatus, createdBy) VALUES ('${newTask.content}','${newTask.newDate}','${newTask.taskStatus}','${newTask.createdBy}')`
    );
    res.json({
      status: "success",
      message: "Them thanh cong",
    });
  } catch (error) {
    res.json({ error });
  }
});
router.put("/:id", async (req, res) => {
  const taskId = req.params.id;
  const { updatedTask } = req.body;

  try {
    await database.execute(
      `UPDATE task.tasks SET content='${updatedTask.content}', newDate='${updatedTask.newDate}', taskStatus='${updatedTask.taskStatus}', createdBy='${updatedTask.createdBy}' WHERE taskId=${taskId}`
    );
    res.json({
      status: "success",
      message: `Cập nhật thành công id: ${taskId}`,
    });
  } catch (error) {
    res.json({ error });
  }
});

router.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  try {
    let data = await database.execute(
      `DELETE FROM task.tasks WHERE taskId = ${taskId}`
    );
    res.json({
      status: "success",
      message: `id: ${taskId} da duoc xoa.`,
    });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = router;

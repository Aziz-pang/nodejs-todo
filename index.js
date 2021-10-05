const db = require('./db')
const inquirer = require('inquirer');

function printTask(list) {
  inquirer
    .prompt({
      type: 'list',
      name: 'index',
      message: '请选择你想操作的任务',
      choices: [...list.map((task, index) => {
        return { name: `${task.done ? '[x]' : '[ ]'} ${index + 1}. ${task.title}`, value: index.toString() }
      }), { name: '+ 创建任务', value: '-1' }, { name: '退出', value: '-2' }]
    })
    .then((answer) => {
      const index = parseInt(answer.index)
      if (index >= 0) {
        askForAction(list, index)
      } else if (index === -1) {
        askForCreateTask(list)

      }
    });
}

function askForAction(list, index) {
  inquirer
    .prompt({
      type: 'list',
      name: 'action',
      message: '请选择操作',
      choices: [
        { name: '已完成', value: 'markAsDone' },
        { name: '未完成', value: 'markAsUndone' },
        { name: '改标题', value: 'updateTitle' },
        { name: '删除', value: 'remove' },
        { name: '退出', value: 'quit' },
      ]
    })
    .then(answer => {
      const actions = { markAsDone, updateTitle, markAsUndone, remove }
      const fun = actions[answer.action]
      if (typeof fun === 'function') {
        fun(list, index)
      }
    })
}

function askForCreateTask(list) {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: '添加任务',
    })
    .then((answer) => {
      list.push({
        title: answer.title,
        done: false
      })
      db.write(list)
    })
}

function markAsDone(list, index) {
  list[index].done = true
  db.write(list)
}

function markAsUndone(list, index) {
  list[index].done = false
  db.write(list)
}

function updateTitle(list, index) {
  inquirer
    .prompt({
      type: 'input',
      name: 'title',
      message: '新的标题',
      default: list[index].title
    })
    .then(answer => {
      list[index].title = answer.title
      db.write(list)
    })
}

function remove(list, index) {
  list.splice(index, 1)
  db.write(list)
}

module.exports.add = async (title) => {
  //读取文件
  const list = await db.read()
  //添加任务
  list.push({ title, done: false })
  //写入文件
  await db.write(list)
}

module.exports.cleanup = async () => {
  await db.write([])
}

module.exports.showAll = async () => {
  const list = await db.read()
  printTask(list)
}
import { copy404 } from './copy-404.js'
import { generateRss } from './generate-rss.js'

const tasks = {
  postbuild: [copy404, generateRss],
}

async function run(taskName) {
  const steps = tasks[taskName]

  if (!steps) {
    console.error(
      `Unknown task name: ${taskName}`,
      `\nAvailable tasks: ${Object.keys(tasks).join(', ')}`
    )
    process.exit(1)
  }

  console.log(`Running task: ${taskName}`)
  for (const step of steps) {
    try {
      await step()
    } catch (error) {
      console.error(`Step ${step.name} failed`, error.message)
      process.exit(1)
    }
  }
  console.log(`Task ${taskName} complete`)
}

const taskName = process.argv[2]
if (!taskName) {
  console.error(`No task provided.`, `\nAvailable tasks: ${Object.keys(tasks).join(', ')}`)
}

run(taskName).finally()

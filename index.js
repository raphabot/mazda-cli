#!/usr/bin/env node

import { program } from 'commander'
import ora from 'ora'
import * as fs from 'fs'
import nconf from 'nconf'
import inquirer from 'inquirer'
import os from 'os'
import prettyjson from 'prettyjson'
import pkg from 'node-mymazda';
const MyMazdaAPIClient = pkg.default

const CONFIG_FOLDER = `${os.homedir()}/.mazda`
const CONFIG_FILE = 'config.json'

let mazda;

nconf.env()
  .file({ file: `${CONFIG_FOLDER}/${CONFIG_FILE}` })

program
  .name('mazda')
  .description('CLI to interact with MyMazda services')
  .version('0.1.0', '-V, --version', 'output the current version')
  .hook('preAction', (originalCommand, subCommand) => {
    if (subCommand.name() !== 'configure') {
      if ((!nconf.get('email')) || (!nconf.get('password')) || (!nconf.get('region'))) {
        console.log('❌ Credentials not found. Please run the configure command.')
        process.exit(1)
      }
      mazda = new MyMazdaAPIClient(nconf.get('email'), nconf.get('password'), nconf.get('region'))
    }
  })

  program.command('configure')
  .description('Configure your Mazda cli')
  .action(() => {
    inquirer.prompt([{
      name: 'region',
      message: "What's your MyMazda region?",
      default: 'North America',
      choices: ['North America', 'Europe', 'Japan'],
      type: 'list'
    },
    {
      name: 'email',
      message: "What's your MyMazda email? An account just for the CLI is recommended.",
    },
    {
      name: 'password',
      message: "What's your MyMazda password?",
      type: 'password',
      mask: '*'
    }])
      .then(answers => {
        let region;
        switch (answers.region) {
            case 'Japan':
                region = 'MJO'
                break;
            case 'Europe':
                region = 'MME'
                break;
            default:
                region = 'MNAO'
                break;
        }
        nconf.set('region', region)
        nconf.set('email', answers.email)
        nconf.set('password', answers.password)
        if (!fs.existsSync(CONFIG_FOLDER)) {
          fs.mkdirSync(CONFIG_FOLDER)
        }
        nconf.save()
      })
  })

  program.command('list-cars')
  .description('Lists a list of vehicles linked with the MyMazda account.')
  .action(async (path, options) => {
    const spinner = ora(`Fetching your cars...`).start()
    const cars = await mazda.getVehicles()
    spinner.stop()
    console.log(prettyjson.render(cars))
  })

  program.command('get-status')
  .description('Get information about the current status of the vehicle.')
  .argument('<id>', 'car id')
  .action(async (id) => {
    const spinner = ora(`Fetching your car status...`).start()
    const status = await mazda.getVehicleStatus(id)
    spinner.stop()
    console.log(prettyjson.render(status))
  })

  program.command('start-engine')
  .description('Starts the engine')
  .argument('<id>', 'car id')
  .action(async (id) => {
    const spinner = ora(`Starting your car engine...`).start()
    const status = await mazda.startEngine(id)
    spinner.stop()
    console.log("Engine started!")
  })

  program.command('stop-engine')
  .description('Stops the engine')
  .argument('<id>', 'car id')
  .action(async (id) => {
    const spinner = ora(`Stopping your car engine...`).start()
    const status = await mazda.stopEngine(id)
    spinner.stop()
    console.log("Engine stopped!")
  })

  program.command('lock-doors')
  .description('Lock the doors')
  .argument('<id>', 'car id')
  .action(async (id) => {
    const spinner = ora(`Locking your car doors...`).start()
    const status = await mazda.lockDoors(id)
    spinner.stop()
    console.log("Doors locked!")
  })

  program.command('unlock-doors')
  .description('Unlock the doors')
  .argument('<id>', 'car id')
  .action(async (id) => {
    const spinner = ora(`Unlocking your car doors...`).start()
    const status = await mazda.lockDoors(id)
    spinner.stop()
    console.log("Doors unlocked!")
  })

  program.command('turn-hazard-lights-on')
  .description('Turns on the vehicle hazard lights')
  .argument('<id>', 'car id')
  .action(async (id) => {
    const spinner = ora(`Turning hazard lights on...`).start()
    const status = await mazda.turnHazardLightsOn(id)
    spinner.stop()
    console.log("Hazard lights on!")
  })

  program.command('turn-hazard-lights-off')
  .description('Turns off the vehicle hazard lights')
  .argument('<id>', 'car id')
  .action(async (id) => {
    const spinner = ora(`Turning hazard lights off...`).start()
    const status = await mazda.turnHazardLightsOff(id)
    spinner.stop()
    console.log("Hazard lights off!")
  })

program.parseAsync().then(() => {})
.catch(err => {
    console.error('')
    console.error('There was an error with your request. Make sure your credentials are correct and/or you provided the right car id.')
    process.exit(1)
})
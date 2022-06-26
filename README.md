# Mazda CLI

Mazda CLI is exactly what you would imagine: A CLI to interact with your Mazda cars.

## Installation

```bash
npm install -g mazda-cli
```

## Usage

```bash
# First, configure your CLI using the command below
mazda configure

# Then, you run the command bellow to get your car's id
❯ mazda list-cars
- 
  vin:                   XXXXXXXXXXX
  id:                    12345

# Now you can run commands like start-engine
❯ mazda start-engine 12345
⠹ Starting your car engine...
Engine started!

# Want to know what else you can do?
❯ mazda help
Usage: mazda [options] [command]

CLI to interact with MyMazda services

Options:
  -V, --version                output the current version
  -h, --help                   display help for command

Commands:
  configure                    Configure your Mazda cli
  list-cars                    Lists a list of vehicles linked with the MyMazda account.
  get-status <id>              Get information about the current status of the vehicle.
  start-engine <id>            Starts the engine
  stop-engine <id>             Stops the engine
  lock-doors <id>              Lock the doors
  unlock-doors <id>            Unlock the doors
  turn-hazard-lights-on <id>   Turns on the vehicle hazard lights
  turn-hazard-lights-off <id>  Turns off the vehicle hazard lights
  help [command]               display help for command
```

## Contributing
Contributions are welcome. Please check [Contributing](CONTRIBUTING.md)

## License
[MIT](LICENSE.md)

## Acknowledgements
* [node-mymazda](https://github.com/bdr99/node-mymazda)
* [commander](https://github.com/tj/commander.js)
* [ora](https://github.com/sindresorhus/ora)
* [nconf](https://github.com/indexzero/nconf)
* [inquirer](https://github.com/SBoudrias/Inquirer.js)
* [prettyjson](https://github.com/rafeca/prettyjson)
child_process = require 'child_process'
path = require 'path'

module.exports = class Runner
  run: (command) ->
    child_process.execSync @finalCommand(command) if command?.toString()

  finalCommand: (command) ->
    "#{@bin()} \"#{command}\""

  bin: ->
    path.join atom.packages.resolvePackagePath('road-runner'), 'bin', 'os_x_terminal'

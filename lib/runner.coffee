child_process = require 'child_process'
path = require 'path'

module.exports = class Runner
  run: (command) ->
    try
      commandText = command?.toString()
      child_process.execSync @finalCommand(command) if commandText
    catch error
      console.error error
      atom.notifications.addWarning "Could not run command \"#{commandText}\", open console for more information."

  finalCommand: (command) ->
    "#{@bin()} \"#{command}\""

  bin: ->
    path.join atom.packages.resolvePackagePath('road-runner'), 'bin', 'os_x_terminal'

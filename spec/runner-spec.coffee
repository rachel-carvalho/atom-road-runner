child_process = require 'child_process'
Runner = require '../lib/runner'

context = describe

describe 'Runner', ->
  describe '.run', ->
    beforeEach ->
      atom.packages.resolvePackagePath.andReturn '/road-runner/'
      spyOn(child_process, 'execSync')

    it 'runs command in terminal', ->
      new Runner().run(toString: -> 'echo bla')
      expect(child_process.execSync).toHaveBeenCalledWith('/road-runner/bin/os_x_terminal "echo bla"')

    context 'when command is undefined', ->
      it 'does nothing', ->
        new Runner().run()
        expect(child_process.execSync).not.toHaveBeenCalled()

    context 'when command is blank', ->
      it 'does nothing', ->
        new Runner().run(toString: -> '')
        expect(child_process.execSync).not.toHaveBeenCalled()

    context 'when command could not be run', ->
      error = new Error('not today!')

      beforeEach ->
        child_process.execSync.andCallFake -> throw error
        spyOn(console, 'error')
        spyOn(atom.notifications, 'addWarning')

      it 'does not throw', ->
        expect(-> new Runner().run(toString: -> 'some_command')).not.toThrow()

      it 'logs error', ->
        new Runner().run(toString: -> 'some_command')
        expect(console.error).toHaveBeenCalledWith(error)

      it 'shows warning notification', ->
        new Runner().run(toString: -> 'some_command')
        expect(atom.notifications.addWarning).toHaveBeenCalledWith('Could not run command "some_command", open console for more information.')

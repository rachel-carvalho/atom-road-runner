child_process = require 'child_process'
Runner = require '../lib/runner'

context = describe

describe 'Runner', ->
  describe '.run', ->
    beforeEach ->
      atom.packages.resolvePackagePath.andReturn '/road-runner/'
      spyOn(child_process, 'execSync')

    it 'runs command in terminal', ->
      new Runner().run('echo bla')
      expect(child_process.execSync).toHaveBeenCalledWith('/road-runner/bin/os_x_terminal "echo bla"')

    context 'when command is blank', ->
      it 'does nothing', ->
        new Runner().run('')
        expect(child_process.execSync).not.toHaveBeenCalled()

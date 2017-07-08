child_process = require 'child_process'
RoadRunner = require '../lib/road-runner'

context = describe

describe 'RoadRunner', ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('road-runner')

  describe 'road-runner:run-line', ->
    editor =
      getPath: -> '/this/is/a/full/path.rb'
      getCursorBufferPosition: -> row: 9

    beforeEach ->
      spyOn(child_process, 'execSync')
      spyOn(atom.project, 'relativize').andReturn 'path.rb'
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor
      atom.packages.resolvePackagePath.andReturn '/.atom/road-runner/'

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-line'
      waitsForPromise -> activationPromise
      runs ->
        expect(child_process.execSync).toHaveBeenCalledWith('/.atom/road-runner/bin/os_x_terminal "rspec path.rb:10"')

    context 'when editor is not present', ->
      beforeEach -> atom.workspace.getActiveTextEditor.andReturn null

      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:run-line'
        waitsForPromise -> activationPromise
        runs ->
          expect(child_process.execSync).not.toHaveBeenCalled()

  describe 'road-runner:run-file', ->
    editor =
      getPath: -> '/this/is/a/full/path.coffee'
      getCursorBufferPosition: -> row: 9

    beforeEach ->
      spyOn(child_process, 'execSync')
      spyOn(atom.project, 'relativize').andReturn 'path.coffee'
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor
      atom.packages.resolvePackagePath.andReturn '/.atom/road-runner/'

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-file'
      waitsForPromise -> activationPromise
      runs ->
        expect(child_process.execSync).toHaveBeenCalledWith('/.atom/road-runner/bin/os_x_terminal "atom --test path.coffee"')

    context 'when editor is not present', ->
      beforeEach -> atom.workspace.getActiveTextEditor.andReturn null

      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:run-file'
        waitsForPromise -> activationPromise
        runs ->
          expect(child_process.execSync).not.toHaveBeenCalled()

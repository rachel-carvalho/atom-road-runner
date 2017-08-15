Runner = require '../lib/runner'
RoadRunner = require '../lib/road-runner'

context = describe

describe 'RoadRunner', ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('road-runner')
    spyOn(Runner.prototype, 'run')

  describe 'road-runner:run-line', ->
    editor =
      getPath: -> '/this/is/a/full/path.rb'
      getCursorBufferPosition: -> row: 9

    beforeEach ->
      spyOn(atom.project, 'relativize').andReturn 'path.rb'
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-line'
      waitsForPromise -> activationPromise
      runs ->
        expect(Runner.prototype.run).toHaveBeenCalledWith('rspec path.rb:10')

    context 'when editor is not present', ->
      beforeEach -> atom.workspace.getActiveTextEditor.andReturn null

      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:run-line'
        waitsForPromise -> activationPromise
        runs ->
          expect(Runner.prototype.run).not.toHaveBeenCalled()

  describe 'road-runner:run-file', ->
    editor =
      getPath: -> '/this/is/a/full/path.coffee'
      getCursorBufferPosition: -> row: 9

    beforeEach ->
      spyOn(atom.project, 'relativize').andReturn 'path.coffee'
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-file'
      waitsForPromise -> activationPromise
      runs ->
        expect(Runner.prototype.run).toHaveBeenCalledWith('atom --test path.coffee')

    context 'when editor is not present', ->
      beforeEach -> atom.workspace.getActiveTextEditor.andReturn null

      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:run-file'
        waitsForPromise -> activationPromise
        runs ->
          expect(Runner.prototype.run).not.toHaveBeenCalled()

  describe 'road-runner:run-command', ->
    editor =
      getPath: -> ''
      getCursorBufferPosition: -> row: 0

    beforeEach ->
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-command'
      waitsForPromise -> activationPromise
      runs ->
        expect(Runner.prototype.run).toHaveBeenCalledWith('npm test')

    context 'when editor is not present', ->
      beforeEach -> atom.workspace.getActiveTextEditor.andReturn null

      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:run-file'
        waitsForPromise -> activationPromise
        runs ->
          expect(Runner.prototype.run).not.toHaveBeenCalled()

  describe 'road-runner:repeat-last', ->
    editor =
      getPath: -> ''
      getCursorBufferPosition: -> row: 0

    beforeEach ->
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-command'
      atom.commands.dispatch workspaceElement, 'road-runner:repeat-last'
      waitsForPromise -> activationPromise
      runs ->
        args = Runner.prototype.run.calls.map (c) -> c.args[0]
        expect(args).toEqual ['npm test', 'npm test']

    context "when there's no previous command", ->
      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:repeat-last'
        waitsForPromise -> activationPromise
        runs ->
          expect(Runner.prototype.run).toHaveBeenCalledWith(undefined)

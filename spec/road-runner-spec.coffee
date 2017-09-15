Runner = require '../lib/runner'
Command = require '../lib/command'
RoadRunner = require '../lib/road-runner'

context = describe

describe 'RoadRunner', ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('road-runner')
    spyOn(atom.workspace, 'getActiveTextEditor').andReturn {}
    spyOn(Runner.prototype, 'run')
    spyOn(Command.prototype, 'render')

  describe 'road-runner:run-line', ->
    beforeEach ->
      Command.prototype.render.andReturn 'rspec path.rb:10'

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-line'
      waitsForPromise -> activationPromise
      runs ->
        expect(Runner.prototype.run).toHaveBeenCalled()
        command = Runner.prototype.run.calls[0].args[0]
        expect(command.type).toEqual 'line'
        expect(command.rendered).toEqual 'rspec path.rb:10'

    context 'when editor is not present', ->
      beforeEach -> atom.workspace.getActiveTextEditor.andReturn null

      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:run-line'
        waitsForPromise -> activationPromise
        runs ->
          expect(Runner.prototype.run).not.toHaveBeenCalled()

  describe 'road-runner:run-file', ->
    beforeEach ->
      Command.prototype.render.andReturn 'atom --test path.coffee'

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-file'
      waitsForPromise -> activationPromise
      runs ->
        expect(Runner.prototype.run).toHaveBeenCalled()
        command = Runner.prototype.run.calls[0].args[0]
        expect(command.type).toEqual 'file'
        expect(command.rendered).toEqual 'atom --test path.coffee'

    context 'when editor is not present', ->
      beforeEach -> atom.workspace.getActiveTextEditor.andReturn null

      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:run-file'
        waitsForPromise -> activationPromise
        runs ->
          expect(Runner.prototype.run).not.toHaveBeenCalled()

  describe 'road-runner:run-all', ->
    beforeEach ->
      Command.prototype.render.andReturn 'npm test'

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-all'
      waitsForPromise -> activationPromise
      runs ->
        expect(Runner.prototype.run).toHaveBeenCalled()
        command = Runner.prototype.run.calls[0].args[0]
        expect(command.type).toEqual 'all'
        expect(command.rendered).toEqual 'npm test'

    context 'when editor is not present', ->
      beforeEach -> atom.workspace.getActiveTextEditor.andReturn null

      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:run-file'
        waitsForPromise -> activationPromise
        runs ->
          expect(Runner.prototype.run).not.toHaveBeenCalled()

  describe 'road-runner:repeat-last', ->
    beforeEach ->
      Command.prototype.render.andReturn 'npm test'

    it 'runs command in terminal', ->
      atom.commands.dispatch workspaceElement, 'road-runner:run-all'
      atom.commands.dispatch workspaceElement, 'road-runner:repeat-last'
      waitsForPromise -> activationPromise
      runs ->
        expect(Runner.prototype.run).toHaveBeenCalled()
        expect(Runner.prototype.run.calls.length).toEqual 2
        command = Runner.prototype.run.calls[0].args[0]
        expect(command.type).toEqual 'all'
        expect(command.rendered).toEqual 'npm test'
        expect(Runner.prototype.run.calls[1].args[0]).toEqual command

    context "when there's no previous command", ->
      it 'does nothing', ->
        atom.commands.dispatch workspaceElement, 'road-runner:repeat-last'
        waitsForPromise -> activationPromise
        runs ->
          expect(Runner.prototype.run).toHaveBeenCalledWith(undefined)

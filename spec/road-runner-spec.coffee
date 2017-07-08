RoadRunner = require '../lib/road-runner'

context = describe

describe 'RoadRunner', ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('road-runner')

  describe 'road-runner:run-line', ->
    editor =
      getPath: -> '/this/is/a/full/path.coffee'
      getCursorBufferPosition: -> row: 9

    beforeEach ->
      spyOn(atom.notifications, 'addSuccess')
      spyOn(atom.project, 'relativize').andReturn 'path.coffee'

    it 'shows a notification', ->
      spyOn(atom.workspace, 'getActiveTextEditor').andReturn editor

      # This is an activation event, triggering it will cause the package to be activated.
      atom.commands.dispatch workspaceElement, 'road-runner:run-line'

      waitsForPromise -> activationPromise

      runs ->
        expect(atom.notifications.addSuccess).toHaveBeenCalledWith("it's ALIVE: path.coffee:10")

    context 'when editor is not present', ->
      it 'does nothing', ->
        spyOn(atom.workspace, 'getActiveTextEditor').andReturn null

        atom.commands.dispatch workspaceElement, 'road-runner:run-line'

        waitsForPromise -> activationPromise

        runs ->
          expect(atom.notifications.addSuccess).not.toHaveBeenCalled()

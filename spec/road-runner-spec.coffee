RoadRunner = require '../lib/road-runner'

describe 'RoadRunner', ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('road-runner')

  describe 'road-runner:toggle', ->
    it 'shows a notification', ->
      spyOn(atom.notifications, 'addSuccess')

      # This is an activation event, triggering it will cause the package to be activated.
      atom.commands.dispatch workspaceElement, 'road-runner:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(atom.notifications.addSuccess).toHaveBeenCalledWith("it's ALIVE")

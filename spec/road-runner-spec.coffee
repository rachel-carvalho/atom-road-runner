RoadRunner = require '../lib/road-runner'

# Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
#
# To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
# or `fdescribe`). Remove the `f` to unfocus the block.

describe 'RoadRunner', ->
  [workspaceElement, activationPromise] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    activationPromise = atom.packages.activatePackage('road-runner')

  describe 'when the road-runner:toggle event is triggered', ->
    it 'shows a notification', ->
      addSpy = jasmine.createSpy()
      atom.notifications.onDidAddNotification(addSpy)

      # This is an activation event, triggering it will cause the package to be
      # activated.
      atom.commands.dispatch workspaceElement, 'road-runner:toggle'

      waitsForPromise ->
        activationPromise

      runs ->
        expect(addSpy).toHaveBeenCalled()
        notification = addSpy.mostRecentCall.args[0]
        expect(notification.getType()).toBe 'success'
        expect(notification.getMessage()).toBe "it's ALIVE"

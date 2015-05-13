'use strict';

(function() {

    var module = angular.module('composer', [
        'storytools.examples.common'
    ]);

    module.controller('exampleController', function($scope, MapManager, TimeControlsManager,
        styleUpdater, loadMapDialog, $location) {
        var map = MapManager;

        var timeControlsManager = new TimeControlsManager({
            mode: map.mode,
            storyMap: map.storyMap,
            pinsLayerManager: map.storyPinLayerManager
        });
        $scope.map = map;
        $scope.timeControlsManager = timeControlsManager;

        $scope.timeControls = null;
        $scope.playbackOptions = {
            mode: 'instant',
            fixed: false
        };

        $scope.saveMap = function() {
            map.saveMap();
        };
        $scope.newMap = function() {
            $location.path('/new');
        };
        $scope.styleChanged = function(layer) {
            styleUpdater.updateStyle(layer);
        };
        $scope.showLoadMapDialog = function() {
            var promise = loadMapDialog.show();
            promise.then(function(result) {
                if (result.mapstoryMapId) {
                    $location.path('/maps/' + result.mapstoryMapId + "/data/");
                } else if (result.localMapId) {
                    $location.path('/local/' + result.localMapId);
                }
            });
        };

    });
})();
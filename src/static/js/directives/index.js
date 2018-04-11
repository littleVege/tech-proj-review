import uiSrefActiveReg from './ui-sref-active-reg'
import ngEchart from './ng-echart'
import inputError from './input-error'
import orgSelect from './org-select'
import uploader from './uploader'
import ngCkeditor from './ng-ckeditor'
import ngFlatpicker from './ng-flatpickr'


let directives = angular.module('tpr.directives',[]);
directives
    /**
     * @ngdoc directive
     * @name uiSrefActiveReg
     * @restrict A
     *
     * @description
     *
     * @param {regex=} ui-sref-active-reg
     * @param {string=} active-class
     */
    .directive('uiSrefActiveReg',uiSrefActiveReg)
    /**
     * @ngdoc directive
     * @name ngEchart
     * @restrict E
     *
     * @description
     *
     * @param {object=} options
     * @param {string@} height
     */
    .directive('ngEchart',ngEchart)
    /**
     * @ngdoc directive
     * @name inputError
     * @restrict A
     *
     * @description
     *
     * @param {string=} error-check check error type
     */
    .directive('inputError',inputError)
    /**
     * @ngdoc directive
     * @name orgSelect
     * @restrict A
     *
     * @description
     *
     * @param {string=} ng-model
     * @param {bool=} use-name
     * @param {function=} on-change
     */
    .directive('orgSelect',orgSelect)
    /**
     * @ngdoc directive
     * @name uploader
     * @restrict E
     *
     * @description
     *
     * @param {string=} ng-model
     * @param {string=} height
     */
    .directive('uploader',uploader)
    /**
     * @ngdoc directive
     * @name ngCkeditor
     * @restrict E
     *
     * @description
     *
     * @param {string=} ng-model
     * @param {string=} height
     */
    .directive('ngCkeditor',ngCkeditor)
    /**
     * @ngdoc directive
     * @name ng-flatpicker
     * @restrict A
     *
     * @description
     *
     * @param {Date=} select-date
     * @param {Function=} on-select
     * @param {Date=} max-date
     * @param {Date=} min-date
     */
    .directive('ngFlatpicker',ngFlatpicker)
    .directive('backButton', ['$window', function($window) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                elem.bind('click', function () {
                    $window.history.back();
                });
            }
        };
    }]);


;

export default directives;
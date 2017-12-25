export default ($timeout) => {
    return {
        restrict: 'E',
        template:'<textarea></textarea>',
        scope:{
            content:'=ngModel',
            height:'@',
            text:'='
        },
        link: ($scope,$el,$attr) => {
            let editor = CKEDITOR.replace($el[0],{
                height:$scope.height,
                toolbarGroups : [
                    { name: 'styles' },
                    { name: 'colors' },
                    { name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
                    { name: 'editing',     groups: [ 'find', 'selection', '' ] },
                    { name: 'forms' },
                    { name: 'document',	   groups: [  'document', 'doctools' ] },
                    { name: 'others' },
                    { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
                    { name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
                ]
            });

            editor.on('change',function (e) {
                $timeout(function () {
                    $scope.content = editor.getData();
                },0);
            });
            editor.setData($scope.content);
            let watcher = $scope.$watch('content',function (newVal,oldVal) {
                if (newVal && !oldVal) {
                    editor.setData($scope.content);
                    watcher();
                }
            },true);

        }
    }
}
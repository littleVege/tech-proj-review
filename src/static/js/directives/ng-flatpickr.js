/**
 * Created by caidi on 2017/4/4.
 */
export default ($q,$timeout) => {
    return {
        restrict: 'A',
        scope:{
            selectDate:'=',
            onSelect:'&?',
            maxDate:'=',
            minDate:'=',
        },
        link: ($scope,$ele,attr) => {
            $scope.dateInstance = flatpickr($ele[0], {
                dateFormat: "Y年m月d日",
                altFormat: "Y年m月d日",
                ariaDateFormat: "Y年m月d日",
                maxDate: $scope.maxDate || "today",
                minDate: $scope.minDate,
                locale:'zh',
                mode:'single',
                defaultDate:$scope.selectDate?new Date($scope.selectDate):new Date(),
                onClose : function (selectedDates, dateStr, instance) {
                    $timeout(function () {
                        $scope.selectDate = selectedDates[0];
                    },10);
                    $timeout(function () {
                        $scope.onSelect && $scope.onSelect();
                    },100);
                }
            });
            // $scope.$watch('options',function (val) {
            //     if (!$scope.dateInstance) {
            //         $scope.options.onClose = function (selectedDates, dateStr, instance) {
            //             $timeout(function () {
            //                 $scope.selectDate = selectedDates;
            //             },10);
            //             $timeout(function () {
            //                 $scope.onSelect && $scope.onSelect();
            //             },100);
            //         };
            //         $scope.dateInstance = new Flatpickr($ele[0], $scope.options);
            //     }
            // });
        }
    }
};

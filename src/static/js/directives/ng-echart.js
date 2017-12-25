/**
 * Created by caidi on 16/9/5.
 */
export default ($q) => {
    return {
        restrict: 'EA',
        template: '<div class="chart" ng-style="{height:height}"></div>',
        replace: true,
        scope:{
            options:'=',
            height:'@'
        },
        link: ($scope,$ele,attr) => {
            $scope.$watch('options',function (val) {
                if ($scope.chart) {
                    $scope.chart.dispose();
                }
                $scope.chart = echarts.init($ele[0],'blue');
                if(val) {
                    $scope.chart.setOption($scope.options);
                }
            });
        }
    }
};

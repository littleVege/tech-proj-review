/**
 * Created by caidi on 2017/10/13.
 */
export default ($state,$transitions) => {
    return {
        restrict: 'A',
        scope:{
            reg:'@uiSrefActiveReg',
            activeClass:'@'
        },
        link: ($scope,$ele,attr) => {
            let reg = new RegExp($scope.reg);
            if (reg.test($state.current.name)) {
                $ele.addClass($scope.activeClass);
            } else {
                $ele.removeClass($scope.activeClass);
            }

            $transitions.onStart({}, function(transition) {
                let reg = new RegExp($scope.reg);
                if (reg.test(transition.to().name)) {
                    $ele.addClass($scope.activeClass);
                } else {
                    $ele.removeClass($scope.activeClass);
                }
            });
        }
    }
}
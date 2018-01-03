let sysProjectsCtrl = ($scope,Project,Utils,$uibModal) => {
    $scope.queryInfo = {isSys:1};
    Utils.paginize($scope,function (page) {
        return Project.getListByQuery($scope.queryInfo,page)
    });
    $scope.pageChanged();

    $scope.queryCate = function (cate) {
        if (cate) {
            $scope.queryInfo.categoryId = cate.id;
        } else {
            $scope.queryInfo.categoryId = null;
        }

        $scope.pageChanged();
    };

    $scope.queryStatus = function (status) {
        if (!_.isNull(status)) {
            $scope.queryInfo.projectStatus = status;
        } else {
            $scope.queryInfo.projectStatus = null;
        }
        $scope.pageChanged();

    };

    $scope.search = function () {
        $scope.pageInfo.currentPage = 1;
        $scope.pageChanged();
    }
};


let sysProjectCollectCtrl = ($scope,$stateParams,Project,ProjectExpertEvaluation,$sce,dialogs) => {
    let projectId = $stateParams['projectId'];
    $scope.updateInfo = {};
    Project.getOne(projectId)
        .then(function (data) {
            $scope.updateInfo = data;
        });
    ProjectExpertEvaluation.getListByQuery({projectId:projectId,evaluationStatus:1})
        .then(function (data) {
            $scope.reviews = data[1];
        });


    $scope.submitEdit = function () {
        $scope.updateInfo.projectStatus = 4;
        Project.updateOne(projectId,$scope.updateInfo)
            .then(function () {
                dialogs.success('评审成功');
                $scope.goBack();
            })
    }

    $scope.goBack = function () {
        window.history.back();
    }
};


export {
    sysProjectsCtrl,
    sysProjectCollectCtrl
}
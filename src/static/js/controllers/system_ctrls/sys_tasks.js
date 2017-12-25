let taskListCtrl = ($scope,$uibModal,Task,Utils,$stateParams,EvaluationTemplateCategory) => {
    $scope.queryInfo = {};
    Utils.paginize($scope,function (page) {
        return Task.getListByQuery($scope.queryInfo,page)
    });
    $scope.pageChanged();



    $scope.editTask = function (task) {
        let $ps = $scope;
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/sys-tasks/edit-task-modal.html',
            controller: function ($scope,$uibModalInstance) {
                $scope.updateInfo = task?_.cloneDeep(task):{};
                $scope.cancel = function () {
                    $uibModalInstance.dismiss();
                };
                EvaluationTemplateCategory.getListByQuery({},1,50)
                    .then(function (data) {
                        $scope.templates = data[1];
                    })
                $scope.removeTask = function (item) {
                    if (confirm('确认要删除此数据？')) {
                        Task.deleteOne(item.id)
                            .then(()=>alert('删除成功'));
                    }
                };
                $scope.submitEdit = function () {
                    Task.upsetOne('id',$scope.updateInfo)
                        .then(function () {
                            $ps.pageChanged();
                            $scope.cancel();
                        })
                }
            }
        });
    };
};

let taskDetailCtrl = ($scope,Task,Project,ProjectGroup,$stateParams,Utils) => {
    let taskId = $stateParams['taskId'];
    $scope.taskId = taskId;
    Task.getOne(taskId)
        .then(function (data) {
            $scope.taskInfo = data;
        });
    Utils.paginize($scope,function (page) {
        return ProjectGroup.getListByQuery({taskId:taskId},page)
    });
    $scope.pageChanged();


};


export {
    taskListCtrl,
    taskDetailCtrl
}
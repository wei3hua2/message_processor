angular.module('messageProcessorApp')
    .directive('msgPreviewer',function(){
        return {
            templateUrl:'views/template/previewer.html',
            link: function link(scope, element, attrs) {
                scope.$watch('selectedMsg',function(){
                    if(scope.selectedMsg)$('#msgPreviewer').modal('show');
                });
            }
        }
    })

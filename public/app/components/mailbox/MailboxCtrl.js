angular.module('app').controller('MailboxCtrl', ['$scope', function($scope) {


    $scope.tabs = [
        {title: 'Social', content: 'dynamic content 1' },
        {title: 'Purchases', content: 'dynamic content 2' },
        {title: 'Sales', content: 'dynamic content 2' }
    ];
}]);
'use strict';

// Seriefulls controller
angular.module('seriefulls').controller('SeriefullsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Seriefulls', 'Preferits',
    function ($scope, $stateParams, $location, Authentication, Seriefulls, Preferits) {
        $scope.authentication = Authentication;


        // Find a list of Seriefulls
        if ($scope.authentication.user === '') {
            $location.path('/#!/');

        } else {
            $scope.find = function () {
                $scope.seriefulls = Seriefulls.query();

            };
            $scope.findOne = function () {
                $scope.seriefull = Seriefulls.get({
                    seriefullId: $stateParams.seriefullId
                });
                $scope.seriefull.$promise.then(function (data) {
                    $scope.create = function () {

                        var preferit = new Preferits({
                            idm: data.idm,
                            nom: data.nom,
                            imatge: data.imatge,
                            temporades: data.num_temporades,
                            seriefull: null

                        });

                        preferit.$save(function (response) {

                            swal({
                                title: "Enhorabuena!",
                                text: "Añadida a favoritos",
                                type: "success",
                                confirmButtonText: "Aceptar"
                            });

                        }, function (errorResponse) {

                            $scope.error = errorResponse.data.message;
                        });


                    };

                    $scope.numero = [];

                    for (var i = 1; i <= data.num_temporades; i++) {

                        $scope.numero.push({
                            num: i
                        });

                    }

                })


            };

        }

    }
]);



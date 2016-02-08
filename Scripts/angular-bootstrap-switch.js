
if (angular !== undefined) {

    var bsSwitch = angular.module('bsSwitch', []);

    // ignore these options, $watch function from angular should be used in these cases
    bsSwitch.optionBlackList = {
        onInit: true,
        onSwitchChange: true
    };

    bsSwitch.directive("bsSwitch", function () {
        return function (scope, ele, attr) {

            // get options
            var options = {};
            angular.forEach(attr, function (v, k) {

                // if attributes are started with bs-switch
                if (k.indexOf('bsSwitch') == 0) {

                    // remove 'bsSwitch'
                    var optionName = k.slice(8);

                    // lower case the first char
                    optionName = optionName.charAt(0).toLowerCase() + optionName.slice(1);

                    if (bsSwitch.optionBlackList[optionName] === true) return;
                    options[optionName] = v;
                }
            });

            // init the switch
            $(ele).bootstrapSwitch(options);
            eval('var curEval = scope.' + attr.bsSwitch + ';');
            $(ele).bootstrapSwitch('state', curEval, true);

            // watch the binding value
            scope.$watch(attr.bsSwitch, function (newState, oldState) {
                if (newState === oldState) return;

                // don't trigger back bootstrapSwitch, thus, ture for the third arg
                $(ele).bootstrapSwitch('state', newState, true);
            }, true);

            // writing back to the scope when change
            $(ele).on('switchChange.bootstrapSwitch', function (event, state) {

                // resume the scope
                var scope = angular.element(this).scope();

                // apply the change
                scope.$apply(function () {
                    eval('scope.' + attr.bsSwitch + ' = ' + state);
                });

            });

        };
    });
}
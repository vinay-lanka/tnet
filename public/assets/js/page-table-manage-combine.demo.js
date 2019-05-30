/*   
Template Name: Source Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4
Version: 1.5.0
Author: Sean Ngu
Website: http://www.seantheme.com/source-admin-v1.5/admin/
*/

var handleDataTableCombine_factory = function() {
    "use strict";

    if ($('#data-table-factory').length !== 0) {
        $('#data-table-factory').DataTable({
            dom: 'lBfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            responsive: true,
            //autoFill: true,
            colReorder: true,
            //keys: true,
            //rowReorder: true,
            select: true
        });
    }
};
var handleDataTableCombine_shopfloor = function() {
    "use strict";

    if ($('#data-table-shopfloor').length !== 0) {
        $('#data-table-shopfloor').DataTable({
            dom: 'lBfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            responsive: true,
            colReorder: true,
            select: true
        });
    }
};

/* Application Controller
------------------------------------------------ */
var PageDemo = function () {
	"use strict";
	
	return {
		//main function
		init: function () {
            handleDataTableCombine_factory();
            handleDataTableCombine_shopfloor();
		}
  };
}();
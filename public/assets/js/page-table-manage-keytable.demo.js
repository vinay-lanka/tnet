/*   
Template Name: Source Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4
Version: 1.5.0
Author: Sean Ngu
Website: http://www.seantheme.com/source-admin-v1.5/admin/
*/

var handleDataTableKeyTable = function() {
    "use strict";

    if ($('#data-table').length !== 0) {
        $('#data-table').DataTable({
            scrollY: 300,
            paging: false,
            autoWidth: true,
            keys: true,
            responsive: true
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
            handleDataTableKeyTable();
		}
  };
}();
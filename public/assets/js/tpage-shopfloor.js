/*   
Template Name: Source Admin - Responsive Admin Dashboard Template build with Twitter Bootstrap 3.3.7 & Bootstrap 4
Version: 1.5.0
Author: Sean Ngu
Website: http://www.seantheme.com/source-admin-v1.5/admin/
*/

var factory_data =		[
							["TMIC", "Chennai",   "Unit 01", "Shopfloor 01"],
							["TMIC", "Chennai",   "Unit 01", "Shopfloor 02"],
							["TMIC", "Chennai",   "Unit 02", "Shopfloor 01"],
							["TMIC", "Chennai",   "Unit 02", "Shopfloor 02"],
							["TMIC", "Mumbai",    "Unit 01", "Shopfloor 01"],
							["TMIC", "Mumbai",    "Unit 01", "Shopfloor 02"],
							["TMIC", "Mumbai",    "Unit 01", "Shopfloor 02"],
							["TMIC", "New Delhi", "Unit 01", "Shopfloor 01"]
						];
					
var shopfloor_data =	[
							["TD - 00600133", "Mac No.18",   "26273731", "7540", "6.3", "10"],
							["TD - 00600134", "Mac No.19",   "26273732", "540",  "6.3", "10"],
							["TD - 00600138", "Mac No.20",   "26273733", "6540", "6.3", "10"],
							["TD - 01500123", "Mac No.22",   "26293630", "5540", "6.3", "10"],
							["TD - 01500125", "Mac No.23",   "26293631", "2540", "6.3", "10"],
							["TD - 01500126", "Mac No.24",   "26293632", "7570", "6.3", "10"],
							["TD - 01500148", "Mac No.25",   "26293633", "7560", "6.3", "10"],
							["TD - 01500149", "Mac No.26",   "26293634", "7544", "6.3", "10"],
							["TD - 00600139", "Mac No.27",   "26273734", "7546", "6.3", "10"],
							["TD - 01000127", "Mac No.28",   "26273530", "1230", "6.3", "10"],
							["TD - 01000128", "Mac No.29",   "26273531", "1140", "6.3", "10"],
							["TD - 01000129", "Mac No.30",   "26273532", "2240", "6.3", "10"],
							["TD - 01000130", "Mac No.31",   "26273533", "4740", "6.3", "10"],
							["TD - 02500013", "Mac No.32",   "26213830", "7587", "6.3", "10"],
							["TD - 02500014", "Mac No.33",   "26213832", "1345", "6.3", "10"]
						];

var handleDataTableCombine_factory = function() {
    "use strict";

    if ($('#data-table-factory').length !== 0) {
        $('#data-table-factory').DataTable({
			data: factory_data,
            dom: 'lBfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            responsive: true,
            colReorder: true,
            select: true,
			//lengthMenu:[5, 10, 15, 20],
        });
    }
};

var handleDataTableCombine_shopfloor = function() {
    "use strict";

    if ($('#data-table-shopfloor').length !== 0) {
        $('#data-table-shopfloor').DataTable({
			data: shopfloor_data,
            dom: 'lBfrtip',
            buttons: [
                'copy', 'csv', 'excel', 'pdf', 'print'
            ],
            responsive: true,
            colReorder: true,
            select: true,
			//lengthMenu:[10, 20, 40, 60, 80, 100],
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
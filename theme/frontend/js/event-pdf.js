$(document).ready(function($) {
    document.addEventListener('textlayerrendered', function (event) {
  	if (event.detail.pageNumber === PDFViewerApplication.page) {
    		console.log('Finished rendering!');
  		}
	}, true);
	function resetProgetBar(){
		var nowPage = PDFViewerApplication.page;
		var totalPage = PDFViewerApplication.pagesCount;
		$('#progress_bar').css('width', (nowPage/totalPage)*100+'%');
		$('#number-con').text(totalPage - nowPage);
		$('#curent-page').text(nowPage);
		$('#cout-page').text(totalPage);
		$('#pham_tram_da_doc').text(Math.ceil(100*nowPage/totalPage));
	}
	function injectProgess() {
  		resetProgetBar();
  		$('.pageDown').click();
  		$('.pageUp').click();
  		window.PDFViewerApplication.eventBus.on('pagechanging', function pagechange(evt) { 
			resetProgetBar();
		});
	}
	var loadFunction = setInterval(function(){
		if (typeof PDFViewerApplication !== 'undefined') {
			PDFViewerApplication.workerSrc = 'theme/frontend/pdfviewer/build/pdf.worker.js';
		}
		if (!$('.loadingInProgress').length > 0) {
		 	if (typeof PDFViewerApplication !== 'undefined') {
		        injectProgess();
		        clearInterval(loadFunction);
		    }
		}
	},100);
});
var _DOCX_EXTRA = {
    init: () => {
        document.querySelector("#testup").addEventListener(
            "change",
            function () {
                var reader = new FileReader();
                reader.onload = function () {
                    var arrayBuffer = this.result,
                        array = new Uint8Array(arrayBuffer);
                    let a = (x, y) => {};
                    console.log(arrayBuffer);
                    azotaDocx.readDocx(arrayBuffer, a).then(function (_) {
                        console.log(_);
                    });
                };
                reader.readAsArrayBuffer(this.files[0]);
            },
            false
        );
    },
};
_DOCX_EXTRA.init();

<?php @include 'header.php'; ?>

<section class="py-10">
    <div class="container">
        <p class="mx-auto mb-6 w-fit rounded-full bg-[#FFDBDB] px-4 py-2 text-center">
            <i class="fa-solid fa-circle-exclamation"></i>
            Vui lòng thanh toán trước 02/01/2025 để khóa học được kích hoạt
        </p>
        <p class="mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 mr-2 -translate-y-0.5 inline-block" viewBox="0 0 25 25" fill="none">
                <g clip-path="url(#clip0_315_32428)">
                    <path d="M19.082 13.5557H21.8943V20.2896H19.082V13.5557Z" fill="#24A245" />
                    <path d="M13.7559 13.5557H16.5684V20.2896H13.7559V13.5557Z" fill="#24A245" />
                    <path d="M8.43164 13.5557H11.2441V20.2896H8.43164V13.5557Z" fill="#24A245" />
                    <path d="M3.10547 13.5557H5.91779V20.2896H3.10547V13.5557Z" fill="#24A245" />
                    <path d="M22.8327 11.4463V10.7432H2.16797V11.4463C2.16797 11.8347 2.48273 12.1494 2.87109 12.1494H22.1296C22.5178 12.1494 22.8327 11.8347 22.8327 11.4463Z" fill="#24A245" />
                    <path d="M23.7958 21.6958H1.20312C0.814758 21.6958 0.5 22.0106 0.5 22.3989V24.2739C0.5 24.6623 0.814758 24.9771 1.20312 24.9771H23.7958C24.1841 24.9771 24.4989 24.6623 24.4989 24.2739V22.3989C24.4989 22.0106 24.1841 21.6958 23.7958 21.6958Z" fill="#24A245" />
                    <path d="M1.20306 9.33691H23.7968C24.1114 9.33691 24.3877 9.12799 24.4734 8.82532C24.5589 8.52264 24.4333 8.19983 24.1654 8.03503L12.8685 1.08142C12.6426 0.942261 12.3575 0.942261 12.1314 1.08142L0.834471 8.03503C0.566588 8.20001 0.440977 8.52264 0.526671 8.82532C0.612364 9.12799 0.88867 9.33691 1.20306 9.33691ZM12.022 5.11267H12.978C13.3664 5.11267 13.6812 5.42743 13.6812 5.8158C13.6812 6.20416 13.3664 6.51892 12.978 6.51892H12.022C11.6337 6.51892 11.3189 6.20416 11.3189 5.8158C11.3189 5.42743 11.6337 5.11267 12.022 5.11267Z" fill="#24A245" />
                </g>
                <defs>
                    <clipPath id="clip0_315_32428">
                        <rect width="24" height="24" fill="white" transform="translate(0.5 0.977051)" />
                    </clipPath>
                </defs>
            </svg>
            Mở App ngân hàng bất kỳ để quét mã <strong>VietQR</strong> Hoặc <strong>chuyển khoản chính xác</strong> số tiền bên dưới
        </p>
        <div class="flex flex-wrap -mx-5">
            <div class="w-[250px] max-md:mx-auto max-md:mb-4 px-5 img__contain">
                <img src="theme/frontend/images/qrcode.png" alt="">
            </div>
            <div class="w-full md:w-[calc(100%-250px)] px-5">
                <div class="text-[#888] mb-3">
                    Số tài khoản: <span class="font-medium text-[#484954] inline-block ml-1">123456789123</span>
                </div>
                <div class="text-[#888] mb-3">
                    Chủ tài khoản: <span class="font-medium text-[#484954] inline-block ml-1">Dương Minh Trang</span>
                </div>
                <div class="text-[#888] mb-3 pb-3 border-b border-[#D9D9D9]">
                    Chi nhánh: Vietcombank Thăng Long - Hà Nội
                </div>
                <div class="text-[#444244] mb-3">
                    Số tiền: <span class="font-semibold text-color-v2 inline-block ml-1">1.045.000 đ</span>
                </div>
                <div class="text-[#888] mb-3">
                    Nội dung: <span class="font-semibold text-[#484954] inline-block ml-1">GGHD123</span>
                </div>
                <div class="text-[#888] mb-3">
                    Mã đơn hàng: <span class="font-semibold text-[#484954] inline-block ml-1">GGHD123</span>
                </div>
                <div class="text-[#888] mb-3">
                    Thời gian mua: <span class="font-semibold text-[#484954] inline-block ml-1">12:30:23 04/07/2024</span>
                </div>
            </div>
        </div>
        <p class="text-center mb-1">Lưu ý: Nhập chính xác số tiền 1.045.000 đ khi chuyển khoản.</p>
        <p class="text-center mb-5">Hệ thống sẽ kích hoạt khóa học sau khi xác nhận thanh toán, vui lòng kiểm tra thông báo hoặc email của bạn.</p>
        <a href="" title="quay lại trang chủ" class="font-bold text-center block mx-auto w-fit uppercase border bg-color-v3 border-color-v3 text-white hover:bg-white hover:text-color-v3 py-2 px-6 rounded-full">
            quay lại trang chủ
        </a>
    </div>
</section>

<?php @include 'footer.php'; ?>
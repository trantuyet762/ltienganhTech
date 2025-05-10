<?php @include 'header.php'; ?>

<section class="py-10">
    <div class="container">
        <a href="" class="text-color-v1 font-bold text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] flex items-center mb-6 hover:text-color-v4">
            <i class="fa-solid fa-arrow-left mr-4"></i>Đơn hàng
        </a>
        <div class="flex flex-wrap -mx-3">
            <div class="w-full px-3 mb-6">
                <span class="block font-semibold text-[1.25rem] lg:text-[1.5rem] mb-4">
                    Đơn hàng của bạn
                </span>
                <div class="bg-white text-[#4A5568] rounded-[10px] lg:rounded-[15px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.11)] p-2.5 md:p-4 lg:p-6 border-[0.5px] border-[#B0B0B0]">
                    <?php for ($i = 0; $i < 3; $i++) { ?>
                        <div class="flex justify-between items-center mb-6">
                            <div class="mr-4">
                                <span class="font-semibold block mb-1">Lớp 9</span>
                                <span class="text-[0.875rem] block">1 năm</span>
                            </div>
                            <span class="text-[#F04438] font-semibold">
                                199.000đ
                            </span>
                        </div>
                    <?php } ?>
                    <div class="flex mb-6 border-b border-[#B0B0B0] pb-6">
                        Mã giảm giá: <strong class="ml-2 mr-auto"> SSS0999</strong>
                        <span class="ml-4">- 123.000 đ</span>
                    </div>
                    <div class="flex items-center justify-between">
                        <span class="text-[1.125rem] font-medium">Tổng tiền</span>
                        <span class="font-semibold text-[1.5rem] ml-4">275.000đ</span>
                    </div>
                </div>
            </div>
            <div class="w-full lg:w-1/2 px-3 mb-6 flex flex-col">
                <span class="block font-semibold text-[1.25rem] lg:text-[1.5rem] mb-4">
                    Thông tin thanh toán
                </span>
                <div class="bg-white text-[#4A5568] rounded-[10px] lg:rounded-[15px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.11)] p-2.5 md:p-4 lg:p-6 border-[0.5px] border-[#B0B0B0] grow">
                    <span class="block text-[0.875rem] mb-1">
                        Họ và tên
                    </span>
                    <span class="block font-semibold mb-5">
                        Nguyễn Thanh Ngân
                    </span>
                    <span class="block text-[0.875rem] mb-1">
                        Số điện thoại
                    </span>
                    <span class="block font-semibold mb-5">
                        0987654321
                    </span>
                    <span class="block text-[0.875rem] mb-1">
                        Email
                    </span>
                    <span class="block font-semibold">
                        test@gmail.com
                    </span>
                </div>
            </div>
            <div class="w-full lg:w-1/2 px-3 mb-6 flex flex-col">
                <span class="block font-semibold text-[1.25rem] lg:text-[1.5rem] mb-4">
                    Phương thức thanh toán
                </span>
                <div class="bg-white text-[#4A5568] rounded-[10px] lg:rounded-[15px] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.11)] p-2.5 md:p-4 lg:p-6 border-[0.5px] border-[#B0B0B0] grow flex-col flex justify-center">
                    <label for="pay-momo" class="mb-1">
                        <div class="py-1.5 cursor-pointer flex items-center">
                            <input type="radio" class="mr-2" name="pay" id="pay-momo" checked>
                            Momo
                        </div>
                    </label>
                    <label for="pay-bank" class="">
                        <div class="py-1.5 cursor-pointer flex items-center">
                            <input type="radio" class="mr-2" name="pay" id="pay-bank">
                            Chuyển khoản ngân hàng
                        </div>
                        <ul class="hidden">
                            <li class="text-[#888] mb-2">
                                Số tài khoản: <span class="font-medium text-[#484954] mx-2">123456789123</span>
                            </li>
                            <li class="text-[#888] mb-2">
                                Chủ tài khoản: <span class="font-medium text-[#484954]">Dương Minh Trang</span>
                            </li>
                            <li class="text-[#888]">
                                Chi nhánh: Vietcombank Thăng Long - Hà Nội
                            </li>
                        </ul>
                    </label>
                </div>
            </div>
        </div>
        <label for="check-agree" class="text-[#888] mb-6 block cursor-pointer">
            <input type="checkbox" name="" id="check-agree" class="mr-2">
            Tôi đã đọc và đồng ý với Điều khoản sử dụng và Chính sách bảo mật của trang web
        </label>
        <a href="" class="font-medium text-[1.5rem] inline-block border border-color-v3 bg-color-v3 px-6 py-3 rounded-[10px] hover:bg-white hover:text-color-v3 text-white">
            Thanh toán ngay
        </a>
    </div>
</section>

<?php @include 'footer.php'; ?>
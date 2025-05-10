<?php include 'header.php'; ?>

<section class="bg-cover bg-center bg-no-repeat" style="background-image: url(theme/frontend/images/banner1.png);">
    <div class="container py-[6%] min-h-[200px] flex flex-col justify-center">
        <p class="font-baloo text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] text-white">
            Nâng cao kiến thức cùng với
        </p>
        <p class="text-color-v3 text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-baloo">luyenthitienganh</p>
    </div>
</section>

<div class="breadcrumb h-10"></div>

<section class="mb-10">
    <div class="container">
        <h1 class="text-[1.5rem] lg:text-[2rem] text-color-v1 font-baloo mb-2">Danh mục bộ đề Lớp 10</h1>
        <div class="s-content mb-6">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur quas expedita aperiam, sapiente laborum quam labore, aspernatur hic et enim corporis veritatis nulla accusantium ratione alias odio accusamus vitae magni?
        </div>
        <div class="flex items-center gap-x-10 gap-y-3 flex-wrap mb-6">
            <div class="font-medium max-sm:w-full">
                Số đề thi:
                <span class="font-semibold">20</span>
            </div>
            <div class="font-medium max-sm:w-full">
                Tổng thời gian:
                <span class="font-semibold">100 phút</span>
            </div>
            <div class="font-medium max-sm:w-full">
                Giá:
                <span class="text-[#F04438] font-semibold">134.000đ</span>
            </div>
            <a href="" class="text-[#D27727] lg:text-[1.25rem] px-6 py-1 rounded-full border border-[#D27727] md:ml-auto max-md:mx-auto hover:bg-[#D27727] hover:text-white">
                Đăng ký ngay
            </a>
        </div>
        <div class="flex flex-wrap -mx-3 mb-7">
            <?php for ($i = 1; $i <= 6; $i++) { ?>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    <?php if ($i % 2 == 0) : ?>
                        <div class="cursor-pointer" modal-click-target="modal-up-buy-package">
                            <?php include 'template/affilate/item.php';
                            $key = $i; ?>
                        </div>
                    <?php else : ?>
                        <?php include 'template/affilate/item.php';
                        $key = $i; ?>
                    <?php endif; ?>
                </div>
            <?php } ?>
        </div>
        <div class="md:p-4 lg:p-6 md:rounded-[10px] md:border md:border-[#B0B0B0] bg-white">
            <span class="block font-baloo text-[1.5rem] lg:text-[2rem] text-color-v1 mb-4">
                Tài liệu
            </span>
            <div class="flex flex-wrap -mx-2 mb-7 gap-y-2">
                <?php for ($i = 1; $i <= 3; $i++) { ?>
                    <div class="w-full md:w-1/2 xl:w-1/3 p-2">
                        <?php if ($i % 2 == 0) : ?>
                            <div class="cursor-pointer" modal-click-target="modal-up-buy-package">
                                <?php include 'template/document/item.php';
                                $key = $i; ?>
                            </div>
                        <?php else : ?>
                            <?php include 'template/document/item.php';
                            $key = $i; ?>
                        <?php endif; ?>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</section>

<div class="module-modal fixed inset-0 z-[100] !flex items-center justify-center bg-black/70 p-3" modal-target="modal-up-buy-package">
    <div class="modal-content relative w-full max-w-[586px] rounded-[20px] px-4 py-10 md:px-10 lg:py-16 lg:px-14 shadow-[rgba(0,0,0,.5)] overflow-hidden text-white">
        <span class="block text-center mb-4 lg:mb-6 text-[1.5rem] lg:text-[2rem] font-bold">
            Đưa điểm số của bạn lên
            một tầm cao mới
        </span>
        <span class="text-center block mb-4">
            Nâng cấp gói để mở khóa các đề thi
        </span>
        <div class="flex items-center p-4 bg-white/70 rounded-[10px] mb-4 lg:mb-6">
            <div class="w-10 img__contain shrink-0 mr-4">
                <img src="theme/frontend/images/image1.png" alt="">
            </div>
            <span class="text-color-v1">
                Hàng trăm bộ đề được chọn lọc chất lượng giành cho bạn
            </span>
        </div>
        <span class="block text-center mb-4 lg:mb-6">
            Và còn nhiều tiện ích khác nữa ...
        </span>
        <a href="" class="block w-fit mx-auto py-2 px-6 rounded-full bg-[#D27727] text-white hover:bg-color-v4 font-medium text-[1.25rem]">
            Nâng cấp gói ngay
        </a>
        <i class="fa-solid cursor-pointer fa-xmark close-modal absolute top-4 right-4 text-[1.5rem] z-[1]" modal-close></i>
    </div>
</div>

<?php include 'footer.php'; ?>
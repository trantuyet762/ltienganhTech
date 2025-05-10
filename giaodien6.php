<?php @include 'header.php'; ?>

<section class="bg-cover bg-center bg-no-repeat" style="background-image: url(theme/frontend/images/banner1.png);">
    <div class="container pt-[6%] pb-28 min-h-[200px] flex flex-col justify-center">
        <p class="font-baloo text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] text-white">
            Khám phá và trải nghiệm các bộ đề thi của
        </p>
        <p class="text-color-v3 text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[3rem] font-baloo">luyenthitienganh</p>
    </div>
</section>

<section class="relative z-[1] -mt-20">
    <div class="container">
        <div class="swiper swiper-quality-course rounded-[20px] bg-white shadow-[0px_4px_15px_0px_rgba(0,0,0,0.11)] mb-3">
            <div class="swiper-wrapper">
                <?php for ($i = 0; $i < 4; $i++) { ?>
                    <div class="swiper-slide sm:border-r sm:border-[#B0B0B0]">
                        <div class="item p-6 space-y-2 xl:space-y-3">
                            <div class="size-14 img__contain p-2 img bg-[var(--color-icon)] rounded-[10px] border border-[var(--border-icon)]">
                                <img src="theme/frontend/images/open-folder.png" alt="">
                            </div>
                            <span class="font-bold text-color-v1 xl:text-[1.25rem] line-clamp-2">
                                Mở khóa các bộ đề chất lượng
                            </span>
                            <span class="line-clamp-2 max-xl:text-[0.875rem] text-[#4A5568] font-medium">
                                Lorem ipsum dolor sit amet consectetur nibh massa
                            </span>
                        </div>
                    </div>
                <?php } ?>
            </div>
        </div>
        <div class="swiper-quality-course-pagination text-center"></div>
    </div>
</section>

<div class="breadcrumb h-10"></div>

<section class="mb-20">
    <div class="container">
        <p class="text-color-v1 font-baloo uppercase text-[2rem] mb-6">
            Các gói
        </p>
        <?php foreach ([['name' => 'Lớp', 'key' => 'lop'], ['name' => 'Trọn bộ', 'key' => 'tron-bo']] as $key => $item) { ?>
            <label for="packages-<?= $item['key'] ?>" class="p-2.5 opacity-50 sm:p-4 lg:p-6 flex flex-col cursor-pointer rounded-[10px] border border-[#4F8AF0] mb-6">
                <div class="flex flex-wrap gap-3 items-center mb-4">
                    <input type="radio" name="packages" id="packages-<?= $item['key'] ?>" class="" <?= $key == 0 ? 'checked' : '' ?>>
                    <div class="size-14 img__contain p-2 img bg-[rgba(79,138,240,0.20)] rounded-[10px] border border-[#4F8AF0] ">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
                            <path d="M25 18H24V8.17C24.5852 8.37688 25.0917 8.76016 25.4499 9.26702C25.8081 9.77387 26.0003 10.3793 26 11V18.1C25.6709 18.0332 25.3358 17.9997 25 18ZM13.708 9.464L22 17.76V7C22 6.20435 21.6839 5.44129 21.1213 4.87868C20.5587 4.31607 19.7956 4 19 4H9C8.20435 4 7.44129 4.31607 6.87868 4.87868C6.31607 5.44129 6 6.20435 6 7V8.1C6.324 8.03333 6.65733 8 7 8H10.172C10.8287 7.99988 11.4789 8.1291 12.0856 8.3803C12.6923 8.63149 13.2436 8.99974 13.708 9.464ZM7 10C6.20435 10 5.44129 10.3161 4.87868 10.8787C4.31607 11.4413 4 12.2044 4 13V24C4 25.0609 4.42143 26.0783 5.17157 26.8284C5.92172 27.5786 6.93913 28 8 28H24C25.0609 28 26.0783 27.5786 26.8284 26.8284C27.5786 26.0783 28 25.0609 28 24V23C28 22.2044 27.6839 21.4413 27.1213 20.8787C26.5587 20.3161 25.7956 20 25 20H21.828C21.5633 19.9999 21.3094 19.8949 21.122 19.708L12.292 10.878C11.7296 10.316 10.9671 10.0002 10.172 10H7Z" fill="#050754" />
                        </svg>
                    </div>
                    <div class="flex flex-col mr-auto max-w-[500px] max-md:w-[calc(100%-7rem)]">
                        <span><?= $item['name'] ?></span>
                        <span class="line-clamp-1">Lorem ipsum dolor sit amet consectetur nibh massa </span>
                    </div>
                    <span class="text-[1.25rem] max-md:w-full max-md:text-center">
                        Đơn giá: <span class="font-semibold text-[#F04438]">199.000đ</span>
                    </span>
                </div>
                <div class="flex max-sm:flex-wrap">
                    <select name="" id="" class="p-3 bg-[rgba(79,138,240,0.10)] rounded-[10px] max-sm:mb-3 max-sm:w-full sm:mr-3 flex-auto">
                        <option value="" hidden>Lớp</option>
                        <option value="">Lớp 1</option>
                        <option value="">Lớp 2</option>
                        <option value="">Lớp 3</option>
                    </select>
                    <select name="" id="" class="p-3 bg-[rgba(79,138,240,0.10)] rounded-[10px] max-sm:mb-3 max-sm:w-full sm:mr-3 max-lg:px-4 lg:w-[159px]">
                        <option value="" hidden>Thời gian</option>
                        <option value="">1 năm</option>
                        <option value="">2 năm</option>
                        <option value="">3 năm</option>
                    </select>
                    <button class="whitespace-nowrap max-lg:px-4 max-sm:w-full lg:w-[150px] xl:w-[200px] shrink-0 bg-[#4F8AF0] border border-[#4F8AF0] rounded-[10px] text-white font-medium text-center p-3 hover:bg-white hover:text-[#4F8AF0]">
                        Thêm ngay
                    </button>
                </div>
            </label>
        <?php } ?>
    </div>
</section>

<div class="fixed z-[5] bg-white bottom-0 sm:bottom-6 right-0 sm:right-6 w-full sm:w-[min(470px,100%)] sm:rounded-[15px] sm:shadow-[0px_4px_15px_0px_rgba(0,0,0,0.11)] border-t sm:border border-[#B0B0B0] p-4 sm:px-6">
    <div class="list-category-choose">
        <span class="flex items-center font-medium cursor-pointer btn">
            2 danh mục được chọn <i class="fa-solid fa-angle-down ml-auto"></i>
        </span>
        <ul class="max-h-[140px] overflow-y-auto custom-scroll" style="display: none;">
            <?php for ($i = 0; $i < 2; $i++) { ?>
                <li class="mt-4">
                    <div class="flex font-semibold justify-between">
                        <span class="pr-4 line-clamp-1 text-[#4A5568]">
                            Bộ đề luyện thi cho học sinh lớp 9
                        </span>
                        <span class="text-[#F04438]">
                            199.000đ
                        </span>
                    </div>
                    <span>
                        1 năm
                    </span>
                </li>
            <?php } ?>
        </ul>
    </div>
    <div class="flex border-b border-[#EAEAEA] mt-4">
        <input type="text" class="w-full mr-4 py-3" placeholder="Mã giảm giá">
        <button class="text-color-v3 font-semibold uppercase text-[0.875rem] whitespace-nowrap">
            Áp dụng
        </button>
    </div>
    <a href="" class="rounded-full px-4 text-[1.25rem] font-semibold border border-color-v1 hover:bg-white hover:text-color-v1 mt-4 text-center block py-2 bg-color-v1 text-white">
        Đăng ký - 398.000đ
    </a>
</div>

<?php @include 'footer.php'; ?>
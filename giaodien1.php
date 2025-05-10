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
        <button class="flex items-center justify-center p-2 bg-[#D7E5FF] rounded-t-[5px] text-[12px] text-[#3D3D3D] cursor-pointer hover:bg-[#c9d8f3] w-full overflow-hidden border border-[#888]">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 mr-2" viewBox="0 0 25 24" fill="none">
                <path d="M20.5 9H11.5C10.3954 9 9.5 9.89543 9.5 11V20C9.5 21.1046 10.3954 22 11.5 22H20.5C21.6046 22 22.5 21.1046 22.5 20V11C22.5 9.89543 21.6046 9 20.5 9Z" stroke="#3D3D3D" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M5.5 15H4.5C3.96957 15 3.46086 14.7893 3.08579 14.4142C2.71071 14.0391 2.5 13.5304 2.5 13V4C2.5 3.46957 2.71071 2.96086 3.08579 2.58579C3.46086 2.21071 3.96957 2 4.5 2H13.5C14.0304 2 14.5391 2.21071 14.9142 2.58579C15.2893 2.96086 15.5 3.46957 15.5 4V5" stroke="#3D3D3D" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span>Copy link Affiliate</span>
        </button>
        <div class="border border-[#888] p-3 flex flex-col items-center bg-[#F6F9FE] border-t-0 rounded-b-[5px] text-[#3D3D3D] mb-7">
            <p class="text-[12px]">Phần trăm hoa hồng <span class="font-semibold text-[1rem] ml-1 inline-block">15%</span></p>
            <p class="text-[12px]">Số tiền được nhận <span class="font-semibold text-[1rem] ml-1 inline-block">20.000 đ</span></p>
        </div>
        <div class="flex flex-wrap -mx-3 mb-7">
            <?php for ($i = 1; $i <= 6; $i++) { ?>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    <?php include 'template/affilate/item.php';
                    $key = $i; ?>
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
                        <?php include 'template/document/item.php';
                        $key = $i; ?>
                    </div>
                <?php } ?>
            </div>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>
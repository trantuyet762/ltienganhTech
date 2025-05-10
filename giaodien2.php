<?php include 'header.php'; ?>

<section class="my-10">
    <div class="container">
        <h1 class="text-[1.5rem] lg:text-[2rem] text-color-v1 font-baloo mb-5 text-center">Danh sách bộ đề các lớp</h1>
        <div class="flex flex-wrap -mx-3 mb-7">
            <?php for ($i = 1; $i <= 6; $i++) { ?>
                <div class="w-full md:w-1/2 xl:w-1/3 p-3">
                    <?php include 'template/affilate/item_v2.php'; ?>
                </div>
            <?php } ?>
        </div>
        <a href="" class="flex items-center w-fit mx-auto text-[0.875rem] text-color-v1 py-1 px-2 rounded-full border border-transparent hover:border-color-v1">
            Xem Thêm <i class="fa-solid fa-angle-down ml-1 text-[1rem]"></i>
        </a>
    </div>
</section>

<?php include 'footer.php'; ?>
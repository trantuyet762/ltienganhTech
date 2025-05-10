<?php global $key; ?>

<div class="item relative shadow-[0px_7px_16px_0px_rgba(0,0,0,0.11)] border border-[#B0B0B0] rounded-[10px] bg-white p-4 md:p-6 xl:py-8 xl:px-6">
    <a href="" class="c-img img__ pt-[48.5%] rounded-[5px] overflow-hidden mb-4">
        <img src="theme/frontend/images/banner1.png" alt="">
    </a>
    <a href="" class="text-color-v3 font-bold text-[1.25rem] mb-4 hover:text-color-v4 line-clamp-2">
        Tiếng anh cơ bản cho học sinh lớp 10
    </a>
    <span class="line-clamp-4 mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis quas laborum quo ab laboriosam. Enim cumque esse ipsam, aperiam dicta autem eum dolorum! Amet ex temporibus quos voluptas nostrum a.
    </span>
    <span class="block mb-2 text-[#333] font-medium">
        <span class="inline-block mr-6 w-[5.25rem]">Số câu hỏi</span> Tổng thời gian
    </span>
    <span class="block font-semibold text-[#333]">
        <span class="inline-block mr-6 w-[5.25rem]">20</span> 120 phút
    </span>
    <?php if ($key % 2 == 0) : ?>
        <span class="border border-color-v2 rounded-[5px] bg-color-v2 text-white px-4 hover:bg-color-v4 inline-block text-[12px] font-medium absolute -top-3.5 right-6 z-[1] leading-6">
            Free
        </span>
    <?php else : ?>
        <span class="border border-[#D27727] rounded-[5px] bg-[#D27727] text-white px-4 hover:bg-color-v4 inline-block text-[12px] font-medium absolute -top-3.5 right-6 z-[1] leading-6">
            Mua gói
        </span>
    <?php endif; ?>
</div>
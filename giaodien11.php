<?php include 'header.php'; ?>

<div class="breadcrumb h-10"></div>

<section>
    <div class="container mb-10">
        <h1 class="text-color-v3 text-[1.5rem] md:text-[2rem] lg:text-[2.5rem] font-baloo uppercase mb-3">Tiếng anh Cơ bản Cho học sinh lớp 1</h1>
        <div class="flex mb-3">
            <span class="flex items-center mr-6">
                4.9/5
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 ml-2" viewBox="0 0 24 23" fill="none">
                    <path d="M11.1359 0.983589C11.5216 0.321321 12.4784 0.321321 12.8641 0.983588L15.9809 6.33474C16.1222 6.57734 16.359 6.74937 16.6333 6.80879L22.6857 8.11941C23.4348 8.28162 23.7304 9.19154 23.2198 9.76305L19.0937 14.3809C18.9066 14.5902 18.8162 14.8686 18.8444 15.1479L19.4683 21.3091C19.5455 22.0716 18.7714 22.6339 18.0701 22.3249L12.4032 19.8277C12.1463 19.7145 11.8537 19.7145 11.5968 19.8277L5.9299 22.3249C5.22857 22.6339 4.45454 22.0716 4.53174 21.3091L5.15556 15.1479C5.18384 14.8686 5.0934 14.5902 4.90633 14.3809L0.780217 9.76305C0.269563 9.19154 0.565215 8.28162 1.31427 8.11941L7.36665 6.80879C7.64104 6.74937 7.87782 6.57734 8.01912 6.33474L11.1359 0.983589Z" fill="#E9DF24" />
                </svg>
            </span>
            <span class="flex items-center mr-6">
                667
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 ml-2" viewBox="0 0 24 25" fill="none">
                    <g clip-path="url(#clip0_315_32981)">
                        <path d="M19 10.5C19.7956 10.5 20.5587 10.8161 21.1213 11.3787C21.6839 11.9413 22 12.7044 22 13.5V16.5C22 17.2956 21.6839 18.0587 21.1213 18.6213C20.5587 19.1839 19.7956 19.5 19 19.5V20.466C19 21.526 17.764 22.105 16.95 21.426L14.638 19.5H12C11.2044 19.5 10.4413 19.1839 9.87868 18.6213C9.31607 18.0587 9 17.2956 9 16.5V13.5C9 12.7044 9.31607 11.9413 9.87868 11.3787C10.4413 10.8161 11.2044 10.5 12 10.5H19ZM16 4.5C16.7956 4.5 17.5587 4.81607 18.1213 5.37868C18.6839 5.94129 19 6.70435 19 7.5V8.5H11C9.93913 8.5 8.92172 8.92143 8.17157 9.67157C7.42143 10.4217 7 11.4391 7 12.5V16.5C7 17.544 7.4 18.496 8.056 19.208L7 20C6.176 20.618 5 20.03 5 19V17.5C4.20435 17.5 3.44129 17.1839 2.87868 16.6213C2.31607 16.0587 2 15.2956 2 14.5V7.5C2 6.70435 2.31607 5.94129 2.87868 5.37868C3.44129 4.81607 4.20435 4.5 5 4.5H16Z" fill="#4797FF" />
                    </g>
                    <defs>
                        <clipPath id="clip0_315_32981">
                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                        </clipPath>
                    </defs>
                </svg>
            </span>
        </div>
        <p class="mb-6">Lorem ipsum dolor sit amet consectetur. Ac dignissim elementum etiam nunc aliquam maecenas dui cursus consectetur. Nulla posuere interdum nibh pretium id vestibulum lobortis turpis at. Sed neque dictum massa orci tortor sed. Cursus cras eu feugiat quis. Leo arcu mattis luctus maecenas nulla ultrices. Diam viverra feugiat sapien egestas diam sollicitudin scelerisque fusce malesuada. Neque ut et netus ultrices. Sociis sem nec aliquet vel pellentesque diam. Feugiat sociis ultrices bibendum aliquet magna.</p>
        <a href="" class="min-w-[243px] max-xs:w-full inline-block text-center text-white bg-[#D27727] border border-[#D27727] px-4 py-2 rounded-full hover:bg-white hover:text-[#D27727] text-[1.25rem] font-semibold mb-10">
            Thi ngay
        </a>
        <div class="p-4 lg:p-6 pt-4 border border-[#bbb] bg-white rounded-[20px] mb-10">
            <span class="block font-medium lg:text-[1.25rem] mb-3">Mô tả</span>
            <ul class="list-disc list-outside ml-4">
                <?php for ($i = 1; $i <= 3; $i++) { ?>
                    <li class="mb-2 last:mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat necessitatibus voluptatum recusandae facere ipsum numquam, corrupti temporibus animi facilis a illum molestiae. Nemo tempore cupiditate vel quis ab ratione provident.</li>
                <?php } ?>
            </ul>
        </div>
        <div class="md:p-4 lg:p-6 xl:px-8 xl:pt-6 xl:pb-10 md:border md:border-[#bbb] bg-white md:rounded-[20px]">
            <span class="block text-color-v3 text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] font-baloo uppercase mb-4">
                Đánh giá
            </span>
            <span class="block text-color-v3 text-[1.25rem] md:text-[1.5rem] lg:text-[2rem] font-baloo uppercase mb-4">
                bÌNH LUẬN
            </span>
        </div>
    </div>
</section>

<?php include 'footer.php'; ?>
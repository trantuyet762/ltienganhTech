<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>luyentienganh.com</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="theme/frontend/css/swiper-bundle.min.css">
    <link rel="stylesheet" href="theme/frontend/css/output.css">
    <link rel="stylesheet" href="theme/frontend/css/style.css">
</head>

<body>
    <div class="header-scroll-watcher"></div>
    <header class="relative z-[50] bg-white fixed-head">
        <div class="header__top transition-all duration-300" style="margin-top: 0px;">
            <div class="container flex justify-between items-center py-3">
                <a href="http://luyentienganh.com.test" title="luyentienganh.com" class="flex items-center">
                    <span class="h-11 lg:h-[3.375rem] img__h-full">
                        <img src="http://luyentienganh.com.test/public/uploads/demo/logo.png" title="" alt="">
                    </span>
                    <span class="text-[12px] font-iciel-pony text-[#2881D5] ml-2.5">
                        luyentienganh.com </span>
                </a>
                <div class="hidden md:flex items-center">
                    <form action="tim-kiem" method="get" class="hidden md:flex items-center mr-4 w-[276px] px-4 py-2 rounded-full bg-[rgba(182,182,182,.14)]" accept-charset="utf8">
                        <input type="text" name="q" placeholder="Tìm kiếm ..." id="input-search-header" class="w-full !px-0 mr-2 bg-transparent leading-6">
                        <button type="submit" class="">
                            <i class="fa-solid fa-magnifying-glass text-color-v3"></i>
                        </button>
                    </form>
                    <a href="http://luyentienganh.com.test/dang-ky-thanh-vien-vip" title="Mua gói" class="text-white rounded-full bg-[#D27727] px-6 py-2 inline-block border border-[#D27727] hover:bg-white hover:text-[#D27727] leading-6">
                        Mua gói </a>
                </div>
                <div class="flex md:hidden items-center">
                    <div class="mr-2.5 btn-search cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6" viewBox="0 0 24 24" fill="none">
                            <path d="M17 17L21 21M3 11C3 13.1217 3.84285 15.1566 5.34315 16.6569C6.84344 18.1571 8.87827 19 11 19C13.1217 19 15.1566 18.1571 16.6569 16.6569C18.1571 15.1566 19 13.1217 19 11C19 8.87827 18.1571 6.84344 16.6569 5.34315C15.1566 3.84285 13.1217 3 11 3C8.87827 3 6.84344 3.84285 5.34315 5.34315C3.84285 6.84344 3 8.87827 3 11Z" stroke="#050754" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </div>
                    <label for="login-register" class="relative cursor-pointer">
                        <input type="checkbox" id="login-register" hidden="">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-8" viewBox="0 0 32 32" fill="none">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.6668 9.99967C21.6668 9.25552 21.5203 8.51865 21.2355 7.83113C20.9507 7.14362 20.5333 6.51893 20.0071 5.99274C19.4809 5.46654 18.8562 5.04913 18.1687 4.76436C17.4812 4.47958 16.7443 4.33301 16.0002 4.33301C15.256 4.33301 14.5191 4.47958 13.8316 4.76436C13.1441 5.04913 12.5194 5.46654 11.9932 5.99274C11.467 6.51893 11.0496 7.14362 10.7648 7.83113C10.4801 8.51865 10.3335 9.25552 10.3335 9.99967C10.3335 11.5026 10.9305 12.9439 11.9932 14.0066C13.0559 15.0693 14.4973 15.6663 16.0002 15.6663C17.5031 15.6663 18.9444 15.0693 20.0071 14.0066C21.0698 12.9439 21.6668 11.5026 21.6668 9.99967ZM16.0002 6.33301C16.9726 6.33301 17.9053 6.71932 18.5929 7.40695C19.2805 8.09458 19.6668 9.02721 19.6668 9.99967C19.6668 10.9721 19.2805 11.9048 18.5929 12.5924C17.9053 13.28 16.9726 13.6663 16.0002 13.6663C15.0277 13.6663 14.0951 13.28 13.4074 12.5924C12.7198 11.9048 12.3335 10.9721 12.3335 9.99967C12.3335 9.02721 12.7198 8.09458 13.4074 7.40695C14.0951 6.71932 15.0277 6.33301 16.0002 6.33301ZM21.3335 19.6663C22.1291 19.6663 22.8922 19.9824 23.4548 20.545C24.0174 21.1076 24.3335 21.8707 24.3335 22.6663V24.2503C24.3335 24.2743 24.3162 24.2957 24.2922 24.2997C18.8002 25.1957 13.1988 25.1957 7.70816 24.2997C7.69684 24.2971 7.68668 24.2908 7.67922 24.2819C7.67176 24.273 7.66741 24.2619 7.66683 24.2503V22.6663C7.66683 21.8707 7.9829 21.1076 8.54551 20.545C9.10812 19.9824 9.87118 19.6663 10.6668 19.6663H11.1202C11.1558 19.667 11.1913 19.6723 11.2255 19.6823L12.3788 20.0597C14.7319 20.828 17.2684 20.828 19.6215 20.0597L20.7762 19.6823C20.8095 19.6726 20.8441 19.6672 20.8788 19.6663H21.3335ZM26.3335 22.6663C26.3335 21.3403 25.8067 20.0685 24.869 19.1308C23.9313 18.1931 22.6596 17.6663 21.3335 17.6663H20.8802C20.6313 17.6672 20.3895 17.7055 20.1548 17.781L19.0002 18.1583C17.0508 18.7947 14.9495 18.7947 13.0002 18.1583L11.8455 17.781C11.6122 17.705 11.3668 17.6663 11.1215 17.6663H10.6668C9.34075 17.6663 8.06898 18.1931 7.13129 19.1308C6.19361 20.0685 5.66683 21.3403 5.66683 22.6663V24.2503C5.66683 25.2557 6.39483 26.1117 7.38683 26.273C13.0913 27.2041 18.909 27.2041 24.6135 26.273C25.0933 26.1941 25.5294 25.9475 25.8444 25.5771C26.1594 25.2067 26.3327 24.7365 26.3335 24.2503V22.6663Z" fill="#050754"></path>
                        </svg>
                        <ul class="absolute invisible opacity-0 translate-y-4 transition-all duration-300 top-[120%] right-2 px-2 py-3 rounded-[5px] shadow-[0px_0px_4px_0px_rgba(0,0,0,.1)] bg-white">
                            <li class="border-b border-solid border-[#BFBFBF] pb-2 mb-2"><a href="http://luyentienganh.com.test/dang-ky" title="Đăng ký" class="block whitespace-nowrap">Đăng ký</a></li>
                            <li><a href="http://luyentienganh.com.test/dang-nhap" title="Đăng nhập" class="block whitespace-nowrap">Đăng nhập</a></li>
                        </ul>
                    </label>
                    <button class="toogle-menu icon-bar overflow-hidden size-8 md:hidden ml-2.5 relative"></button>
                </div>
            </div>
        </div>
        <div class="header__bottom bg-[#D7E5FF]">
            <div class="container flex md:justify-between items-center">
                <a href="tel:0868 199 115" class="text-[#454545] font-medium text-[0.875rem] hover:text-color-v4 max-md:mr-auto max-md:mx-4 max-md:hidden">
                    <i class="fa-solid fa-phone mr-2 text-[#1254AA]"></i>
                    Hotline: 0868 199 115 </a>
                <div class="header__bottom-menu *:max-md:container max-md:pt-4 px-3 md:px-14 shrink-0 md:relative md:z-[1] text-[1.125rem] font-semibold">
                    <span class="flex md:hidden text-color-v1 font-medium items-center mb-6 cursor-pointer toogle-menu">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-[1.125rem] mr-2" viewBox="0 0 18 18" fill="none">
                            <path d="M5.86863 9.74961L9.54363 13.4246C9.69363 13.5746 9.76563 13.7496 9.75963 13.9496C9.75363 14.1496 9.67538 14.3246 9.52488 14.4746C9.37488 14.6121 9.19988 14.6841 8.99988 14.6906C8.79988 14.6971 8.62488 14.6251 8.47488 14.4746L3.52488 9.52461C3.44988 9.44961 3.39663 9.36836 3.36513 9.28086C3.33363 9.19336 3.31838 9.09961 3.31938 8.99961C3.32038 8.89961 3.33613 8.80586 3.36663 8.71836C3.39713 8.63086 3.45013 8.54961 3.52563 8.47461L8.47563 3.52461C8.61313 3.38711 8.78513 3.31836 8.99163 3.31836C9.19813 3.31836 9.37613 3.38711 9.52563 3.52461C9.67563 3.67461 9.75063 3.85286 9.75063 4.05936C9.75063 4.26586 9.67563 4.44386 9.52563 4.59336L5.86863 8.24961H14.2499C14.4624 8.24961 14.6406 8.32161 14.7846 8.46561C14.9286 8.60961 15.0004 8.78761 14.9999 8.99961C14.9994 9.21161 14.9274 9.38986 14.7839 9.53436C14.6404 9.67886 14.4624 9.75061 14.2499 9.74961H5.86863Z" fill="#050754"></path>
                        </svg>
                        Menu
                    </span>
                    <ul class="">
                        <li><a href="javascript:void(0)" title="Lớp" class=" ">Lớp</a>
                            <ul class="">
                                <li><a href="lop-1" title="Lớp 1" class=" ">Lớp 1</a></li>
                                <li><a href="lop-2" title="Lớp 2" class=" ">Lớp 2</a></li>
                                <li><a href="lop-3" title="Lớp 3" class=" ">Lớp 3</a></li>
                                <li><a href="lop-4" title="Lớp 4" class=" ">Lớp 4</a></li>
                                <li><a href="lop-5" title="Lớp 5" class=" ">Lớp 5</a></li>
                                <li><a href="lop-6" title="Lớp 6" class=" ">Lớp 6</a></li>
                                <li><a href="lop-7" title="Lớp 7" class=" ">Lớp 7</a></li>
                                <li><a href="lop-8" title="Lớp 8" class=" ">Lớp 8</a></li>
                                <li><a href="lop-9" title="Lớp 9" class=" ">Lớp 9</a></li>
                            </ul>
                        </li>
                        <li><a href="doi-tac" title="Đối tác" class=" ">Đối tác</a></li>
                        <li><a href="tin-tuc" title="Tin tức" class=" ">Tin tức</a></li>
                        <li><a href="lien-he" title="Liên hệ" class=" ">Liên hệ</a></li>
                    </ul>
                    <span class="md:hidden">
                        <a href="http://luyentienganh.com.test/dang-ky-thanh-vien-vip" title="Mua gói" class="text-white rounded-full bg-[#D27727] px-6 py-2 block border border-[#D27727] hover:bg-white hover:text-[#D27727] w-full text-center mt-6">
                            Mua gói </a>
                    </span>
                    <a href="tel:0868 199 115" class="text-[#454545] font-medium hover:text-color-v4 mt-auto pb-6 text-center md:hidden">
                        <i class="fa-solid fa-phone mr-2 text-[#1254AA]"></i>
                        Hotline: 0868 199 115 </a>
                </div>
                <div class="hidden md:flex items-center text-[#1254AA] text-[0.875rem] font-bold">
                    <a href="http://luyentienganh.com.test/dang-ky" title="Đăng ký" class="hover:text-color-v4 hover:underline">Đăng ký</a>
                    <span class="h-4 w-0.5 bg-[#1254AA] mx-2"></span>
                    <a href="http://luyentienganh.com.test/dang-nhap" title="Đăng nhập" class="hover:text-color-v4 hover:underline">Đăng nhập</a>
                </div>
            </div>
        </div>
        <div class="bg-overlay fixed inset-y-0 right-0 translate-x-full w-[calc(100%-320px)] z-[100] bg-black/30 md:hidden transition-all duration-300"></div>
    </header>
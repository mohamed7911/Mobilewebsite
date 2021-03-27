$(".dashbtn").click(function(){
    $(".leftsidebar").css({left:'0%'});
    $(".leftnavwall").css({left:'25%'})
    $(".rightsidebar").css({right:'-100%'});
    $(".rightnavwall").css({right:'100%'});
})
$(".navcart").click(function(){
    $(".rightsidebar").css({right:'0%'});
    $(".rightnavwall").css({right:'25%'})
    $(".leftnavwall").css({left:'100%'});
})
$(".exit").click(function(){
    $(".leftsidebar").css({left:'-100%'});
    $(".rightsidebar").css({right:'-100%'});
    $(".rightnavwall").css({right:'100%'});
    $(".leftnavwall").css({left:'100%'});
})
$(window).resize(function() {
    if( $(window).width() >1000 )
        $(".leftsidebar").css({left:'-100%'});
});
$('body').click(function(e){
    if($(e.target).attr('class')!="mx-auto font-weight-bold text-white"&&$(e.target).attr('class')!="list-unstyled"&&$(e.target).attr('class')!="p-5 leftsidebar sidebar"&&$(e.target).attr('class')!="dbtn"&&$(e.target).children().attr('class')!="text-white"&&$(e.target).attr('class')!="text-white"&&$(e.target).attr('class')!="leftlogo d-flex mb-4"&&$(e.target).attr('class')!="clearfix"){
        $(".leftsidebar").css({left:'-100%'});
    }
})
$(".rightnavwall").click(function(){
    $(".rightsidebar").css({right:'-100%'});
    $(".rightnavwall").css({right:'100%'})
})
$(".leftnavwall").click(function(){
    $(".leftsidebar").css({left:'-100%'});
    $(".leftnavwall").css({left:'100%'});
})


$(document).scroll(function() {
    if( $(window).width() >=770 ){
        if($(document).scrollTop() > 200){
            $('.navbar').slideDown();
        } else{
            $('.navbar').slideUp();
        };
    }
    else{
        $('.navbar').slideDown();
    }
    console.log($(document).scrollTop());
});
$(".searchbtn").hover(function () {
    $(".searchinp").fadeIn();
});
$('.searchform').mouseleave(function() {
    $(".searchinp").fadeOut();
});
$(".leftlog").click(function(){
    $(".inpsigndiv").fadeOut(500);
    $(".inplogdiv").delay(500).fadeIn();
    $(".logsign").delay(500).animate({width:"50%"},0);
})
$(".rightsign").click(function(){
    $(".inplogdiv").fadeOut(500);
    $(".inpsigndiv").delay(500).fadeIn();
    if( $(window).width() >780 )
        $(".logsign").delay(500).animate({width:"25%"},0);
})
$(".userlog").click(function(){
    $(".login").css("display","flex");
})
$(".logexit").click(function(){
    $(".login").css("display","none");
})
/*$(document).scroll(function() {
    if( $(window).width() >=770 ){
        if($(document).scrollTop() >= 200){
            $('.navbar').slideDown();
        } else{
            $('.navbar').slideUp();
        };
    }
    else{
        $('.navbar').slideDown();
    }
})*/
$(".carousel-control-prev").click(function(){
    $(this).find("i").css("color","#000")
})
/*$(document).scroll(function() {
    if($(document).scrollTop() > 10){
        $('.navbar').css("backgroundColor","#1f2021");
    } else if($(document).scrollTop() < 100){
        $('.navbar').css("backgroundColor","transparent");
    }; 
    console.log($(document).scrollTop());
});*/
$(".desc1").animate({top:"0%"},700)
$(".desc2").delay(200).animate({top:"0%"},700)
$(".desc3").delay(300).animate({top:"0%"},700)
$(".screen").delay(1000).slideUp(800)
$(".searchbtn").click(function(){
    $(".downsearch").css("display","none");
    $(".upersearch").css("display","flex");
})
$(".exitsearch").click(function(){
    $(".downsearch").css("display","flex");
    $(".upersearch").css("display","none");
})
var owl = $('.owl-carousel');
owl.owlCarousel({
    responsive:{
        0:{
            items:1,
            nav:true,
            loop:true
        },
        600:{
            items:3,
            nav:false,
            loop:true
        },
        1000:{
            items:5,
            nav:true,
            loop:true
        }
    },
    margin:10,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true
});
$('.play').on('click',function(){
    owl.trigger('play.owl.autoplay',[1000])
})
$('.stop').on('click',function(){
    owl.trigger('stop.owl.autoplay')
})
$(".onesquare").click(function(){
    $(".resizediv").removeClass("col-lg-3");
    $(".resizediv").addClass("col-lg-6");
    $(".mobileimg").css("width","70%");
})
$(".foursquares").click(function(){
    $(".resizediv").removeClass("col-lg-6");
    $(".resizediv").addClass("col-lg-3");
    $(".mobileimg").css("width","40%");
})
$(".hearticon").click(function(){
    if($(this).css("color")!="rgb(255, 0, 0)")
        $(this).css("color","red")
    else
        $(this).css("color","#000")
})
$(".fil").click(function(){
    $(".filter").animate({top:"0"},500)
})
$(".filexit").click(function(){
    $(".filter").animate({top:"100%"},500)
})
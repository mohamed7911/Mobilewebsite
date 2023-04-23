var posts="";
getPosts()
let checkedBrand=[]
let mobsArray=[]
$('#pagination-demo').twbsPagination({
    totalPages: 6,
    visiblePages: 4,
    next: 'Next',
    prev: 'Prev',
    onPageClick: function(event, page) {
        //fetch content and render here
        window.open("http://localhost:3000/phones/"+page).focus();

    }
});
$(".hiddenList").each(function( index ) {
    mobsArray.push(`<div class="col-lg-3 resizediv">`+$(this).html()+`</div>`)
});
var socket = io();
$(".form-check-input").click(function(){
    if($(this).siblings(".test").text()=="0")
    {
        checkedBrand.push($.trim($(this).siblings(".brandName").text()))
        $(this).siblings(".test").text("1")
    }
    else
    {
        const index = checkedBrand.indexOf($.trim($(this).siblings(".brandName").text()));
        if (index > -1) {
            checkedBrand.splice(index, 1);
        }
        $(this).siblings(".test").text("0")
    }
    socket.emit("hamada",checkedBrand)
})
socket.on("replay",(data)=>{
    console.log(data);
})
// $(".mobileLists").html(mobsArray)
// $(".form-check-input").click(function (){
//     let showedPhones=[]
//     if($(this).siblings(".test").text()=="0")
//     {
//         checkedBrand.push($.trim($(this).siblings(".brandName").text()))
//         $(this).siblings(".test").text("1")
//     }
//     else
//     {
//         const index = checkedBrand.indexOf($.trim($(this).siblings(".brandName").text()));
//         if (index > -1) {
//             checkedBrand.splice(index, 1);
//         }
//         $(this).siblings(".test").text("0")
//     }
//     for (let i = 0; i < mobsArray.length; i++) {
//         for (let j = 0; j < checkedBrand.length; j++) {
//             if (mobsArray[i].includes(checkedBrand[j]) || mobsArray[i].includes(checkedBrand[j].toLowerCase())) {
//                 showedPhones.push(mobsArray[i])
//             }
//         }
//     }
//     if(showedPhones.length>0)
//         $(".mobileLists").html(showedPhones)
//     else{
//         $(".mobileLists").html(mobsArray)
//     }
// })
console.log($(".anything").html());
$(".inpSearch").keyup(function () {
    $(".seachSpan").text($(".inpSearchRT").val());
    addProduct($(".inpSearchRT").val());
    console.log(posts);
    console.log($(".inpSearchRT").val());
})
$(".inpSearch").click(function () {
    $(".mySearch").slideToggle()
})
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
$(".searchbtn2").click(function(){
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
$(".proimg").click(function(){
    $(".productimg").css("backgroundImage",'url("file:///E:/Questions/BeGroup/cloth%20shopping/'+$(this).attr('src')+'")');
})
$(".prodrop").click(function(){
    $(this).parent().find("ul").slideToggle();
    $(this).parent().siblings().find("ul").slideUp();
})
$(".star").click(function(){
    for(i=1;i<=$(this).attr("id").slice($(this).attr("id").length-1,$(this).attr("id").length);i++)
        $("#star"+i).addClass("text-warning")
    for(i=$(this).attr("id").length;i>$(this).attr("id").slice($(this).attr("id").length-1,$(this).attr("id").length);i--)
        $("#star"+i).removeClass("text-warning")
})
// noUiSlider.create(slider, {
//     start: [2000, 2015],
//     connect: true,
//     step:1,
//     range: {
//         'min': 1999,
//         'max': 2021
//     }
// });
// $(".noUi-handle-lower").mouseup(function() {
//     console.log($(".noUi-handle-lower").attr("aria-valuetext"));
// })
// $(".noUi-handle-lower").on("change",function(){
//     console.log("fasa");
//   });
  var slider = document.getElementById('range');

  noUiSlider.create(slider, {
      start: [ 2000,2015 ], // Handle start position
      connect: true,
      margin:1,
      step: 1, // Slider moves in increments of '10'
      range: { // Slider can select '0' to '100'
          'min': 1999,
          'max': 2021
      }
  });

  var minCostInput = document.getElementById('minCost'),
      maxCostInput = document.getElementById('maxCost');

  // When the slider value changes, update the input and span
  slider.noUiSlider.on('update', function( values, handle ) {
      if ( handle ) {
          maxCostInput.value = values[handle].split(".")[0];
          $(".max").text( values[handle].split(".")[0]);
      } else {
          minCostInput.value = values[handle].split(".")[0];
          $(".min").text( values[handle].split(".")[0]);
      }
  });
  minCostInput.addEventListener('change', function(){
      slider.noUiSlider.set([null, this.value]);
  });
  maxCostInput.addEventListener('change', function(){
      slider.noUiSlider.set([null, this.value]);
  });
  var slider = document.getElementById('range2');
  noUiSlider.create(slider, {
      start: [ 6000,15000 ], // Handle start position
      connect: true,
      margin:1000,
      step: 1000, // Slider moves in increments of '10'
      range: { // Slider can select '0' to '100'
          'min': 1000,
          'max': 30000
      }
  });
  var minCostInput2 = document.getElementById('minCost2'),
      maxCostInput2 = document.getElementById('maxCost2');
  // When the slider value changes, update the input and span
  slider.noUiSlider.on('update', function( values, handle ) {
      if ( handle ) {
          maxCostInput2.value = values[handle].split(".")[0];
          $(".max2").text( values[handle].split(".")[0]);
      } else {
          minCostInput2.value = values[handle].split(".")[0];
          $(".min2").text( values[handle].split(".")[0]);
      }
  });
  minCostInput2.addEventListener('change', function(){
      slider.noUiSlider.set([null, this.value]);
  });
  maxCostInput2.addEventListener('change', function(){
      slider.noUiSlider.set([null, this.value]);
  });
var mobile=500;
console.log(mobile);
$(document).on("mousewheel", function() {
    // console.log("window = "+$(window).scrollTop());
    // console.log(mobile);
    // if($(window).scrollTop()>=$('.handimg').offset().top-300){
    //     $(".handimg").fadeIn({ duration: 1000, queue: true });
    //     $(".handimg").animate({marginLeft:'0%'},{ duration: 2000, queue: false });
    // }
    // else{
    //     $(".handimg").fadeOut({ duration: 1000, queue: true });
    //     $(".handimg").animate({marginLeft:'-120%'},{ duration: 2000, queue: false });
    // }
    if($(window).scrollTop()>=mobile){
        $(".searchMob").animate({top:'0%'},2000);
    }
    else{
    }
});
$(".brandOption").click(function () {
    $(".brandDd").val($(this).text())
    $(this).css("background-color","#3FB8AF")
    $(this).css("color","#fff")
    $(this).siblings().css("background-color","#fff")
    $(this).siblings().css("color","#000")
})
function getPosts()
{
    console.log("running");
    var req=new XMLHttpRequest();
    req.open("GET","https://restcountries.eu/rest/v2/all");
    req.onreadystatechange =function()
    {
        if(req.readyState==4 && req.status==200)
            {
                posts=JSON.parse(req.response);
                display()
            }
    }
    req.send();
}
function display()
{
    var str="";
    for (let i = 0; i < posts.length; i++) {
        str+=`<option>`+posts[i].name+`</option>`
    }
    $(".anything").html(str)
}

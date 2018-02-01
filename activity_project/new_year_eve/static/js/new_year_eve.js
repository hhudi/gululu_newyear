
var files=null;
var photoType=0;
var currentScale = 1;

$(function(){
  console.log(localStorage);
  if(localStorage.length != 0){
   localStorage.removeItem('imgSrc');
   console.log(document.localStorage);
  }
  var wh = $(window).height();
  $('.outer').height(wh);
  $(window).resize(function(){
    var wh = $(window).height();
    $('.outer').height(wh);
  });
  var save_img_name = 'img'+''+getTime()+'';


  $('.swiper-button-next').css('background-image','url("/static/img/swiper_next.png")');
  $('.swiper-button-prev').css('background-image','url("/static/img/swiper_prev.png")');
  $('.outer').css('background','url("/static/img/bg.jpg")');
  $('.outer').css('background-size','100% 100%');

  var swiper_wapper = $('.swiper-wrapper');
  for(var i=0;i<8;i++){
    swiper_wapper.append('<div class="swiper-slide"><div class="bg_img"><div class="img_div"><img src="" alt="" class="img"></div> </div> </div>');
  }

  var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal',
    loop: false,
    onlyExternal: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    onInit: function(swiper){
      // swiper.activeIndex += 1;
      var current_img = $('.swiper-slide-active .img');
      var next_slide_img = $('.swiper-slide-next .img');
      var img_path = "/static/img/bg/bg00"+(swiper.activeIndex+1)+".png";
      var img_path_next = "/static/img/bg/bg00"+(swiper.activeIndex+2)+".png";
      current_img.attr('src',img_path);
      next_slide_img.attr('src',img_path_next);
      console.log(next_slide_img);
      var active_img = document.getElementsByClassName('img')[swiper.activeIndex];
      active_img.onload = function(){
        var bg_img_h = current_img.css('height');
        console.log(bg_img_h);
        $('.bg_img .img_div').css('height',bg_img_h);
      }
    },
    onSlideChangeEnd: function(swiper){
      console.log(swiper.activeIndex);
      var current_img = $('.swiper-slide-active .img');
      var next_slide_img = $('.swiper-slide-next .img');
      var img_path = "/static/img/bg/bg00"+(swiper.activeIndex+1)+".png";
      var img_path_next = "/static/img/bg/bg00"+(swiper.activeIndex+2)+".png";
      current_img.attr('src',img_path);
      console.log(next_slide_img);
      next_slide_img.attr('src',img_path_next);
    }
  });

  var dom = '<div class="user_img_div">'+
        '<img src="" alt="" class="user_img" />'+
        '</div>'+
        '<div class="touch_div"></div>';
  $('.swiper-slide .bg_img .img_div').append(dom);


  $('.img_input').on('change',function(event){
    imgReader();    // 图片预览
    event.preventDefault();
  });

  $('.btn_create').on('click',function(event){
    $('.loading_div').show();
    html2canvas(document.querySelector('.swiper-slide-active .bg_img .img_div'),{
      allowTaint:true,
    }).then(function(canvas) {
      var imgUrl = canvas.toDataURL('image/png');
      baseto2(imgUrl);
    });
  });

  var dx=0,dy=0;
  touch.on('.touch_div','touchstart',function(e){
    e.preventDefault();
  });
  touch.on('.touch_div','drag',function(e){
    var localX = dx+e.x+'px';
    var localY = dy+e.y+'px';
    $('.user_img').css({'top':''+localY+'','left':''+localX+''});
  });
  touch.on('.touch_div','dragend',function(e){
    dx+=e.x;
    dy+=e.y;
  });
  var initialScale = 1;
  touch.on('.touch_div', 'pinch pinchin pinchout', function(ev) {
    currentScale = ev.scale - 1;
    currentScale = initialScale + currentScale;
    currentScale = currentScale > 2 ? 2 : currentScale;
    currentScale = currentScale < 0.5 ? 0.5 : currentScale;
    $('.user_img').css('webkitTransform','scale('+currentScale+')');
  });
  touch.on('.touch_div', 'pinchend', function(ev) {
    initialScale = currentScale;
  });
  touch.on('.touch_div','doubletap',function(ev){
    $('.user_img').css({'top':0,'left':0});
    $('.user_img').css('webkitTransform','scale(1)');
  });
});

function getUuid(){
    var len=32;
    var radix=16;
    var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
    return uuid.join('');
}

function getTime(){
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth()+1;
  var date = now.getDate();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var time = year+'-'+month+'-'+date+'-'+h+'-'+m+'-'+s;
  return time;
}

function SaveAs5(imgURL){
  var Pop = window.open(imgURL,"","width=1, height=1, top=5000, left=5000");
  console.log(Pop);
  for(;Pop.document.readyState != "complete"; )
  {
    if (Pop.document.readyState == "complete")break;
  }
  Pop.document.execCommand("SaveAs");
  Pop.close();
}

function imgReader(){
  if (window.FileReader) {
    var reader = new FileReader();
  } else {
      alert("您的设备不支持图片预览功能，如需该功能请升级您的设备！");
      return;
  }
  var file = img_input.files[0];
  console.log(file);
  var imageType = /^image\//;
  if(imageType.test(file.type)){
    reader.onload = function(e) {
      $('.user_img').attr('src',e.target.result);
    };
    reader.readAsDataURL(file);
  }else{
    alert("请选择图片！");
    return;
  }
}

function baseto2(base){
  var arr = base.split(','),mime = arr[0].match(/:(.*?);/)[1],bstr = atob(arr[1]),n = bstr.length,u8arr = new Uint8Array(n);
  while(n--){
    u8arr[n] = bstr.charCodeAt(n);
  }
  var obj = new Blob([u8arr],{type:mime});
  var fd = new FormData();
  var newFileName = getTime()+'.png';
  console.log(newFileName);
  fd.append("file",obj,"image.png");
  fd.append("token", qiniuTK);
  fd.append("key",newFileName);
  $.ajax({
    url:"http://upload.qiniu.com",
    type: "POST",
    processData: false,
    contentType: false,
    data: fd,
    success: function (data) {
      console.log(data);
      var baseUrl = 'http://p2l96yk6l.bkt.clouddn.com/';
      var imgSrc = baseUrl+data.key;
      // newPage(imgSrc,data.key);  // form提交到新的页面
      localStorage.setItem('imgSrc',imgSrc);
      console.log(imgSrc);
      newPage('/activity/save_img',data.key);
      // window.location.href = '/activity/save_img';
    },
    error: function (error) {
      console.log("error");
      console.log(error);
    }
  });
}
function imgUpload(input_file){
  console.log(input_file);
  var _id=input_file.attr('id');
  photoType=parseInt(_id.charAt(_id.length-1));
  files=input_file.prop('files');
  for (var i = 0; i <  files.length; i++) {
    var file = files[i];
    var name=getTime();
    var fileExt=file.name.substring(file.name.lastIndexOf(".")+1);
    var newFileName=name+'.'+fileExt;
    var data = new FormData();
    data.append("file", file);
    data.append("token", qiniuTK);
    data.append("key", newFileName);
    $.ajax({
      type: "POST",
      url: 'http://upload.qiniu.com',
      data: data,
      processData: false,
      contentType: false,
      success:function(data){
        console.log(data);
        var baseUrl = 'http://p2l96yk6l.bkt.clouddn.com/';
        var imgSrc = baseUrl+data.key;
        console.log(imgSrc);
        $('#a_save').attr({'href':imgSrc,'download':newFileName});
        console.log($('#a_save'));
      },
      error: function (data) {
        console.log(data);
        console.log("上传失败");
      }
    });
  }
}

function newPage(url,name){
  $('body').append("<form></form>");
  $('body').find('form').attr('style','display:none');
  $('body').find('form').attr('target','_top');
  $('body').find('form').attr('method','get');
  $('body').find('form').attr('action',url);
  var input1=$("<input>");
  input1.attr("type","hidden");
  input1.attr("name",'name');
  input1.attr("value",name);
  $('body').find('form').append(input1);
  $('body').find('form').submit();
}

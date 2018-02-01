
var files=null;
var photoType=0;

$(function(){
  $('.img_container').width($('#img_div').width()*0.9);
  $('.img_container').height($('#img_div').height()*0.4);
  $(window).resize(function () {
    $('.img_container').width($('#img_div').width()*0.9);
    $('.img_container').height($('#img_div').height()*0.4);
  });
  var height = document.body.offsetHeight;
  $('#img_div').height(height);
  $('#img_div').css('background-image',"url('/static/image/2.jpg')")
  $('#button').click(function () {
    html2canvas(document.querySelector('#img_div'),{
      allowTaint:true,
    }).then(function(canvas) {
          var imgUrl = canvas.toDataURL('image/png');
          $('.screenshot_img:eq(0)').attr('src',imgUrl)
          $('a').attr('href',imgUrl);
          console.log(imgUrl);
          console.log($('.screenshot_img:eq(0)'));
        });
  });
  $('#bg_btn').on('click',function (event) {
    $('#img_div').css({'opacity':'0.4'},{'z-index':'0'});
    $('.img_container').eq(0).css({'display':'block'}).removeAttr('z-index');
    $('.bg_img').on('click',function (event) {
      var entire_src = event.target.src;
      $('.img_container').eq(0).css({'display':'none'},{'z-index':'-1'});
      $('#img_div').css({'opacity':'1'});
      $('#img_div').css('background-image',"url("+entire_src+")")
    })
    event.preventDefault();
  })
  for(var i=2;i<=3;i++){
    $('.bg_'+i+'').attr('src','/static/image/'+i+'.jpg');
  }

  $('.img_input').change(function(){
    console.log($(this));
		var _id=$(this).attr('id');
		photoType=parseInt(_id.charAt(_id.length-1));
		files=$(this).prop('files');
		for (var i = 0; i <  files.length; i++) {
			var file = files[i];
			var name=getUuid();
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
          $('.img_div .user_img').attr('src',''+imgSrc+'');

          // html2canvas screenshot (div)

          /*html2canvas(document.querySelector('#img_div'),{
            allowTaint:true,
          }).then(function(canvas) {
              var imgUrl = canvas.toDataURL('image/png');
              $('.img_div').css('background','url('+imgUrl+')')
          });*/
        },
        error: function (data) {
          console.log(data);
          console.log("上传失败");
        }
      });
    }
  });
})

function getUuid(){
    var len=32;
    var radix=16;
    var chars='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');var uuid=[],i;radix=radix||chars.length;if(len){for(i=0;i<len;i++)uuid[i]=chars[0|Math.random()*radix];}else{var r;uuid[8]=uuid[13]=uuid[18]=uuid[23]='-';uuid[14]='4';for(i=0;i<36;i++){if(!uuid[i]){r=0|Math.random()*16;uuid[i]=chars[(i==19)?(r&0x3)|0x8:r];}}}
    return uuid.join('');
}

/* Author:

*/

jQuery(document).ready(function ($) {

  var hash = window.location.hash;

  if( hash.length > 0 && 
      ( hash === "#thsf2012"      ||
        hash === "#conferences"   ||
        hash === "#performances"  ||
        hash === "#ateliers"      ||
        hash === "#concerts"      ||
        hash === "#streaming"
      )
  ) {
    $('#navbar a').removeClass('current');
    $("#navbar a[href=" + hash + "]").addClass('current');

    $('section').addClass('invisible');
    $(hash).removeClass("invisible");

    $('body').removeClass().addClass(hash.slice(1));
  }

  // Picto click to open event description
  //
  // Display event description if currently hidden
  // and close it if currently shown.
  //
  // It should not interact with other event description
  $(".picto").live('click',function(){
    if($(this).hasClass('all')){
      $(this).closest("section").find(".descr").removeClass("invisible");
    } else {
      var descr = $(this).parent().children('.descr');
      if(descr.hasClass("invisible")) {
        descr.show("slow").removeClass("invisible");
      } else {
        descr.hide("slow").addClass("invisible");
      }
    }
  });

  $('#navbar a').live('click',function(){
    $('#navbar a').removeClass('current');
    $(this).addClass("current");

    var lasection=$(this).attr("href");
    window.location.hash = lasection;

    if (lasection=="mailto:contact@tetalab.org"){
      return true;
    }

    $('section').addClass('invisible').delay(800);
    $(lasection).removeClass('invisible');
    $('body').removeClass().addClass(lasection.slice(1));
    return false;
  });

  // Click on multilang feature
  //
  // it'll display selected lang in current box
  // and set all boxes to this same lang
  $('.sub-nav a.section').click(function(){

    if(!$(this).closest("dd").hasClass("active")){

      var lang = $(this).attr('rel');

      // Desactivate all active subnav
      $("dd.active").removeClass('active');
      // Activate all sub-nav on the same lang
      $("a[rel=" + lang + "]").closest("dd").addClass('active');
      // Desavtivate all shown translations
      $(".lang").hide();
      // Display all translations of the same lang
      $("." + lang).show();
    }

    return false;
  });

  $f("player", "http://releases.flowplayer.org/swf/flowplayer-3.2.11.swf", {
//    clip: {
      // configure clip to use hddn as our provider, refering to our rtmp plugin
 //     url: 'livestream',
  //    live: true,
  //    provider: 'rtmp'
  //  },

    playlist:[
        { url: "/img/streaming.jpg", duration: 5 },
        {   url: 'livestream', live: true, provider: 'rtmp' }
    ], 
    plugins: {

      // here is our rtmp plugin configuration
      rtmp: {
        url: "flowplayer.rtmp-3.2.10.swf",
        // netConnectionUrl defines where the streams are found
        netConnectionUrl: 'rtmp://88.191.135.70/live/'
      }
    }
  });
});

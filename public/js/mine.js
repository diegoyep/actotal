$("#menu-close").click(function(e) {
          e.preventDefault();
          $("#sidebar-wrapper").toggleClass("active");
      });
$("#menu-toggle").click(function(e) {
          e.preventDefault();
          $("#sidebar-wrapper").toggleClass("active");
      });
// $('#share_button').click(function(e){

// e.preventDefault();
// FB.ui(
// {
// method: 'feed',
// name: 'Zefira Acceso Total',
// link: ' http://accesototal.zefira.pe',
// picture: 'http://accesototal.zefira.pe/images/main.png',
// caption: 'This is the content of the "caption" field.',
// description: 'This is the content of the "description" field, below the caption.',
// message: ''
// });
// });
$().ready(function(){
  $('#form-one').validate({
    rules: {
      email: {
        required: true,
        email : true
      }
    },
    messages : {
      email : {
        required: "Ingresa un correo electronico",
        email: "Ingresa un correo electronico valido"
      }
    }
  });
 $('#form-two').validate({
    rules: {
      email: {
        required: true,
        email : true
      }
    },
    messages : {
      email : {
        required: "Ingresa un correo electronico",
        email: "Ingresa un correo electronico valido"
      }
    }
  });
})

$(function() {
        $('a[href*=#]:not([href=#])').click(function() {
          if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
              || location.hostname == this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                scrollTop: target.offset().top
              }, 1000);
              return false;
            }
          }
        });
      });


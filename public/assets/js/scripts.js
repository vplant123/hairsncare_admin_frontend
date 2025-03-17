$().ready(function(){
  $('.banner-slide').slick({
    arrows: true,
    centerPadding: "0px",
    dots: true,
    slidesToShow: 1,
    infinite: false
  });
});


$().ready(function(){
  $('.testmonial-slide').slick({
    arrows: true,
    centerPadding: "0px",
    dots: true,
    slidesToShow: 1,
    infinite: false
  });
});



let mainNavLinks = document.querySelectorAll(".side-nav ul li a");
let mainSections = document.querySelectorAll(".sidebar-section h4");

let lastId;
let cur = [];
window.addEventListener("scroll", event => {
  let fromTop = window.scrollY;

  mainNavLinks.forEach(link => {
    let section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("current");
    } else {
      link.classList.remove("current");
    }
  });
});



// $(function() {
//   $("#price-range").slider({
//     step: 500,
//     range: true, 
//     min: 0, 
//     max: 20000, 
//     values: [0, 20000], 
//     slide: function(event, ui)
//     {$("#priceRange").val(ui.values[0] + " - " + ui.values[1]);}
//   });
//   $("#priceRange").val($("#price-range").slider("values", 0) + " - " + $("#price-range").slider("values", 1));
  
// });

$(document).ready(function(){
  filter_data();
  function filter_data()
  {
      $('.filter_data').html('<div id="loading" style="" ></div>');
      var action = 'fetch_data';
      var minimum_price = $('#hidden_minimum_price').val();
      var maximum_price = $('#hidden_maximum_price').val();
      $.ajax({
          url:"fetch_data.php",
          method:"POST",
          data:{action:action, minimum_price:minimum_price, maximum_price:maximum_price},
          success:function(data){
              $('.filter_data').html(data);
          }
      });
  }
  $('#price_range').slider({
      range:true,
      min:50,
      max:5000,
      values:[50, 5000],
      step:50,
      stop:function(event, ui)
      {
          $('#price_show').html(ui.values[0] + ' - ' + ui.values[1]);
          $('#hidden_minimum_price').val(ui.values[0]);
          $('#hidden_maximum_price').val(ui.values[1]);
          filter_data();
      }
  });
});

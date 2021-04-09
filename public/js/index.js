/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
// console.log("Loaded index.js");

function requestList(listname, id, cb) {
  console.log("ran request list");
  var addIdToRoute = id === false ? "" : "/" + id;
  $.ajax({
    method: "get",
    url: "/api/" + listname + addIdToRoute
  })
    .then(function(data) {
      console.log(data);
      cb(data);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function addToList(listname, data, cb) {
  console.log("ran add list");
  $.ajax({
    method: "post",
    url: "/api/" + listname,
    data: {
      apiId: data.id,
      title: data.title,
      poster: data.poster
    }
  }).then(function(data) {
    cb(data);
  });
}

function deleteFromList(listname, id, isApiId = false, cb) {
  console.log("ran delete on list");
  var urlStub = isApiId ? "/byApiId/" : "/";
  $.ajax({
    method: "delete",
    url: "/api/" + listname + urlStub + id
  }).then(function(data) {
    cb(data);
  });
}

function getRecommendations(id, cb) {
  $.ajax({
    method: "get",
    url: "/api/recommendations/" + id
  })
    .then(function(data) {
      cb(data);
    })
    .catch(function(err) {
      console.log(err);
    });
}

$(".wishlist-button").on("click", function(event) {
  var $buttonRef = $(this);
  var title = $(this).attr("data-title");
  var id = $(this).attr("data-id");
  var poster = $(this).attr("data-poster");

  var isInLists = $(this).hasClass("orange lighten-1");

  if (isInLists) {
    deleteFromList("wishList", id, true, function(data) {
      $buttonRef.removeClass("orange lighten-1");
      $buttonRef.text("Add to Wish List");
    });
  } else {
    addToList("wishList", { id, title, poster }, function(data) {
      $buttonRef.addClass("orange lighten-1", true);
      $buttonRef.text("Remove from Wish List");
    });
  }
});

$(".watchedlist-button").on("click", function(event) {
  var $buttonRef = $(this);
  var title = $(this).attr("data-title");
  var id = $(this).attr("data-id");
  var poster = $(this).attr("data-poster");

  var isInLists = $(this).hasClass("orange lighten-1");

  if (isInLists) {
    deleteFromList("watchedList", id, true, function(data) {
      $buttonRef.removeClass("orange lighten-1");
      $buttonRef.text("Add to Watched List");
    });
  } else {
    addToList("watchedList", { id, title, poster }, function(data) {
      $buttonRef.addClass("orange lighten-1", true);
      $buttonRef.text("Remove from Watched List");
    });
  }
});

$(document).ready(function() {
  $(".sidenav").sidenav();
  $(".modal").modal();

  // eslint-disable-next-line no-unused-vars
  var swiper = new Swiper(".swiper-fade-effect", {
    spaceBetween: 30,
    effect: 'fade',
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    on: {
      slideChangeTransitionStart: function () {
          // Slide captions
          var swiper = this;
          var slideTitle = $(swiper.slides[swiper.activeIndex]).attr("data-title");
          var slideSubtitle = $(swiper.slides[swiper.activeIndex]).attr("data-subtitle");
          $(".slide-captions").html(function() {
            return "<h2 class='current-title'>" + slideTitle + "</h2>" + "<h4 class='current-subtitle'>" + slideSubtitle + "</h4>";
          });
      }
    }

  });
  
});

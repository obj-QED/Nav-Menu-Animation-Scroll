$(document).ready(function () {
  // General
  client_width = document.body.clientWidth;
  $(".head-menu .main-menu .menu ul").append('<div id="menu-border"></div>');

  // Menu Border
  function MenuBorder(elem) {
    if (client_width >= 992) {
      const isActive = $(elem).find("ul > li.hs-menu-depth-1").hasClass("active"),
        style = "easeOutExpo",
        border = $("#menu-border");
      // Params
      let default_width = $(elem).find("ul > li.hs-menu-depth-1.active > a").outerWidth() - 48,
        default_top = isActive ? $(elem).find("ul > li.hs-menu-depth-1.active").outerHeight() : $(elem).find("ul > li.hs-menu-depth-1").outerHeight(),
        default_left = isActive ? Math.round($(elem).find("ul > li.hs-menu-depth-1.active").offset().left - $(elem).find("ul").offset().left + 24) : -$(elem).find("ul");
      if (isActive) {
        border.css({width: default_width, left: default_left, top: default_top - 4});
        console.log(border);
      } else {
        border.css({width: default_width, left: -default_left, top: default_top - 4});
        console.log(border);
      }
      $(elem)
        .find("li.hs-menu-depth-1")
        .hover(
          function () {
            let width = $(this).children("a").outerWidth() - 48,
              left = Math.round($(this).offset().left - $(elem).find("ul").offset().left) + 24;
            console.log(border);
            border.stop(false, false).animate({left: left, width: width}, {duration: 1200, easing: style});

            if ($(this).hasClass("tooltip-default")) {
              border.css({background: "#8591a880"});
            } else {
              border.css({background: ""});
            }
          },
          function () {
            let default_left = isActive ? Math.round($(elem).find("ul > li.hs-menu-depth-1.active").offset().left - $(elem).find("ul").offset().left + 24) : -(document.documentElement.clientWidth + 15);

            if (isActive) {
              border.stop(false, true).animate({left: default_left, width: default_width}, {duration: 2000, easing: style}).css({background: ""}); // Left Border for dont Active Item
            } else {
              border.stop(false, true).animate({left: -default_left, width: default_width}, {duration: 1000, easing: style}).css({background: ""}); // Left Border for dont Active Item
            }
          },
        );
    }
  }

  // Tooltip
  (function ($) {
    var moveTooltip = false,
      $tooltip = $("<div/>", {
        appendTo: "body",
        id: "tooltip",
        css: {
          position: "absolute",
          display: "none",
          zIndex: 99999,
          maxWidth: 160,
          padding: "6px 10px",
          background: "rgba(2, 139, 208, 1)",
          "font-weight": 500,
          color: "#fff",
          "text-transform": "uppercase",
          "font-size": "10px",
          "border-radius": "4px",
        },
      });

    $(document).mousemove(function (ev) {
      if (!moveTooltip) return;
      $tooltip.css({
        top: ev.pageY + 35,
        left: ev.pageX - 42,
      });
    });

    $.fn.tooltip = function () {
      $(this).find("a").removeAttr("href");
      return this.each(function () {
        $(this).hover(
          function () {
            moveTooltip = true;
            $tooltip.html($(this).data("tooltip")).fadeTo(300, 1);
          },
          function () {
            moveTooltip = false;
            $tooltip.hide();
          },
        );
      });
    };
  })(jQuery);

  // Open Mobile Menu
  function ModalMenu(elem) {
    let count_clone = 0;
    $(elem).on("click", function () {
      $("body").css({overflow: "hidden"});
      $(".head-menu").addClass("open");
      if (count_clone < 1) {
        $(".head-menu__mobile").clone().appendTo(".head-menu");
        count_clone++;
      }

      $(".head-menu.open").find("#menuToggle").addClass("modal-close");
      // Close Modal
      $(".head-menu__mobile #menuToggle.modal-close").on("click", function () {
        $(".head-menu").removeClass("open");
        $(".head-menu__mobile #menuToggle").removeClass("modal-close");
        $("body").removeAttr("style");
      });
    });
  }

  function FirstScreen(elem) {
    let header_height = client_width > 992 ? $(".head-menu .order-1").outerHeight() : $(".head-menu__mobile").outerHeight(),
      isFirstScreenVisible = $(".js-first-screen").is(":visible"),
      background = $(".js-first-screen").hasClass(".js-background");

    if (isFirstScreenVisible && background) {
      $(elem).css({
        "margin-top": -header_height,
        "padding-top": header_height,
      });
      $(".head-menu .order-1").css({
        background: "transparent",
      });
      $(".head-menu__mobile").css({
        background: "transparent",
      });
    }
  }

  function AnimationNav(elem) {
    var navBar = $(elem); //Targets nav element
    var myWindow = $(window);
    var myPosition;
    var navScroll;
    var MenuHeight = $(".head-menu").outerHeight();
    isFirstScreenVisible = $(".js-menu-smoth").is(":visible");
    outlineHeight = isFirstScreenVisible ? $(".js-menu-smoth").outerHeight() : 600;

    $(".head-menu").css({height: MenuHeight});

    window.addEventListener("scroll", function (e) {
      navScroll = myWindow.scrollTop();

      if (navScroll > 100) {
        navBar.addClass("fixed");
        // Hover Menu Animation
        $(".head-menu .main-menu .menu ul li").hover(
          function () {
            $(this).find(".hs-menu-children-wrapper").slideDown();
          },
          function () {
            $(this).find(".hs-menu-children-wrapper").slideUp();
          },
        );

        $(".hs-menu-children-wrapper").hide();
      } else {
        navBar.removeClass("fixed");
      }

      if (navScroll < myPosition && navScroll > outlineHeight + 46) {
        setTimeout(function () {
          navBar.css({top: 0});
        }, 100);
        // navBar.addClass('visible')
      } else {
        navBar.css({top: -100});
      }
      myPosition = myWindow.scrollTop();
      if (myPosition <= outlineHeight + 46) {
        //hide  zone
        navBar.css({top: -100});
        setTimeout(function () {
          navBar.removeClass("visible");
        }, 1000);
      }
    });
  }

  // Animation Menu
  AnimationNav(".order-1");

  //First Screen
  FirstScreen(".js-first-screen");

  // Modal Menu
  ModalMenu(".head-menu__mobile #menuToggle");

  // Coming Soon
  $(".head-menu .main-menu .menu ul li.hs-menu-depth-1:nth-child(3)").attr("data-tooltip", "Coming Soon").tooltip().addClass("tooltip-default");
  $(".head-menu .main-menu .menu ul li.hs-menu-depth-1:nth-child(4)").attr("data-tooltip", "Coming Soon").tooltip().addClass("tooltip-default");

  // Menu Border
  MenuBorder(".head-menu .main-menu .menu");
});

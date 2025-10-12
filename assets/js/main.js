/*
	Arcana by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			wide:      [ '1281px',  '1680px' ],
			normal:    [ '981px',   '1280px' ],
			narrow:    [ '841px',   '980px'  ],
			narrower:  [ '737px',   '840px'  ],
			mobile:    [ '481px',   '736px'  ],
			mobilep:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			offsetY: -15,
			hoverDelay: 0,
			alignment: 'center'
		});

	// Nav.

		// Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

})(jQuery);

(function() {
	function waitForElement(selector, callback) {
	  const el = document.getElementById(selector);
	  if (el) return callback(el);
  
	  const observer = new MutationObserver((mutations, obs) => {
		const el = document.getElementById(selector);
		if (el) {
		  callback(el);
		  obs.disconnect();
		}
	  });
  
	  observer.observe(document.body, { childList: true, subtree: true });
	}
  
	waitForElement("nav", () => {
	  const route = window.location.pathname.split("/")[3] ?? "";
	  const navIdMap = {
		"": "home-nav",
		"player_page": "player-page-nav",
		"new-objectives": "new-objectives-nav",
		"objectives": "objectives-nav",
		"spectator_page": "spectator-nav",
		"setup": "setup-nav"
	  };
	  const navId = navIdMap[route];
	  if (navId) {
		document.getElementById(navId)?.classList.add("current");
		document.getElementById("home-nav")?.classList.remove("current");
	}
	});
})();
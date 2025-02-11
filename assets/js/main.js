/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

})(jQuery);



// Top bar
document.addEventListener("DOMContentLoaded", function () {
    const profile = document.querySelector(".profile");
    const profileDropdown = document.querySelector(".profile-dropdown");
    const settingsBtn = document.querySelector(".settings");

    // Abrir/Fechar dropdown do perfil
    profile.addEventListener("click", function (event) {
        event.stopPropagation();
        profileDropdown.classList.toggle("active");
    });

    // Redireciona para a página de configurações ao clicar
    settingsBtn.addEventListener("click", function () {
        window.location.href = "configuracoes.html";
    });

    // Fechar menu ao clicar fora
    document.addEventListener("click", function (event) {
        if (!profile.contains(event.target)) {
            profileDropdown.classList.remove("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const alunoId = 1;
    const notificationBadge = document.querySelector(".notification .badge");
    const profileImg = document.querySelector(".profile img");
    const messagesList = document.querySelector(".messages-list");
    const noMessagesText = document.querySelector(".no-messages");

    function atualizarNotificacoes() {
        fetch(`/api/aluno/${alunoId}`)
            .then(response => response.json())
            .then(data => {
                // Atualiza o número da notificação
                notificationBadge.textContent = data.totalMensagens;
                
                // Atualiza a foto do aluno
                profileImg.src = data.foto;

                // Se houver mensagens, exibir na caixa
                if (data.totalMensagens > 0) {
                    noMessagesText.style.display = "none";
                    messagesList.innerHTML = "";

                    fetch(`/api/mensagens/${alunoId}`)
                        .then(response => response.json())
                        .then(mensagens => {
                            mensagens.forEach(msg => {
                                let li = document.createElement("li");
                                li.textContent = `${msg.remetente}: ${msg.conteudo}`;
                                messagesList.appendChild(li);
                            });
                        });
                } else {
                    noMessagesText.style.display = "block";
                }
            })
            .catch(error => console.error("Erro ao buscar notificações:", error));
    }

    setInterval(atualizarNotificacoes, 10000);
    atualizarNotificacoes();
});

document.addEventListener("DOMContentLoaded", function () {
    const alunoId = 1; // Pegue esse ID do login do aluno
    const notificationBadge = document.querySelector(".notification .badge");
    const profileImg = document.querySelector(".profile img");

    function atualizarNotificacoes() {
        fetch(`/api/aluno/${alunoId}`)
            .then(response => response.json())
            .then(data => {
                // Atualiza o número da notificação
                notificationBadge.textContent = data.totalMensagens;
                
                // Atualiza a foto do aluno
                profileImg.src = data.foto;
            })
            .catch(error => console.error("Erro ao buscar notificações:", error));
    }

    // Atualiza notificações a cada 10 segundos
    setInterval(atualizarNotificacoes, 10000);

    // Atualiza imediatamente ao carregar a página
    atualizarNotificacoes();
});

document.addEventListener("DOMContentLoaded", function () {
    const notificationIcon = document.getElementById("notification-icon");
    const notificationBox = document.getElementById("notification-box");

    // Abre a caixa ao clicar no sino
    notificationIcon.addEventListener("click", function (event) {
        notificationBox.style.display = notificationBox.style.display === "block" ? "none" : "block";
        event.stopPropagation(); // Evita que o clique no sino feche a caixa imediatamente
    });

    // Fecha a caixa ao clicar fora dela
    document.addEventListener("click", function (event) {
        if (!notificationBox.contains(event.target) && event.target !== notificationIcon) {
            notificationBox.style.display = "none";
        }
    });
});

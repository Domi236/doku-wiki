// ================================
// Theme Options
// ================================
if (typeof themeConfig == "undefined") {
  themeConfig = {};
}

var ghosthunter_key = themeConfig.ghostSearchKey;

// ================================
// JavaScript Check
// ================================
document.body.classList.add('js-loading');

function showPage() {
  document.body.classList.remove('js-loading');
}
window.addEventListener('load', showPage);

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

$(document).ready(function() {

  tippy('.tippy', {
    arrow: true
  });

  if (typeof themeConfig.showPublishedWith !== 'undefined' && themeConfig.showPublishedWith == false) {
    $('.published-with').remove();
  }

  // ================================
  // Mobile Nav
  // ================================
  $('.sidebar-nav > ul > li > a > .toggle').click(function(e) {
    e.preventDefault();

    $(this).parent().parent().toggleClass('active');

    return false;
  })

  $('.toggle-sidebar-nav').click(function() {
    $('.sidebar .sidebar-inner').toggle();
  });

  $('.toggle-search').click(function() {
    $('.nav').toggle();
    $('.search').toggle();
  });

  // ================================
  // Dark Mode Toggle
  // ================================
  if (typeof themeConfig.showDarkModeSwitch !== 'undefined' && themeConfig.showDarkModeSwitch == true) {
    $('.site-nav .nav')
      .append('<li class="nav-dark-mode" role="menuitem"><a href="javascript:;"><i class="fas fa-adjust"></i></a></li>')
      .on('click', '.nav-dark-mode', function() {
        $('body').toggleClass('dark-mode');

        if($('body').hasClass('dark-mode')) {
          window.localStorage.setItem('theme', 'dark');
        } else {
          window.localStorage.removeItem('theme');
        }
      });
  }

  // ================================
  // Post Comments
  // ================================
  function disqusComments(username) {
    var d = document, s = d.createElement('script');
    s.src = 'https://' + username + '.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
    $('.post-full-comments').show();
  }

  if (typeof themeConfig.disqusUsername !== 'undefined' && themeConfig.disqusUsername != '' && $('body').hasClass('post-template')) {
    disqusComments(themeConfig.disqusUsername);
  }

  // ================================
  // GibHub Badge
  // ================================
  if (typeof themeConfig.githubURL !== 'undefined' && themeConfig.githubURL != '') {
    $('.github-corner').each(function() {
      $(this).attr('href', themeConfig.githubURL).show();
    });
  }

  // ================================
  // Search
  // ================================
  var searchHint = '';
  if (typeof themeConfig.searchHint !== 'undefined' && themeConfig.searchHint != '') {
    $('.search-input').attr('placeholder', themeConfig.searchHint);
  }

  var includeBodyInSearch = true;
  if (typeof themeConfig.includeBodyInSearch !== 'undefined' && themeConfig.includeBodyInSearch != '' && typeof themeConfig.includeBodyInSearch === "boolean") {
    includeBodyInSearch = themeConfig.includeBodyInSearch;
  }

  var searchField = $('.search-input').ghostHunter({
    results: '.search-results',
    onKeyUp: true,
    displaySearchInfo: false,
    includebodysearch: includeBodyInSearch,
    result_template: "<a id='gh-{{ref}}' class='gh-search-item' href='{{link}}'><h2>{{title}}</h2><p>{{description}}</p></a>",
    onComplete: function(results) {
      $('.search-results').fadeIn();
    }
  });

  $(document).keyup(function(e) {
    if (e.keyCode === 27) {
      searchField.clear();
      $('.search-input').val('').blur();
      $('.search-results').fadeOut();
    }
  });

  // ================================
  // Image zooms
  // ================================
  $('.post-content img').attr('data-zoomable', 'true');

  // If the image is inside a link, remove zoom
  $('.post-content a img').removeAttr('data-zoomable');

  var background = '#ffffff';
  if ($('body').hasClass('dark-theme')) {
    background = '#222327';
  }

  mediumZoom('[data-zoomable]', {
    background: background
  });

  // ================================
  // Responsive video embeds
  // ================================
  var postContent = $(".post-content");
  postContent.fitVids({
    'customSelector': [
      'iframe[src*="ted.com"]',
      'iframe[src*="player.twitch.tv"]',
      'iframe[src*="dailymotion.com"]',
      'iframe[src*="facebook.com"]'
    ]
  });

  // ================================
  // Image gallery
  // ================================
  var images = document.querySelectorAll('.kg-gallery-image img');
  images.forEach(function (image) {
    var container = image.closest('.kg-gallery-image');
    var width = image.attributes.width.value;
    var height = image.attributes.height.value;
    var ratio = width / height;
    container.style.flex = ratio + ' 1 0%';
  });

  // ================================
  // Clipboard URL Copy
  // ================================
  var url = document.location.href;

  var clipboard = new ClipboardJS('.js-share__link--clipboard', {
    text: function() {
      return url;
    }
  });

  $('.print-page').click(function() {
    window.print();
  });

});

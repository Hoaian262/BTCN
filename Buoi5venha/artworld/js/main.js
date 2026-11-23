/* =====================================================
   MAIN.JS - ART WORLD
   Phụ thuộc: jQuery, Bootstrap JS, bootstrap-star-rating, xZoom (trang chi tiết)
   ===================================================== */
(function ($) {
  'use strict';

  var PLACEHOLDER = 'images/placeholder.svg';

  /* ---------- Ảnh chưa có file thì hiện ảnh placeholder ---------- */
  function useFallback(img) {
    if (img.getAttribute('data-fb')) { return; }   // logo tự xử lý riêng (data-fb)
    img.setAttribute('data-fb', '1');
    img.src = PLACEHOLDER;
  }
  document.addEventListener('error', function (e) {
    if (e.target && e.target.tagName === 'IMG') { useFallback(e.target); }
  }, true);

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }
  function pad(n) { return (n < 10 ? '0' : '') + n; }

  function parsePrice(value) {
    return Number(value.replace(/[^0-9]/g, ''));
  }

  function getDiscount(product) {
    var price = parsePrice(product.price);
    var oldPrice = parsePrice(product.oldPrice);
    return price > 0 && oldPrice > price ? Math.round(100 * (oldPrice - price) / oldPrice) : 0;
  }

  function renderPrice($price, product) {
    $price.text(product.price);
    if (getDiscount(product)) { $price.append($('<del>').text(product.oldPrice)); }
  }

  function renderBadges($imageBox, product) {
    $imageBox.children('.badge-discount, .badge-tag').remove();
    var discount = getDiscount(product);
    if (discount) {
      $imageBox.prepend($('<span class="badge-discount">').text('-' + discount + '%'));
    }
    if (product.badge) {
      $imageBox.prepend($('<span class="badge-tag">')
        .toggleClass('best-seller', product.badge === 'Best Seller').text(product.badge));
    }
  }

  function initProducts() {
    var products = window.ARTWORLD_PRODUCTS;
    if (!products || !products.length) { return; }

    var byId = Object.create(null);
    products.forEach(function (product) {
      byId[product.id] = product;
      if (product.oldPrice.trim() && parsePrice(product.oldPrice) <= parsePrice(product.price)) {
        console.warn('ART WORLD: giá gốc phải cao hơn giá bán (' + product.id + ').');
      }
    });

    $('.product[data-product-id]').each(function () {
      var $card = $(this);
      var product = byId[$card.attr('data-product-id')];
      if (!product) { return; }

      var $imageBox = $card.find('.pc-img');
      var $imageLink = $imageBox.children('a').has('img');
      var $name = $card.find('.pc-name a').text(product.name);
      var detailUrl = 'ecommerce-detail.html?id=' + encodeURIComponent(product.id);
      $imageLink.add($name).attr('href', detailUrl);
      $card.find('.ratings a[href$="#comments"]').attr('href', detailUrl + '#comments');
      $imageLink.children('img').removeAttr('data-fb')
        .attr({ src: product.images[0] || PLACEHOLDER, alt: product.name });
      $card.attr('data-cat', product.category).find('.pc-series').text(product.series);
      renderPrice($card.find('.pc-price'), product);
      renderBadges($imageBox, product);
      renderSales($card, product);
      var reviews = readReviews(product).concat(product.reviews);
      $card.find('.ratings a').text(reviews.length + ' đánh giá');
      setRating($card.find('.rating-display'), averageRating(reviews));
    });

    $('[data-order-product-id]').each(function () {
      var product = byId[this.getAttribute('data-order-product-id')];
      if (product) {
        $(this).text(product.name).closest('.order-row').find('img').removeAttr('data-fb')
          .attr({ src: product.images[0] || PLACEHOLDER, alt: product.name });
      }
    });

    var $detail = $('.detail-box');
    if (!$detail.length) { return; }

    var id = getParam('id');
    var product = byId[id] || products[0];
    var versions = product.versions && product.versions.length
      ? product.versions : ['[Phiên bản A]', '[Phiên bản B]'];
    var $version = $('#product-version');
    versions.forEach(function (version) {
      $version.append($('<option>').val(version).text(version));
    });
    if (product.blindBoxSetSize) {
      $('#set-size').text('Trọn bộ (' + product.blindBoxSetSize + ' hộp)');
    }
    if (product.stockProgress === 100) {
      $('#detail-add-to-cart').prop('disabled', true).text('Hết hàng');
    }
    var images = product.images.length ? product.images : [PLACEHOLDER];
    var $thumbs = $detail.find('.xzoom-thumbs').empty();
    images.forEach(function (src, index) {
      var $image = $('<img class="xzoom-gallery">')
        .attr({ src: src, xpreview: src, alt: product.name + ' · ' + (index + 1) });
      $thumbs.append($('<a>').attr('href', src).append($image));
    });
    $detail.find('#xzoom-main').removeAttr('data-fb')
      .attr({ src: images[0], xoriginal: images[0], alt: product.name });
    $detail.find('.detail-title').text(product.name);
    renderPrice($detail.find('.detail-price'), product);
    renderBadges($detail.find('.xzoom-main-box'), product);
    renderSales($detail, product);
    initReview(product);
    $detail.find('.detail-summary').text(product.shortDescription).toggle(!!product.shortDescription);
    $detail.find('.description').toggle(!!product.description).find('p').text(product.description);

    document.title = product.name + ' - ART WORLD';
    $('.breadcrumb > li').eq(1).children('a')
      .attr('href', 'ecommerce.html?cat=' + encodeURIComponent(product.category)).text(product.series);
    $('.breadcrumb > .active').text(product.name);
    $('.list-group-item[data-cat]').each(function () {
      $(this).toggleClass('active', $(this).attr('data-cat') === product.category);
    });
  }

  function renderSales($product, product) {
    var label = product.sold.toLocaleString('vi-VN') + ' sản phẩm đã bán';
    var $progress = $product.find('.stock-wrap .progress');
    var percent = product.stockProgress;
    var soldOut = percent === 100;
    var lowStock = percent >= 80 && !soldOut;
    var $bar = $progress.children('.progress-bar').empty()
      .toggleClass('stock-normal', !lowStock && !soldOut)
      .toggleClass('stock-hot', lowStock)
      .toggleClass('stock-sold-out', soldOut)
      .css('width', percent + '%').attr('aria-valuenow', percent);
    if (soldOut) {
      label = 'Đã bán hết';
      $bar.text(label);
    } else if (lowStock) {
      label = 'Sắp bán hết';
      $bar.append($('<span class="glyphicon glyphicon-fire" aria-hidden="true">'), ' ' + label);
    } else {
      $progress.append($('<span class="sales-count" aria-hidden="true">').text(label));
    }
    $bar.attr('aria-label', label);
  }

  function averageRating(reviews) {
    return reviews.length ? reviews.reduce(function (sum, review) {
      return sum + review.rating;
    }, 0) / reviews.length : 0;
  }

  function setRating($input, value) {
    if ($input.data('rating')) {
      $input.rating('update', value);
      return;
    }
    $input.val(value).rating({
      displayOnly: true, showCaption: false, showClear: false, size: 'xs',
      step: 0.5, min: 0, max: 5, stars: 5, animate: false
    });
  }

  /* ---------- Đồng hồ đếm ngược (thanh kho) ---------- */
  function initCountdown() {
    var $els = $('.countdown');
    $els.each(function () {
      $(this).data('end', Date.now() + (parseInt($(this).attr('data-seconds'), 10) || 0) * 1000);
    });
    function tick() {
      $els.each(function () {
        var left = Math.max(0, Math.floor(($(this).data('end') - Date.now()) / 1000));
        var d = Math.floor(left / 86400), h = Math.floor(left % 86400 / 3600),
            m = Math.floor(left % 3600 / 60), s = left % 60;
        $(this).text(d + ' ngày ' + pad(h) + ':' + pad(m) + ':' + pad(s));
      });
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- Lọc sản phẩm theo danh mục (trang chủ) ---------- */
  function initCategoryFilter() {
    var $list = $('#product-list');
    if (!$list.length) { return; }
    var $links = $('#category-list a');

    // số lượng sản phẩm trên từng danh mục
    $links.each(function () {
      var slug = $(this).attr('data-cat');
      var n = slug === 'all' ? $list.find('.product').length : $list.find('.product[data-cat="' + slug + '"]').length;
      $(this).find('.badge').text(n);
    });

    function apply(slug) {
      if (!$links.filter(function () { return this.getAttribute('data-cat') === slug; }).length) {
        slug = 'all';
      }
      var $items = $list.find('.product');
      if (slug === 'all') { $items.show(); } else { $items.hide().filter('[data-cat="' + slug + '"]').show(); }
      $links.removeClass('active').filter('[data-cat="' + slug + '"]').addClass('active');
      $('#list-title').text($links.filter('.active').attr('data-name') || 'Tất cả sản phẩm');
    }

    $links.on('click', function (e) { e.preventDefault(); apply($(this).attr('data-cat')); });
    apply(getParam('cat'));
  }

  /* ---------- xZoom: ảnh nào chưa có file thì dùng placeholder rồi mới khởi tạo ---------- */
  function initZoom() {
    var $z = $('.xzoom, .xzoom-gallery');
    if (!$z.length) { return; }
    var $links = $('.xzoom-thumbs a');
    var paths = {};
    $z.each(function () {
      var el = this;
      $.each(['src', 'xoriginal', 'xpreview'], function (i, a) {
        var v = $(el).attr(a);
        if (v) { paths[v] = 1; }
      });
    });
    $links.each(function () { paths[$(this).attr('href')] = 1; });

    var list = $.map(paths, function (v, k) { return k; });
    var bad = {}, pending = list.length;

    function run() {
      $z.each(function () {
        var el = this;
        $.each(['src', 'xoriginal', 'xpreview'], function (i, a) {
          var v = $(el).attr(a);
          if (v && bad[v]) { $(el).attr(a, PLACEHOLDER); }
        });
      });
      $links.each(function () { if (bad[$(this).attr('href')]) { $(this).attr('href', PLACEHOLDER); } });
      $z.xzoom({ zoomWidth: 420, zoomHeight: 420, title: false, tint: '#333', Xoffset: 15, adaptive: true });
    }
    function done() { pending -= 1; if (pending === 0) { run(); } }

    $.each(list, function (i, p) {
      var im = new Image();
      im.onload = done;
      im.onerror = function () { bad[p] = true; done(); };
      im.src = p;
    });
  }

  /* ---------- Form chi tiết: số lượng và Size ---------- */
  function initDetailForm() {
    var $qty = $('#number');
    $('.qty-minus').on('click', function () { $qty.val(Math.max(1, (parseInt($qty.val(), 10) || 1) - 1)); });
    $('.qty-plus').on('click', function () { $qty.val((parseInt($qty.val(), 10) || 1) + 1); });
    $('.size-group').on('click', '.btn', function () {
      $(this).addClass('active').attr('aria-pressed', 'true')
        .siblings('.btn').removeClass('active').attr('aria-pressed', 'false');
    });
    $('#detail-form').on('submit', function (e) { e.preventDefault(); });
  }

  function readReviews(product) {
    try {
      var reviews = JSON.parse(localStorage.getItem('artworld-reviews-' + product.id));
      return Array.isArray(reviews) ? reviews : [];
    } catch (error) {
      return [];
    }
  }

  function initReview(product) {
    var submitted = readReviews(product);
    var $list = $('#comments-list');
    var $form = $('#review-form');
    var $reviewRating = $('#review-rating');
    $('#reviewModal').one('shown.bs.modal', function () {
      $reviewRating.rating({ showClear: false, showCaption: false, step: 1, size: 'md', min: 0, max: 5, animate: false });
    });

    function renderReviews() {
      var reviews = submitted.concat(product.reviews);
      $list.empty();
      reviews.forEach(function (review, index) {
        var $item = $('<article class="review-item">');
        var $rating = $('<input type="text" class="rating-display" aria-label="Điểm đánh giá">');
        $item.append($('<strong>').text(review.name), $rating);
        if (index >= submitted.length) {
          $item.append($('<small class="review-sample">').text('Đánh giá mẫu'));
        }
        $list.append($item.append($('<p>').text(review.text)));
        setRating($rating, review.rating);
      });
      $('#review-count').text(reviews.length + ' đánh giá');
      var average = averageRating(reviews);
      setRating($('#comments .rating-display'), average);
      $('#review-average').text(average.toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + '/5');
      $('.product[data-product-id="' + product.id + '"]').each(function () {
        $(this).find('.ratings a').text(reviews.length + ' đánh giá');
        setRating($(this).find('.rating-display'), average);
      });
    }

    renderReviews();
    $form.on('submit', function (event) {
      event.preventDefault();
      var rating = Number($reviewRating.val());
      var text = $.trim($('#review-text').val());
      var valid = Number.isInteger(rating) && rating >= 1 && rating <= 5 && !!text;
      $('#review-error').toggleClass('hidden', valid);
      if (!valid) { return; }

      submitted.unshift({ name: $.trim($('#review-name').val()) || 'Khách', rating: rating, text: text });
      try {
        localStorage.setItem('artworld-reviews-' + product.id, JSON.stringify(submitted));
      } catch (error) {
        // Khi trình duyệt chặn bộ nhớ cục bộ, vẫn hiện đánh giá trên trang hiện tại.
      }
      renderReviews();
      this.reset();
      $reviewRating.rating('reset');
      $('#reviewModal').modal('hide');
    });
  }

  function initCharacterMenu() {
    $('.pm-menu .dropdown').each(function () {
      var $menu = $(this);
      var $toggle = $menu.children('[data-toggle="dropdown"]');
      var openedByMouse = false;

      this.addEventListener('pointerenter', function (event) {
        if (event.pointerType !== 'mouse' || $menu.hasClass('open')) { return; }
        openedByMouse = true;
        $menu.addClass('open');
        $toggle.attr('aria-expanded', 'true');
      });

      this.addEventListener('pointerleave', function (event) {
        if (event.pointerType !== 'mouse' || !openedByMouse) { return; }
        openedByMouse = false;
        if ($menu.find('.dropdown-menu :focus').length) { return; }
        $menu.removeClass('open');
        $toggle.attr('aria-expanded', 'false');
      });

      $menu.on('hidden.bs.dropdown', function () { openedByMouse = false; });
    });
  }

  $(function () {
    initProducts();
    initCharacterMenu();
    // ảnh đã lỗi trước khi script chạy
    $('img').each(function () {
      if (this.complete && this.naturalWidth === 0 && this.getAttribute('src')) { useFallback(this); }
    });

    $('#signin-form').on('submit', function (e) { e.preventDefault(); $('#myModal').modal('hide'); });
    $('[data-toggle="tooltip"]').tooltip();
    $('.add-to-cart a, .pm-right a[href="#"]').on('click', function (e) { e.preventDefault(); });

    initCountdown();
    initCategoryFilter();
    initDetailForm();
    initZoom();
  });

})(jQuery);

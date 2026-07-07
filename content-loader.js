/* ════════════════════════════════════════════════════════════════
   GK Associates — Content Loader  v2.0
   ─────────────────────────────────────────────────────────────
   Reads  site_content/data.json  and injects ALL site content.

   Scalar values  →  add  data-key="some.dot.path"  to any element.
   Array sections →  empty containers with specific IDs are filled
                     automatically (see section IDs below).

   Requires HTTP server (Live Server). Does NOT work over file://.
════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Resolve "a.b.c" dot-path against an object ───────────── */
  function resolve(obj, path) {
    return path.split('.').reduce(function (o, k) {
      return (o != null && o[k] !== undefined) ? o[k] : null;
    }, obj);
  }

  /* ── Render an array into a container by ID ──────────────── */
  function render(id, arr, fn) {
    var el = document.getElementById(id);
    if (el && Array.isArray(arr) && arr.length) {
      el.innerHTML = fn(arr);
    }
  }

  /* ══════════════════════════════════════════════════════════
     CARD / ITEM BUILDERS
  ══════════════════════════════════════════════════════════ */

  /* Hero trust panel  →  #home-trust-items  (ul) */
  function trustItem(item) {
    return '<li class="glass-item">' +
      '<span class="glass-dot">\u2713</span>' +
      '<div>' +
        '<p class="font-serif text-white text-[0.95rem] font-semibold">' + item.title + '</p>' +
        '<p class="text-brand-muted text-xs mt-0.5 leading-relaxed">' + item.desc + '</p>' +
      '</div></li>';
  }

  /* Dark panel rows (core commitments / defines-us)
     →  #home-core-commitments  |  #about-defines-us */
  function darkPanelRows(items) {
    return items.map(function (item, i) {
      var cls = i === 0                  ? 'pb-7 border-b border-white/10'
              : i === items.length - 1   ? 'pt-7'
              :                            'py-7 border-b border-white/10';
      return '<div class="' + cls + '">' +
        '<p class="font-serif text-white text-lg font-semibold mb-1.5">' + item.title + '</p>' +
        '<p class="text-brand-muted text-sm leading-relaxed">' + item.desc + '</p>' +
        '</div>';
    }).join('');
  }

  /* Services summary cards  →  #home-services */
  function serviceSummaryCard(svc) {
    return '<div class="svc-card">' +
      '<div class="flex items-center justify-between mb-7">' +
        '<span class="font-serif text-[2.5rem] font-bold leading-none ' +
               'text-brand-accent/15 transition-colors duration-300">' + svc.number + '</span>' +
        '<div class="w-8 h-px bg-brand-accent"></div>' +
      '</div>' +
      '<h3 class="font-serif text-[1.05rem] font-semibold text-brand-dark mb-1">' + svc.title + '</h3>' +
      '<p class="font-sans text-[0.68rem] uppercase tracking-wide text-brand-muted mb-3">' + svc.subtitle + '</p>' +
      '<p class="sec-body text-sm">' + svc.summary + '</p>' +
      '</div>';
  }

  /* Core values cards  →  #about-core-values */
  function coreValueCard(val) {
    return '<div class="val-card">' +
      '<div class="w-8 h-px bg-brand-accent mb-7"></div>' +
      '<span class="block font-serif text-[3.5rem] font-bold text-brand-accent/10 ' +
             'leading-none mb-4 select-none">' + val.letter + '</span>' +
      '<h3 class="font-serif text-xl font-semibold text-brand-dark mb-3">' + val.title + '</h3>' +
      '<p class="sec-body text-sm">' + val.desc + '</p>' +
      '</div>';
  }

  /* Why-choose-us items — glass cards on navy panels
     →  #home-why-items  |  #about-why-items */
  function whyItemDark(item) {
    return '<div class="glass-panel p-5">' +
      '<h4 class="font-serif text-white text-[0.95rem] font-semibold mb-2">' + item.title + '</h4>' +
      '<p class="text-brand-muted text-sm leading-relaxed">' + item.desc + '</p>' +
      '</div>';
  }

  /* Service detail cards  →  #services-list */
  function serviceDetailCard(svc) {
    var items = (svc.items || []).map(function (item) {
      return '<li><span class="tick">\u2713</span>' + item + '</li>';
    }).join('');
    return '<div class="svc-detail grid md:grid-cols-3">' +
      '<div class="bg-brand-dark p-8 flex flex-col justify-between relative">' +
        '<div class="absolute inset-y-0 left-0 w-1 bg-brand-accent"></div>' +
        '<div>' +
          '<p class="font-serif text-[3.5rem] font-bold text-white/10 leading-none mb-4 select-none">' + svc.number + '</p>' +
          '<h3 class="font-serif text-xl font-semibold text-white mb-1">' + svc.title + '</h3>' +
          '<p class="font-sans text-[0.65rem] tracking-widest uppercase text-brand-accent mt-1">' + svc.subtitle + '</p>' +
        '</div>' +
        '<div class="w-8 h-px bg-brand-accent mt-8"></div>' +
      '</div>' +
      '<div class="md:col-span-2 p-8 md:p-10">' +
        '<p class="sec-body mb-6">' + svc.detail + '</p>' +
        '<ul class="chk-list">' + items + '</ul>' +
      '</div>' +
      '</div>';
  }

  /* Founder expertise tags  →  #founder-expertise */
  function founderExpertiseTag(t) {
    return '<span class="exp-tag">' + t + '</span>';
  }

  /* Founder qualification tiles  →  #founder-qualifications */
  function founderQualCard(q) {
    return '<div class="border-l-2 border-brand-accent pl-5 py-1">' +
      '<p class="font-serif text-[0.95rem] font-semibold text-brand-dark">' + q.title + '</p>' +
      '<p class="text-brand-muted text-xs mt-0.5">' + q.subtitle + '</p>' +
      '</div>';
  }

  /* Team member cards  →  #team-list */
  function teamCard(member) {
    var tags = (member.expertise || []).map(function (t) {
      return '<span class="exp-tag">' + t + '</span>';
    }).join('');
    return '<div class="team-card">' +
      '<div class="avatar">' +
        '<svg class="w-20 h-20 opacity-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.8" stroke="#fff">' +
          '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />' +
        '</svg>' +
      '</div>' +
      '<div class="p-6">' +
        '<h3 class="font-serif text-lg font-semibold text-brand-dark mb-0.5">' + member.name + '</h3>' +
        '<p class="font-sans text-[0.65rem] tracking-widest uppercase text-brand-accent mb-3">' + member.title + '</p>' +
        '<p class="sec-body text-sm mb-5">' + member.bio + '</p>' +
        '<div class="flex flex-wrap gap-2">' + tags + '</div>' +
      '</div>' +
      '</div>';
  }

  /* ══════════════════════════════════════════════════════════
     MAIN INJECT  —  called once data.json is fetched
  ══════════════════════════════════════════════════════════ */
  function applyData(data) {

    /* 1 ── Scalar: fill every element with data-key="dot.path" */
    document.querySelectorAll('[data-key]').forEach(function (el) {
      var val = resolve(data, el.getAttribute('data-key'));
      if (val === null || val === undefined) return;
      if (el.tagName === 'IFRAME') {
        el.setAttribute('src', String(val));
      } else {
        el.innerHTML = val;
      }
    });

    /* 2 ── Arrays: render each section if the container exists */

    /* index.html */
    render('home-trust-items',     data.home       && data.home.trust_items,      function (c) { return c.map(trustItem).join(''); });
    render('home-core-commitments',data.home       && data.home.core_commitments, darkPanelRows);
    render('home-services',        data.services,                                 function (c) { return c.map(serviceSummaryCard).join(''); });
    render('home-why-items',       data.why_choose_us,                            function (c) { return c.map(whyItemDark).join(''); });

    /* about.html */
    render('about-defines-us',     data.about      && data.about.defines_us,      darkPanelRows);
    render('about-core-values',    data.about      && data.about.core_values,      function (c) { return c.map(coreValueCard).join(''); });
    render('about-why-items',      data.why_choose_us,                            function (c) { return c.map(whyItemDark).join(''); });

    /* services.html */
    render('services-list',        data.services,                                 function (c) { return c.map(serviceDetailCard).join(''); });

    /* team.html */
    render('team-list',               data.team,                                                          function (c) { return c.map(teamCard).join(''); });
    render('founder-expertise',       data.team && data.team[0] && data.team[0].expertise,                function (c) { return c.map(founderExpertiseTag).join(''); });
    render('founder-qualifications',  data.team && data.team[0] && data.team[0].qualifications,           function (c) { return c.map(founderQualCard).join(''); });
  }

  /* ── Mobile nav disclosure (keyboard/screen-reader accessible) ──
     Independent of the data.json fetch below — the menu must open
     even if content fails to load. */
  document.querySelectorAll('.mobile-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.getElementById(btn.getAttribute('aria-controls'));
      var isOpen = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!isOpen));
      if (target) target.classList.toggle('is-open');
    });
  });

  /* ── Fetch site_content/data.json ─────────────────────────── */
  fetch('./site_content/data.json')
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(applyData)
    .catch(function (err) {
      console.warn('[GK Associates] content-loader: could not load data.json.', err);
    });

}());

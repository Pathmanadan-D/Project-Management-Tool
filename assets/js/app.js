/**
 * Project Management Tool - Main application script
 * Handles component loading and small interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  loadComponents();
  initMobileSidebar();
});

function loadComponents() {
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  const sidebarPlaceholder = document.getElementById('sidebar-placeholder');

  if (navbarPlaceholder) {
    fetch('components/navbar.html')
      .then(res => res.text())
      .then(html => {
        navbarPlaceholder.innerHTML = html;
        setActiveNavLink();
      })
      .catch(() => {
        navbarPlaceholder.innerHTML = '<nav class="bg-white shadow py-3 px-4">Navbar failed to load</nav>';
      });
  }

  if (sidebarPlaceholder) {
    fetch('components/sidebar.html')
      .then(res => res.text())
      .then(html => {
        sidebarPlaceholder.innerHTML = html;
        setActiveSidebarLink();
      })
      .catch(() => {
        sidebarPlaceholder.innerHTML = '<aside>Sidebar failed to load</aside>';
      });
  }
}

function setActiveNavLink() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav-page]').forEach(el => {
    if (el.getAttribute('data-nav-page') === current) {
      el.classList.add('font-semibold', 'text-indigo-600');
    }
  });
}

function setActiveSidebarLink() {
  const current = window.location.pathname.split('/').pop() || 'dashboard.html';
  document.querySelectorAll('[data-sidebar-page]').forEach(el => {
    if (el.getAttribute('data-sidebar-page') === current) {
      el.classList.add('bg-indigo-50', 'text-indigo-700', 'border-indigo-200');
      el.classList.remove('text-slate-600', 'border-transparent');
    }
  });
}

function initMobileSidebar() {
  const toggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  if (toggle && sidebar) {
    toggle.addEventListener('click', () => {
      sidebar.classList.toggle('-translate-x-full');
      if (overlay) overlay.classList.toggle('hidden');
    });
  }
  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.add('-translate-x-full');
      overlay.classList.add('hidden');
    });
  }
}

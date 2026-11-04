/**
 * ANUBHUTI GROUP OF COMPANIES - MASTER LUXURY JAVASCRIPT
 * Brand: Anubhuti Construction | Anubhuti Realtor | Anubhuti Interiors
 * Author: Senior Full-Stack Developer & UI/UX Designer
 * Version: 2.0.0 (Ultra-Smooth Animation & Luxury Glassmorphism Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. SCROLL PROGRESS BAR & CIRCULAR BACK TO TOP
  // =========================================================================
  const scrollProgressLine = document.querySelector('.scroll-progress-line');
  const siteHeader = document.querySelector('.site-header');
  const backToTopBtn = document.querySelector('.btn-back-to-top');
  const progressCircle = backToTopBtn ? backToTopBtn.querySelector('circle') : null;
  const circleCircumference = 157; // 2 * PI * 25

  const updateScrollEffects = () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollPos / docHeight : 0;

    // 1. Top reading bar
    if (scrollProgressLine) {
      scrollProgressLine.style.transform = `scaleX(${progress})`;
    }

    // 2. Sticky header
    if (siteHeader) {
      if (scrollPos > 35) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // 3. Back to top button & circular SVG stroke
    if (backToTopBtn) {
      if (scrollPos > 380) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      if (progressCircle) {
        const offset = circleCircumference - (progress * circleCircumference);
        progressCircle.style.strokeDashoffset = Math.max(0, offset);
      }
    }
  };

  window.addEventListener('scroll', updateScrollEffects, { passive: true });
  updateScrollEffects(); // Initial check

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 2. BUTTERY SMOOTH SCROLL REVEAL (INTERSECTION OBSERVER)
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once animated, keep it visible
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.12
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if observer not available
    revealElements.forEach(el => el.classList.add('active'));
  }

  // =========================================================================
  // 3. BUTTON CLICK RIPPLE EFFECT
  // =========================================================================
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const circle = document.createElement('span');
      circle.classList.add('ripple');
      const rect = this.getBoundingClientRect();
      const diameter = Math.max(rect.width, rect.height);
      const radius = diameter / 2;

      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;

      const existingRipple = this.querySelector('.ripple');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // =========================================================================
  // 6. MOBILE NAVIGATION DRAWER
  // =========================================================================
  const navToggle = document.querySelector('.nav-toggle');
  const mobileNavDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileNavBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  const openMobileNav = () => {
    if (navToggle && mobileNavDrawer && mobileNavBackdrop) {
      navToggle.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      mobileNavDrawer.classList.add('active');
      mobileNavBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeMobileNav = () => {
    if (navToggle && mobileNavDrawer && mobileNavBackdrop) {
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNavDrawer.classList.remove('active');
      mobileNavBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navToggle.classList.contains('open');
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  if (mobileNavBackdrop) {
    mobileNavBackdrop.addEventListener('click', closeMobileNav);
  }

  const drawerCloseBtns = document.querySelectorAll('.mobile-drawer-close');
  drawerCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeMobileNav);
  });

  // Mobile Touch Swipe-to-Close Drawer
  if (mobileNavDrawer) {
    let drawerStartX = 0;
    let drawerCurrentX = 0;

    mobileNavDrawer.addEventListener('touchstart', (e) => {
      drawerStartX = e.touches[0].clientX;
    }, { passive: true });

    mobileNavDrawer.addEventListener('touchmove', (e) => {
      drawerCurrentX = e.touches[0].clientX;
    }, { passive: true });

    mobileNavDrawer.addEventListener('touchend', () => {
      // Swiping to the right (towards screen edge) closes drawer
      if (drawerCurrentX - drawerStartX > 60 && drawerCurrentX > 0) {
        closeMobileNav();
      }
      drawerStartX = 0;
      drawerCurrentX = 0;
    });
  }

  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // Close modals on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileNav();
      closeQuoteModal();
      closeLightboxModal();
    }
  });

  // =========================================================================
  // 7. STATS NUMBER COUNTER (SILKY EASE-OUT QUAD)
  // =========================================================================
  const statNumbers = document.querySelectorAll('.stat-number');

  if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'), 10);
          const duration = 2200; // 2.2 seconds
          const frameDuration = 1000 / 60;
          const totalFrames = Math.round(duration / frameDuration);
          let frame = 0;

          const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // easeOutExpo for ultra smooth landing
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.round(target * easeProgress);

            el.textContent = currentCount.toLocaleString();

            if (frame === totalFrames) {
              clearInterval(counter);
              el.textContent = target.toLocaleString();
            }
          }, frameDuration);

          observer.unobserve(el);
        }
      });
    }, { threshold: 0.35 });

    statNumbers.forEach(num => counterObserver.observe(num));
  }

  // =========================================================================
  // 8. TESTIMONIALS SLIDER (TOUCH & AUTO PLAY)
  // =========================================================================
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (track && slides.length > 0) {
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        dot.setAttribute('aria-label', `Go to testimonial slide ${i + 1}`);
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
          goToSlide(i);
          resetAutoPlay();
        });
        dotsContainer.appendChild(dot);
      });
    }

    const updateSlider = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      const dots = document.querySelectorAll('.slider-dot');
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    };

    const goToSlide = (index) => {
      currentIndex = (index + totalSlides) % totalSlides;
      updateSlider();
    };

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
      });
    }

    const startAutoPlay = () => {
      autoPlayTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5500);
    };

    const resetAutoPlay = () => {
      if (autoPlayTimer) clearInterval(autoPlayTimer);
      startAutoPlay();
    };

    const sliderContainer = document.querySelector('.testimonials-slider');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
      sliderContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        goToSlide(currentIndex + 1);
        resetAutoPlay();
      } else if (touchEndX - touchStartX > 50) {
        goToSlide(currentIndex - 1);
        resetAutoPlay();
      }
    }, { passive: true });

    startAutoPlay();
  }

  // =========================================================================
  // 9. PROJECT FILTER TABS (CONSTRUCTION & INTERIORS)
  // =========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const filterableItems = document.querySelectorAll('[data-category]');

  if (filterButtons.length > 0 && filterableItems.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const selectedCategory = btn.getAttribute('data-filter');

        filterableItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (selectedCategory === 'all' || selectedCategory === itemCat) {
            item.style.display = '';
            item.style.animation = 'fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // =========================================================================
  // 10. REALTOR SEARCH & LIVE FILTER
  // =========================================================================
  const realtorSearchForm = document.querySelector('#realtorSearchForm');
  const propertyCards = document.querySelectorAll('.property-card');
  const propertyResultsCount = document.querySelector('#propertyResultsCount');

  if (realtorSearchForm && propertyCards.length > 0) {
    const filterProperties = (e) => {
      if (e) e.preventDefault();

      const locVal = document.querySelector('#filterLocation')?.value.toLowerCase().trim() || 'all';
      const typeVal = document.querySelector('#filterType')?.value.toLowerCase().trim() || 'all';
      const budgetVal = document.querySelector('#filterBudget')?.value || 'all';
      const purposeVal = document.querySelector('#filterPurpose')?.value.toLowerCase().trim() || 'all';

      let matchCount = 0;

      propertyCards.forEach(card => {
        const cardLoc = (card.getAttribute('data-location') || '').toLowerCase();
        const cardType = (card.getAttribute('data-type') || '').toLowerCase();
        const cardBudget = parseInt(card.getAttribute('data-price') || '0', 10);
        const cardPurpose = (card.getAttribute('data-purpose') || '').toLowerCase();

        const matchLoc = locVal === 'all' || cardLoc.includes(locVal);
        const matchType = typeVal === 'all' || cardType === typeVal;
        const matchPurpose = purposeVal === 'all' || cardPurpose === purposeVal;

        let matchBudget = true;
        if (budgetVal === 'under-1cr') {
          matchBudget = cardBudget < 100;
        } else if (budgetVal === '1cr-3cr') {
          matchBudget = cardBudget >= 100 && cardBudget <= 300;
        } else if (budgetVal === '3cr-10cr') {
          matchBudget = cardBudget > 300 && cardBudget <= 1000;
        } else if (budgetVal === 'above-10cr') {
          matchBudget = cardBudget > 1000;
        }

        if (matchLoc && matchType && matchPurpose && matchBudget) {
          card.style.display = '';
          card.style.animation = 'fadeInUp 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards';
          matchCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (propertyResultsCount) {
        propertyResultsCount.textContent = `Showing ${matchCount} ${matchCount === 1 ? 'property' : 'properties'} matching your search`;
      }
    };

    realtorSearchForm.addEventListener('submit', filterProperties);
    const searchInputs = realtorSearchForm.querySelectorAll('select, input');
    searchInputs.forEach(input => {
      input.addEventListener('change', filterProperties);
    });
  }

  // =========================================================================
  // 11. FAQ ACCORDION (SMOOTH MAX-HEIGHT TRANSITION)
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (questionBtn && answer) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAns = otherItem.querySelector('.faq-answer');
            if (otherAns) otherAns.style.maxHeight = null;
          }
        });

        // Toggle clicked item
        if (isOpen) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answer.scrollHeight + 'px';
        }
      });
    }
  });

  // =========================================================================
  // 12. LIGHTBOX IMAGE PREVIEW MODAL
  // =========================================================================
  const lightboxModal = document.querySelector('#lightboxModal');
  const lightboxImg = document.querySelector('#lightboxImage');
  const lightboxCaption = document.querySelector('#lightboxCaption');
  const lightboxCloseBtn = document.querySelector('#lightboxCloseBtn');

  const openLightbox = (imgSrc, captionText) => {
    if (lightboxModal && lightboxImg) {
      lightboxImg.src = imgSrc;
      if (lightboxCaption) lightboxCaption.textContent = captionText || '';
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightboxModal = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
      if (lightboxImg) lightboxImg.src = '';
    }
  };

  const lightboxTriggers = document.querySelectorAll('[data-lightbox-trigger]');
  lightboxTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const img = el.querySelector('img') || el.closest('.portfolio-item, .project-card')?.querySelector('img');
      const title = el.getAttribute('data-title') || el.querySelector('.portfolio-title, .project-title')?.textContent || 'Project Showcase';
      if (img) {
        openLightbox(img.src, title);
      }
    });
  });

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightboxModal);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightboxModal();
      }
    });
  }

  // =========================================================================
  // 13. GLOBAL "GET A QUOTE" MODAL
  // =========================================================================
  const quoteModal = document.querySelector('#quoteModal');
  const quoteModalOpenBtns = document.querySelectorAll('[data-open-quote-modal]');
  const quoteModalCloseBtn = document.querySelector('#quoteModalCloseBtn');

  const openQuoteModal = (divisionPref) => {
    if (quoteModal) {
      if (divisionPref) {
        const divisionSelect = quoteModal.querySelector('#modalDivisionSelect');
        if (divisionSelect) divisionSelect.value = divisionPref;
      }
      quoteModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        const firstInput = quoteModal.querySelector('input');
        if (firstInput) firstInput.focus();
      }, 120);
    }
  };

  const closeQuoteModal = () => {
    if (quoteModal) {
      quoteModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  quoteModalOpenBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const divPref = btn.getAttribute('data-division') || 'General';
      openQuoteModal(divPref);
    });
  });

  if (quoteModalCloseBtn) {
    quoteModalCloseBtn.addEventListener('click', closeQuoteModal);
  }

  if (quoteModal) {
    quoteModal.addEventListener('click', (e) => {
      if (e.target === quoteModal) {
        closeQuoteModal();
      }
    });
  }

  // =========================================================================
  // 14. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  const showToast = (message, iconClass = 'fa-circle-check') => {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  // =========================================================================
  // 15. FORM VALIDATION & HANDLING
  // =========================================================================
  const forms = document.querySelectorAll('form[data-validate="true"]');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const errorGroups = form.querySelectorAll('.form-group.has-error');
      errorGroups.forEach(g => g.classList.remove('has-error'));

      const requiredInputs = form.querySelectorAll('[required]');
      requiredInputs.forEach(input => {
        const group = input.closest('.form-group');
        const val = input.value.trim();

        if (!val) {
          isValid = false;
          if (group) group.classList.add('has-error');
        } else if (input.type === 'email') {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            isValid = false;
            if (group) group.classList.add('has-error');
          }
        } else if (input.type === 'tel') {
          const phoneClean = val.replace(/\D/g, '');
          if (phoneClean.length < 10) {
            isValid = false;
            if (group) group.classList.add('has-error');
          }
        }
      });

      if (!isValid) {
        showToast('Please check the required fields highlighted in red.', 'fa-circle-exclamation');
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;
        }

        form.reset();
        closeQuoteModal();
        showToast('Thank you! Your inquiry has been received. Our team will contact you shortly.', 'fa-circle-check');
      }, 1000);
    });
  });

  // =========================================================================
  // 16. HERO INTERACTIVE SHOWCASE TABS (AUTO-PLAY & CLICK)
  // =========================================================================
  const heroTabs = document.querySelectorAll('.h-tab-btn');
  const heroPanels = document.querySelectorAll('.h-preview-panel');
  const heroCard = document.querySelector('.hero-interactive-card');

  if (heroTabs.length > 0 && heroPanels.length > 0) {
    let heroTabIdx = 0;
    let heroAutoPlay = null;

    const activateTab = (idx) => {
      heroTabIdx = idx;
      heroTabs.forEach((tab, i) => tab.classList.toggle('active', i === idx));
      heroPanels.forEach((panel, i) => panel.classList.toggle('active', i === idx));
    };

    heroTabs.forEach((tab, idx) => {
      tab.addEventListener('click', () => {
        activateTab(idx);
        resetHeroAutoPlay();
      });
    });

    const startHeroAutoPlay = () => {
      heroAutoPlay = setInterval(() => {
        heroTabIdx = (heroTabIdx + 1) % heroTabs.length;
        activateTab(heroTabIdx);
      }, 5000);
    };

    const resetHeroAutoPlay = () => {
      if (heroAutoPlay) clearInterval(heroAutoPlay);
      startHeroAutoPlay();
    };

    if (heroCard) {
      heroCard.addEventListener('mouseenter', () => clearInterval(heroAutoPlay));
      heroCard.addEventListener('mouseleave', startHeroAutoPlay);
    }

    startHeroAutoPlay();
  }

  // Active Link in Navbar
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .mobile-menu-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

});

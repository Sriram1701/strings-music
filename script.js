document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Course Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const courseCards = document.querySelectorAll('.course-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            courseCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    // Trigger a small animation
                    card.style.animation = 'none';
                    card.offsetHeight; // trigger reflow
                    card.style.animation = 'fadeInUp 0.5s ease backwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize Video Swiper
    const videoSwiper = new Swiper(".videoSwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        initialSlide: 1,
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: true,
        },
        navigation: {
            nextEl: ".video-next",
            prevEl: ".video-prev",
        },
        on: {
            init: function () {
                handleVideoPlay(this);
            },
            slideChangeTransitionEnd: function () {
                handleVideoPlay(this);
            }
        }
    });

    function handleVideoPlay(swiperInstance) {
        const slides = swiperInstance.el.querySelectorAll('.swiper-slide');
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                if (slide.classList.contains('swiper-slide-active')) {
                    video.play().catch(e => console.log('Autoplay prevented'));
                } else {
                    video.pause();
                }
            }
        });
    }

    // Initialize Review Swiper
    const reviewSwiper = new Swiper(".reviewSwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".review-pagination",
            clickable: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Counter Animation
    const stats = document.querySelectorAll('.stat h3');
    let hasCounted = false;

    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                element.innerText = target + (element.dataset.suffix || '');
            } else {
                element.innerText = Math.ceil(current) + (element.dataset.suffix || '');
            }
        }, 30);
    };

    const checkScroll = () => {
        if (hasCounted) return;
        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;
        
        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            hasCounted = true;
            stats.forEach(stat => {
                const text = stat.innerText;
                const target = parseInt(text);
                const suffix = text.replace(/[0-9]/g, '');
                stat.dataset.suffix = suffix;
                stat.innerText = '0' + suffix;
                countUp(stat, target);
            });
        }
    };

    window.addEventListener('scroll', checkScroll);
    checkScroll();
});

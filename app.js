
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');
    
    menuToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });

    // Slider knob scroll effect
    const knob = document.querySelector(".slider-knob");
    const track = document.querySelector(".slider-track");

    if (knob && track) {
      window.addEventListener("scroll", () => {
        const max = track.clientHeight - knob.clientHeight;
        const totalScroll = document.body.scrollHeight - window.innerHeight;
        const progress = Math.min(1, window.scrollY / totalScroll);
        knob.style.top = `${(progress * max) + knob.clientHeight / 2}px`;
      });
    }

    // Spotlight Slideshow
    const spotlightData = [
      {
        name: "Nelson Kwesi Xedro",
        role: "Founder & President @ ColorStackLC | Honors Scholar",
        bio: "Loves to build, grow and to explore new areas TECH related.",
        achievements: ["Coursera - Meta Programming in Python", "AWS Educate - AWS Cloud Practitioner", "Udemy - Full Stack Web Development", "LinkedIn Learning - Data Analytics"],
        image: "https://i.imgur.com/2f2C9hi.jpeg"
      },
      {
        name: "Cephas Osei-Bonsu",
        role: "Vice President @ ColorStackLC | Freshman",
        bio: "Livingstone College student who loves AI, making impact, and building scalable projects that help peers learn and connect.",
        achievements: ["Coursera - AI for Everyone", "Kaggle - Intro to Machine Learning", "HackerRank - Python (Basic) Certificate", "Google Cloud Skills Boost - Generative AI Fundamentals"],
        image: "https://i.imgur.com/TefBLyb.jpeg"
      },
      {
        name: "Anonymous",
        role: "President Scholar | Freshman",
        bio: "Livingstone College student focused on community building and product design, helping the chapter run events and peer learning sessions.",
        achievements: ["Coursera - Foundations of Project Management", "freeCodeCamp - JavaScript Algorithms and Data Structures", "LinkedIn Learning - Public Speaking Foundations", "Google Digital Garage - Fundamentals of Digital Marketing"],
        image: "https://i.imgur.com/ZCLzsF6.jpeg"
      }
    ];

    let currentSpotlightIndex = 0;
    const totalSlides = spotlightData.length;

    // Initialize pager dots
    const pagerContainer = document.getElementById('spotlight-pager');
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement('span');
      dot.className = 'p' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => goToSpotlight(i));
      pagerContainer.appendChild(dot);
    }

    // Update counter
    document.getElementById('total-slides').textContent = totalSlides;

    function updateSpotlight() {
      const data = spotlightData[currentSpotlightIndex];
      
      document.getElementById('spotlight-img').src = data.image;
      document.getElementById('spotlight-img').alt = `Photo of ${data.name}`;
      document.getElementById('spotlight-name').textContent = data.name;
      document.getElementById('spotlight-role').textContent = data.role;
      document.getElementById('spotlight-bio').textContent = data.bio;
      
      // Update achievements list
      const achievementsList = document.getElementById('spotlight-achievements');
      achievementsList.innerHTML = '';
      data.achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = achievement;
        achievementsList.appendChild(li);
      });
      
      // Update counter
      document.getElementById('current-slide').textContent = currentSpotlightIndex + 1;
      
      // Update pager dots
      document.querySelectorAll('#spotlight-pager .p').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSpotlightIndex);
      });
    }

    function goToSpotlight(index) {
      currentSpotlightIndex = index;
      updateSpotlight();
    }

    function nextSpotlight() {
      currentSpotlightIndex = (currentSpotlightIndex + 1) % totalSlides;
      updateSpotlight();
    }

    function prevSpotlight() {
      currentSpotlightIndex = (currentSpotlightIndex - 1 + totalSlides) % totalSlides;
      updateSpotlight();
    }

    // Add event listeners
    document.getElementById('next-spotlight').addEventListener('click', nextSpotlight);
    document.getElementById('prev-spotlight').addEventListener('click', prevSpotlight);

    // Auto-rotate spotlight every 5 seconds
    let spotlightInterval = setInterval(nextSpotlight, 5000);

    // Pause auto-rotation on hover
    const spotlightContainer = document.querySelector('.spotlight-wrap');
    spotlightContainer.addEventListener('mouseenter', () => {
      clearInterval(spotlightInterval);
    });
    spotlightContainer.addEventListener('mouseleave', () => {
      spotlightInterval = setInterval(nextSpotlight, 5000);
    });

    // Initialize first spotlight
    updateSpotlight();

    // Smooth scroll for navigation links
    document.querySelectorAll('.nav-link, .nav-cta, .btn, .footer-links a').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const offset = 70; // Height of sticky header
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // Update active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 100)) {
          current = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // Card hover effects enhancement
    document.querySelectorAll('.card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        const iconBubble = card.querySelector('.icon-bubble');
        if (iconBubble) {
          iconBubble.style.transform = 'scale(1.1) rotate(5deg)';
        }
      });
      
      card.addEventListener('mouseleave', () => {
        const iconBubble = card.querySelector('.icon-bubble');
        if (iconBubble) {
          iconBubble.style.transform = 'scale(1) rotate(0deg)';
        }
      });
    });
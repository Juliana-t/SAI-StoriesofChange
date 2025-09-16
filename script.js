function showPage(pageId) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(pageId).classList.add('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Update nav active state (optional)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.style.color = '#333';
    });
    event.target.style.color = '#FF6B47';
}

// Add smooth scrolling and interaction effects
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add click event listeners to map pins
    const locationPins = document.querySelectorAll('.location-pin');
    locationPins.forEach(pin => {
        pin.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const locationId = this.getAttribute('data-location');
            console.log('Clicked on:', locationId); // Debug log
            
            if (locationId) {
                // Hide all sections
                const sections = document.querySelectorAll('.page-section');
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Show target section
                const targetSection = document.getElementById(locationId);
                if (targetSection) {
                    targetSection.classList.add('active');
                    window.scrollTo(0, 0);
                    
                    // Visual feedback
                    this.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                    }, 300);
                    
                    console.log('Navigated to:', locationId); // Debug log
                } else {
                    console.error('Page not found:', locationId);
                    document.getElementById('home').classList.add('active');
                }
            }
        });
        
        // Add hover effect
        pin.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        pin.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.story-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuToggle.addEventListener('click', function() {
        // Toggle menu open/closed
        navLinks.classList.toggle('open');
        hamburgerIcon.classList.toggle('open');
    });

    // Close mobile menu when a nav link is clicked
    const mobileNavLinks = document.querySelectorAll('.nav-links a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('open');
            hamburgerIcon.classList.remove('open');
        });
    });
});

// Leaflet Map Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Existing code for page navigation and interactions...

    // Initialize Leaflet Map
    const map = L.map('timor-map').setView([-8.803341, 125.870604], 9);

    // Use a simple, minimal base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        opacity: 0.7
    }).addTo(map);

    // Custom marker icon function
    function createCustomMarker(color, className) {
        return L.divIcon({
            className: `custom-marker ${className}`,
            html: '',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
    }

    // Locations with their coordinates and details
    const locations = [
        { 
            name: 'Timor-Leste', 
            coords: [-8.803341, 125.870604], 
            type: 'country',
            popupContent: 'Timor-Leste - National Overview'
        },
        { 
            name: 'Dili', 
            coords: [-8.561167, 125.564775], 
            type: 'capital',
            popupContent: 'Dili - National Context',
            dataLocation: 'dili'
        },
        { 
            name: 'Ermera Municipality', 
            coords: [-8.823535, 125.375248], 
            type: 'municipality',
            popupContent: 'Ermera Municipality - Supporting Mechanisms',
            dataLocation: 'ermera'
        },
        { 
            name: 'Suku 1 - Eraulo', 
            coords: [-8.765784, 125.443912], 
            type: 'suku',
            popupContent: 'Suku 1 - Community Voices Heard',
            dataLocation: 'suku1'
        },
        { 
            name: 'Suku 2 - Riheu', 
            coords: [-8.751652, 125.398734], 
            type: 'suku',
            popupContent: 'Suku 2 - Bridging Traditional and Modern',
            dataLocation: 'suku2'
        },
        { 
            name: 'Suku 3', 
            coords: [-9.070729, 125.916362], 
            type: 'suku',
            popupContent: 'Suku 3 - Youth Leadership',
            dataLocation: 'suku3'
        },
        { 
            name: 'Suku 4 - Haupu', 
            coords: [-8.818867, 125.424750], 
            type: 'suku',
            popupContent: 'Suku 4 - Women\'s Collective Action',
            dataLocation: 'suku4'
        }
    ];

    // Add markers for each location
    locations.forEach(location => {
        const marker = L.marker(location.coords, {
            icon: createCustomMarker(
                location.type === 'capital' ? '#FF6B47' :
                location.type === 'municipality' ? '#9B7EDE' :
                location.type === 'suku' ? '#00BFA5' : '#333',
                `${location.type}-marker`
            )
        }).addTo(map);

        // Add tooltip with location name
        marker.bindTooltip(location.name, {
            permanent: false,
            direction: 'top',
            className: 'location-tooltip'
        });

        // Add popup with location details
        marker.bindPopup(location.popupContent);

        // Add click event to navigate to corresponding section if data-location exists
        if (location.dataLocation) {
            marker.on('click', function() {
                const targetSection = document.getElementById(location.dataLocation);
                if (targetSection) {
                    // Hide all sections
                    const sections = document.querySelectorAll('.page-section');
                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Show target section
                    targetSection.classList.add('active');
                    window.scrollTo(0, 0);
                }
            });
        }
    });
});

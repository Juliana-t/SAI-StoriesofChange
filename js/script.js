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
    const map = L.map('timor-map').setView([-8.823535, 125.375248], 10);

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
            name: 'Dili', 
            coords: [-8.561167, 125.564775], 
            type: 'capital',
            popupContent: 'Dili - National Context',
            pageUrl: 'pages/dili.html'
        },
        { 
            name: 'Ermera Municipality', 
            coords: [-8.823535, 125.375248], 
            type: 'municipality',
            popupContent: 'Ermera Municipality - Supporting Mechanisms',
            pageUrl: 'pages/ermera.html'
        },
        { 
            name: 'Eraulo', 
            coords: [-8.765784, 125.443912], 
            type: 'suku',
            popupContent: 'Eraulo: Connected Community',
            pageUrl: 'pages/suku1.html'
        },
        { 
            name: 'Riheu', 
            coords: [-8.751652, 125.398734], 
            type: 'suku',
            popupContent: 'Riheu: Inclusive Health',
            pageUrl: 'pages/suku2.html'
        },
        { 
            name: 'Dotik', 
            coords: [-9.070729, 125.916362], 
            type: 'suku',
            popupContent: 'Dotik: Resilient Thinking',
            pageUrl: 'pages/suku3.html'
        },
        { 
            name: 'Haupu', 
            coords: [-8.818867, 125.424750], 
            type: 'suku',
            popupContent: 'Haupu: Community in Action',
            pageUrl: 'pages/suku4.html'
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

        // Add click event to navigate to corresponding page
        if (location.pageUrl) {
            marker.on('click', function() {
                window.location.href = location.pageUrl;
            });
        }
    });
});

// Function to create Suku location map
function createSukuMap(mapElementId, coordinates, sukuName) {
    // Ensure Leaflet is available
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return null;
    }

    // Create map with a slight delay to ensure DOM is fully loaded
    const map = L.map(mapElementId, {
        center: coordinates,
        zoom: 12,
        zoomControl: true,
        attributionControl: true
    });

    // Use a simple, minimal base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        opacity: 0.7
    }).addTo(map);

    // Add marker for Suku location
    L.marker(coordinates, {
        icon: L.divIcon({
            className: 'custom-marker suku-marker',
            html: '',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        })
    }).addTo(map)
    .bindTooltip(sukuName, {
        permanent: false,
        direction: 'top',
        className: 'location-tooltip'
    });

    return map;
}

// Initialize Suku maps when on Suku pages
document.addEventListener('DOMContentLoaded', function() {
    // Ensure Leaflet is loaded
    if (typeof L !== 'undefined') {
        const sukuMapElement = document.getElementById('suku-location-map');
        if (sukuMapElement) {
            // Parse coordinates, handling potential JSON parsing errors
            try {
                const sukuName = sukuMapElement.getAttribute('data-suku-name');
                const coordinates = JSON.parse(sukuMapElement.getAttribute('data-coordinates'));
                
                // Slight delay to ensure all resources are loaded
                setTimeout(() => {
                    createSukuMap('suku-location-map', coordinates, sukuName);
                }, 100);
            } catch (error) {
                console.error('Error initializing Suku map:', error);
            }
        }
    } else {
        console.error('Leaflet library not loaded');
    }
});

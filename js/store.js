function generateReviews(name, baseRating, count) {
  var reviews = [];
  var names = ['Arjun M.', 'Priya S.', 'Rahul K.', 'Ananya P.', 'Vikram R.', 'Neha G.', 'Siddharth L.', 'Divya N.', 'Rohit J.', 'Sneha T.', 'Amit B.', 'Kavya D.', 'Manish V.', 'Pooja C.', 'Deepak S.', 'Shruti A.', 'Harsh W.', 'Anjali F.', 'Karan Y.', 'Meera Q.'];
  var comments = [
    'Absolutely love this pack! Transformed my editing workflow completely.',
    'Great quality preset pack. Worth every rupee.',
    'Incredible value for money. The results are amazing.',
    'Perfect for my YouTube videos. Highly recommend!',
    'Good quality but could use more variety in the pack.',
    'Outstanding! My clients love the new look.',
    'Easy to use and produces professional results.',
    'Best investment for any Premiere Pro editor.',
    'Really impressed with the quality. Will buy more.',
    'Solid pack. Customer support was very helpful.',
    'The tutorial included made it super easy to get started.',
    'High quality presets that save hours of work.',
    'Decent pack, works as described. Good for beginners.',
    'Amazing results straight out of the box. Five stars!',
    'Been using these for a month now. Fantastic!',
    'Great for social media content creation.',
    'Really elevated my video production value.',
    'Totally worth it. Been recommending to colleagues.',
    'Excellent quality. Fast delivery after purchase.',
    'Good product. Would love to see more options added.'
  ];
  for (var i = 0; i < count; i++) {
    var rating = Math.min(5, Math.max(1, baseRating + Math.floor(Math.random() * 3) - 1));
    var idx = i % names.length;
    reviews.push({
      name: names[idx],
      rating: rating,
      date: randomDate(),
      comment: comments[idx],
      verified: Math.random() > 0.3
    });
  }
  return reviews;
}
function randomDate() {
  var d = new Date(2024, 0, 1 + Math.floor(Math.random() * 500));
  return d.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
}

var PRODUCTS_DATA = [
    {
        "id": 1,
        "name": "Cinematic Color LUTs Vol.1",
        "price": 2900,
        "comparePrice": null,
        "category": "Presets",
        "collection": "presets",
        "slug": "cinematic-color-luts-vol1",
        "description": "50 professional cinematic LUTs for Premiere Pro. Transform your footage with Hollywood-grade color grading in one click. Includes teal-orange, warm summer, moody noir, and vibrant commercial looks.",
        "features": [
            "50 cinematic LUTs",
            "Teal & orange palette",
            "Warm summer tones",
            "Moody noir looks",
            "Commercial grade",
            "Tutorial included"
        ],
        "image": "product-color-presets.svg",
        "badge": "Best Seller",
        "rating": 4.8,
        "reviewCount": 156,
        "specs": ["Format: .cube & .look", "Resolution: 4K/HD", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 12 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Arjun M.","rating":5,"date":"Jan 15, 2025","comment":"Absolutely love this pack! Transformed my editing workflow.","verified":true},
            {"name":"Priya S.","rating":4,"date":"Feb 3, 2025","comment":"Great quality preset pack. Worth every rupee.","verified":true},
            {"name":"Rahul K.","rating":5,"date":"Mar 22, 2025","comment":"Incredible value for money. Highly recommend!","verified":false},
            {"name":"Ananya P.","rating":5,"date":"Apr 10, 2025","comment":"Professional results instantly.","verified":true}
        ]
    },
    {
        "id": 2,
        "name": "VHS Glitch Effect Presets",
        "price": 1500,
        "comparePrice": null,
        "category": "Presets",
        "collection": "presets",
        "slug": "vhs-glitch-effect-presets",
        "description": "30 retro VHS and glitch effect presets for Premiere Pro. Add authentic tape distortion, scan lines, chroma shift, and static noise to your footage.",
        "features": [
            "30 glitch presets",
            "VHS distortion",
            "Scan lines",
            "Chroma shift",
            "Static noise",
            "Tutorial included"
        ],
        "image": "product-glow.svg",
        "badge": "Popular",
        "rating": 4.5,
        "reviewCount": 89,
        "specs": ["Format: .mogrt", "Resolution: 4K/HD", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 8 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Neha G.","rating":5,"date":"Feb 10, 2025","comment":"Perfect for my YouTube videos. Highly recommend!","verified":true},
            {"name":"Vikram R.","rating":4,"date":"Mar 5, 2025","comment":"Great retro effects, very authentic looking.","verified":true},
            {"name":"Siddharth L.","rating":5,"date":"Apr 2, 2025","comment":"Really impressed with the quality. Will buy more.","verified":true},
            {"name":"Priya S.","rating":4,"date":"May 14, 2025","comment":"Easy to use and produces professional results.","verified":false}
        ]
    },
    {
        "id": 3,
        "name": "Pastel Color Grading Bundle",
        "price": 2100,
        "comparePrice": null,
        "category": "Presets",
        "collection": "presets",
        "slug": "pastel-color-grading-bundle",
        "description": "40 soft pastel color grading presets for Premiere Pro. Create dreamy, aesthetic looks with muted tones, desaturated highlights, and gentle color washes.",
        "features": [
            "40 pastel presets",
            "Muted tones",
            "Desaturated highlights",
            "Aesthetic looks",
            "Skin-safe colors",
            "Video tutorial"
        ],
        "image": "product-color-mini.svg",
        "badge": null,
        "rating": 4.2,
        "reviewCount": 45,
        "specs": ["Format: .cube & .look", "Resolution: 4K/HD", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 15 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Divya N.","rating":5,"date":"Jan 22, 2025","comment":"Dreamy pastel tones! My Instagram reels look amazing.","verified":true},
            {"name":"Rohit J.","rating":4,"date":"Mar 18, 2025","comment":"Good quality but could use more variety in the pack.","verified":true},
            {"name":"Kavya D.","rating":4,"date":"Apr 5, 2025","comment":"Beautiful soft colors, exactly what I needed.","verified":true},
            {"name":"Amit B.","rating":3,"date":"May 28, 2025","comment":"Decent pack, works as described. Good for beginners.","verified":false}
        ]
    },
    {
        "id": 4,
        "name": "Duotone Color Presets",
        "price": 1600,
        "comparePrice": null,
        "category": "Presets",
        "collection": "presets",
        "slug": "duotone-color-presets",
        "description": "25 duotone color grading presets for Premiere Pro. Bold two-tone looks inspired by album covers, fashion editorials, and modern social media aesthetics.",
        "features": [
            "25 duotone presets",
            "Bold two-tone looks",
            "Album cover style",
            "Fashion editorial",
            "Social media ready",
            "Custom color swap"
        ],
        "image": "product-free-preset.svg",
        "badge": "Popular",
        "rating": 4.4,
        "reviewCount": 76,
        "specs": ["Format: .cube & .look", "Resolution: 4K/HD", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 6 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Rahul K.","rating":5,"date":"Feb 14, 2025","comment":"Bold duotone looks are perfect for my music videos.","verified":true},
            {"name":"Ananya P.","rating":4,"date":"Mar 30, 2025","comment":"Great colors, easy to customize. Highly recommend!","verified":true},
            {"name":"Arjun M.","rating":5,"date":"Apr 18, 2025","comment":"Incredible value for money. The results are amazing.","verified":true},
            {"name":"Sneha T.","rating":4,"date":"Jun 1, 2025","comment":"Solid pack. Customer support was very helpful.","verified":false}
        ]
    },
    {
        "id": 5,
        "name": "Film Grain Overlay Pack",
        "price": 1200,
        "comparePrice": null,
        "category": "Presets",
        "collection": "presets",
        "slug": "film-grain-overlay-pack",
        "description": "15 authentic film grain overlay presets for Premiere Pro. 8mm, 16mm, and 35mm grain textures with adjustable intensity for vintage cinematic looks.",
        "features": [
            "15 grain presets",
            "8mm / 16mm / 35mm",
            "Adjustable intensity",
            "Vintage look",
            "4K ready",
            "Drag and drop"
        ],
        "image": "product-free-preset2.svg",
        "badge": null,
        "rating": 3.8,
        "reviewCount": 32,
        "specs": ["Format: .mogrt & .mp4", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 25 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Manish V.","rating":4,"date":"Feb 28, 2025","comment":"Good quality film grain, adds nice vintage feel.","verified":true},
            {"name":"Pooja C.","rating":3,"date":"Apr 12, 2025","comment":"Decent pack, works as described. Good for beginners.","verified":true},
            {"name":"Deepak S.","rating":4,"date":"May 20, 2025","comment":"Easy to use and produces professional results.","verified":false}
        ]
    },
    {
        "id": 6,
        "name": "Smooth Slide Transitions Pack",
        "price": 1900,
        "comparePrice": 3500,
        "category": "Motion Graphics",
        "collection": "motion-graphics",
        "slug": "smooth-slide-transitions-pack",
        "description": "60 fluid slide transitions for Premiere Pro. Perfect for vlogs, travel videos, and social media content. Drag-and-drop with customizable direction and speed.",
        "features": [
            "60 slide transitions",
            "Drag-and-drop",
            "Customizable direction",
            "Speed controls",
            "4K resolution",
            "Video tutorial"
        ],
        "image": "product-ultimate-presets.svg",
        "badge": "Best Seller",
        "rating": 4.7,
        "reviewCount": 134,
        "specs": ["Format: .mogrt", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 18 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Vikram R.","rating":5,"date":"Jan 8, 2025","comment":"Smooth transitions that elevate any video project.","verified":true},
            {"name":"Priya S.","rating":5,"date":"Feb 22, 2025","comment":"Absolutely love this pack! Transformed my editing workflow.","verified":true},
            {"name":"Rahul K.","rating":4,"date":"Apr 3, 2025","comment":"Best investment for any Premiere Pro editor.","verified":true},
            {"name":"Neha G.","rating":5,"date":"May 17, 2025","comment":"Outstanding! My clients love the new look.","verified":true},
            {"name":"Siddharth L.","rating":4,"date":"Jun 8, 2025","comment":"Great quality but could use more transition styles.","verified":false}
        ]
    },
    {
        "id": 7,
        "name": "Modern Broadcast Title Pack",
        "price": 2400,
        "comparePrice": null,
        "category": "Motion Graphics",
        "collection": "motion-graphics",
        "slug": "modern-broadcast-title-pack",
        "description": "30 professional broadcast-style title animations for Premiere Pro. News-style lower thirds, full-screen titles, and callout graphics with sleek modern design.",
        "features": [
            "30 title animations",
            "Broadcast quality",
            "Lower thirds",
            "Full-screen titles",
            "Callout graphics",
            "MOGR format"
        ],
        "image": "product-text-presets.svg",
        "badge": "Popular",
        "rating": 4.5,
        "reviewCount": 92,
        "specs": ["Format: .mogrt", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 22 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Divya N.","rating":5,"date":"Feb 5, 2025","comment":"Professional broadcast quality titles. Highly recommend!","verified":true},
            {"name":"Rohit J.","rating":4,"date":"Mar 27, 2025","comment":"Perfect for my corporate video projects.","verified":true},
            {"name":"Kavya D.","rating":5,"date":"Apr 22, 2025","comment":"Best investment for any Premiere Pro editor.","verified":true},
            {"name":"Amit B.","rating":4,"date":"Jun 2, 2025","comment":"Solid pack. Customer support was very helpful.","verified":false}
        ]
    },
    {
        "id": 8,
        "name": "Kinetic Typography Toolkit",
        "price": 3200,
        "comparePrice": null,
        "category": "Motion Graphics",
        "collection": "motion-graphics",
        "slug": "kinetic-typography-toolkit",
        "description": "80 animated kinetic typography templates for Premiere Pro. Dynamic text reveals, word-by-word animations, and expressive type layouts for music videos and social media.",
        "features": [
            "80 typography templates",
            "Word-by-word animation",
            "Dynamic reveals",
            "Music video ready",
            "Social media optimized",
            "MOGR format"
        ],
        "image": "product-text-animator.svg",
        "badge": "Popular",
        "rating": 4.6,
        "reviewCount": 108,
        "specs": ["Format: .mogrt", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 35 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Arjun M.","rating":5,"date":"Jan 12, 2025","comment":"Incredible kinetic templates! Perfect for my music videos.","verified":true},
            {"name":"Priya S.","rating":5,"date":"Feb 28, 2025","comment":"Really elevated my video production value.","verified":true},
            {"name":"Rahul K.","rating":4,"date":"Apr 10, 2025","comment":"Great variety of text animations.","verified":true},
            {"name":"Ananya P.","rating":4,"date":"May 25, 2025","comment":"Easy to customize and looks professional.","verified":true},
            {"name":"Vikram R.","rating":5,"date":"Jun 12, 2025","comment":"Outstanding! My clients love the new look.","verified":false}
        ]
    },
    {
        "id": 9,
        "name": "Morph Transition Pack",
        "price": 2800,
        "comparePrice": 3600,
        "category": "Motion Graphics",
        "collection": "motion-graphics",
        "slug": "morph-transition-pack",
        "description": "20 fluid morph transitions for Premiere Pro. Shape-shifting wipes, liquid distortions, and organic shape blends for smooth scene changes.",
        "features": [
            "20 morph transitions",
            "Shape-shifting wipes",
            "Liquid distortions",
            "Organic blends",
            "4K ready",
            "Drag and drop"
        ],
        "image": "product-paper-fold.svg",
        "badge": null,
        "rating": 4.0,
        "reviewCount": 55,
        "specs": ["Format: .mogrt", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 14 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Siddharth L.","rating":4,"date":"Mar 8, 2025","comment":"Liquid morph effects look really unique and cool.","verified":true},
            {"name":"Neha G.","rating":3,"date":"Apr 20, 2025","comment":"Good quality but could use more transition styles.","verified":true},
            {"name":"Manish V.","rating":4,"date":"Jun 5, 2025","comment":"Works as expected. Adds nice flow to videos.","verified":false}
        ]
    },
    {
        "id": 10,
        "name": "3D Lower Thirds Pack",
        "price": 2400,
        "comparePrice": null,
        "category": "Motion Graphics",
        "collection": "motion-graphics",
        "slug": "3d-lower-thirds-pack",
        "description": "30 animated 3D lower thirds for Premiere Pro. Depth-split name tags, extruded titles, and perspective-matched graphics with seamless camera integration.",
        "features": [
            "30 lower thirds",
            "3D depth effect",
            "Extruded titles",
            "Camera matched",
            "Custom colors",
            "MOGR format"
        ],
        "image": "product-number-counter.svg",
        "badge": "Best Seller",
        "rating": 4.8,
        "reviewCount": 167,
        "specs": ["Format: .mogrt", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 20 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Rohit J.","rating":5,"date":"Jan 18, 2025","comment":"Absolutely love this pack! Transformed my editing workflow.","verified":true},
            {"name":"Divya N.","rating":5,"date":"Mar 2, 2025","comment":"Incredible 3D depth effect. My videos look professional now.","verified":true},
            {"name":"Kavya D.","rating":4,"date":"Apr 15, 2025","comment":"Great quality lower thirds pack. Worth every rupee.","verified":true},
            {"name":"Amit B.","rating":5,"date":"May 30, 2025","comment":"Perfect for my YouTube channel. Highly recommend!","verified":true},
            {"name":"Sneha T.","rating":5,"date":"Jun 18, 2025","comment":"Best investment for any Premiere Pro editor.","verified":false}
        ]
    },
    {
        "id": 11,
        "name": "YouTube Master Project File",
        "price": 4900,
        "comparePrice": 7900,
        "category": "Project Files",
        "collection": "project-files",
        "slug": "youtube-master-project-file",
        "description": "Complete YouTube video project file for Premiere Pro. Includes intro, outro, transitions, call-to-action animations, and color grade presets. Ready to edit just drop in your footage.",
        "features": [
            "Full project file",
            "Animated intro",
            "Custom outro",
            "CTA animations",
            "Color grade presets",
            "4K timeline ready"
        ],
        "image": "placeholder-13.svg",
        "badge": "Best Seller",
        "rating": 4.9,
        "reviewCount": 198,
        "specs": ["Format: .prproj", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Open Project", "File Size: 45 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Arjun M.","rating":5,"date":"Jan 5, 2025","comment":"Complete game changer for my YouTube workflow!","verified":true},
            {"name":"Priya S.","rating":5,"date":"Feb 14, 2025","comment":"Everything is perfectly organized. Saved me hours!","verified":true},
            {"name":"Rahul K.","rating":5,"date":"Mar 28, 2025","comment":"Incredible value for money. Highly recommend!","verified":true},
            {"name":"Ananya P.","rating":5,"date":"May 1, 2025","comment":"Professional results instantly.","verified":true},
            {"name":"Vikram R.","rating":4,"date":"Jun 15, 2025","comment":"Fantastic project file. Customer support was very helpful.","verified":false}
        ]
    },
    {
        "id": 12,
        "name": "Cinematic Travel Vlog Project",
        "price": 2499,
        "comparePrice": 3499,
        "category": "Project Files",
        "collection": "project-files",
        "slug": "cinematic-travel-vlog",
        "description": "Complete Premiere Pro project file for a cinematic travel vlog. Includes sequences, transitions, color grading, and motion graphics. Perfect for learning professional editing workflow.",
        "features": [
            "Full project structure",
            "Color graded sequences",
            "Custom transitions",
            "Motion graphics overlays",
            "Sound design included",
            "4K source footage"
        ],
        "image": "placeholder-1.svg",
        "badge": "Popular",
        "rating": 4.5,
        "reviewCount": 85,
        "specs": ["Format: .prproj", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Open Project", "File Size: 2.1 GB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Neha G.","rating":5,"date":"Feb 10, 2025","comment":"Perfect for travel vlogs! The color grading is stunning.","verified":true},
            {"name":"Siddharth L.","rating":4,"date":"Mar 22, 2025","comment":"Great project structure, easy to customize.","verified":true},
            {"name":"Manish V.","rating":5,"date":"May 5, 2025","comment":"Really impressed with the quality. Will buy more.","verified":true},
            {"name":"Pooja C.","rating":4,"date":"Jun 20, 2025","comment":"Beautiful transitions and sound design included.","verified":false}
        ]
    },
    {
        "id": 13,
        "name": "Music Video Production Kit",
        "price": 3499,
        "comparePrice": 4499,
        "category": "Project Files",
        "collection": "project-files",
        "slug": "music-video-production-kit",
        "description": "Professional music video project file with beat-synced editing, lyrical typography, and creative transitions. Includes multiple sequence templates.",
        "features": [
            "Beat-synced timeline",
            "Lyric typography template",
            "Glitch transitions",
            "Color LUTs included",
            "Particle overlays",
            "Tutorial walkthrough"
        ],
        "image": "placeholder-3.svg",
        "badge": null,
        "rating": 4.1,
        "reviewCount": 42,
        "specs": ["Format: .prproj", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Open Project", "File Size: 1.8 GB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Deepak S.","rating":4,"date":"Mar 15, 2025","comment":"Beat-synced editing is fantastic! Great for music content.","verified":true},
            {"name":"Shruti A.","rating":4,"date":"Apr 28, 2025","comment":"Good kit with useful templates for music videos.","verified":true},
            {"name":"Harsh W.","rating":3,"date":"Jun 10, 2025","comment":"Decent pack, works as described. Good for beginners.","verified":true},
            {"name":"Karan Y.","rating":5,"date":"Jul 2, 2025","comment":"The lyric typography templates are amazing!","verified":false}
        ]
    },
    {
        "id": 14,
        "name": "Wedding Highlights Master Project",
        "price": 3999,
        "comparePrice": 4999,
        "category": "Project Files",
        "collection": "project-files",
        "slug": "wedding-highlights-master",
        "description": "Premium wedding highlight reel project file. Romantic transitions, elegant typography, and cinematic color grading. Trusted by professional wedding editors.",
        "features": [
            "Romantic transition pack",
            "Elegant lower thirds",
            "Cinematic LUTs",
            "Highlight reel template",
            "Photo slideshow module",
            "Audio spectrum visuals"
        ],
        "image": "placeholder-5.svg",
        "badge": "Best Seller",
        "rating": 4.8,
        "reviewCount": 178,
        "specs": ["Format: .prproj", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Open Project", "File Size: 3.2 GB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Arjun M.","rating":5,"date":"Jan 20, 2025","comment":"My wedding edits have never looked better!","verified":true},
            {"name":"Priya S.","rating":5,"date":"Mar 4, 2025","comment":"Absolutely love this pack! Transformed my editing workflow.","verified":true},
            {"name":"Rahul K.","rating":4,"date":"Apr 19, 2025","comment":"Elegant transitions and beautiful color grading.","verified":true},
            {"name":"Ananya P.","rating":5,"date":"Jun 1, 2025","comment":"Professional results instantly. My clients are thrilled.","verified":true},
            {"name":"Vikram R.","rating":5,"date":"Jul 14, 2025","comment":"Best investment for any Premiere Pro editor.","verified":false}
        ]
    },
    {
        "id": 15,
        "name": "Corporate Branding Project",
        "price": 2999,
        "comparePrice": null,
        "category": "Project Files",
        "collection": "project-files",
        "slug": "corporate-branding-project",
        "description": "Complete corporate branding project file for Premiere Pro. Logo reveals, title sequences, lower thirds, and social media cutdowns all in one organized project.",
        "features": [
            "Logo reveal animations",
            "Title sequences",
            "Lower thirds pack",
            "Social media versions",
            "Brand color presets",
            "Export templates"
        ],
        "image": "placeholder-4.svg",
        "badge": "Popular",
        "rating": 4.4,
        "reviewCount": 72,
        "specs": ["Format: .prproj", "Resolution: 4K/HD", "Compatibility: Premiere Pro CC+", "Installation: Open Project", "File Size: 1.5 GB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Rohit J.","rating":5,"date":"Feb 18, 2025","comment":"Perfect for corporate projects! Very professional.","verified":true},
            {"name":"Divya N.","rating":4,"date":"Apr 3, 2025","comment":"Great branding templates. Easy to customize with brand colors.","verified":true},
            {"name":"Kavya D.","rating":4,"date":"May 22, 2025","comment":"Solid pack. Has everything a corporate editor needs.","verified":true},
            {"name":"Amit B.","rating":5,"date":"Jul 8, 2025","comment":"Logo reveals and title sequences are top notch.","verified":false}
        ]
    },
    {
        "id": 16,
        "name": "Cinematic Overlays Bundle",
        "price": 0,
        "comparePrice": null,
        "category": "Free Assets",
        "collection": "free-assets",
        "slug": "cinematic-overlays-bundle",
        "description": "20 free cinematic overlay effects for Premiere Pro. Dust particles, light leaks, film grain, and bokeh overlays to add depth and atmosphere to any video.",
        "features": [
            "20 free overlays",
            "Dust particles",
            "Light leaks",
            "Film grain",
            "Bokeh effects",
            "4K resolution"
        ],
        "image": "placeholder-9.svg",
        "badge": "Free",
        "rating": 4.3,
        "reviewCount": 145,
        "specs": ["Format: .mp4 & .png", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 50 MB", "License: Free"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Sneha T.","rating":5,"date":"Jan 25, 2025","comment":"Incredible free pack! The light leaks are gorgeous.","verified":true},
            {"name":"Siddharth L.","rating":4,"date":"Mar 10, 2025","comment":"Great quality for free assets. Highly recommend!","verified":true},
            {"name":"Neha G.","rating":4,"date":"Apr 30, 2025","comment":"Dust particles and bokeh effects add so much depth.","verified":true},
            {"name":"Manish V.","rating":5,"date":"Jun 15, 2025","comment":"Amazing free bundle. Customer support was very helpful.","verified":false}
        ]
    },
    {
        "id": 17,
        "name": "Speed Ramp Transitions",
        "price": 0,
        "comparePrice": null,
        "category": "Free Assets",
        "collection": "free-assets",
        "slug": "speed-ramp-transitions",
        "description": "10 free speed ramp transitions for Premiere Pro. Add cinematic speed changes to your edits with these easy-to-use transition presets.",
        "features": [
            "10 speed ramp presets",
            "Cinematic time remapping",
            "Easy to customize",
            "Free download",
            "Works with any footage",
            "Tutorial included"
        ],
        "image": "placeholder-10.svg",
        "badge": "Free",
        "rating": 4.1,
        "reviewCount": 112,
        "specs": ["Format: .mogrt", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 5 MB", "License: Free"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Deepak S.","rating":5,"date":"Feb 8, 2025","comment":"Smooth speed ramps! Perfect for cinematic edits.","verified":true},
            {"name":"Shruti A.","rating":4,"date":"Mar 25, 2025","comment":"Free and works great. Easy to customize.","verified":true},
            {"name":"Harsh W.","rating":4,"date":"May 12, 2025","comment":"Good quality transitions for any project.","verified":true},
            {"name":"Karan Y.","rating":3,"date":"Jun 28, 2025","comment":"Decent pack, works as described. Good for beginners.","verified":false}
        ]
    },
    {
        "id": 18,
        "name": "Typewriter Animation Template",
        "price": 0,
        "comparePrice": null,
        "category": "Free Assets",
        "collection": "free-assets",
        "slug": "typewriter-animation-template",
        "description": "Free typewriter text animation template for Premiere Pro. A classic typing effect with customizable text, speed, and sound effects for your video projects.",
        "features": [
            "Typewriter effect",
            "Customizable text",
            "Adjustable speed",
            "Sound effects included",
            "Free download",
            "HD resolution"
        ],
        "image": "product-typewriter.svg",
        "badge": "Free",
        "rating": 4.0,
        "reviewCount": 88,
        "specs": ["Format: .mogrt", "Resolution: HD", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 3 MB", "License: Free"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Pooja C.","rating":4,"date":"Feb 20, 2025","comment":"Classic typewriter effect works perfectly!","verified":true},
            {"name":"Rohit J.","rating":4,"date":"Apr 8, 2025","comment":"Good template with sound effects included.","verified":true},
            {"name":"Divya N.","rating":5,"date":"May 26, 2025","comment":"Love the simplicity. Customizable text is a plus.","verified":true},
            {"name":"Arjun M.","rating":3,"date":"Jul 5, 2025","comment":"Good quality but could use more variety in the pack.","verified":false}
        ]
    },
    {
        "id": 19,
        "name": "Social Media Story Pack",
        "price": 0,
        "comparePrice": null,
        "category": "Free Assets",
        "collection": "free-assets",
        "slug": "social-media-story-pack-free",
        "description": "Free social media video kit for Premiere Pro. 10 vertical story templates, 5 reel intros, and 3 transition sets optimized for Instagram and TikTok.",
        "features": [
            "10 story templates",
            "5 reel intros",
            "3 transition sets",
            "9:16 vertical format",
            "Instagram optimized",
            "TikTok ready"
        ],
        "image": "placeholder-6.svg",
        "badge": "Free",
        "rating": 3.9,
        "reviewCount": 65,
        "specs": ["Format: .mogrt", "Resolution: 1080x1920", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 12 MB", "License: Free"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Ananya P.","rating":4,"date":"Mar 5, 2025","comment":"Great for Instagram Reels! Vertical templates are handy.","verified":true},
            {"name":"Vikram R.","rating":4,"date":"Apr 22, 2025","comment":"Good free pack for social media content creators.","verified":true},
            {"name":"Sneha T.","rating":3,"date":"Jun 14, 2025","comment":"Decent pack, works as described. Good for beginners.","verified":false}
        ]
    },
    {
        "id": 20,
        "name": "Audio Visualizer Pack",
        "price": 0,
        "comparePrice": null,
        "category": "Free Assets",
        "collection": "free-assets",
        "slug": "audio-visualizer-pack-free",
        "description": "Free audio visualization presets for Premiere Pro. 8 spectrum analyzers, waveform animations, and beat-reactive bars for music and podcast content.",
        "features": [
            "8 visualizers",
            "Spectrum analyzer",
            "Waveform animation",
            "Beat-reactive",
            "Music content",
            "Podcast ready"
        ],
        "image": "placeholder-4.svg",
        "badge": "Free",
        "rating": 4.2,
        "reviewCount": 96,
        "specs": ["Format: .mogrt", "Resolution: 4K/HD", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 8 MB", "License: Free"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Rahul K.","rating":5,"date":"Jan 30, 2025","comment":"Amazing audio visualizers! Beat-reactive and smooth.","verified":true},
            {"name":"Priya S.","rating":4,"date":"Mar 17, 2025","comment":"Great for music and podcast content. Easy to use.","verified":true},
            {"name":"Siddharth L.","rating":4,"date":"May 8, 2025","comment":"Spectrum analyzer looks stunning. Highly recommend!","verified":true},
            {"name":"Neha G.","rating":5,"date":"Jun 25, 2025","comment":"Totally worth it. Been recommending to colleagues.","verified":false}
        ]
    },
    {
        "id": 21,
        "name": "Cinematic Sound Effects Vol.1",
        "price": 2200,
        "comparePrice": null,
        "category": "Sound Effects",
        "collection": "sound-effects",
        "slug": "cinematic-sound-effects-vol1",
        "description": "100 professional cinematic sound effects for video editors. Whooshes, impacts, risers, hits, ambient drones, and transition sounds. Royalty-free and ready to use.",
        "features": [
            "100 sound effects",
            "Whooshes & impacts",
            "Risers & hits",
            "Ambient drones",
            "Transition sounds",
            "Royalty-free"
        ],
        "image": "placeholder-11.svg",
        "badge": "Best Seller",
        "rating": 4.7,
        "reviewCount": 182,
        "specs": ["Format: .wav & .mp3", "Bitrate: 320kbps", "Sample Rate: 48kHz", "Compatibility: Any NLE", "Installation: Drag & Drop", "File Size: 120 MB"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Arjun M.","rating":5,"date":"Jan 10, 2025","comment":"Best sound effects pack I've ever purchased!","verified":true},
            {"name":"Priya S.","rating":5,"date":"Feb 25, 2025","comment":"Whooshes and impacts are incredible quality.","verified":true},
            {"name":"Rahul K.","rating":5,"date":"Apr 8, 2025","comment":"Royalty-free and ready to use. Perfect!","verified":true},
            {"name":"Ananya P.","rating":4,"date":"May 20, 2025","comment":"Great variety of sounds. Ambient drones are my favorite.","verified":true},
            {"name":"Vikram R.","rating":5,"date":"Jul 1, 2025","comment":"Transformed my video editing workflow completely.","verified":false}
        ]
    },
    {
        "id": 22,
        "name": "Vocal Chop & Stutter Pack",
        "price": 1800,
        "comparePrice": null,
        "category": "Sound Effects",
        "collection": "sound-effects",
        "slug": "vocal-chop-stutter-pack",
        "description": "50 vocal chop and stutter sound effects for Premiere Pro. Perfect for modern video edits, transitions, and rhythmic accents in music content.",
        "features": [
            "50 vocal effects",
            "Stutter sounds",
            "Vocal chops",
            "Rhythmic accents",
            "Music content ready",
            "Instant download"
        ],
        "image": "placeholder-12.svg",
        "badge": null,
        "rating": 3.7,
        "reviewCount": 28,
        "specs": ["Format: .wav", "Bitrate: 320kbps", "Sample Rate: 48kHz", "Compatibility: Any NLE", "Installation: Drag & Drop", "File Size: 35 MB"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Deepak S.","rating":4,"date":"Feb 15, 2025","comment":"Vocal chops add nice rhythm to my edits.","verified":true},
            {"name":"Shruti A.","rating":3,"date":"Apr 1, 2025","comment":"Decent pack, works as described. Good for beginners.","verified":true},
            {"name":"Harsh W.","rating":4,"date":"May 28, 2025","comment":"Good for modern social media content.","verified":false}
        ]
    },
    {
        "id": 23,
        "name": "Ambient Background Drones",
        "price": 1400,
        "comparePrice": null,
        "category": "Sound Effects",
        "collection": "sound-effects",
        "slug": "ambient-background-drones",
        "description": "30 ambient drone soundscapes for video editing. Cinematic backgrounds, tension builders, and atmospheric pads for documentaries, vlogs, and films.",
        "features": [
            "30 ambient drones",
            "Cinematic backgrounds",
            "Tension builders",
            "Atmospheric pads",
            "Royalty-free",
            "Loopable"
        ],
        "image": "placeholder-14.svg",
        "badge": null,
        "rating": 4.0,
        "reviewCount": 38,
        "specs": ["Format: .wav & .mp3", "Bitrate: 320kbps", "Sample Rate: 48kHz", "Compatibility: Any NLE", "Installation: Drag & Drop", "File Size: 85 MB"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Manish V.","rating":4,"date":"Mar 12, 2025","comment":"Beautiful ambient drones. Perfect for documentaries.","verified":true},
            {"name":"Pooja C.","rating":5,"date":"Apr 28, 2025","comment":"Atmospheric pads add so much depth to my films.","verified":true},
            {"name":"Karan Y.","rating":3,"date":"Jun 18, 2025","comment":"Good quality but could use more variety in the pack.","verified":false}
        ]
    },
    {
        "id": 24,
        "name": "Transition Whoosh Bundle",
        "price": 1600,
        "comparePrice": 2500,
        "category": "Sound Effects",
        "collection": "sound-effects",
        "slug": "transition-whoosh-bundle",
        "description": "75 whoosh sound effects for smooth video transitions. Sweep whooshes, sub drops, airy passes, and mechanical swooshes for professional edits.",
        "features": [
            "75 whoosh sounds",
            "Sweep whooshes",
            "Sub drops",
            "Airy passes",
            "Mechanical swooshes",
            "Ready to sync"
        ],
        "image": "placeholder-15.svg",
        "badge": "Popular",
        "rating": 4.5,
        "reviewCount": 97,
        "specs": ["Format: .wav", "Bitrate: 320kbps", "Sample Rate: 48kHz", "Compatibility: Any NLE", "Installation: Drag & Drop", "File Size: 65 MB"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Siddharth L.","rating":5,"date":"Feb 2, 2025","comment":"Smooth whooshes that perfectly match my transitions.","verified":true},
            {"name":"Neha G.","rating":4,"date":"Mar 20, 2025","comment":"Great variety of sounds for any editing need.","verified":true},
            {"name":"Rohit J.","rating":5,"date":"May 10, 2025","comment":"Best whoosh pack out there! Highly recommend!","verified":true},
            {"name":"Divya N.","rating":4,"date":"Jun 22, 2025","comment":"Sub drops and sweep sounds are top quality.","verified":false}
        ]
    },
    {
        "id": 25,
        "name": "UI Notification Sound Kit",
        "price": 900,
        "comparePrice": null,
        "category": "Sound Effects",
        "collection": "sound-effects",
        "slug": "ui-notification-sound-kit",
        "description": "40 UI notification sounds for video content. Pop sounds, dings, alerts, chimes, and tech UI feedback sounds for social media and tech content.",
        "features": [
            "40 UI sounds",
            "Pop sounds",
            "Dings & alerts",
            "Chimes",
            "Tech UI feedback",
            "Social media ready"
        ],
        "image": "placeholder-8.svg",
        "badge": null,
        "rating": 3.6,
        "reviewCount": 22,
        "specs": ["Format: .wav & .mp3", "Bitrate: 320kbps", "Sample Rate: 48kHz", "Compatibility: Any NLE", "Installation: Drag & Drop", "File Size: 15 MB"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Ananya P.","rating":4,"date":"Feb 28, 2025","comment":"Cute notification sounds for my tech channel.","verified":true},
            {"name":"Vikram R.","rating":3,"date":"Apr 18, 2025","comment":"Decent pack, works as described. Good for beginners.","verified":true},
            {"name":"Amit B.","rating":4,"date":"Jun 5, 2025","comment":"Good UI sounds for social media content.","verified":false}
        ]
    },
    {
        "id": 26,
        "name": "Neon Title Presets",
        "price": 1900,
        "comparePrice": 2600,
        "category": "Presets",
        "collection": "presets",
        "slug": "neon-title-presets",
        "description": "25 neon glow title presets for Premiere Pro. Cyberpunk-style animated text with customizable colors, glow intensity, and flicker effects.",
        "features": [
            "25 neon titles",
            "Custom colors",
            "Glow intensity control",
            "Flicker effects",
            "Cyberpunk style",
            "MOGR format"
        ],
        "image": "placeholder-11.svg",
        "badge": "Popular",
        "rating": 4.5,
        "reviewCount": 83,
        "specs": ["Format: .mogrt", "Resolution: 4K/HD", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 10 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Rahul K.","rating":5,"date":"Feb 12, 2025","comment":"Neon titles are fire! Perfect for my cyberpunk project.","verified":true},
            {"name":"Priya S.","rating":4,"date":"Apr 2, 2025","comment":"Customizable colors and glow effects are great.","verified":true},
            {"name":"Arjun M.","rating":5,"date":"May 16, 2025","comment":"Incredible value for money. Highly recommend!","verified":true},
            {"name":"Sneha T.","rating":4,"date":"Jun 30, 2025","comment":"Flicker effects look amazing. Easy to use.","verified":false}
        ]
    },
    {
        "id": 27,
        "name": "Vintage Film LUTs Collection",
        "price": 2500,
        "comparePrice": null,
        "category": "Presets",
        "collection": "presets",
        "slug": "vintage-film-luts-collection",
        "description": "30 vintage film LUTs for Premiere Pro. Kodachrome, Fujifilm, and expired film stock emulations with authentic color shifts and grain matching.",
        "features": [
            "30 vintage LUTs",
            "Kodachrome emulation",
            "Fujifilm emulation",
            "Expired film stock",
            "Grain matching",
            "Tutorial included"
        ],
        "image": "placeholder-9.svg",
        "badge": "Best Seller",
        "rating": 4.8,
        "reviewCount": 162,
        "specs": ["Format: .cube & .look", "Resolution: 4K/HD", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 18 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Kavya D.","rating":5,"date":"Jan 28, 2025","comment":"Authentic film emulsions! Kodachrome look is perfect.","verified":true},
            {"name":"Rohit J.","rating":5,"date":"Mar 14, 2025","comment":"Incredible vintage LUTs. Grain matching is spot on.","verified":true},
            {"name":"Deepak S.","rating":4,"date":"Apr 29, 2025","comment":"Great collection of film stock emulations.","verified":true},
            {"name":"Shruti A.","rating":5,"date":"Jun 12, 2025","comment":"Absolute must-have for filmmakers!","verified":true},
            {"name":"Harsh W.","rating":5,"date":"Jul 10, 2025","comment":"Transformed my video production value completely.","verified":false}
        ]
    },
    {
        "id": 28,
        "name": "HDR Transition Effects Pack",
        "price": 1800,
        "comparePrice": 2500,
        "category": "Presets",
        "collection": "presets",
        "slug": "hdr-transition-effects-pack",
        "description": "50 HDR transition effects for Premiere Pro. Light leaks, lens flares, chromatic aberration, and bloom transitions with vibrant high-dynamic-range rendering.",
        "features": [
            "50 HDR transitions",
            "Light leaks",
            "Lens flares",
            "Chromatic aberration",
            "Bloom effects",
            "4K ready"
        ],
        "image": "product-glow.svg",
        "badge": "Best Seller",
        "rating": 4.6,
        "reviewCount": 128,
        "specs": ["Format: .mogrt", "Resolution: 4K", "Compatibility: Premiere Pro CC+", "Installation: Drag & Drop", "File Size: 22 MB", "License: Lifetime"],
        "stock": "In Stock",
        "reviews": [
            {"name":"Manish V.","rating":5,"date":"Feb 5, 2025","comment":"Stunning HDR transitions! Light leaks are gorgeous.","verified":true},
            {"name":"Pooja C.","rating":4,"date":"Mar 29, 2025","comment":"Great variety of transition effects. Worth every rupee.","verified":true},
            {"name":"Karan Y.","rating":5,"date":"May 15, 2025","comment":"Lens flares and bloom effects are top notch.","verified":true},
            {"name":"Ananya P.","rating":4,"date":"Jul 3, 2025","comment":"Really impressive quality. Customer support was very helpful.","verified":false}
        ]
    }
];

var Store = {
  products: [],
  _callback: null,
  _realtimeSubscribed: false,

  init: function(callback) {
    var self = this;
    self._callback = callback;
    self._loadFromSupabase(callback);
    self._setupRealtime();
  },

  _loadFromSupabase: function(callback) {
    var self = this;
    if (typeof SupabaseClient === 'undefined' || !SupabaseClient.getClient()) {
      self._loadFromLocal(callback);
      return;
    }
    var timedOut = false;
    var timer = setTimeout(function() { timedOut = true; self._loadFromLocal(callback); }, 3000);
    SupabaseClient.db.products().select('*').then(function(result) {
      if (timedOut) return;
      clearTimeout(timer);
      if (result.error || !result.data || !result.data.length) {
        self._loadFromLocal(callback);
        return;
      }
      // Map Supabase rows to frontend format, merging with PRODUCTS_DATA defaults
      var merged = result.data.map(function(p) {
        var builtIn = PRODUCTS_DATA.find(function(b) { return b.id === p.legacy_id; });
        return {
          id: p.legacy_id || p.id,
          supabaseId: p.id,
          legacy_id: p.legacy_id,
          name: p.name,
          slug: p.slug,
          price: p.price,
          comparePrice: p.compare_at_price,
          currency: p.currency || 'INR',
          category: p.category,
          collection: p.collection || (p.category ? p.category.toLowerCase().replace(/\s+/g, '-') : 'uncategorized'),
          description: p.description,
          features: p.features || [],
          images: p.images || [],
          image: p.images && p.images.length > 0 ? p.images[0] : null,
          badge: p.badge,
          in_stock: p.in_stock !== false,
          stock: p.in_stock !== false ? 'In Stock' : 'Out of Stock',
          rating: builtIn ? builtIn.rating : 4.0,
          reviewCount: builtIn ? builtIn.reviewCount : 0,
          specs: builtIn ? builtIn.specs : ['Digital download'],
          reviews: builtIn ? builtIn.reviews : [],
          productFile: null
        };
      });
      // Overlay custom products from localStorage
      try {
        var custom = JSON.parse(localStorage.getItem('ab_custom_products'));
        if (custom && custom.length) {
          custom.forEach(function(cp) {
            var idx = merged.findIndex(function(p) {
              return (p.supabaseId && cp.supabaseId && String(p.supabaseId) === String(cp.supabaseId)) ||
                     (p.legacy_id && !isNaN(Number(cp.id)) && Number(p.legacy_id) === Number(cp.id)) ||
                     String(p.id) === String(cp.id);
            });
            if (idx > -1) {
              // Preserve supabaseId from Supabase data
              cp.supabaseId = merged[idx].supabaseId;
              merged[idx] = cp;
            } else merged.push(cp);
          });
        }
      } catch(e) {}
      try {
        var deleted = JSON.parse(localStorage.getItem('ab_deleted_products')) || [];
        if (deleted.length) {
          merged = merged.filter(function(p) {
            return deleted.indexOf(p.id) === -1 &&
                   deleted.indexOf(String(p.id)) === -1 &&
                   deleted.indexOf(p.legacy_id) === -1;
          });
        }
      } catch(e) {}
      self.products = merged;
      window.__PRODUCTS__ = merged;
      if (callback) callback(merged);
    }).catch(function() {
      if (!timedOut) { clearTimeout(timer); self._loadFromLocal(callback); }
    });
  },

  _setupRealtime: function() {
    var self = this;
    if (typeof SupabaseClient === 'undefined' || !SupabaseClient.getClient()) return;
    if (self._realtimeSubscribed) return;
    self._realtimeSubscribed = true;
    try {
      SupabaseClient.subscribeProducts(function() {
        self._loadFromSupabase(self._callback);
      });
    } catch(e) {
      console.warn('Realtime subscription failed, products will not auto-sync:', e);
    }
  },

  _loadFromLocal: function(callback) {
    var self = this;
    var merged = PRODUCTS_DATA.slice();
    try {
      var custom = JSON.parse(localStorage.getItem('ab_custom_products'));
      if (custom && custom.length) {
        custom.forEach(function(cp) {
          var idx = merged.findIndex(function(p) { return String(p.id) === String(cp.id); });
          if (idx > -1) merged[idx] = cp;
          else merged.push(cp);
        });
      }
    } catch(e) {}
    try {
      var deleted = JSON.parse(localStorage.getItem('ab_deleted_products')) || [];
      if (deleted.length) {
        merged = merged.filter(function(p) { return deleted.indexOf(p.id) === -1 && deleted.indexOf(String(p.id)) === -1; });
      }
    } catch(e) {}
    self.products = merged;
    window.__PRODUCTS__ = merged;
    if (callback) callback(merged);
  },

  getAll: function() {
    return this.products;
  },

  getByCollection: function(collection) {
    return this.products.filter(function(p) { return p.collection === collection; });
  },

  getBySlug: function(slug) {
    return this.products.find(function(p) { return p.slug === slug; });
  },

  getById: function(id) {
    return this.products.find(function(p) { return String(p.id) === String(id); });
  },

  getByBadge: function(badge) {
    return this.products.filter(function(p) { return p.badge === badge; });
  },

  search: function(query) {
    var q = query.toLowerCase().trim();
    if (!q) return [];
    return this.products.filter(function(p) {
      return p.name.toLowerCase().includes(q) ||
             p.description.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q) ||
             (p.features && p.features.some(function(f) { return f.toLowerCase().includes(q); }));
    });
  }
};

var Wishlist = {
  items: [],
  _ready: false,
  init: function() {
    try { this.items = JSON.parse(localStorage.getItem('ab_wishlist')) || []; } catch(e) { this.items = []; }
    this._ready = true;
  },
  save: function() { localStorage.setItem('ab_wishlist', JSON.stringify(this.items)); },
  add: function(product) {
    if (!this._ready) this.init();
    if (!this.items.find(function(i) { return i.id === product.id; })) {
      this.items.push({ id: product.id, slug: product.slug, name: product.name, price: product.price, image: product.image || (product.images ? product.images[0] : 'placeholder.svg') });
      this.save();
      if (typeof Toast !== 'undefined') Toast.show('Added to Wishlist');
      return true;
    }
    return false;
  },
  remove: function(id) {
    if (!this._ready) this.init();
    this.items = this.items.filter(function(i) { return i.id !== id; });
    this.save();
    if (typeof Toast !== 'undefined') Toast.show('Removed from Wishlist');
  },
  toggle: function(product) {
    if (!this._ready) this.init();
    var idx = this.items.findIndex(function(i) { return i.id === product.id; });
    if (idx > -1) { this.remove(product.id); return false; }
    else { this.add(product); return true; }
  },
  has: function(id) {
    if (!this._ready) this.init();
    return this.items.some(function(i) { return i.id === id; });
  },
  count: function() {
    if (!this._ready) this.init();
    return this.items.length;
  }
};

function buyNow(product) {
  var goToCheckout = function() {
    var items = Cart.getItems();
    if (!items.find(function(i) { return i.id === product.id; })) {
      Cart.add({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image || (product.images ? product.images[0] : 'placeholder.svg'),
        quantity: parseInt(document.getElementById('qtySelector')?.value) || 1,
        currency: product.currency || 'INR'
      });
    }
    window.location.href = Cart.checkoutPath();
  };
  if (typeof Auth !== 'undefined') {
    Auth.require(goToCheckout);
    return;
  }
  goToCheckout();
}

function navigateToProduct(slug) {
  if (!slug) return;
  var isSubdir = window.location.pathname.indexOf('/collections/') > -1 || window.location.pathname.indexOf('/policy/') > -1;
  var prefix = isSubdir ? '../' : '';
  var transition = document.getElementById('pageTransition');
  if (transition) {
    transition.style.transform = 'translateY(0)';
    transition.style.pointerEvents = 'auto';
    setTimeout(function() { window.location.href = prefix + 'product.html?slug=' + slug; }, 300);
  } else {
    window.location.href = prefix + 'product.html?slug=' + slug;
  }
}

function resolveImage(product) {
  var img = null;
  if (product.images && product.images.length > 0) img = product.images[0];
  else if (product.image) img = product.image;
  if (!img) return 'placeholder.svg';
  return img;
}

function resolveImageSrc(image) {
  if (!image) return 'placeholder.svg';
  if (image.indexOf('://') > -1 || image.indexOf('//') === 0 || image.indexOf('data:') === 0) return image;
  return 'assets/images/' + image;
}

function fullImagePath(product) {
  return resolveImageSrc(resolveImage(product));
}

function openQuickView(product) {
  var overlay = document.getElementById('qvOverlay');
  if (!overlay || !product) return;

  document.getElementById('qvName').textContent = product.name;

  var priceEl = document.getElementById('qvPrice');
  var prodCurrency = product.currency || 'INR';
  priceEl.setAttribute('data-amount', product.price);
  priceEl.setAttribute('data-currency', prodCurrency);
  if (product.price === 0) {
    priceEl.textContent = typeof Translator !== 'undefined' ? Translator.t('Free') : 'Free';
    priceEl.className = 'qv-price free';
  } else {
    priceEl.textContent = typeof Locale !== 'undefined' ? Locale.formatPrice(product.price, prodCurrency) : 'Rs. ' + product.price.toLocaleString('en-IN') + '.00';
    priceEl.className = 'qv-price';
  }

  var compareEl = document.getElementById('qvCompare');
  if (product.comparePrice && product.comparePrice > product.price) {
    compareEl.style.display = '';
    compareEl.innerHTML = '<s>Rs. ' + product.comparePrice.toLocaleString('en-IN') + '.00</s> <span>' + Math.round((1 - product.price / product.comparePrice) * 100) + '% OFF</span>';
  } else {
    compareEl.style.display = 'none';
  }

  var colorsEl = document.getElementById('qvColors');
  colorsEl.innerHTML = '';
  if (product.colors && product.colors.length > 0) {
    product.colors.forEach(function(c) {
      var swatch = document.createElement('span');
      swatch.style.background = c;
      colorsEl.appendChild(swatch);
    });
  }

  document.getElementById('qvDesc').textContent = product.description || '';

  var featuresEl = document.getElementById('qvFeatures');
  featuresEl.innerHTML = '';
  if (product.features) {
    product.features.forEach(function(f) {
      var li = document.createElement('li');
      li.textContent = f;
      featuresEl.appendChild(li);
    });
  }

  var allImages = [];
  if (product.images && product.images.length) allImages = product.images;
  else if (product.image) allImages = [product.image];
  else allImages = ['placeholder.svg'];

  var mainImg = document.getElementById('qvImage');
  mainImg.src = resolveImageSrc(allImages[0]);
  mainImg.alt = product.name;

  var thumbs = document.getElementById('qvThumbs');
  thumbs.innerHTML = '';
  if (allImages.length > 1) {
    allImages.forEach(function(img, idx) {
      var thumb = document.createElement('img');
      thumb.src = resolveImageSrc(img);
      thumb.className = idx === 0 ? 'active' : '';
      thumb.addEventListener('click', function() {
        mainImg.src = resolveImageSrc(img);
        thumbs.querySelectorAll('img').forEach(function(t) { t.className = ''; });
        thumb.className = 'active';
      });
      thumbs.appendChild(thumb);
    });
  }

  var addBtn = document.getElementById('qvAddToCart');
  addBtn.onclick = function() {
    Cart.add({
      id: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.image || (product.images ? product.images[0] : 'placeholder.svg'),
      currency: product.currency || 'INR'
    });
  };

  var viewLink = document.getElementById('qvViewLink');
  var isSubdir = window.location.pathname.indexOf('/collections/') > -1 || window.location.pathname.indexOf('/policy/') > -1;
  viewLink.querySelector('a').href = (isSubdir ? '../' : '') + 'product.html?slug=' + product.slug;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  var overlay = document.getElementById('qvOverlay');
  if (overlay) {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('click', function(e) {
    var qvBtn = e.target.closest('.quick-view-btn');
    if (qvBtn) {
      e.preventDefault();
      var slug = qvBtn.getAttribute('data-slug');
      if (slug && window.__PRODUCTS__) {
        var prod = window.__PRODUCTS__.find(function(p) { return p.slug === slug; });
        if (prod) openQuickView(prod);
      }
      return;
    }

    var cardImg = e.target.closest('[data-quickview] .product-card-image');
    if (cardImg) {
      e.preventDefault();
      var card = cardImg.closest('[data-quickview]');
      var slug = card.getAttribute('data-quickview');
      if (slug) navigateToProduct(slug);
      return;
    }

    if (e.target.closest('#qvClose') || e.target.closest('#qvOverlay.active') && e.target === e.target.closest('#qvOverlay')) {
      closeQuickView();
    }
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeQuickView();
  });
});

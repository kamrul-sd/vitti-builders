export type Language = 'en' | 'bn';

export const translations = {
  en: {
    nav: {
      home: "Home",
      projects: "Projects",
      landShare: "Land Share",
      landowners: "Landowners",
      about: "About Us",
      contact: "Contact Us"
    },
    hero: {
      apartmentsTitle: "Luxury Living Redefined",
      apartmentsDesc: "Find your dream home in Dhaka's most premium locations, built with outstanding craftsmanship.",
      landTitle: "Secure Land Shares",
      landDesc: "Invest in high-growth plots of land with fully verified ownership and developer security.",
      commercialTitle: "World-Class Business Spaces",
      commercialDesc: "Establish your corporate address in modern high-rise commercial plazas.",
      ctaInquire: "Inquire Now",
      ctaPartner: "Partner With Us"
    },
    services: {
      title: "Our Core Services",
      subtitle: "Delivering structural stability, design excellence, and transparent property solutions across Bangladesh.",
      apartments: "Premium Apartments",
      apartmentsDesc: "Aesthetically designed residential flats with modern amenities, robust safety, and optimized space.",
      land: "Land Share Development",
      landDesc: "Secure and profitable land share purchases with crystal-clear legal documentation and plot allotment.",
      ventures: "Joint-Venture Partnership",
      venturesDesc: "Mutually beneficial partnerships for landowners offering maximum returns, premium structures, and legal peace of mind."
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Explore our collection of ongoing, upcoming, and completed residential and commercial landmarks.",
      all: "All Projects",
      ongoing: "Ongoing",
      upcoming: "Upcoming",
      completed: "Completed",
      location: "Location",
      type: "Type",
      size: "Size / Area",
      price: "Share Value",
      viewDetails: "Inquire Details",
      status: {
        ongoing: "Ongoing",
        upcoming: "Upcoming",
        completed: "Completed"
      },
      types: {
        apartment: "Residential Flat",
        land: "Land Share",
        commercial: "Commercial Space"
      }
    },
    landowner: {
      title: "Landowner Joint Venture Portal",
      subtitle: "Turn your property into a modern architectural landmark. We partner with landowners for premier development.",
      whyUs: "Why Partner With Vitti Builders?",
      reason1Title: "Premium Engineering",
      reason1Desc: "State-of-the-art structural designs under expert supervision of civil, electrical, and mechanical engineers.",
      reason2Title: "Absolute Transparency",
      reason2Desc: "Clear joint-venture deeds with zero hidden clauses and fair share allocation.",
      reason3Title: "Legal Compliance",
      reason3Desc: "Strict adherence to the Companies Act 1994 and local building codes (RAJUK/concerned authorities).",
      formTitle: "Submit Your Land Details",
      formSubtitle: "Our property acquisition team will review and contact you within 48 hours.",
      name: "Landowner Name",
      phone: "Mobile Number",
      email: "Email Address",
      location: "Land Location (Area, Road Name)",
      size: "Land Size (e.g. 5 Katha, 10 Decimal)",
      roadWidth: "Front Road Width (e.g. 20 feet)",
      notes: "Additional Details / Features",
      submit: "Submit Proposal",
      success: "Thank you! Your proposal has been submitted successfully. Our team will contact you soon."
    },
    about: {
      title: "About Vitti Builders Limited",
      subtitle: "Building the foundation of tomorrow's living standards in Bangladesh.",
      desc1: "Vitti Builders Limited is a premier real-estate, land development, and construction company incorporated in Bangladesh under the Companies Act 1994 (Authorized Capital: Tk. 2,000,000/- split into 200,000 shares). The word 'Vitti' signifies foundation—a testament to our commitment to building structurally sound, aesthetically superior, and legally immaculate residential and commercial spaces.",
      desc2: "We specialize in constructing multi-storied residential apartments, developing commercial plazas, and arranging secure land shares. With deep expertise in engineering supervision (Civil, Electrical, and Mechanical) and premium interior/exterior designs, we ensure every project reflects standard quality and builds generational value.",
      leadership: "Board of Directors",
      directors: [
        {
          name: "Khandaker Ruhul Islam",
          role: "Chairman",
          bio: "Lead strategist and investor, directing corporate policy and building materials acquisition with over two decades of industry leadership."
        },
        {
          name: "Md. Abu Kawsar Khan",
          role: "Managing Director",
          bio: "Steers day-to-day operations, project execution, and engineering collaborations, ensuring structural integrity and on-time delivery."
        },
        {
          name: "Mashoud Hossain Pathan",
          role: "Director",
          bio: "Oversees land sourcing, legal compliance, joint-venture relations, and land shares allocation with meticulous regulatory checkups."
        }
      ]
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Contact us for inquiries, property visits, or partnership discussion.",
      office: "Registered Office",
      address: "Dhaka, Bangladesh",
      phone: "Phone / Mobile",
      email: "Email Address",
      formTitle: "Send Us a Message",
      name: "Your Name",
      interest: "I am interested in",
      interestOptions: {
        flat: "Buying a Flat / Apartment",
        share: "Buying Land Shares",
        joint: "Joint-Venture Development",
        other: "Other Inquiries"
      },
      msg: "Your Message",
      submit: "Send Message",
      success: "Message sent! We will get back to you shortly."
    },
    inquiryModal: {
      title: "Project Inquiry",
      subtitle: "Fill out the form below to receive pricing, floor plans, and share options for",
      submit: "Submit Inquiry",
      success: "Inquiry submitted successfully! A representative will call you shortly."
    }
  },
  bn: {
    nav: {
      home: "হোম",
      projects: "প্রকল্পসমূহ",
      landShare: "জমির শেয়ার",
      landowners: "ভূমির মালিক",
      about: "আমাদের সম্পর্কে",
      contact: "যোগাযোগ"
    },
    hero: {
      apartmentsTitle: "অভিজাত জীবনযাত্রার নতুন সংজ্ঞা",
      apartmentsDesc: "ঢাকার সেরা লোকেশনগুলোতে নান্দনিক নির্মাণ ও আধুনিক সুযোগ-সুবিধা সম্পন্ন আপনার স্বপ্নের ফ্ল্যাট খুঁজে নিন।",
      landTitle: "নিরাপদ জমির শেয়ার",
      landDesc: "শতভাগ যাচাইকৃত কাগজপত্র ও ডেভেলপারের পূর্ণ নিরাপত্তা সহ দ্রুত বর্ধনশীল জমিতে শেয়ার ক্রয়ের সুযোগ।",
      commercialTitle: "বিশ্বমানের ব্যবসায়িক স্থান",
      commercialDesc: "আধুনিক বাণিজ্যিক টাওয়ারে আপনার কর্পোরেট অফিসের ঠিকানা নিশ্চিত করুন।",
      ctaInquire: "অনুসন্ধান করুন",
      ctaPartner: "যৌথ উদ্যোগ"
    },
    services: {
      title: "আমাদের প্রধান সেবাসমূহ",
      subtitle: "বাংলাদেশে আধুনিক ডিজাইন ও কাঠামোগত নিরাপত্তা নিশ্চিত করে স্বচ্ছ রিয়েল এস্টেট সেবা প্রদান করা আমাদের লক্ষ্য।",
      apartments: "প্রিমিয়াম অ্যাপার্টমেন্ট",
      apartmentsDesc: "নান্দনিক ডিজাইন, আধুনিক সুযোগ-সুবিধা ও সর্বোচ্চ নিরাপত্তা সহ তৈরি আমাদের প্রতিটি ফ্ল্যাট বা অ্যাপার্টমেন্ট।",
      land: "ভূমি উন্নয়ন ও শেয়ার",
      landDesc: "আইনি জটিলতামুক্ত কাগজপত্র এবং প্লটের সুষম বণ্টন সহ লাভজনক ও নিরাপদ জমির শেয়ার ক্রয়ের ব্যবস্থা।",
      ventures: "যৌথ উদ্যোগে ভূমি উন্নয়ন",
      venturesDesc: "ভূমির মালিকদের জন্য সর্বোচ্চ শেয়ার ভ্যালু, উন্নত ইঞ্জিনিয়ারিং ও আইনি স্বচ্ছতার সাথে একটি লাভজনক পার্টনারশিপ।"
    },
    projects: {
      title: "আমাদের প্রকল্পসমূহ",
      subtitle: "চলতি, আসন্ন এবং সম্পন্ন হওয়া আমাদের নান্দনিক আবাসিক ও বাণিজ্যিক ভবনগুলোর বিবরণ দেখুন।",
      all: "সব প্রকল্প",
      ongoing: "চলমান",
      upcoming: "আসন্ন",
      completed: "সম্পন্ন",
      location: "অবস্থান",
      type: "ধরণ",
      size: "সাইজ / আয়তন",
      price: "শেয়ারের মূল্য",
      viewDetails: "বিস্তারিত জানুন",
      status: {
        ongoing: "চলমান",
        upcoming: "আসন্ন",
        completed: "সম্পন্ন"
      },
      types: {
        apartment: "আবাসিক ফ্ল্যাট",
        land: "জমির শেয়ার",
        commercial: "বাণিজ্যিক স্পেস"
      }
    },
    landowner: {
      title: "ভূমির মালিকদের জন্য যৌথ উদ্যোগ",
      subtitle: "আপনার মূল্যবান জমিকে আধুনিক স্থাপত্যের অন্যতম নিদর্শনে রূপান্তর করুন। আমরা সর্বোচ্চ গুরুত্ব দিয়ে ডেভেলপ করি।",
      whyUs: "কেন ভিত্তি বিল্ডার্স লিমিটেডকে বেছে নেবেন?",
      reason1Title: "প্রিমিয়াম ইঞ্জিনিয়ারিং",
      reason1Desc: "সিভিল, ইলেকট্রিক্যাল এবং মেকানিক্যাল ইঞ্জিনিয়ারদের দক্ষ তত্ত্বাবধানে আধুনিক ও ভূমিকম্প-সহনশীল ডিজাইন।",
      reason2Title: "শতভাগ স্বচ্ছতা",
      reason2Desc: "কোনো গোপন শর্ত ছাড়াই চুক্তি স্বাক্ষর এবং শেয়ারের ন্যায্য ও সুনির্দিষ্ট বণ্টন ব্যবস্থা।",
      reason3Title: "আইনি বাধ্যবাধকতা",
      reason3Desc: "কোম্পানি আইন ১৯৯৪ এবং রাজউক (RAJUK) সহ সংশ্লিষ্ট সকল সরকারি কর্তৃপক্ষের নির্দেশনা মেনে শতভাগ আইনি স্বচ্ছতা।",
      formTitle: "আপনার জমির বিবরণ দিন",
      formSubtitle: "আমাদের ল্যান্ড একুইজিশন টিম আপনার জমি সম্পর্কিত তথ্যগুলো পর্যালোচনা করে ৪৮ ঘণ্টার মধ্যে যোগাযোগ করবে।",
      name: "জমির মালিকের নাম",
      phone: "মোবাইল নম্বর",
      email: "ইমেইল ঠিকানা",
      location: "জমির অবস্থান (এলাকা, রোডের নাম)",
      size: "জমির পরিমাণ (যেমন: ৫ কাঠা বা ১০ শতাংশ)",
      roadWidth: "সামনের রাস্তার প্রশস্ততা (যেমন: ২০ ফুট)",
      notes: "অতিরিক্ত তথ্য / বিবরণ",
      submit: "প্রস্তাবনা জমা দিন",
      success: "ধন্যবাদ! আপনার প্রস্তাবনাটি সফলভাবে জমা হয়েছে। আমাদের প্রতিনিধি দ্রুত আপনার সাথে যোগাযোগ করবেন।"
    },
    about: {
      title: "ভিত্তি বিল্ডার্স লিমিটেড সম্পর্কে",
      subtitle: "আগামী দিনের বাসস্থানের ভিত্তি গড়ছি আজই।",
      desc1: "ভিত্তি বিল্ডার্স লিমিটেড কোম্পানি আইন ১৯৯৪ (অনুমোদিত মূলধন: ২ কোটি টাকা, ২ লক্ষ সাধারণ শেয়ারে বিভক্ত) এর অধীনে নিবন্ধিত বাংলাদেশের একটি শীর্ষস্থানীয় রিয়েল এস্টেট, ভূমি উন্নয়ন ও নির্মাণকারী প্রতিষ্ঠান। 'ভিত্তি' শব্দের অর্থ ভিত্তি বা গোড়াপত্তন—যা কাঠামোগতভাবে নিরাপদ, নান্দনিকভাবে দৃষ্টিনন্দন এবং আইনিভাবে নিষ্কণ্টক আবাসন গড়ার প্রতি আমাদের অঙ্গীকারকে প্রতিফলিত করে।",
      desc2: "আমরা প্রধানত বহুতল আবাসিক অ্যাপার্টমেন্ট নির্মাণ, বাণিজ্যিক ভবন উন্নয়ন এবং নিরাপদ ল্যান্ড শেয়ার নিয়ে কাজ করে থাকি। সিভিল, ইলেকট্রিক্যাল এবং মেকানিক্যাল বিভাগের দক্ষ ইঞ্জিনিয়ারদের সমন্বয়ে আমাদের প্রতিটি প্রকল্প সর্বোচ্চ মানদণ্ড ও নান্দনিক ডিজাইনের প্রতি যত্নশীল থেকে তৈরি করা হয়, যা আপনার পরিবারকে দেয় নিরাপদ জীবনের নিশ্চয়তা।",
      leadership: "পরিচালনা পর্ষদ",
      directors: [
        {
          name: "খন্দকার রুহুল ইসলাম",
          role: "চেয়ারম্যান",
          bio: "কর্পোরেট নীতি নির্ধারণ, কৌশল উন্নয়ন ও নির্মাণ সামগ্রীর গুনগত মান নিশ্চিত করতে দুই দশকেরও বেশি অভিজ্ঞতাসম্পন্ন সফল ব্যবসায়ী।"
        },
        {
          name: "মোঃ আবু কাওসার খান",
          role: "ব্যবস্থাপনা পরিচালক",
          bio: "কোম্পানির সামগ্রিক অপারেশন, প্রজেক্ট বাস্তবায়ন ও প্রযুক্তিগত দিক তত্ত্বাবধান করেন, যা নিখুঁত কাঠামোগত নিরাপত্তা নিশ্চিত করে।"
        },
        {
          name: "মাশহুদ হোসাইন পাঠান",
          role: "পরিচালক",
          bio: "নতুন ভূমির সন্ধান, আইনি নথিপত্র যাচাইকরণ, যৌথ উদ্যোগের সম্পর্ক রক্ষণাবেক্ষণ এবং জমির শেয়ার বণ্টনের দায়িত্ব নিবিড়ভাবে পালন করেন।"
        }
      ]
    },
    contact: {
      title: "যোগাযোগ করুন",
      subtitle: "যেকোনো অনুসন্ধান, প্রজেক্ট পরিদর্শনের অনুরোধ বা যৌথ উদ্যোগ নিয়ে কথা বলতে যোগাযোগ করুন।",
      office: "নিবন্ধিত কার্যালয়",
      address: "ঢাকা, বাংলাদেশ",
      phone: "ফোন / মোবাইল",
      email: "ইমেইল ঠিকানা",
      formTitle: "আমাদের বার্তা পাঠান",
      name: "আপনার নাম",
      interest: "আপনি আগ্রহী",
      interestOptions: {
        flat: "ফ্ল্যাট / অ্যাপার্টমেন্ট ক্রয়ে",
        share: "জমির শেয়ার ক্রয়ে",
        joint: "যৌথ উদ্যোগে প্রজেক্ট ডেভেলপমেন্ট",
        other: "অন্যান্য জিজ্ঞাসা"
      },
      msg: "আপনার বার্তা",
      submit: "বার্তা পাঠান",
      success: "বার্তা পাঠানো হয়েছে! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।"
    },
    inquiryModal: {
      title: "প্রকল্পের অনুসন্ধান",
      subtitle: "মূল্যতালিকা, ফ্লোর প্ল্যান এবং শেয়ারের সুনির্দিষ্ট তথ্য পেতে ফরমটি পূরণ করুন। প্রকল্প:",
      submit: "তথ্য পাঠান",
      success: "অনুসন্ধান সফলভাবে জমা হয়েছে! আমাদের একজন প্রতিনিধি আপনাকে কল করবেন।"
    }
  }
};

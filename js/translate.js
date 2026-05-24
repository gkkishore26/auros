var Translator = {
  currentLang: 'en',
  _mutObs: null,

  dict: {
    ta: {
      // Header / Navigation
      'Products': 'தயாரிப்புகள்',
      'Presets': 'ப்ரீசெட்கள்',
      'Motion Graphic Templates': 'மோஷன் கிராஃபிக் டெம்ப்ளேட்டுகள்',
      'Free Assets': 'இலவச சொத்துக்கள்',
      'Tutorial Assets': 'பயிற்சி சொத்துக்கள்',
      'Project Files': 'திட்ட கோப்புகள்',
      'Sound Effects': 'ஒலி விளைவுகள்',
      'Best Sellers': 'சிறந்த விற்பனையாளர்கள்',

      // Language / Currency
      'English': 'ஆங்கிலம்',
      'INR (₹)': 'இந்திய ரூபாய் (₹)',
      'USD ($)': 'அமெரிக்க டாலர் ($)',
      'JPY (¥)': 'ஜப்பானிய யென் (¥)',
      'EUR (€)': 'யூரோ (€)',
      'GBP (£)': 'பவுண்ட் (£)',
      'India (INR ₹)': 'இந்தியா (இந்திய ரூபாய் ₹)',
      'United States (USD $)': 'அமெரிக்கா (அமெரிக்க டாலர் $)',
      'Japan (JPY ¥)': 'ஜப்பான் (ஜப்பானிய யென் ¥)',
      'Germany (EUR €)': 'ஜெர்மனி (யூரோ €)',
      'United Kingdom (GBP £)': 'இங்கிலாந்து (பவுண்ட் £)',

      // Index page
      'Premium E-Products for Creators & Professionals': 'படைப்பாளிகள் மற்றும் நிபுணர்களுக்கான பிரீமியம் மின்-தயாரிப்புகள்',
      'Professional presets, motion graphics & project files': 'தொழில்முறை ப்ரீசெட்கள், மோஷன் கிராஃபிக்ஸ் மற்றும் திட்ட கோப்புகள்',
      'High-quality digital assets for every creative need': 'ஒவ்வொரு படைப்புத் தேவைக்கும் உயர்தர டிஜிட்டல் சொத்துக்கள்',
      'Best-in-class E-products at unbeatable value': 'ஈடு இல்லாத மதிப்பில் சிறந்த மின்-தயாரிப்புகள்',
      'Home': 'முகப்பு',
      'My Account': 'என் கணக்கு',
      'Checkout': 'செக் அவுட்',
      'Log In': 'உள்நுழைய',
      'Logout': 'வெளியேறு',
      'Sign Up': 'பதிவு செய்க',
      'Create Account': 'கணக்கை உருவாக்கு',
      'Create Account': 'கணக்கை உருவாக்கு',

      // Auth
      'Welcome': 'வரவேற்கிறோம்',
      'Log in to your account or create a new one.': 'உங்கள் கணக்கில் உள்நுழையவும் அல்லது புதியதை உருவாக்கவும்.',
      'Email': 'மின்னஞ்சல்',
      'Password': 'கடவுச்சொல்',
      'Enter your email': 'உங்கள் மின்னஞ்சலை உள்ளிடவும்',
      'Enter your password': 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
      'Full Name': 'முழு பெயர்',
      'Enter your full name': 'உங்கள் முழு பெயரை உள்ளிடவும்',
      'Confirm Password': 'கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      'Confirm your password': 'உங்கள் கடவுச்சொல்லை உறுதிப்படுத்தவும்',
      'Create a password (min 6 characters)': 'கடவுச்சொல்லை உருவாக்கவும் (குறைந்தது 6 எழுத்துகள்)',
      'By creating an account, you agree to our': 'கணக்கை உருவாக்குவதன் மூலம், நீங்கள் எங்கள்',
      'Terms': 'விதிமுறைகளை',
      'Privacy Policy': 'தனியுரிமைக் கொள்கையை',
      'and': 'மற்றும்',
      'OR': 'அல்லது',
      'Please enter your email.': 'உங்கள் மின்னஞ்சலை உள்ளிடவும்.',
      'Please enter your password.': 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்.',
      'Please enter your full name.': 'உங்கள் முழு பெயரை உள்ளிடவும்.',
      'Password must be at least 6 characters.': 'கடவுச்சொல் குறைந்தது 6 எழுத்துகளாக இருக்க வேண்டும்.',
      'Passwords do not match.': 'கடவுச்சொற்கள் பொருந்தவில்லை.',
      'An account with this email already exists.': 'இந்த மின்னஞ்சலுடன் ஏற்கனவே ஒரு கணக்கு உள்ளது.',
      'No account found with this email.': 'இந்த மின்னஞ்சலுடன் கணக்கு எதுவும் இல்லை.',
      'Incorrect password. Please try again.': 'தவறான கடவுச்சொல். மீண்டும் முயற்சிக்கவும்.',

      // Account page
      'My Profile': 'என் சுயவிவரம்',
      'My Orders': 'என் ஆர்டர்கள்',
      'Wishlist': 'விருப்பப்பட்டியல்',
      'Saved Addresses': 'சேமித்த முகவரிகள்',
      'Name': 'பெயர்',
      'Save Changes': 'மாற்றங்களை சேமிக்கவும்',
      'You need to be logged in to view your account.': 'உங்கள் கணக்கைப் பார்க்க உள்நுழைய வேண்டும்.',
      'Please log in': 'தயவுசெய்து உள்நுழைக',
      'No orders yet.': 'இதுவரை ஆர்டர்கள் இல்லை.',
      'Your wishlist is empty.': 'உங்கள் விருப்பப்பட்டியல் காலியாக உள்ளது.',
      'No saved addresses.': 'சேமித்த முகவரிகள் இல்லை.',
      '+ Add Address': '+ முகவரியைச் சேர்க்கவும்',
      'Log in to your account': 'உங்கள் கணக்கில் உள்நுழைக',
      'You need to be logged in to place an order.': 'ஆர்டர் செய்ய உள்நுழைய வேண்டும்.',
      'Your cart is empty.': 'உங்கள் கார்ட் காலியாக உள்ளது.',
      'Browse products': 'தயாரிப்புகளை உலாவுக',

      // Cart
      'Cart': 'கார்ட்',
      'Add to Cart': 'கார்ட்டில் சேர்க்கவும்',
      'Remove': 'அகற்று',
      'Quantity': 'அளவு',
      'Subtotal': 'மொத்தம்',
      'Total': 'மொத்தம்',
      'Place Order': 'ஆர்டர் செய்யவும்',
      'Order placed successfully!': 'ஆர்டர் வெற்றிகரமாக வைக்கப்பட்டது!',
      'Thank you for your purchase.': 'உங்கள் வாங்குதலுக்கு நன்றி.',
      'Download': 'பதிவிறக்கம்',

      // Footer
      'Quick links': 'விரைவு இணைப்புகள்',
      'Pages': 'பக்கங்கள்',
      'FAQ': 'கேள்விகள்',
      'Contact Us': 'தொடர்பு கொள்ள',
      'About Us': 'எங்களைப் பற்றி',
      'Your account': 'உங்கள் கணக்கு',
      'All rights reserved.': 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',

      // General
      'Search': 'தேடல்',
      'Close': 'மூடு',
      'Skip to content': 'உள்ளடக்கத்திற்குச் செல்லவும்',
      'Free': 'இலவசம்',
      'Sold out': 'விற்றுத் தீர்ந்தது',
      'View Full Details': 'முழு விவரங்களைக் காண',
      'Add to wishlist': 'விருப்பப்பட்டியலில் சேர்க்கவும்',
      'Share': 'பகிர்',
      'Description': 'விளக்கம்',
      'Features': 'அம்சங்கள்',
      'You might also like': 'உங்களுக்கும் பிடிக்கலாம்',
      'Recently viewed': 'சமீபத்தில் பார்த்தவை',
      'Back': 'பின்',
      'Order': 'ஆர்டர்',
      'Date': 'தேதி',
      'Status': 'நிலை',
      'Item': 'பொருள்',

      // Product page
      'Category': 'வகை',
      'Tags': 'குறிச்சொற்கள்',
      'Compare at': 'ஒப்பீட்டு விலை',
      'Taxes calculated at checkout': 'செக் அவுட்டில் வரி கணக்கிடப்படும்',

      // Toast messages
      'Added to cart': 'கார்ட்டில் சேர்க்கப்பட்டது',
      'Removed from cart': 'கார்ட்டில் இருந்து அகற்றப்பட்டது',
      'Added to wishlist': 'விருப்பப்பட்டியலில் சேர்க்கப்பட்டது',
      'Removed from wishlist': 'விருப்பப்பட்டியலில் இருந்து அகற்றப்பட்டது',
      'Profile updated': 'சுயவிவரம் புதுப்பிக்கப்பட்டது',
      'Logged out successfully': 'வெளியேறிவிட்டீர்கள்',
      'Address saved': 'முகவரி சேமிக்கப்பட்டது',
    },

    ar: {
      'Products': 'المنتجات',
      'Presets': 'الإعدادات المسبقة',
      'Motion Graphic Templates': 'قوالب الرسوم المتحركة',
      'Free Assets': 'الأصول المجانية',
      'Tutorial Assets': 'أصول الدروس التعليمية',
      'Project Files': 'ملفات المشاريع',
      'Sound Effects': 'المؤثرات الصوتية',
      'Best Sellers': 'الأكثر مبيعاً',
      'English': 'الإنجليزية',
      'INR (₹)': 'الروبية الهندية (₹)',
      'USD ($)': 'الدولار الأمريكي ($)',
      'JPY (¥)': 'الين الياباني (¥)',
      'EUR (€)': 'اليورو (€)',
      'GBP (£)': 'الجنيه الإسترليني (£)',
      'India (INR ₹)': 'الهند (روبية هندية ₹)',
      'United States (USD $)': 'الولايات المتحدة (دولار أمريكي $)',
      'Japan (JPY ¥)': 'اليابان (ين ياباني ¥)',
      'Germany (EUR €)': 'ألمانيا (يورو €)',
      'United Kingdom (GBP £)': 'المملكة المتحدة (جنيه إسترليني £)',
      'Premium E-Products for Creators & Professionals': 'منتجات إلكترونية متميزة للمبدعين والمحترفين',
      'Professional presets, motion graphics & project files': 'إعدادات مسبقة احترافية ورسومات متحركة وملفات مشاريع',
      'High-quality digital assets for every creative need': 'أصول رقمية عالية الجودة لكل احتياج إبداعي',
      'Best-in-class E-products at unbeatable value': 'منتجات إلكترونية من الدرجة الأولى بقيمة لا تضاهى',
      'Home': 'الرئيسية',
      'My Account': 'حسابي',
      'Checkout': 'إتمام الشراء',
      'Log In': 'تسجيل الدخول',
      'Logout': 'تسجيل الخروج',
      'Sign Up': 'اشتراك',
      'Create Account': 'إنشاء حساب',
      'Welcome': 'مرحباً',
      'Log in to your account or create a new one.': 'سجل الدخول إلى حسابك أو أنشئ حساباً جديداً.',
      'Email': 'البريد الإلكتروني',
      'Password': 'كلمة المرور',
      'Enter your email': 'أدخل بريدك الإلكتروني',
      'Enter your password': 'أدخل كلمة المرور',
      'Full Name': 'الاسم الكامل',
      'Enter your full name': 'أدخل اسمك الكامل',
      'Confirm Password': 'تأكيد كلمة المرور',
      'Confirm your password': 'تأكيد كلمة المرور',
      'Create a password (min 6 characters)': 'إنشاء كلمة مرور (6 أحرف على الأقل)',
      'By creating an account, you agree to our': 'بإنشاء حساب، فإنك توافق على',
      'Terms': 'الشروط',
      'Privacy Policy': 'سياسة الخصوصية',
      'and': 'و',
      'OR': 'أو',
      'Please enter your email.': 'الرجاء إدخال بريدك الإلكتروني.',
      'Please enter your password.': 'الرجاء إدخال كلمة المرور.',
      'Please enter your full name.': 'الرجاء إدخال اسمك الكامل.',
      'Password must be at least 6 characters.': 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل.',
      'Passwords do not match.': 'كلمتا المرور غير متطابقتين.',
      'An account with this email already exists.': 'يوجد حساب بالفعل بهذا البريد الإلكتروني.',
      'No account found with this email.': 'لم يتم العثور على حساب بهذا البريد الإلكتروني.',
      'Incorrect password. Please try again.': 'كلمة مرور غير صحيحة. حاول مرة أخرى.',
      'My Profile': 'ملفي الشخصي',
      'My Orders': 'طلباتي',
      'Wishlist': 'قائمة الرغبات',
      'Saved Addresses': 'العناوين المحفوظة',
      'Name': 'الاسم',
      'Save Changes': 'حفظ التغييرات',
      'You need to be logged in to view your account.': 'يجب تسجيل الدخول لعرض حسابك.',
      'Please log in': 'الرجاء تسجيل الدخول',
      'No orders yet.': 'لا توجد طلبات بعد.',
      'Your wishlist is empty.': 'قائمة رغباتك فارغة.',
      'No saved addresses.': 'لا توجد عناوين محفوظة.',
      '+ Add Address': '+ إضافة عنوان',
      'Log in to your account': 'تسجيل الدخول إلى حسابك',
      'You need to be logged in to place an order.': 'يجب تسجيل الدخول لتقديم طلب.',
      'Your cart is empty.': 'سلة التسوق فارغة.',
      'Browse products': 'تصفح المنتجات',
      'Cart': 'سلة التسوق',
      'Add to Cart': 'أضف إلى السلة',
      'Remove': 'إزالة',
      'Quantity': 'الكمية',
      'Subtotal': 'المجموع الفرعي',
      'Total': 'المجموع',
      'Place Order': 'تقديم الطلب',
      'Order placed successfully!': 'تم تقديم الطلب بنجاح!',
      'Thank you for your purchase.': 'شكراً لك على الشراء.',
      'Download': 'تحميل',
      'Quick links': 'روابط سريعة',
      'Pages': 'الصفحات',
      'FAQ': 'الأسئلة الشائعة',
      'Contact Us': 'اتصل بنا',
      'About Us': 'معلومات عنا',
      'Your account': 'حسابك',
      'All rights reserved.': 'جميع الحقوق محفوظة.',
      'Search': 'بحث',
      'Close': 'إغلاق',
      'Skip to content': 'تخطي إلى المحتوى',
      'Free': 'مجاني',
      'Sold out': 'نفذ من المخزون',
      'View Full Details': 'عرض التفاصيل الكاملة',
      'Add to wishlist': 'أضف إلى قائمة الرغبات',
      'Share': 'مشاركة',
      'Description': 'الوصف',
      'Features': 'الميزات',
      'You might also like': 'قد يعجبك أيضاً',
      'Recently viewed': 'شوهد مؤخراً',
      'Back': 'رجوع',
      'Order': 'الطلب',
      'Date': 'التاريخ',
      'Status': 'الحالة',
      'Item': 'العنصر',
      'Category': 'الفئة',
      'Tags': 'الوسوم',
      'Compare at': 'قارن السعر',
      'Taxes calculated at checkout': 'تحسب الضرائب عند الدفع',
      'Added to cart': 'أضيف إلى السلة',
      'Removed from cart': 'أزيل من السلة',
      'Added to wishlist': 'أضيف إلى قائمة الرغبات',
      'Removed from wishlist': 'أزيل من قائمة الرغبات',
      'Profile updated': 'تم تحديث الملف الشخصي',
      'Logged out successfully': 'تم تسجيل الخروج بنجاح',
      'Address saved': 'تم حفظ العنوان',
    }
  },

  init: function() {
    var saved = localStorage.getItem('auros_lang') || 'en';
    this.currentLang = saved;
    if (saved !== 'en') {
      this.translatePage();
    }
  },

  t: function(text) {
    if (this.currentLang === 'en') return text;
    var langDict = this.dict[this.currentLang];
    if (langDict && langDict[text]) return langDict[text];
    return text;
  },

  translatePage: function() {
    if (this.currentLang === 'en') {
      document.documentElement.setAttribute('lang', 'en');
      document.documentElement.setAttribute('dir', 'ltr');
      // Restore original text from data-original attributes
      this._restoreOriginalText();
      return;
    }
    document.documentElement.setAttribute('lang', this.currentLang);
    document.documentElement.setAttribute('dir', this.currentLang === 'ar' ? 'rtl' : 'ltr');
    this._translateNode(document.body);
  },

  _translateNode: function(node) {
    var self = this;
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
      var text = node.textContent.trim();
      var translated = this.t(text);
      if (translated !== text) {
        if (!node.parentElement.hasAttribute('data-original')) {
          node.parentElement.setAttribute('data-original', node.parentElement.innerHTML);
        }
        node.textContent = node.textContent.replace(text, translated);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.hasAttribute('placeholder')) {
        var ph = node.getAttribute('placeholder');
        var tPh = this.t(ph);
        if (tPh !== ph) {
          if (!node.hasAttribute('data-original-placeholder')) {
            node.setAttribute('data-original-placeholder', ph);
          }
          node.setAttribute('placeholder', tPh);
        }
      }
      if (node.hasAttribute('value') && node.tagName === 'INPUT' && node.getAttribute('type') !== 'email') {
        var val = node.getAttribute('value');
        var tVal = this.t(val);
        if (tVal !== val) {
          if (!node.hasAttribute('data-original-value')) {
            node.setAttribute('data-original-value', val);
          }
          node.setAttribute('value', tVal);
        }
      }
      if (node.hasAttribute('aria-label')) {
        var al = node.getAttribute('aria-label');
        var tAl = this.t(al);
        if (tAl !== al) {
          if (!node.hasAttribute('data-original-aria-label')) {
            node.setAttribute('data-original-aria-label', al);
          }
          node.setAttribute('aria-label', tAl);
        }
      }
      node.childNodes.forEach(function(child) {
        self._translateNode(child);
      });
    }
  },

  _restoreOriginalText: function() {
    document.querySelectorAll('[data-original]').forEach(function(el) {
      el.innerHTML = el.getAttribute('data-original');
      el.removeAttribute('data-original');
    });
    document.querySelectorAll('[data-original-placeholder]').forEach(function(el) {
      el.setAttribute('placeholder', el.getAttribute('data-original-placeholder'));
      el.removeAttribute('data-original-placeholder');
    });
    document.querySelectorAll('[data-original-value]').forEach(function(el) {
      el.setAttribute('value', el.getAttribute('data-original-value'));
      el.removeAttribute('data-original-value');
    });
    document.querySelectorAll('[data-original-aria-label]').forEach(function(el) {
      el.setAttribute('aria-label', el.getAttribute('data-original-aria-label'));
      el.removeAttribute('data-original-aria-label');
    });
  }
};

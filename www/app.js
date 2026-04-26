/* عقيدة المسلم — THE MUSLIM'S CREED — app.js v1.0 */
/* Based on "Aqidat al-Muslim" by Sheikh Mohammed al-Ghazali (1917-1996) */

// ═══════════════ TRILINGUAL DATA ═══════════════
const T = {
  ar: {
    appTitle: 'عقيدة المسلم',
    splashSub: 'أركان الإيمان بأسلوب سهل وعملي',
    splashHint: 'اضغط للتخطي',
    sacredRef: 'سورة البقرة ٢: ١٧٧',
    tabHome: 'الرئيسية', tabCreed: 'العقيدة', tabPillars: 'الأركان',
    tabQuiz: 'اختبار', tabAbout: 'الكتاب',
    creedTitle: 'أصول العقيدة',
    creedDesc: '٩ فصول من كتاب عقيدة المسلم للشيخ محمد الغزالي — وجود الله، التوحيد، صفات الله، القضاء والقدر، الإيمان والعمل، التوبة، الخلافات، الأنبياء، والخلود',
    pillarsTitle: 'أركان العبادة',
    pillarsDesc: 'كيف تتحول العقيدة إلى عمل يومي — الصلاة والصيام والزكاة والحج',
    quizTitle: '🏆 من سيكون العالم؟',
    quizDesc: 'اختبر معلوماتك في العقيدة الإسلامية — اجمع النقاط واحصل على الأوسمة!',
    helpTitle: '❓ مساعدة',
    duaPanelTitle: '🤲 أدعية الإيمان',
    submitQuiz: 'تحقق من الإجابة',
    dailyLabel: '✨ درس اليوم',
    quizAgain: 'سؤال جديد',
    share: 'مشاركة',
    searchPlaceholder: 'ابحث في العقيدة...',
    verse: 'الآية',
    youngMode: '🧒 المستكشف الصغير',
    teenMode: '📖 الباحث الشاب',
    xpLabel: 'نقاط الخبرة',
    levelLabel: 'المستوى',
    streakMsg: 'يوم متتالي!',
    correct: 'أحسنت! إجابة صحيحة!',
    wrong: 'حاول مرة أخرى!',
    quranRef: '📖 المرجع القرآني',
    fiftyFifty: '50/50',
    hintBtn: '💡 تلميح',
    nextQ: 'السؤال التالي',
    badges: {
      beginner: '🌱 مبتدئ',
      reader: '📖 قارئ',
      scholar: '🎓 عالم',
      persistent: '🔥 مثابر',
      expert: '⭐ خبير'
    },
    splashFeatures: [
      '٢٠ أصلاً من أصول العقيدة الإسلامية',
      'أركان العبادة: صلاة، صيام، زكاة، حج',
      'اختبار تفاعلي مع نظام نقاط وأوسمة',
      'وضعان: المستكشف الصغير والباحث الشاب'
    ],
  },
  en: {
    appTitle: "The Muslim's Creed",
    splashSub: 'Foundations of Islamic faith made simple',
    splashHint: 'tap to skip',
    sacredRef: 'Surah Al-Baqarah 2:177',
    tabHome: 'Home', tabCreed: 'Creed', tabPillars: 'Pillars',
    tabQuiz: 'Quiz', tabAbout: 'Book',
    creedTitle: 'Foundations of Faith',
    creedDesc: '9 chapters from "The Muslim\'s Creed" by Sheikh al-Ghazali — God\'s Existence, Oneness, Attributes, Divine Decree, Faith and Action, Repentance, Disputes, Prophets, and Eternity',
    pillarsTitle: 'Pillars of Worship',
    pillarsDesc: 'How creed transforms into daily practice — prayer, fasting, charity, and pilgrimage',
    quizTitle: '🏆 Who Wants to Be a Scholar?',
    quizDesc: 'Test your knowledge of Islamic creed — earn points and unlock badges!',
    helpTitle: '❓ Help',
    duaPanelTitle: '🤲 Duas of Faith',
    submitQuiz: 'Check Answer',
    dailyLabel: "✨ Today's Lesson",
    quizAgain: 'Next Question',
    share: 'Share',
    searchPlaceholder: 'Search creed...',
    verse: 'Verse',
    youngMode: '🧒 Young Explorer',
    teenMode: '📖 Teen Scholar',
    xpLabel: 'Experience Points',
    levelLabel: 'Level',
    streakMsg: 'day streak!',
    correct: 'Well done! Correct answer!',
    wrong: 'Try again!',
    quranRef: '📖 Quran Reference',
    fiftyFifty: '50/50',
    hintBtn: '💡 Hint',
    nextQ: 'Next Question',
    badges: {
      beginner: '🌱 Beginner',
      reader: '📖 Reader',
      scholar: '🎓 Scholar',
      persistent: '🔥 Persistent',
      expert: '⭐ Expert'
    },
    splashFeatures: [
      '20 foundations of Islamic creed',
      'Pillars of worship: prayer, fasting, zakat, hajj',
      'Interactive quiz with XP and badges',
      'Two modes: Young Explorer & Teen Scholar'
    ],
  },
  fr: {
    appTitle: 'La Croyance du Musulman',
    splashSub: 'Les fondements de la foi islamique simplifies',
    splashHint: 'appuyez pour passer',
    sacredRef: 'Sourate Al-Baqarah 2:177',
    tabHome: 'Accueil', tabCreed: 'Croyance', tabPillars: 'Piliers',
    tabQuiz: 'Quiz', tabAbout: 'Livre',
    creedTitle: 'Fondements de la Foi',
    creedDesc: '9 chapitres du livre « La Croyance du Musulman » par Sheikh al-Ghazali — Existence de Dieu, Unite, Attributs, Decret Divin, Foi et Action, Repentir, Disputes, Prophetes, et Eternite',
    pillarsTitle: 'Piliers du Culte',
    pillarsDesc: 'Comment la croyance se transforme en pratique quotidienne — priere, jeune, aumone et pelerinage',
    quizTitle: '🏆 Qui Veut Etre Savant ?',
    quizDesc: 'Testez vos connaissances en croyance islamique — gagnez des points et debloquez des badges !',
    helpTitle: '❓ Aide',
    duaPanelTitle: '🤲 Duas de la Foi',
    submitQuiz: 'Verifier',
    dailyLabel: '✨ Lecon du Jour',
    quizAgain: 'Question Suivante',
    share: 'Partager',
    searchPlaceholder: 'Rechercher...',
    verse: 'Verset',
    youngMode: '🧒 Jeune Explorateur',
    teenMode: '📖 Jeune Chercheur',
    xpLabel: 'Points d\'Experience',
    levelLabel: 'Niveau',
    streakMsg: 'jours consecutifs !',
    correct: 'Bravo ! Bonne reponse !',
    wrong: 'Essayez encore !',
    quranRef: '📖 Reference Coranique',
    fiftyFifty: '50/50',
    hintBtn: '💡 Indice',
    nextQ: 'Question Suivante',
    badges: {
      beginner: '🌱 Debutant',
      reader: '📖 Lecteur',
      scholar: '🎓 Savant',
      persistent: '🔥 Perseverant',
      expert: '⭐ Expert'
    },
    splashFeatures: [
      '20 fondements de la croyance islamique',
      'Piliers du culte : priere, jeune, zakat, hajj',
      'Quiz interactif avec XP et badges',
      'Deux modes : Jeune Explorateur et Jeune Chercheur'
    ],
  }
};

// ═══════════════ CREED DATA (20 foundations) ═══════════════
// ═══════════════ CREED DATA (20 cards from 9 book chapters) ═══════════════
const CREED = [
  {
    id:1, emoji:'🌍', category:'ch1',
    ar:{title:'وجود الله',desc:'المشكلة ليست إثبات وجود الله عقلياً للمسلمين بل جعلهم يحسّون بحضوره كمصدر طاقة حية. يستخدم الغزالي أدلة عقلية من مشاهدة الكون ويستشهد بعلماء غير مسلمين لتأكيد وجود الخالق.',verse:'إِنَّ فِي خَلْقِ السَّمَاوَاتِ وَالْأَرْضِ وَاخْتِلَافِ اللَّيْلِ وَالنَّهَارِ لَآيَاتٍ لِأُولِي الْأَلْبَابِ',verseRef:'آل عمران ١٩٠',young:'انظر حولك! كل شيء يدل على أن الله موجود — الشمس والقمر والنجوم!',action:'تأمل في مخلوق واحد اليوم وفكّر: من صنع هذا الجمال؟'},
    en:{title:'God\'s Existence',desc:'The problem is not proving God\'s existence intellectually to Muslims but making them feel His presence as a source of living energy. Al-Ghazali uses rational arguments from observing creation and cites non-Muslim scientists to validate the case for a Creator.',verse:'Indeed, in the creation of the heavens and earth and the alternation of night and day are signs for those of understanding.',verseRef:'Aal-Imran 190',young:'Look around you! Everything shows that God exists — the sun, moon, and stars!',action:'Contemplate one creation today and think: who made this beauty?'},
    fr:{title:'L\'Existence de Dieu',desc:'Le probleme n\'est pas de prouver l\'existence de Dieu intellectuellement mais de faire ressentir Sa presence comme source d\'energie vivante. Al-Ghazali utilise des arguments rationnels et cite des scientifiques non-musulmans pour valider l\'existence du Createur.',verse:'Dans la creation des cieux et de la terre et dans l\'alternance de la nuit et du jour, il y a des signes pour les doues d\'intelligence.',verseRef:'Aal-Imran 190',young:'Regarde autour de toi ! Tout montre que Dieu existe — le soleil, la lune et les etoiles !',action:'Contemple une creation aujourd\'hui et pense : qui a fait cette beaute ?'}
  },
  {
    id:2, emoji:'🔬', category:'ch1',
    ar:{title:'هل العالم خُلق صدفة؟',desc:'يرفض الغزالي فكرة أن الكون وُجد صدفة. يستخدم قياسات عقلية: النملة لا تدرك حقيقة الإنسان، فكيف يدّعي الإنسان المحدود أنه يحيط بحقيقة الخالق؟ النظام الدقيق في الكون يدل على مدبّر حكيم.',verse:'أَفَلَا يَنظُرُونَ إِلَى الْإِبِلِ كَيْفَ خُلِقَتْ',verseRef:'الغاشية ١٧',young:'هل يمكن أن تنظم نفسها بنفسها ساعة معقدة بدون صانع؟ الكون أعقد بكثير!',action:'ابحث عن شيء في الطبيعة يدهشك بدقته واسأل: من صمم هذا؟'},
    en:{title:'Was the World Created by Chance?',desc:'Al-Ghazali rejects the idea that the universe came about by chance. He uses analogies: an ant cannot grasp human reality — so how can limited human beings claim to encompass the Creator? The precise order in the universe points to a Wise Designer.',verse:'Do they not look at the camels, how they are created?',verseRef:'Al-Ghashiyah 17',young:'Can a complex watch organize itself without a maker? The universe is much more complex!',action:'Find something in nature that amazes you with its precision and ask: who designed this?'},
    fr:{title:'Le Monde Est-Il Ne par Hasard ?',desc:'Al-Ghazali rejette l\'idee que l\'univers est apparu par hasard. Il utilise des analogies : une fourmi ne peut comprendre l\'humain — comment l\'homme limite pretend-il saisir le Createur ? L\'ordre precis de l\'univers pointe vers un Concepteur Sage.',verse:'Ne regardent-ils pas les chameaux, comment ils ont ete crees ?',verseRef:'Al-Ghashiyah 17',young:'Une montre complexe peut-elle s\'organiser sans fabricant ? L\'univers est bien plus complexe !',action:'Trouvez quelque chose dans la nature qui vous etonne par sa precision et demandez : qui l\'a concu ?'}
  },
  {
    id:3, emoji:'♾️', category:'ch1',
    ar:{title:'هو الأول والآخر',desc:'الله لا بداية له ولا نهاية. العالم محتاج إلى الله في كل لحظة — ليس فقط في لحظة الخلق بل في كل ثانية من البقاء. حاجة العالم إلى الله مستمرة لا تنقطع.',verse:'هُوَ الْأَوَّلُ وَالْآخِرُ وَالظَّاهِرُ وَالْبَاطِنُ',verseRef:'الحديد ٣',young:'الله كان قبل كل شيء وسيبقى بعد كل شيء! العالم كله يحتاج إلى الله كل لحظة.',action:'تأمل في معنى أن الله هو الأول والآخر — ماذا يعني هذا لحياتك؟'},
    en:{title:'He is the First and the Last',desc:'God has no beginning and no end. The world needs God at every moment — not just at the moment of creation but every second of existence. The world\'s need for God is continuous and uninterrupted.',verse:'He is the First and the Last, the Manifest and the Hidden.',verseRef:'Al-Hadid 3',young:'God was before everything and will remain after everything! The whole world needs God every moment.',action:'Reflect on the meaning that God is the First and the Last — what does this mean for your life?'},
    fr:{title:'Il est le Premier et le Dernier',desc:'Dieu n\'a ni debut ni fin. Le monde a besoin de Dieu a chaque instant — pas seulement au moment de la creation mais a chaque seconde d\'existence. Le besoin du monde en Dieu est continu et ininterrompu.',verse:'Il est le Premier et le Dernier, l\'Apparent et le Cache.',verseRef:'Al-Hadid 3',young:'Dieu etait avant tout et restera apres tout ! Le monde entier a besoin de Dieu a chaque moment.',action:'Meditez sur le sens que Dieu est le Premier et le Dernier — qu\'est-ce que cela signifie pour votre vie ?'}
  },
  {
    id:4, emoji:'☝️', category:'ch2',
    ar:{title:'الوحدة المطلقة',desc:'الله واحد أحد لا شريك له. مهما تصور الذهن البشري عن الله فالله بخلاف ذلك. يناقش الغزالي عقيدة التثليث المسيحية ويفند الشرك التاريخي، ويؤكد أنه لا حاجز بين العبد وربه.',verse:'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ',verseRef:'الإخلاص ١-٢',young:'الله واحد! لا يوجد إله غيره. لا تعبد شيئاً غير الله أبداً!',action:'قل سورة الإخلاص بتدبر وتأمل في معنى الوحدانية المطلقة'},
    en:{title:'Absolute Oneness',desc:'God is absolutely One with no partner. Whatever the human mind conceives about God, God is beyond that. Al-Ghazali discusses the Christian Trinity, refutes historical polytheism, and affirms there should be no barrier between the servant and their Lord.',verse:'Say: He is God, the One. God, the Eternal Refuge.',verseRef:'Al-Ikhlas 1-2',young:'God is One! There is no other god. Never worship anything other than God!',action:'Recite Surah Al-Ikhlas with reflection and contemplate the meaning of absolute oneness'},
    fr:{title:'L\'Unite Absolue',desc:'Dieu est absolument Un sans associe. Quoi que l\'esprit humain concoive de Dieu, Dieu est au-dela. Al-Ghazali discute la Trinite chretienne, refute le polytheisme historique, et affirme qu\'il ne doit y avoir aucune barriere entre le serviteur et son Seigneur.',verse:'Dis : Il est Dieu, l\'Unique. Dieu, le Refuge Eternel.',verseRef:'Al-Ikhlas 1-2',young:'Dieu est Un ! Il n\'y a pas d\'autre dieu. N\'adore jamais rien d\'autre que Dieu !',action:'Recitez la Sourate Al-Ikhlas avec reflexion et contemplez le sens de l\'unite absolue'}
  },
  {
    id:5, emoji:'⚠️', category:'ch2',
    ar:{title:'إخلاص التوحيد',desc:'ينتقد الغزالي ممارسات بعض المسلمين التي تناقض التوحيد الخالص: المبالغة في تعظيم الأولياء والأضرحة واتخاذ الوسطاء. توحيد العامة قد يعلوه غبار الشرك الخفي. لا واسطة بين العبد وربه.',verse:'أَلَا لِلَّهِ الدِّينُ الْخَالِصُ',verseRef:'الزمر ٣',young:'صلِّ لله وحده وادعُ الله وحده! لا تطلب من غير الله ما لا يقدر عليه إلا الله.',action:'راجع نفسك: هل تتعلق بغير الله في قلبك؟ جدد توحيدك اليوم'},
    en:{title:'Purifying Monotheism',desc:'Al-Ghazali critiques practices among some Muslims that contradict pure monotheism: excessive veneration of saints and shrines, and taking intermediaries. Common people\'s monotheism may be tainted by hidden polytheism. There is no intermediary between servant and Lord.',verse:'Unquestionably, for Allah is the pure religion.',verseRef:'Az-Zumar 3',young:'Pray to God alone and call upon God alone! Don\'t ask anyone other than God for what only God can give.',action:'Examine yourself: is your heart attached to anything other than God? Renew your monotheism today'},
    fr:{title:'Purifier le Monotheisme',desc:'Al-Ghazali critique des pratiques chez certains musulmans qui contredisent le pur monotheisme : la veneration excessive des saints et des mausolees. Le monotheisme du commun peut etre souille de polytheisme cache. Il n\'y a pas d\'intermediaire entre le serviteur et son Seigneur.',verse:'C\'est a Allah qu\'appartient la religion pure.',verseRef:'Az-Zumar 3',young:'Prie Dieu seul et invoque Dieu seul ! Ne demande a personne d\'autre ce que seul Dieu peut donner.',action:'Examinez-vous : votre coeur est-il attache a autre chose que Dieu ? Renouvelez votre monotheisme'}
  },
  {
    id:6, emoji:'🌟', category:'ch3',
    ar:{title:'الكمال الأعلى',desc:'الكمال الإلهي لله وحده في القدرة والإرادة والحكمة والسمع والبصر. يتبع الغزالي منهج السلف: قبول ما جاء في النصوص عن الله دون تأويل مع تنزيه الله عن التشبيه بالمخلوقات.',verse:'لَيْسَ كَمِثْلِهِ شَيْءٌ وَهُوَ السَّمِيعُ الْبَصِيرُ',verseRef:'الشورى ١١',young:'الله كامل في كل شيء! يسمع كل شيء ويرى كل شيء. لا أحد مثله أبداً!',action:'تعلم ثلاثة أسماء من أسماء الله الحسنى اليوم وتأمل معانيها'},
    en:{title:'Supreme Perfection',desc:'Divine perfection belongs to God alone in Power, Will, Wisdom, Hearing, and Sight. Al-Ghazali follows the Salaf methodology: accepting scriptural descriptions of God without allegorical interpretation, while avoiding anthropomorphism.',verse:'There is nothing like unto Him, and He is the All-Hearing, the All-Seeing.',verseRef:'Ash-Shura 11',young:'God is perfect in everything! He hears everything and sees everything. No one is like Him ever!',action:'Learn three of God\'s beautiful names today and reflect on their meanings'},
    fr:{title:'La Perfection Supreme',desc:'La perfection divine appartient a Dieu seul en Puissance, Volonte, Sagesse, Audition et Vue. Al-Ghazali suit la methodologie des Salafs : accepter les descriptions scripturaires sans interpretation allegorique, tout en evitant l\'anthropomorphisme.',verse:'Il n\'y a rien qui Lui ressemble, et Il est l\'Audient, le Clairvoyant.',verseRef:'Ash-Shura 11',young:'Dieu est parfait en tout ! Il entend tout et voit tout. Personne ne Lui ressemble jamais !',action:'Apprenez trois des beaux noms de Dieu aujourd\'hui et meditez leurs significations'}
  },
  {
    id:7, emoji:'💪', category:'ch3',
    ar:{title:'القدرة والإرادة والحكمة',desc:'الله قادر لا حدود لقدرته، مريد فما شاء كان وما لم يشأ لم يكن، حكيم فلا شيء يحدث عبثاً. يناقش الغزالي آيات اليد والوجه والعرش ويؤكد قبولها بلا تأويل مع التنزيه.',verse:'إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَنْ يَقُولَ لَهُ كُنْ فَيَكُونُ',verseRef:'يس ٨٢',young:'الله يستطيع كل شيء! إذا أراد شيئاً يقول له: كن! فيكون!',action:'عند كل أمر صعب، تذكر أن الله قادر على كل شيء'},
    en:{title:'Power, Will, and Wisdom',desc:'God is All-Powerful with no limit, All-Willing such that whatever He wills comes to be, and All-Wise so nothing happens arbitrarily. Al-Ghazali discusses verses about God\'s hand, face, and throne — affirming their acceptance without interpretation while maintaining transcendence.',verse:'His command when He wills something is only to say to it: Be — and it is.',verseRef:'Ya-Sin 82',young:'God can do anything! When He wants something, He says: Be! And it is!',action:'When facing anything difficult, remember that God is capable of all things'},
    fr:{title:'Puissance, Volonte et Sagesse',desc:'Dieu est Tout-Puissant sans limite, Volontaire tel que tout ce qu\'Il veut se realise, et Sage tel que rien n\'arrive arbitrairement. Al-Ghazali discute les versets sur la main, le visage et le trone de Dieu — affirmant leur acceptation sans interpretation.',verse:'Son commandement quand Il veut quelque chose est seulement de lui dire : Sois — et c\'est.',verseRef:'Ya-Sin 82',young:'Dieu peut tout faire ! Quand Il veut quelque chose, Il dit : Sois ! Et c\'est !',action:'Face a toute difficulte, rappelez-vous que Dieu est capable de toute chose'}
  },
  {
    id:8, emoji:'🎯', category:'ch4',
    ar:{title:'القضاء والقدر',desc:'علم الله علم إحاطة وشمول لا علم إكراه. صفحات القدر تتبع فعل الإنسان لا العكس. فلا عذر للكسول أن يحتج بالقدر ليبرر تقاعسه. ينتقد الغزالي المسلمين الذين يستخدمون القدر عذراً للتخلف.',verse:'إِنَّا كُلَّ شَيْءٍ خَلَقْنَاهُ بِقَدَرٍ',verseRef:'القمر ٤٩',young:'الله يعلم كل شيء مسبقاً لكن هذا لا يعني أننا لا نعمل — ابذل جهدك دائماً!',action:'لا تحتج بالقدر لتبرر كسلك — اعمل واجتهد ثم توكل على الله'},
    en:{title:'Divine Decree',desc:'God\'s knowledge is one of encompassment and comprehensiveness, NOT compulsion. The pages of divine knowledge follow human action — not the other way around. There is no excuse for the lazy to cite predestination. Al-Ghazali critiques Muslims who use qadar to justify decline.',verse:'Indeed, We have created everything by measure.',verseRef:'Al-Qamar 49',young:'God knows everything in advance but that doesn\'t mean we don\'t work — always do your best!',action:'Don\'t use destiny as an excuse for laziness — work hard, strive, then trust in God'},
    fr:{title:'Le Decret Divin',desc:'La science de Dieu est une science d\'englobement et de comprehension, PAS de contrainte. Les pages du destin suivent l\'action humaine — pas l\'inverse. Il n\'y a pas d\'excuse pour le paresseux de citer la predestination. Al-Ghazali critique ceux qui utilisent le qadar pour justifier le declin.',verse:'Nous avons cree toute chose avec mesure.',verseRef:'Al-Qamar 49',young:'Dieu sait tout a l\'avance mais cela ne veut pas dire qu\'on ne travaille pas — fais toujours de ton mieux !',action:'N\'utilisez pas le destin comme excuse pour la paresse — travaillez et efforcez-vous puis confiez-vous a Dieu'}
  },
  {
    id:9, emoji:'⚡', category:'ch4',
    ar:{title:'الحرية والمسؤولية',desc:'يفرّق الغزالي بين ما لا يملكه الإنسان (الكوارث، ظروف الولادة) وبين ما يملك فيه حرية الاختيار الحقيقية. الإنسان حر في اختياراته الأخلاقية ومسؤول عنها أمام الله.',verse:'فَمَنْ يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ',verseRef:'الزلزلة ٧',young:'أنت حر في اختياراتك! يمكنك أن تختار الخير أو الشر — والله يحاسبك على اختيارك.',action:'تحمّل مسؤولية قراراتك اليوم — لا تلقِ اللوم على القدر'},
    en:{title:'Freedom and Responsibility',desc:'Al-Ghazali distinguishes between what humans genuinely cannot control (natural disasters, birth circumstances) and areas where humans have genuine freedom of choice. A person is free in their moral choices and accountable to God for them.',verse:'Whoever does an atom\'s weight of good will see it.',verseRef:'Az-Zalzalah 7',young:'You are free in your choices! You can choose good or evil — and God holds you accountable for your choice.',action:'Take responsibility for your decisions today — don\'t blame destiny'},
    fr:{title:'Liberte et Responsabilite',desc:'Al-Ghazali distingue entre ce que l\'homme ne peut controler (catastrophes naturelles, circonstances de naissance) et les domaines ou il a une veritable liberte de choix. L\'homme est libre dans ses choix moraux et responsable devant Dieu.',verse:'Quiconque fait le poids d\'un atome de bien le verra.',verseRef:'Az-Zalzalah 7',young:'Tu es libre dans tes choix ! Tu peux choisir le bien ou le mal — et Dieu te demandera des comptes.',action:'Assumez la responsabilite de vos decisions — ne blâmez pas le destin'}
  },
  {
    id:10, emoji:'🏋️', category:'ch5',
    ar:{title:'العمل أساس الإيمان',desc:'الإيمان لا يقبع في القلب فقط بل يجب أن يؤكده العمل. الإيمان عند الغزالي: إقرار باللسان وإيمان بالقلب وعمل بالجوارح. يفنّد الفهم الخاطئ لبعض الأحاديث الذي دفع المسلمين للتواكل.',verse:'وَقُلِ اعْمَلُوا فَسَيَرَى اللَّهُ عَمَلَكُمْ وَرَسُولُهُ وَالْمُؤْمِنُونَ',verseRef:'التوبة ١٠٥',young:'الإيمان ليس كلاماً فقط! يجب أن تعمل الخير وتساعد الناس وتطيع الله.',action:'حوّل إيمانك إلى عمل اليوم: صلِّ في وقتها وساعد شخصاً محتاجاً'},
    en:{title:'Action: Foundation of Faith',desc:'Faith does not simply reside in the heart — it must be confirmed by action. For Al-Ghazali, faith is: affirmation by the tongue, belief in the heart, and action by the limbs. He refutes the misunderstanding of hadith texts that led Muslims toward complacency.',verse:'And say: Work, for God will see your work, and His Messenger, and the believers.',verseRef:'At-Tawbah 105',young:'Faith is not just words! You must do good, help people, and obey God.',action:'Turn your faith into action today: pray on time and help someone in need'},
    fr:{title:'L\'Action : Fondement de la Foi',desc:'La foi ne reside pas simplement dans le coeur — elle doit etre confirmee par l\'action. Pour Al-Ghazali, la foi est : affirmation par la langue, croyance dans le coeur, et action par les membres. Il refute l\'interpretation erronee des hadiths qui a pousse les musulmans a la passivite.',verse:'Et dis : OEuvrez, car Dieu verra vos oeuvres, ainsi que Son Messager et les croyants.',verseRef:'At-Tawbah 105',young:'La foi n\'est pas que des mots ! Tu dois faire le bien, aider les gens et obeir a Dieu.',action:'Transformez votre foi en action aujourd\'hui : priez a l\'heure et aidez quelqu\'un dans le besoin'}
  },
  {
    id:11, emoji:'🔗', category:'ch5',
    ar:{title:'الإيمان قول وعمل',desc:'الصلة بين الإيمان والعمل والجزاء الإلهي هي محور هذا الفصل. لا يكفي أن تقول أنا مؤمن — بل يجب أن تُثبت إيمانك بأفعالك. العبادة بلا عمل صالح ناقصة.',verse:'إِنَّ الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ كَانَتْ لَهُمْ جَنَّاتُ الْفِرْدَوْسِ نُزُلًا',verseRef:'الكهف ١٠٧',young:'لا يكفي أن تقول أنا مسلم — يجب أن تفعل الخير وتبتعد عن الشر!',action:'اسأل نفسك: هل أفعالي تعكس إيماني؟ وأصلح ما يحتاج إصلاحاً'},
    en:{title:'Faith is Word and Deed',desc:'The connection between faith, action, and divine recompense is central. It is not enough to say "I am a believer" — you must prove your faith through your actions. Worship without good deeds is incomplete.',verse:'Indeed, those who believed and did righteous deeds — for them are the gardens of Paradise as hospitality.',verseRef:'Al-Kahf 107',young:'It is not enough to say I am Muslim — you must do good and stay away from evil!',action:'Ask yourself: do my actions reflect my faith? And fix what needs fixing'},
    fr:{title:'La Foi est Parole et Acte',desc:'Le lien entre la foi, l\'action et la recompense divine est central. Il ne suffit pas de dire « je suis croyant » — vous devez prouver votre foi par vos actes. L\'adoration sans bonnes actions est incomplete.',verse:'Ceux qui ont cru et fait de bonnes oeuvres auront les jardins du Paradis pour hospitalite.',verseRef:'Al-Kahf 107',young:'Il ne suffit pas de dire je suis musulman — tu dois faire le bien et eviter le mal !',action:'Demandez-vous : mes actes refletent-ils ma foi ? Et corrigez ce qui doit l\'etre'}
  },
  {
    id:12, emoji:'🔄', category:'ch6',
    ar:{title:'الخطيئة والمتاب',desc:'الصلة الوثيقة بين الإيمان والعمل لا تعني أن الإيمان يستلزم العصمة من الذنوب. المؤمن يُذنب، والذنب العارض لا يسلب صاحبه دينه. لكن الإصرار على المعصية هو الخطر الحقيقي.',verse:'وَالَّذِينَ إِذَا فَعَلُوا فَاحِشَةً أَوْ ظَلَمُوا أَنْفُسَهُمْ ذَكَرُوا اللَّهَ فَاسْتَغْفَرُوا لِذُنُوبِهِمْ',verseRef:'آل عمران ١٣٥',young:'كل إنسان يخطئ أحياناً — المهم أن تتوب وترجع إلى الله بسرعة!',action:'إذا أخطأت اليوم، استغفر فوراً ولا تيأس من رحمة الله'},
    en:{title:'Sin and Repentance',desc:'The close link between faith and action does not mean faith requires sinlessness. A believer will sin, and occasional sin does not strip one of their religion. But persistent deliberate sin is the real danger.',verse:'And those who, when they commit an immorality or wrong themselves, remember God and seek forgiveness for their sins.',verseRef:'Aal-Imran 135',young:'Everyone makes mistakes sometimes — what matters is that you repent and return to God quickly!',action:'If you make a mistake today, seek forgiveness immediately and never despair of God\'s mercy'},
    fr:{title:'Le Peche et le Repentir',desc:'Le lien etroit entre foi et action ne signifie pas que la foi exige l\'infaillibilite. Le croyant pechera, et le peche occasionnel ne depouille pas de sa religion. Mais l\'insistance deliberee dans le peche est le vrai danger.',verse:'Et ceux qui, lorsqu\'ils commettent une turpitude ou se font du tort, se souviennent de Dieu et demandent pardon pour leurs peches.',verseRef:'Aal-Imran 135',young:'Tout le monde fait des erreurs — l\'important est de se repentir et de revenir a Dieu vite !',action:'Si vous faites une erreur aujourd\'hui, demandez pardon immediatement et ne desesperez jamais de la misericorde de Dieu'}
  },
  {
    id:13, emoji:'🚪', category:'ch6',
    ar:{title:'باب التوبة مفتوح',desc:'يناقش الغزالي درجات الذنوب (كبائر وصغائر) ويؤكد أن باب التوبة مفتوح دائماً. التوبة ليست ضعفاً بل قوة — هي عودة الإنسان إلى فطرته السليمة وطبيعته النقية.',verse:'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ',verseRef:'الزمر ٥٣',young:'مهما أخطأت، الله يقبل توبتك! فقط ارجع إليه بصدق وقلب نظيف.',action:'تب إلى الله الآن من ذنب تعرفه — واعزم ألا تعود إليه'},
    en:{title:'The Door of Repentance is Open',desc:'Al-Ghazali discusses gradations of sin (major and minor) and affirms the door of repentance is always open. Repentance is not weakness but strength — it is the return to one\'s pure natural state.',verse:'Say: O My servants who have transgressed against themselves, do not despair of the mercy of God.',verseRef:'Az-Zumar 53',young:'No matter how much you have sinned, God accepts your repentance! Just return to Him sincerely.',action:'Repent to God now from a sin you know — and resolve not to return to it'},
    fr:{title:'La Porte du Repentir est Ouverte',desc:'Al-Ghazali discute les degres du peche (majeur et mineur) et affirme que la porte du repentir est toujours ouverte. Le repentir n\'est pas faiblesse mais force — c\'est le retour a sa nature pure.',verse:'Dis : O Mes serviteurs qui avez commis des exces, ne desesperez pas de la misericorde de Dieu.',verseRef:'Az-Zumar 53',young:'Peu importe combien tu as peche, Dieu accepte ton repentir ! Reviens a Lui sincerement.',action:'Repentez-vous maintenant d\'un peche que vous connaissez — et decidez de ne plus y revenir'}
  },
  {
    id:14, emoji:'🤝', category:'ch7',
    ar:{title:'خلافات لا مبرر لها',desc:'يبتعد الغزالي بعلم العقيدة عن المجادلات المذهبية المجردة. كثير من الخلافات التاريخية بين المذاهب كان لها ما يبررها في عصرها لكنها غير مناسبة مع تراجع المسلمين. ينتقد علم الكلام حين يصبح علماً نظرياً جافاً منقطعاً عن الإيمان الحي.',verse:'وَلَا تَنَازَعُوا فَتَفْشَلُوا وَتَذْهَبَ رِيحُكُمْ',verseRef:'الأنفال ٤٦',young:'لا تتشاجر على أشياء صغيرة! المهم هو الإيمان بالله والعمل الصالح.',action:'لا تدخل في جدال عقيم اليوم — ركّز على ما يجمعك مع الآخرين'},
    en:{title:'Unjustified Disputes',desc:'Al-Ghazali distances theology from abstract sectarian disputations. Many historical debates between sects were justified in their time but are inappropriate given Muslim decline. He critiques kalam when it becomes dry theory disconnected from lived faith.',verse:'And do not dispute lest you lose courage and your strength departs.',verseRef:'Al-Anfal 46',young:'Don\'t fight over small things! What matters is believing in God and doing good.',action:'Avoid futile arguments today — focus on what unites you with others'},
    fr:{title:'Disputes Injustifiees',desc:'Al-Ghazali eloigne la theologie des disputations sectaires abstraites. Beaucoup de debats historiques entre sectes etaient justifies a leur epoque mais sont inappropries vu le declin musulman. Il critique le kalam quand il devient une theorie seche deconnectee de la foi vecue.',verse:'Et ne vous disputez pas, sinon vous flechiriez et votre force partirait.',verseRef:'Al-Anfal 46',young:'Ne te dispute pas pour des petites choses ! L\'important est de croire en Dieu et de faire le bien.',action:'Evitez les arguments futiles aujourd\'hui — concentrez-vous sur ce qui vous unit aux autres'}
  },
  {
    id:15, emoji:'🚫', category:'ch7',
    ar:{title:'رفض التكفير',desc:'يعارض الغزالي تكفير المسلمين بسبب خلافات عقدية ثانوية. يرى أن الأمة بحاجة إلى وحدة لا تفرق، وأن الخلاف الفقهي رحمة لا نقمة. العقيدة طبيعة لا علم، وشعور لا فلسفة، وخُلق لا رأي.',verse:'وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا',verseRef:'آل عمران ١٠٣',young:'لا تقل عن أحد أنه كافر لأنه يختلف معك! المسلمون إخوة.',action:'احترم من يختلف معك في الرأي — واسعَ للوحدة لا للفرقة'},
    en:{title:'Rejecting Takfir',desc:'Al-Ghazali opposes declaring Muslims disbelievers over secondary theological differences. The Ummah needs unity not division, and scholarly disagreement is a mercy not a curse. Creed is nature not science, feeling not philosophy, morality not opinion.',verse:'And hold firmly to the rope of God all together and do not become divided.',verseRef:'Aal-Imran 103',young:'Never call anyone a disbeliever just because they disagree with you! Muslims are brothers.',action:'Respect those who disagree with you — seek unity not division'},
    fr:{title:'Rejeter le Takfir',desc:'Al-Ghazali s\'oppose a declarer les musulmans mecreants pour des differences theologiques secondaires. La Oumma a besoin d\'unite pas de division, et le desaccord savant est une misericorde. La croyance est nature non science, sentiment non philosophie, moralite non opinion.',verse:'Et cramponez-vous tous ensemble au cable de Dieu et ne vous divisez pas.',verseRef:'Aal-Imran 103',young:'Ne dis jamais de quelqu\'un qu\'il est mecreant parce qu\'il n\'est pas d\'accord avec toi ! Les musulmans sont freres.',action:'Respectez ceux qui ne sont pas d\'accord avec vous — cherchez l\'unite pas la division'}
  },
  {
    id:16, emoji:'🕊️', category:'ch8',
    ar:{title:'الأنبياء والوحي',desc:'يتناول الغزالي طبيعة النبوة وكيف تختلف عن الفلسفة. النبوة هداية إلهية اختص الله بها بشراً مصطفين. الوحي ليس إلهاماً بشرياً بل اتصال إلهي مباشر.',verse:'وَمَا يَنطِقُ عَنِ الْهَوَىٰ ۝ إِنْ هُوَ إِلَّا وَحْيٌ يُوحَىٰ',verseRef:'النجم ٣-٤',young:'الأنبياء لم يخترعوا كلامهم — الله هو الذي علمهم وأوحى إليهم!',action:'اقرأ عن نبي واحد اليوم وتأمل كيف بلّغ رسالة الله'},
    en:{title:'Prophets and Revelation',desc:'Al-Ghazali addresses the nature of prophethood and how it differs from philosophy. Prophethood is divine guidance that God bestowed upon chosen humans. Revelation is not human inspiration but direct divine communication.',verse:'He does not speak from desire. It is only revelation that is revealed.',verseRef:'An-Najm 3-4',young:'The prophets did not make up their words — God taught them and revealed to them!',action:'Read about one prophet today and reflect on how they delivered God\'s message'},
    fr:{title:'Les Prophetes et la Revelation',desc:'Al-Ghazali aborde la nature de la prophetie et sa difference avec la philosophie. La prophetie est une guidance divine que Dieu a accordee a des humains choisis. La revelation n\'est pas une inspiration humaine mais une communication divine directe.',verse:'Il ne parle pas sous l\'effet du desir. Ce n\'est qu\'une revelation qui lui est revelee.',verseRef:'An-Najm 3-4',young:'Les prophetes n\'ont pas invente leurs paroles — Dieu leur a enseigne et leur a revele !',action:'Lisez sur un prophete aujourd\'hui et reflechissez a comment il a transmis le message de Dieu'}
  },
  {
    id:17, emoji:'📖', category:'ch8',
    ar:{title:'القرآن معجزة خالدة',desc:'يرى الغزالي أن القرآن معجزة عقلية خالدة وليس معجزة مادية مؤقتة كمعجزات الأنبياء السابقين. القرآن يخاطب العقل والقلب معاً ويظل صالحاً لكل زمان ومكان.',verse:'إِنَّا نَحْنُ نَزَّلْنَا الذِّكْرَ وَإِنَّا لَهُ لَحَافِظُونَ',verseRef:'الحجر ٩',young:'القرآن كتاب الله المحفوظ! لم يتغير منذ نزل على النبي محمد ﷺ!',action:'اقرأ صفحة من القرآن اليوم بتدبر — واسأل: ماذا يريد الله أن أفهم؟'},
    en:{title:'The Quran: An Eternal Miracle',desc:'Al-Ghazali views the Quran as an eternal intellectual miracle — not a temporary physical miracle like those of previous prophets. The Quran addresses both mind and heart and remains relevant for all times and places.',verse:'Indeed, it is We who sent down the reminder, and indeed, We will be its guardian.',verseRef:'Al-Hijr 9',young:'The Quran is God\'s preserved book! It has not changed since it was revealed to Prophet Muhammad!',action:'Read a page of the Quran today with reflection — ask: what does God want me to understand?'},
    fr:{title:'Le Coran : Un Miracle Eternel',desc:'Al-Ghazali voit le Coran comme un miracle intellectuel eternel — pas un miracle physique temporaire comme ceux des prophetes precedents. Le Coran s\'adresse a l\'esprit et au coeur et reste pertinent pour tous les temps et lieux.',verse:'C\'est Nous qui avons fait descendre le rappel, et c\'est Nous qui en sommes les gardiens.',verseRef:'Al-Hijr 9',young:'Le Coran est le livre preserve de Dieu ! Il n\'a pas change depuis sa revelation au Prophete Muhammad !',action:'Lisez une page du Coran aujourd\'hui avec reflexion — demandez : que veut Dieu que je comprenne ?'}
  },
  {
    id:18, emoji:'⭐', category:'ch8',
    ar:{title:'محمد خاتم الأنبياء',desc:'محمد ﷺ خاتم الأنبياء والمرسلين. رسالته عالمية شاملة لكل البشر. يؤكد الغزالي على عصمة الأنبياء في التبليغ وأن النبوة ليست مكتسبة بل هي اصطفاء إلهي.',verse:'مَا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِنْ رِجَالِكُمْ وَلَٰكِنْ رَسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ',verseRef:'الأحزاب ٤٠',young:'محمد ﷺ آخر الأنبياء! رسالته لكل الناس في كل زمان ومكان.',action:'اقرأ حديثاً واحداً عن أخلاق النبي ﷺ اليوم وحاول تطبيقه'},
    en:{title:'Muhammad: Seal of the Prophets',desc:'Muhammad (peace be upon him) is the seal of all prophets and messengers. His message is universal for all humanity. Al-Ghazali affirms prophetic infallibility in delivering the message and that prophethood is divine selection, not acquisition.',verse:'Muhammad is not the father of any of your men, but the Messenger of God and the seal of the prophets.',verseRef:'Al-Ahzab 40',young:'Muhammad is the last prophet! His message is for all people in every time and place.',action:'Read one hadith about the Prophet\'s character today and try to apply it'},
    fr:{title:'Muhammad : Sceau des Prophetes',desc:'Muhammad (paix sur lui) est le sceau de tous les prophetes et messagers. Son message est universel pour toute l\'humanite. Al-Ghazali affirme l\'infaillibilite prophetique dans la transmission et que la prophetie est une selection divine.',verse:'Muhammad n\'est le pere d\'aucun de vos hommes, mais le Messager de Dieu et le sceau des prophetes.',verseRef:'Al-Ahzab 40',young:'Muhammad est le dernier prophete ! Son message est pour tous les gens en tout temps et lieu.',action:'Lisez un hadith sur le caractere du Prophete aujourd\'hui et essayez de l\'appliquer'}
  },
  {
    id:19, emoji:'🌅', category:'ch9',
    ar:{title:'ما وراء الحياة',desc:'يناقش الغزالي عالم البرزخ وأشراط الساعة. الحياة الدنيا ليست النهاية بل هي محطة في رحلة أبدية. الإنسان يمر بالبرزخ ثم البعث ثم الحساب.',verse:'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ ثُمَّ إِلَيْنَا تُرْجَعُونَ',verseRef:'العنكبوت ٥٧',young:'الحياة لا تنتهي بالموت! بعد الموت هناك حياة أخرى أبدية عند الله.',action:'تأمل: لو كان هذا آخر يوم لك — ما الذي ستغيره في حياتك؟'},
    en:{title:'Beyond This Life',desc:'Al-Ghazali discusses the world of Barzakh (intermediate realm) and the signs of the Hour. Worldly life is not the end but a station in an eternal journey. A person passes through Barzakh, then resurrection, then judgment.',verse:'Every soul will taste death. Then to Us you will be returned.',verseRef:'Al-Ankabut 57',young:'Life does not end with death! After death there is another eternal life with God.',action:'Reflect: if today were your last day — what would you change in your life?'},
    fr:{title:'Au-dela de Cette Vie',desc:'Al-Ghazali discute le monde du Barzakh (royaume intermediaire) et les signes de l\'Heure. La vie terrestre n\'est pas la fin mais une station dans un voyage eternel. L\'homme passe par le Barzakh, puis la resurrection, puis le jugement.',verse:'Toute ame goutera la mort. Puis c\'est a Nous que vous serez ramenes.',verseRef:'Al-Ankabut 57',young:'La vie ne s\'arrete pas avec la mort ! Apres la mort il y a une autre vie eternelle avec Dieu.',action:'Reflechissez : si c\'etait votre dernier jour — que changeriez-vous dans votre vie ?'}
  },
  {
    id:20, emoji:'⏳', category:'ch9',
    ar:{title:'البعث والجزاء',desc:'يرد الغزالي على منكري البعث ويؤكد حقيقة الحساب والجزاء. يناقش الشفاعة النبوية ورؤية الله تعالى في الآخرة. الجنة جزاء المحسنين والنار عاقبة الظالمين.',verse:'فَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْرًا يَرَهُ ۝ وَمَن يَعْمَلْ مِثْقَالَ ذَرَّةٍ شَرًّا يَرَهُ',verseRef:'الزلزلة ٧-٨',young:'يوم القيامة سيحاسبنا الله على كل شيء — حتى أصغر الأعمال! فاعمل خيراً!',action:'اعمل عملاً صالحاً الآن — تذكر أن كل ذرة خير ستُحسب لك'},
    en:{title:'Resurrection and Recompense',desc:'Al-Ghazali refutes those who deny resurrection and affirms the reality of judgment and recompense. He discusses the Prophet\'s intercession and seeing God in the Hereafter. Paradise is the reward of the righteous and Hell the consequence of the unjust.',verse:'Whoever does an atom\'s weight of good will see it. And whoever does an atom\'s weight of evil will see it.',verseRef:'Az-Zalzalah 7-8',young:'On Judgment Day God will account for everything — even the smallest deeds! So do good!',action:'Do a good deed right now — remember that every atom of good will count for you'},
    fr:{title:'La Resurrection et la Retribution',desc:'Al-Ghazali refute ceux qui nient la resurrection et affirme la realite du jugement et de la retribution. Il discute l\'intercession prophetique et la vision de Dieu dans l\'au-dela. Le Paradis est la recompense des justes et l\'Enfer la consequence des injustes.',verse:'Quiconque fait le poids d\'un atome de bien le verra. Et quiconque fait le poids d\'un atome de mal le verra.',verseRef:'Az-Zalzalah 7-8',young:'Le Jour du Jugement Dieu demandera des comptes pour tout — meme les plus petits actes ! Alors fais le bien !',action:'Faites une bonne action maintenant — rappelez-vous que chaque atome de bien comptera pour vous'}
  }
];


// ═══════════════ PILLARS DATA (4 pillars of worship) ═══════════════
const PILLARS = [
  {
    id:1, emoji:'🕌',
    ar:{title:'الصلاة',desc:'الصلاة عماد الدين وصلة بين العبد وربه. خمس صلوات يومية تطهّر القلب وتنظّم الحياة. هي أول ما يُحاسب عليه العبد يوم القيامة.',verse:'إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ',verseRef:'العنكبوت ٢٩: ٤٥',problem:'التكاسل عن الصلاة وتأخيرها',solution:'الصلاة في وقتها بخشوع تحقق السكينة والقرب من الله'},
    en:{title:'Prayer (Salah)',desc:'Prayer is the pillar of religion and the connection between servant and Lord. Five daily prayers purify the heart and organize life. It is the first thing a person is judged for on the Day of Judgment.',verse:'Indeed, prayer prohibits immorality and wrongdoing.',verseRef:'Al-Ankabut 29:45',problem:'Laziness about prayer and delaying it',solution:'Praying on time with reverence brings tranquility and closeness to God'},
    fr:{title:'La Priere (Salah)',desc:'La priere est le pilier de la religion et le lien entre le serviteur et son Seigneur. Cinq prieres quotidiennes purifient le coeur et organisent la vie. C\'est la premiere chose sur laquelle une personne sera jugee au Jour du Jugement.',verse:'En verite, la priere preserve de la turpitude et du blamable.',verseRef:'Al-Ankabut 29:45',problem:'La paresse envers la priere et son retard',solution:'Prier a l\'heure avec recueillement apporte tranquillite et proximite de Dieu'}
  },
  {
    id:2, emoji:'🌙',
    ar:{title:'الصيام',desc:'صيام رمضان ركن من أركان الإسلام. الصيام يهذّب النفس ويعلّم الصبر ويذكّر بالفقراء. هو مدرسة سنوية لتزكية النفس.',verse:'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِنْ قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ',verseRef:'البقرة ٢: ١٨٣',problem:'رؤية الصيام كمجرد جوع وعطش',solution:'الصيام فرصة لتهذيب النفس والتقرب من الله وتقوية الإرادة'},
    en:{title:'Fasting (Sawm)',desc:'Fasting in Ramadan is a pillar of Islam. Fasting refines the soul, teaches patience, and reminds us of the poor. It is an annual school for purifying the soul.',verse:'O you who believe, fasting has been prescribed for you as it was prescribed for those before you, so that you may attain piety.',verseRef:'Al-Baqarah 2:183',problem:'Seeing fasting as merely hunger and thirst',solution:'Fasting is an opportunity to refine the soul, draw closer to God, and strengthen willpower'},
    fr:{title:'Le Jeune (Sawm)',desc:'Le jeune du Ramadan est un pilier de l\'Islam. Le jeune raffine l\'ame, enseigne la patience et nous rappelle les pauvres. C\'est une ecole annuelle pour purifier l\'ame.',verse:'O vous qui croyez, le jeune vous a ete prescrit comme il a ete prescrit a ceux avant vous, afin que vous atteigniez la piete.',verseRef:'Al-Baqarah 2:183',problem:'Voir le jeune comme simplement la faim et la soif',solution:'Le jeune est une opportunite de raffiner l\'ame, se rapprocher de Dieu et renforcer la volonte'}
  },
  {
    id:3, emoji:'💰',
    ar:{title:'الزكاة',desc:'الزكاة تطهّر المال وتزكّي النفس. هي حق الفقير في مال الغني. تبني مجتمعاً متكافلاً وتمنع تكدّس الثروة.',verse:'وَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ',verseRef:'البقرة ٢: ٤٣',problem:'البخل والتعلق بالمال',solution:'الزكاة تطهر المال والنفس وتبني مجتمعاً عادلاً متكافلاً'},
    en:{title:'Charity (Zakat)',desc:'Zakat purifies wealth and refines the soul. It is the right of the poor in the wealth of the rich. It builds a supportive society and prevents wealth hoarding.',verse:'Establish prayer and give zakat.',verseRef:'Al-Baqarah 2:43',problem:'Stinginess and attachment to wealth',solution:'Zakat purifies wealth and soul and builds a fair, supportive society'},
    fr:{title:'L\'Aumone (Zakat)',desc:'La Zakat purifie la richesse et raffine l\'ame. C\'est le droit du pauvre dans la richesse du riche. Elle construit une societe solidaire et empeche l\'accumulation des richesses.',verse:'Accomplissez la priere et acquittez la zakat.',verseRef:'Al-Baqarah 2:43',problem:'L\'avarice et l\'attachement a la richesse',solution:'La Zakat purifie la richesse et l\'ame et construit une societe juste et solidaire'}
  },
  {
    id:4, emoji:'🕋',
    ar:{title:'الحج',desc:'الحج ركن الإسلام الأعظم. رحلة تجمع المسلمين من كل أنحاء العالم. يذكّر بالمساواة بين البشر ويجدّد العهد مع الله.',verse:'وَلِلَّهِ عَلَى النَّاسِ حِجُّ الْبَيْتِ مَنِ اسْتَطَاعَ إِلَيْهِ سَبِيلًا',verseRef:'آل عمران ٣: ٩٧',problem:'التأجيل والتسويف في أداء الحج',solution:'الحج تجربة تحويلية تجدد الإيمان وتوحد الأمة'},
    en:{title:'Pilgrimage (Hajj)',desc:'Hajj is the greatest pillar of Islam. A journey that gathers Muslims from around the world. It reminds of equality among people and renews the covenant with God.',verse:'And due to God from the people is a pilgrimage to the House — for whoever is able to find thereto a way.',verseRef:'Al Imran 3:97',problem:'Procrastinating and delaying Hajj',solution:'Hajj is a transformative experience that renews faith and unites the community'},
    fr:{title:'Le Pelerinage (Hajj)',desc:'Le Hajj est le plus grand pilier de l\'Islam. Un voyage qui rassemble les musulmans du monde entier. Il rappelle l\'egalite entre les gens et renouvelle l\'alliance avec Dieu.',verse:'C\'est un devoir envers Dieu pour les gens qui ont les moyens d\'aller faire le pelerinage de la Maison.',verseRef:'Al Imran 3:97',problem:'La procrastination et le report du Hajj',solution:'Le Hajj est une experience transformatrice qui renouvelle la foi et unit la communaute'}
  }
];

// ═══════════════ QUIZ DATA (20 questions) ═══════════════
const QUIZ_DATA = [
  {q:{ar:'ما هو أساس العقيدة الإسلامية؟',en:'What is the foundation of Islamic creed?',fr:'Quel est le fondement de la croyance islamique ?'},
   opts:{ar:['التوحيد','الصلاة','الحج','الزكاة'],en:['Monotheism','Prayer','Pilgrimage','Charity'],fr:['Le monotheisme','La priere','Le pelerinage','L\'aumone']},
   correct:0, hint:{ar:'كلمة التوحيد هي "لا إله إلا الله"',en:'The word of monotheism is "There is no god but God"',fr:'Le mot du monotheisme est « Il n\'y a de dieu que Dieu »'},
   ref:'Al-Ikhlas 112:1'},
  {q:{ar:'كم عدد أركان الإيمان؟',en:'How many pillars of faith are there?',fr:'Combien de piliers de la foi y a-t-il ?'},
   opts:{ar:['خمسة','ستة','سبعة','أربعة'],en:['Five','Six','Seven','Four'],fr:['Cinq','Six','Sept','Quatre']},
   correct:1, hint:{ar:'تشمل الإيمان بالله والملائكة والكتب والرسل واليوم الآخر والقدر',en:'They include belief in God, angels, books, messengers, the Last Day, and destiny',fr:'Ils comprennent la croyance en Dieu, les anges, les livres, les messagers, le Jour Dernier et le destin'},
   ref:'Hadith Jibril'},
  {q:{ar:'ما هي سورة الإخلاص؟',en:'What does Surah Al-Ikhlas teach?',fr:'Qu\'enseigne la Sourate Al-Ikhlas ?'},
   opts:{ar:['توحيد الله','قصة نوح','أحكام الصلاة','أحكام الزكاة'],en:['God\'s Oneness','Story of Noah','Rules of prayer','Rules of charity'],fr:['L\'unicite de Dieu','L\'histoire de Noe','Les regles de la priere','Les regles de l\'aumone']},
   correct:0, hint:{ar:'سورة قصيرة تبدأ بـ "قل هو الله أحد"',en:'A short surah starting with "Say: He is God, the One"',fr:'Une courte sourate commencant par « Dis : Il est Dieu, l\'Unique »'},
   ref:'Al-Ikhlas 112:1-4'},
  {q:{ar:'من هو خاتم الأنبياء؟',en:'Who is the seal of the prophets?',fr:'Qui est le sceau des prophetes ?'},
   opts:{ar:['محمد ﷺ','عيسى','موسى','إبراهيم'],en:['Muhammad ﷺ','Jesus','Moses','Abraham'],fr:['Muhammad ﷺ','Jesus','Moise','Abraham']},
   correct:0, hint:{ar:'ذُكر في سورة الأحزاب',en:'Mentioned in Surah Al-Ahzab',fr:'Mentionne dans la Sourate Al-Ahzab'},
   ref:'Al-Ahzab 33:40'},
  {q:{ar:'ما أول ما يُحاسب عليه العبد يوم القيامة؟',en:'What is the first thing a person is judged for on Judgment Day?',fr:'Quelle est la premiere chose sur laquelle on sera juge au Jour du Jugement ?'},
   opts:{ar:['الصلاة','الصيام','الزكاة','الحج'],en:['Prayer','Fasting','Zakat','Hajj'],fr:['La priere','Le jeune','La zakat','Le hajj']},
   correct:0, hint:{ar:'هي عماد الدين وأول الأركان العملية',en:'It is the pillar of religion and the first practical pillar',fr:'C\'est le pilier de la religion et le premier pilier pratique'},
   ref:'Prophetic Hadith'},
  {q:{ar:'من أي شيء خُلقت الملائكة؟',en:'What were angels created from?',fr:'De quoi les anges ont-ils ete crees ?'},
   opts:{ar:['نور','نار','طين','ماء'],en:['Light','Fire','Clay','Water'],fr:['Lumiere','Feu','Argile','Eau']},
   correct:0, hint:{ar:'مادة مضيئة ونقية',en:'A luminous and pure substance',fr:'Une substance lumineuse et pure'},
   ref:'Sahih Muslim'},
  {q:{ar:'أي كتاب سماوي محفوظ من التحريف؟',en:'Which divine book is preserved from corruption?',fr:'Quel livre divin est preserve de la corruption ?'},
   opts:{ar:['القرآن','التوراة','الإنجيل','الزبور'],en:['The Quran','The Torah','The Gospel','The Psalms'],fr:['Le Coran','La Torah','L\'Evangile','Les Psaumes']},
   correct:0, hint:{ar:'الله تعهد بحفظه',en:'God promised to protect it',fr:'Dieu a promis de le proteger'},
   ref:'Al-Hijr 15:9'},
  {q:{ar:'ما معنى "لا إله إلا الله"؟',en:'What does "There is no god but God" mean?',fr:'Que signifie « Il n\'y a de dieu que Dieu » ?'},
   opts:{ar:['لا معبود بحق إلا الله','الله أكبر من كل شيء','الله خلق كل شيء','الله رحيم'],en:['No deity worthy of worship except God','God is greater than everything','God created everything','God is merciful'],fr:['Aucune divinite ne merite l\'adoration sauf Dieu','Dieu est plus grand que tout','Dieu a cree tout','Dieu est misericordieux']},
   correct:0, hint:{ar:'تتعلق بالعبادة والاستحقاق',en:'Related to worship and deserving',fr:'Lie a l\'adoration et au merite'},
   ref:'Surah Al-Ikhlas'},
  {q:{ar:'ما هو الشرك؟',en:'What is polytheism (shirk)?',fr:'Qu\'est-ce que le polytheisme (shirk) ?'},
   opts:{ar:['عبادة غير الله','ترك الصلاة','الكذب','الغيبة'],en:['Worshipping other than God','Neglecting prayer','Lying','Backbiting'],fr:['Adorer autre que Dieu','Negliger la priere','Mentir','Medire']},
   correct:0, hint:{ar:'أعظم الذنوب عند الله — جعل شريك لله',en:'The gravest sin — associating partners with God',fr:'Le plus grand peche — associer des partenaires a Dieu'},
   ref:'Luqman 31:13'},
  {q:{ar:'ما اسم الملك الموكل بالوحي؟',en:'What is the name of the angel of revelation?',fr:'Quel est le nom de l\'ange de la revelation ?'},
   opts:{ar:['جبريل','ميكائيل','إسرافيل','عزرائيل'],en:['Gabriel','Michael','Israfil','Azrael'],fr:['Gabriel','Michael','Israfil','Azrael']},
   correct:0, hint:{ar:'نزل بالقرآن على محمد ﷺ',en:'Brought the Quran to Muhammad ﷺ',fr:'A apporte le Coran a Muhammad ﷺ'},
   ref:'Al-Baqarah 2:97'},
  {q:{ar:'ماذا يعني الإيمان بالقضاء والقدر؟',en:'What does belief in divine destiny mean?',fr:'Que signifie la croyance au destin divin ?'},
   opts:{ar:['أن كل شيء بتقدير الله مع بذل الجهد','أن لا نعمل شيئاً','أن نقبل الظلم','أن لا نخطط'],en:['Everything is by God\'s decree while making effort','That we do nothing','That we accept injustice','That we don\'t plan'],fr:['Tout est par le decret de Dieu tout en faisant des efforts','Qu\'on ne fait rien','Qu\'on accepte l\'injustice','Qu\'on ne planifie pas']},
   correct:0, hint:{ar:'الإيمان بالقدر يجمع بين التوكل والعمل',en:'Belief in destiny combines trust and effort',fr:'La croyance au destin combine confiance et effort'},
   ref:'At-Tawbah 9:51'},
  {q:{ar:'كم صلاة فُرضت على المسلمين يومياً؟',en:'How many daily prayers are obligatory for Muslims?',fr:'Combien de prieres quotidiennes sont obligatoires pour les musulmans ?'},
   opts:{ar:['خمس','ثلاث','سبع','أربع'],en:['Five','Three','Seven','Four'],fr:['Cinq','Trois','Sept','Quatre']},
   correct:0, hint:{ar:'الفجر، الظهر، العصر، المغرب، العشاء',en:'Fajr, Dhuhr, Asr, Maghrib, Isha',fr:'Fajr, Dhuhr, Asr, Maghrib, Isha'},
   ref:'Al-Isra 17:78'},
  {q:{ar:'ما الحكمة من الصيام؟',en:'What is the wisdom behind fasting?',fr:'Quelle est la sagesse du jeune ?'},
   opts:{ar:['تحقيق التقوى','إظهار القوة','العقوبة','التباهي'],en:['Achieving piety','Showing strength','Punishment','Showing off'],fr:['Atteindre la piete','Montrer la force','La punition','L\'ostentation']},
   correct:0, hint:{ar:'الآية تنتهي بـ "لعلكم تتقون"',en:'The verse ends with "so that you may attain piety"',fr:'Le verset se termine par « afin que vous atteigniez la piete »'},
   ref:'Al-Baqarah 2:183'},
  {q:{ar:'ما هي تزكية النفس؟',en:'What is purification of the soul?',fr:'Qu\'est-ce que la purification de l\'ame ?'},
   opts:{ar:['تطهير النفس من الرذائل','الغسل بالماء','الصيام فقط','العزلة عن الناس'],en:['Purifying the soul from vices','Washing with water','Only fasting','Isolation from people'],fr:['Purifier l\'ame des vices','Se laver avec de l\'eau','Seulement le jeune','L\'isolement des gens']},
   correct:0, hint:{ar:'تشمل العبادة والذكر والمحاسبة — تطهير القلب',en:'Includes worship, remembrance, and accountability — purifying the heart',fr:'Comprend l\'adoration, le rappel et l\'evaluation — purifier le coeur'},
   ref:'Ash-Shams 91:9-10'},
  {q:{ar:'ما علاقة الأخلاق بالعقيدة؟',en:'What is the relationship between ethics and creed?',fr:'Quelle est la relation entre l\'ethique et la croyance ?'},
   opts:{ar:['الأخلاق ثمرة العقيدة الصحيحة','لا علاقة بينهما','الأخلاق تغني عن العقيدة','العقيدة تغني عن الأخلاق'],en:['Ethics are the fruit of sound creed','No relationship','Ethics replace creed','Creed replaces ethics'],fr:['L\'ethique est le fruit d\'une croyance saine','Aucune relation','L\'ethique remplace la croyance','La croyance remplace l\'ethique']},
   correct:0, hint:{ar:'قال النبي: "إنما بعثت لأتمم مكارم الأخلاق"',en:'The Prophet said: "I was sent to perfect noble character"',fr:'Le Prophete a dit : « J\'ai ete envoye pour parfaire les nobles caracteres »'},
   ref:'Prophetic Hadith'},
  {q:{ar:'ما هو آخر كتاب سماوي نزل؟',en:'What is the last divine book revealed?',fr:'Quel est le dernier livre divin revele ?'},
   opts:{ar:['القرآن الكريم','الإنجيل','التوراة','الزبور'],en:['The Holy Quran','The Gospel','The Torah','The Psalms'],fr:['Le Saint Coran','L\'Evangile','La Torah','Les Psaumes']},
   correct:0, hint:{ar:'نزل على خاتم الأنبياء',en:'Revealed to the seal of the prophets',fr:'Revele au sceau des prophetes'},
   ref:'Al-Hijr 15:9'},
  {q:{ar:'ما الركن الخامس من أركان الإسلام؟',en:'What is the fifth pillar of Islam?',fr:'Quel est le cinquieme pilier de l\'Islam ?'},
   opts:{ar:['الحج','الصيام','الزكاة','الشهادة'],en:['Hajj','Fasting','Zakat','Testimony'],fr:['Le Hajj','Le jeune','La zakat','Le temoignage']},
   correct:0, hint:{ar:'رحلة إلى مكة المكرمة',en:'A journey to Mecca',fr:'Un voyage a La Mecque'},
   ref:'Al Imran 3:97'},
  {q:{ar:'لماذا يحترم الإسلام العقل؟',en:'Why does Islam respect reason?',fr:'Pourquoi l\'Islam respecte-t-il la raison ?'},
   opts:{ar:['لأنه يدعو للتفكر والتدبر','لأنه يرفض الوحي','لأنه يعتمد على الفلسفة فقط','لأنه يرفض الإيمان'],en:['Because it calls for reflection','Because it rejects revelation','Because it relies only on philosophy','Because it rejects faith'],fr:['Parce qu\'il appelle a la reflexion','Parce qu\'il rejette la revelation','Parce qu\'il ne s\'appuie que sur la philosophie','Parce qu\'il rejette la foi']},
   correct:0, hint:{ar:'القرآن مليء بآيات "أفلا تعقلون"',en:'The Quran is full of verses like "Do you not reason?"',fr:'Le Coran est plein de versets comme « Ne raisonnez-vous pas ? »'},
   ref:'Muhammad 47:24'},
  {q:{ar:'ما معنى "فطرة الله"؟',en:'What does "fitrah of God" mean?',fr:'Que signifie « fitrah de Dieu » ?'},
   opts:{ar:['الطبيعة السليمة التي خُلق عليها الإنسان','العادات المكتسبة','الثقافة المجتمعية','التعليم المدرسي'],en:['The pure nature upon which humans were created','Acquired habits','Social culture','School education'],fr:['La nature pure selon laquelle les humains ont ete crees','Les habitudes acquises','La culture sociale','L\'education scolaire']},
   correct:0, hint:{ar:'كل إنسان يولد على هذه الطبيعة',en:'Every human is born with this nature',fr:'Chaque humain nait avec cette nature'},
   ref:'Ar-Rum 30:30'}
];

// ═══════════════ DUAS DATA ═══════════════
const DUAS = [
  {ar:{label:'دعاء الإيمان',text:'اللَّهُمَّ إِنِّي أَسْأَلُكَ إِيمَانًا لَا يَرْتَدُّ، وَنَعِيمًا لَا يَنْفَدُ، وَمُرَافَقَةَ النَّبِيِّ مُحَمَّدٍ فِي أَعْلَى جَنَّةِ الْخُلْدِ',tr:'اللهم ثبتنا على الإيمان'},en:{label:'Dua for Faith',text:'O God, I ask You for faith that does not waver, bliss that does not end, and the companionship of Prophet Muhammad in the highest Paradise.',tr:'O God, keep us firm in faith'},fr:{label:'Dua pour la Foi',text:'O Dieu, je Te demande une foi qui ne faiblit pas, un bonheur qui ne s\'epuise pas, et la compagnie du Prophete Muhammad au plus haut du Paradis.',tr:'O Dieu, affermis-nous dans la foi'}},
  {ar:{label:'دعاء التوحيد',text:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',tr:'من أعظم أذكار التوحيد'},en:{label:'Dua of Monotheism',text:'There is no god but God alone with no partner. To Him belongs the kingdom and praise, and He is over all things capable.',tr:'One of the greatest remembrances of monotheism'},fr:{label:'Dua du Monotheisme',text:'Il n\'y a de dieu que Dieu seul sans associe. A Lui le royaume et la louange, et Il est Omnipotent.',tr:'L\'un des plus grands rappels du monotheisme'}},
  {ar:{label:'دعاء الهداية',text:'اللَّهُمَّ اهْدِنِي وَسَدِّدْنِي',tr:'دعاء قصير وعظيم المعنى'},en:{label:'Dua for Guidance',text:'O God, guide me and direct me.',tr:'A short yet profound prayer'},fr:{label:'Dua pour la Guidance',text:'O Dieu, guide-moi et dirige-moi.',tr:'Une priere courte mais profonde'}},
  {ar:{label:'دعاء الثبات',text:'يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَىٰ دِينِكَ',tr:'من أكثر أدعية النبي ﷺ'},en:{label:'Dua for Steadfastness',text:'O Turner of hearts, keep my heart firm upon Your religion.',tr:'One of the Prophet\'s most frequent prayers'},fr:{label:'Dua pour la Constance',text:'O Celui qui retourne les coeurs, affermis mon coeur sur Ta religion.',tr:'L\'une des prieres les plus frequentes du Prophete'}},
  {ar:{label:'دعاء العلم',text:'رَبِّ زِدْنِي عِلْمًا',tr:'دعاء طلب العلم'},en:{label:'Dua for Knowledge',text:'My Lord, increase me in knowledge.',tr:'The prayer for seeking knowledge'},fr:{label:'Dua pour la Connaissance',text:'Mon Seigneur, augmente ma connaissance.',tr:'La priere pour rechercher la connaissance'}},
  {ar:{label:'دعاء التوكل',text:'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ',tr:'دعاء الكفاية والتوكل'},en:{label:'Dua of Trust',text:'God is sufficient for me. There is no deity except Him. On Him I rely, and He is the Lord of the Great Throne.',tr:'The prayer of sufficiency and trust'},fr:{label:'Dua de Confiance',text:'Dieu me suffit. Il n\'y a de divinite que Lui. En Lui je me confie, et Il est le Seigneur du Trone Immense.',tr:'La priere de suffisance et de confiance'}}
];

// ═══════════════ GLOBALS ═══════════════
let lang = localStorage.getItem('aqm-lang') || 'ar';
let theme = localStorage.getItem('aqm-theme') || 'ocean';
const themes = ['ocean', 'night', 'desert'];
const themeIcons = ['🌊', '🌙', '🏜️'];
const themeNames = { ocean: 'Ocean / محيط', night: 'Night / ليل', desert: 'Desert / صحراء' };
let currentCardIdx = -1;
let ageMode = localStorage.getItem('aqm-age') || 'teen';

// XP & Badge System
let xp = parseInt(localStorage.getItem('aqm-xp') || '0');
let readCards = JSON.parse(localStorage.getItem('aqm-read') || '[]');
let quizScore = parseInt(localStorage.getItem('aqm-quiz-score') || '0');
let quizTotal = parseInt(localStorage.getItem('aqm-quiz-total') || '0');
let currentQuizIdx = -1;
let usedLifelines = {};

// ═══════════════ INIT ═══════════════
document.addEventListener('DOMContentLoaded', () => {
  setTheme(theme);
  setLang(lang);
  initTabs();
  initSplash();
  initScrollTop();
  renderHome();
  renderCreed();
  renderPillars();
  renderQuiz();
  renderAbout();
  renderHelp();
  renderDuas();
  renderXPBar();
  initScrollReveal();
  initKeyboardNav();
});

// ═══════════════ SPLASH ═══════════════
function initSplash() {
  let count = 5;
  const el = document.getElementById('splashCount');
  const featuresEl = document.getElementById('splashFeatures');
  if (featuresEl) {
    featuresEl.innerHTML = T[lang].splashFeatures.map((f, i) =>
      `<div class="splash-feature" style="animation-delay:${0.3 + i * 0.3}s">${f}</div>`
    ).join('');
  }
  const interval = setInterval(() => {
    count--;
    if (el) el.textContent = count;
    if (count <= 0) { dismissSplash(); clearInterval(interval); }
  }, 1000);
}
function dismissSplash() {
  const s = document.getElementById('splash');
  if (s) { s.classList.add('hidden'); setTimeout(() => s.style.display = 'none', 500); }
  playSound('click');
}

// ═══════════════ LANGUAGE ═══════════════
function setLang(l) {
  lang = l;
  localStorage.setItem('aqm-lang', l);
  const isRTL = l === 'ar';
  document.documentElement.lang = l;
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.body.dir = isRTL ? 'rtl' : 'ltr';
  document.querySelectorAll('.lang-opt').forEach(b => b.classList.toggle('active', b.dataset.lang === l));
  const t = T[l];
  const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val; };
  set('appTitle', t.appTitle); set('splashSub', t.splashSub); set('splashHint', t.splashHint);
  set('tabHome', t.tabHome); set('tabCreed', t.tabCreed); set('tabPillars', t.tabPillars);
  set('tabQuiz', t.tabQuiz); set('tabAbout', t.tabAbout);
  set('creedTitle', t.creedTitle); set('creedDesc', t.creedDesc);
  set('pillarsTitle', t.pillarsTitle); set('pillarsDesc', t.pillarsDesc);
  set('quizTitle', t.quizTitle); set('quizDesc', t.quizDesc);
  set('helpTitle', t.helpTitle); set('duaPanelTitle', t.duaPanelTitle);
  renderHome(); renderCreed(); renderPillars(); renderQuiz(); renderAbout(); renderHelp(); renderDuas(); renderXPBar();
  const featuresEl = document.getElementById('splashFeatures');
  if (featuresEl) {
    featuresEl.innerHTML = T[l].splashFeatures.map((f, i) =>
      `<div class="splash-feature" style="animation-delay:${0.3 + i * 0.3}s">${f}</div>`
    ).join('');
  }
}

// ═══════════════ THEME ═══════════════
function setTheme(t) {
  theme = t;
  document.documentElement.dataset.theme = t;
  localStorage.setItem('aqm-theme', t);
  const idx = themes.indexOf(t);
  const el = document.getElementById('themeIcon');
  if (el) el.textContent = themeIcons[idx];
}
function cycleTheme() {
  const idx = (themes.indexOf(theme) + 1) % themes.length;
  setTheme(themes[idx]);
  showToast(themeNames[themes[idx]]);
  playSound('theme');
}

// ═══════════════ TABS ═══════════════
function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      const panel = document.getElementById('panel-' + tab.dataset.tab);
      if (panel) panel.classList.add('active');
      window.scrollTo({top: 0, behavior: 'smooth'});
      playSound('click');
    });
  });
}

// ═══════════════ AGE MODE ═══════════════
function toggleAgeMode() {
  ageMode = ageMode === 'young' ? 'teen' : 'young';
  localStorage.setItem('aqm-age', ageMode);
  document.body.classList.toggle('young-mode', ageMode === 'young');
  renderCreed(); renderPillars();
  showToast(ageMode === 'young' ? T[lang].youngMode : T[lang].teenMode);
  playSound('click');
}

// ═══════════════ XP & BADGES ═══════════════
function addXP(pts) {
  xp += pts;
  localStorage.setItem('aqm-xp', xp);
  renderXPBar();
}
function getLevel() {
  if (xp >= 500) return 5;
  if (xp >= 300) return 4;
  if (xp >= 150) return 3;
  if (xp >= 50) return 2;
  return 1;
}
function getBadge() {
  const lvl = getLevel();
  const badges = T[lang].badges;
  if (lvl >= 5) return badges.expert;
  if (lvl >= 4) return badges.persistent;
  if (lvl >= 3) return badges.scholar;
  if (lvl >= 2) return badges.reader;
  return badges.beginner;
}
function renderXPBar() {
  const bar = document.getElementById('xpBar');
  const lvl = getLevel();
  const thresholds = [0, 50, 150, 300, 500];
  const nextThreshold = lvl < 5 ? thresholds[lvl] : 500;
  const prevThreshold = thresholds[lvl - 1] || 0;
  const pct = lvl >= 5 ? 100 : Math.min(100, ((xp - prevThreshold) / (nextThreshold - prevThreshold)) * 100);
  bar.innerHTML = `
    <div class="xp-info">
      <span class="xp-badge">${getBadge()}</span>
      <span class="xp-level">${T[lang].levelLabel} ${lvl}</span>
      <span class="xp-points">${xp} ${T[lang].xpLabel}</span>
    </div>
    <div class="xp-bar-track"><div class="xp-bar-fill" style="width:${pct}%"></div></div>
  `;
}
function markCardRead(cardId) {
  if (!readCards.includes(cardId)) {
    readCards.push(cardId);
    localStorage.setItem('aqm-read', JSON.stringify(readCards));
    addXP(10);
  }
}

// ═══════════════ RENDER: HOME ═══════════════
function renderHome() {
  const t = T[lang];
  const dayIdx = new Date().getDate() % CREED.length;
  const c = CREED[dayIdx];
  const cd = c[lang];
  const desc = ageMode === 'young' ? cd.young : cd.desc;
  (document.getElementById('dailyCard')||{}).innerHTML= `
    <div class="daily-label">${t.dailyLabel}</div>
    <div class="daily-title">${cd.title}</div>
    <div class="daily-body">${desc}</div>
    <div class="daily-action" onclick="document.querySelector('[data-tab=creed]').click()">${t.tabCreed} &#8594;</div>
  `;
  const sections = [
    {icon:'☝️',tab:'creed',title:t.tabCreed,desc:lang==='ar'?'٢٠ أصلاً للعقيدة':lang==='fr'?'20 fondements':'20 foundations'},
    {icon:'🕌',tab:'pillars',title:t.tabPillars,desc:lang==='ar'?'صلاة، صيام، زكاة، حج':lang==='fr'?'Priere, jeune, zakat, hajj':'Prayer, fasting, zakat, hajj'},
    {icon:'🏆',tab:'quiz',title:t.tabQuiz,desc:lang==='ar'?'اختبر معلوماتك':lang==='fr'?'Testez-vous':'Test yourself'},
    {icon:'📖',tab:'about',title:t.tabAbout,desc:lang==='ar'?'عن الكتاب والمؤلف':lang==='fr'?'Le livre et l\'auteur':'Book & author'},
  ];
  (document.getElementById('homeGrid')||{}).innerHTML= sections.map(s => `
    <div class="home-card" onclick="document.querySelector('[data-tab=${s.tab}]').click()">
      <span class="hc-icon">${s.icon}</span>
      <div class="hc-title">${s.title}</div>
      <div class="hc-desc">${s.desc}</div>
    </div>
  `).join('');
}

// ═══════════════ RENDER: CREED (20 cards) ═══════════════
function renderCreed() {
  const t = T[lang];
  const searchBar = `<div class="search-bar"><input type="text" id="creedSearch" class="search-input" placeholder="${t.searchPlaceholder}" oninput="filterCreed(this.value)"><span class="search-icon">🔍</span></div>`;
  const ageBtnLabel = ageMode === 'young' ? t.teenMode : t.youngMode;
  const ageBtn = `<button class="age-toggle-btn" onclick="toggleAgeMode()">${ageBtnLabel}</button>`;
  const cards = CREED.map((c, i) => {
    const d = c[lang];
    const desc = ageMode === 'young' ? d.young : d.desc;
    const isRead = readCards.includes('creed-' + c.id);
    return `
    <div class="creed-card scroll-reveal ${isRead ? 'card-read' : ''}" id="creed-${c.id}" data-search="${d.title.toLowerCase()}">
      <div class="creed-head" onclick="toggleCard('creed-${c.id}'); markCardRead('creed-${c.id}')">
        <span class="creed-num">${c.id}</span>
        <span class="creed-emoji">${c.emoji}</span>
        <span class="creed-title">${d.title}</span>
        <span class="creed-chev">&#9660;</span>
      </div>
      <div class="creed-body">
        <div class="creed-inner">
          <p class="creed-desc">${desc}</p>
          <div class="verse-box">
            <div class="verse-arabic">${d.verse}</div>
            <div class="verse-ref">${d.verseRef}</div>
          </div>
          <div class="action-box">
            <span class="action-icon">💡</span>
            <span>${d.action}</span>
          </div>
          <button class="share-btn" onclick="event.stopPropagation();shareCreed(${i})">
            <span class="share-icon">&#128279;</span> ${t.share}
          </button>
        </div>
      </div>
    </div>`;
  }).join('');
  (document.getElementById('creedContainer')||{}).innerHTML= ageBtn + searchBar + cards;
}

function filterCreed(query) {
  const q = query.toLowerCase().trim();
  document.querySelectorAll('.creed-card').forEach(card => {
    const searchText = card.dataset.search || '';
    const title = card.querySelector('.creed-title');
    const titleText = title ? title.textContent.toLowerCase() : '';
    const match = !q || searchText.includes(q) || titleText.includes(q);
    card.style.display = match ? '' : 'none';
  });
}

async function shareCreed(idx) {
  const c = CREED[idx];
  const d = c[lang];
  const text = `${c.emoji} ${d.title}\n\n${d.desc}\n\n📖 ${d.verseRef}\n\n— عقيدة المسلم | The Muslim's Creed`;
  if (navigator.share) {
    try { await navigator.share({ title: d.title, text }); } catch(e) {}
  } else {
    try { await navigator.clipboard.writeText(text); showToast(lang === 'ar' ? 'تم النسخ!' : lang === 'fr' ? 'Copie !' : 'Copied!'); } catch(e) { showToast('Could not copy'); }
  }
}

// ═══════════════ RENDER: PILLARS ═══════════════
function renderPillars() {
  const t = T[lang];
  (document.getElementById('pillarsContainer')||{}).innerHTML= PILLARS.map(p => {
    const d = p[lang];
    return `
    <div class="pillar-card scroll-reveal">
      <div class="pillar-header">
        <span class="pillar-emoji">${p.emoji}</span>
        <span class="pillar-title">${d.title}</span>
      </div>
      <p class="pillar-desc">${d.desc}</p>
      <div class="pillar-problem">
        <span class="pillar-label">${lang==='ar'?'😰 المشكلة':lang==='fr'?'😰 Le Probleme':'😰 The Problem'}</span>
        ${d.problem}
      </div>
      <div class="pillar-solution">
        <span class="pillar-label">${lang==='ar'?'😌 الحل':lang==='fr'?'😌 La Solution':'😌 The Solution'}</span>
        ${d.solution}
      </div>
      <div class="verse-box">
        <div class="verse-arabic">${d.verse}</div>
        <div class="verse-ref">${d.verseRef}</div>
      </div>
    </div>`;
  }).join('');
}

// ═══════════════ RENDER: QUIZ ("Who Wants to Be a Scholar?") ═══════════════
function renderQuiz() {
  if (currentQuizIdx < 0) pickNewQuestion();
  renderQuizQuestion();
}

function pickNewQuestion() {
  const available = QUIZ_DATA.map((_, i) => i);
  currentQuizIdx = available[Math.floor(Math.random() * available.length)];
  usedLifelines = {};
}

function renderQuizQuestion() {
  const t = T[lang];
  const q = QUIZ_DATA[currentQuizIdx];
  const container = document.getElementById('quizContainer');
  if (!container) return;
  const opts = q.opts[lang].map((o, i) => {
    const hidden = usedLifelines.fiftyFifty && usedLifelines.removed && usedLifelines.removed.includes(i);
    return `<button class="quiz-opt ${hidden ? 'hidden' : ''}" id="qopt-${i}" onclick="checkAnswer(${i})" ${hidden ? 'disabled' : ''}>${o}</button>`;
  }).join('');

  container.innerHTML = `
    <div class="quiz-score-bar">
      <span>🏆 ${quizScore}/${quizTotal}</span>
      <span>${getBadge()}</span>
    </div>
    <div class="quiz-question scroll-reveal">
      <div class="quiz-q-text">${q.q[lang]}</div>
      <div class="quiz-options">${opts}</div>
    </div>
    <div class="quiz-lifelines">
      <button class="lifeline-btn ${usedLifelines.fiftyFifty ? 'used' : ''}" onclick="useFiftyFifty()" ${usedLifelines.fiftyFifty ? 'disabled' : ''}>${t.fiftyFifty}</button>
      <button class="lifeline-btn ${usedLifelines.hint ? 'used' : ''}" onclick="useHint()" ${usedLifelines.hint ? 'disabled' : ''}>${t.hintBtn}</button>
      <button class="lifeline-btn ${usedLifelines.quranRef ? 'used' : ''}" onclick="useQuranRef()" ${usedLifelines.quranRef ? 'disabled' : ''}>${t.quranRef}</button>
    </div>
    <div id="quizFeedback" class="quiz-feedback hidden"></div>
  `;
  document.getElementById('quizResult').classList.add('hidden');
}

function checkAnswer(idx) {
  const q = QUIZ_DATA[currentQuizIdx];
  const t = T[lang];
  const feedback = document.getElementById('quizFeedback');
  const isCorrect = idx === q.correct;

  quizTotal++;
  localStorage.setItem('aqm-quiz-total', quizTotal);

  // Highlight answers
  document.querySelectorAll('.quiz-opt').forEach((o, i) => {
    o.disabled = true;
    if (i === q.correct) o.classList.add('correct');
    if (i === idx && !isCorrect) o.classList.add('wrong');
  });

  if (isCorrect) {
    quizScore++;
    localStorage.setItem('aqm-quiz-score', quizScore);
    addXP(5);
    feedback.innerHTML = `<div class="feedback-correct">✅ ${t.correct}</div>`;
    playSound('success');
  } else {
    feedback.innerHTML = `<div class="feedback-wrong">❌ ${t.wrong}</div>`;
    playSound('click');
  }
  feedback.classList.remove('hidden');

  // Show next button
  feedback.innerHTML += `<button class="quiz-submit" onclick="nextQuestion()" style="margin-top:12px">${t.nextQ}</button>`;
  renderXPBar();
}

function nextQuestion() {
  pickNewQuestion();
  renderQuizQuestion();
}

function useFiftyFifty() {
  const q = QUIZ_DATA[currentQuizIdx];
  usedLifelines.fiftyFifty = true;
  // Remove 2 wrong answers
  const wrongIdxs = [0,1,2,3].filter(i => i !== q.correct);
  const toRemove = wrongIdxs.sort(() => Math.random() - 0.5).slice(0, 2);
  usedLifelines.removed = toRemove;
  toRemove.forEach(i => {
    const el = document.getElementById('qopt-' + i);
    if (el) { el.classList.add('hidden'); el.disabled = true; }
  });
  document.querySelector('.lifeline-btn').classList.add('used');
  document.querySelector('.lifeline-btn').disabled = true;
  playSound('click');
}

function useHint() {
  const q = QUIZ_DATA[currentQuizIdx];
  usedLifelines.hint = true;
  const feedback = document.getElementById('quizFeedback');
  feedback.innerHTML = `<div class="feedback-hint">💡 ${q.hint[lang]}</div>`;
  feedback.classList.remove('hidden');
  document.querySelectorAll('.lifeline-btn')[1].classList.add('used');
  document.querySelectorAll('.lifeline-btn')[1].disabled = true;
  playSound('click');
}

function useQuranRef() {
  const q = QUIZ_DATA[currentQuizIdx];
  usedLifelines.quranRef = true;
  const feedback = document.getElementById('quizFeedback');
  feedback.innerHTML = `<div class="feedback-hint">📖 ${q.ref}</div>`;
  feedback.classList.remove('hidden');
  document.querySelectorAll('.lifeline-btn')[2].classList.add('used');
  document.querySelectorAll('.lifeline-btn')[2].disabled = true;
  playSound('click');
}

// ═══════════════ RENDER: ABOUT ═══════════════
function renderAbout() {
  const about = {
    ar: {
      disclaimerTitle: '⚠️ تنبيه مهم',
      disclaimer: 'هذا التطبيق مستوحى من كتاب الشيخ محمد الغزالي رحمه الله، وليس بديلاً عن قراءة الكتاب الأصلي. المحتوى ملخصات تعليمية مبسطة وليست نقلاً حرفياً. قد تحتوي على تبسيط لأفكار المؤلف. يُرجى الرجوع للكتاب الأصلي وللعلماء المتخصصين.',
      authorName: 'الشيخ محمد الغزالي',
      authorDates: '١٩١٧ — ١٩٩٦',
      authorBio: 'عالم ومفكر إسلامي مصري، لُقب بـ"أديب الدعوة". ألّف أكثر من ٩٤ كتاباً. درس في الأزهر، ودرّس في جامعة الأمير عبد القادر بقسنطينة (الجزائر). حاصل على جائزة الملك فيصل. عُرف بالتجديد ومحاربة الجمود والتشدد.',
      bookTitle: 'عن الكتاب',
      bookDesc: '"عقيدة المسلم" كتاب في ٩ فصول: وجود الله، الوحدة المطلقة (التوحيد)، الكمال الأعلى (صفات الله)، القضاء والقدر، العمل أساس الإيمان، الخطيئة والمتاب، خلافات لا مبرر لها، الأنبياء، والخلود. يرى الغزالي أن العقيدة طبيعة لا علم، وشعور لا فلسفة، وخُلق لا رأي.',
      sourcesTitle: 'المصادر',
      sources: ['كتاب "عقيدة المسلم" — الشيخ محمد الغزالي — دار نهضة مصر','القرآن الكريم','صحيح البخاري ومسلم'],
      contact: 'تواصل: abdelhak.bourdim@gmail.com'
    },
    en: {
      disclaimerTitle: '⚠️ Important Notice',
      disclaimer: 'I am not a scholar or mufti. This is a humble effort by a Muslim who loves Sheikh al-Ghazali\'s books. Content is derived from the book and trusted Islamic sources. This is not a fatwa.',
      authorName: 'Sheikh Mohammed al-Ghazali',
      authorDates: '1917 — 1996',
      authorBio: 'Egyptian Islamic scholar and thinker, nicknamed "The Literary Preacher." Author of 94+ books. Studied at Al-Azhar, taught at the University of Emir Abdelkader in Constantine, Algeria. King Faisal Award winner. Known for renewal, fighting rigidity, and accessible writing.',
      bookTitle: 'About the Book',
      bookDesc: '"The Muslim\'s Creed" has 9 chapters: God\'s Existence, Absolute Oneness (Tawhid), Supreme Perfection (Attributes), Divine Decree, Action as Foundation of Faith, Sin and Repentance, Unjustified Disputes, The Prophets, and Eternity. Al-Ghazali views creed as nature not science, feeling not philosophy, morality not opinion.',
      sourcesTitle: 'Sources',
      sources: ['"The Muslim\'s Creed" (Aqidat al-Muslim) — Sheikh Mohammed al-Ghazali — Dar Nahdet Misr','The Holy Quran','Sahih al-Bukhari and Muslim'],
      contact: 'Contact: abdelhak.bourdim@gmail.com'
    },
    fr: {
      disclaimerTitle: '⚠️ Avis Important',
      disclaimer: 'Je ne suis ni savant ni mufti. C\'est un effort humble d\'un musulman qui aime les livres du Sheikh al-Ghazali. Le contenu est tire du livre et de sources islamiques fiables. Ce n\'est pas une fatwa.',
      authorName: 'Sheikh Mohammed al-Ghazali',
      authorDates: '1917 — 1996',
      authorBio: 'Savant et penseur islamique egyptien, surnomme « Le Litteraire de la Predication ». Auteur de plus de 94 livres. Diplome d\'Al-Azhar, professeur a l\'Universite Emir Abdelkader de Constantine (Algerie). Laureat du Prix Roi Faysal. Connu pour le renouveau et l\'ecriture accessible.',
      bookTitle: 'A Propos du Livre',
      bookDesc: '« La Croyance du Musulman » comprend 9 chapitres : Existence de Dieu, Unite Absolue (Tawhid), Perfection Supreme (Attributs), Decret Divin, Action Fondement de la Foi, Peche et Repentir, Disputes Injustifiees, Les Prophetes, et Eternite. Al-Ghazali voit la croyance comme nature non science, sentiment non philosophie, moralite non opinion.',
      sourcesTitle: 'Sources',
      sources: ['« La Croyance du Musulman » (Aqidat al-Muslim) — Sheikh Mohammed al-Ghazali — Dar Nahdet Misr','Le Saint Coran','Sahih al-Bukhari et Muslim'],
      contact: 'Contact : abdelhak.bourdim@gmail.com'
    }
  };
  const a = about[lang];
  (document.getElementById('aboutContainer')||{}).innerHTML= `
    <div class="about-disclaimer">
      <div class="about-disclaimer-title">${a.disclaimerTitle}</div>
      <p>${a.disclaimer}</p>
    </div>
    <div class="about-author">
      <span class="about-author-icon">📚</span>
      <div class="about-author-info">
        <div class="about-author-name">${a.authorName}</div>
        <div class="about-author-dates">${a.authorDates}</div>
        <div class="about-author-bio">${a.authorBio}</div>
      </div>
    </div>
    <div class="about-section">
      <div class="about-section-title">${a.bookTitle}</div>
      <p class="about-text">${a.bookDesc}</p>
    </div>
    <div class="about-section">
      <div class="about-section-title">${a.sourcesTitle}</div>
      ${a.sources.map(s => `<p class="about-text">&#8226; ${s}</p>`).join('')}
    </div>
    <div class="about-section">
      <p class="about-text">${a.contact}</p>
    </div>
  `;
}

// ═══════════════ RENDER: HELP ═══════════════
function renderHelp() {
  const help = {
    ar: [
      {title:'⚠️ تنبيه',body:'لست عالماً. هذا جهد متواضع لنشر عقيدة الشيخ الغزالي بطريقة تفاعلية.'},
      {title:'📚 المصادر',body:'كتاب "عقيدة المسلم" للشيخ محمد الغزالي، القرآن الكريم، السنة النبوية.'},
      {title:'✨ المميزات',body:'ثلاث لغات، ٣ أنماط، ٢٠ أصلاً للعقيدة، ٤ أركان عبادة، اختبار تفاعلي مع نقاط وأوسمة، وضع المستكشف الصغير.'},
      {title:'⌨️ اختصارات',body:'استخدم الأسهم للتنقل. اضغط Escape لإغلاق اللوحات.'},
      {title:'🤝 المساهمة',body:'GitHub: github.com/abourdim/aqidat-al-muslim'},
    ],
    en: [
      {title:'⚠️ Disclaimer',body:'I am not a scholar. This is a humble effort to share Sheikh al-Ghazali\'s creed teachings interactively.'},
      {title:'📚 Sources',body:'"The Muslim\'s Creed" by Sheikh Mohammed al-Ghazali, the Holy Quran, Prophetic Sunnah.'},
      {title:'✨ Features',body:'Three languages, 3 themes, 20 creed foundations, 4 worship pillars, interactive quiz with XP and badges, Young Explorer mode.'},
      {title:'⌨️ Shortcuts',body:'Use arrow keys to navigate. Press Escape to close panels.'},
      {title:'🤝 Contributing',body:'GitHub: github.com/abourdim/aqidat-al-muslim'},
    ],
    fr: [
      {title:'⚠️ Avertissement',body:'Je ne suis pas un savant. C\'est un effort humble pour partager les enseignements du Sheikh al-Ghazali.'},
      {title:'📚 Sources',body:'« La Croyance du Musulman » par Sheikh Mohammed al-Ghazali, le Saint Coran, la Sunnah.'},
      {title:'✨ Fonctionnalites',body:'Trois langues, 3 themes, 20 fondements, 4 piliers de culte, quiz interactif avec XP et badges, mode Jeune Explorateur.'},
      {title:'⌨️ Raccourcis',body:'Utilisez les fleches pour naviguer. Echap pour fermer les panneaux.'},
      {title:'🤝 Contribuer',body:'GitHub : github.com/abourdim/aqidat-al-muslim'},
    ]
  };
  (document.getElementById('helpBody')||{}).innerHTML= help[lang].map(h => `
    <div class="help-item">
      <div class="help-item-title">${h.title}</div>
      <div>${h.body}</div>
    </div>
  `).join('');
}

// ═══════════════ RENDER: DUAS ═══════════════
function renderDuas() {
  (document.getElementById('duaPanelContent')||{}).innerHTML= DUAS.map(d => {
    const dd = d[lang];
    return `
    <div class="dua-item">
      <div class="dua-item-label">${dd.label}</div>
      <div class="dua-item-ar">${dd.text}</div>
      <div class="dua-item-tr">${dd.tr}</div>
    </div>`;
  }).join('');
}

// ═══════════════ SCROLL REVEAL ═══════════════
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  window._scrollObserver = observer;
  function observeAll() {
    document.querySelectorAll('.scroll-reveal:not(.revealed)').forEach(el => observer.observe(el));
  }
  observeAll();
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => setTimeout(observeAll, 100));
  });
}

// ═══════════════ KEYBOARD NAVIGATION ═══════════════
function initKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const helpPanel = document.getElementById('helpPanel');
      if (!helpPanel.classList.contains('hidden')) { toggleHelp(); return; }
      const duaPanel = document.getElementById('duaPanel');
      if (!duaPanel.classList.contains('hidden')) { toggleDuaPanel(); return; }
      document.querySelectorAll('.creed-card.open').forEach(c => c.classList.remove('open'));
    }
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const creedPanel = document.getElementById('panel-creed');
      if (!creedPanel || !creedPanel.classList.contains('active')) return;
      if (document.activeElement && document.activeElement.id === 'creedSearch') return;
      e.preventDefault();
      const cards = Array.from(document.querySelectorAll('.creed-card')).filter(c => c.style.display !== 'none');
      if (cards.length === 0) return;
      if (currentCardIdx >= 0 && currentCardIdx < cards.length) cards[currentCardIdx].classList.remove('open');
      const dir = (document.documentElement.dir === 'rtl') ? (e.key === 'ArrowRight' ? -1 : 1) : (e.key === 'ArrowRight' ? 1 : -1);
      currentCardIdx = Math.max(0, Math.min(cards.length - 1, currentCardIdx + dir));
      cards[currentCardIdx].classList.add('open');
      cards[currentCardIdx].scrollIntoView({ behavior: 'smooth', block: 'center' });
      playSound('click');
    }
  });
}

// ═══════════════ UTILITIES ═══════════════
function toggleCard(id) {
  const card = document.getElementById(id);
  if (card) { card.classList.toggle('open'); playSound('click'); }
}
function toggleHelp() {
  document.getElementById('helpPanel').classList.toggle('hidden');
  playSound('click');
}
function toggleDuaPanel() {
  document.getElementById('duaPanel').classList.toggle('hidden');
  playSound('click');
}
function showToast(msg) {
  const t = document.getElementById('toast');
  const m = document.getElementById('toastMsg');
  if (t && m) { m.textContent = msg; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
}
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  window.addEventListener('scroll', () => {
    if (btn) btn.classList.toggle('visible', window.scrollY > 300);
  });
}

// ═══════════════ SOUND EFFECTS ═══════════════
const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx;
function playSound(type) {
  try {
    if (!audioCtx) audioCtx = new AudioCtx();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain); gain.connect(audioCtx.destination);
    gain.gain.value = 0.06;
    if (type === 'click') { osc.frequency.value = 800; osc.type = 'sine'; gain.gain.value = 0.04; }
    else if (type === 'success') { osc.frequency.value = 523; osc.type = 'sine'; gain.gain.value = 0.06; }
    else if (type === 'theme') { osc.frequency.value = 440; osc.type = 'triangle'; gain.gain.value = 0.05; }
    osc.start(); osc.stop(audioCtx.currentTime + 0.1);
  } catch(e) {}
}

// ═══════════════ TICKER ═══════════════
(function initTicker() {
  const el = document.getElementById('tickerText');
  const msgs = {
    ar: ['☝️ لا إله إلا الله','📖 عقيدة المسلم — الشيخ محمد الغزالي','🕌 الصلاة عماد الدين','🌙 رمضان مدرسة التقوى','⭐ الإيمان يزيد بالطاعة'],
    en: ['☝️ There is no god but God',"📖 The Muslim's Creed — Sheikh al-Ghazali",'🕌 Prayer is the pillar of religion','🌙 Ramadan: school of piety','⭐ Faith increases with obedience'],
    fr: ['☝️ Il n\'y a de dieu que Dieu','📖 La Croyance du Musulman — Sheikh al-Ghazali','🕌 La priere est le pilier de la religion','🌙 Ramadan : ecole de piete','⭐ La foi augmente avec l\'obeissance']
  };
  function setTicker() {
    const m = msgs[lang] || msgs.en;
    const doubled = [...m, ...m].map(t => `<span class="tc">&nbsp;&nbsp;${t}&nbsp;&nbsp;•</span>`).join('');
    el.innerHTML = doubled;
    el.style.animation = 'none';
    el.offsetHeight;
    el.style.animation = `tickerMarquee ${m.length * 8}s linear infinite`;
  }
  setTicker();
  const orig = window.setLang;
  const _sl = setLang;
  window.setLang = function(l) { _sl(l); setTimeout(setTicker, 100); };
})();

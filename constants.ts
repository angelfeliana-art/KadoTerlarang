import { StoryNode } from './types';

export const STORY_NODES: StoryNode[] = [
  // 0. Prologue (NEW)
  {
    id: '0_prologue',
    title: 'Prolog',
    location: 'KAMAR ERLINA',
    text: 'Namaku Erlina. Usiaku baru 18 tahun, masa di mana seharusnya aku sibuk dengan romansa atau tugas kuliah. Namun, takdir berkata lain.\n\nSejak Papa meninggal dua tahun lalu karena sakit mendadak, rumah besar ini terasa terlalu sepi dan dingin untuk kami berdua—aku dan Mama. Kami bertahan dalam keheningan yang panjang, saling menguatkan dalam duka.\n\nHingga akhirnya, Mama, wanita yang selalu berusaha tegar itu, menemukan sandaran hati yang baru. Senyumnya kembali mekar, namun ada kecemasan aneh yang menjalar di dadaku. Hari ini adalah hari di mana dia akan datang. Pria itu... calon papa baruku.',
    backgroundImage: 'girl_looking_window',
    choices: [
      { id: 'c0_1', text: "Tarik napas dan bersiap keluar kamar.", effect: 'neutral', nextNodeId: '1a_waiting' }
    ]
  },
  // 1. Intro
  {
    id: '1a_waiting',
    title: 'Menunggu Tamu',
    location: 'RUANG TAMU',
    text: 'Sore itu, ruang tamu terasa lebih rapi dari biasanya. Mama sibuk menata vas bunga, wajahnya berseri-seri. "Erlina, nanti bersikap sopan ya. Om Rudi ini orang spesial," pesan Mama.\n\nKamu hanya mengangguk pelan sambil merapikan rokmu. Hatimu bertanya-tanya, seperti apa sosok pria yang berhasil mencuri hati ibumu setelah sekian lama sendiri?',
    backgroundImage: 'livingroom_afternoon',
    choices: [
      { id: 'c1a_1', text: "Duduk diam dan menunggu dengan manis.", effect: 'neutral', nextNodeId: '1b_arrival' },
      { id: 'c1a_2', text: "Bertanya penasaran tentang Om Rudi pada Mama.", effect: 'positive', nextNodeId: '1a_story' }
    ]
  },
  // Branching Node: Mama's Story
  {
    id: '1a_story',
    title: 'Cerita Mama',
    location: 'RUANG TAMU',
    text: '"Om Rudi itu rekan bisnis Mama dulu," cerita Mama dengan mata berbinar. "Dia pekerja keras, duda tanpa anak, dan sangat menghargai wanita. Mama merasa beruntung sekali dia mau membuka hati lagi."\n\nMama memegang tanganmu. "Mama harap kamu bisa menyukainya juga, Sayang." Mendengar nada bicara Mama yang penuh harap, kamu jadi semakin penasaran.',
    backgroundImage: 'mother_talking',
    choices: [
      { id: 'c1a_story_1', text: "Semoga dia memang baik, Ma.", effect: 'positive', nextNodeId: '1b_arrival' },
      { id: 'c1a_story_2', text: "Hanya mengangguk pelan.", effect: 'neutral', nextNodeId: '1b_arrival' }
    ]
  },
  {
    id: '1b_arrival',
    title: 'Kedatangan',
    location: 'PINTU DEPAN',
    text: 'Bel pintu berbunyi. Mama bergegas membuka pintu. Tak lama kemudian, sosok tinggi tegap melangkah masuk.\n\n"Erlina, perkenalkan ini Om Rudi," ucap Mama bangga.\n\nOm Rudi tersenyum, matanya menyipit ramah. Ia mengenakan kemeja yang digulung rapi hingga siku, memperlihatkan lengan yang kokoh. Wangi parfum maskulin samar-samar memenuhi ruangan saat ia mendekat.',
    backgroundImage: 'doorway_man',
    choices: [
      { id: 'c1b_1', text: "Menatapnya kagum.", effect: 'positive' },
      { id: 'c1b_2', text: "Menunduk malu.", effect: 'neutral' }
    ]
  },
  {
    id: '1c_intro',
    title: 'Perkenalan',
    location: 'RUANG TAMU',
    text: 'Om Rudi mengulurkan tangannya yang besar dan hangat. "Halo Erlina. Mama kamu sering sekali cerita tentang prestasi kamu di sekolah."\n\nSuaranya berat dan berwibawa. Saat tangan kalian bersentuhan, kamu merasakan genggaman yang mantap.\n\n"Halo Om, salam kenal," jawabmu pelan. Tatapan Om Rudi terasa menembus, seolah menilai, namun tetap sopan.',
    backgroundImage: 'handshake',
    choices: [
      { id: 'c1c_1', text: "Melepaskan tangan dengan cepat.", effect: 'negative' },
      { id: 'c1c_2', text: "Tersenyum ramah membalas tatapannya.", effect: 'positive' }
    ]
  },

  // 2. Bathroom Chat
  {
    id: '2a_visit',
    title: 'Kunjungan Rutin',
    location: 'RUANG TENGAH',
    text: 'Beberapa hari kemudian, Om Rudi main lagi ke rumah. Ia membawa martabak kesukaan Mama. Suasana sudah mulai lebih cair.\n\n"Sebentar ya Mas, aku mandi dulu gerah banget," pamit Mama, meninggalkan kamu dan Om Rudi berdua di ruang tengah. Suara air shower mulai terdengar dari kejauhan, menciptakan latar suara yang monoton.',
    backgroundImage: 'sofa_evening',
    choices: [
      { id: 'c2a_1', text: "Pamit masuk kamar.", effect: 'negative', nextNodeId: '3a_rain' },
      { id: 'c2a_2', text: "Tetap menemani Om Rudi di ruang tengah.", effect: 'positive' }
    ]
  },
  {
    id: '2b_tension',
    title: 'Hanya Berdua',
    location: 'RUANG TENGAH',
    text: 'Di ruang tengah, hanya ada kamu dan Om Rudi. Om Rudi melonggarkan dasinya sedikit, tampak lelah pulang kerja namun tetap mencoba tersenyum padamu.\n\n"Kuliah kamu gimana, Erlina? Ada yang ganggu kamu nggak?" tanyanya tiba-tiba, nadanya sedikit protektif.',
    backgroundImage: 'livingroom_night',
    choices: [
      { id: 'c2b_1', text: "Lancar kok, Om. Aman.", effect: 'neutral' },
      { id: 'c2b_2', text: "Ada sih yang nakal, tapi biasa aja.", effect: 'positive' }
    ]
  },
  {
    id: '2c_gaze',
    title: 'Tatapan',
    location: 'RUANG TENGAH',
    text: 'Om Rudi mengangguk, matanya menatap lekat wajahmu. "Baguslah. Kamu cantik, pasti banyak yang naksir. Hati-hati pilih cowok," ujarnya pelan.\n\nAda jeda yang aneh. Tatapannya sedikit lebih intens dari sekadar nasihat calon papa. Jantungmu berdesir halus. Tepat saat itu, suara pintu kamar mandi terbuka.',
    backgroundImage: 'close_up_eye',
    choices: [
      { id: 'c2c_1', text: "Mengalihkan pandangan gugup.", effect: 'neutral' },
      { id: 'c2c_2', text: "Tersenyum kecil, 'Makasih Om'.", effect: 'positive' }
    ]
  },

  // 3. Alone Pre-wedding
  {
    id: '3a_rain',
    title: 'Hujan Deras',
    location: 'RUANG TAMU',
    text: 'Di hari lain, hujan turun sangat deras di luar. Petir menyambar sesekali. Mama mengirim pesan terjebak macet parah.\n\nDi rumah, kamu sedang membaca buku di sofa. Suasana dingin dan lembab. Tiba-tiba pintu depan terbuka, Om Rudi masuk dengan payung basah.',
    backgroundImage: 'rainy_window',
    choices: [
      { id: 'c3a_1', text: "Menyapa dari jauh.", effect: 'neutral' },
      { id: 'c3a_2', text: "Mengambilkan handuk untuk Om.", effect: 'positive' }
    ]
  },
  {
    id: '3b_coffee',
    title: 'Secangkir Kopi',
    location: 'RUANG TAMU',
    text: 'Om Rudi sudah berganti pakaian santai—kebetulan ia menyimpan baju di rumah ini. Ia menyeduh dua cangkir kopi panas dan duduk di sofa seberangmu.\n\n"Mama kamu masih lama kayaknya," katanya sambil menyeruput kopi. Uap panas mengepul di antara kalian. "Kamu nggak takut sendirian pas hujan begini?"',
    backgroundImage: 'coffee_mug',
    choices: [
      { id: 'c3b_1', text: "Enggak kok, udah biasa.", effect: 'neutral' },
      { id: 'c3b_2', text: "Sedikit sih, untung ada Om.", effect: 'positive' }
    ]
  },
  {
    id: '3c_maturity',
    title: 'Pujian',
    location: 'RUANG TAMU',
    text: 'Om Rudi tersenyum miring. "Kamu rajin sekali, Erlina. Jarang ada gadis yang betah di rumah baca buku, nggak keluyuran."\n\nIa meletakkan cangkirnya, condong sedikit ke depan. "Saya kagum sama ketenangan kamu." Suara hujan di luar seolah mengisolasi kalian berdua dalam gelembung waktu.',
    backgroundImage: 'cozy_room',
    choices: [
      { id: 'c3c_1', text: "Tersipu malu.", effect: 'positive' },
      { id: 'c3c_2', text: "Salah tingkah dan kembali baca buku.", effect: 'neutral' }
    ]
  },

  // 4. Wedding
  {
    id: '4a_prep',
    title: 'Persiapan',
    location: 'RUMAH - RUANG RIAS',
    text: 'Hari pernikahan pun tiba. Rumah ramai dengan kerabat. Kamu melihat Mama sedang dirias, tampak sangat bahagia.\n\nDi sudut lain, Om Rudi sedang merapikan jasnya. Ia melihatmu lewat dengan gaun putih. Matanya sempat terkunci padamu, memberikan anggukan singkat tanda kekaguman sebelum kembali bicara dengan tamu.',
    backgroundImage: 'wedding_prep',
    choices: [
      { id: 'c4a_1', text: "Merasa ikut bahagia untuk Mama.", effect: 'neutral' },
      { id: 'c4a_2', text: "Merasa gugup ditatap Om Rudi.", effect: 'positive' }
    ]
  },
  {
    id: '4b_vow',
    title: 'Janji Suci',
    location: 'GEDUNG PERNIKAHAN',
    text: 'Pemberkatan nikah berlangsung khidmat. "Saya menerima engkau sebagai istriku..." suara Om Rudi lantang dan tegas.\n\nKamu duduk di belakang, menatap punggung pria yang kini sah menjadi papamu. Perasaan campur aduk antara haru dan... rasa kehilangan yang aneh. Atau mungkin rasa iri?',
    backgroundImage: 'wedding_ceremony',
    choices: [
      { id: 'c4b_1', text: "Menepis pikiran aneh itu.", effect: 'neutral' },
      { id: 'c4b_2', text: "Menghela napas panjang.", effect: 'negative' }
    ]
  },
  {
    id: '4c_touch',
    title: 'Rangkulan',
    location: 'GEDUNG PERNIKAHAN',
    text: 'Saat sesi foto keluarga, fotografer meminta pose akrab. Om Rudi berdiri di sampingmu, merangkul bahumu erat.\n\n"Sekarang kita resmi jadi keluarga," bisiknya tepat di telingamu. Napasnya hangat menggelitik. Wangi parfumnya memabukkan. Rangkulan itu terasa protektif, namun jari-jarinya di bahumu terasa sedikit meremas pelan.',
    backgroundImage: 'wedding_photo',
    choices: [
      { id: 'c4c_1', text: "Tersenyum kaku.", effect: 'neutral' },
      { id: 'c4c_2', text: "Menikmati kedekatan itu.", effect: 'positive' }
    ]
  },

  // 5. New Life
  {
    id: '5a_routine',
    title: 'Rutinitas Baru',
    location: 'RUMAH',
    text: 'Kehidupan baru dimulai. Om Rudi ternyata bekerja sebagai broker saham mandiri, jadi ia banyak menghabiskan waktu di ruang kerja pribadinya di rumah. Sementara Mama tetap bekerja kantoran.\n\nSetiap pagi rumah terasa lebih hidup, tapi juga lebih asing dengan kehadiran pria dewasa di sana.',
    backgroundImage: 'home_morning',
    choices: [
      { id: 'c5a_1', text: "Berusaha adaptasi.", effect: 'neutral' },
      { id: 'c5a_2', text: "Sering mencuri pandang ke ruang kerjanya.", effect: 'positive' }
    ]
  },
  {
    id: '5b_working',
    title: 'Pria Pekerja',
    location: 'RUANG KERJA',
    text: 'Pulang kampus, kamu sering melihat pintu ruang kerja Om Rudi terbuka. Pria itu duduk serius di depan layar monitor, kacamata membingkai wajahnya, lengan kemeja digulung menampilkan urat tangan yang maskulin.\n\nKadang Om Rudi begitu fokus hingga tidak sadar kamu sedang mengamatinya dari celah pintu.',
    backgroundImage: 'man_working',
    choices: [
      { id: 'c5b_1', text: "Segera berlalu ke kamar.", effect: 'neutral', nextNodeId: '5b_solo_act' },
      { id: 'c5b_2', text: "Menyapa pelan.", effect: 'positive', nextNodeId: '5c_interact' }
    ]
  },

  // NEW BRANCH START: Solo Act & Encounter
  {
    id: '5b_solo_act',
    title: 'Melepas Penat',
    location: 'KAMAR ERLINA',
    text: 'Udara sore menuju malam yang menggairahkan membuatmu ingin segera melepas penat setelah seharian di kampus. Di kamar kamu menyalakan layar TV. Sebuah film dewasa terpampang, memicu desir halus di perutmu. Adegan erotis itu kamu idamkan sebagai wanita yang telah tumbuh dewasa.\n\nKamu membiarkan seluruh bawahanmu berserakan di lantai, membiarkan kulitmu bersentuhan langsung dengan udara dingin AC, dan mulai memanjakan diri sendiri.',
    backgroundImage: 'bedroom_evening_tv',
    choices: [
       { id: 'c5b_solo_1', text: "Lanjut puaskan diri.", effect: 'positive', nextNodeId: '5b_caught' }
    ]
  },
  {
    id: '5b_caught',
    title: 'Terganggu',
    location: 'KAMAR ERLINA',
    text: 'Tepat saat napasmu mulai memburu, pintu kamar terbuka. Om Rudi membuka pintu. Matanya terpaku pada pemandangan di depannya: kamu, yang sedang tanpa bawahan, dengan tangan yang masih tertahan di area sensitifmu.\n\nSuasana seketika membeku, hanya suara desahan dari TV yang memecah keheningan.',
    backgroundImage: 'bedroom_door_open',
    choices: [
       { id: 'c5b_caught_1', text: "Usir Om Rudi keluar", effect: 'negative', nextNodeId: '5b_kicked_out' },
       { id: 'c5b_caught_2', text: "Biarkan Om Rudi masuk", effect: 'positive', nextNodeId: '5b_let_in' }
    ]
  },

  // Sub-branch A: Kick him out
  {
    id: '5b_kicked_out',
    title: 'Pengusiran',
    location: 'KAMAR ERLINA',
    text: 'Rasa malu yang luar biasa menyambar seperti sengatan listrik. "Om, harusnya ketuk pintu dulu!" teriakmu emosi.\nOm Rudi berdeham, suaranya berat. "Maaf, Erlina. Om tadi mau tanya sesuatu, tapi pintunya tidak terkunci..."\n\n"Aku bilang keluar ya keluar!" potongmu sambil mendorongnya menjauh dari pintu kamarmu. Kamu segera membanting pintu itu dan menguncinya dengan bunyi klik yang keras. Kamu tersadar bahwa kamu menghampirinya tadi dengan bagian bawahmu yang terbuka sepenuhnya dan kini merasa malu.',
    backgroundImage: 'door_closed_angry',
    choices: [
       { id: 'c5b_ko_1', text: "Menangis menahan malu.", effect: 'negative', nextNodeId: '5b_breakfast_tension' }
    ]
  },
  {
    id: '5b_breakfast_tension',
    title: 'Kecanggunggan Pagi',
    location: 'RUANG MAKAN',
    text: 'Suasana meja makan pagi ini terasa sangat mencekam bagimu. Aroma nasi goreng dan kopi tidak mampu mengalihkan rasa canggung yang menghimpit dada. Kamu duduk di hadapan Om Rudi, sementara Mama sibuk menata piring. Kamu bisa merasakan tatapan Om Rudi yang sesekali mencuri pandang ke arahmu—tatapan yang sama seperti saat dia melihatmu tanpa bawahan semalam.\n\n"Erlina, kok makannya sedikit sekali? Kurang enak ya?" tanya Mama memecah keheningan.\n"E-enggak kok, Mah. Cuma gak terlalu lapar," jawabmu gugup tanpa berani mendongak.',
    backgroundImage: 'breakfast_tense',
    choices: [
       { id: 'c5b_bt_1', text: "Tetap Diam", effect: 'neutral', nextNodeId: '5b_secret_pact' },
       { id: 'c5b_bt_2', text: "Balas tatapan", effect: 'positive', nextNodeId: '5b_secret_pact' }
    ]
  },
  {
    id: '5b_secret_pact',
    title: 'Rahasia Berdua',
    location: 'RUANG MAKAN',
    text: '"Aduh, Mama lupa sambalnya. Sebentar ya," ucapnya Mama sambil melangkah pergi ke dapur.\n\nSeketika, suasana berubah drastis. Hanya ada kamu dan Om Rudi. Keheningan yang tadinya canggung kini berubah menjadi intim dan berbahaya. Om Rudi meletakkan sendoknya, lalu sedikit condong ke arahmu melintasi meja.\n\n"Tenang saja..." bisiknya dengan suara bariton yang rendah, hampir seperti desahan. "Om nggak akan cerita ke Mamamu soal yang kemarin. Itu rahasia kita berdua saja."',
    backgroundImage: 'breakfast_secret',
    choices: [
       { id: 'c5b_sp_1', text: "Dengarkan dia.", effect: 'neutral', nextNodeId: '5b_secret_reaction' }
    ]
  },
  {
    id: '5b_secret_reaction',
    title: 'Janji atau Ancaman',
    location: 'RUANG MAKAN',
    text: 'Kalimat itu membuat tubuhmu membeku. Kata "rahasia" itu terdengar seperti janji sekaligus ancaman yang manis. Kamu merasakan wajahmu kembali memanas, membayangkan kembali bagaimana dia melihatmu dalam keadaan paling intim semalam.',
    backgroundImage: 'blushing_face',
    choices: [
       { id: 'c5b_sr_1', text: "Jangan bahas itu lagi, om!", effect: 'negative', nextNodeId: '6a_pre_birthday' },
       { id: 'c5b_sr_2', text: "Iya om", effect: 'positive', nextNodeId: '6a_pre_birthday' }
    ]
  },

  // Sub-branch B: Let him in
  {
    id: '5b_let_in',
    title: 'Pintu Terbuka',
    location: 'KAMAR ERLINA',
    text: 'Kamu dengan cepat menarik selimut tebal untuk menutupi bagian bawah tubuhmu yang polos. Wajahmu memanas, jantungmu berdegup kencang. Om Rudi tidak segera pergi; ia justru melangkah masuk dengan tatapan yang sulit diartikan—campuran antara rasa bersalah dan keinginan yang tertahan.\n\n"Om... harusnya ketuk pintu dulu," bisikmu gemetar.\nOm Rudi berdeham, suaranya berat. "Maaf, Erlina. Om tadi mau tanya sesuatu, tapi pintunya tidak terkunci..."',
    backgroundImage: 'bedroom_man_enter',
    choices: [
       { id: 'c5b_li_1', text: "Biarkan Om Rudi mendekat", effect: 'positive', nextNodeId: '5b_intimate_watch', isHeartbeat: true },
       { id: 'c5b_li_2', text: "Minta Om Rudi segera keluar", effect: 'neutral', nextNodeId: '5b_polite_exit' }
    ]
  },
  
  // Sub-branch B1: Polite Exit
  {
    id: '5b_polite_exit',
    title: 'Permintaan Sopan',
    location: 'KAMAR ERLINA',
    text: 'Meski jantungmu berdegup kencang karena malu, kamu berusaha mengendalikan situasi dengan kepala dingin.\n\n"Om... maaf, Erlina sedang ingin sendiri. Tolong, Om keluar sekarang ya?" ucapmu dengan nada yang diusahakan tetap tenang namun tegas.\n\nOm Rudi menghentikan langkahnya. Ia kemudian memberikan senyum tipis yang penuh rahasia dan sedikit mengangguk.\n"Ya sudah, kalau itu maumu. Om nggak akan ganggu," ucapnya dengan suara berat yang tenang. Ia berbalik menuju pintu, dan melangkah keluar.',
    backgroundImage: 'man_leaving',
    choices: [
       { id: 'c5b_pe_1', text: "Hela napas panjang.", effect: 'neutral', nextNodeId: '5b_after_exit_thought' }
    ]
  },
  {
    id: '5b_after_exit_thought',
    title: 'Sisa Bayangan',
    location: 'KAMAR ERLINA',
    text: 'Kamu tahu dia tidak benar-benar pergi dengan pikiran kosong; dia tahu persis apa yang sedang kamu lakukan.\n\nKamu terduduk diam di atas ranjang, masih memeluk selimutmu erat-erat. Suara dari TV masih terdengar, namun fokusmu kini terbagi antara video itu dan bayangan Om Rudi yang baru saja berdiri di sana.',
    backgroundImage: 'sitting_bed_alone',
    choices: [
       { id: 'c5b_aet_1', text: "Coba tidur.", effect: 'neutral', nextNodeId: '5b_breakfast_tension' }
    ]
  },

  // Sub-branch B2: Intimate Watch
  {
    id: '5b_intimate_watch',
    title: 'Izin Terlarang',
    location: 'KAMAR ERLINA',
    text: '"Om nggak akan bilang Mama kalau kamu nonton video seperti ini," ucap Om Rudi lembut sambil duduk di ranjang, tepat di sebelahmu.\n\nKamu terpaksa mengangguk pelan, rasa canggung menyelimuti udara. Layar TV masih menampilkan adegan panas yang kian memuncak.\n"Kalau kamu mau lanjut... nggak apa-apa kok," bisik Om Rudi lagi, matanya melirik ke arah selimutmu.',
    backgroundImage: 'sitting_bed_together',
    choices: [
       { id: 'c5b_iw_1', text: "Lirik dia", effect: 'positive', nextNodeId: '5b_act_continues' },
       { id: 'c5b_iw_2', text: "Tersipu malu", effect: 'positive', nextNodeId: '5b_act_continues' }
    ]
  },
  {
    id: '5b_act_continues',
    title: 'Melanjutkan',
    location: 'KAMAR ERLINA',
    text: '"Tapi aku malu, Om..."\n"Nggak usah malu. Biasa kok seumuran kamu begitu."\n\nDengan jemari yang gemetar di bawah perlindungan selimut, kamu beranikan diri kembali melanjutkan aktivitasmu yang sempat tertunda. Kehadiran Om Rudi di sampingmu memberikan sensasi tantangan yang memacu adrenalin.\n\nKamu melirik ke arah celananya, dan di sana, kamu melihat sebuah tonjolan yang jelas menandakan bahwa dia pun terangsang oleh situasi ini.',
    backgroundImage: 'hand_under_blanket',
    choices: [
       { id: 'c5b_ac_1', text: "Mendesah kencang dan cepat...", effect: 'positive', nextNodeId: '5b_climax_watched' },
       { id: 'c5b_ac_2', text: "Mendesah perlahan...", effect: 'neutral', nextNodeId: '5b_climax_watched' }
    ]
  },
  {
    id: '5b_climax_watched',
    title: 'Puncak',
    location: 'KAMAR ERLINA',
    text: 'Ketegangan mencapai puncaknya. Tubuhmu melengkung saat kepuasan itu datang.\n\n"Keluar ya sayang?" tanya Om Rudi dengan suara parau, menyadari reaksi tubuhmu. Panggilan itu terdengar wajar untuk anak, tapi nadanya terasa berbeda.\n"Iya, Om..." jawabmu lemas, benar-benar pasrah.\n\nOm Rudi mengelus rambutmu dengan penuh kasih sayang, sebuah sentuhan yang terasa protektif namun intim. Rasa lelah dan nyaman membuatmu pun tertidur lelap di bawah pengawasannya yang diam.',
    backgroundImage: 'sleeping_peaceful',
    choices: [
       { id: 'c5b_cw_1', text: "...", effect: 'neutral', nextNodeId: '5b_morning_after' }
    ]
  },
  {
    id: '5b_morning_after',
    title: 'Pagi Hari',
    location: 'KAMAR ERLINA',
    text: 'Kamu terbangun saat subuh dengan perasaan aneh—campuran antara ringan dan berdebar. Ingatan semalam melintas cepat: TV yang menyala, kehadiran Om Rudi di sisimu, dan bagaimana kamu tertidur di bawah sentuhannya.\n\nSaat kamu menoleh ke samping, Om Rudi sudah tidak ada. Kamu bangkit, mengenakan pakaianmu, lalu melangkah keluar kamar menuju dapur',
    backgroundImage: 'morning_sun',
    choices: [
       { id: 'c5b_ma_1', text: "Melangkah diam-diam", effect: 'neutral', nextNodeId: '5b_kitchen_encounter' },
       { id: 'c5b_ma_2', text: "Melangkah cepat", effect: 'neutral', nextNodeId: '5b_kitchen_encounter' }
    ]
  },
  {
    id: '5b_kitchen_encounter',
    title: 'Dapur Subuh',
    location: 'DAPUR',
    text: 'Di sana, Om Rudi sedang menyesap kopi hitamnya. Suasana rumah masih sepi; sepertinya Mamamu masih terlelap. Begitu melihatmu, Om Rudi meletakkan cangkirnya dan memberikan senyum tipis yang penuh makna.\n\n"Sudah bangun? Nyenyak tidurnya?" tanyanya dengan nada suara yang lebih dalam dari biasanya.',
    backgroundImage: 'kitchen_morning_coffee',
    choices: [
       { id: 'c5b_ke_1', text: "Mendekat padanya", effect: 'positive', nextNodeId: '5b_kitchen_flirt' },
       { id: 'c5b_ke_2', text: "Pura-pura lupa kejadian semalam", effect: 'neutral', nextNodeId: '5b_kitchen_ignore' }
    ]
  },
  {
    id: '5b_kitchen_flirt',
    title: 'Pengakuan Halus',
    location: 'DAPUR',
    text: 'Kamu melangkah mendekat, berdiri cukup dekat hingga bisa mencium aroma parfum maskulinnya yang bercampur aroma kopi.\n\n"Nyenyak sekali, Om. Bahkan sampai terbawa mimpi," bisikmu berani. Om Rudi terpaku, matanya menatapmu intens, seolah memberi izin untuk melangkah lebih jauh dalam rahasia ini.',
    backgroundImage: 'kitchen_close_stand',
    choices: [
       { id: 'c5b_kf_1', text: "Tersenyum.", effect: 'positive', nextNodeId: '6a_pre_birthday' }
    ]
  },
  {
    id: '5b_kitchen_ignore',
    title: 'Pura-pura Lupa',
    location: 'DAPUR',
    text: '"Nyeyak om," jawabku. Kamu memilih sibuk di depan kompor, membelakanginya. Om Rudi mendekat, kamu bisa merasakan kehadirannya membakar punggungmu. "Om bantu ya, kamu mau bikin apa?"\n\nTanganmu tak sengaja bersentuhan dengan tangannya saat mengambil piring, ada sengatan listrik yang membuat napasmu tertahan. Kamu tahu, ada hal yang tidak sama lagi setelah kemarin.',
    backgroundImage: 'kitchen_back_turned',
    choices: [
       { id: 'c5b_ki_1', text: "Tatap matanya", effect: 'positive', nextNodeId: '6a_pre_birthday' },
       { id: 'c5b_ki_2', text: "Tunduk ke bawah", effect: 'neutral', nextNodeId: '6a_pre_birthday' }
    ]
  },
  // END NEW BRANCH, Back to original flow...

  {
    id: '5c_interact',
    title: 'Bantuan Kecil',
    location: 'RUANG KERJA',
    text: '"Erlina, bisa tolong Om sebentar?" panggil Om Rudi.\n\nKamu masuk. Om Rudi meminta bantuan merapikan berkas yang berserakan. Saat kamu menyerahkan map, tangan kalian bersentuhan cukup lama. Om Rudi tersenyum, "Makasih ya, Sayang." Panggilan itu terdengar wajar untuk anak, tapi nadanya...',
    backgroundImage: 'office_hands',
    choices: [
      { id: 'c5c_1', text: "Hanya mengangguk.", effect: 'neutral', nextNodeId: '5b_solo_act' }, // Looping back to solo act
      { id: 'c5c_2', text: "Tersipu mendengar panggilannya.", effect: 'positive', nextNodeId: '5c_toy_reveal' } // Danger route
    ]
  },

  // NEW BRANCH: TOY SCENES
  {
    id: '5c_toy_reveal',
    title: 'Benda Asing',
    location: 'RUANG KERJA',
    text: 'Tiba-tiba, Om Rudi membuka laci mejanya dan mengeluarkan sebuah benda kecil berbentuk lonjong dengan permukaan silikon yang halus. Sebuah tongkat getar.\n\n"Om... itu apa?" tanyamu terkejut dengan wajah memerah.\nOm Rudi menatap benda itu, lalu menatapmu. "Kamu sudah dewasa sekarang. Kamu pasti tahu ini apa, dan Om yakin kamu punya rasa penasaran yang besar untuk mencobanya, kan?"',
    backgroundImage: 'office_drawer_open',
    choices: [
       { id: 'c5c_tr_1', text: "Takut dan ijin kembali kamar", effect: 'negative', nextNodeId: '5c_toy_run' },
       { id: 'c5c_tr_2', text: "Terdiam dan penasaran", effect: 'positive', nextNodeId: '5c_toy_approach' }
    ]
  },
  {
    id: '5c_toy_approach',
    title: 'Undangan Bergetar',
    location: 'RUANG KERJA',
    text: 'Kamu tetap berdiri di sana, napasmu mulai tidak teratur. Om Rudi berdiri dan melangkah mendekatimu, jemarinya menekan tombol kecil pada benda itu hingga terdengar suara getaran halus yang konstan.\n\n"Jangan malu, Erlina. Om cuma yang ingin memberikan sedikit \'pengetahuan\'. Daripada kamu mencari tahu sendiri dengan cara yang salah, lebih baik Om yang tunjukkan," bisiknya lembut, membuat bulu kudukmu meremang.\n\nIa menyodorkan benda bergetar itu padamu, menunggumu mengambil keputusan.',
    backgroundImage: 'office_man_approach',
    choices: [
       { id: 'c5c_ta_1', text: "Takut dan ijin kembali kamar", effect: 'negative', nextNodeId: '5c_toy_run' },
       { id: 'c5c_ta_2', text: "Coba karena penasaran", effect: 'positive', nextNodeId: '5c_toy_sit', isHeartbeat: true }
    ]
  },
  {
    id: '5c_toy_sit',
    title: 'Duduk di Meja',
    location: 'RUANG KERJA',
    text: 'Kamu mengangguk pelan, seolah terhipnotis oleh suaranya. Om Rudi membimbingmu untuk duduk di tepi meja kerja.\n\nTangannya yang hangat mulai menyentuh pahamu, sementara tangan lainnya memegang alat yang masih bergetar kuat itu. "Nah, sekarang... biarkan Om bantu kamu merasakannya," ucapnya pelan.',
    backgroundImage: 'sitting_on_desk',
    choices: [
       { id: 'c5c_ts_1', text: "Biarkan om Rudi...", effect: 'positive', nextNodeId: '5c_toy_action', isHeartbeat: true }
    ]
  },
  {
    id: '5c_toy_action',
    title: 'Gelombang Getaran',
    location: 'RUANG KERJA',
    text: 'Jari-jemari berjalan di dalam rok mu dan getaran di celana dalam itu segera mengirimkan gelombang kenikmatan yang belum pernah kamu rasakan sebelumnya.\n\nOm Rudi memperhatikannya dengan saksama, sesekali mengelus rambutmu saat tubuhmu mulai gemetar hebat. Suara napasmu memenuhi ruang kerja yang kedap suara itu.\n\nBiar lebih maksimal, boleh om buka?" bisik Om Rudi sambil jarinya menyisip di karet celana dalammu.',
    backgroundImage: 'office_intimate',
    choices: [
       { id: 'c5c_tact_1', text: "Boleh", effect: 'positive', nextNodeId: '5c_toy_climax_direct' },
       { id: 'c5c_tact_2', text: "Jangan", effect: 'neutral', nextNodeId: '5c_toy_climax_indirect' }
    ]
  },
  {
    id: '5c_toy_climax_direct',
    title: 'Sentuhan Langsung',
    location: 'RUANG KERJA',
    text: 'Kamu mengangguk pasrah, membiarkan celana dalammu merambat hingga ke lutut.\n\nSentuhan dingin silikon yang bergetar tanpa batasan itu langsung membuatmu terlonjak dan mencengkeram bahu Om Rudi dengan kuat.',
    backgroundImage: 'hands_grip_shoulder',
    choices: [
       { id: 'c5c_tcd_1', text: "...", effect: 'positive', nextNodeId: '5c_toy_aftermath' }
    ]
  },
  {
    id: '5c_toy_climax_indirect',
    title: 'Teredam Kain',
    location: 'RUANG KERJA',
    text: 'Kamu menahan tangannya dan memintanya melakukan dari luar lapisan celana dalam saja karena malu.\n\nGetaran yang teredam kain justru terasa lebih tumpul namun menyebar, membuatmu merintih tertahan.',
    backgroundImage: 'skirt_fabric',
    choices: [
       { id: 'c5c_tci_1', text: "...", effect: 'positive', nextNodeId: '5c_toy_aftermath' }
    ]
  },
  {
    id: '5c_toy_aftermath',
    title: 'Kesadaran',
    location: 'RUANG KERJA',
    text: '"Gimana, enak ya?" tanyanya. Begitu kamu mencapai titik kepuasan, tubuhmu terasa lemas dan mati rasa. Namun, seketika itu juga, kesadaran menghantammu seperti ombak besar.\n\nKamu melihat Om Rudi yang masih menatapmu dengan senyum penuh arti, dan kamu baru saja menyadari: kamu baru saja melakukan sesuatu yang sangat intim dengan seorang pria.',
    backgroundImage: 'office_aftermath',
    choices: [
       { id: 'c5c_tam_1', text: "Rapikan diri dan keluar.", effect: 'neutral', nextNodeId: '5d_solo_loop' }
    ]
  },
  // NEW NODE: Bridging Toy Aftermath to Caught Scene
  {
    id: '5d_solo_loop',
    title: 'Sore yang Sepi',
    location: 'KAMAR ERLINA',
    text: 'Di suatu sore, udara yang menyegarkan seolah memanggilmu untuk segera menanggalkan segala penat setelah seharian bergelut dengan rutinitas kampus. \n\nBegitu sampai di kamar, kamu menyalakan televisi, dan sebuah tayangan dewasa muncul di layar—menghadirkan desir halus yang merambat di perutmu. Sebagai wanita yang kini telah memahami sisi kedewasaannya, adegan itu terasa seperti fantasi yang diam-diam kamu idamkan.\n\nTanpa ragu, kamu membiarkan pakaian bagian bawahmu berserakan begitu saja di lantai. Sensasi dingin dari embusan AC yang menyentuh kulit polosmu memberikan kontras yang mendebarkan.',
    backgroundImage: 'bedroom_evening_tv',
    choices: [
       { id: 'c5d_1', text: "Lanjut berfantasi liar...", effect: 'positive', nextNodeId: '5b_caught' }
    ]
  },
  {
    id: '5c_toy_run',
    title: 'Pelarian',
    location: 'RUANG KERJA',
    text: 'Kamu menyadari bahwa situasi ini sudah melangkah terlalu jauh dari sekadar "membantu merapikan berkas."\n\n"Om... aku... aku nggak bisa," suaramu mencicit, hampir tidak terdengar. Kamu melangkah mundur hingga punggungmu menabrak rak buku.\n\nMaaf Om, aku harus ke kamar. Ada tugas yang lupa kukerjakan!" Tanpa menunggu jawabannya, kamu segera berbalik dan lari keluar dari ruang kerja.',
    backgroundImage: 'running_hallway',
    choices: [
       { id: 'c5c_trun_1', text: "Kunci pintu kamar.", effect: 'negative', nextNodeId: '6a_pre_birthday' }
    ]
  },

  // 6. Gift
  {
    id: '6a_pre_birthday',
    title: 'Jelang Ulang Tahun',
    location: 'RUANG MAKAN',
    text: 'Hari ulang tahunmu tiba. Di ruang makan, Mama memberikan kado berupa jam tangan cantik dan kue tart.\n\nOm Rudi ikut bernyanyi dan tepuk tangan. "Kado dari Om nanti ya," ucapnya dengan kedipan mata jenaka, namun menyiratkan rahasia. Kamu hanya tertawa kecil.',
    backgroundImage: 'birthday_cake',
    choices: [
      { id: 'c6a_1', text: "Penasaran.", effect: 'positive' },
      { id: 'c6a_2', text: "Tidak terlalu memikirkan.", effect: 'neutral' }
    ]
  },
  {
    id: '6b_knock',
    title: 'Ketukan Malam',
    location: 'KAMAR ERLINA',
    text: 'Malam harinya, saat Mama sudah tidur, pintu kamarmu diketuk pelan. Om Rudi berdiri di sana membawa kotak pita merah muda.\n\n"Boleh masuk sebentar?" tanyanya sopan namun mendesak. Ia masuk dan menutup pintu pelan di belakangnya. Suasana kamarmu yang remang-remang membuat atmosfer berubah drastis.',
    backgroundImage: 'bedroom_door',
    choices: [
      { id: 'c6b_1', text: "Silakan Om...", effect: 'positive' },
      { id: 'c6b_2', text: "Ada apa Om? (Sedikit waspada)", effect: 'neutral' }
    ]
  },
  {
    id: '6c_lingerie',
    title: 'Isi Kotak',
    location: 'KAMAR ERLINA',
    text: '"Ini kado spesial buat kamu. Jangan bilang Mama ya, ini rahasia kita," bisiknya sambil menyerahkan kotak itu.\n\nKamu membukanya. Sebuah gaun tidur, lingerie sutra warna nude pink. Sangat cantik, seksi, elegan, tapi cocoknya diberikan untuk kado ultah istri, bukan anak. "Kamu coba ya," kata Om Rudi sebelum keluar kamar dengan senyum penuh arti.',
    backgroundImage: 'gift_box',
    choices: [
      { id: 'c6c_1', text: "Terkejut dan bingung.", effect: 'neutral' },
      { id: 'c6c_2', text: "Mengagumi keindahan gaun itu.", effect: 'positive' }
    ]
  },

  // 7. Cooking Conflict
  {
    id: '7a_mirror',
    title: 'Di Depan Cermin',
    location: 'KAMAR ERLINA',
    text: 'Pagi harinya, rasa penasaran mengalahkan keraguan. Kamu mengunci pintu kamar dan mencoba lingerie itu.\n\nDi depan cermin, kamu melihat pantulan dirimu yang berbeda. Lingerie itu memeluk lekuk tubuh remajanya dengan sempurna. Kamu merasa dewasa... dan diinginkan. Wajahmu memerah membayangkan Om Rudi memilihkan ini untukmu.',
    backgroundImage: 'mirror_reflection',
    choices: [
      { id: 'c7a_1', text: "Segera melepasnya karena malu.", effect: 'negative', nextNodeId: '7b_cooking' },
      { id: 'c7a_2', text: "Berpose sebentar melihat diri sendiri.", effect: 'positive', nextNodeId: '7a_pose' }
    ]
  },
  // Branching Node: Posing
  {
    id: '7a_pose',
    title: 'Pesona Diri',
    location: 'KAMAR ERLINA',
    text: 'Kamu berputar pelan. Lingerie itu terlihat cantik dan seksi. Untuk pertama kalinya, kamu melihat dirimu bukan sebagai gadis muda polos, melainkan seorang istri yang siap bertempur di atas ranjang.\n\nAda rasa percaya diri yang tumbuh, bercampur dengan debar jantung yang aneh. "Kenapa harus lingerie? Om Rudi suka sama aku?" dalam hatimu penuh tanya.',
    backgroundImage: 'woman_mirror_pose',
    choices: [
      { id: 'c7a_pose_1', text: "Segera ganti baju rumah.", effect: 'neutral', nextNodeId: '7b_cooking' },
      { id: 'c7a_pose_2', text: "Pakai terus Lingerie", effect: 'positive', nextNodeId: '7b_kitchen_lingerie', isHeartbeat: true }
    ]
  },
  
  // NEW BRANCH: Kitchen Lingerie Incident
  {
    id: '7b_kitchen_lingerie',
    title: 'Penampilan Berani',
    location: 'DAPUR',
    text: 'Kamu mengenakan lingerie dan melangkah menuju dapur untuk membantu mempersiapkan sarapan. Di sana, Mama sedang sibuk memotong buah, sementara Om Rudi duduk di meja makan sambil memperhatikanmu dengan tatapan senang.\n\n Mama menoleh dan seketika matanya membelalak melihat bagian renda yang mengintip dari balik jubahmu. "Wah, Erlina! Lingerie itu... bagus sekali. Pasti hadiah dari pacarmu ya? Kamu sudah mulai berani sekarang," sindir Mama sambil tertawa kecil, tidak menyadari bahwa orang yang memberikannya sedang duduk tepat di hadapannya.',
    backgroundImage: 'kitchen_morning_lingerie',
    choices: [
      { id: 'c7b_kl_1', text: "Tersenyum canggung.", effect: 'neutral', nextNodeId: '7c_kitchen_whisper_bold' }
    ]
  },
  {
    id: '7c_kitchen_whisper_bold',
    title: 'Bisikan Pemilik',
    location: 'DAPUR',
    text: 'Tiba-tiba, Om Rudi berdiri dan melangkah mendekatimu. Dia berdiri tepat di belakangmu saat kamu sedang menuang air, sementara Mama kembali sibuk dengan buah-buahannya, membelakangi kalian.\n\nBibir Om Rudi tepat di telingamu, aromanya yang maskulin menyelimuti indramu. "Istriku yang ini memang sangat cantik pagi ini."',
    backgroundImage: 'kitchen_whisper_close',
    choices: [
      { id: 'c7c_kwb_1', text: "...", effect: 'positive', nextNodeId: '7d_kitchen_touch' }
    ]
  },
  {
    id: '7d_kitchen_touch',
    title: 'Sentuhan Rahasia',
    location: 'DAPUR',
    text: 'Mendengar sebutan "istriku" yang ditujukan padamu membuat duniamu bergejolak. Sebelum kamu sempat bereaksi, tangan Om Rudi merayap masuk ke balik lingeriemu.\n\nDengan gerakan yang sangat berani, jemarinya menyelinap di balik celana dalammu, langsung menyentuh di kulit sensitifmu.',
    backgroundImage: 'hand_touch_secret',
    choices: [
      { id: 'c7d_kt_1', text: "Tahan napas...", effect: 'positive', nextNodeId: '7e_kitchen_pleasure', isHeartbeat: true }
    ]
  },
  {
    id: '7e_kitchen_pleasure',
    title: 'Kenikmatan Terlarang',
    location: 'DAPUR',
    text: 'Kamu tersentak, tanganmu mencengkeram pinggiran wastafel dapur. Kamu ketakutan setengah mati jika Mama menoleh, namun tubuhmu seolah terkhianati oleh sensasi jari-jarinya yang mulai bermain dengan ahli di sana.\n\nKamu tidak melawan; kamu hanya bisa memejamkan mata, menahan napas agar tidak ada suara yang keluar.',
    backgroundImage: 'woman_eyes_closed',
    choices: [
      { id: 'c7e_kp_1', text: "...", effect: 'neutral', nextNodeId: '8a_table' }
    ]
  },
  // END NEW BRANCH

  {
    id: '7b_cooking',
    title: 'Memasak',
    location: 'DAPUR',
    text: 'Kamu kembali memakai dress tidur yang biasa kamu gunakan di rumah dan membantu Mama di dapur. Kalian memotong sayuran untuk sarapan.\n\n"Kado Om Rudi suka nggak, Lin?" tanya Mama tiba-tiba. Kamu hampir menjatuhkan pisau. Ternyata Mama tidak tahu isi detailnya, hanya tahu Om Rudi memberi kado.',
    backgroundImage: 'kitchen_cooking',
    choices: [
      { id: 'c7b_1', text: "Suka Ma, bagus kok.", effect: 'neutral' },
      { id: 'c7b_2', text: "Biasa aja Ma.", effect: 'negative' }
    ]
  },
  {
    id: '7c_whisper',
    title: 'Bisikan Dapur',
    location: 'DAPUR',
    text: 'Saat Mama sibuk mengaduk laci bumbu di sudut lain, bayangan tubuh tegap Om Rudi jatuh menimpamu. Ia mendekat dengan alasan mengambil gelas di rak atas, namun jarak yang ia pangkas terlalu intim.\n\nKamu terpaku, merasakan hawa panas tubuh pria itu di punggungmu. Ujung jari Om Rudi yang kasar pelan-pelan menyapu lengan atasmu, sebuah sentuhan sepintas yang terasa membakar. Aroma parfum maskulin bercampur wangi kopi menguar tajam, memenuhi paru-parumu saat Om Rudi mencondongkan wajahnya.\n\nBibirnya hampir menyentuh daun telingamu, napas hangatnya menggelitik tengkuk. "Kamu pasti cantik sekali kalau pakai kado semalam..." bisiknya berat dan serak, sebelum ia mundur perlahan dan berjalan santai menuju kulkas, meninggalkan kamu yang gemetar menahan napas.',
    backgroundImage: 'kitchen_close',
    choices: [
      { id: 'c7c_1', text: "Tubuh menegang kaku.", effect: 'neutral' },
      { id: 'c7c_2', text: "Wajah memerah padam.", effect: 'positive' }
    ]
  },

  // 8. Breakfast
  {
    id: '8a_table',
    title: 'Menata Meja',
    location: 'RUANG MAKAN',
    text: 'Sarapan siap. Kamu menata piring dengan tangan gemetar sisa kejadian tadi. Om Rudi duduk di ujung meja, membaca koran seolah tak terjadi apa-apa.\n\nMama datang membawa sayur lodeh dengan ceria. Kontras sekali antara keceriaan Mama dan ketegangan rahasia yang mulai tumbuh di antara anak dan papa tirinya.',
    backgroundImage: 'breakfast_table',
    choices: [
      { id: 'c8a_1', text: "Duduk di kursi terjauh.", effect: 'negative' },
      { id: 'c8a_2', text: "Duduk di tempat biasa.", effect: 'neutral' }
    ]
  },
  {
    id: '8b_under_table',
    title: 'Di Bawah Meja',
    location: 'RUANG MAKAN',
    text: 'Kalian bertiga makan bersama. Saat Mama sedang asyik bercerita tentang gosip tetangga, kamu merasakan sesuatu menyentuh kakimu di bawah meja.\n\nKaki Om Rudi. Sentuhan itu lembut tapi disengaja, mengusap pelan betis, naik hingga ke area celana dalammu dan mencapai titik tengah. Kamu seketika tersedak saat hendak mengunyah.',
    backgroundImage: 'feet_under_table',
    choices: [
      { id: 'c8b_1', text: "Singkirkan kakinya dengan tangan.", effect: 'negative', nextNodeId: '8c_gaze_breakfast' },
      { id: 'c8b_2', text: "Biarkan kakinya bermain sejenak.", effect: 'positive', nextNodeId: '8b_foot_play' }
    ]
  },
  {
    id: '8c_gaze_breakfast',
    title: 'Senyuman Pagi',
    location: 'RUANG MAKAN',
    text: '"Hati-hati makannya, Lin," tegur Mama lembut sambil menyodorkan air.\n\nOm Rudi menatapmu dari balik gelas kopinya, matanya menyiratkan kepuasan nakal. "Mungkin makanannya terlalu enak ya, Lin?" godanya bermuka dua. Kamu hanya bisa menunduk, jantungmu berdegup tak karuan.',
    backgroundImage: 'coffee_smile',
    choices: [
      { id: 'c8c_1', text: "Cepat-cepat selesaikan makan.", effect: 'neutral' },
      { id: 'c8c_2', text: "Memberi tatapan protes pada Om Rudi.", effect: 'positive' }
    ]
  },
  {
    id: '8b_foot_play',
    title: 'Permainan Bawah Meja',
    location: 'RUANG MAKAN',
    text: '"Hati-hati makannya, Lin," tegur Mama lembut sambil menyodorkan air.\n\nKamu merasa geli dan gilanya kamu cukup menikmati permainan kaki Om Rudi. Jantungmu berdegup kencang, setiap saraf di tubuhmu terasa waspada. Kamu harus menjaga ekspresi wajahmu agar tetap datar di depan Mama, padahal di bawah meja, kamu sedang berjuang menahan lenguhan.\n\nOm Rudi tampak sedikit terkejut dengan responsmu, namun senyum kemenangan tipis muncul di sudut bibirnya. Dia semakin berani menekan titik terdalammu dengan ujung kakinya.',
    backgroundImage: 'feet_under_table',
    choices: [
      { id: 'c8b_fp_1', text: "Tersipu malu.", effect: 'positive', nextNodeId: '9a_wet' }
    ]
  },

  // 9. After School
  {
    id: '9a_wet',
    title: 'Hujan Sepulang Sekolah',
    location: 'TERAS RUMAH',
    text: 'Hari itu hujan badai lagi. Kamu tidak membawa payung dan pulang dengan tanktop putih yang basah kuyup, menjiplak kulit. Kamu menggigil kedinginan saat sampai di teras rumah.',
    backgroundImage: 'rain_run',
    choices: [
      { id: 'c9a_1', text: "Segera ketuk pintu.", effect: 'neutral' },
      { id: 'c9a_2', text: "Mencoba peras baju dulu.", effect: 'neutral' }
    ]
  },
  {
    id: '9b_welcome',
    title: 'Sambutannya',
    location: 'PINTU DEPAN',
    text: 'Pintu terbuka. Om Rudi yang membukanya. Matanya langsung menyapu penampilanmu yang basah kuyup dari atas ke bawah. Ada kilatan khawatir, tapi juga kilatan lain yang lebih gelap.\n\n"Ya ampun, Lin! Masuk, cepat masuk!" Ia menarik tanganmu masuk ke dalam rumah yang hangat. Mama belum pulang.',
    backgroundImage: 'door_open_rain',
    choices: [
      { id: 'c9b_1', text: "Menggigil kedinginan.", effect: 'neutral' },
      { id: 'c9b_2', text: "Bersyukur ada orang di rumah.", effect: 'positive' }
    ]
  },
  {
    id: '9c_towel',
    title: 'Perhatian Lebih',
    location: 'RUANG TENGAH',
    text: 'Om Rudi berlari mengambil handuk besar dan menyelimuti tubuhmu. Ia menggosok-gosok bahumu agar hangat.\n\n"Kamu kedinginan banget... Bibir kamu biru," ucapnya pelan, wajahnya sangat dekat. Jemarinya menyentuh pipi dinginmu. "Mau Om buatkan cokelat panas? Atau langsung mandi air hangat?"',
    backgroundImage: 'towel_warmth',
    choices: [
      { id: 'c9c_1', text: "Aku mau mandi saja Om.", effect: 'negative', nextNodeId: '9d_shower' },
      { id: 'c9c_2', text: "Boleh Om, cokelat panas...", effect: 'positive', nextNodeId: '9d_cocoa' }
    ]
  },
  
  // Branching: Shower Path
  {
    id: '9d_shower',
    title: 'Mandi Air Hangat',
    location: 'KAMAR MANDI',
    text: 'Kamu segera masuk kamar mandi. Air hangat membasuh tubuhmu yang menggigil, namun pikiranmu tak bisa tenang. Sentuhan Om Rudi tadi masih terasa di bahumu.\n\nSelesai mandi, kamu baru sadar lupa membawa baju ganti. Kamu terpaksa melilitkan handuk di tubuhmu dan sedikit membuka pintu kamar mandi, berharap lorong sepi.',
    backgroundImage: 'bathroom_steam',
    choices: [
      { id: 'c9d_shower_1', text: "Lanjutkan berjalan.", effect: 'positive', nextNodeId: '9e_coffee_stunned' }
    ]
  },
  {
    id: '9e_coffee_stunned',
    title: 'Tertegun',
    location: 'DAPUR',
    text: 'Kamu berjalan mengendap-endap. Ternyata Om Rudi ada di dapur sedang menyeduh kopi. Pria itu menoleh saat mendengar langkah kaki.\n\nGerakannya terhenti. Matanya terpaku melihatmu yang hanya berbalut handuk, rambut basah tergerai, dan kulit yang memerah karena uap panas. Ada hening yang panjang dan berat. Gelas di tangan Om Rudi sedikit miring.',
    backgroundImage: 'man_stunned_kitchen',
    choices: [
      { id: 'c9e_coffee_1', text: "Segera pergi ke kamar.", effect: 'neutral', nextNodeId: '10a_empty' }
    ]
  },

  // Branching: Cocoa Path
  {
    id: '9d_cocoa',
    title: 'Cokelat Panas',
    location: 'RUANG TENGAH',
    text: 'Om Rudi ke dapur sebentar lalu kembali dengan mug berisi cokelat panas. Kamu duduk di sofa, baju basahmu terlihat transparan menempel di kulit.\n\nOm Rudi menyerahkan mug itu, namun ia tidak segera menarik tangannya. Matanya menjelajahi siluet tubuhmu di balik kain basah itu. "Minum yang hangat... biar nggak sakit," suaranya parau, seolah menahan sesuatu yang ingin meledak.',
    backgroundImage: 'hot_cocoa_hands',
    choices: [
      { id: 'c9d_cocoa_1', text: "Pergi ke kamar.", effect: 'neutral', nextNodeId: '10a_empty' }
    ]
  },

  // 10. Night Gown
  {
    id: '10a_empty',
    title: 'Rumah Kosong',
    location: 'KAMAR ERLINA',
    text: 'Beberapa hari berlalu. Mama mendapat tugas dinas ke luar kota selama dua hari. Rumah besar itu kini hanya dihuni kamu dan Om Rudi.\n\nMalam pertama terasa sangat sunyi. Jam dinding berdetak keras. Kamu di kamarmu, merasa gelisah. Pikiran tentang Om Rudi dan kado itu terus menghantui.',
    backgroundImage: 'empty_hallway',
    choices: [
      { id: 'c10a_1', text: "Mengunci pintu kamar rapat-rapat.", effect: 'negative' },
      { id: 'c10a_2', text: "Membiarkan pintu tak terkunci.", effect: 'positive' }
    ]
  },
  {
    id: '10b_decision',
    title: 'Keputusan',
    location: 'KAMAR ERLINA',
    text: 'Entah keberanian dari mana, kamu membuka lemari. Lingerie hadiah itu tergantung di sana. Kamu melepas piyamamu dan mengenakan lingerie itu.\n\nTerlintas dalam pikiranmu bahwa kamulah istri Om Rudi, bahkan terbayang suasana romantis dan bercumbu dengan penuh gairah. Kulitmu kini merinding. Kamu tahu Om Rudi masih bangun di ruang TV.',
    backgroundImage: 'wardrobe_red',
    choices: [
      { id: 'c10b_1', text: "Keluar dengan ragu-ragu.", effect: 'negative' },
      { id: 'c10b_2', text: "Temui Rudi.", effect: 'positive' }
    ]
  },
  {
    id: '10c_walk',
    title: 'Langkah Malam',
    location: 'LORONG RUMAH',
    text: 'Kamu melangkah keluar kamar. Lorong remang-remang. Langkah kakimu tanpa suara di atas karpet.\n\nKamu sampai di ambang pintu ruang TV. Om Rudi sedang duduk di sofa, kemejanya terbuka sebagian. Pria itu menoleh. Matanya membelalak, lalu meredup penuh hasrat saat melihatmu berdiri di sana dengan hadiah pemberiannya.',
    backgroundImage: 'night_watching',
    choices: [
      { id: 'c10c_1', text: "Berhenti di ambang pintu ragu.", effect: 'neutral' },
      { id: 'c10c_2', text: "Melangkah masuk mendekat.", effect: 'positive' }
    ]
  },

  // 11. Climax
  {
    id: '11a_silence',
    title: 'Tanpa Kata',
    location: 'RUANG TV',
    text: 'Om Rudi mematikan TV dengan remote. Ruangan kini hanya diterangi lampu sudut yang temaram. Keheningan begitu pekat hingga suara napas kalian terdengar memburu.\n\nOm Rudi berdiri perlahan, seperti predator melihat mangsa, namun matanya penuh permohonan. "Erlina..." bisiknya parau. "Kamu memakainya..."',
    backgroundImage: 'dim_light',
    choices: [
      { id: 'c11a_1', text: "Mundur selangkah.", effect: 'neutral' },
      { id: 'c11a_2', text: "Mengangguk pelan.", effect: 'positive' }
    ]
  },
  {
    id: '11b_confession',
    title: 'Pengakuan',
    location: 'RUANG TV',
    text: 'Om Rudi memangkas jarak di antara kalian. Ia berdiri tepat di depanmu, tidak menyentuh, tapi panas tubuhnya terasa.\n\n"Om berusaha menahannya, Lin. Demi Mama. Tapi melihatmu seperti ini... Om laki-laki biasa. Om menginginkanmu. Lebih dari sekadar anak tiri." Suaranya bergetar menahan gejolak.',
    backgroundImage: 'close_face',
    choices: [
      { id: 'c11b_1', text: "Terdiam terpaku.", effect: 'neutral' },
      { id: 'c11b_2', text: "Menatap matanya dalam-dalam.", effect: 'positive' }
    ]
  },
  {
    id: '11c_choice',
    title: 'Pilihan Terakhir',
    location: 'RUANG TV',
    text: 'Om Rudi mengangkat tangan kanannya menyentuh wajahmu. Tangan kirinya menyentuh dadamu hingga turun ke pinggang. "Katakan berhenti, dan aku akan berhenti sekarang juga. Atau..."\n\nIa menggantung kalimatnya. Keputusan ada di tanganmu. Batasan moral, masa depan keluarga, dan hasrat terlarang kini bertarung hebat di dalam benakmu.',
    backgroundImage: 'hand_reach',
    choices: [
      { 
        id: 'c11c_decide', 
        text: "Ambil keputusan sekarang", 
        effect: 'neutral',
        nextNodeId: '11d_final_decision',
        isHeartbeat: true
      }
    ]
  },
  // New Intermediate Node
  {
    id: '11d_final_decision',
    title: 'Detik Penentuan',
    location: 'RUANG TV',
    text: 'Waktu seakan berhenti. Jantungmu berpacu melawan logikamu. Kamu menatap mata Om Rudi, dan dalam satu tarikan napas, kamu memilih takdirmu.',
    backgroundImage: 'close_up_eye_intense',
    choices: [
      { 
        id: 'ending_reject', 
        text: "Menepis tangannya. 'Ini salah, Om! Sadar!'", 
        effect: 'ending_reject',
        requiredMaxAffinity: 60
      },
      { 
        id: 'ending_fling', 
        text: "Diam, membiarkan ciuman itu terjadi sesaat lalu menangis.", 
        effect: 'ending_fling',
        requiredMinAffinity: 50,
        requiredMaxAffinity: 70
      },
      { 
        id: 'ending_romance', 
        text: "Menyambut genggamannya dan memeluknya erat.", 
        effect: 'ending_romance',
        requiredMinAffinity: 70
      }
    ]
  }
];

export const ENDING_REJECT: StoryNode = {
  id: 'ending_reject',
  title: 'Batas Moral',
  location: 'RUANG TV',
  text: '"Cukup, Om!" Kamu mundur drastis, air mata menggenang di pelupuk matamu. "Mama percaya sama Om. Aku juga menghormati Om sebagai papa. Jangan hancurkan semuanya hanya karena nafsu sesaat!"\n\nOm Rudi tersentak hebat, seakan ditampar kenyataan. Wajahnya pucat pasi, bahunya merosot penuh penyesalan. "Maaf... maafkan Om, Lin. Om khilaf. Om tidak tahu apa yang merasuki Om."\n\nIa mundur dan kembali duduk di sofa, menutupi wajahnya dengan tangan. Sejak malam itu, tembok tebal terbangun. Hubungan kalian kembali menjadi papa dan anak yang dingin dan kaku. Kamu berhasil menyelamatkan keutuhan keluargamu, namun rahasia malam itu terkubur dalam-dalam, menyisakan rasa canggung yang abadi.',
  backgroundImage: 'window_rain',
  choices: []
};

export const ENDING_FLING: StoryNode = {
  id: 'ending_fling',
  title: 'Angin Lalu',
  location: 'RUANG TV',
  text: 'Kamu membiarkan dirimu hanyut. Matamu terpejam saat bibir kalian bertemu dan saling berbalas. Sebuah dosa manis yang memabukkan dan penuh adrenalin.\n\nTangan Om Rudi mulai melangkah lebih jauh, masuk ke dalam lingerie hingga mencapai puncak. Namun bayangan wajah Mama seketika melintas di benakmu. Rasa bersalah menghantammu seperti ombak.\n\n"Tidak... aku nggak bisa," isakmu, mendorong dada Om Rudi menjauh. Kamu berlari ke kamarmu, meninggalkan Om Rudi yang terpaku.\n\nKeesokan harinya, kalian bersikap seolah tak terjadi apa-apa. Tak ada yang dibicarakan. Itu menjadi rahasia pahit—sebuah momen kelemahan sesaat yang menjadi \'angin lalu\', namun meninggalkan bekas goresan luka yang tak terlihat di hati keduanya.',
  backgroundImage: 'autumn_leaves',
  choices: []
};

export const ENDING_ROMANCE: StoryNode = {
  id: 'ending_romance',
  title: 'Api Asmara',
  location: 'KAMAR ERLINA',
  text: 'Kamu tidak menolak. Jemarimu justru bergerak, menyambut sentuhan itu. "Aku juga merasakan hal yang sama, Om... aku sekarang milikmu," bisikmu lirih.\n\nOm Rudi merengkuhmu ke dalam pelukannya, menciummu dengan gairah yang telah lama dipendam. Om Rudi menggendongmu ke dalam kamar. Malam itu menjadi saksi penyatuan dua hati yang tersesat dalam labirin asmara.\n\nDesah bergelora berkumandang, disaat bersamaan Mama yang terlelap di kamarnya.\n\nKalian tahu ini pengkhianatan terhadap Mama. Namun api asmara telah membakar logika. Sejak saat itu, di balik punggung dunia, sebuah hubungan terlarang terjalin. Penuh gairah, penuh sembunyi-sembunyi. Kalian memilih untuk menari di atas bara api.',
  backgroundImage: 'red_rose_dark',
  choices: []
};
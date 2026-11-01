import { Festival, CulturalArticle, GlossaryTerm, FolkGame, User, SystemLog, CommunitySubmission } from '../types';

export const CURRENT_USER: User = {
  id: 'usr-001',
  username: 'nam.bt',
  fullName: 'Bùi Trung Nam',
  studentId: 'PH60600',
  role: 'SUPER_ADMIN',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH3pDCKqpWeAIhb5468TjwFofq-rUUBjDVwfitp8r4ebYkEfPbDzd-nUpNVCo11XuEMzAnFtUN-vM4gtm2Xsny-57swaEYD-xJ1YuEraRYpgju9lvtoEe8Bj9n5eTZa0f2nrWfbJvvFvQ6qfIK07jsivlZZdqnBQEoVh9vfX_ImQeRZa4-Ty7HC7qr_VtXbW-iNzqkjhiUPYOSD0BvG_2hAiD8JcRqJy11Zn3ccB4',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQSDYwNjAwIiwicm9sZSI6IlNVUEVSX0FETUlOIiwiZXhwIjoxNzg0ODAwMDAwfQ.demo_jwt_signature',
  email: 'nam.ph60600@fpt.edu.vn',
};

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwXcbYU6vSacFpw6j1eiw7pOQPyLzO0dVr8ATEvuH6Zg_2O-Mp_KRP_kWDWe1hfNNLTsCtNcbtnSiz29MSTuIuL3lXDHXizOCP5yeT109Rt3XKbVv_32TVJdJ4E3Oibo7lbBgMYKt23xTZHUdY9TadEMSmZCRAPS19PktDwLx-4ZQz2T3_QWe8KIKq70SR2RVV44FynoOh1OS1wvgJRyi19JFoPiLWJ4_k9wiBCjA';

export const INITIAL_FESTIVALS: Festival[] = [
  {
    id: 'lim',
    code: 'VH-BN-02',
    name: 'Hội Lim Kinh Bắc',
    slug: 'hoi-lim-bac-ninh',
    region: 'Bắc',
    regionKey: 'bac',
    province: 'Bắc Ninh',
    district: 'Huyện Tiên Du',
    location: 'Đồi Lim, Chùa Hồng Ân, Huyện Tiên Du, Tỉnh Bắc Ninh',
    lunarDate: '12 – 14 Tháng Giêng ÂL',
    lunarMonth: 1,
    lunarDay: 13,
    solarDate2025: '09 – 11/02/2025 (Chính hội 10/02)',
    heritageRank: 'UNESCO',
    heritageRankLabel: 'UNESCO Di Sản Phi Vật Thể',
    category: 'unesco',
    categoryLabel: 'Dân ca Quan họ',
    shortDesc: 'Không gian diễn xướng Dân ca Quan họ truyền thống tại đồi Lim, sông Tiêu Tương với các làn điệu mời trầu, giã bạn đặc sắc vùng Kinh Bắc.',
    fullDesc: 'Hội Lim là lễ hội truyền thống đặc sắc của các làng xã thuộc tổng Nội Duệ xưa (nay là huyện Tiên Du, Bắc Ninh). Lễ hội tôn vinh nghệ thuật Dân ca Quan họ Bắc Ninh - Di sản văn hóa phi vật thể đại diện của nhân loại được UNESCO vinh danh năm 2009. Hàng vạn du khách tụ hội nghe liền anh, liền chị áo the khăn xếp, nón quai thao giao duyên trên thuyền rồng và lán trại.',
    history: 'Theo văn bia đền Hồng Ân và gia phả dòng họ Đỗ, tướng công Đỗ Nguyên Thụy (người làng Đình Cả) và tướng công Nguyễn Đình Diễn đã có công mua ruộng công và quy chuẩn lễ hội hàng tổng vào tháng Giêng từ thế kỷ 18 thời Hậu Lê. Lễ hội ban đầu gắn với chùa Hồng Ân trên đỉnh núi Lim, sau lan tỏa thành ngày hội quan họ của 49 làng cổ.',
    lunarMeaning: 'Ngày 13 tháng Giêng ứng vào tiết Lập Xuân, khi trăng non bắt đầu tròn đầy, cỏ cây đơm chồi nảy lộc. Đây là thời khắc giao hòa âm dương lý tưởng để trai gái giao duyên, dân làng cầu phúc cho một niên vụ thuận hòa.',
    rituals: [
      'Lễ mở cửa đình Lim và chùa Hồng Ân sáng ngày 12 tháng Giêng',
      'Đại lễ rước sắc nghinh thần từ làng Đình Cả tiến về núi Lim dài hàng cây số sáng ngày 13',
      'Tuần tế dâng hương, đọc văn chúc tạ ơn tiền hiền tại sân đình chính',
      'Lễ giã hội và đóng cửa đình ngày 14 tháng Giêng'
    ],
    games: [
      'Hát Quan họ đối đáp trên thuyền rồng hồ Cây Sắn',
      'Các canh hát lán trại thâu đêm giọng lề lối, giọng vặt',
      'Sới đấu vật dân tộc giật giải cờ son danh giá',
      'Đu tiên đôi nam nữ nhịp nhàng',
      'Thi dệt vải canh cửi vừa dệt vừa đối đáp'
    ],
    songs: [
      {
        title: 'Người Ở Đừng Về (Điệu Giã Bạn)',
        artist: 'NSƯT Thúy Cải & Thúy Hường',
        subtitle: 'Làn điệu kinh điển giã bạn lúc hoàng hôn đồi Lim',
        verse: 'Người về em vẫn trông theo, trông nước nước chảy, trông bèo bèo trôi... Người ơi người ở đừng về!',
        duration: '04:12'
      },
      {
        title: 'Khách Đến Chơi Nhà (Điệu Mời Trầu)',
        subtitle: 'Nét đẹp trầu têm cánh phượng hiếu khách',
        verse: 'Trầu này trầu tính trầu tình, ăn vào cho đỏ môi mình môi ta... Miếng trầu là đầu câu chuyện.',
        duration: '03:45'
      }
    ],
    tips: {
      behavior: [
        'Trang phục trang nhã, kín đáo khi vãn cảnh chùa Hồng Ân',
        'Đón nhận miếng trầu têm cánh phượng bằng hai tay kèm nụ cười cảm ơn',
        'Lắng nghe trọn vẹn câu hát đối mộc, tránh chen lấn quanh mép thuyền rồng'
      ],
      food: [
        'Bánh Phu Thê (Xu Xê) Đình Bảng trong suốt bọc đỗ xanh dừa nạo',
        'Trầu têm cánh phượng nghệ thuật xứ Kinh Bắc',
        'Nem bùi Ninh Xá gói lá sung giòn bùi nức tiếng sông Đuống'
      ]
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDY7TeCOsRc5Ig2FnvqVEBDePRl0UEHUsAfSmOlZXItqNkzw75I-9Tb2ol1bf5vV_sOISAA25blfis9s6qkwbGUMAxLRNXUCXr-OUMneFhc9OKx0f6qaNaoBk1PqdVXWHQpQ1hZiNE1QbgVLWi5yxBHzgslo9MP7LkLzTJpIcQG6oEs0kQoZWUAJ1WjlMYFjJTTzCebisfYV2O8BQLkG4g5LXi3c8uLo8CM2cHEqXk',
    coordinates: { x: 320, y: 125, lat: 21.1643, lng: 106.0289 },
    featured: true,
    status: 'PUBLISHED',
    confidenceScore: 98,
    verifiedSource: 'Sở VHTTDL Bắc Ninh & UNESCO Vietnam',
    daysLeft: 27,
    attendeesCount: '35,000+ du khách',
    tags: ['Quan họ', 'Bắc Ninh', 'UNESCO', 'Mùa xuân', 'Lễ hội làng']
  },
  {
    id: 'denhung',
    code: 'VH-PT-01',
    name: 'Giỗ Tổ Hùng Vương - Lễ Hội Đền Hùng',
    slug: 'gio-to-hung-vuong-den-hung',
    region: 'Bắc',
    regionKey: 'bac',
    province: 'Phú Thọ',
    district: 'TP. Việt Trì',
    location: 'Khu Di tích Lịch sử Đền Hùng, Núi Nghĩa Lĩnh, TP. Việt Trì, Tỉnh Phú Thọ',
    lunarDate: '08 – 11 Tháng Ba ÂL (Chính giỗ mùng 10)',
    lunarMonth: 3,
    lunarDay: 10,
    solarDate2025: '05 – 08/04/2025 (Chính lễ 07/04/2025)',
    heritageRank: 'UNESCO',
    heritageRankLabel: 'UNESCO Di Sản Đại Diện',
    category: 'unesco',
    categoryLabel: 'Quốc Lễ Thiêng Liêng',
    shortDesc: 'Đại lễ linh thiêng tưởng niệm công đức khai quốc sơn hà của 18 đời Vua Hùng, quy tụ hàng triệu đồng bào con Lạc cháu Hồng hướng về nguồn cội.',
    fullDesc: 'Tín ngưỡng thờ cúng Hùng Vương tại Phú Thọ được UNESCO ghi danh là Di sản văn hóa phi vật thể đại diện của nhân loại năm 2012. Hàng năm vào ngày 10 tháng 3 Âm lịch, ngày Quốc lễ long trọng với đoàn rước kiệu dâng bánh chưng, bánh giầy và các nghi lễ quốc gia trang nghiêm trên đỉnh núi thiêng Nghĩa Lĩnh.',
    history: 'Truyền thống thờ cúng các Vua Hùng có từ thời cổ đại Văn Lang. Các triều đại Đinh, Tiền Lê, Lý, Trần, Hậu Lê và Nguyễn đều ban sắc phong tôn kính và cấp ruộng hương hỏa để nhân dân các xã vùng chân núi Nghĩa Lĩnh phụng thờ đời đời.',
    lunarMeaning: 'Tháng ba âm lịch là thời điểm mưa rào tháng ba tươi tốt mùa màng. Mùng 10 tháng 3 là ngày linh thiêng gắn kết dòng máu rồng tiên và tinh thần đại đoàn kết dân tộc.',
    rituals: [
      'Lễ dâng hương tưởng niệm các Vua Hùng của lãnh đạo Đảng và Nhà nước',
      'Đoàn rước kiệu hoa, tàn lọng của các xã vùng ven Đền Hùng lên Đền Thượng',
      'Lễ giỗ Đức Quốc Tổ Lạc Long Quân và dâng hương Tổ Mẫu Âu Cơ',
      'Nghi thức dâng bánh chưng bánh giầy kỷ niệm tích Lang Liêu'
    ],
    games: [
      'Hát Xoan cửa đình Phú Thọ di sản UNESCO',
      'Hội thi giã bánh giầy và gói bánh chưng truyền thống',
      'Bắn nỏ, kéo co, đấu vật dân tộc',
      'Hội thi bơi chải trên dòng sông Lô lịch sử'
    ],
    songs: [
      {
        title: 'Lời Hát Xoan Cửa Đình Phú Thọ',
        subtitle: 'Nghệ thuật diễn xướng dân gian gắn với thời đại Hùng Vương',
        verse: 'Trăm năm gõ trống hát Xoan, cầu cho quốc thái dân an đời đời...',
        duration: '05:10'
      }
    ],
    tips: {
      behavior: [
        'Giữ trật tự tôn nghiêm khi leo bậc đá lên đền Thượng',
        'Chuẩn bị trang phục lịch sự, chỉnh tề khi tham gia dâng hương',
        'Bảo vệ cảnh quan rừng quốc gia Đền Hùng'
      ],
      food: [
        'Bánh tai Phú Thọ nhân thịt hành thơm bùi',
        'Thịt chua Thanh Sơn ủ thính ngô thơm nồng',
        'Bưởi Đoan Hùng ngọt mát thanh khiết'
      ]
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0-0dQGLGAtzTSeJ5aosGqtEdMy5xJHF_HqySXRD9dUKavxytZpslJ1S-YKQR_MunvcLZAo4ETa0-UHYp-ew1IjbvosRQsh05t99gk8LmRGvnbXjCePR07cNsxxs5TLO2KtCKQOY3tdiLE3eHFiavPKgMWLoXIeqahoeNNb_as-yZjVxbxAyNw-paBZSCyVbUdhTEAseINOO7PIq7PzaE3P7J-IyRB8jWe9_1Z0iQ',
    coordinates: { x: 280, y: 110, lat: 21.3653, lng: 105.3283 },
    featured: true,
    status: 'PUBLISHED',
    confidenceScore: 100,
    verifiedSource: 'Bộ Văn hóa Thể thao & Du lịch / Viện Sử Học',
    daysLeft: 84,
    attendeesCount: '4,000,000+ đồng bào',
    tags: ['Đền Hùng', 'Quốc lễ', 'UNESCO', 'Vua Hùng', 'Phú Thọ']
  },
  {
    id: 'chuahuong',
    code: 'VH-HN-03',
    name: 'Trẩy Hội Chùa Hương',
    slug: 'le-hoi-chua-huong',
    region: 'Bắc',
    regionKey: 'bac',
    province: 'Hà Nội',
    district: 'Huyện Mỹ Đức',
    location: 'Quần thể Thắng cảnh Hương Sơn, Xã Hương Sơn, Huyện Mỹ Đức, Hà Nội',
    lunarDate: '06 Tháng Giêng – Hết Tháng 3 ÂL',
    lunarMonth: 1,
    lunarDay: 6,
    solarDate2025: '03/02 – 27/04/2025',
    heritageRank: 'QUOC_GIA',
    heritageRankLabel: 'Di Tích Quốc Gia Đặc Biệt',
    category: 'denchua',
    categoryLabel: 'Phật Giáo Cổ Tự',
    shortDesc: 'Hành trình chiêm bái Phật giáo bồng bềnh trên suối Yến thơ mộng, bước vào cõi Phật thanh tịnh Động Hương Tích - Nam thiên đệ nhất động.',
    fullDesc: 'Lễ hội Chùa Hương kéo dài nhất trong năm, kết hợp giữa hành hương chiêm bái tâm linh đạo Phật với vãn cảnh sơn thủy hữu tình núi đá vôi Hương Sơn. Du khách đi thuyền sắt và thuyền gỗ xuôi suối Yến, ngắm hoa mơ nở trắng sườn non, viếng đền Trình, chùa Thiên Trù và leo lên động Hương Tích.',
    history: 'Chùa Hương hình thành từ thời vua Lê Thánh Tông (thế kỷ 15) và phát triển mạnh mẽ vào thời chúa Trịnh Sâm khi ông tuần du ghé thăm và tự tay khắc 5 chữ đại tự "Nam thiên đệ nhất động" lên cửa động Hương Tích năm 1770.',
    lunarMeaning: 'Mùng 6 tháng Giêng là ngày khai sơn (mở cửa rừng). Nhân dân cầu bình an, may mắn đầu năm và hướng thiện theo giáo lý từ bi của Bồ Tát Quán Thế Âm.',
    rituals: [
      'Lễ dâng hương mở cửa đền Trình Suối Yến sáng mùng 6 Giêng',
      'Đại lễ cầu quốc thái dân an tại sân tam bảo chùa Thiên Trù',
      'Nghi thức đảnh lễ Đức Phật Bà Quán Thế Âm trong động Hương Tích',
      'Thả hoa đăng trên dòng suối Yến lúc chập tối'
    ],
    games: [
      'Chèo đò vãn cảnh suối Yến giao lưu ngâm thơ',
      'Leo núi đá Hương Sơn rèn luyện sức bền',
      'Múa rồng, múa lân tại sân chùa Thiên Trù'
    ],
    tips: {
      behavior: [
        'Mang giày thể thao có độ bám tốt để leo dốc động Hương Tích',
        'Mặc áo phao an toàn khi ngồi đò dọc suối Yến',
        'Không xả rác xuống dòng suối và sườn núi'
      ],
      food: [
        'Rau sắng chùa Hương nấu canh thanh mát',
        'Chè củ mài Hương Sơn ngọt bùi bổ dưỡng',
        'Mơ rừng Hương Tích ngâm đường hoặc ngâm rượu'
      ]
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8PpAueS7BnWnAo_OFznJ_LDrJ4F38nugbggjwYXehKyJe1nLtj_ngsnBNf7goBKvy0qPlcTCh9ZWv_b9s2FxN-oiC7iiC9uuyc67Mi2zz9XHv2J-4STJAiDNf6fs2QBk13mq0YLAWsRxqEoOHfh4s9AFIYtKvMT0kS2wANPol9pXEU68v5FZIwgdAezD8wE-G7apdUz3zMc70x7eoMcRFu_MfnwILEdkznCHg3Yg',
    coordinates: { x: 300, y: 150, lat: 20.6186, lng: 105.7533 },
    featured: true,
    status: 'PUBLISHED',
    confidenceScore: 99,
    verifiedSource: 'BQL Khu di tích Hương Sơn & Giáo hội Phật giáo',
    daysLeft: 19,
    attendeesCount: '1,500,000+ phật tử',
    tags: ['Chùa Hương', 'Hà Nội', 'Suối Yến', 'Hành hương', 'Động Hương Tích']
  },
  {
    id: 'caungu',
    code: 'VH-HUE-05',
    name: 'Lễ Hội Cầu Ngư Duyên Hải Miền Trung',
    slug: 'le-hoi-cau-ngu-thuan-an',
    region: 'Trung',
    regionKey: 'trung',
    province: 'Thừa Thiên Huế',
    district: 'Thị trấn Thuận An',
    location: 'Lăng Ông Nam Hải, Thị trấn Thuận An, Thừa Thiên Huế & Duyên hải Đà Nẵng, Khánh Hòa',
    lunarDate: '10 – 16 Tháng Giêng ÂL',
    lunarMonth: 1,
    lunarDay: 16,
    solarDate2025: '07 – 13/02/2025',
    heritageRank: 'QUOC_GIA',
    heritageRankLabel: 'Di Sản Phi Vật Thể Quốc Gia',
    category: 'songnuoc',
    categoryLabel: 'Văn hóa Biển đảo',
    shortDesc: 'Tập tục tế Thần Nam Hải (Cá Voi) cầu sóng yên biển lặng, đoàn thuyền vươn khơi bám biển Hoàng Sa - Trường Sa và trúng mùa tôm cá đầy khoang.',
    fullDesc: 'Lễ hội Cầu Ngư là nét đẹp văn hóa tâm linh thiêng liêng nhất của cộng đồng ngư dân duyên hải Trung Bộ. Người dân tôn kính Cá Voi là vị thần hộ mệnh thường cứu giúp thuyền bè hoạn nạn trong bão tố. Lễ hội gồm phần lễ tế nghinh thần và phần hội diễn xướng điệu Hò Bả Trạo hào hùng.',
    history: 'Tục thờ Cá Ông bắt nguồn từ văn hóa Chăm Pa cổ và được người Việt tiếp thu, bản địa hóa qua hàng trăm năm mở cõi. Các vua triều Nguyễn đã ban tặng tước phong thần "Đại Càn Quốc Gia Nam Hải Đại Vương" cho thần Cá Ông.',
    lunarMeaning: 'Đầu xuân tháng Giêng là thời điểm chuẩn bị cho mùa đánh bắt vụ cá Bắc. Lễ hội tiếp thêm sức mạnh tinh thần cho những chuyến hải trình dài ngày trên biển Đông.',
    rituals: [
      'Lễ Nghinh Thần rước linh vị Thần Nam Hải từ biển về Lăng Ông',
      'Đại lễ tế thần với nghi thức dâng hương, đọc chúc văn cầu an',
      'Lễ ra quân mở biển đầu năm của đoàn tàu công suất lớn'
    ],
    games: [
      'Điệu múa Hát Bả Trạo mô phỏng nhịp chèo thuyền vượt sóng cả',
      'Đua thuyền rồng truyền thống trên mặt đầm phá Tam Giang',
      'Hội lắc thúng chai nhanh trên biển'
    ],
    tips: {
      behavior: [
        'Kính cẩn giữ trật tự khi ban tế cử hành nghi thức Nghinh Thần',
        'Tôn trọng tín ngưỡng kiêng cữ đồ cúng của bạn chài',
        'Tránh chạm vào các hiện vật xương cốt Cá Ông trong lăng'
      ],
      food: [
        'Bánh tráng nướng chấm ruốc biển Thuận An',
        'Cá thu tươi hấp cuốn bánh tráng rau sống',
        'Mực một nắng nướng than hồng thơm ngọt'
      ]
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCh6_7sB3LrLSQF0tpt2W2Up0V4SDYjs3IDuuPEGYsDEqD9U9XZhJRs1446saN0N8k3AurC4EYPmPiSaYX1mhbcXy5axj77g1K1-uFfKeK5YcesLHXz2VSySv6Ee7rnhGLS3mG-NavQkZg-mcW7lYkAG785vTBScKPv8J50rHZ4GyiCZcX473W4kQsx-xiO4V313SryeMjYRFpb_zrywpsSi1KSf8pgzHl3wrbDE2U',
    coordinates: { x: 375, y: 315, lat: 16.5401, lng: 107.6441 },
    featured: true,
    status: 'PUBLISHED',
    confidenceScore: 97,
    verifiedSource: 'Sở VHTTDL Thừa Thiên Huế & Viện Hải Dương Học',
    daysLeft: 23,
    attendeesCount: '45,000+ ngư dân & du khách',
    tags: ['Cầu Ngư', 'Biển đảo', 'Thuận An', 'Thần Nam Hải', 'Hát Bả Trạo']
  },
  {
    id: 'ponagar',
    code: 'VH-KH-06',
    name: 'Lễ Hội Tháp Bà Ponagar Nha Trang',
    slug: 'le-hoi-thap-ba-ponagar',
    region: 'Trung',
    regionKey: 'trung',
    province: 'Khánh Hòa',
    district: 'TP. Nha Trang',
    location: 'Quần thể Tháp Bà Ponagar, Đồi Cù Lao, TP. Nha Trang, Tỉnh Khánh Hòa',
    lunarDate: '20 – 23 Tháng Ba ÂL',
    lunarMonth: 3,
    lunarDay: 21,
    solarDate2025: '17 – 20/04/2025',
    heritageRank: 'QUOC_GIA',
    heritageRankLabel: 'Di Sản Phi Vật Thể Quốc Gia',
    category: 'unesco',
    categoryLabel: 'Giao lưu Chăm - Việt',
    shortDesc: 'Lễ hội tôn vinh Thánh Mẫu Thiên Y A Na (Mẹ Xứ Sở Yang Ino Po Nagar), biểu tượng hòa hợp văn hóa sâu sắc giữa đồng bào Chăm và Việt.',
    fullDesc: 'Lễ hội diễn ra trên cụm tháp gạch nung nghìn năm tuổi soi bóng bên dòng sông Cái Nha Trang. Đồng bào người Chăm từ Ninh Thuận, Bình Thuận hòa cùng người Kinh tham gia lễ Tắm tượng (Mộc dục), thay xiêm y Thánh Mẫu và biểu diễn các điệu múa quạt, múa hoa Chăm Pa lung linh huyền ảo.',
    history: 'Theo truyền thuyết, Mẹ Xứ Sở đã dạy dân làng nghề nông, dệt vải và che chở cho vùng đất Nam Trung Bộ qua bão tố. Triều đình phong kiến nhà Nguyễn đã sắc phong Bà là Hồng Đức Thần Nữ Thượng Đẳng Thần.',
    lunarMeaning: 'Tháng ba âm lịch tiết trời biển êm gió mát, thích hợp cho sự quy tụ của hai cộng đồng dân tộc giao lưu văn hóa và cầu mùa màng thịnh vượng.',
    rituals: [
      'Lễ Mộc dục (Tắm tượng và thay xiêm y Thần Mẫu) đêm 20 tháng Ba',
      'Lễ Thả hoa đăng trên sông Cái cầu quốc thái dân an',
      'Đại lễ cầu siêu và dâng hương tế lễ chính điện'
    ],
    games: [
      'Múa dâng hoa và múa quạt truyền thống người Chăm',
      'Biểu diễn hòa tấu nhạc cụ trống Paranưng và kèn Saranai',
      'Thi dệt thổ cẩm Chăm hoa văn cổ'
    ],
    tips: {
      behavior: [
        'Cởi giày dép và giữ trang phục chỉnh tề khi bước vào tháp chính',
        'Tránh đùa cợt trước tượng Mẫu và các bức phù điêu cổ',
        'Xin phép nghệ nhân trước khi ghi hình cận cảnh các nghi thức mật'
      ],
      food: [
        'Bánh căn tôm mực Nha Trang giòn rụm',
        'Bún sứa cá dầm nước dùng trong vắt thanh ngọt',
        'Gỏi cá mai tươi cuốn bánh tráng'
      ]
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlTWf_6jV8Y3yYXy-e-D1R_cIhZruD4JI79AiTCIvjGq2zxNR-adUikAOshDS6zg2hsC99p2QJIvakCJha-gAAfmKdqW3ruSg9HyqgShEvjnx4yjAQuh210qaoGAxC9rl0bJyiV4BrYSs1Di4pnzXYQu98cVXzvkUgrn3CIHrObodENArFGCQxVIpqb4xxKI15xHlzZPcwVw7yU5BQ2Ci7a62ZJH3bjbG4rlBYcqs',
    coordinates: { x: 415, y: 475, lat: 12.2655, lng: 109.1953 },
    featured: true,
    status: 'PUBLISHED',
    confidenceScore: 98,
    verifiedSource: 'Sở VHTTDL Khánh Hòa & Hội đồng Trưởng lão Chăm',
    daysLeft: 96,
    attendeesCount: '80,000+ du khách',
    tags: ['Tháp Bà', 'Ponagar', 'Nha Trang', 'Khánh Hòa', 'Chăm Pa']
  },
  {
    id: 'nuisam',
    code: 'VH-AG-04',
    name: 'Lễ Hội Vía Bà Chúa Xứ Núi Sam',
    slug: 'via-ba-chua-xu-nui-sam',
    region: 'Nam',
    regionKey: 'nam',
    province: 'An Giang',
    district: 'TP. Châu Đốc',
    location: 'Miếu Bà Chúa Xứ, Chân Núi Sam, TP. Châu Đốc, Tỉnh An Giang',
    lunarDate: '22 – 27 Tháng Tư ÂL (Chính lễ đêm 23 rạng sáng 24)',
    lunarMonth: 4,
    lunarDay: 23,
    solarDate2025: '19 – 23/05/2025',
    heritageRank: 'UNESCO',
    heritageRankLabel: 'UNESCO Đang Đệ Trình',
    category: 'unesco',
    categoryLabel: 'Quốc Gia Phi Vật Thể',
    shortDesc: 'Lễ hội tâm linh lớn nhất vùng Tây Nam Bộ, nổi bật với nghi thức lễ tắm Bà, lễ thỉnh sắc và đón rước hàng triệu Phật tử, du khách từ khắp mọi miền.',
    fullDesc: 'Lễ hội Vía Bà Chúa Xứ Núi Sam là biểu tượng tín ngưỡng phồn thịnh của vùng đồng bằng châu thổ Cửu Long. Pho tượng đá sa thạch cổ kính từ thời Óc Eo được đặt trên đỉnh núi Sam, sau chuyển về chân núi. Hàng năm dịp tháng Tư âm lịch, dòng người đổ về cầu an, tạ ơn và chiêm bái lễ phục uy nghiêm của Mẫu.',
    history: 'Theo truyền thuyết dân gian miền Tây, tượng Bà được 9 cô gái đồng trinh khiêng từ đỉnh núi Sam xuống theo lời chỉ dẫn thiêng liêng. Danh tướng Thoại Ngọc Hầu cùng phu nhân Châu Thị Tế đã có công lớn trùng tu miếu vũ và phát triển hội đền.',
    lunarMeaning: 'Tháng Tư âm lịch mùa nước bắt đầu chuẩn bị tràn đồng Nam Bộ. Người nông dân tạ ơn Bà ban cho mùa vụ bình an và tài lộc đủ đầy.',
    rituals: [
      'Lễ tắm Bà (Mộc dục) diễn ra lúc nửa đêm 23 tháng Tư âm lịch',
      'Lễ thỉnh sắc Thoại Ngọc Hầu từ lăng về miếu Bà ngày 24',
      'Lễ túc yết, lễ xây chầu và hát bội truyền thống phục vụ bá tánh'
    ],
    games: [
      'Hát bội tuồng cổ Nam Bộ xuyên đêm',
      'Múa lân sư rồng rước phụng nghinh trên đường phố Châu Đốc',
      'Đua thuyền rồng trên dòng sông Châu Đốc'
    ],
    tips: {
      behavior: [
        'Cẩn thận tư trang cá nhân tại khu vực hành hương đông người',
        'Mua lễ vật và nhang đèn tại quầy niêm yết giá chính thức của BQL',
        'Tránh để kẻ xấu lôi kéo mua bùa chú mê tín dị đoan'
      ],
      food: [
        'Bún cá Châu Đốc nước lèo nghệ vàng óng thơm ngát',
        'Mắm cá lóc, cá sặc Châu Đốc trứ danh',
        'Thốt nốt lạnh ngọt dịu giải nhiệt vùng Bảy Núi'
      ]
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCijpHI9KmDhaXZcUznYwyVHLiSOMynvRLH0toCAiZr8yMSXkC51CNhmNagnEFcQbNDPg57Pr-lzmwtI3Mbe5EaPPKr_mUv2jQrwEsltIXwPTDbmdQnhP7a_aIaZii6Cizo7zbb_supU4AgKPRHp8H-viHFS13-CZoC9pDliluUM9jECBnTqQ05r7fas2KUp0L4hBTLv9PJy5ZkIAWzkcxPq0nkwvTykSnl_G8Swt0',
    coordinates: { x: 255, y: 620, lat: 10.6865, lng: 105.0743 },
    featured: true,
    status: 'PUBLISHED',
    confidenceScore: 97,
    verifiedSource: 'Sở VHTTDL An Giang & Ban Quản lý Di tích Núi Sam',
    daysLeft: 128,
    attendeesCount: '5,000,000+ lượt khách hành hương',
    tags: ['Núi Sam', 'Bà Chúa Xứ', 'Châu Đốc', 'An Giang', 'Tây Nam Bộ']
  },
  {
    id: 'ghengo',
    code: 'VH-ST-07',
    name: 'Đua Ghe Ngo Ok Om Bok Sóc Trăng',
    slug: 'dua-ghe-ngo-ok-om-bok',
    region: 'Nam',
    regionKey: 'nam',
    province: 'Sóc Trăng',
    district: 'TP. Sóc Trăng',
    location: 'Sông Maspéro, TP. Sóc Trăng, Tỉnh Sóc Trăng',
    lunarDate: '14 – 15 Tháng 10 ÂL (Rằm tháng Mười)',
    lunarMonth: 10,
    lunarDay: 15,
    solarDate2025: '04 – 05/11/2025',
    heritageRank: 'QUOC_GIA',
    heritageRankLabel: 'Di Sản Phi Vật Thể Quốc Gia',
    category: 'folk',
    categoryLabel: 'Văn hóa Khmer Nam Bộ',
    shortDesc: 'Sự kiện thể thao sông nước cổ truyền hào hùng của đồng bào Khmer trên dòng sông Maspéro nhằm tạ ơn Thần Nước và đón mừng vụ mùa bội thu.',
    fullDesc: 'Lễ hội Oóc Om Bóc - Đua Ghe Ngo là ngày hội lớn nhất của đồng bào Khmer Tây Nam Bộ. Những chiếc ghe ngo dài gần 30 mét, chạm khắc hình rắn thần Naga lộng lẫy được chèo bởi 50-60 lực sĩ khỏe mạnh trong tiếng còi, tiếng trống và tiếng reo hò rền vang mặt nước.',
    history: 'Theo quan niệm Phật giáo Nam tông Khmer, ghe ngo là linh vật bảo hộ của chùa làng. Đua ghe ngo tái hiện sự bảo vệ mùa màng, xua đuổi thủy quái và rèn luyện tinh thần thượng võ bảo vệ quê hương.',
    lunarMeaning: 'Rằm tháng 10 âm lịch là thời điểm cuối mùa mưa, giao mùa khô hạn và kết thúc năm nông nghiệp cổ truyền. Nhân dân làm lễ Đút Cốm Dẹp (Oóc Om Bóc) tạ ơn Mặt Trăng đã ban phước cho mưa thuận gió hòa.',
    rituals: [
      'Nghi thức hạ thủy ghe ngo tại sân chùa Khmer trước ngày hội',
      'Lễ cúng Trăng (Oóc Om Bóc) và đút cốm dẹp đêm rằm',
      'Thả hoa đăng đèn nước (Lôi Protip) trên sông Maspéro lung linh'
    ],
    games: [
      'Giải đua ghe ngo nam nữ tranh tài kịch tính cúp quốc gia',
      'Múa hát Dù Kê và múa Romvong tập thể',
      'Biểu diễn hòa tấu dàn nhạc Ngũ âm Khmer'
    ],
    tips: {
      behavior: [
        'Đến sớm trước 2 tiếng tại bờ sông Maspéro để có vị trí quan sát tốt',
        'Tôn trọng luật cấm phụ nữ bước qua ghe ngo theo hương ước chùa cổ',
        'Nhiệt tình cổ vũ công tâm cho tất cả các đội thuyền chùa'
      ],
      food: [
        'Cốm dẹp trộn dừa nạo và đường thốt nốt thơm lừng',
        'Bún nước lèo Sóc Trăng cá lóc rau đắng',
        'Bánh pía Sóc Trăng sầu riêng trứng muối thơm ngậy'
      ]
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrlh8q7CBCE58VFM9YjTm0zpCgY-Z2obOorttHsOZl8jnD47pzxqD4kWBdw_LoNPcNRutj5aG8enb9MUw6Brf1vStYD6555gt9DlHZ7_PUmaY7AkMEgMnMe7lJeO8UPboVTZnITRzHKiYd0MLu6RF5mV2Xhkz9Y8IXNasXO_y0fV1MLyiRRhbjnuItW6jXtWnHtTBQVuP6su-aKY9K3qI-D1QfYgj4Z_Pa9OqcNc0',
    coordinates: { x: 290, y: 650, lat: 9.6033, lng: 105.9723 },
    featured: true,
    status: 'PUBLISHED',
    confidenceScore: 99,
    verifiedSource: 'Sở VHTTDL Sóc Trăng & Hội đồng Sư sãi chùa Khmer',
    daysLeft: 295,
    attendeesCount: '300,000+ đồng bào & du khách',
    tags: ['Ghe Ngo', 'Ok Om Bok', 'Khmer', 'Sóc Trăng', 'Sông Maspéro']
  },
  {
    id: 'dentran',
    code: 'VH-ND-08',
    name: 'Lễ Khai Ấn Đền Trần Nam Định',
    slug: 'le-khai-an-den-tran',
    region: 'Bắc',
    regionKey: 'bac',
    province: 'Nam Định',
    district: 'TP. Nam Định',
    location: 'Khu Di tích Đền Trần, Phường Lộc Vượng, TP. Nam Định',
    lunarDate: '14 – 15 Tháng Giêng ÂL',
    lunarMonth: 1,
    lunarDay: 15,
    solarDate2025: '11 – 12/02/2025',
    heritageRank: 'QUOC_GIA',
    heritageRankLabel: 'Di Tích Quốc Gia Đặc Biệt',
    category: 'national',
    categoryLabel: 'Lễ Hội Vương Triều',
    shortDesc: 'Nghi thức phát lộc ấn thiêng liêng lúc nửa đêm rằm tháng Giêng, tôn vinh Hào khí Đông A ba lần đại thắng giặc Nguyên Mông thời Trần.',
    fullDesc: 'Lễ Khai ấn Đền Trần là một trong những sự kiện văn hóa đầu xuân thu hút đông đảo bách gia trăm họ nhất miền Bắc. Nghi lễ tái hiện phong tục phát ấn ban lộc và khuyến khích muôn dân tu dưỡng đạo đức, phụng sự quốc gia.',
    history: 'Khởi nguồn từ lệ cũ vua quan nhà Trần mở hòm ấn làm việc sau kỳ nghỉ Tết Nguyên Đán tại phủ Thiên Trường cổ kính.',
    lunarMeaning: 'Đêm 14 rạng sáng rằm tháng Giêng trăng tròn rực rỡ, đón khí thiêng đất trời khởi đầu cho một năm hanh thông thuận lợi.',
    rituals: [
      'Lễ rước kiệu ngọc bích từ đền Cố Trạch sang đền Thiên Trường',
      'Đại lễ dâng hương tế tự 14 vị vua Trần lúc giờ Tý đêm 14',
      'Nghi thức đóng dấu ấn và phát ấn lộc cho nhân dân sáng ngày rằm'
    ],
    games: [
      'Múa rồng Hào khí Đông A',
      'Đấu cờ người, múa kiếm cung đình',
      'Diễn xướng chèo cổ tích Trần Hưng Đạo'
    ],
    tips: {
      behavior: [
        'Xếp hàng văn minh nhận lộc ấn, không chen lấn xô đẩy',
        'Tôn kính gìn giữ lá ấn tại ban thờ gia tiên'
      ],
      food: [
        'Phở bò Nam Định nước dùng thơm ngọt gia truyền',
        'Bánh gai bà Thi dẻo quánh đậu xanh sen dừa',
        'Kẹo sìu châu giòn tan bùi bùi lạc vừng'
      ]
    },
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLoaRRnIsdjumGaVI3nzDebTspJzrTC_pLA-Tz2pUGgG2caRTek7IG-AkKbWBqU7O4Dcygh_zoyEQ1bImXcso2xFeFJL0NGEuUo3KnBTzqC6sD48dytWnIdJCtTayCTko0NM_Fy0p7E-xDCpS7hm13ANp_AxOvVNGOH2IZ5EX6I4DtS4rbU5DcARqhP4K56GnYIxwkjHctSMTKmN2RAQU8qtjkhyBq4kdILLGwl7o',
    coordinates: { x: 330, y: 175, lat: 20.4355, lng: 106.1683 },
    featured: true,
    status: 'PUBLISHED',
    confidenceScore: 98,
    verifiedSource: 'UBND TP. Nam Định & Ban Quản Lý Đền Trần',
    daysLeft: 29,
    attendeesCount: '70,000+ du khách',
    tags: ['Đền Trần', 'Khai ấn', 'Nam Định', 'Nhà Trần', 'Đông A']
  }
];

export const CULTURAL_ARTICLES: CulturalArticle[] = [
  {
    id: 'art-001',
    title: 'Triết Lý Thiên - Địa - Nhân Trong Việc Chọn Ngày Tổ Chức Lễ Hội Theo Chu Kỳ Âm Lịch',
    slug: 'triet-ly-am-duong-chon-ngay-le-hoi',
    category: 'Lịch Âm & Tiết Khí',
    categoryKey: 'lich-tiet-khi',
    readTime: '18 phút đọc',
    updateDate: '12/01/2025',
    author: 'GS. Trần Quốc Vượng (Di cảo)',
    authorTitle: 'Viện Khảo cổ & Văn hóa Dân gian',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvLM-so6TNNN7fonXFqNiTnh67GBPp9mPVx3c_u54Jm2pDvZHBWSOrNTPGy-lKyxdXUjgEjVauc2wIBGUjEo05oQlrJnd7cADHauN4_Dx3oSkCNExGGw0XxLVR2LNePL4MP4KRRs9ZvoiPuIaLFvPQ-_mFWK6rc4gCO92Y8-XyWDgozXPPOYEwL96vG8SWuMkT8H44A6OazaO7S-JAJhZ7mxljNCf3Wt3oMbPEi4A',
    summary: 'Tại sao người Việt cổ luôn chọn mùng Mười tháng Ba làm ngày giỗ Tổ, hay khai hội đền Trần vào giờ Tý đêm rằm tháng Giêng? Khám phá cấu trúc thiên văn cổ đại, tương quan tuần trăng và sự điều tiết nhịp sinh học nông nghiệp lúa nước.',
    content: `Trong nền văn minh nông nghiệp lúa nước Đông Nam Á, chu kỳ mặt trăng (Âm lịch) không chỉ là một công cụ đo đếm thời gian thuần túy mà là một nhịp thở sinh học chi phối mọi sinh hoạt từ gieo cấy đến lễ tục...`,
    views: 14820,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk5JU8v_dzcEHZvdUQfhkx_FByi9A2Lb8PSVPiy4abkuCxVkBNuIkqy2dCI9l_3wBrjqYAE1NxeqXXpWVnomGvrjAf-n4QPws5Bub7ChnF6cMvAr9_OUW8VyK0hs8f1ysOpJVk-7A0w_-VarWm510vG5o7gw9PishLzKDMJX0RHi_gqgQlzMf5h2SSWDxIRFVRUqBEcY2qfuL0dveS-izRRAM9cDj74-D68WKPyzE',
    featured: true
  },
  {
    id: 'art-002',
    title: 'Tín Ngưỡng Thờ Mẫu Tam Phủ: Biểu Tượng Của Đạo Hiếu & Lòng Tôn Kính Đất Trời',
    slug: 'tin-nguong-tho-mau-tam-phu',
    category: 'Phong Tục & Tín Ngưỡng',
    categoryKey: 'tin-nguong',
    readTime: '12 phút đọc',
    updateDate: '08/01/2025',
    author: 'TS. Nguyễn Thị Bích Nga',
    authorTitle: 'Học viện Âm nhạc Quốc gia',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzLb3sveg2JmAin4-NJQQwjfrp-3BMJvPeefLe5_DFpV9VSW1ckswTJ8MJNgROCJ9VuqK22uSy6poFzzBIUQCy-leWYzLOUxFve4VPYVSi4bb8YF2XfwC5hQ3tLWBqKNouQzRXvwjJjbli12bb43m-uxVxrfLq53_GaNy8Obog6bRWQUey9C6WESpB8buAcR4izh31hyIO_D3N8JS0Mweawxp7M_CV1C0EKbVBC5w',
    summary: 'Giải mã giá trị nhân văn của hệ thống Tứ Phủ vạn linh, quan niệm Mẹ Đất - Mẹ Nước - Mẹ Trời và nghi lễ Hầu đồng được UNESCO công nhận là di sản văn hóa phi vật thể.',
    content: `Tín ngưỡng Thờ Mẫu là một tín ngưỡng bản địa thuần khiết của người Việt, xuất phát từ lòng tôn kính người Mẹ thiên nhiên che chở cho sự sống muôn loài...`,
    views: 8450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBY23wfFRt3K_E1HLDyzWHySBo1-KZS1wKa_FTJUleE3xhQT_TbPfWyjaNvV2FN77A7SP69uZxUdKYqgsw75vI8g3JBN2ixWSM9L0e9DUqupP6PPyTS-GReOmNYBdOt_voCQejSF8q28uRDfkqUeF-pdQZ6YPzU_YvMTRRVsn5oBDzHhF87dCBarl5FkgU_tu8xaPR3yym5TTCfMeIEEiUiB-KhMij-0Zt3KefvrLg'
  },
  {
    id: 'art-003',
    title: 'Ý Nghĩa 24 Tiết Khí: Nhịp Thở Của Đất Trời Vận Vào Mùa Lễ Hội Quê Hương',
    slug: 'y-nghia-24-tiet-khi-va-mua-le-hoi',
    category: 'Lịch Âm & Tiết Khí',
    categoryKey: 'lich-tiet-khi',
    readTime: '15 phút đọc',
    updateDate: '05/01/2025',
    author: 'Bùi Trung Nam (SV Khảo cứu)',
    authorTitle: 'Đề tài D01 - PH60600',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBH3pDCKqpWeAIhb5468TjwFofq-rUUBjDVwfitp8r4ebYkEfPbDzd-nUpNVCo11XuEMzAnFtUN-vM4gtm2Xsny-57swaEYD-xJ1YuEraRYpgju9lvtoEe8Bj9n5eTZa0f2nrWfbJvvFvQ6qfIK07jsivlZZdqnBQEoVh9vfX_ImQeRZa4-Ty7HC7qr_VtXbW-iNzqkjhiUPYOSD0BvG_2hAiD8JcRqJy11Zn3ccB4',
    summary: 'Từ Tiết Lập Xuân, Vũ Thủy đến Thanh Minh, Bạch Lộ: Cách ông cha ta điều phối lịch sản xuất nông nghiệp và xếp đặt các kỳ đại hội làng ăn khớp với thiên nhiên.',
    content: `24 tiết khí trong lịch vạn niên phản ánh chính xác vị trí biểu kiến của Mặt Trời trên hoàng đạo qua các góc 15 độ, tạo nên những nhịp biến đổi vi diệu về nhiệt độ, lượng mưa và cây cỏ...`,
    views: 11200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4ho5xvKpfhoegvtk98faJbZ3vRGodarBM3AMOpT-iHVsNoMO9FdlP1KbkBn0YCP1dnM2FZQHW5jmxBJbc4uqFpdaVYeGUn4H8vOnnL-Z_3bDKKiGXllUKs9HURGzOIlwTxjBH5reyYAzJ3O4ChAl7XpStmwXcxv9c5E1E72XkBk9EeGXntaR7dwhSKArwdI-3ot5--ZXd2MTiVHKH8pofka90KKXxniyRtRit8zU'
  },
  {
    id: 'art-004',
    title: 'Nghi Lễ Kéo Co Ngồi Đền Trấn Vũ: Sức Mạnh Gắn Kết Cộng Đồng Cầu Mùa',
    slug: 'nghi-le-keo-co-ngoi-den-tran-vu',
    category: 'Trò Chơi Dân Gian',
    categoryKey: 'tro-choi',
    readTime: '9 phút đọc',
    updateDate: '02/01/2025',
    author: 'TS. Đặng Văn Bài',
    authorTitle: 'Hội đồng Di sản Văn hóa Quốc gia',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvLM-so6TNNN7fonXFqNiTnh67GBPp9mPVx3c_u54Jm2pDvZHBWSOrNTPGy-lKyxdXUjgEjVauc2wIBGUjEo05oQlrJnd7cADHauN4_Dx3oSkCNExGGw0XxLVR2LNePL4MP4KRRs9ZvoiPuIaLFvPQ-_mFWK6rc4gCO92Y8-XyWDgozXPPOYEwL96vG8SWuMkT8H44A6OazaO7S-JAJhZ7mxljNCf3Wt3oMbPEi4A',
    summary: 'Không đơn thuần là trò chơi sức mạnh, tục kéo co ngồi tại Ngọc Trì (Long Biên) là nghi thức tâm linh phỏng sinh học cầu mưa thuận gió hòa, bảo tồn nguyên vẹn quy tắc truyền thừa.',
    content: `Nghi lễ kéo co ngồi đã được UNESCO ghi danh là Di sản phi vật thể đa quốc gia năm 2015 cùng với Hàn Quốc, Campuchia và Philippines...`,
    views: 6910,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvjhXpCDyaCUXAge0zl30XLBPkFp4M-ZHnXua9Edr7-xoM2EChd4ClpC_peR5eGbfsYyeBjwiLo0zA-Sii0HnLr4ctITBsOE7_58VjoLvO4o0Io1dapGpZ_rk8vQqkRzxR2Rf41ef1-9OMtTt7EwEkgfg0ehxGvuxCLjZbs6pwtDi_WAxpiCSuLz48gPZQcobX-cRDANq0j0Gg1NOanOqw8U1uOd5ZTVyC_eL_lFc'
  },
  {
    id: 'art-005',
    title: 'Hát Xoan Đất Tổ: Điệu Ca Cửa Đình Thờ Vua Hùng & Lời Chúc Năm Mới An Khang',
    slug: 'hat-xoan-dat-to-phu-tho',
    category: 'Âm Nhạc & Dân Ca Di Sản',
    categoryKey: 'dan-ca',
    readTime: '11 phút đọc',
    updateDate: '28/12/2024',
    author: 'Trùm Phường Xoan An Thái',
    authorTitle: 'Nghệ nhân Dân gian Phú Thọ',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzLb3sveg2JmAin4-NJQQwjfrp-3BMJvPeefLe5_DFpV9VSW1ckswTJ8MJNgROCJ9VuqK22uSy6poFzzBIUQCy-leWYzLOUxFve4VPYVSi4bb8YF2XfwC5hQ3tLWBqKNouQzRXvwjJjbli12bb43m-uxVxrfLq53_GaNy8Obog6bRWQUey9C6WESpB8buAcR4izh31hyIO_D3N8JS0Mweawxp7M_CV1C0EKbVBC5w',
    summary: 'Cấu trúc ba chặng hát độc đáo gồm hát Thờ, hát Quả cách và hát Hội giao duyên, minh chứng cho bề dày nghệ thuật diễn xướng dân gian có từ thời dựng nước Văn Lang.',
    content: `Hát Xoan là khúc hát cửa đình gắn liền với các kỳ giỗ Tết mùa xuân trên vùng đất cội nguồn Phong Châu cổ đại...`,
    views: 9330,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCR86iaoR6qapAPjVJno8CP9NFH7soO8UCa8bMrvOdhu-b9sq9SvoKbivUfDj9J3oFpvIfLIRfbUvuab08qs4CQdLjm4A85x5GAnF8J3XaT1uYhlImWU3pBe3luVMZMmHG6SvmbudpAYSD26GK8VuFKXw-ZeIIeXGt4HYpbbKbhbfI_gL1Ip9pDsZvUYD-hPkVhOqJ4sqSLjIDbh8Ej45twC1DoGZDyW4yDQlk10Zs'
  },
  {
    id: 'art-006',
    title: 'Bánh Chưng - Bánh Giầy: Triết Lý Tròn Vuông & Đạo Ơn Nghĩa Sinh Thành',
    slug: 'triet-ly-banh-chung-banh-giay',
    category: 'Ẩm Thực Lễ Hội',
    categoryKey: 'am-thuc',
    readTime: '10 phút đọc',
    updateDate: '25/12/2024',
    author: 'Chuyên gia Ẩm thực Ánh Tuyết',
    authorTitle: 'Nghệ nhân Dân gian Hà Nội',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvLM-so6TNNN7fonXFqNiTnh67GBPp9mPVx3c_u54Jm2pDvZHBWSOrNTPGy-lKyxdXUjgEjVauc2wIBGUjEo05oQlrJnd7cADHauN4_Dx3oSkCNExGGw0XxLVR2LNePL4MP4KRRs9ZvoiPuIaLFvPQ-_mFWK6rc4gCO92Y8-XyWDgozXPPOYEwL96vG8SWuMkT8H44A6OazaO7S-JAJhZ7mxljNCf3Wt3oMbPEi4A',
    summary: 'Từ truyền thuyết Lang Liêu đến mâm cỗ cúng Tiên vương: Sự cô đọng tinh hoa của hạt gạo ngọc thực cùng quan niệm vũ trụ quan Trời tròn Đất vuông của cư dân Đông Sơn.',
    content: `Trong tất cả các thứ lễ vật dâng cúng tổ tiên ngày Tết và lễ hội Đền Hùng, bánh chưng bánh giầy giữ vị trí trung tâm thiêng liêng nhất...`,
    views: 13400,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-EFF9fQJF8XGc-31E6RnHRUVkpoLAHRm4psLeeaRKBmagGvHJfd85YWg-LoZBuy4kr-9x1qVDDgBPkK53vVoPyjAfMxJFVtmGttqitqCagrZ4z-K3ufA3r0rx43Zm1K96VhQDCKqrxjSHT-N6c0qSQVxDOLZPhc-eLFEn6K8M9SraX7l5gKu-C1cA2Zmoj1NRaJ0oYebaaxB1HxEPkHB4xkW7LdIyUCQQrv9Jgk0'
  }
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'term-001',
    term: 'Tế Lễ',
    hanNom: '祭禮',
    category: 'Nghi thức tế tự',
    definition: 'Hành thức dâng lễ vật trang trọng lên các vị thần linh, Thành hoàng làng hoặc tiền nhân. Ban tế gồm Chủ tế, Bồi tế, Đông xướng, Tây xướng và chấp sự với các tuần rượu, tuần trà theo nhịp xướng ca.',
    alphabet: 'T'
  },
  {
    id: 'term-002',
    term: 'Rước Kiệu',
    hanNom: '舁轎',
    category: 'Đoàn rước lễ hội',
    definition: 'Lễ nghinh thỉnh linh vị, bát hương hoặc tượng Thần đi tuần du làng xóm hoặc rước nước (Thủy thần) từ sông về đền. Thường gồm kiệu Bát cống, kiệu Long đình được khiêng bởi trai thanh gái lịch đồng trinh.',
    alphabet: 'R'
  },
  {
    id: 'term-003',
    term: 'Khai Quang Điểm Nhãn',
    hanNom: '開光點眼',
    category: 'Mật nghi pháp thuật',
    definition: 'Nghi thức tẩy trần và "mở mắt" cho pháp khí, long vị, tượng thần hoặc lân sư rồng mới trước lễ khai hội, truyền linh khí thiêng liêng để chứng giám lòng thành của bách gia trăm họ.',
    alphabet: 'K'
  },
  {
    id: 'term-004',
    term: 'Hoàng Đạo & Hắc Đạo',
    hanNom: '黃道 黑道',
    category: 'Lịch số thiên văn',
    definition: 'Hệ quy chiếu giờ/ngày lành dữ theo chuyển dịch nhật tinh thiên văn. Giờ Hoàng đạo (Thanh Long, Minh Đường, Kim Quỹ...) được chọn để khai trống, rước kiệu nhằm hấp thu vượng khí cát tường.',
    alphabet: 'H'
  },
  {
    id: 'term-005',
    term: 'Tuần Chay & Giữ Tịnh',
    hanNom: '齋戒',
    category: 'Tập tục chay giới',
    definition: 'Khoảng thời gian thanh tịnh tâm - thân trước khi bước vào đại hội làng. Các thành viên ban tế phải ăn chay, tắm nước lá bưởi, không vướng bận việc trần tục để giữ thân thể thanh sạch tuyệt đối phụng thần.',
    alphabet: 'T'
  },
  {
    id: 'term-006',
    term: 'Sắc Phong',
    hanNom: '敕封',
    category: 'Văn kiện triều đình',
    definition: 'Văn bản viết bằng chữ Hán trên giấy gió dát vàng in rồng do các triều đại phong kiến ban tặng cho Thành hoàng làng, công nhận vị thế thần bảo hộ tối cao của cộng đồng cư dân làng xã.',
    alphabet: 'S'
  }
];

export const FOLK_GAMES: FolkGame[] = [
  {
    id: 'game-1',
    name: 'Đấu Vật Dân Tộc',
    location: 'Hội Liễu Đôi (Hà Nam), Hội Lim (Bắc Ninh)',
    description: 'Trò diễn thượng võ cổ truyền rèn luyện sức bền và lòng dũng cảm của các tráng đinh.',
    technique: 'Miếng gồng, miếng quăng, vồ đùi, mó hầu, đòn bốc giò hiểm hóc.',
    rules: 'Luật "Lấm lưng trắng bụng" hoặc "Ngửa bưng nhấc bổng". Đô vật phải thực hiện nghi thức "Xe đài" bái thần linh trước khi thi đấu.'
  },
  {
    id: 'game-2',
    name: 'Cờ Người (Nhân Kỳ)',
    location: 'Hội Đền Vua Mai, Hội làng Triều Khúc',
    description: 'Bàn cờ sân đình rộng 32 quân là nam thanh nữ tú mang áo mã trang nghiêm.',
    technique: 'Thế cờ trận đồ binh thư thời phong kiến, đi kèm trống lệnh vang rền.',
    rules: 'Mỗi nước đi có võ sinh biểu diễn thế múa gươm hoặc múa quyền tương ứng.'
  },
  {
    id: 'game-3',
    name: 'Ném Còn Lồng Vòng',
    location: 'Đồng bào Thái, Tày, Mường vùng Tây Bắc',
    description: 'Cột còn cao 15-20m treo vòng tròn dán giấy hồng tâm đón quả còn ngũ sắc.',
    technique: 'Dùng lực cổ tay vung dây còn xoay tròn trước khi phóng thẳng qua tâm vòng tre.',
    rules: 'Ai ném thủng giấy hồng tâm là người đem lại may mắn cho cả bản làng trong năm mới.'
  },
  {
    id: 'game-4',
    name: 'Bắt Vịt Nước Ao Đình',
    location: 'Hội làng Bắc Bộ mùa xuân',
    description: 'Thanh niên lặn ngụp dưới làn nước trong mát quanh cầu ao đình để bắt chú vịt bơi nhanh.',
    technique: 'Khả năng bơi lặn nhanh nhẹn, đoán hướng vịt lặn và phối hợp vây bắt.',
    rules: 'Không làm tổn hại chú vịt, bắt được bằng hai tay đưa lên bờ nhận tràng pháo tay cổ vũ.'
  }
];

export const SYSTEM_LOGS: SystemLog[] = [
  {
    id: 'log-001',
    title: 'Cập nhật tiết khí Lập Xuân Ất Tỵ 2025',
    timestamp: 'Hôm nay 08:30 • Nam.BT',
    author: 'Bùi Trung Nam (PH60600)',
    content: 'Xác lập điểm Mặt Trời kinh độ 315° vào ngày 03/02/2025 (mùng 6 tháng Giêng). Khớp nối lịch hội Chùa Hương và Hội Lim.',
    type: 'ASTRONOMICAL'
  },
  {
    id: 'log-002',
    title: 'Đối soát tháng Nhuận năm Bính Ngọ (2026)',
    timestamp: '14/01/2025 • Tự động',
    author: 'Hệ thống Lễ Hội Việt',
    content: 'Xác định tháng 5 Nhuận (Tháng ngũ nguyệt). Đã bù trừ 29 ngày cho lịch lễ hội Trung Bộ và Tây Nguyên.',
    type: 'ASTRONOMICAL'
  },
  {
    id: 'log-003',
    title: 'Khử nhiễu tọa độ mốc di tích GIS (63 tỉnh)',
    timestamp: '10/01/2025 • Nam.BT',
    author: 'Bùi Trung Nam (PH60600)',
    content: 'Chuẩn hóa vĩ độ/kinh độ theo hệ tọa độ WGS-84 với bán kính sai số dưới 15 mét tại 128 điểm đền thờ trung tâm.',
    type: 'GIS'
  }
];

export const COMMUNITY_SUBMISSIONS: CommunitySubmission[] = [
  {
    id: 'sub-001',
    festivalName: 'Hội Vật Làng Triều Khúc',
    location: 'Tân Triều, Thanh Trì, Hà Nội',
    lunarTime: '10 - 12 tháng Giêng ÂL',
    category: 'Dân Gian',
    excerpt: 'Đã đính kèm ảnh chụp bản dịch thần phả Bố Cái Đại Vương Phùng Hưng và nghi thức điệu múa Bồng "con đĩ đánh bồng" cổ truyền...',
    status: 'PENDING'
  },
  {
    id: 'sub-002',
    festivalName: 'Lễ Cấp Sắc Người Dao Đỏ',
    location: 'Tả Phìn, Sa Pa, Lào Cai',
    lunarTime: 'Tháng Chạp hàng năm',
    category: 'Sắc Tộc',
    excerpt: 'Tài liệu ghi âm bài khấn và hình ảnh nghi thức đặt tên ba đèn của nghệ nhân dân gian dân tộc Dao Đỏ...',
    status: 'PENDING'
  },
  {
    id: 'sub-003',
    festivalName: 'Lễ Đua Thuyền Ngo Trăng Rằm',
    location: 'Sóc Trăng (Sông Maspéro)',
    lunarTime: 'Rằm Tháng 10 ÂL (Ok Om Bok)',
    category: 'Khmer Nam Bộ',
    excerpt: 'Bổ sung lộ trình thi đấu trên sông Maspéro và tọa độ khán đài chính cùng danh sách 45 chùa Phật giáo Nam tông tham dự...',
    status: 'PENDING'
  }
];

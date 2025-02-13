var $ = document.querySelector.bind(document)
var $$ = document.querySelectorAll.bind(document)

const PLAYER_STORAGE_KEY = 'Tien Anh'

const heading = $('.header-nowPlaying p')
const picture = $('.main-img img')
const audio = $('#audio')
const cd = $('.main-img img')
const timeSong = $('.main-time')
const rangeLine = $('.main-range')
const playList = $('.list-ul')

var btnPause = $('.main-control-pause')
var btnPlay = $('.main-control-play')
var btnNext = $('.main-control-next')
var btnBack = $('.main-control-back')
var btnRandom = $('.main-control-random')
var btnRepeat = $('.main-control-repeat')


const app = {
    currentIndex: 0,
    _this: this,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
    songs: [
        {
            "name": "1. 21 Savage - a lot (Official Video) ft. J. Cole",
            "singer": "",
            "path": "./assets/music/21 Savage - a lot (Official Video) ft. J. Cole.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "2. 24K.RIGHT - KHÓA CHÂN [Feat. MASON NGUYỄN, NAM COCAIN, TUANN] (Official Visualizer)",
            "singer": "",
            "path": "./assets/music/24K.RIGHT - KHÓA CHÂN [Feat. MASON NGUYỄN, NAM COCAIN, TUANN] (Official Visualizer).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "3. 24K.RIGHT - VẪN [feat. HUỲNH TÚ, HIPZ] - OFFICIAL MUSIC VIDEO",
            "singer": "",
            "path": "./assets/music/24K.RIGHT - VẪN [feat. HUỲNH TÚ, HIPZ] - OFFICIAL MUSIC VIDEO.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "4. 5BER1 - MỘT KIẾP BÔN BA Vol. 1 (Full)",
            "singer": "",
            "path": "./assets/music/5BER1 - MỘT KIẾP BÔN BA Vol. 1 (Full).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "5. 6262 (prod. Maiki) - Low G - Nhà Hoá Học Đống Đa",
            "singer": "",
            "path": "./assets/music/6262 (prod. Maiki) - Low G - Nhà Hoá Học Đống Đa.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "6. Andree Right Hand - Chơi Như Tụi Mỹ - Official MV",
            "singer": "",
            "path": "./assets/music/Andree Right Hand - Chơi Như Tụi Mỹ - Official MV.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "7. B-Wine - DATLE (Visualizer)",
            "singer": "",
            "path": "./assets/music/B-Wine - DATLE (Visualizer).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "8. Bad Habits",
            "singer": "",
            "path": "./assets/music/Bad_Habits.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "9. BIGDADDY ft. GREY D - MƯA THÂM LẶNG GIỜI - OFFICIAL MUSIC VIDEO",
            "singer": "",
            "path": "./assets/music/BIGDADDY ft. GREY D - MƯA THÂM LẶNG GIỜI - OFFICIAL MUSIC VIDEO.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "10. binh yên - Vu. ft. Binz (Official MV) tư Album -Bao Tang Cua Nuôi Tiêc-",
            "singer": "",
            "path": "./assets/music/binh yên - Vu. ft. Binz (Official MV) tư Album -Bao Tang Cua Nuôi Tiêc-.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "11. Breakfast - DH, 151 GDucky, Minh (Official Lyrics Video)",
            "singer": "",
            "path": "./assets/music/Breakfast - DH, 151 GDucky, Minh (Official Lyrics Video).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "12. BUỒN HAY VUI - VSOUL x MCK x Obito x Ronboogz x Boyzed (Official Audio)",
            "singer": "",
            "path": "./assets/music/BUỒN HAY VUI - VSOUL x MCK x Obito x Ronboogz x Boyzed (Official Audio).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "13. BÌNH GOLD - BCDBL - OFFICIAL MUSIC VIDEO",
            "singer": "",
            "path": "./assets/music/BÌNH GOLD - BCDBL - OFFICIAL MUSIC VIDEO.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "14. BÌNH GOLD - LÁI MÁY BAY - Official Lyrics Video",
            "singer": "",
            "path": "./assets/music/BÌNH GOLD - LÁI MÁY BAY - Official Lyrics Video.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "15. Chìm Sâu - RPT MCK (feat. Trung Trần) - Official Lyrics Video",
            "singer": "",
            "path": "./assets/music/Chìm Sâu - RPT MCK (feat. Trung Trần) - Official Lyrics Video.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "16. Dua com cho me di cay",
            "singer": "",
            "path": "./assets/music/Dua com cho me di cay.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "17. Eminem - Rap God (Explicit)",
            "singer": "",
            "path": "./assets/music/Eminem - Rap God (Explicit).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "18. Eminem - Without Me (Official Music Video)",
            "singer": "",
            "path": "./assets/music/Eminem - Without Me (Official Music Video).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "19. Hai Thằng Bịp",
            "singer": "",
            "path": "./assets/music/Hai Thằng Bịp.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "20. HappyForYou",
            "singer": "",
            "path": "./assets/music/HappyForYou.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "21. HOP ON DA SHOW - Low G x tlinh x Last Fire Crew - OFFICIAL MUSIC VIDEO",
            "singer": "",
            "path": "./assets/music/HOP ON DA SHOW - Low G x tlinh x Last Fire Crew - OFFICIAL MUSIC VIDEO.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "22. HƠI ẢO #11 - Lucin3x",
            "singer": "",
            "path": "./assets/music/HƠI ẢO #11 - Lucin3x.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "23. HƠI ẢO #7 - Lucin3x",
            "singer": "",
            "path": "./assets/music/HƠI ẢO #7 - Lucin3x.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "24. Kendrick Lamar - Not Like Us",
            "singer": "",
            "path": "./assets/music/Kendrick Lamar - Not Like Us.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "25. LetMeDownSlowly",
            "singer": "",
            "path": "./assets/music/LetMeDownSlowly.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "26. Lil Nas X - Old Town Road (Official Video) ft. Billy Ray Cyrus",
            "singer": "",
            "path": "./assets/music/Lil Nas X - Old Town Road (Official Video) ft. Billy Ray Cyrus.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "27. MONO - 'Chăm Hoa' (Official Music Video)",
            "singer": "",
            "path": "./assets/music/MONO - 'Chăm Hoa' (Official Music Video).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "28. N HAY L - MILLY (Official Music Video)",
            "singer": "",
            "path": "./assets/music/N HAY L - MILLY (Official Music Video).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "29. NAMCOCAIN aka NamLee - TRUY LÙNG [ vy gieo đấy ]",
            "singer": "",
            "path": "./assets/music/NAMCOCAIN aka NamLee - TRUY LÙNG [ vy gieo đấy ].mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "30. Roddy Ricch - The Box [Official Music Video]",
            "singer": "",
            "path": "./assets/music/Roddy Ricch - The Box [Official Music Video].mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "31. SƠN TÙNG M-TP - CHÚNG TA CỦA TƯƠNG LAI - OFFICIAL MUSIC VIDEO",
            "singer": "",
            "path": "./assets/music/SƠN TÙNG M-TP - CHÚNG TA CỦA TƯƠNG LAI - OFFICIAL MUSIC VIDEO.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "32. Tage - Lớp 13 (Official Lyric Video)",
            "singer": "",
            "path": "./assets/music/Tage - Lớp 13 (Official Lyric Video).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "33. TOULIVER X BINZ - THEY SAID [ OFFICIAL MV ]",
            "singer": "",
            "path": "./assets/music/TOULIVER X BINZ - THEY SAID [ OFFICIAL MV ].mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "34. TOULIVER x BINZ x ANDREE RIGHT HAND - KRAZY ( Ft. EVY ) [ OFFICIAL MV ]",
            "singer": "",
            "path": "./assets/music/TOULIVER x BINZ x ANDREE RIGHT HAND - KRAZY ( Ft. EVY ) [ OFFICIAL MV ].mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "35. Travis Scott - goosebumps ft. Kendrick Lamar",
            "singer": "",
            "path": "./assets/music/Travis Scott - goosebumps ft. Kendrick Lamar.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "36. Trung Trần - Sao Soi Đường Đêm ft. Jimmi Ngủyên - Official Visualizer",
            "singer": "",
            "path": "./assets/music/Trung Trần - Sao Soi Đường Đêm ft. Jimmi Ngủyên - Official Visualizer.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "37. Táo - Tương Tư (Official MV)",
            "singer": "",
            "path": "./assets/music/Táo - Tương Tư (Official MV).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "38. VỤ NỔ LỚN - KHÔNG QUAN TRỌNG",
            "singer": "",
            "path": "./assets/music/VỤ NỔ LỚN - KHÔNG QUAN TRỌNG.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "39. Wxrdie - NHẠC TRAP CĂNG NHẤT 2023 (ft. 24k.Right & JasonDilla) - OFFICIAL MUSIC VIDEO",
            "singer": "",
            "path": "./assets/music/Wxrdie - NHẠC TRAP CĂNG NHẤT 2023 (ft. 24k.Right & JasonDilla) - OFFICIAL MUSIC VIDEO.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "40. Wxrdie - TETVOVEN (ft. @AndreeRightHand87 & @MachiotOfficial) - OFFICIAL MUSIC VIDEO",
            "singer": "",
            "path": "./assets/music/Wxrdie - TETVOVEN (ft. @AndreeRightHand87 & @MachiotOfficial) - OFFICIAL MUSIC VIDEO.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "41. Wxrdie, @GillOfficial & @Lucin3x - CHÊ HỘ - OFFICIAL MV",
            "singer": "",
            "path": "./assets/music/Wxrdie, @GillOfficial & @Lucin3x - CHÊ HỘ - OFFICIAL MV.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "42. Xích Thêm Chút - XTC Remix - RPT Groovie ft TLinh x RPT MCK (Prod. by fat benn & RPT LT)- RAPITALOVE",
            "singer": "",
            "path": "./assets/music/Xích Thêm Chút - XTC Remix - RPT Groovie ft TLinh x RPT MCK (Prod. by fat_benn & RPT LT)- RAPITALOVE.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "43. [BASS6 x 95G] - PHI HÀNH GIA - RENJA x SLOW T x LIL WUYN x KAIN x SUGAR CANE (Prod. THINHHO)",
            "singer": "",
            "path": "./assets/music/[BASS6 x 95G] - PHI HÀNH GIA - RENJA x SLOW T x LIL WUYN x KAIN x SUGAR CANE (Prod. THINHHO).mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "44. Điêu Toa - Masew x Pháo",
            "singer": "",
            "path": "./assets/music/Điêu Toa - Masew x Pháo.mp3",
            "image": "./assets/image/df.png"
        },
        {
            "name": "45. ĐỔI TƯ THẾ - BÌNH GOLD x ANDREE RIGHT HAND - OFFICIAL MUSIC VIDEO",
            "singer": "",
            "path": "./assets/music/ĐỔI TƯ THẾ - BÌNH GOLD x ANDREE RIGHT HAND - OFFICIAL MUSIC VIDEO.mp3",
            "image": "./assets/image/df.png"
        }
    ],
    setConfig: function (key, value) {
        this.config[key] = value
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    renderList: function () {
        const htmls = this.songs.map((song, i) => {
            return `
            <li class="list-li ${i === this.currentIndex ? 'active-song' : ''}" data-index="${i}">
                <img src="${song.image}" alt="" class="list-li-img">
                <div class="list-li-content">
                    <div class="list-li-name">${song.name}</div>
                    <div class="list-li-single">${song.singer}</div>
                </div>
                <div class="list-li-more">
                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                </div>
            </li>
            `
        })
        playList.innerHTML = htmls.join('')
    },
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function () {

        const cdWidth = cd.offsetWidth;
        const cdHeight = cd.offsetHeight;


        // next bai , back bai 
        btnNext.onclick = function () {
            if (app.isRandom) {
                app.playRandom();
            } else {
                app.nextSong();
            }
            audio.play()
            app.renderList()
            app.scrollToActiveSong()
        }

        btnBack.onclick = function () {
            if (app.isRandom) {
                app.playRandom()
            } else {
                app.backSong()
            }
            audio.play()
            app.renderList()
            app.scrollToActiveSong()
        }

        // Xu ly quay cd 
        const cdRotateAnimate = cd.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdRotateAnimate.pause()


        // Xu ly play / pause
        btnPlay.onclick = function () {
            audio.play()
        }
        btnPause.onclick = function () {
            audio.pause()
        }

        // khi song duoc play
        audio.onplay = function () {
            btnPlay.style.display = 'none';
            btnPause.style.display = 'flex';
            cdRotateAnimate.play()
        }


        // khi song pause
        audio.onpause = function () {
            btnPause.style.display = 'none';
            btnPlay.style.display = 'flex';
            cdRotateAnimate.pause()
        }

        // khi tien do bai hat thay doi 
        audio.ontimeupdate = function () {
            rangeLine.value = Math.floor(this.currentTime / this.duration * 100);

            // Dem thoi gian 
            let currentTimeMinutes = Math.floor(this.currentTime / 60)
            let currentTimeSecond = Math.floor(this.currentTime % 60)

            let durationTimeMinutes = Math.floor(this.duration / 60)
            let durationTimeSecond = Math.floor(this.duration % 60)

            if (currentTimeMinutes < 10) {
                currentTimeMinutes = `0${currentTimeMinutes}`
            }
            if (currentTimeSecond < 10) {
                currentTimeSecond = `0${currentTimeSecond}`
            }

            if (durationTimeMinutes < 10) {
                durationTimeMinutes = `0${durationTimeMinutes}`
            }
            if (durationTimeSecond < 10) {
                durationTimeSecond = `0${durationTimeSecond}`
            }


            if (!durationTimeSecond) {
                timeSong.innerHTML = `${currentTimeMinutes}:${currentTimeSecond} / 00:00`
            } else {
                timeSong.innerHTML = `${currentTimeMinutes}:${currentTimeSecond} / ${durationTimeMinutes}:${durationTimeSecond}`
            }
        }

        // Xu ly random 
        btnRandom.onclick = function () {
            app.isRandom = !app.isRandom
            app.setConfig('isRandom', app.isRandom)
            if (!app.isRepeat) {
                btnRandom.classList.toggle('active', app.isRandom)
            } else {
                app.isRepeat = !app.isRepeat
                btnRepeat.classList.toggle('active', app.isRepeat)
                btnRandom.classList.toggle('active', app.isRandom)
            }
        }

        // Xu ly repeat
        btnRepeat.onclick = function () {
            app.isRepeat = !app.isRepeat
            app.setConfig('isRepeat', app.isRepeat)

            if (!app.isRandom) {
                btnRepeat.classList.toggle('active', app.isRepeat)
            } else {
                app.isRandom = !app.isRandom
                btnRandom.classList.toggle('active', app.isRandom)
                btnRepeat.classList.toggle('active', app.isRepeat)
            }
        }

        // xu ly tua 
        rangeLine.onchange = function (e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }



        // Xu ly phong to thu nho anh 
        document.onscroll = function () {
            $('.container').style.backgroundColor = 'black';
            $('.main-control').style.color = 'white';
            timeSong.style.color = 'white'
            const scrollTop = document.documentElement.scrollTop || window.scrollY;

            const newcdWidth = cdWidth - scrollTop;
            const newcdHeight = cdHeight - scrollTop;


            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0;
            cd.style.height = newcdHeight > 0 ? newcdHeight + 'px' : 0;
            cd.style.opacity = newcdWidth / cdWidth;


            if (scrollTop == 0) {
                $('.container').style.backgroundColor = '#00fffe33';
                $('.main-control').style.color = 'black';
                timeSong.style.color = 'black'
            }


        }

        // Xu ly kia audio ket thuc 
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play()
            } else {
                btnNext.click()
            }
        }


        // Xu ly phat bai hat khi bam vao bai hat trong list 
        playList.onclick = function (e) {
            const songNode = e.target.closest('.list-li:not(.active-song)')
            if (songNode || e.target.closest('.list-li-more')) {
                // Xu ly khi click vao bai hat 
                if (songNode) {
                    const dataIndex = Number(songNode.dataset.index)
                    app.currentIndex = dataIndex
                    app.loadCurrentSong()
                    audio.play()
                    app.renderList()
                }

                // Xu ly khi click vao option 
                if (e.target.closest('.list-li-more')) {

                }
            }
        }

    },

    loadCurrentSong: function () {

        heading.textContent = this.currentSong.name;
        picture.src = this.currentSong.image;
        audio.src = this.currentSong.path;

    },
    loadConfig: function () {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

        // Hien thi lai trang thai 
        if (!app.isRepeat) {
            btnRandom.classList.toggle('active', app.isRandom)
        } else {
            app.isRepeat = !app.isRepeat
            btnRepeat.classList.toggle('active', app.isRepeat)
            btnRandom.classList.toggle('active', app.isRandom)
        }
        if (!app.isRandom) {
            btnRepeat.classList.toggle('active', app.isRepeat)
        } else {
            app.isRandom = !app.isRandom
            btnRandom.classList.toggle('active', app.isRandom)
            btnRepeat.classList.toggle('active', app.isRepeat)
        }
    },
    scrollToActiveSong: function () {
        setTimeout(function () {
            $('.active-song').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300)
    },

    nextSong: function () {
        this.currentIndex++;
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },

    backSong: function () {
        this.currentIndex--;
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()

    },
    playRandom: function () {
        do {
            var newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex == this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    playRepeat: function () {

    },

    start: function () {

        // gan cau hinh vao ung dung 
        this.loadConfig()


        // dinh nghia cac thuoc tinh cho object
        this.defineProperties()


        // lang nghe/ xu ly cac xu kien
        this.handleEvent()


        // tai bai hat dau tien khi chay ung dung
        this.loadCurrentSong()



        // render playlist
        this.renderList()
    }
}

app.start()
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
    songs: [ {
        name: '1. Bad Habits',
        singer: 'Ed Sheeran',
        path: './assets/music/Bad_Habits.mp3',
        image: './assets/image/bad-habit.jpg'
    },
    {
        name: '2. Đưa cơm cho mẹ đi cầy',
        singer: 'Phương Mỹ Chi',
        path: './assets/music/Dua com cho me di cay.mp3',
        image: './assets/image/dua-com-cho-me-di-cay.jpg'
    },
    {
        name: '3. Happy For You',
        singer: 'Vũ & Lukas Graham',
        path: './assets/music/HappyForYou.mp3',
        image: './assets/image/happy-for-you.jpg'
    },
    {
        name: '4. Let Me Down Slowly',
        singer: 'Alec Benjamin',
        path: './assets/music/LetMeDownSlowly.mp3',
        image: './assets/image/let-me-down-slowly.jpg'
    },
    {
        name: '5. Happy For You',
        singer: 'Vũ & Lukas Graham',
        path: './assets/music/HappyForYou.mp3',
        image: './assets/image/happy-for-you.jpg'
    },
    {
        name: '6. Let Me Down Slowly',
        singer: 'Alec Benjamin',
        path: './assets/music/LetMeDownSlowly.mp3',
        image: './assets/image/let-me-down-slowly.jpg'
    },
    {
        name: '7. Happy For You',
        singer: 'Vũ & Lukas Graham',
        path: './assets/music/HappyForYou.mp3',
        image: './assets/image/happy-for-you.jpg'
    },
    {
        name: '8. Let Me Down Slowly',
        singer: 'Alec Benjamin',
        path: './assets/music/LetMeDownSlowly.mp3',
        image: './assets/image/let-me-down-slowly.jpg'
    },
    {
        name: '9. Happy For You',
        singer: 'Vũ & Lukas Graham',
        path: './assets/music/HappyForYou.mp3',
        image: './assets/image/happy-for-you.jpg'
    },
    {
        name: '10. Let Me Down Slowly',
        singer: 'Alec Benjamin',
        path: './assets/music/LetMeDownSlowly.mp3',
        image: './assets/image/let-me-down-slowly.jpg'
    }
    ],
    setConfig: function(key, value) {
        this.config[key] = value 
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },

    renderList: function() {
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
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex];
            }
        })
    },
    handleEvent: function() {
        
        const cdWidth = cd.offsetWidth;
        const cdHeight = cd.offsetHeight;

        
        // next bai , back bai 
        btnNext.onclick = function () {
            if(app.isRandom) {
                app.playRandom();
            } else {
                app.nextSong();
            }
            audio.play()
            app.renderList()
            app.scrollToActiveSong()
        }
        
        btnBack.onclick = function() {
            if(app.isRandom) {
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
            { transform: 'rotate(360deg)'}
        ], {
            duration: 10000,
            iterations: Infinity
        })
        cdRotateAnimate.pause()


        // Xu ly play / pause
        btnPlay.onclick = function() {
            audio.play()
        }
        btnPause.onclick = function() {
            audio.pause()
        }

        // khi song duoc play
        audio.onplay = function() {
            btnPlay.style.display = 'none';
            btnPause.style.display = 'flex';
            cdRotateAnimate.play()
        }


        // khi song pause
        audio.onpause = function() {
            btnPause.style.display = 'none';
            btnPlay.style.display = 'flex';
            cdRotateAnimate.pause()
        }

        // khi tien do bai hat thay doi 
        audio.ontimeupdate = function() {
            rangeLine.value = Math.floor(this.currentTime / this.duration * 100);
            
        // Dem thoi gian 
            let currentTimeMinutes = Math.floor(this.currentTime / 60)
            let currentTimeSecond = Math.floor(this.currentTime % 60)

            let durationTimeMinutes = Math.floor(this.duration / 60)
            let durationTimeSecond = Math.floor(this.duration % 60)
            
            if(currentTimeMinutes < 10) {
                currentTimeMinutes = `0${currentTimeMinutes}`
            }
            if(currentTimeSecond < 10) {
                currentTimeSecond = `0${currentTimeSecond}`
            }

            if(durationTimeMinutes < 10) {
                durationTimeMinutes = `0${durationTimeMinutes}`
            }
            if(durationTimeSecond < 10) {
                durationTimeSecond = `0${durationTimeSecond}`
            }


            if(!durationTimeSecond ) {
                timeSong.innerHTML = `${currentTimeMinutes}:${currentTimeSecond} / 00:00`
            } else {
                timeSong.innerHTML = `${currentTimeMinutes}:${currentTimeSecond} / ${durationTimeMinutes}:${durationTimeSecond}`
            }
        }

        // Xu ly random 
        btnRandom.onclick = function() {
            app.isRandom = !app.isRandom
            app.setConfig('isRandom', app.isRandom) 
            if(!app.isRepeat) {
                btnRandom.classList.toggle('active', app.isRandom)
            } else {
                app.isRepeat = !app.isRepeat
                btnRepeat.classList.toggle('active', app.isRepeat)
                btnRandom.classList.toggle('active', app.isRandom)
            }
        }

        // Xu ly repeat
        btnRepeat.onclick = function() {
            app.isRepeat = !app.isRepeat
            app.setConfig('isRepeat', app.isRepeat)
            
            if(!app.isRandom) {
                btnRepeat.classList.toggle('active', app.isRepeat)
            } else {
                app.isRandom = !app.isRandom
                btnRandom.classList.toggle('active', app.isRandom)
                btnRepeat.classList.toggle('active', app.isRepeat)
            }
        }

        // xu ly tua 
        rangeLine.onchange = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }
        


        // Xu ly phong to thu nho anh 
        document.onscroll = function() {
            $('.container').style.backgroundColor = 'black';
            $('.main-control').style.color = 'white';
            timeSong.style.color = 'white'
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            
            const newcdWidth = cdWidth - scrollTop;
            const newcdHeight = cdHeight- scrollTop;
            
            
            cd.style.width = newcdWidth > 0 ? newcdWidth + 'px' : 0 ;
            cd.style.height = newcdHeight > 0 ? newcdHeight + 'px' : 0;
            cd.style.opacity = newcdWidth / cdWidth;
            
            
            if (scrollTop == 0 ) {
                $('.container').style.backgroundColor = '#00fffe33';
                $('.main-control').style.color = 'black';
                timeSong.style.color = 'black'
            }
            

        }

        // Xu ly kia audio ket thuc 
        audio.onended = function() {
            if(app.isRepeat) {
                audio.play()
            } else {
                btnNext.click()
            }
        }


        // Xu ly phat bai hat khi bam vao bai hat trong list 
        playList.onclick = function(e) { 
            const songNode = e.target.closest('.list-li:not(.active-song)')
            if(songNode || e.target.closest('.list-li-more')) {
               // Xu ly khi click vao bai hat 
               if(songNode) {
                    const dataIndex = Number(songNode.dataset.index)
                    app.currentIndex = dataIndex
                    app.loadCurrentSong()
                    audio.play()
                    app.renderList()
               }

               // Xu ly khi click vao option 
               if(e.target.closest('.list-li-more')) {

               }
            }
        }

    },

    loadCurrentSong: function() {
        
        heading.textContent = this.currentSong.name;
        picture.src =  this.currentSong.image;
        audio.src = this.currentSong.path;

    },
    loadConfig: function() { 
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

        // Hien thi lai trang thai 
        if(!app.isRepeat) {
            btnRandom.classList.toggle('active', app.isRandom)
        } else {
            app.isRepeat = !app.isRepeat
            btnRepeat.classList.toggle('active', app.isRepeat)
            btnRandom.classList.toggle('active', app.isRandom)
        }
        if(!app.isRandom) {
            btnRepeat.classList.toggle('active', app.isRepeat)
        } else {
            app.isRandom = !app.isRandom
            btnRandom.classList.toggle('active', app.isRandom)
            btnRepeat.classList.toggle('active', app.isRepeat)
        }
    },
    scrollToActiveSong: function() {
        setTimeout(function() {
            $('.active-song').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 300)
    },

    nextSong: function() {
        this.currentIndex ++;
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0;
        }
        this.loadCurrentSong()
    },

    backSong: function() {
        this.currentIndex--;
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1;
        }
        this.loadCurrentSong()
        
    },
    playRandom: function() { 
        do {
            var newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex == this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },

    playRepeat: function() {
        
    },

    start: function() {

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
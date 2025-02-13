const fs = require('fs');
const path = require('path');

const musicDir = path.join(__dirname, '../assets/music');  // Đường dẫn đến thư mục nhạc
const imageDir = path.join(__dirname, '../assets/image');  // Đường dẫn đến thư mục ảnh
const outputFile = path.join(__dirname, 'songs.json'); // Lưu danh sách bài hát vào JSON

const defaultImage = './assets/image/df.png';

// Đọc danh sách file trong thư mục nhạc
const files = fs.readdirSync(musicDir).filter(file => file.endsWith('.mp3'));

// Chuyển đổi danh sách file thành mảng bài hát
const songs = files.map((file, index) => {
    const songName = path.basename(file, '.mp3'); // Lấy tên bài hát từ tên file
    return {
        name: `${index + 1}. ${songName.replace(/_/g, ' ')}`, // Định dạng tên
        singer: 'Unknown',  // Nếu có cách lấy ca sĩ thì cập nhật
        path: `./assets/music/${file}`,
        image: `${defaultImage}`, // Kiểm tra nếu có ảnh riêng, nếu không thì dùng ảnh mặc định
    };
});

// Ghi vào file JSON
fs.writeFileSync(outputFile, JSON.stringify(songs, null, 2), 'utf-8');
console.log('Danh sách nhạc đã được cập nhật vào songs.json');

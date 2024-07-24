const kanaToRomajiMap = {
  'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
  'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
  'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
  'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
  'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
  'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
  'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
  'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
  'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
  'わ': 'wa', 'を': 'wo', 'ん': 'n',
  'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
  'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
  'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
  'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
  'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
  'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
  'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
  'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
  'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
  'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
  'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
  'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
  'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
  'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
  'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
  'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
  'てぃ': 'thi', 'でぃ': 'dhi',
  'ー': '-',
};

function kanaToRomaji(kana) {
  let romaji = '';
  for (let i = 0; i < kana.length; i++) {
    let char = kana[i];
    if (char === 'っ' && i < kana.length - 1) {
      let nextChar = kana[i + 1];
      let romajiChar = kanaToRomajiMap[nextChar];
      if (romajiChar) {
        romaji += romajiChar[0];
      }
      continue;
    }
    let nextTwoChars = kana.substr(i, 2);
    if (kanaToRomajiMap[nextTwoChars]) {
      romaji += kanaToRomajiMap[nextTwoChars];
      i++;
    } else if (kanaToRomajiMap[char]) {
      romaji += kanaToRomajiMap[char];
    } else {
      romaji += char;
    }
  }
  return romaji;
}






var lyrics;

const csvUrl = './data/lyrics/lady.csv'; // ここにCSVファイルのURLを入力する

function fetchCSV(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback(xhr.responseText);
      } else {
        console.error('Failed to fetch CSV:', xhr.status);
        callback(null);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
}

function parseCSV(csvText) {
  const lines = csvText.split(/\r\n|\n/);
  const data = [];

  for (let i = 0; i < lines.length; i++) {
    const currentLine = lines[i].split(',');
    if (currentLine.length > 0) {
      data.push(currentLine);
    }
  }

  return data;
}

fetchCSV(csvUrl, function(csvText) {
  lyrics = parseCSV(csvText);
  console.log(lyrics);
  lyricsBox1.textContent = lyrics[i][0];
  lyricsBox2.textContent = lyrics[i+1][0];
  lyricsBox3.textContent = lyrics[i+2][0];
  targetBox.textContent = kanaToRomaji(lyrics[i+1][1]).toUpperCase();
  // userBox.textContent = kanaToRomaji(lyrics[i+1][1]).toUpperCase();




  typingLine();
});









var i=0;
const lyricsBox1 = document.getElementById("lyrics1");
const lyricsBox2 = document.getElementById("lyrics2");
const lyricsBox3 = document.getElementById("lyrics3");
const targetBox = document.getElementById("targetText");
const userBox = document.getElementById("userText");






























document.body.addEventListener("keydown", (e) => {
  if (e.shiftKey && e.key === 'Enter'){
      i = i > 0 ? i-1 : i;
      lyricsBox1.textContent = lyrics[i][0];
      lyricsBox2.textContent = lyrics[i+1][0];
      lyricsBox3.textContent = lyrics[i+2][0];
      targetBox.textContent = kanaToRomaji(lyrics[i+1][1]).toUpperCase();
      typingLine();
  }
  else if (e.key == "Enter") {
      i = i < lyrics.length-3 ? i+1 : i;
      lyricsBox1.textContent = lyrics[i][0];
      lyricsBox2.textContent = lyrics[i+1][0];
      lyricsBox3.textContent = lyrics[i+2][0];
      targetBox.textContent = kanaToRomaji(lyrics[i+1][1]).toUpperCase();
      typingLine();
  }
});







const typeOK = document.querySelector("#typeOK");
const typeNG = document.querySelector("#typeNG");

var targetText;
var userInput;




function typeCheck(event){
  if (event.key.length === 1) { // 1文字のキー（例えば、アルファベットや数字など）
    userInput += event.key.toUpperCase();
    console.log("userInputの最終文字 " + userInput.slice(-1));
    console.log("targetTextの対象文字 " + targetText.slice(userInput.length-1, userInput.length));
    console.log("", )
    if(userInput.slice(-1) == targetText.slice(userInput.length-1, userInput.length)){
      typeOK.pause();      
      typeOK.currentTime = 0;
      typeOK.play();
    }
    else{
      userInput = userInput.slice(0, -1);
      typeNG.pause();      
      typeNG.currentTime = 0;
      typeNG.play();
    }
  }

  let isCorrect = true;

  for (let i = 0; i < targetText.length; i++) {
    if (userInput[i] == targetText[i]) {
    }
    else {
    }
  }

  userBox.innerText = userInput;

  if (isCorrect && userInput.length === targetText.length) {
    document.removeEventListener('keydown', typeCheck);
    i = i < lyrics.length-3 ? i+1 : i;
    lyricsBox1.textContent = lyrics[i][0];
    lyricsBox2.textContent = lyrics[i+1][0];
    lyricsBox3.textContent = lyrics[i+2][0];
    targetBox.textContent = kanaToRomaji(lyrics[i+1][1]).toUpperCase();
    typingLine();
  }
}

function typingLine(){
  targetText = targetBox.innerText;
  console.log(targetText);

  userInput = '';
  userBox.innerText = '';

  document.addEventListener('keydown', typeCheck);
}
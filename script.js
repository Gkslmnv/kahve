// Kullanıcı tarafından sağlanan sorular (sırayla). Dosya protokolünde fetch çalışmayabileceği için doğrudan yerleştirildi.
let questions = [
  "İlişkiden korkuyor musun?",
  "Kendini ilişkiye hazır hissetmiyor musun?",
  "Gelecekteki ilişkiden incinmekten mi korkuyorsun?",
  "İlişkide özgürlüğünü kaybedeceğini mi düşünüyorsun?",
  "BENİMLE KAHVE İÇER MİSİN?"
];
let index = 0;
const questionEl = document.getElementById('question');
const btnYes = document.getElementById('btn-yes');
const btnNo = document.getElementById('btn-no');
let answers = [];

function render() {
  questionEl.textContent = questions[index] || '';
}

function recordAnswer(choice) {
  answers.push({question: questions[index]||'', answer: choice});
  // Eğer daha soru varsa bir sonraki soruya geç
  if (index < questions.length - 1) {
    index++;
    render();
  } else {
    // Son soruya cevap verildi — final ekranı göster
    console.log('Cevaplar', answers);
    showFinalScreen();
  }
}

function disableChoices(){
  btnYes.disabled = true;
  btnNo.disabled = true;
  btnYes.classList.add('disabled');
  btnNo.classList.add('disabled');
}

function showFinalScreen(){
  disableChoices();

  // Ensure beraber.png exists before replacing UI
  const imgTest = new Image();
  imgTest.onload = ()=>{
    // hide left character so only beraber.png is visible
    const left = document.querySelector('.left');
    if (left) left.style.display = 'none';

    // replace main content with centered final image and message
    const main = document.querySelector('main.scene');
    if (!main) return;
    main.innerHTML = `
      <div class="final-center">
        <img src="beraber.png" class="final-img" alt="Beraber" />
        <div class="final-msg">Kahve içmek için hak kazandınız</div>
        <div class="final-quote">EN BÜYÜK CESARET BİR ADIM ATMAKLA BAŞLAR</div>
      </div>
    `;

    // create full-screen roses overlay
    const overlay = document.createElement('div');
    overlay.className = 'full-roses-overlay';
    document.body.appendChild(overlay);

    const N = 300;
    for (let i=0;i<N;i++){
      const el = document.createElement('span');
      el.className = 'full-rose';
      el.textContent = '🌹';
      el.style.left = (Math.random()*100) + '%';
      el.style.fontSize = (14 + Math.random()*28) + 'px';
      el.style.animationDuration = (4 + Math.random()*7) + 's';
      el.style.animationDelay = (Math.random()*3) + 's';
      el.style.opacity = (0.7 + Math.random()*0.3);
      overlay.appendChild(el);
    }
  };
  imgTest.onerror = ()=>{
    // show helpful message prompting the user to add the image file
    const right = document.querySelector('.right');
    if (right) {
      right.innerHTML = '<div style="padding:20px;color:#ffdede;font-weight:700">Dosya "beraber.png" bulunamadı. Lütfen proje klasörüne "beraber.png" yükleyin veya bana görseli gönderin.</div>';
    } else {
      alert('Dosya "beraber.png" bulunamadı. Lütfen proje klasörüne yükleyin.');
    }
  };
  imgTest.src = 'beraber.png';
}

btnYes.addEventListener('click', ()=> recordAnswer('Evet'));
btnNo.addEventListener('click', ()=> recordAnswer('Hayır'));

// Harici olarak soruları değiştirmek için API
window.setQuestions = function(newQuestions){
  if (!Array.isArray(newQuestions)) throw new Error('setQuestions expects an array');
  questions = newQuestions.slice();
  index = 0;
  answers = [];
  render();
}

window.getAnswers = function(){ return answers.slice(); }

// Başlangıç render
render();

// Avatar helper (uses `character.png` from project root)
const avatarImg = document.getElementById('avatar');
if (avatarImg) {
  window.setCharacterImageFromURL = function(url){ avatarImg.src = url; }
}

// Yorum gönderme işlevi
document.getElementById('yorumGonder').addEventListener('click', function() {
  const yorumMetni = document.getElementById('yorumMetni').value;
  
  if (yorumMetni.trim() !== '') {
    // Yeni yorum elementi oluştur
    const now = new Date();
    const tarih = now.toLocaleDateString('tr-TR');
    
    // Rastgele kullanıcı adı oluştur
    const isimler = ['Ali Demir', 'Burcu Yılmaz', 'Canan Korkmaz', 'Deniz Şahin', 'Emre Aydın'];
    const secilenIsim = isimler[Math.floor(Math.random() * isimler.length)];
    const ilkHarf = secilenIsim.charAt(0);
    
    // Yorum ID'si oluştur
    const yorumId = Date.now();
    
    const yeniYorum = document.createElement('div');
    yeniYorum.className = 'yorum-kutusu';
    yeniYorum.setAttribute('data-id', yorumId);
    yeniYorum.innerHTML = `
      <div class="yorum-ust">
        <div class="yorum-profil-resmi">${ilkHarf}</div>
        <div class="yorum-kullanici">${secilenIsim}</div>
        <div class="yorum-tarih">${tarih}</div>
      </div>
      <div class="yorum-icerik">
        ${yorumMetni}
      </div>
      <div class="yorum-alt">
        <span class="begen" data-id="${yorumId}"><i class="bi bi-hand-thumbs-up"></i> <span class="begen-sayi">0</span></span>
        <span class="begenme" data-id="${yorumId}"><i class="bi bi-hand-thumbs-down"></i> <span class="begenme-sayi">0</span></span>
        <span class="yanitla" data-id="${yorumId}">Yanıtla</span>
      </div>
      <div class="yanit-formu" id="yanitFormu-${yorumId}">
        <textarea placeholder="Yanıtınızı yazın..."></textarea>
        <button class="yanit-gonder" data-id="${yorumId}">Yanıtı Gönder</button>
      </div>
    `;
    
    // Yorumları içeren div'in başına yeni yorumu ekle
    document.getElementById('yorumlarListesi').prepend(yeniYorum);
    
    // Metin alanını temizle
    document.getElementById('yorumMetni').value = '';
    
    // Olay dinleyicilerini yeniden bağla
    baglaOlayDinleyicileri();
  }
});

// Olay dinleyicilerini bağla
function baglaOlayDinleyicileri() {
  // Beğen butonları
  document.querySelectorAll('.begen').forEach(button => {
    button.onclick = function() {
      const id = this.getAttribute('data-id');
      const begenSayiElement = this.querySelector('.begen-sayi');
      let begenSayi = parseInt(begenSayiElement.textContent);
      
      // Eğer daha önce beğenmemişse
      if (!this.classList.contains('active')) {
        begenSayi++;
        begenSayiElement.textContent = begenSayi;
        this.classList.add('active');
        
        // Eğer beğenme aktifse, pasif yap
        const begenmeButton = document.querySelector(`.begenme[data-id="${id}"]`);
        if (begenmeButton && begenmeButton.classList.contains('active')) {
          begenmeButton.classList.remove('active');
          const begenmeSayiElement = begenmeButton.querySelector('.begenme-sayi');
          let begenmeSayi = parseInt(begenmeSayiElement.textContent);
          begenmeSayi = Math.max(0, begenmeSayi - 1);
          begenmeSayiElement.textContent = begenmeSayi;
        }
      } else {
        // Eğer zaten beğenmişse, beğeniyi geri al
        begenSayi = Math.max(0, begenSayi - 1);
        begenSayiElement.textContent = begenSayi;
        this.classList.remove('active');
      }
    };
  });
  
  // Beğenme butonları
  document.querySelectorAll('.begenme').forEach(button => {
    button.onclick = function() {
      const id = this.getAttribute('data-id');
      const begenmeSayiElement = this.querySelector('.begenme-sayi');
      let begenmeSayi = parseInt(begenmeSayiElement.textContent);
      
      // Eğer daha önce beğenmemişse
      if (!this.classList.contains('active')) {
        begenmeSayi++;
        begenmeSayiElement.textContent = begenmeSayi;
        this.classList.add('active');
        
        // Eğer beğen aktifse, pasif yap
        const begenButton = document.querySelector(`.begen[data-id="${id}"]`);
        if (begenButton && begenButton.classList.contains('active')) {
          begenButton.classList.remove('active');
          const begenSayiElement = begenButton.querySelector('.begen-sayi');
          let begenSayi = parseInt(begenSayiElement.textContent);
          begenSayi = Math.max(0, begenSayi - 1);
          begenSayiElement.textContent = begenSayi;
        }
      } else {
        // Eğer zaten beğenmemişse, beğenmeyi geri al
        begenmeSayi = Math.max(0, begenmeSayi - 1);
        begenmeSayiElement.textContent = begenmeSayi;
        this.classList.remove('active');
      }
    };
  });
  
  // Yanıtla butonları
  document.querySelectorAll('.yanitla').forEach(button => {
    button.onclick = function() {
      const id = this.getAttribute('data-id');
      const yanitFormu = document.getElementById(`yanitFormu-${id}`);
      yanitFormu.classList.toggle('show');
    };
  });
  
  // Yanıt gönder butonları
  document.querySelectorAll('.yanit-gonder').forEach(button => {
    button.onclick = function() {
      const id = this.getAttribute('data-id');
      const yanitFormu = document.getElementById(`yanitFormu-${id}`);
      const yanitMetni = yanitFormu.querySelector('textarea').value;
      
      if (yanitMetni.trim() !== '') {
        alert('Yanıtınız gönderildi: ' + yanitMetni);
        yanitFormu.querySelector('textarea').value = '';
        yanitFormu.classList.remove('show');
      }
    };
  });
}

// Sayfa yüklendiğinde olay dinleyicilerini bağla
document.addEventListener('DOMContentLoaded', function() {
  baglaOlayDinleyicileri();
});
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Sadece # olan linkleri kontrol et
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
    });
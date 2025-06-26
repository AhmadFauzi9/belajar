<?php
// index.php
$siteTitle = "Belajar Ngoding";
$languages = [
    ["name" => "PHP", "icon" => "🧩", "desc" => "Bangun backend dinamis &amp; API."],
    ["name" => "JavaScript", "icon" => "⚡", "desc" => "Ciptakan interaksi front-end yang kaya."],
    ["name" => "CSS", "icon" => "🎨", "desc" => "Desain tampilan indah &amp; responsif."]
];
$today = date('d F Y');
?>
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?= $siteTitle; ?></title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <div class="nav-wrapper">
      <div class="brand" onclick="scrollToTop()"><?= $siteTitle; ?></div>
      <div class="hamburger" id="hamburger" aria-label="Menu">☰</div>
      <nav>
        <ul id="nav-links">
          <?php foreach($languages as $lang): ?>
          <li><a href="#<?= strtolower($lang['name']); ?>"><?= $lang['name']; ?></a></li>
          <?php endforeach; ?>
          <li><a href="#mulai">Mulai</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <section class="hero">
    <div>
      <h1>Belajar Ngoding itu Menyenangkan!</h1>
      <p>Mulai perjalanan coding kamu dengan materi praktis PHP, JavaScript, dan CSS. Semuanya dirancang agar mudah diikuti, dari pemula hingga mahir.</p>
      <button class="cta-btn" onclick="document.getElementById('mulai').scrollIntoView({behavior:'smooth'});">Mulai Belajar ⚡</button>
    </div>
  </section>

  <section class="cards" id="bahasa" >
    <?php foreach($languages as $lang): ?>
    <div class="card" id="<?= strtolower($lang['name']); ?>">
      <div class="card-icon"><?= $lang['icon']; ?></div>
      <h3 class="card-title"><?= $lang['name']; ?></h3>
      <p><?= $lang['desc']; ?></p>
    </div>
    <?php endforeach; ?>
  </section>

  <section id="mulai" class="hero mulai">
    <div>
      <h1>Siap Memulai?</h1>
      <p>Tanggal <?= $today; ?> adalah hari terbaik untuk menulis baris kode pertamamu!</p>
      <button class="cta-btn" onclick="alert('Selamat belajar!');">Ayo Mulai</button>
    </div>
  </section>

  <footer>
    © <?= date('Y'); ?> Belajar Ngoding • Dibuat dengan ❤ dan semangat berbagi.
  </footer>

  <script src="script.js"></script>
</body>
</html>

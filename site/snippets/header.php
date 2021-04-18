<!DOCTYPE html>
<html lang="fr">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <?php if ($page->isHomePage()): ?>
      <title><?= $site->title() ?></title>
    <?php else: ?>
      <title><?= $site->title() ?> | <?= $page->title() ?></title>
    <?php endif ?>

  <?= css([
    'assets/css/reset.css', // https://github.com/murtaugh/HTML5-Reset
    'assets/css/style.css',
    '@auto'
  ]) ?>
</head>
<body>
  <header class="header">

    <a class="logo" href="<?= $site->url() ?>">
      <?= $site->title()->html() ?>
    </a>

    <nav class="menu">
      <?php foreach ($site->children()->listed() as $item): ?>
      <a <?php e($item->isOpen(), 'aria-current ') ?> href="<?= $item->url() ?>"><?= $item->title()->html() ?></a>
      <?php endforeach ?>
    </nav>
  </header>
  <main class="main">

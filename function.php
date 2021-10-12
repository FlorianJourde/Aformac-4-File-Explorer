<?php

if (isset($_POST)&& !empty($_POST['path'])){
  $path = $_POST['path'];
  getFiles($path);
}

function getFiles($dir) {
  if (is_dir($dir)) {
    if ($dh = opendir($dir)) {
      while (($file = readdir($dh)) !== false) {
        $dot = ".";
        $dotPos = strpos($file, $dot);
        if ($dotPos !== false && $dotPos > 0) {
          echo "<div class='file col-2'><i class='fas fa-file fa-3x'></i><br/> $file</div>";
        } else {
          echo "<div class='path col-2' id='$file' style='color: rgba(0, 0, 0, 0.5)'><i class='fas fa-folder fa-3x'></i><br/> $file</div>";
        }
      }
      closedir($dh);
    }
  }
}
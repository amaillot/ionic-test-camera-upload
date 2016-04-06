<?php

file_put_contents('infos.txt', var_export($_FILES, true));
file_put_contents('post.txt', var_export($_POST, true));

// $new_image_name = "namethisimage.jpg";
// move_uploaded_file($_FILES["file"]["tmp_name"], "./".$new_image_name);

move_uploaded_file($_FILES['file']['tmp_name'], $_FILES['file']['name']);

echo 'SUCCESS';
?>



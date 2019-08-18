<?php

$q = isset($_GET['q'])? $_GET['q']:'';
error_log('query[' . $q . ']');

$file = file_get_contents("sample_01.csv");

$datas = ["\t選択してください"];
foreach(explode("\n", $file) as $line) {
    $csv = str_getcsv($line);
    if($csv[0] == $q) {
        $data =sprintf("%s\t%s", $csv[1], $csv[2]);
        $datas[] = $data;
    }
}

$result = [
    'result' => 'SUCCESS',
    'data' => $datas,
];

$json_options = JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE;
$json = json_encode($result, $json_options);

error_log('result => ' . $json);

echo $json;
?>
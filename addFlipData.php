<?php
echo "hello";
$str_json = $_POST["j"];
var_dump(json_decode($str_json));
echo json_decode($str_json);
//$db = new SQLite3('flipData.db', SQLITE3_OPEN_CREATE | SQLITE3_OPEN_READWRITE);
// Create a table.
/**$db->query('CREATE TABLE IF NOT EXISTS "flipper" (
    "percentRange" DOUBLE
    "month" INTEGER
    "day" INTEGER
    "year" INTEGER
    "hour" INTEGER
    "minute" INTEGER
)');**/
/**$sentPercent1 = $_POST["final1"];
$sentPercent2 = $_POST["final2"];
$sentPercent3 = $_POST["final3"];
$sentMonth = $_POST["month"];
$sentDay = $_POST["day"];
$sentYear = $_POST["year"];
$sentHour = $_POST["hour"];
$sentMin = $_POST["minute"];

echo $sentPercent1;**/

/**$db->exec('BEGIN');
$db->query('INSERT INTO "flipper" ("percentRange", "month","day","year","hour","minute")
    VALUES ($sentPercentRange, $sentMonth,$sentDay,$sentYear,$sentHour,$sentMin)');
$db->exec('COMMIT');

$results = $db->query('SELECT percentRange,time FROM db');
while ($row = $results->fetchArray()) {
    var_dump($row);
}
$db->close();**/
?>
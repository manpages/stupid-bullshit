<?php
function parseRoute($x) {
  $operand = $x;
  if (is_array($x))
    $operand = $x['REQUEST_URI'];
  $xs = array_slice(explode('/', $operand), 1);
  return Array($xs[0], array_slice($xs, 1));
}

echo('<pre>');
list($module, $args) = parseRoute($_SERVER);
require_once($module);

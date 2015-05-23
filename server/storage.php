<?php
// This storage backend is not atomic. We know it. 
// It's a toy storage though, so nobody should care...

function default_opts() { return Array( 'backend' => 'json'
                                       ,'target'  => './storage/all.json' ); }

function storage_put($namespace, $document, $opts = false) {
  if (!$opts) $opts = default_opts();
  $fname = $opts['target'];
  ensure($fname);
  $data  = storage_data($fname);
  array_push($data->$namespace, $document);
  storage_flush($data, $fname);
}

function storage_get($namespace, $selector, $opts = false) {
  if (!$opts) $opts = default_opts();
  $fname = $opts['target'];
  ensure($fname);
  return storage_filter(storage_data($fname)->$namespace, $selector);
}

function storage_set($namespace, $selector, $document, $opts = false) {
  if (!$opts) $opts = default_opts();
  $fname = $opts['target'];
  ensure($fname);
  $data = storage_data($fname);
  $nsdocument = $data->$namespace;
  $hits = storage_get($namespace, $selector, $opts);
  if (empty($hits))
    return storage_put($namespace, $document, $opts);
  else {
    foreach($hits as $hit_k => $hit_v) {
      $nsdocument[$hit_k] = omerge($document, $hit_v);
    }
    $data->$namespace = $nsdocument;
    return storage_flush($data, $fname);
  }
}

function storage_data($x) {
  return (json_decode(file_get_contents($x)));
}

function storage_flush($what, $where) {
  return file_put_contents($where, json_encode($what));
}

function storage_filter($document, $selector) {
  if (!$document) return [];
  $p = function($x, $y) {
    if (!is_callable($y)) {
      die('Only lambdas can be used as selectors');
    }
    return $y($x);
  };
  $result = Array();
  foreach($document as $k => $v) {
    $va = $v;
    if ($p($va, $selector))
      $result[$k] = $va;
  }
  return $result;
}

function ensure($x) {
  if (!file_exists($x)) {
    file_put_contents($x, json_encode(Array()));
  }
}

function id($x) {
  return $x;
}

function omerge($a, $b) {
  return (object) ((array)$a + (array)$b);
}

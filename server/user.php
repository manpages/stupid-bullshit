<?php
require_once('./storage.php');

function user_salt() { return 'pmffpm_rw2N_YuoUejt9FK0gG4_Y70h2X07zjyZ'; }

function user_register($user, $password) {
  if (user_get_password($user)) {
    return false;
  }
  return user_set_password($user, $password);
}

function user_make_session($user) {
  return 'foobar';
}

function user_wipe_old_sessions() {
  return true;
}

function user_is_correct_password($user, $candidate) {
  return hash_password($candidate) == user_get_password($user);
}

function hash_password($x) {
  function sha($x) {
    return hash('sha256', $x);
  }
  return sha(sha($x . user_salt()));
}

function user_set_password($user, $plain_password) {
  return 
  storage_set('users', 
              user_match_user($user),
              Array( 'user'     => $user
                    ,'password' => hash_password($plain_password) )
             );
}

function user_get_password($user) {
  $matches = storage_get('users', user_match_user($user));
  /*
  *
  * On the very same $matches variable:
  *
  *
  * var_dump($matches[0]); => NULL
  *
  *
  *
  * var_dump(array_slice($matches, 0, 1)[0]); =>
  * object(stdClass)#10 (2) {
  *    ["user"]=>
  *      string(7) "wtf"
  *    ["password"]=>
  *      string(64) "64bd4c471b...86d3ddcfc430ad"
  * }
  *
  *
  *
  * One question — what a joke of a language is this?
  *
  *
  * Oh wait, there's one more — why do mathematicians
  * have to learn this? A language where == doesn't 
  * define equality classes and + isn't commutatuve.
  * It just does not make any sense.
  *
  *
  * What a joke.
  *
  */
  if (empty($matches))
    return false;
  if (sizeof($matches) > 1)
    die("Shit happened: there are more than one user named $user");
  return array_slice($matches, 0, 1)[0]->password;
}

function user_match_user($x) { 
  return function($xo) use ($x) { 
    return $xo->user == $x; 
  };
}

{
  function  ok($x) { echo json_encode(Array('result' => $x)); }
  function nok($x) { echo json_encode(Array('error'  => $x)); }
  if (is_array($_POST) && $_POST['user'] && $_POST['password']) {
    $user     = $_POST['user'];
    $password = $_POST['password'];
    if ($args[0] == 'signup') {
      if (user_register($user, $password))
        return ok('You\'re in!');
      else
        return nok('A user with this name is already registered');
    }
    if ($args[0] == 'signin') {
      if (user_is_correct_password($user, $password)) {
        user_wipe_old_sessions();
        $session = user_make_session($user);
        return ok($session);
      } else {
        return nok('Incorrect password');
      }
    }
  } else {
    return nok('Must provide both username and password');
  }
}

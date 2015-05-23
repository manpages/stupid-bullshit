<?php
require_once('./storage.php');

function user_salt() { return 'pmffpm_rw2N_YuoUejt9FK0gG4_Y70h2X07zjyZ'; }

function user_register($user, $password) {
  return user_set_password_hash($user, $password);
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
  storage_set('users', 
              user_match_user($user),
              Array( 'user'     => $user
                    ,'password' => hash_password($plain_password) )
             );
}

function user_get_password($user) {
  return storage_get('users', user_match_user($user))[0]->password;
}

function user_match_user($x) { 
  return function($xo) use ($x) { 
    return $xo->user == $x; 
  };
}

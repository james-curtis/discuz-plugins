<?php

/**
 *      [fx8.cc] (C)2014-2017 ymg6.Com.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: sanree_brand_mybrand.php sanree $
 */

if(!defined('IN_DISCUZ')) {
	exit('');
}

if (!$_G['uid']) {

	showmessage(srlang('nologin'), '', array(), array('login' => true));
	
}

$view = $_G['sr_view'];
$viewarray = array('me', 'mymsg', 'myalbum');
$view = !in_array($view, $viewarray) ? 'me' : $view;
$actives[$view] = ' class="a"';
$bcount[0] = C::t('#sanree_brand#sanree_brand_businesses')->count_by_wherec(array('t.uid='.$_G['uid'],'c.status=1','t.status=1'));
$bcount[1] = C::t('#sanree_brand#sanree_brand_businesses')->count_by_wherec(array('t.uid='.$_G['uid'],'c.status=1','t.status=0'));
$bcount[2] = C::t('#sanree_brand#sanree_brand_businesses')->count_by_wherec(array('t.uid='.$_G['uid'],'c.status=1','t.status=-1'));
$bcount[3] = $bcount[0] + $bcount[1] +$bcount[2];

require_once sanree_libfile('module/'.$plugin['identifier'].'/'.$mod.'_'.$view, $plugin['identifier']);
?>
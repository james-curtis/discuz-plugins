<?php

/**
 *      [fx8.cc] (C)2014-2017 ymg6.Com.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: sanree_brand_coupon_image.php sanree $
 */

if(!defined('IN_DISCUZ') || empty($_GET['aid']) || empty($_GET['size']) || empty($_GET['key'])) {
	header('location: '.$_G['siteurl'].'static/image/common/none.gif');
	exit;
}

$nocache = !empty($_GET['nocache']) ? 1 : 0;
$daid = intval($_GET['aid']);
$type = !empty($_GET['type']) ? $_GET['type'] : 'fixwr';
list($w, $h) = explode('x', $_GET['size']);
$dw = intval($w);
$dh = intval($h);
$thumbfile = 'image/brand_coupon_'.$daid.'_'.$dw.'_'.$dh.'.jpg';
$parse = parse_url($_G['setting']['attachurl']);
$attachurl = !isset($parse['host']) ? $_G['siteurl'].$_G['setting']['attachurl'] : $_G['setting']['attachurl'];
if(!$nocache) {
	if(file_exists($_G['setting']['attachdir'].$thumbfile)) {
		dheader('location: '.$attachurl.$thumbfile);
	}
}

define('NOROBOT', TRUE);

$id = !empty($_GET['atid']) ? $_GET['atid'] : $daid;
if(coupon_dsign($id.'|'.$dw.'|'.$dh) != $_GET['key']) {
	///dheader('location: '.$_G['siteurl'].'static/image/common/none.gif');
}

if($attach = C::t('#sanree_brand#sanree_brand_attachment')->fetch_firstbyaid($daid)) {
	if(!$dw && !$dh && $attach['tid'] != $id) {
	       dheader('location: '.$_G['siteurl'].'static/image/common/none.gif');
	}
    dheader('Expires: '.gmdate('D, d M Y H:i:s', TIMESTAMP + 3600).' GMT');
	if($attach['remote']) {
		$filename = $_G['setting']['ftp']['attachurl'].'category/'.$attach['attachment'];
	} else {
		$filename = $_G['setting']['attachdir'].'category/'.$attach['attachment'];
	}
	require_once libfile('class/image');
	$img = new image;
	if($img->Thumb($filename, $thumbfile, $w, $h, $type)) {
		if($nocache) {
			dheader('Content-Type: image');
			@readfile($_G['setting']['attachdir'].$thumbfile);
			@unlink($_G['setting']['attachdir'].$thumbfile);
		} else {
			dheader('location: '.$attachurl.$thumbfile);
		}
	} else {
		dheader('Content-Type: image');
		@readfile($filename);
	}
	exit();	
}
dheader('location: '.$_G['siteurl'].'static/image/common/nophoto.gif');
?>
<?php

/**
 *      [fx8.cc] (C)2014-2017 ymg6.Com.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: admincp.inc.php 2 2012-01-03 13:05:56 sanree $
 */
///error_reporting(E_ALL);
if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
	exit('Access Denied');
}
if (CHARSET=='utf-8') {

	define('C_CHARSET','_utf8');
	
} else {

	define('C_CHARSET','');
	
}
$pidentifier = 'coupon';
$brandplugurl = 'http://www.fx8.cc/?@sanree_brand.plugin';
$modfile=DISCUZ_ROOT.'./source/plugin/'.$plugin['identifier'].'/config.inc.php';
@require_once($modfile);
$modfile = DISCUZ_ROOT.'./source/plugin/sanree_brand/function/function_core.php';
if(!file_exists($modfile)) {

	cpmsg(lang('plugin/sanree_brand_coupon', 'error_install'), $brandplugurl, 'error');
	
}
$file_types = '*.jpg;*.jpeg;*.png;*.bmp;';
@require_once($modfile);
$modfile=DISCUZ_ROOT.'./source/plugin/'.$plugin['identifier'].'/function/function_core.php';
@require_once($modfile);
$modfile = DISCUZ_ROOT.'./source/plugin/'.$plugin['identifier'].'/function/function_module.php';
@require_once($modfile);
foreach($_GET as $k => $v) {
	$_G['sr_'.$k] = daddslashes($v);
}
$act= $_G['sr_act'];
$config = array();
foreach($pluginvars as $key => $val) {

	$config[$key] = $val['value'];
	
}
$_G['cache']['plugin']['sanree_brand_coupon'] = $config;
$selectpriceunit = $config['selectpriceunit'];
$marr = explode("\r\n", $selectpriceunit);
foreach($marr as $row) {

	list($key , $val) = explode("=", $row);
	$config['selectpriceunitshow'][trim($key)] = coupon_shtmlspecialchars(trim($val));
	
}

$brand_config = array();
$brandplugin = C::t('#sanree_brand#common_plugin')->fetch_by_identifier('sanree_brand');
if(!$brandplugin) {
	cpmsg(srlang('plugin_not_found'), '', 'error');
} else {
	$sanree_brand_pluginid = $brandplugin['pluginid'];
}
if($brandplugin[version]<1.409) {
	cpmsg(srlang('plugin_error_version'), '', 'error');
}
foreach(C::t('#sanree_brand#common_pluginvar')->fetch_all_by_pluginid($sanree_brand_pluginid) as $var) {
	if(strexists($var['type'], '_')) {
		continue;
	}
	$brand_config[$var['variable']] = $var['value'];
}
$isrebate = intval($config['isrebate']);
$actlist =array(
	$pidentifier	=> array($pidentifier),
	'category'		=> array('list'),
	'slide'			=> array('slide'),
	'diymanage'		=> array('diyconfig', 'diystyle', 'diytemplate'),	
	'printlog'		=> array('printlog'),
);

$pdo = $navbar =array();
foreach ($actlist as $k => $v){
	$pdo=array_merge($pdo,$v);
}
if(!in_array($act, $pdo)) {
	$act = $pidentifier;
}
$current=' class="current"';
$menustr='<ul class="tab1">';
foreach ($actlist as $k => $v){
	$navbar[$k]=in_array($act,$v) ? $current:'';
	$menustr.='<li'.$navbar[$k].'><a href="'.ADMINSCRIPT.'?action=plugins&operation=config&act='.$v[0].'&identifier=sanree_brand_'.$pidentifier.'&pmod=admincp"><span>'.$langs[$k].'</span></a></li>';
}
$menustr.='</ul>';
$thisurl = "plugins&operation=config&identifier=sanree_brand_".$pidentifier."&pmod=admincp&act=$act";
$gotourl = 'action=plugins&operation=config&identifier=sanree_brand_'.$pidentifier.'&pmod=admincp&act=';
$adminurl = ADMINSCRIPT.'?action=plugins&operation=config&identifier=sanree_brand_'.$pidentifier.'&pmod=admincp';
$menustr=$rightlink.$menustr;
cpheader();
$cateid=intval($_G['sr_cateid']);
if ($cateid) $thisurl.='&cateid='.$cateid;
$actfile=sanree_libfile('admincp/'.$plugin['identifier'].'/'.$act, $plugin['identifier']);
if(!file_exists($actfile)) {

	cpmsg($langs['isbusiness'], 'action=plugins&operation=config&identifier=sanree_brand_'.$pidentifier.'&pmod=admincp&act=list', 'error');
	
}

$bindingforum = intval($config['bindingforum']);
if ($bindingforum<1) {

	cpmsg_error($langs['nobindingforum']);
	
}
chkformtitle($bindingforum, $config);
$rebateunit = $config['rebateunit'];
if(empty($rebateunit)){

	cpmsg_error($langs['nocreditunit']);
	
}

$_G[fid] = $bindingforum;
require_once $actfile;
?>
<?php

/**
 * Www.침혹걸.Vip 
 *
 * [침혹걸!] (C)2014-2017 www.moqu8.com.  By www-침혹걸-co
 *
 * Support: caogenba@qq.com QQ:1218894030
 *
 * Date: 2013-02-17 16:22:17 moqu8.com $
 */

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

require_once "class/tudou.class.php";

class video_tudou_module {

	public static function video_tudou($arr = array()) {
		$flvarr = Tudou::parse($arr[0], 'high');//print_r($flvarr);
		return $flvarr;
	}
	
}


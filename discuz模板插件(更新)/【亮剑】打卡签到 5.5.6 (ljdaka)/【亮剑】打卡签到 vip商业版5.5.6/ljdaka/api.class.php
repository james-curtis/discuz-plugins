<?php

/*
 * CopyRight  : [www.moqu8.com!] (C)2014-2015
 * Document   : ħȤ�ɣ�www.moqu8.com
 * Created on : 2015-01-17,21:45:40
 * Author     : ħȤ��(QQ��10373458)  $
 * Description: This is NOT a freeware, use is subject to license terms.
 *              ħȤ�ɳ�Ʒ ������Ʒ��
 *              ħȤ��Դ����̳ ȫ���׷� http://www.moqu8.com��
 */
if (!defined('IN_DISCUZ')) {
    exit('Access Denied');
}

class ljdaka_api {
	function forumdisplay_mobilesign() {
		require_once DISCUZ_ROOT.'./source/plugin/wechat/wechat.lib.class.php';
		$url = WeChatHook::getPluginUrl('ljdaka:ranklist');
		$return = array(
		 'text' => lang('plugin/ljdaka', 'm2'),
		 'link' => $url,
		);
		return $return;
	}

}

?>

<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: table_forum_forumfield.php 27876 2012-02-16 04:28:02Z zhengqingpeng $
 */

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

class table_forum_forumfield extends discuz_table
{
	public function __construct() {

		$this->_table = 'forum_forumfield';
		$this->_pk    = 'fid';

		parent::__construct();
	}
	public function fetch_all_by_fid($fids) {
		$fids = array_map('intval', (array)$fids);
		if(!empty($fids)) {
			return XDB::fetch_all("SELECT * FROM %t WHERE fid IN(%n)", array($this->_table, $fids), $this->_pk);
		} else {
			return array();
		}
	}
	public function fetch_all_field_perm() {
		return XDB::fetch_all("SELECT fid, viewperm, postperm, replyperm, getattachperm, postattachperm, postimageperm FROM ".XDB::table($this->_table)." WHERE founderuid=0");
	}
	public function fetch_groupnum_by_founderuid($uid) {
		if(empty($uid)) {
			return false;
		}
		return XDB::result_first("SELECT COUNT(*) FROM ".XDB::table($this->_table)." WHERE founderuid=%d", array($uid));
	}
	public function update_groupnum($fid, $num) {
		if(!intval($fid) || !intval($num)) {
			return false;
		}
		XDB::query("UPDATE %t SET groupnum=groupnum+%d WHERE fid=%d", array('forum_forumfield', $num, $fid));
	}
	public function update_membernum($fid, $num = 1) {
		if(!intval($fid) || !intval($num)) {
			return false;
		}
		XDB::query("UPDATE %t SET membernum=membernum+%d WHERE fid=%d", array('forum_forumfield', $num, $fid));
	}
	public function fetch_info_for_attach($fid, $uid) {
		return XDB::fetch_first("SELECT f.fid, f.viewperm, f.getattachperm, a.allowgetattach, a.allowgetimage FROM %t f LEFT JOIN %t a ON a.uid=%d AND a.fid=f.fid WHERE f.fid=%d", array('forum_forumfield', 'forum_access', $uid, $fid));
	}
	public function check_moderator_for_uid($fid, $uid, $accessmasks = 0) {
		if(!intval($fid) || !intval($uid)) {
			return false;
		}
		if($accessmasks) {
			$accessadd1 = ', a.allowview, a.allowpost, a.allowreply, a.allowgetattach, a.allowgetimage, a.allowpostattach';
			$accessadd2 = "LEFT JOIN ".XDB::table('forum_access')." a ON a.".XDB::field('uid', $uid)." AND a.".XDB::field('fid', $fid);
		}
		return XDB::fetch_first("SELECT ff.postperm, m.uid AS istargetmod $accessadd1
				FROM ".XDB::table($this->_table)." ff
				$accessadd2
				LEFT JOIN ".XDB::table('forum_moderator')." m ON m.fid=%d AND m.uid=%d
				WHERE ff.fid=%d", array($fid, $uid, $fid));
	}
}
//www-FX8-co
?>
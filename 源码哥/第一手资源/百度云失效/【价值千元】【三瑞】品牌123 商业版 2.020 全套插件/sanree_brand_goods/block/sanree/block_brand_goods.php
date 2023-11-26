<?php

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

class block_brand_goods {

    var $setting = array();
	function name() {
		return lang('plugin/sanree_brand_goods', 'blockclass_brandname');
	}

	function blockclass() {
		return array('brand_goods', lang('plugin/sanree_brand_goods', 'blockclass_brandname'));
	}

	function fields() {
		return array(
				'name' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_title'), 'formtype' => 'title', 'datatype' => 'title'),
				'gid' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_gid'), 'formtype' => 'text', 'datatype' => 'int'),
				'url' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_url'), 'formtype' => 'text', 'datatype' => 'string'),
				'pic' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_pic'), 'formtype' => 'text', 'datatype' => 'pic'),
				'price' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_price'), 'formtype' => 'text', 'datatype' => 'string'),
				'minprice' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_minprice'), 'formtype' => 'text', 'datatype' => 'string'),
				'priceunit' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_priceunit'), 'formtype' => 'text', 'datatype' => 'string'),	
				'views' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_views'), 'formtype' => 'text', 'datatype' => 'int'),
				'cateid' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_cateid'), 'formtype' => 'text', 'datatype' => 'int'),
				'catename' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_catename'), 'formtype' => 'text', 'datatype' => 'string'),
				'goodsno' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_goodsno'), 'formtype' => 'text', 'datatype' => 'string'),
				'bid' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_bid'), 'formtype' => 'text', 'datatype' => 'int'),
				'brandname' => array('name' => lang('plugin/sanree_brand_goods', 'blockclass_brand_field_brandname'), 'formtype' => 'text', 'datatype' => 'string'),
			);
	}

	function getsetting() {
	
		@require_once(DISCUZ_ROOT.'./source/plugin/sanree_brand/function/function_core.php');	
		@require_once(DISCUZ_ROOT.'./source/plugin/sanree_brand_goods/function/function_core.php');	
		$category_list = array();
		$category = goods_loadcache('usercate');
		$category_list[] = array('0', lang('plugin/sanree_brand_goods','allcate'));
		foreach($category as $value) {
		
			$category_list[] = array($value[cateid], $value[name]);
			
		}
		
		$settings = array(	
			'bid' => array(
				'title' => lang('plugin/sanree_brand_goods','blockclass_bid'),
				'type' => 'text',
				'default' => 0
			),	
			'cateid' => array(
				'title' => lang('plugin/sanree_brand_goods','blockclass_catename'),
				'type' => 'select',
				'default' => 0,
				'value' => $category_list
			),					
			'showfilter' => array(
				'title' => lang('plugin/sanree_brand_goods','blockclass_showfilter'),
				'type' => 'mradio',
				'default' => 0,
				'value' => array(
					array('0', lang('plugin/sanree_brand_goods','blockclass_zuixin')),
					array('1', lang('plugin/sanree_brand_goods','blockclass_zhiding')),
					array('2', lang('plugin/sanree_brand_goods','blockclass_tuijian'))
				)
			),		
			'orderby' => array(
				'title' => lang('plugin/sanree_brand_goods','blockclass_ordertitle'),
				'type' => 'mradio',
				'default' => 0,
				'value' => array(
					array('0', lang('plugin/sanree_brand_goods','blockclass_gid')),
					array('1', lang('plugin/sanree_brand_goods','blockclass_showid')),
					array('2', lang('plugin/sanree_brand_goods','blockclass_dateline')),
					array('3', lang('plugin/sanree_brand_goods','blockclass_views'))
				)
			),
			'ordersc' => array(
				'title'=> lang('plugin/sanree_brand_goods','blockclass_ordersctitle'),
				'type' => 'mradio',
				'default' => 0,
				'value' => array(
					array('0', lang('plugin/sanree_brand_goods','blockclass_orderscdown')),
					array('1', lang('plugin/sanree_brand_goods','blockclass_orderscup'))
				)
			),
			'start' => array(
				'title' => lang('plugin/sanree_brand_goods','blockclass_starttitle'),
				'type' => 'text',
				'default' => 0
			)								
		);
		return $settings;
	}

	function cookparameter($parameter) {
		return daddslashes($parameter);
	}
	
	function getdata($style, $parameter) {
		global $_G;

		define('APPC',DISCUZ_ROOT.'./source/plugin/sanree_brand/condition/');
		$modfile = APPC.'index.php';
		@require_once($modfile);
		@require_once(DISCUZ_ROOT.'./source/plugin/sanree_brand/function/function_core.php');
		@require_once(DISCUZ_ROOT.'./source/plugin/sanree_brand_goods/function/function_core.php');
		@require_once(DISCUZ_ROOT.'./source/plugin/sanree_brand_goods/function/function_module.php');
		$parameter = $this->cookparameter($parameter);
		$config = $_G['cache']['plugin']['sanree_brand_goods'];
		$is_rewrite = intval($config['is_rewrite']);
		$isselfdistrict = intval($config['isselfdistrict']);
		$start = isset($parameter['start']) ? $parameter['start'] : 0;
		$bid = isset($parameter['bid']) ? intval($parameter['bid']) : 0;
		$bannedids = !empty($parameter['bannedids']) ? explode(',', $parameter['bannedids']) : array();
		$items = !empty($parameter['items']) ? intval($parameter['items']) : 10;
		$orderby = isset($parameter['orderby']) ? $parameter['orderby'] : '0';
		$ordersc = isset($parameter['ordersc']) ? $parameter['ordersc'] : '0';
		$cateid = isset($parameter['cateid']) ? $parameter['cateid'] : '0';
		$showfilter = isset($parameter['showfilter']) ? $parameter['showfilter'] : '0';
		$showfilter = in_array($showfilter, array(0,1,2)) ? $showfilter : 0;
		$sc =array('asc','desc');
		$by = array('t.bid','t.displayorder','t.dateline','tt.views');
		$orderby=$by[$orderby];
		$ordersc=$sc[$ordersc];
		$datalist = $wherearr = array(); 

        $wherearr[] = 't.status=1';
		$wherearr[] = 't.isshow=1';
		if ($cateid>0) {
		
			$category_list = $subcategory_list = array();
			require_once libfile('class/sanree_brand_goods_category','plugin/sanree_brand_goods');
			
			$allurl = goods_getmodeurl();
			$categoryclass 		= new sanree_brand_goods_category('sanree_brand_goods');
			$categoryclass->show($is_rewrite);
			$pid 				= $categoryclass->_pid;
			$category_list 		= $categoryclass->_category_list;
			$subcategory_list 	= $categoryclass->_subcategory_list;

			$cateids = array();
			$cateids[] = $cateid;
			if (is_array($subcategory_list)) {
			
			   foreach($subcategory_list as $key => $val) {
			   
				   $cateids[] = $key;
				   
			   }
			   
			}
			$ids = implode($cateids,',');
			if ($pid == $cateid) {
			
				$wherearr[] = 't.cateid in ('.$ids.')';
				
			} else {
			
				$wherearr[] = 't.cateid ='.$cateid ;
				
			}
			
		}
		if(!empty($bannedids)) {
		
			$banids = explode(',', $bannedids);
			$wherearr[] = "t.bid NOT IN (".implode("','", $banids)."')";
			
		}
		if ($showfilter==1) {
		
			$wherearr[] = 't.istop = 1';
			
		} elseif ($showfilter==2) {
		
			$wherearr[] = 't.isrecommend = 1';
			
		}
		if ($bid > 0) {
		
			$wherearr[] = 't.bid = '.$bid;
			
		}		
	
		$where = !empty($wherearr) ? 'WHERE '.implode(' AND ', $wherearr) : '';
		$itemsnum= $items==0 ? "":" LIMIT $start,$items";
		$catlist = C::t('#sanree_brand_goods#sanree_brand_goods')->fetch_all_forblock($where, $orderby, $ordersc, $itemsnum);
		$config = $_G['cache']['plugin']['sanree_brand_goods'];
		$selectpriceunit = $config['selectpriceunit'];
		$marr = explode("\r\n", $selectpriceunit);
		foreach($marr as $row) {
		
			list($key , $val) = explode("=", $row);
			$config['selectpriceunitshow'][trim($key)] = goods_shtmlspecialchars(trim($val));
			
		}
		foreach($catlist as $value) {	
			
			$picflag = 0;
			$datalist[] = array(
				'id' => $value['gid'],
				'idtype' => 'goodsid',
				'title' => $value['name'], 
				'url' => goods_getburl($value),
				'pic' => getthumbnailimage($value['homeaid'], &$picflag),
				'picflag' => $picflag,
				'summary' => '',
				'fields' => array(
					'name' => $value['name'],
					'gid' => $value['gid'],
					'bid' => $value['bid'],
					'brandname' => $value['brandname'],
					'price' => $value['price'],
					'minprice' => $value['minprice'],
					'priceunit' => $config['selectpriceunitshow'][$value['priceunit']],
					'views' => $value['views'],
					'cateid'    => $value['cateid'],
					'catename'    => $value['catename'], 
					'goodsno'    => $value['goodsno'],
				)
			);
			
		}
		return array('html' => '', 'data' => $datalist);
	}
}
//From:www_YMG6_COM
?>
<?php

class ExcelRaschet
{
    /** @var modX $modx */
    public $modx;

    /** @var pdoFetch $pdoTools */
    public $pdo;

    /** @var array() $config */
    public $config = array();


    /**
     * @param modX $modx
     * @param array $config
     */
    function __construct(modX &$modx, array $config = [])
    {
        $this->modx =& $modx;
        $corePath = MODX_CORE_PATH . 'components/excelraschet/';
        $assetsUrl = MODX_ASSETS_URL . 'components/excelraschet/';

        $this->config = array_merge([
            'corePath' => $corePath,
            'modelPath' => $corePath . 'model/',
            // 'processorsPath' => $corePath . 'processors/',
            // 'customPath' => $corePath . 'custom/',

            // 'connectorUrl' => $assetsUrl . 'connector.php',
            // 'assetsUrl' => $assetsUrl,
            // 'cssUrl' => $assetsUrl . 'css/',
            // 'jsUrl' => $assetsUrl . 'js/',
        ], $config);

        $this->modx->addPackage('excelraschet', MODX_CORE_PATH . 'components/excelraschet/model/');
        $this->modx->lexicon->load('excelraschet:default');
        $this->modx->addPackage('organizations', MODX_CORE_PATH.'components/organizations/model/');
        $this->modx->addPackage('doc1c', MODX_CORE_PATH.'components/doc1c/model/');
        $this->modx->addPackage('commercial', MODX_CORE_PATH.'components/commercial/model/');
        $this->modx->addPackage('gtsbalance', MODX_CORE_PATH.'components/gtsbalance/model/');
        $this->modx->addPackage('specification', MODX_CORE_PATH.'components/specification/model/');

        if ($this->pdo = $this->modx->getService('pdoFetch')) {
            $this->pdo->setConfig($this->config);
        }
    }

    public function regTriggers()
    {
        return [
            'DocOrderLink'=>[
                'gtsfunction2'=>'triggerDocOrderLink',
            ],
        ];
    }
    public function triggerDocOrderLink(&$params)
    {
        // $this->modx->log(1,"triggerDocOrderLink ". print_r($params,1));
        if($params['type'] == 'after' and $params['method'] == 'read'){
            $out = $params['object_old'];
            $contract_ids = [];
            $acc_ids = [];
            $commercial_ids = [];
            $spec_ids = [];
            foreach($out['rows'] as $row){
                switch($row['doc_type_id']){
                    case 1: 
                        $contract_ids[$row['doc_id']] = $row['doc_id'];
                    break;
                    case 2: 
                        $acc_ids[$row['doc_id']] = $row['doc_id'];
                    break;
                    case 3: 
                        $commercial_ids[$row['doc_id']] = $row['doc_id'];
                    break;
                    case 4: 
                        $spec_ids[$row['doc_id']] = $row['doc_id'];
                    break;
                }
            }
            $assets_url = MODX_ASSETS_URL;
            if(!empty($contract_ids)){
                if($OrgsContracts = $this->getQuery([
                    'class'=>'OrgsContract',
                    'where'=>[
                        'id:IN'=>$contract_ids
                    ],
                    'limit'=>0
                ])){
                    foreach($out['rows'] as $k=>$row){
                        if($row['doc_type_id'] == 1){
                            $out['rows'][$k]['name'] = $OrgsContracts[$row['doc_id']]['name'];
                            $out['rows'][$k]['date'] = $OrgsContracts[$row['doc_id']]['date_start'];
                            $out['rows'][$k]['file'] = '';
                            $out['rows'][$k]['signed'] = $OrgsContracts[$row['doc_id']]['signed'];
                            $out['rows'][$k]['archived'] = $OrgsContracts[$row['doc_id']]['archived'];
                            $out['rows'][$k]['in1c'] = '0';
                        }
                    }
                }
                
            }
            if(!empty($acc_ids)){
                if($doc1cAccounts = $this->getQuery([
                    'class'=>'doc1cAccount',
                    'where'=>[
                        'id:IN'=>$acc_ids
                    ],
                    'limit'=>0
                ])){
                    foreach($out['rows'] as $k=>$row){
                        if($row['doc_type_id'] == 2){
                            $out['rows'][$k]['name'] = $doc1cAccounts[$row['doc_id']]['nomer_1c'];
                            $out['rows'][$k]['date'] = $doc1cAccounts[$row['doc_id']]['date_1c'];
                            $out['rows'][$k]['file'] = "<a href='{$assets_url}1cfiles/{$doc1cAccounts[$row['doc_id']]['file']}' target='_blank'>{$doc1cAccounts[$row['doc_id']]['file']}</a>";
                            $out['rows'][$k]['signed'] = '0';// $doc1cAccounts[$row['doc_id']]['signed'];
                            $out['rows'][$k]['archived'] = '0';// $doc1cAccounts[$row['doc_id']]['archived'];
                            $out['rows'][$k]['in1c'] = '0';
                        }
                    }
                }
                
            }
            if(!empty($commercial_ids)){
                if($commercialItems = $this->getQuery([
                    'class'=>'commercialItem',
                    'where'=>[
                        'id:IN'=>$commercial_ids
                    ],
                    'limit'=>0
                ])){
                    foreach($out['rows'] as $k=>$row){
                        if($row['doc_type_id'] == 3){
                            $out['rows'][$k]['name'] = 'КП №'.$commercialItems[$row['doc_id']]['year_id'];
                            $out['rows'][$k]['date'] = $commercialItems[$row['doc_id']]['createdon'];
                            $out['rows'][$k]['file'] = "<a href='{$assets_url}docs/commercial/{$commercialItems[$row['doc_id']]['filename']}' target='_blank'>{$commercialItems[$row['doc_id']]['filename']}</a>";
                            $out['rows'][$k]['signed'] = '0';// $doc1cAccounts[$row['doc_id']]['signed'];
                            $out['rows'][$k]['archived'] = '0';// $doc1cAccounts[$row['doc_id']]['archived'];
                            $out['rows'][$k]['in1c'] = '0';
                        }
                    }
                }
                
            }
            if(!empty($spec_ids)){
                if($Specs = $this->getQuery([
                    'class'=>'Spec',
                    'where'=>[
                        'id:IN'=>$spec_ids
                    ],
                    'limit'=>0
                ])){
                    foreach($out['rows'] as $k=>$row){
                        if($row['doc_type_id'] == 4){
                            $out['rows'][$k]['name'] = 'КП №'.$Specs[$row['doc_id']]['spec_id'];
                            $out['rows'][$k]['date'] = $Specs[$row['doc_id']]['date'];
                            $out['rows'][$k]['file'] = "<a href='{$assets_url}docs/spec/{$Specs[$row['doc_id']]['file']}' target='_blank'>{$Specs[$row['doc_id']]['file']}</a>";
                            $out['rows'][$k]['signed'] = $Specs[$row['doc_id']]['signed'];
                            $out['rows'][$k]['archived'] = $Specs[$row['doc_id']]['archived'];
                            $out['rows'][$k]['in1c'] = '0';
                        }
                    }
                }
                
            }
            // $out['test'] = 1;
        }
        return $this->success('',['out'=>$out]);
    }
    public function createAccountIn1c($data = [])
    {
        if(!$doc1c = $this->modx->getService('doc1c','doc1c',MODX_CORE_PATH . 'components/doc1c/model/doc1c/'))
            return $this->error("Не удалось создать сервис!");
            
        if($data['sokrashen'] == "true"){
            $data['sokrashen'] = 1;
        }else{
            $data['sokrashen'] = 0;
        }
        // return $this->error("Сервис doc1c!",$data);
        $resp = $doc1c->handleRequest('newBillFromRaschet',$data);
        if(!$resp['success']) return $resp;
        
        if(!empty($resp["data"]["date_1c"])) $resp["data"]["date_1c"] = date('Y-m-d',strtotime($resp["data"]["date_1c"]));
        $acc = $resp["data"];
        $acc['base_id'] = $data['base_id'];
        $acc['nomer_1c_str'] = $acc['nomer_1c'];
        if($doc1cBase = $this->modx->getObject('doc1cBase',$data["base_id"])){
            $acc['nomer_1c'] = str_replace($doc1cBase->prefix,'',$acc['nomer_1c']);
            $acc['nomer_1c'] = ltrim($acc['nomer_1c'], '0');
        }
        if($gtsBPeriod = $this->modx->getObject('gtsBPeriod',['active'=>1])){
            $acc['period_id'] = $gtsBPeriod->id;
        }
        if($doc1cAccount = $this->modx->newObject('doc1cAccount',$acc)){
            if($doc1cAccount->save()) return $this->success("",['doc1cAccount'=>$doc1cAccount->toArray()]);
        }
        return $this->error("Сервис doc1c!");
    }
    public function handleRequest($action, $data = array())
    {
        $data = $this->modx->sanitize($data, $this->modx->sanitizePatterns);
        switch($action){
            case 'createAccountIn1c':
                return $this->createAccountIn1c($data);
            break;
            default:
                return $this->error("Not found action!");
        }
    }
    
    public function success($message = "",$data = []){
        return array('success'=>1,'message'=>$message,'data'=>$data);
    }
    public function error($message = "",$data = []){
        return array('success'=>0,'message'=>$message,'data'=>$data);
    }
    /**
     * Initializes component into different contexts.
     *
     * @param string $ctx The context to load. Defaults to web.
     * @param array $scriptProperties Properties for initialization.
     *
     * @return bool
     */
    public function initialize($ctx = 'web', $scriptProperties = array())
    {
        $this->config = array_merge($this->config, $scriptProperties);

        $this->config['pageId'] = $this->modx->resource->id;

        switch ($ctx) {
            case 'mgr':
                break;
            default:
                if (!defined('MODX_API_MODE') || !MODX_API_MODE) {

                    $config = $this->makePlaceholders($this->config);
                    if ($css = $this->modx->getOption('gtsapi_frontend_css')) {
                        $this->modx->regClientCSS(str_replace($config['pl'], $config['vl'], $css));
                    }

                    $config_js = preg_replace(array('/^\n/', '/\t{5}/'), '', '
                            gtsAPI = {};
                            gtsAPIConfig = ' . $this->modx->toJSON($this->config) . ';
                    ');


                    $this->modx->regClientStartupScript("<script type=\"text/javascript\">\n" . $config_js . "\n</script>", true);
                    if ($js = trim($this->modx->getOption('gtsapi_frontend_js'))) {

                        if (!empty($js) && preg_match('/\.js/i', $js)) {
                            $this->modx->regClientScript(str_replace($config['pl'], $config['vl'], $js));

                        }
                    }

                }

                break;
        }
        return true;
    }
    public function makePlaceholders($config)
    {
        $placeholders = [];
        foreach($config as $k=>$v){
            if(is_string($v)){
                $placeholders['pl'][] = "[[+$k]]";
                $placeholders['vl'][] = $v;
            }
        }
        return $placeholders;
    }
    public function getQuery($pdoConfig)
    {
        $pdoConfig['return'] = 'data';
        $this->pdo->setConfig($pdoConfig);
        $rows0 = $this->pdo->run();
        if(!is_array($rows0) or count($rows0) == 0){
            return null;
        }
        $rows = [];
        foreach($rows0 as $row){
            $rows[$row['id']] = $row;
        }
        return $rows;
    }
}
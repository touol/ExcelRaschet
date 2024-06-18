export default {
    skladraschet:{
        name:'skladraschet',
        gtsAPITables:[
            {
                table:'sraschet',
                autocomplete_field:'',
                version:15,
                tree: false,
                authenticated:false,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    loadModels:"ExcelRaschet",
                    actions:{
                        read:{},
                        update:{},
                        subtabs:{
                            test:{
                                DocOrderLink:{
                                    title:"Документы",
                                    table:"DocOrderLink",
                                    where: {
                                        "type_order_id": 1,
                                        "order_id":"id"
                                    }
                                },
                                OrgsContact:{
                                    title:"Контакты",
                                    table:"OrgsContact",
                                    where: {
                                        "OrgsContactLink.org_id": "loc_org_id"
                                    }
                                },
                                family:{
                                    title:"Семья расчетов",
                                    table:"sraschet",
                                    where: {
                                        "family_id": "family_id",
                                        "last": 0
                                    }
                                },
                            }
                        },
                    },
                    hide_actions:{
                        "ExcelRaschet/createAccountIn1c":{},
                    },
                    query:{
                        class:'sraschet',
                        where:{
                            "sraschet.last": 1
                        },
                        select:{
                            sraschet:"sraschet.id,sraschet.family_id,sraschet.manager_id,sraschet.raschet_date,sraschet.loc_org_id,sraschet.object,sraschet.price,sraschet.Profit,sraschet.comment,sraschet.status_id,sraschet.contact_date"
                        },
                        sortby:{
                            "sraschet.id": "DESC"
                        }
                    },
                    row_setting:{
                        class:"{switch $status_id}{case 5}canceled{case 4}hit{case 3}outwork{case 1}work{/switch}"
                    },
                    filters:{
                        period_id:{
                            label:"Период",
                            type:"autocomplete",
                            table:"gtsBPeriod",
                            default_row:{
                                active:1
                            }
                        }
                    },
                    "fields": {
                        "id": {
                            "type": "view",
                            "class": "sraschet"
                        },
                        "manager_id": {
                            "label":"Менеджер",
                            "type": "autocomplete",
                            "table": "Managers",
                            "class": "sraschet",
                            "readonly":1
                        },
                        "raschet_date": {
                            "label":"Дата",
                            "type": "date",
                            "class": "sraschet",
                            "readonly":1
                        },
                        "loc_org_id": {
                            "label":"Контрагент",
                            "type": "autocomplete",
                            "table": "Orgs",
                            "class": "sraschet",
                            "readonly":1
                        },
                        "object": {
                            "label":"Объект",
                            "type": "text",
                            "class": "sraschet",
                            "readonly":1
                        },
                        "price": {
                            "label":"Стоимость",
                            "type": "decimal",
                            "FractionDigits": 2,
                            "class": "sraschet",
                            "readonly":1
                        },
                        "Profit": {
                            "label":"План",
                            "type": "decimal",
                            "FractionDigits": 2,
                            "class": "sraschet",
                            "readonly":1
                        },
                        "comment": {
                            "label":"Примечание",
                            "type": "textarea",
                            "class": "sraschet"
                        },
                        "status_id": {
                            "label":"Статус",
                            "type": "autocomplete",
                            "table": "sraschetStatus",
                            "class": "sraschet"
                        },
                        "contact_date": {
                            "label":"Дата следующего контакта",
                            "type": "date",
                            "class": "sraschet"
                        }
                    }
                    // autocomplete:{
                    //     select:["id","name"],
                    //     where:{
                    //         "name:LIKE": "%query%"
                    //     },
                    //     tpl: "{$name}",
                    //     limit:0,
                    // }
                }
            },
            {
                table:'sraschetStatus',
                autocomplete_field:'',
                version:1,
                tree: false,
                authenticated:true,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{},
                    },
                    autocomplete:{
                        select:["id","label"],
                        where:{
                            "label:LIKE": "%query%"
                        },
                        tpl: "{$label}",
                        limit:0,
                    }
                }
            },
        ]
    },
    organizations:{
        name:'organizations',
        gtsAPITables:[
            {
                table:'Orgs',
                autocomplete_field:'loc_org_id',
                version:1,
                tree: false,
                authenticated:true,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{}
                    },
                    autocomplete:{
                        select:["id","shortname","inn"],
                        where:{
                            "shortname:LIKE":"%query%",
                            "OR:inn:LIKE":"%query%",
                        },
                        query:{
                            sortby:{
                                "shortname":"ASC"
                            }
                        },
                        tpl: "{$shortname} {$inn}",
                        limit:0,
                    }
                }
            },
            {
                table:'OrgsContact',
                autocomplete_field:'',
                version:3,
                tree: false,
                authenticated:false,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{}
                    },
                    query:{
                        class:'OrgsContact',
                        leftJoin:{
                            OrgsContactLink:{
                                class:"OrgsContactLink",
                                on:"OrgsContact.id = OrgsContactLink.contact_id"
                            }
                        },
                        select:{
                            OrgsContact:"*",
                            OrgsContactLink:"OrgsContactLink.org_id,OrgsContactLink.default"
                        },
                        sortby:{
                            "id": "ASC"
                        }
                    },
                    "fields": {
                        "id": {
                            "type": "view",
                            "class": "OrgsContact"
                        },
                        "shortname": {
                            "label":"Короткое имя",
                            "type": "text",
                            "class": "OrgsContact"
                        },
                        "phone": {
                            "label":"Телефон",
                            "type": "text",
                            "class": "OrgsContact"
                        },
                        "email": {
                            "type": "Email",
                            "class": "OrgsContact"
                        },
                        "name": {
                            "label":"ФИО",
                            "type": "text",
                            "class": "OrgsContact"
                        },
                        "default": {
                            "label":"По умолчанию",
                            "type": "boolean",
                            "class": "OrgsContactLink"
                        }
                    }
                }
            },
            {
                table:'OrgsContract',
                autocomplete_field:'',
                version:3,
                tree: false,
                authenticated:false,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{}
                    },
                    autocomplete: {
                        "select": [
                            "id",
                            "name"
                        ],
                        "where": {
                            "name:LIKE": "%query%",
                            "org_id":"loc_org_id"
                        },
                        "tpl": "{$name}",
                        "limit": 20
                    }
                }
            }
        ]
    },
    gtsbalance:{
        name:'gtsbalance',
        gtsAPITables:[
            {
                table:'gtsBPeriod',
                autocomplete_field:'period_id',
                version:2,
                tree: false,
                authenticated:false,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{}
                    },
                    autocomplete:{
                        "select": [
                            "id",
                            "label",
                            "active"
                        ],
                        where:{
                            "label:LIKE":"%query%",
                        },
                        query:{
                            sortby:{
                                "label":"DESC"
                            }
                        },
                        tpl: "{$label}",
                        limit:0,
                    }
                }
            }
        ]
    },
    modx:{
        name:'modx',
        gtsAPITables:[
            {
                table:'Managers',
                class:'modUser',
                autocomplete_field:'manager_id',
                version:5,
                tree: false,
                authenticated:true,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{}
                    },
                    autocomplete:{
                        where:{
                            "modUserProfile.fullname:LIKE":"%query%",
                        },
                        query:{
                            class:"modUser",
                            leftJoin:{
                                modUserProfile:{
                                    class:"modUserProfile",
                                    on:"modUserProfile.internalKey = modUser.id"
                                },
                                modUserGroupMember:{
                                    class:"modUserGroupMember",
                                    on:"modUserGroupMember.member = modUser.id"
                                },
                            },
                            where:{
                                "modUserGroupMember.user_group":6,
                                "modUser.active":1
                            },
                            select:{
                                modUser:"modUser.id",
                                modUserProfile:"modUserProfile.fullname"
                            },
                            sortby:{
                                "fullname":"ASC"
                            }
                        },
                        tpl: "{$fullname}",
                        limit:20,
                    }
                }
            }
        ]
    },
    doc1c:{
        name:'doc1c',
        gtsAPITables:[
            {
                table:'doc1cBase',
                autocomplete_field:'base_id',
                version:2,
                tree: false,
                authenticated:false,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{},
                        create:{},
                        update:{}
                    },
                    autocomplete:{
                        "select": [
                            "id",
                            "name"
                        ],
                        "where": {
                            "name:LIKE": "%query%",
                        },
                        "tpl": "{$name}",
                        "limit": 0
                    },
                    "fields": {
                        "id": {
                            "type": "view",
                            "class": "doc1cBase"
                        },
                        "name": {
                            "type": "text",
                            "class": "doc1cBase"
                        },
                        "index": {
                            "type": "text",
                            "class": "doc1cBase"
                        },
                        "prefix": {
                            "type": "text",
                            "class": "doc1cBase"
                        },
                        "number_length": {
                            "type": "number",
                            "class": "doc1cBase"
                        },
                        "connection": {
                            "type": "text",
                            "class": "doc1cBase"
                        },
                        "username": {
                            "type": "text",
                            "class": "doc1cBase"
                        },
                        "password": {
                            "type": "text",
                            "class": "doc1cBase"
                        }
                    }
                }
            }
        ]
    },
}

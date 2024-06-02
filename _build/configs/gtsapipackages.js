export default {
    skladraschet:{
        name:'skladraschet',
        gtsAPITables:[
            {
                table:'sraschet',
                autocomplete_field:'',
                version:4,
                tree: false,
                authenticated:true,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{},
                        update:{},
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
}

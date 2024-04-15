export default {
    tsklad:{
        name:'tsklad',
        gtsAPITables:[
            {
                class:'tSkladSmena',
                tree: false,
                authenticated:true,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{}
                    }
                }
            },
            {
                class:'tSkladNaryad',
                tree: false,
                authenticated:true,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{}
                    }
                }
            },
            {
                class:'tSkladNaryadSmena',
                tree: false,
                authenticated:true,
                groups:'',
                permitions:'',
                active:true,
                properties: {
                    actions:{
                        read:{},
                        update:{
                            groups:'ceh_boss,Administrator',
                        },
                        subtables:{
                            tSkladNaryadSmena:{
                                where:{
                                    naryad_id:"naryad_id"
                                }
                            }
                        },
                        delete:{
                            groups:'ceh_boss,Administrator',
                        }
                    }
                }
            },
        ]
    },
}

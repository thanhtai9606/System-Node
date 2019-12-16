var UnitOfWork ={
    provinceRepository : function(){
        return require('./Repository/LocationRepository/provinceRepository');
    },
    districtRepository : function(){
        return require('./Repository/LocationRepository/districtRepository');
    },
    wardRepository : function(){
        return require('./Repository/LocationRepository/wardRepository');
    },
    grantPermissionRepository :function(){
        return require('./Repository/Admin/GrantPermissionRepository');
    },
    cultureViewRepository : function(){
        return require('./Repository/Admin/CultureRepository');
    },
    employeeRepository : function(){
        return require('./Repository/HumanResource/employeeRepository');
    }
}

module.exports = UnitOfWork;
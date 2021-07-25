class taskObj {
    constructor(id, taskName, checked) {
        this._id = id;
        this._taskName = taskName;
        this._checked = checked;
    }

    get id(){
        return this._id;
    }
    
    set id(value){
        this._id = value;
    }

    get taskName(){
        return this._taskName;
    }

    set taskName(value){
        this._taskName = value;
    }

    get checked(){
        return this._checked
    }

    set checked(value){
        this._checked = value;
    }

}
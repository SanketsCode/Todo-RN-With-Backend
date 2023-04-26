export interface Todo{
    todo_id : number;
    description :string
}
export interface renderProp {
    item : Todo;
    index : number
}